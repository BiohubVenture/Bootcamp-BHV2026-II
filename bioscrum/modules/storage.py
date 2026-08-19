"""
Storage and Persistence Layer for BioSCRUM BHV.
Manages JSON storage and initializes comprehensive, realistic demo data for BioHubVenture 2026.
"""

import json
import os
from typing import Dict, List, Any, Optional
from datetime import date, datetime

DATA_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), "data")

FILES = {
    "ambassadors": "ambassadors.json",
    "missions": "missions.json",
    "tasks": "tasks.json",
    "checkins": "checkins.json",
    "reviews": "reviews.json",
    "retros": "retros.json",
    "sprints": "sprints.json",
    "applications": "applications.json"
}


def _ensure_data_dir():
    if not os.path.exists(DATA_DIR):
        os.makedirs(DATA_DIR, exist_ok=True)


def _get_file_path(key: str) -> str:
    _ensure_data_dir()
    return os.path.join(DATA_DIR, FILES[key])


def load_data(key: str) -> List[Dict[str, Any]]:
    path = _get_file_path(key)
    if not os.path.exists(path):
        return []
    try:
        with open(path, "r", encoding="utf-8") as f:
            return json.load(f)
    except Exception:
        return []


def save_data(key: str, data: List[Dict[str, Any]]) -> bool:
    path = _get_file_path(key)
    try:
        with open(path, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
        return True
    except Exception as e:
        print(f"Error saving {key}: {e}")
        return False


def get_ambassador_by_dni(dni: str) -> Optional[Dict[str, Any]]:
    ambassadors = load_data("ambassadors")
    for amb in ambassadors:
        if str(amb.get("dni", "")).strip() == str(dni).strip():
            return amb
    return None


def get_ambassador_by_id(amb_id: str) -> Optional[Dict[str, Any]]:
    ambassadors = load_data("ambassadors")
    for amb in ambassadors:
        if amb.get("id") == amb_id:
            return amb
    return None


# =========================================================================
# Semilla de Datos Iniciales (BioHubVenture 2026 LATAM)
# =========================================================================

INITIAL_AMBASSADORS = []

INITIAL_SPRINTS = [
    {
        "id": "Sprint 0",
        "name": "Sprint 0 — Preparación y Activación (Lanzamiento 2026-II)",
        "start_date": "2026-08-16",
        "end_date": "2026-08-23",
        "status": "Active",
        "goal": "Actualizar marketplace, lanzar convocatoria BHV 2026-II, radar de testimonios, retos corporativos y activar BioSCRUM."
    },
    {
        "id": "Sprint 1",
        "name": "Sprint 1 — Experiencia Digital y Conversión",
        "start_date": "2026-08-24",
        "end_date": "2026-09-06",
        "status": "Planning",
        "goal": "Integrar test interactivo de challenges, optimización web trilingüe, investor gateway y habilitación de GitHub."
    },
    {
        "id": "Investigación",
        "name": "Línea Paralela — Investigación BHV (Cohorte I)",
        "start_date": "2026-08-16",
        "end_date": "2026-09-30",
        "status": "Active",
        "goal": "Desarrollar manuscrito académico sobre lecciones financieras y análisis socio-técnico CTS de la cohorte anterior."
    }
]

INITIAL_MISSIONS = [
    # --- SPRINT 0 ---
    {
        "id": "BHV-001",
        "title": "Misión 01 — Actualización del Marketplace de Startups",
        "description": "Crear el formulario para actualizar información de las startups: datos de contacto, país, web/RRSS, logo, fotografías reales, principales logros y nuevo pitch. La finalidad es transformar el portafolio en un verdadero marketplace para visibilidad y conexiones.",
        "owner": "Clara Divy Rodríguez Aredo (Soporte: David Chaupis-Meza)",
        "squad": "Startup Support",
        "difficulty": "Growth",
        "base_points": 25,
        "status": "IN PROGRESS",
        "sprint": "Sprint 0",
        "start_date": "2026-08-16",
        "due_date": "2026-08-23",
        "deliverable": "Formulario oficial de actualización de startups + base estructurada con datos, fotos reales y pitch.",
        "impact_metric": "Startups actualizadas en Marketplace",
        "deliverable_submitted": False,
        "review_completed": False,
        "points_assigned": False
    },
    {
        "id": "BHV-002",
        "title": "Misión 02 — Radar de testimonios y reputación digital",
        "description": "Recopilar menciones, comentarios, premios, noticias y publicaciones de terceros sobre las startups BHV para incorporarlos en la web y reforzar evidencia de impacto.",
        "owner": "María Belén Terán Villegas",
        "squad": "Growth",
        "difficulty": "Seed",
        "base_points": 10,
        "status": "READY",
        "sprint": "Sprint 0",
        "start_date": "2026-08-16",
        "due_date": "2026-08-23",
        "deliverable": "Repositorio consolidado de menciones, prensa, premios y testimonios de impacto verificados.",
        "impact_metric": "Evidencias y testimonios recopilados",
        "deliverable_submitted": False,
        "review_completed": False,
        "points_assigned": False
    },
    {
        "id": "BHV-003",
        "title": "Misión 03 — Campaña '10 Desafíos BHV 2026-II'",
        "description": "Desarrollar progresivamente contenidos para RRSS que expliquen cada uno de los 10 retos estratégicos de la cohorte, ayudando a que potenciales postulantes identifiquen dónde encaja su solución.",
        "owner": "María Belén Terán Villegas",
        "squad": "Growth",
        "difficulty": "Growth",
        "base_points": 25,
        "status": "READY",
        "sprint": "Sprint 0",
        "start_date": "2026-08-16",
        "due_date": "2026-08-25",
        "deliverable": "Parrilla de publicaciones y copies para redes sociales sobre los 10 desafíos prioritarios.",
        "impact_metric": "Contenidos de desafíos difundidos",
        "deliverable_submitted": False,
        "review_completed": False,
        "points_assigned": False
    },
    {
        "id": "BHV-004",
        "title": "Misión 04 — Corporate Challenge Scouting",
        "description": "Identificar empresas con necesidades reales de innovación, responsables de I+D/innovación y oportunidades donde las startups BHV puedan plantear soluciones (acercamiento a Esmeralda Corp y ProInnóvate).",
        "owner": "Ulises Costilla + Evelyn Cribillero Mejia",
        "squad": "Ecosystem",
        "difficulty": "Impact",
        "base_points": 40,
        "status": "READY",
        "sprint": "Sprint 0",
        "start_date": "2026-08-16",
        "due_date": "2026-08-28",
        "deliverable": "Mapeo de empresas con responsables de I+D y fichas de retos corporativos de innovación abierta.",
        "impact_metric": "Retos corporativos identificados",
        "deliverable_submitted": False,
        "review_completed": False,
        "points_assigned": False
    },
    {
        "id": "BHV-005",
        "title": "Misión 05 — Blog & Bioeconomy Content",
        "description": "Organizar una publicación semanal en el Blog BHV, convocando progresivamente a Bioembajadores, founders, mentores y especialistas como autores, evolucionando hacia un boletín institucional.",
        "owner": "ANJELI ABIGAIL PARIONA DAVALOS",
        "squad": "Research",
        "difficulty": "Growth",
        "base_points": 25,
        "status": "READY",
        "sprint": "Sprint 0",
        "start_date": "2026-08-16",
        "due_date": "2026-08-25",
        "deliverable": "Calendario editorial del blog + primer artículo validado y autores coordinados.",
        "impact_metric": "Artículos publicados en Blog BHV",
        "deliverable_submitted": False,
        "review_completed": False,
        "points_assigned": False
    },
    {
        "id": "BHV-006",
        "title": "Misión 06 — Perfil de Bioembajadores",
        "description": "Cada Bioembajador deberá subir fotografía profesional y proporcionar una bio breve, habilidades principales y LinkedIn para construir el directorio oficial de Bioembajadores BHV.",
        "owner": "David Chaupis-Meza (Participación: Todos los Bioembajadores)",
        "squad": "Tech",
        "difficulty": "Seed",
        "base_points": 10,
        "status": "READY",
        "sprint": "Sprint 0",
        "start_date": "2026-08-16",
        "due_date": "2026-08-22",
        "deliverable": "Fichas completadas con foto profesional, bio, skills y LinkedIn en el directorio BHV.",
        "impact_metric": "Bioembajadores registrados en Directorio",
        "deliverable_submitted": False,
        "review_completed": False,
        "points_assigned": False
    },
    {
        "id": "BHV-007",
        "title": "Misión 07 — Lanzamiento de convocatoria BHV 2026-II",
        "description": "Publicar durante la semana las bases preliminares, requisitos, cronograma y formulario de postulación. Los Bioembajadores revisarán la propuesta y enviarán observaciones antes del lanzamiento definitivo.",
        "owner": "David Chaupis-Meza",
        "squad": "Ecosystem",
        "difficulty": "Impact",
        "base_points": 40,
        "status": "READY",
        "sprint": "Sprint 0",
        "start_date": "2026-08-16",
        "due_date": "2026-08-23",
        "deliverable": "Bases oficiales, cronograma y formulario de postulación 2026-II revisado y publicado.",
        "impact_metric": "Convocatoria 2026-II lanzada",
        "deliverable_submitted": False,
        "review_completed": False,
        "points_assigned": False
    },

    # --- SPRINT 1 ---
    {
        "id": "BHV-008",
        "title": "Misión 08 — Test interactivo de Challenges",
        "description": "Integrar al diagnóstico de madurez un test que permita al founder conocer con cuál de los 10 desafíos BHV tiene mayor afinidad su startup y dirigirlo hacia el reto correspondiente.",
        "owner": "Clara Divy Rodríguez Aredo (Apoyo conceptual) + David Chaupis-Meza (Implementación)",
        "squad": "Tech",
        "difficulty": "Growth",
        "base_points": 25,
        "status": "READY",
        "sprint": "Sprint 1",
        "start_date": "2026-08-24",
        "due_date": "2026-09-02",
        "deliverable": "Test interactivo integrado a la web con lógica de asignación a los 10 retos BHV.",
        "impact_metric": "Startups guiadas a su desafío afín",
        "deliverable_submitted": False,
        "review_completed": False,
        "points_assigned": False
    },
    {
        "id": "BHV-009",
        "title": "Misión 09 — Optimización web BHV",
        "description": "Completar versión español/inglés/portugués, sustituir imágenes genéricas por evidencia real, actualizar países, validar fotografías de mentores e incorporar servicios y consorcio.",
        "owner": "David Chaupis-Meza",
        "squad": "Tech",
        "difficulty": "Impact",
        "base_points": 40,
        "status": "READY",
        "sprint": "Sprint 1",
        "start_date": "2026-08-24",
        "due_date": "2026-09-04",
        "deliverable": "Plataforma web BHV optimizada en 3 idiomas con evidencia real y servicios del consorcio.",
        "impact_metric": "Módulos web optimizados",
        "deliverable_submitted": False,
        "review_completed": False,
        "points_assigned": False
    },
    {
        "id": "BHV-010",
        "title": "Misión 10 — Investor Gateway",
        "description": "Incorporar en el portafolio un CTA tipo 'Únete a nuestra red de inversionistas' conectado directamente con WhatsApp para captar interesados en BHV y vincularlos con Demo Days.",
        "owner": "Founders BHV",
        "squad": "Startup Support",
        "difficulty": "Growth",
        "base_points": 25,
        "status": "READY",
        "sprint": "Sprint 1",
        "start_date": "2026-08-24",
        "due_date": "2026-09-05",
        "deliverable": "Botón y flujo de captación de inversionistas conectado a WhatsApp en el portafolio.",
        "impact_metric": "Inversionistas conectados a Demo Days",
        "deliverable_submitted": False,
        "review_completed": False,
        "points_assigned": False
    },
    {
        "id": "BHV-011",
        "title": "Misión 11 — BioSCRUM Beta",
        "description": "Poner en funcionamiento el tablero para Bioembajadores bajo la secuencia: Mission Card → Kanban → BioCheck-in → Sprint Review → BioPuntos.",
        "owner": "David Chaupis-Meza",
        "squad": "Tech",
        "difficulty": "Moonshot",
        "base_points": 75,
        "status": "IN PROGRESS",
        "sprint": "Sprint 1",
        "start_date": "2026-08-16",
        "due_date": "2026-08-22",
        "deliverable": "Sistema BioSCRUM Streamlit operativo con trazabilidad por DNI, Kanban y gamificación.",
        "impact_metric": "Bioembajadores operando en BioSCRUM",
        "deliverable_submitted": False,
        "review_completed": False,
        "points_assigned": False
    },
    {
        "id": "BHV-012",
        "title": "Misión 12 — GitHub Ready",
        "description": "Todos los Bioembajadores deberán disponer de cuenta GitHub activa para colaborar posteriormente en iniciativas técnicas y repositorios del consorcio BHV.",
        "owner": "Todo el equipo BHV",
        "squad": "Tech",
        "difficulty": "Seed",
        "base_points": 10,
        "status": "READY",
        "sprint": "Sprint 1",
        "start_date": "2026-08-16",
        "due_date": "2026-08-24",
        "deliverable": "Cuentas de GitHub registradas y vinculadas de todos los integrantes del equipo.",
        "impact_metric": "Bioembajadores con acceso a repositorios",
        "deliverable_submitted": False,
        "review_completed": False,
        "points_assigned": False
    },

    # --- LÍNEA PARALELA DE INVESTIGACIÓN ---
    {
        "id": "BHV-013",
        "title": "Misión 13 — Caso de estudio BHV Cohorte I",
        "description": "Desarrollar el manuscrito académico sobre las lecciones de la cohorte anterior, integrando el componente financiero con un análisis socio-técnico CTS cualitativo y cuantitativo.",
        "owner": "David Chaupis-Meza + Michelle Christine Chirinos Arias",
        "squad": "Research",
        "difficulty": "Moonshot",
        "base_points": 80,
        "status": "IN PROGRESS",
        "sprint": "Investigación",
        "start_date": "2026-08-16",
        "due_date": "2026-09-30",
        "deliverable": "Borrador de manuscrito científico sobre el modelo de consorcio y análisis CTS de la Cohorte I.",
        "impact_metric": "Manuscrito de investigación listo para envío",
        "deliverable_submitted": False,
        "review_completed": False,
        "points_assigned": False
    }
]

INITIAL_TASKS = [
    {
        "id": "TASK-104",
        "mission_id": "BHV-026",
        "title": "Identificar startups de Colombia en Bioinsumos",
        "assigned_to": "BIO-014",
        "status": "IN PROGRESS",
        "priority": "High",
        "created_at": "2026-08-02",
        "updated_at": "2026-08-05"
    },
    {
        "id": "TASK-105",
        "mission_id": "BHV-026",
        "title": "Validar datos y contactos de startups de Perú y Chile",
        "assigned_to": "BIO-002",
        "status": "IN PROGRESS",
        "priority": "Medium",
        "created_at": "2026-08-03",
        "updated_at": "2026-08-06"
    },
    {
        "id": "TASK-106",
        "mission_id": "BHV-027",
        "title": "Contactar speakers para panel de escalado fermentativo",
        "assigned_to": "BIO-050",
        "status": "REVIEW",
        "priority": "High",
        "created_at": "2026-08-04",
        "updated_at": "2026-08-08"
    },
    {
        "id": "TASK-107",
        "mission_id": "BHV-028",
        "title": "Formular guion de entrevista para directores de innovación",
        "assigned_to": "BIO-021",
        "status": "READY",
        "priority": "High",
        "created_at": "2026-08-06",
        "updated_at": "2026-08-06"
    },
    {
        "id": "TASK-108",
        "mission_id": "BHV-029",
        "title": "Elaborar contenido técnico e infografía PGPB",
        "assigned_to": "BIO-014",
        "status": "DONE",
        "priority": "Medium",
        "created_at": "2026-08-01",
        "updated_at": "2026-08-06"
    }
]

INITIAL_CHECKINS = [
    {
        "id": "CHK-204",
        "bioambassador_id": "BIO-014",
        "mission_id": "BHV-026",
        "task_id": "TASK-104",
        "progress": "Identifiqué y clasifiqué 14 startups biotecnológicas en Colombia enfocadas en biofertilizantes y control biológico.",
        "next_action": "Validar página web, directores científicos y estado de patente de las soluciones.",
        "blocker": "Falta información de contacto de dos fundadores de Medellín.",
        "has_blocker": True,
        "resolved": False,
        "date": "2026-08-05"
    },
    {
        "id": "CHK-205",
        "bioambassador_id": "BIO-050",
        "mission_id": "BHV-027",
        "task_id": "TASK-106",
        "progress": "Confirmé a 3 de los 4 speakers internacionales para el Bootcamp.",
        "next_action": "Enviar formulario de biografía y fotografía en alta resolución.",
        "blocker": "",
        "has_blocker": False,
        "resolved": True,
        "date": "2026-08-07"
    },
    {
        "id": "CHK-206",
        "bioambassador_id": "BIO-002",
        "mission_id": "BHV-026",
        "task_id": "TASK-105",
        "progress": "Revisé el listado de Chile y agregué 8 iniciativas de biopolímeros.",
        "next_action": "Cruzar datos con el reporte de Corfo.",
        "blocker": "",
        "has_blocker": False,
        "resolved": True,
        "date": "2026-08-07"
    }
]

INITIAL_REVIEWS = [
    {
        "id": "REV-001",
        "mission_id": "BHV-029",
        "sprint": "Sprint 03",
        "bioambassador_id": "BIO-014",
        "completion": 5.0,
        "quality": 4.8,
        "collaboration": 5.0,
        "impact": 4.5,
        "early_delivered": True,
        "base_points": 10,
        "quality_bonus": 10,
        "collaboration_bonus": 5,
        "impact_bonus": 10,
        "early_bonus": 5,
        "final_points": 20,  # Tope 10 * 2 = 20
        "reviewer": "Dra. Sofía Alarcón",
        "comments": "Excelente precisión científica en el diseño divulgativo. Se entregó 2 días antes.",
        "created_at": "2026-08-06"
    }
]

INITIAL_RETROS = [
    {
        "id": "RET-001",
        "squad": "Research",
        "sprint": "Sprint 02",
        "keep": "La comunicación en los BioCheck-ins ha sido concisa y muy clara.",
        "improve": "Definir mejor los criterios de aceptación en las fichas técnicas de startups.",
        "try_next": "Implementar una plantilla compartida en Google Sheets para el vaciado de datos.",
        "created_at": "2026-07-28"
    }
]


def init_database(force_reset: bool = False):
    """Inicializa la base de datos con los datos semilla si no existen o si se fuerza el reinicio."""
    _ensure_data_dir()

    seed_map = {
        "ambassadors": INITIAL_AMBASSADORS,
        "sprints": INITIAL_SPRINTS,
        "missions": INITIAL_MISSIONS,
        "tasks": INITIAL_TASKS,
        "checkins": INITIAL_CHECKINS,
        "reviews": INITIAL_REVIEWS,
        "retros": INITIAL_RETROS,
        "applications": []
    }

    for key, initial_list in seed_map.items():
        path = _get_file_path(key)
        if not os.path.exists(path) or force_reset:
            save_data(key, initial_list)
