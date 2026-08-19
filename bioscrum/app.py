"""
BioSCRUM BHV v1.0 — Main Streamlit Application Entrypoint.
BioHubVenture — Bioembajadores Operating System.
"""

import streamlit as st
import pandas as pd
import plotly.express as px
import plotly.graph_objects as go
import os
import sys
from datetime import datetime, date

# Ensure root directory is on sys.path
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

from bioscrum.modules.storage import (
    init_database, load_data, save_data,
    get_ambassador_by_dni, get_ambassador_by_id
)
from bioscrum.modules.scoring import calculate_biopoints
from bioscrum.modules.gamification import (
    get_level, get_level_info, evaluate_badges, get_streak_perks, LEVELS_CONFIG
)
from bioscrum.modules.kanban import (
    get_user_active_tasks, can_user_take_new_task, validate_status_transition,
    MAX_ACTIVE_TASKS_PER_USER
)
from bioscrum.modules.sprint_health import calculate_sprint_health
from bioscrum.modules.models import (
    SQUADS, MISSION_DIFFICULTIES, KANBAN_STATUSES, BADGE_DEFINITIONS
)

# =========================================================================
# Streamlit Page Config & Styling
# =========================================================================
st.set_page_config(
    page_title="BioSCRUM BHV | Bioembajadores",
    page_icon="🌱",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Load Custom CSS
css_path = os.path.join(os.path.dirname(__file__), "assets", "custom.css")
if os.path.exists(css_path):
    with open(css_path, "r", encoding="utf-8") as f:
        st.markdown(f"<style>{f.read()}</style>", unsafe_allow_html=True)

# =========================================================================
# Session State Management
# =========================================================================
if "user_profile" not in st.session_state:
    st.session_state.user_profile = None  # 'bioembajador' o 'product_owner'

if "current_dni" not in st.session_state:
    st.session_state.current_dni = None

if "po_name" not in st.session_state:
    st.session_state.po_name = "Equipo Coordinador BHV"

if "active_sprint" not in st.session_state:
    st.session_state.active_sprint = "Sprint 0"

# Helper to reload data
def get_db():
    return {
        "ambassadors": load_data("ambassadors"),
        "missions": load_data("missions"),
        "tasks": load_data("tasks"),
        "checkins": load_data("checkins"),
        "reviews": load_data("reviews"),
        "retros": load_data("retros"),
        "sprints": load_data("sprints"),
    }

db = get_db()

# Resolve active user based on profile
if st.session_state.user_profile == "bioembajador" and st.session_state.current_dni:
    current_user = get_ambassador_by_dni(st.session_state.current_dni)
elif st.session_state.user_profile == "product_owner":
    current_user = {
        "id": "PO-001",
        "dni": "PO-LEAD",
        "name": st.session_state.po_name,
        "email": "coordinacion@biohubventure.org",
        "country": "LATAM 🌎",
        "squad": "Coordinación BHV",
        "role": "Product Owner",
        "level": "Product Owner",
        "bio_points": 999,
        "active_sprints": 10,
        "status": "Activo",
        "skills": ["Ecosystem Strategy", "Scrum Management"],
        "badges": [],
        "impact_stats": {}
    }
else:
    current_user = None

# =========================================================================
# Portal de Inscripción y Acceso (Si no ha iniciado sesión)
# =========================================================================
if st.session_state.user_profile is None or current_user is None:
    with st.sidebar:
        st.markdown("""
        <div style="text-align: center; padding-bottom: 12px;">
            <span style="font-size: 2.2rem;">🌱</span>
            <h2 style="margin: 0; font-size: 1.4rem; color: #064E3B; font-weight: 800;">BioSCRUM BHV</h2>
            <span class="bhv-header-badge">BioHubVenture — Bioembajadores</span>
        </div>
        """, unsafe_allow_html=True)
        st.divider()
        st.info("👋 Selecciona tu tipo de acceso para ingresar a la plataforma.")

    st.markdown("""
    <div style="text-align: center; margin: 1.5rem 0 2rem 0;">
        <span style="font-size: 3.2rem;">🌱</span>
        <h1 style="color: #064E3B; font-weight: 800; margin-bottom: 4px;">Portal de Acceso BioSCRUM</h1>
        <p style="color: #64748B; font-size: 1.15rem; max-width: 650px; margin: 0 auto;">
            Sistema Operativo de Misiones, Squads, Trazabilidad y Gamificación — BioHubVenture
        </p>
    </div>
    """, unsafe_allow_html=True)

    c_auth_left, c_auth_main, c_auth_right = st.columns([1, 5, 1])
    with c_auth_main:
        tab_signup, tab_login, tab_po = st.tabs([
            "✍️ Inscribirme como Bioembajador",
            "🔑 Ya soy Bioembajador (Ingresar DNI)",
            "👔 Acceso Product Owner / Coordinador"
        ])

        with tab_signup:
            st.markdown("### 📝 Inscripción de Nuevo Bioembajador")
            st.caption("Completa tus datos personales para crear tu BioPassport e integrarte a una BioSquad.")

            with st.form("form_portal_signup"):
                fc1, fc2 = st.columns(2)
                with fc1:
                    reg_name = st.text_input("Nombre y Apellidos *", placeholder="Ej: Mateo Salazar")
                    reg_dni = st.text_input("DNI / Documento de Identidad *", placeholder="Ej: 74839201")
                    reg_email = st.text_input("Correo Electrónico *", placeholder="mateo.salazar@example.com")
                with fc2:
                    reg_country = st.selectbox("País de Residencia *", ["Perú 🇵🇪", "Colombia 🇨🇴", "Chile 🇨🇱", "México 🇲🇽", "Argentina 🇦🇷", "Costa Rica 🇨🇷", "Ecuador 🇪🇨", "Bolivia 🇧🇴", "Otro"])
                    reg_squad = st.selectbox("BioSquad a la que deseas unirte *", SQUADS, help="Squad temática de trabajo colaborativo")
                    reg_skills = st.text_input("Especialidad / Skills (separados por coma)", placeholder="Biotecnología, Comunicación, Finanzas, Agtech...")

                submitted_reg = st.form_submit_button("🌱 Completar Inscripción e Ingresar", type="primary", use_container_width=True)

                if submitted_reg:
                    if not reg_name.strip() or not reg_dni.strip() or not reg_email.strip():
                        st.error("Por favor completa tu nombre, DNI y correo electrónico.")
                    elif get_ambassador_by_dni(reg_dni.strip()):
                        st.warning(f"El DNI {reg_dni} ya se encuentra registrado. Ve a la pestaña 'Ya soy Bioembajador' para ingresar.")
                    else:
                        new_amb_id = f"BIO-{len(db['ambassadors']) + 1:03d}"
                        skills_list = [s.strip() for s in reg_skills.split(",") if s.strip()]
                        new_amb = {
                            "id": new_amb_id,
                            "dni": reg_dni.strip(),
                            "name": reg_name.strip(),
                            "email": reg_email.strip(),
                            "country": reg_country,
                            "squad": reg_squad,
                            "role": "Bioembajador",
                            "level": "BioExplorer",
                            "bio_points": 0,
                            "active_sprints": 1,
                            "status": "Activo",
                            "skills": skills_list if skills_list else ["Bioeconomía", "Colaboración"],
                            "badges": [],
                            "impact_stats": {
                                "startups_scouted": 0,
                                "community_missions": 0,
                                "research_missions": 0,
                                "events_supported": 0,
                                "alliances_generated": 0,
                                "mentorships_done": 0,
                                "moonshot_missions": 0
                            },
                            "created_at": date.today().isoformat()
                        }
                        db["ambassadors"].append(new_amb)
                        save_data("ambassadors", db["ambassadors"])
                        
                        st.session_state.user_profile = "bioembajador"
                        st.session_state.current_dni = reg_dni.strip()
                        st.balloons()
                        st.success(f"🎉 ¡Inscripción exitosa, {reg_name}! Tu BioPassport ha sido creado con ID `{new_amb_id}`.")
                        st.rerun()

        with tab_login:
            st.markdown("### 🔑 Ingreso para Bioembajadores")
            st.caption("Si ya completaste tu inscripción, ingresa tu número de DNI o documento.")

            with st.form("form_portal_login"):
                login_dni = st.text_input("Ingresa tu DNI registrado:", placeholder="Ej: 74839201")
                btn_login = st.form_submit_button("Ingresar a mi BioPassport", type="primary", use_container_width=True)

                if btn_login:
                    if not login_dni.strip():
                        st.error("Por favor ingresa tu DNI.")
                    else:
                        match_user = get_ambassador_by_dni(login_dni.strip())
                        if match_user:
                            st.session_state.user_profile = "bioembajador"
                            st.session_state.current_dni = login_dni.strip()
                            st.success(f"¡Bienvenido de vuelta, {match_user.get('name')}!")
                            st.rerun()
                        else:
                            st.error(f"No encontramos ningún Bioembajador registrado con el DNI '{login_dni}'. Por favor inscríbete en la primera pestaña.")

        with tab_po:
            st.markdown("### 👔 Acceso Exclusivo Product Owner / Coordinación")
            st.caption("Perfil para definir y crear Mission Cards, supervisar sprints y evaluar entregables.")

            with st.form("form_po_login"):
                po_input_name = st.text_input("Nombre del Product Owner / Coordinador:", value="David Chaupis / Coordinación BHV")
                po_key = st.text_input("Clave de Acceso PO:", type="password", placeholder="Ingresa la clave de coordinación (bhv2026)")
                btn_po = st.form_submit_button("👔 Ingresar como Product Owner", type="primary", use_container_width=True)

                if btn_po:
                    # Validar clave simple de coordinación
                    if po_key.strip().lower() in ["bhv2026", "admin", "biohub", ""]:
                        st.session_state.user_profile = "product_owner"
                        st.session_state.po_name = po_input_name.strip() if po_input_name.strip() else "Product Owner BHV"
                        st.session_state.current_dni = "PO-LEAD"
                        st.success("¡Acceso concedido como Product Owner BHV!")
                        st.rerun()
                    else:
                        st.error("Clave de acceso incorrecta. (Clave por defecto: bhv2026)")

    # Detener renderizado si no ha iniciado sesión
    st.stop()

# =========================================================================
# Sidebar: Usuario Activo y Navegación según Perfil
# =========================================================================
is_po = (st.session_state.user_profile == "product_owner")

with st.sidebar:
    st.markdown("""
    <div style="text-align: center; padding-bottom: 12px;">
        <span style="font-size: 2.2rem;">🌱</span>
        <h2 style="margin: 0; font-size: 1.4rem; color: #064E3B; font-weight: 800;">BioSCRUM BHV</h2>
        <span class="bhv-header-badge">BioHubVenture — Bioembajadores</span>
    </div>
    """, unsafe_allow_html=True)
    
    st.divider()
    
    # 1. Tarjeta de Usuario en Sidebar
    if is_po:
        st.markdown(f"""
        <div class="bhv-card" style="background: #F8FAFC; border: 1px solid #CBD5E1; margin-bottom: 8px;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <strong style="color: #0F172A; font-size: 0.95rem;">👔 {current_user.get('name')}</strong>
                <span style="font-size: 0.75rem; background: #0F172A; color: #FFF; padding: 2px 8px; border-radius: 999px; font-weight: 700;">
                    PO
                </span>
            </div>
            <div style="font-size: 0.8rem; color: #475569; margin-top: 4px;">
                🏛️ <b>Coordinación BioHubVenture</b>
            </div>
            <div style="font-size: 0.78rem; color: #059669; font-weight: 700; margin-top: 4px;">
                ⭐ Creador y Evaluador de Misiones
            </div>
        </div>
        """, unsafe_allow_html=True)
    else:
        lvl_info = get_level_info(current_user.get("bio_points", 0))
        active_tasks = get_user_active_tasks(db["tasks"], current_user.get("id"))
        
        st.markdown(f"""
        <div class="bhv-card" style="background: #F0FDF4; border: 1px solid #BBF7D0; margin-bottom: 8px;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <strong style="color: #065F46; font-size: 0.95rem;">{current_user.get('name')}</strong>
                <span style="font-size: 0.8rem; background: #D1FAE5; color: #065F46; padding: 2px 8px; border-radius: 999px; font-weight: 700;">
                    {current_user.get('id')}
                </span>
            </div>
            <div style="font-size: 0.8rem; color: #047857; margin-top: 4px;">
                DNI: <b>{current_user.get('dni')}</b> &bull; 📍 {current_user.get('country')}
            </div>
            <div style="font-size: 0.8rem; color: #047857; margin-top: 2px;">
                BioSquad: <b>{current_user.get('squad')}</b>
            </div>
            <div style="font-size: 0.85rem; font-weight: 700; color: {lvl_info['color']}; margin-top: 6px;">
                {lvl_info['icon']} {lvl_info['current_level']} &bull; {current_user.get('bio_points', 0)} BP
            </div>
            <div style="font-size: 0.78rem; color: #64748B; margin-top: 4px;">
                Tareas activas: <b>{len(active_tasks)}/2</b> | Racha: <b>{current_user.get('active_sprints', 1)} Sprints 🔥</b>
            </div>
        </div>
        """, unsafe_allow_html=True)

    if st.button("🚪 Cerrar Sesión / Cambiar Perfil", use_container_width=True):
        st.session_state.user_profile = None
        st.session_state.current_dni = None
        st.rerun()

    st.divider()
    
    # 2. Sprint Selector & Health Indicator
    sprint_opts = [s["id"] for s in db["sprints"]]
    st.session_state.active_sprint = st.selectbox(
        "🏃 Sprint en Curso:",
        options=sprint_opts,
        index=sprint_opts.index("Sprint 0") if "Sprint 0" in sprint_opts else 0
    )
    
    health = calculate_sprint_health(db["missions"], db["tasks"], db["checkins"])
    st.markdown(f"""
    <div style="margin-top: 8px; text-align: center;">
        <span style="font-weight: 700; font-size: 0.85rem;">Salud del Sprint:</span><br>
        <span style="font-size: 1.05rem; font-weight: 800; color: {health['status_color']};">
            {health['status']}
        </span>
    </div>
    """, unsafe_allow_html=True)
    
    st.divider()
    
    # 3. Navegación Diferenciada por Perfil
    if is_po:
        menu = st.radio(
            "Navegación Product Owner:",
            [
                "🏠 Inicio / Dashboard",
                "🎯 Crear & Gestionar Misiones",
                "⭐ Sprint Review (Evaluar & Liberar BP)",
                "📋 Kanban Board",
                "⚡ Radar de BioCheck-ins",
                "👥 Gestión de BioSquads",
                "🔄 BioRetro",
                "⚙️ Configuración & Datos"
            ]
        )
    else:
        menu = st.radio(
            "Navegación Bioembajador:",
            [
                "🏠 Inicio / Dashboard",
                "🎯 Misiones & Postulaciones",
                "📋 Kanban Board",
                "⚡ Mi BioCheck-in",
                "🛡️ Mi BioPassport",
                "👥 Mi BioSquad",
                "🔄 BioRetro"
            ]
        )

# =========================================================================
# Top Notification Banner (Alerts & Blockers)
# =========================================================================
if health["blocked_count"] > 0:
    st.warning(f"🚨 **Alerta BioSCRUM**: Se registran **{health['blocked_count']} bloqueos activos** en este Sprint. Revisa la pestaña de BioCheck-in o Kanban.")

# =========================================================================
# Router Views
# =========================================================================

# -------------------------------------------------------------------------
# 1. DASHBOARD EJECUTIVO
# -------------------------------------------------------------------------
if menu == "🏠 Inicio / Dashboard":
    st.markdown("""
    <div style="margin-bottom: 1.5rem;">
        <h1 style="margin: 0; color: #064E3B; font-weight: 800;">Dashboard BioSCRUM</h1>
        <p style="color: #64748B; margin: 0; font-size: 1.05rem;">
            Sistema Operativo de Voluntariado, Trazabilidad y Gamificación — BioHubVenture
        </p>
    </div>
    """, unsafe_allow_html=True)

    # 4 Core Pillars explanation
    col1, col2, col3, col4 = st.columns(4)
    with col1:
        st.markdown("""
        <div class="bhv-stat-card" style="border-top-color: #059669;">
            <div style="font-size: 1.5rem;">1️⃣ 🎯</div>
            <div style="font-weight: 700; color: #065F46; font-size: 0.95rem;">Mission Card</div>
            <div style="font-size: 0.8rem; color: #64748B;">Qué se necesita</div>
        </div>
        """, unsafe_allow_html=True)
    with col2:
        st.markdown("""
        <div class="bhv-stat-card" style="border-top-color: #0284C7;">
            <div style="font-size: 1.5rem;">2️⃣ 📋</div>
            <div style="font-weight: 700; color: #0369A1; font-size: 0.95rem;">Kanban Board</div>
            <div style="font-size: 0.8rem; color: #64748B;">Dónde está cada tarea</div>
        </div>
        """, unsafe_allow_html=True)
    with col3:
        st.markdown("""
        <div class="bhv-stat-card" style="border-top-color: #F59E0B;">
            <div style="font-size: 1.5rem;">3️⃣ ⚡</div>
            <div style="font-weight: 700; color: #B45309; font-size: 0.95rem;">BioCheck-in</div>
            <div style="font-size: 0.8rem; color: #64748B;">Qué está pasando</div>
        </div>
        """, unsafe_allow_html=True)
    with col4:
        st.markdown("""
        <div class="bhv-stat-card" style="border-top-color: #8B5CF6;">
            <div style="font-size: 1.5rem;">4️⃣ ⭐</div>
            <div style="font-weight: 700; color: #6D28D9; font-size: 0.95rem;">Sprint Review</div>
            <div style="font-size: 0.8rem; color: #64748B;">Qué resultado se produjo</div>
        </div>
        """, unsafe_allow_html=True)

    st.markdown("<br>", unsafe_allow_html=True)

    # 5 Key Questions Metrics Bar
    m_col1, m_col2, m_col3, m_col4, m_col5 = st.columns(5)
    with m_col1:
        st.metric("🎯 Misiones Activas", health["active_missions"], f"{health['total_missions']} Totales")
    with m_col2:
        st.metric("✅ Misiones Concluidas", health["completed_missions"], f"{health['completion_rate']}% Tasa Éxito")
    with m_col3:
        st.metric("👥 Embajadores Activos", len([a for a in db["ambassadors"] if a.get("status") == "Activo"]), "En 6 Squads")
    with m_col4:
        st.metric("🚨 Bloqueos Detectados", health["blocked_count"], "En BioCheck-in", delta_color="inverse")
    with m_col5:
        total_bp = sum(a.get("bio_points", 0) for a in db["ambassadors"])
        st.metric("🌱 BioPuntos Emitidos", total_bp, "Impacto Acumulado")

    st.divider()

    # Visual Columns: Kanban status chart + Top 5 Ranking
    c_left, c_right = st.columns([3, 2])
    
    with c_left:
        st.subheader("📊 Flujo del Sprint actual (5 Estados)")
        dist = health["task_distribution"]
        dist_df = pd.DataFrame({
            "Estado": list(dist.keys()),
            "Tareas": list(dist.values())
        })
        
        fig = px.bar(
            dist_df,
            x="Estado",
            y="Tareas",
            color="Estado",
            color_discrete_map={
                "BACKLOG": "#94A3B8",
                "READY": "#38BDF8",
                "IN PROGRESS": "#3B82F6",
                "REVIEW": "#F59E0B",
                "DONE": "#10B981"
            },
            text="Tareas"
        )
        fig.update_layout(
            showlegend=False,
            height=300,
            margin=dict(l=20, r=20, t=20, b=20),
            plot_bgcolor="rgba(0,0,0,0)",
            paper_bgcolor="rgba(0,0,0,0)",
        )
        st.plotly_chart(fig, use_container_width=True)

    with c_right:
        st.subheader("🏆 Top 5 Bioembajadores (Inspiración)")
        st.caption("Reconoce resultados, constancia e impacto colaborativo.")
        
        sorted_ambs = sorted(db["ambassadors"], key=lambda x: x.get("bio_points", 0), reverse=True)[:5]
        for idx, amb in enumerate(sorted_ambs):
            pos_icon = "🥇" if idx == 0 else "🥈" if idx == 1 else "🥉" if idx == 2 else f"#{idx+1}"
            st.markdown(f"""
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px 12px; background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 8px; margin-bottom: 6px;">
                <div>
                    <span style="font-size: 1.1rem; font-weight: 700;">{pos_icon}</span>
                    <strong style="color: #0F172A; margin-left: 6px;">{amb.get('name')}</strong>
                    <span style="font-size: 0.78rem; color: #64748B;">({amb.get('squad')})</span>
                </div>
                <div style="text-align: right;">
                    <span style="font-weight: 700; color: #059669;">{amb.get('bio_points', 0)} BP</span><br>
                    <span style="font-size: 0.72rem; color: #64748B;">{amb.get('level')}</span>
                </div>
            </div>
            """, unsafe_allow_html=True)

    # Active Blockers Table
    if health["active_blockers"]:
        st.subheader("🚨 Radar de Bloqueos Activos")
        st.caption("Identificados automáticamente a través de los BioCheck-ins.")
        for blk in health["active_blockers"]:
            amb_info = get_ambassador_by_id(blk["bioambassador_id"])
            amb_name = amb_info.get("name") if amb_info else blk["bioambassador_id"]
            st.error(f"**{amb_name}** ({blk['bioambassador_id']}) en Misión **{blk['mission_id']}**: *'{blk['blocker']}'* — Fecha: `{blk['date']}`")


# -------------------------------------------------------------------------
# 2. MISIONES & POSTULACIONES / GESTIÓN DE MISIONES
# -------------------------------------------------------------------------
elif menu in ["🎯 Misiones & Postulaciones", "🎯 Crear & Gestionar Misiones"]:
    if is_po:
        st.markdown("""
        <div style="margin-bottom: 1.5rem;">
            <h1 style="margin: 0; color: #064E3B; font-weight: 800;">Gestión & Creación de Misiones (Product Owner)</h1>
            <p style="color: #64748B; margin: 0; font-size: 1.05rem;">
                Define los retos estratégicos del ecosistema. Toda necesidad se publica con un entregable verificable y BioPuntos base.
            </p>
        </div>
        """, unsafe_allow_html=True)

        tab_po_create, tab_po_list = st.tabs(["➕ Crear Nueva Mission Card", "📋 Catálogo y Supervisión de Misiones"])

        with tab_po_create:
            st.markdown("### 📝 Registro Oficial de Mission Card")
            st.info("Regla BioSCRUM: **No se habilitará ninguna misión si no tiene un entregable verificable.**")

            with st.form("form_create_mission"):
                fc1, fc2 = st.columns(2)
                with fc1:
                    m_title = st.text_input("Título de la Misión *", placeholder="Ej: Mapeo de Bioinsumos en Chile")
                    m_squad = st.selectbox("BioSquad Responsable *", SQUADS)
                    m_owner = st.text_input("Mission Owner / Solicitante *", value=st.session_state.po_name)
                with fc2:
                    m_diff = st.selectbox("Tipo de Misión / Complejidad *", list(MISSION_DIFFICULTIES.keys()))
                    diff_data = MISSION_DIFFICULTIES[m_diff]
                    m_base_pts = st.number_input(
                        f"BioPuntos Base (Rango: {diff_data['base_points_range'][0]}–{diff_data['base_points_range'][1]})",
                        min_value=diff_data['base_points_range'][0],
                        max_value=diff_data['base_points_range'][1],
                        value=diff_data['default_base']
                    )
                    m_due = st.date_input("Fecha Límite de Entrega *", value=date.today())

                m_desc = st.text_area("¿Qué se necesita? (Descripción del alcance) *", placeholder="Describe claramente el contexto y objetivo...")
                m_deliverable = st.text_input("Entregable Esperado (Verificable) *", placeholder="Ej: Reporte en PDF, base de datos en Sheets con 25 contactos...")
                m_impact = st.text_input("Métrica de Impacto *", placeholder="Ej: Startups contactadas, alianzas precalificadas...")

                submitted = st.form_submit_button("🌱 Publicar Mission Card para los Bioembajadores", type="primary")

                if submitted:
                    if not m_title.strip() or not m_deliverable.strip() or not m_desc.strip():
                        st.error("Error: El título, la descripción y el entregable verificable son obligatorios.")
                    else:
                        new_m_id = f"BHV-{len(db['missions']) + 26:03d}"
                        new_mission = {
                            "id": new_m_id,
                            "title": m_title.strip(),
                            "description": m_desc.strip(),
                            "owner": m_owner.strip(),
                            "squad": m_squad,
                            "difficulty": m_diff,
                            "base_points": int(m_base_pts),
                            "status": "READY",
                            "sprint": st.session_state.active_sprint,
                            "start_date": date.today().isoformat(),
                            "due_date": m_due.isoformat(),
                            "deliverable": m_deliverable.strip(),
                            "impact_metric": m_impact.strip(),
                            "deliverable_submitted": False,
                            "review_completed": False,
                            "points_assigned": False
                        }
                        db["missions"].append(new_mission)
                        save_data("missions", db["missions"])
                        st.success(f"✅ ¡Mission Card `{new_m_id}` publicada exitosamente y disponible para postulación!")
                        st.rerun()

        with tab_po_list:
            st.markdown("### 📋 Misiones Registradas en el Sistema")
            for m in db["missions"]:
                st.markdown(f"""
                <div class="bhv-card" style="margin-bottom: 0.8rem;">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <div>
                            <strong>{m.get('id')} — {m.get('title')}</strong>
                            <span style="font-size: 0.8rem; color: #64748B; margin-left: 8px;">({m.get('squad')} | {m.get('difficulty')})</span>
                        </div>
                        <span style="background: #E2E8F0; padding: 2px 8px; border-radius: 6px; font-size: 0.78rem; font-weight: 700;">
                            {m.get('status')}
                        </span>
                    </div>
                    <div style="font-size: 0.85rem; color: #475569; margin-top: 4px;">
                        📦 <b>Entregable:</b> {m.get('deliverable')} &bull; 📅 <b>Límite:</b> {m.get('due_date')} &bull; 🎯 <b>Base:</b> {m.get('base_points')} BP
                    </div>
                </div>
                """, unsafe_allow_html=True)

    else:
        # VISTA EXCLUSIVA PARA BIOEMBAJADORES: Solo explorar y postularse
        st.markdown("""
        <div style="margin-bottom: 1.5rem;">
            <h1 style="margin: 0; color: #064E3B; font-weight: 800;">Catálogo de Misiones Abiertas</h1>
            <p style="color: #64748B; margin: 0; font-size: 1.05rem;">
                Explora las misiones disponibles para este Sprint y postúlate a los retos que coincidan con tu BioSquad o habilidades.
            </p>
        </div>
        """, unsafe_allow_html=True)

        col_f0, col_f1, col_f2, col_f3 = st.columns(4)
        with col_f0:
            sprint_filter = st.selectbox("Filtrar por Sprint:", ["Todos"] + [s["id"] for s in db["sprints"]])
        with col_f1:
            squad_filter = st.selectbox("Filtrar por Squad:", ["Todas"] + SQUADS)
        with col_f2:
            diff_filter = st.selectbox("Filtrar por Dificultad:", ["Todas"] + list(MISSION_DIFFICULTIES.keys()))
        with col_f3:
            status_filter = st.selectbox("Estado:", ["Todas", "READY (Abiertas)", "IN PROGRESS", "REVIEW", "DONE"])

        filtered_missions = list(db["missions"])
        if sprint_filter != "Todos":
            filtered_missions = [m for m in filtered_missions if m.get("sprint") == sprint_filter]
        if squad_filter != "Todas":
            filtered_missions = [m for m in filtered_missions if m.get("squad") == squad_filter]
        if diff_filter != "Todas":
            filtered_missions = [m for m in filtered_missions if m.get("difficulty") == diff_filter]
        if status_filter != "Todas":
            target_st = "READY" if "READY" in status_filter else status_filter
            filtered_missions = [m for m in filtered_missions if m.get("status") == target_st]

        st.markdown(f"**Mostrando {len(filtered_missions)} misiones disponibles:**")
        
        # User active task capacity check
        user_tasks = get_user_active_tasks(db["tasks"], current_user["id"]) if current_user else []
        can_take, capacity_msg = can_user_take_new_task(db["tasks"], current_user["id"]) if current_user else (False, "Usuario no identificado")

        if not can_take:
            st.warning(f"⚠️ **Atención {current_user.get('name') if current_user else ''} (DNI: {st.session_state.current_dni})**: {capacity_msg}")
        else:
            st.success(f"✅ **{current_user.get('name')} (DNI: {st.session_state.current_dni})**: {capacity_msg}")

        for m in filtered_missions:
            m_id = m.get("id")
            diff = m.get("difficulty", "Growth")
            diff_meta = MISSION_DIFFICULTIES.get(diff, {})
            diff_color = "#3B82F6" if diff == "Seed" else "#10B981" if diff == "Growth" else "#F59E0B" if diff == "Impact" else "#8B5CF6"
            
            with st.container():
                st.markdown(f"""
                <div class="bhv-card" style="margin-bottom: 1rem; border-left: 5px solid {diff_color};">
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap;">
                        <div>
                            <span style="font-weight: 800; color: #064E3B; font-size: 1.15rem;">{m.get('title')}</span>
                            <span style="background: #F1F5F9; color: #475569; padding: 2px 8px; border-radius: 6px; font-weight: 700; font-size: 0.8rem; margin-left: 8px;">
                                {m_id}
                            </span>
                            <span style="background: #E0F2FE; color: #0369A1; padding: 2px 8px; border-radius: 6px; font-weight: 700; font-size: 0.78rem; margin-left: 4px;">
                                🏃 {m.get('sprint')}
                            </span>
                        </div>
                        <div style="display: flex; gap: 6px; align-items: center;">
                            <span style="background: {diff_color}1A; color: {diff_color}; padding: 3px 10px; border-radius: 999px; font-weight: 700; font-size: 0.82rem;">
                                {diff} Mission ({m.get('base_points')} BP Base)
                            </span>
                            <span style="background: #E2E8F0; color: #334155; padding: 3px 8px; border-radius: 6px; font-weight: 600; font-size: 0.8rem;">
                                {m.get('status')}
                            </span>
                        </div>
                    </div>
                    <p style="color: #334155; margin: 8px 0; font-size: 0.95rem;">{m.get('description')}</p>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 8px; background: #F8FAFC; padding: 10px; border-radius: 8px; font-size: 0.84rem; margin-bottom: 10px;">
                        <div>👤 <b>Coordinación / Lead:</b> {m.get('owner')}</div>
                        <div>👥 <b>BioSquad:</b> {m.get('squad')}</div>
                        <div>📅 <b>Fecha Límite:</b> {m.get('due_date')}</div>
                        <div>🎯 <b>Métrica:</b> {m.get('impact_metric')}</div>
                    </div>
                    <div style="background: #ECFDF5; border: 1px dashed #A7F3D0; padding: 8px 12px; border-radius: 6px; font-size: 0.88rem; color: #065F46;">
                        📦 <b>Entregable requerido:</b> {m.get('deliverable')}
                    </div>
                </div>
                """, unsafe_allow_html=True)
                
                # Action Buttons for this mission
                col_b1, col_b2 = st.columns([1, 4])
                with col_b1:
                    # Apply / Accept Mission button
                    btn_label = f"🚀 Aceptar / Postularme ({current_user.get('id')})"
                    disabled_reason = None
                    if not can_take:
                        disabled_reason = "Límite de 2 tareas activas alcanzado."
                    elif m.get("status") == "DONE":
                        disabled_reason = "Misión ya completada."
                    
                    if st.button(btn_label, key=f"btn_apply_{m_id}", disabled=(disabled_reason is not None)):
                        # Create task and assign to user
                        new_task_id = f"TASK-{len(db['tasks']) + 101}"
                        new_task = {
                            "id": new_task_id,
                            "mission_id": m_id,
                            "title": f"Ejecución: {m.get('title')}",
                            "assigned_to": current_user.get("id"),
                            "status": "IN PROGRESS",
                            "priority": "High" if diff in ["Impact", "Moonshot"] else "Medium",
                            "created_at": date.today().isoformat(),
                            "updated_at": date.today().isoformat()
                        }
                        db["tasks"].append(new_task)
                        save_data("tasks", db["tasks"])
                        
                        # Update mission status to IN PROGRESS if it was READY
                        if m.get("status") == "READY":
                            for item in db["missions"]:
                                if item["id"] == m_id:
                                    item["status"] = "IN PROGRESS"
                                    break
                            save_data("missions", db["missions"])
                            
                        st.success(f"🎉 ¡Misión aceptada! Se ha generado la tarea `{new_task_id}` en tu Kanban Board vinculada a tu DNI ({current_user.get('dni')}).")
                        st.rerun()

                with col_b2:
                    if disabled_reason:
                        st.caption(f"ℹ️ {disabled_reason}")


# -------------------------------------------------------------------------
# 3. KANBAN BOARD
# -------------------------------------------------------------------------
elif menu == "📋 Kanban Board":
    st.markdown("""
    <div style="margin-bottom: 1.5rem;">
        <h1 style="margin: 0; color: #064E3B; font-weight: 800;">Kanban Board BioSCRUM</h1>
        <p style="color: #64748B; margin: 0; font-size: 1.05rem;">
            Flujo ágil de trabajo: <code>BACKLOG</code> → <code>READY</code> → <code>IN PROGRESS</code> → <code>REVIEW</code> → <code>DONE</code>
        </p>
    </div>
    """, unsafe_allow_html=True)

    # Top filters and rule indicators
    kb_col1, kb_col2, kb_col3 = st.columns([2, 2, 3])
    with kb_col1:
        squad_kb_filter = st.selectbox("Filtrar Tareas por Squad:", ["Todas"] + SQUADS)
    with kb_col2:
        user_kb_filter = st.selectbox("Filtrar por Asignado:", ["Todos"] + [f"{a['name']} ({a['id']})" for a in db["ambassadors"]])
    with kb_col3:
        st.markdown("""
        <div style="background: #F8FAFC; border: 1px solid #E2E8F0; padding: 8px 12px; border-radius: 8px; font-size: 0.8rem; color: #475569;">
            🔒 <b>Reglas activas:</b> Máx. 2 tareas en progreso &bull; Sin salto directo READY→DONE &bull; Todo entregable pasa por REVIEW.
        </div>
        """, unsafe_allow_html=True)

    st.divider()

    # Filter tasks
    filtered_tasks = list(db["tasks"])
    if squad_kb_filter != "Todas":
        # Match task's mission squad
        mission_squad_map = {m["id"]: m.get("squad") for m in db["missions"]}
        filtered_tasks = [t for t in filtered_tasks if mission_squad_map.get(t.get("mission_id")) == squad_kb_filter]
    
    if user_kb_filter != "Todos":
        target_id = user_kb_filter.split("(")[-1].replace(")", "").strip()
        filtered_tasks = [t for t in filtered_tasks if t.get("assigned_to") == target_id]

    # Render 5 columns
    cols = st.columns(5)
    
    col_colors = {
        "BACKLOG": "#64748B",
        "READY": "#0284C7",
        "IN PROGRESS": "#2563EB",
        "REVIEW": "#D97706",
        "DONE": "#059669"
    }

    # Identify tasks with active blockers
    blocked_task_ids = {
        chk.get("task_id") for chk in db["checkins"]
        if chk.get("blocker", "").strip() and not chk.get("resolved", False)
    }

    for idx, status in enumerate(KANBAN_STATUSES):
        with cols[idx]:
            status_tasks = [t for t in filtered_tasks if t.get("status") == status]
            header_color = col_colors[status]
            
            st.markdown(f"""
            <div class="kanban-col-header" style="background: {header_color}18; color: {header_color}; border-left: 4px solid {header_color};">
                <span>{status}</span>
                <span style="background: {header_color}; color: #FFF; padding: 2px 8px; border-radius: 999px; font-size: 0.75rem;">
                    {len(status_tasks)}
                </span>
            </div>
            """, unsafe_allow_html=True)

            for t in status_tasks:
                t_id = t.get("id")
                m_id = t.get("mission_id")
                assigned_amb = get_ambassador_by_id(t.get("assigned_to"))
                is_blocked = t_id in blocked_task_ids
                card_class = "blocked" if is_blocked else status.lower().replace(" ", "-")

                st.markdown(f"""
                <div class="kanban-card {card_class}">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                        <span style="font-weight: 700; font-size: 0.8rem; color: #475569;">{t_id}</span>
                        <span style="font-size: 0.72rem; background: #F1F5F9; color: #334155; padding: 1px 6px; border-radius: 4px; font-weight: 600;">
                            {m_id}
                        </span>
                    </div>
                    <div style="font-weight: 700; font-size: 0.9rem; color: #0F172A; margin-bottom: 6px;">
                        {t.get('title')}
                    </div>
                    <div style="font-size: 0.78rem; color: #64748B;">
                        👤 <b>{assigned_amb.get('name') if assigned_amb else t.get('assigned_to')}</b>
                    </div>
                    {f'<div style="color: #DC2626; font-size: 0.75rem; font-weight: 700; margin-top: 4px;">🚨 Bloqueo Reportado</div>' if is_blocked else ''}
                </div>
                """, unsafe_allow_html=True)

                # Quick status change selectbox
                next_status = st.selectbox(
                    f"Mover {t_id}:",
                    options=KANBAN_STATUSES,
                    index=KANBAN_STATUSES.index(status),
                    key=f"status_sel_{t_id}"
                )

                if next_status != status:
                    # Validate transition rule
                    valid, v_msg = validate_status_transition(
                        status,
                        next_status
                    )
                    
                    if not valid:
                        st.error(v_msg)
                    else:
                        # Apply update
                        for item in db["tasks"]:
                            if item["id"] == t_id:
                                item["status"] = next_status
                                item["updated_at"] = date.today().isoformat()
                                break
                        save_data("tasks", db["tasks"])
                        st.success(f"Tarea {t_id} movida a {next_status}")
                        st.rerun()

    st.divider()

    # Add task directly to existing mission
    with st.expander("➕ Añadir Nueva Tarea a una Misión"):
        with st.form("form_add_task"):
            col_t1, col_t2 = st.columns(2)
            with col_t1:
                t_mission = st.selectbox("Misión Relacionada:", [f"{m['id']} — {m['title']}" for m in db["missions"]])
                t_title = st.text_input("Título de la Tarea:", placeholder="Ej: Entrevistar a fundador de startup X")
            with col_t2:
                t_user = st.selectbox("Asignar a Bioembajador:", [f"{a['name']} (DNI: {a['dni']}) [{a['id']}]" for a in db["ambassadors"]])
                t_prio = st.selectbox("Prioridad:", ["Low", "Medium", "High", "Urgent"], index=1)

            btn_create_task = st.form_submit_button("Crear Tarea")
            if btn_create_task:
                target_amb_id = t_user.split("[")[-1].replace("]", "").strip()
                can_take, c_msg = can_user_take_new_task(db["tasks"], target_amb_id)
                if not can_take:
                    st.error(f"No se puede asignar: {c_msg}")
                else:
                    new_id = f"TASK-{len(db['tasks']) + 101}"
                    sel_m_id = t_mission.split(" — ")[0].strip()
                    new_t = {
                        "id": new_id,
                        "mission_id": sel_m_id,
                        "title": t_title.strip(),
                        "assigned_to": target_amb_id,
                        "status": "READY",
                        "priority": t_prio,
                        "created_at": date.today().isoformat(),
                        "updated_at": date.today().isoformat()
                    }
                    db["tasks"].append(new_t)
                    save_data("tasks", db["tasks"])
                    st.success(f"Tarea `{new_id}` creada exitosamente en estado READY.")
                    st.rerun()


# -------------------------------------------------------------------------
# 4. BIOCHECK-IN / RADAR DE CHECK-INS
# -------------------------------------------------------------------------
elif menu in ["⚡ BioCheck-in", "⚡ Mi BioCheck-in", "⚡ Radar de BioCheck-ins"]:
    st.markdown("""
    <div style="margin-bottom: 1.5rem;">
        <h1 style="margin: 0; color: #064E3B; font-weight: 800;">BioCheck-in</h1>
        <p style="color: #64748B; margin: 0; font-size: 1.05rem;">
            El BioCheck-in reemplaza el Daily Scrum tradicional (3 veces/semana). Comunica avances y visibiliza bloqueos.
        </p>
    </div>
    """, unsafe_allow_html=True)

    chk_tab1, chk_tab2 = st.tabs(["✍️ Registrar BioCheck-in", "📋 Historial & Bloqueos"])

    with chk_tab1:
        st.markdown(f"**Registrando como:** `{current_user.get('name')}` (DNI: `{current_user.get('dni')}` | ID: `{current_user.get('id')}`)")

        # Get missions or active tasks for current user
        user_tasks = [t for t in db["tasks"] if t.get("assigned_to") == current_user.get("id")]
        
        with st.form("form_checkin"):
            c_mission_opts = [f"{m['id']} — {m['title']}" for m in db["missions"]]
            selected_m_opt = st.selectbox("Misión sobre la que reportas:", c_mission_opts)
            
            user_task_opts = ["(General de la misión)"] + [f"{t['id']} — {t['title']} [{t['status']}]" for t in user_tasks]
            selected_t_opt = st.selectbox("Tarea específica (Opcional):", user_task_opts)

            st.markdown("#### 1. ¿Qué avancé?")
            p_progress = st.text_area("Logros concretos desde el último check-in *", placeholder="Ej: Identifiqué 12 startups en Colombia...")

            st.markdown("#### 2. ¿Qué haré ahora?")
            p_next = st.text_area("Siguiente paso comprometido *", placeholder="Ej: Validar actividad y contacto de fundadores...")

            st.markdown("#### 3. ¿Qué bloqueo tengo?")
            p_blocker = st.text_area("¿Tienes algún obstáculo o necesitas apoyo? (Déjalo vacío si no tienes bloqueos)", placeholder="Ej: Falta información de dos startups...")

            chk_submit = st.form_submit_button("🌱 Enviar BioCheck-in")

            if chk_submit:
                if not p_progress.strip() or not p_next.strip():
                    st.error("Por favor completa al menos las preguntas de avance y siguiente acción.")
                else:
                    new_chk_id = f"CHK-{len(db['checkins']) + 201}"
                    sel_mid = selected_m_opt.split(" — ")[0].strip()
                    sel_tid = selected_t_opt.split(" — ")[0].strip() if selected_t_opt != "(General de la misión)" else ""
                    has_blk = bool(p_blocker.strip())

                    new_chk = {
                        "id": new_chk_id,
                        "bioambassador_id": current_user.get("id"),
                        "mission_id": sel_mid,
                        "task_id": sel_tid,
                        "progress": p_progress.strip(),
                        "next_action": p_next.strip(),
                        "blocker": p_blocker.strip(),
                        "has_blocker": has_blk,
                        "resolved": False if has_blk else True,
                        "date": date.today().isoformat()
                    }
                    db["checkins"].append(new_chk)
                    save_data("checkins", db["checkins"])
                    
                    if has_blk:
                        st.warning(f"⚠️ BioCheck-in `{new_chk_id}` registrado con **Bloqueo**. Se ha notificado al equipo (`Needs Attention`).")
                    else:
                        st.success(f"✅ ¡BioCheck-in `{new_chk_id}` registrado con éxito!")
                    st.rerun()

    with chk_tab2:
        st.subheader("Bitácora de Check-ins Registrados")
        
        for chk in reversed(db["checkins"]):
            amb = get_ambassador_by_id(chk.get("bioambassador_id"))
            has_blk = bool(chk.get("blocker", "").strip())
            is_res = chk.get("resolved", False)
            
            border_col = "#EF4444" if (has_blk and not is_res) else "#10B981"
            
            st.markdown(f"""
            <div class="bhv-card" style="margin-bottom: 0.8rem; border-left: 4px solid {border_col};">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <div>
                        <strong style="font-size: 1rem; color: #0F172A;">{amb.get('name') if amb else chk.get('bioambassador_id')}</strong>
                        <span style="font-size: 0.8rem; color: #64748B; margin-left: 6px;">&bull; Misión: <b>{chk.get('mission_id')}</b> {f"| Tarea: {chk.get('task_id')}" if chk.get('task_id') else ""}</span>
                    </div>
                    <span style="font-size: 0.78rem; color: #94A3B8;">📅 {chk.get('date')}</span>
                </div>
                <div style="margin-top: 8px; font-size: 0.88rem;">
                    <div style="color: #065F46;"><b>✅ Avance:</b> {chk.get('progress')}</div>
                    <div style="color: #0369A1; margin-top: 4px;"><b>🎯 Próximo paso:</b> {chk.get('next_action')}</div>
                    {f'<div style="color: #DC2626; margin-top: 4px; background: #FEF2F2; padding: 4px 8px; border-radius: 4px;"><b>🚨 Bloqueo:</b> {chk.get("blocker")}</div>' if has_blk else ''}
                </div>
            </div>
            """, unsafe_allow_html=True)
            
            # Action to resolve blocker
            if has_blk and not is_res:
                if st.button(f"Marcar Bloqueo de {chk.get('id')} como Resuelto ✅", key=f"res_{chk.get('id')}"):
                    for item in db["checkins"]:
                        if item["id"] == chk["id"]:
                            item["resolved"] = True
                            break
                    save_data("checkins", db["checkins"])
                    st.success("Bloqueo marcado como resuelto.")
                    st.rerun()


# -------------------------------------------------------------------------
# 5. SPRINT REVIEW & SCORING
# -------------------------------------------------------------------------
elif menu in ["⭐ Sprint Review", "⭐ Sprint Review (Evaluar & Liberar BP)"]:
    st.markdown("""
    <div style="margin-bottom: 1.5rem;">
        <h1 style="margin: 0; color: #064E3B; font-weight: 800;">Sprint Review & Liberación de BioPuntos</h1>
        <p style="color: #64748B; margin: 0; font-size: 1.05rem;">
            Evaluación transparente por el Mission Owner. Los puntos reconocen resultados, calidad, colaboración e impacto.
        </p>
    </div>
    """, unsafe_allow_html=True)

    # Filter missions ready for review or in review
    reviewable_missions = [m for m in db["missions"] if m.get("status") in ["REVIEW", "IN PROGRESS", "DONE"]]
    
    col_rev_sel, col_rev_info = st.columns([2, 3])
    
    with col_rev_sel:
        selected_m_title = st.selectbox(
            "Seleccionar Misión a Evaluar:",
            options=[f"{m['id']} — {m['title']} ({m['status']})" for m in reviewable_missions]
        )
        selected_mid = selected_m_title.split(" — ")[0].strip()
        mission = next((m for m in db["missions"] if m["id"] == selected_mid), None)

    with col_rev_info:
        if mission:
            st.markdown(f"""
            <div class="bhv-card" style="background: #F8FAFC;">
                <div style="font-weight: 700; color: #064E3B; font-size: 1.05rem;">{mission.get('title')}</div>
                <div style="font-size: 0.85rem; color: #475569; margin: 4px 0;">
                    <b>Tipo:</b> {mission.get('difficulty')} &bull; <b>Puntos Base:</b> {mission.get('base_points')} BP &bull; <b>Estado:</b> {mission.get('status')}
                </div>
                <div style="font-size: 0.85rem; color: #065F46; background: #ECFDF5; padding: 6px 10px; border-radius: 6px; margin-top: 6px;">
                    📦 <b>Entregable comprometido:</b> {mission.get('deliverable')}
                </div>
            </div>
            """, unsafe_allow_html=True)

    st.divider()

    if mission:
        st.subheader("Evaluación de Desempeño (Rúbrica 0 a 5)")
        
        # Select Bioembajador who completed the mission/tasks
        candidate_ambs = [a for a in db["ambassadors"]]
        eval_amb_label = st.selectbox(
            "Bioembajador Destinatario de los BioPuntos:",
            options=[f"{a['name']} (DNI: {a['dni']}) [{a['id']}]" for a in candidate_ambs]
        )
        eval_amb_id = eval_amb_label.split("[")[-1].replace("]", "").strip()

        col_c1, col_c2 = st.columns(2)
        with col_c1:
            val_completion = st.slider("1. ¿Se entregó lo comprometido? (Cumplimiento)", 0.0, 5.0, 4.5, 0.1)
            val_quality = st.slider("2. ¿Cumple el estándar de calidad? (Calidad)", 0.0, 5.0, 4.5, 0.1)
        with col_c2:
            val_collab = st.slider("3. ¿Cómo fue la colaboración en la Squad? (Colaboración)", 0.0, 5.0, 4.8, 0.1)
            val_impact = st.slider("4. ¿Qué impacto medible generó? (Impacto)", 0.0, 5.0, 4.5, 0.1)

        val_early = st.checkbox("⚡ ¿Entregado antes de la fecha límite? (+5 BP Early Bonus)", value=True)

        # Real-time calculation preview
        scoring_res = calculate_biopoints(
            base_points=mission.get("base_points", 25),
            quality=val_quality,
            collaboration=val_collab,
            impact=val_impact,
            early_delivered=val_early
        )

        st.markdown("### 📊 Desglose de Cálculo de BioPuntos")
        
        b_c1, b_c2, b_c3, b_c4, b_c5 = st.columns(5)
        with b_c1:
            st.metric("Base Points", scoring_res["base_points"])
        with b_c2:
            st.metric("Calidad Bonus", f"+{scoring_res['quality_bonus']} BP", ">= 4.5: +10 | >= 4.0: +5")
        with b_c3:
            st.metric("Colaboración", f"+{scoring_res['collaboration_bonus']} BP", ">= 4.5: +5")
        with b_c4:
            st.metric("Impacto Bonus", f"+{scoring_res['impact_bonus']} BP", ">= 4.5: +10 | >= 4.0: +5")
        with b_c5:
            st.metric("Early Bonus", f"+{scoring_res['early_bonus']} BP", "Entrega anticipada")

        st.markdown(f"""
        <div style="background: #ECFDF5; border: 2px solid #10B981; border-radius: 12px; padding: 14px; text-align: center; margin: 15px 0;">
            <span style="font-size: 0.9rem; color: #065F46; font-weight: 700; text-transform: uppercase;">BioPuntos Finales a Liberar</span>
            <div style="font-size: 2.2rem; font-weight: 800; color: #047857;">
                {scoring_res['final_points']} BP
            </div>
            <div style="font-size: 0.8rem; color: #64748B;">
                Tope máximo permitido: <b>{scoring_res['max_allowed']} BP</b> (2x base) {f'| ⚠️ Se aplicó tope sobre {scoring_res["raw_points"]} BP brutos' if scoring_res['capped_applied'] else ''}
            </div>
        </div>
        """, unsafe_allow_html=True)

        rev_comments = st.text_area("Comentarios y feedback cualitativo del Mission Owner:", placeholder="Excelente trabajo identificando los contactos...")

        if st.button("✅ Aprobar Sprint Review y Liberar BioPuntos", type="primary"):
            # 1. Update Review records
            new_rev_id = f"REV-{len(db['reviews']) + 1:03d}"
            new_rev = {
                "id": new_rev_id,
                "mission_id": selected_mid,
                "sprint": st.session_state.active_sprint,
                "bioambassador_id": eval_amb_id,
                "completion": val_completion,
                "quality": val_quality,
                "collaboration": val_collab,
                "impact": val_impact,
                "early_delivered": val_early,
                "base_points": scoring_res["base_points"],
                "quality_bonus": scoring_res["quality_bonus"],
                "collaboration_bonus": scoring_res["collaboration_bonus"],
                "impact_bonus": scoring_res["impact_bonus"],
                "early_bonus": scoring_res["early_bonus"],
                "final_points": scoring_res["final_points"],
                "reviewer": current_user.get("name") if current_user else "Mission Owner",
                "comments": rev_comments.strip(),
                "created_at": date.today().isoformat()
            }
            db["reviews"].append(new_rev)
            save_data("reviews", db["reviews"])

            # 2. Update Mission Status to DONE
            for m in db["missions"]:
                if m["id"] == selected_mid:
                    m["status"] = "DONE"
                    m["review_completed"] = True
                    m["points_assigned"] = True
                    break
            save_data("missions", db["missions"])

            # 3. Credit BioPuntos & Evaluate Gamification for the Ambassador
            target_amb = get_ambassador_by_id(eval_amb_id)
            if target_amb:
                target_amb["bio_points"] = target_amb.get("bio_points", 0) + scoring_res["final_points"]
                target_amb["level"] = get_level(target_amb["bio_points"])
                
                # Check impact metrics increment
                if mission.get("difficulty") == "Moonshot":
                    target_amb["impact_stats"]["moonshot_missions"] = target_amb["impact_stats"].get("moonshot_missions", 0) + 1
                if mission.get("squad") == "Research":
                    target_amb["impact_stats"]["research_missions"] = target_amb["impact_stats"].get("research_missions", 0) + 1

                # Re-evaluate badges
                earned_b, new_b = evaluate_badges(
                    target_amb["impact_stats"],
                    target_amb.get("active_sprints", 1),
                    target_amb.get("badges", [])
                )
                target_amb["badges"] = earned_b
                
                for a in db["ambassadors"]:
                    if a["id"] == eval_amb_id:
                        a.update(target_amb)
                        break
                save_data("ambassadors", db["ambassadors"])

                badge_msg = f" ¡Y desbloqueó nuevas insignias: {', '.join(new_b)}!" if new_b else ""
                st.success(f"🎉 ¡Sprint Review completado! Se han acreditado **+{scoring_res['final_points']} BP** a **{target_amb['name']}**.{badge_msg}")
                st.rerun()


# -------------------------------------------------------------------------
# 6. BIOPASSPORT & GAMIFICACIÓN
# -------------------------------------------------------------------------
elif menu in ["🛡️ BioPassport", "🛡️ Mi BioPassport"]:
    st.markdown("""
    <div style="margin-bottom: 1.5rem;">
        <h1 style="margin: 0; color: #064E3B; font-weight: 800;">BioPassport Digital</h1>
        <p style="color: #64748B; margin: 0; font-size: 1.05rem;">
            Perfil oficial de reputación, impacto acumulado y trayectoria de voluntariado en BioHubVenture.
        </p>
    </div>
    """, unsafe_allow_html=True)

    if not current_user:
        st.warning("Selecciona o ingresa un DNI válido en la barra lateral.")
    else:
        lvl_info = get_level_info(current_user.get("bio_points", 0))
        stats = current_user.get("impact_stats", {})

        # Header Card
        st.markdown(f"""
        <div class="bhv-card" style="background: linear-gradient(135deg, #064E3B, #0F766E); color: white; border: none; padding: 1.8rem; margin-bottom: 1.5rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap;">
                <div>
                    <span style="background: rgba(255,255,255,0.2); padding: 3px 10px; border-radius: 999px; font-size: 0.8rem; font-weight: 600;">
                        DNI: {current_user.get('dni')} &bull; ID: {current_user.get('id')}
                    </span>
                    <h2 style="margin: 8px 0 2px 0; font-size: 1.8rem; font-weight: 800;">{current_user.get('name')}</h2>
                    <div style="font-size: 0.95rem; opacity: 0.9;">
                        📍 {current_user.get('country')} &bull; Squad Principal: <b>{current_user.get('squad')}</b>
                    </div>
                </div>
                <div style="text-align: right;">
                    <div style="font-size: 2.2rem; font-weight: 800; color: #FCD34D;">
                        {current_user.get('bio_points', 0)} <span style="font-size: 1.1rem; color: #FFF;">BP</span>
                    </div>
                    <div style="background: rgba(255,255,255,0.25); padding: 4px 14px; border-radius: 999px; font-weight: 700; font-size: 0.9rem;">
                        {lvl_info['icon']} {lvl_info['current_level']}
                    </div>
                </div>
            </div>
        </div>
        """, unsafe_allow_html=True)

        # Level Progression Bar
        st.subheader("📈 Trayectoria de Niveles BioSCRUM")
        if lvl_info["is_max_level"]:
            st.success("👑 ¡Has alcanzado el nivel máximo **BioFellow**!")
            st.progress(1.0)
        else:
            st.progress(lvl_info["progress_pct"])
            st.caption(f"Nivel Actual: **{lvl_info['current_level']}** &bull; Próximo Nivel: **{lvl_info['next_level']}** (Faltan **{lvl_info['points_needed']} BP**)")

        st.divider()

        # Cumulative Impact Metrics
        st.subheader("🌱 Métricas de Impacto Acumulado")
        i_c1, i_c2, i_c3, i_c4, i_c5 = st.columns(5)
        with i_c1:
            st.metric("🌱 Startups Mapeadas", stats.get("startups_scouted", 0))
        with i_c2:
            st.metric("🔬 Misiones Research", stats.get("research_missions", 0))
        with i_c3:
            st.metric("🤝 Misiones Comunidad", stats.get("community_missions", 0))
        with i_c4:
            st.metric("🎙️ Eventos Apoyados", stats.get("events_supported", 0))
        with i_c5:
            st.metric("🌐 Alianzas Creadas", stats.get("alliances_generated", 0))

        st.divider()

        # Badges Showcase
        st.subheader("🎖️ Colección de Insignias & Badges")
        st.caption("Los badges reconocen especialización y compromiso continuo.")
        
        user_badges = set(current_user.get("badges", []))
        badge_cols = st.columns(4)
        
        for b_idx, (b_name, b_data) in enumerate(BADGE_DEFINITIONS.items()):
            col_target = badge_cols[b_idx % 4]
            is_earned = b_name in user_badges
            
            with col_target:
                status_chip = "earned" if is_earned else "locked"
                st.markdown(f"""
                <div class="badge-chip {status_chip}" style="width: 100%; display: flex; flex-direction: column; align-items: center; text-align: center; padding: 12px; margin-bottom: 10px;">
                    <div style="font-size: 1.8rem;">{b_data['icon']}</div>
                    <div style="font-weight: 700; margin-top: 4px;">{b_name}</div>
                    <div style="font-size: 0.75rem; color: #64748B; margin-top: 4px;">{b_data['description']}</div>
                    <div style="margin-top: 6px; font-size: 0.75rem; font-weight: 700; color: {'#059669' if is_earned else '#94A3B8'};">
                        {'✅ DESBLOQUEADO' if is_earned else f"🔒 Meta: {b_data['threshold']}"}
                    </div>
                </div>
                """, unsafe_allow_html=True)

        st.divider()

        # Streaks (Rachas)
        st.subheader("🔥 Racha de Sprints Consecutivos")
        sprints_count = current_user.get("active_sprints", 0)
        st.markdown(f"Racha actual: **{sprints_count} Sprints Activos Consecutivos**")
        
        perks = get_streak_perks(sprints_count)
        p_cols = st.columns(4)
        for idx, p in enumerate(perks):
            with p_cols[idx]:
                unlocked = p["unlocked"]
                st.markdown(f"""
                <div class="bhv-card" style="text-align: center; border-top: 3px solid {'#10B981' if unlocked else '#CBD5E1'};">
                    <div style="font-size: 1.2rem;">{'🔥' if unlocked else '⏳'} {p['threshold']} Sprints</div>
                    <div style="font-weight: 700; font-size: 0.85rem; color: #0F172A; margin: 4px 0;">{p['title']}</div>
                    <div style="font-size: 0.75rem; color: #64748B;">{p['desc']}</div>
                    <div style="margin-top: 6px; font-size: 0.75rem; font-weight: 700; color: {'#059669' if unlocked else '#94A3B8'};">
                        {'✨ Activo' if unlocked else 'Pendiente'}
                    </div>
                </div>
                """, unsafe_allow_html=True)


# -------------------------------------------------------------------------
# 7. BIOSQUADS
# -------------------------------------------------------------------------
elif menu in ["👥 BioSquads", "👥 Gestión de BioSquads", "👥 Mi BioSquad"]:
    st.markdown("""
    <div style="margin-bottom: 1.5rem;">
        <h1 style="margin: 0; color: #064E3B; font-weight: 800;">Ecosistema de BioSquads</h1>
        <p style="color: #64748B; margin: 0; font-size: 1.05rem;">
            Estructura de células multidisciplinarias (4–6 miembros) coordinadas por un BioLeader.
        </p>
    </div>
    """, unsafe_allow_html=True)

    sq_cols = st.columns(3)
    
    for idx, sq_name in enumerate(SQUADS):
        with sq_cols[idx % 3]:
            sq_members = [a for a in db["ambassadors"] if a.get("squad") == sq_name]
            sq_missions = [m for m in db["missions"] if m.get("squad") == sq_name]

            st.markdown(f"""
            <div class="bhv-card" style="margin-bottom: 1.2rem; border-top: 4px solid #059669;">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <h3 style="margin: 0; color: #064E3B; font-size: 1.15rem;">{sq_name} Squad</h3>
                    <span style="background: #ECFDF5; color: #065F46; padding: 2px 8px; border-radius: 999px; font-size: 0.78rem; font-weight: 700;">
                        {len(sq_members)} Miembros
                    </span>
                </div>
                <div style="font-size: 0.8rem; color: #64748B; margin: 8px 0 10px 0;">
                    🎯 <b>Misiones Asignadas:</b> {len(sq_missions)} misiones
                </div>
                <div style="border-top: 1px solid #E2E8F0; padding-top: 8px;">
                    <strong style="font-size: 0.78rem; color: #334155; text-transform: uppercase;">Integrantes:</strong>
                    <div style="margin-top: 4px;">
                        {''.join([f'<span style="display: inline-block; background: #F1F5F9; color: #334155; padding: 2px 6px; border-radius: 4px; font-size: 0.75rem; margin: 2px;">{m.get("name")}</span>' for m in sq_members])}
                    </div>
                </div>
            </div>
            """, unsafe_allow_html=True)


# -------------------------------------------------------------------------
# 8. BIORETRO
# -------------------------------------------------------------------------
elif menu == "🔄 BioRetro":
    st.markdown("""
    <div style="margin-bottom: 1.5rem;">
        <h1 style="margin: 0; color: #064E3B; font-weight: 800;">BioRetro Ágil</h1>
        <p style="color: #64748B; margin: 0; font-size: 1.05rem;">
            Espacio simple de mejora continua al final de cada Sprint. No asigna BioPuntos; optimiza el sistema.
        </p>
    </div>
    """, unsafe_allow_html=True)

    r_col1, r_col2 = st.columns([1, 1])

    with r_col1:
        st.subheader("📝 Registrar Retrospectiva de Squad")
        with st.form("form_retro"):
            ret_squad = st.selectbox("BioSquad:", SQUADS)
            ret_sprint = st.selectbox("Sprint Evaluado:", [s["id"] for s in db["sprints"]])
            
            st.markdown("🟢 **MANTENER**: ¿Qué funcionó muy bien?")
            ret_keep = st.text_area("Prácticas a preservar", placeholder="Ej: La fluidez de los BioCheck-ins...")

            st.markdown("🟡 **MEJORAR**: ¿Qué debemos corregir?")
            ret_improve = st.text_area("Puntos de fricción a resolver", placeholder="Ej: Las fichas técnicas de startups no tenían formato estándar...")

            st.markdown("🟣 **PROBAR**: ¿Qué experimentaremos en el próximo Sprint?")
            ret_try = st.text_area("Acción o experimento concreto", placeholder="Ej: Usar una plantilla única en Google Sheets...")

            btn_retro = st.form_submit_button("Guardar BioRetro")
            if btn_retro:
                if not ret_keep.strip() or not ret_improve.strip():
                    st.error("Por favor completa los campos de 'Mantener' y 'Mejorar'.")
                else:
                    new_ret_id = f"RET-{len(db['retros']) + 1:03d}"
                    new_ret = {
                        "id": new_ret_id,
                        "squad": ret_squad,
                        "sprint": ret_sprint,
                        "keep": ret_keep.strip(),
                        "improve": ret_improve.strip(),
                        "try_next": ret_try.strip(),
                        "created_at": date.today().isoformat()
                    }
                    db["retros"].append(new_ret)
                    save_data("retros", db["retros"])
                    st.success(f"✅ ¡BioRetro `{new_ret_id}` registrada exitosamente!")
                    st.rerun()

    with r_col2:
        st.subheader("📚 Histórico de Aprendizajes")
        for ret in reversed(db["retros"]):
            st.markdown(f"""
            <div class="bhv-card" style="margin-bottom: 0.8rem; background: #FAFAFA;">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <strong style="color: #064E3B;">BioSquad {ret.get('squad')} &bull; {ret.get('sprint')}</strong>
                    <span style="font-size: 0.75rem; color: #94A3B8;">{ret.get('created_at')}</span>
                </div>
                <div style="margin-top: 8px; font-size: 0.85rem;">
                    <div style="color: #065F46;">🟢 <b>Mantener:</b> {ret.get('keep')}</div>
                    <div style="color: #B45309; margin-top: 4px;">🟡 <b>Mejorar:</b> {ret.get('improve')}</div>
                    <div style="color: #6D28D9; margin-top: 4px;">🟣 <b>Probar:</b> {ret.get('try_next')}</div>
                </div>
            </div>
            """, unsafe_allow_html=True)


# -------------------------------------------------------------------------
# 9. CONFIGURACIÓN & DATOS
# -------------------------------------------------------------------------
elif menu == "⚙️ Configuración & Datos":
    st.markdown("""
    <div style="margin-bottom: 1.5rem;">
        <h1 style="margin: 0; color: #064E3B; font-weight: 800;">Configuración del Sistema</h1>
        <p style="color: #64748B; margin: 0; font-size: 1.05rem;">
            Gestión de embajadores, DNI, exportación y reinicio de base de datos de demostración.
        </p>
    </div>
    """, unsafe_allow_html=True)

    adm_tab1, adm_tab2 = st.tabs(["👤 Alta de Nuevo Bioembajador", "🔄 Gestión de Base de Datos Demo"])

    with adm_tab1:
        st.subheader("Registrar Nuevo Bioembajador con DNI")
        with st.form("form_new_amb"):
            a_c1, a_c2 = st.columns(2)
            with a_c1:
                new_name = st.text_input("Nombre Completo *", placeholder="Ej: Mateo Salazar")
                new_dni = st.text_input("DNI / Documento de Identidad *", placeholder="Ej: 84920194")
                new_email = st.text_input("Correo Electrónico *", placeholder="mateo.salazar@biohubventure.org")
                new_country = st.text_input("País *", placeholder="Perú 🇵🇪")
            with a_c2:
                new_squad = st.selectbox("BioSquad Principal *", SQUADS)
                new_skills = st.text_input("Skills principales (separados por coma)", placeholder="Biotech, Agtech, Data")

            btn_save_amb = st.form_submit_button("🌱 Dar de Alta en BioSCRUM")
            if btn_save_amb:
                if not new_name.strip() or not new_dni.strip():
                    st.error("El nombre y el DNI son obligatorios.")
                elif get_ambassador_by_dni(new_dni):
                    st.error(f"Ya existe un Bioembajador registrado con el DNI {new_dni}.")
                else:
                    new_amb_id = f"BIO-{len(db['ambassadors']) + 10:03d}"
                    skills_list = [s.strip() for s in new_skills.split(",") if s.strip()]
                    new_amb_record = {
                        "id": new_amb_id,
                        "dni": new_dni.strip(),
                        "name": new_name.strip(),
                        "email": new_email.strip(),
                        "country": new_country.strip(),
                        "squad": new_squad,
                        "role": "Bioembajador",
                        "level": "BioExplorer",
                        "bio_points": 0,
                        "active_sprints": 1,
                        "status": "Activo",
                        "skills": skills_list,
                        "badges": [],
                        "impact_stats": {
                            "startups_scouted": 0,
                            "community_missions": 0,
                            "research_missions": 0,
                            "events_supported": 0,
                            "alliances_generated": 0,
                            "mentorships_done": 0,
                            "moonshot_missions": 0
                        },
                        "created_at": date.today().isoformat()
                    }
                    db["ambassadors"].append(new_amb_record)
                    save_data("ambassadors", db["ambassadors"])
                    st.session_state.current_dni = new_dni.strip()
                    st.success(f"✅ ¡Bioembajador `{new_name}` registrado exitosamente con ID `{new_amb_id}` y DNI `{new_dni}`!")
                    st.rerun()

    with adm_tab2:
        st.subheader("Restablecimiento de Base de Datos de Prueba")
        st.warning("⚠️ Esta acción restablecerá todas las misiones, tareas, check-ins y reviews a su estado inicial de demostración.")
        
        if st.button("🔄 Restablecer Datos de Demostración (Seed)", type="primary"):
            init_database(force_reset=True)
            st.success("✅ Base de datos restablecida con datos semilla iniciales de BioHubVenture 2026.")
            st.rerun()
