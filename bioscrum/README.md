# 🌱 BioSCRUM BHV v1.0 — BioHubVenture

Sistema Operativo de Gestión de Voluntariado, Colaboración Ágil y Gamificación para los **Bioembajadores** de **BioHubVenture**.

---

## 📌 1. Propósito y Estructura

BioSCRUM transforma la colaboración voluntaria en un flujo visible, trazable y motivador sin burocracia, estructurado en torno a **4 elementos obligatorios**:

1. **🎯 Mission Card** — Qué se necesita y cuál es el entregable verificable.
2. **📋 Kanban Board** — Dónde está cada tarea (`BACKLOG` → `READY` → `IN PROGRESS` → `REVIEW` → `DONE`).
3. **⚡ BioCheck-in** — Qué está pasando (Avance, Siguiente paso, Bloqueos y detección automática de alertas).
4. **⭐ Sprint Review** — Qué resultado se produjo y cálculo transparente de BioPuntos con bonificaciones.

---

## 🪪 2. Identificación y Trazabilidad por DNI

Cada voluntario se identifica mediante su **DNI / Documento de Identidad**:
- Al ingresar o seleccionar su DNI, el sistema carga su **BioPassport Digital**.
- Valida en tiempo real la **regla de carga (máx. 2 tareas activas)**.
- Permite postularse a misiones (`READY`) y registrar tareas vinculadas a su identidad.
- Acumula BioPuntos, desbloquea Badges de impacto y sube de nivel automáticamente tras el Sprint Review.

---

## 🚀 3. Instrucciones de Ejecución

### Prerrequisitos
- Python 3.10+
- Streamlit, Pandas, Plotly

### Instalación de dependencias
```bash
pip install -r bioscrum/requirements.txt
```

### Ejecutar la aplicación
```bash
streamlit run bioscrum/app.py
```

La aplicación se abrirá localmente en `http://localhost:8501`.

---

## 🏆 4. Reglas de Gamificación Oficiales

### Fórmula de BioPuntos:
$$\text{final\_points} = \min(\text{base\_points} + \text{quality\_bonus} + \text{collaboration\_bonus} + \text{impact\_bonus} + \text{early\_bonus},\; \text{base\_points} \times 2)$$

- **Calidad**: $+10$ BP si $\ge 4.5$, $+5$ BP si $\ge 4.0$.
- **Colaboración**: $+5$ BP si $\ge 4.5$.
- **Impacto**: $+10$ BP si $\ge 4.5$, $+5$ BP si $\ge 4.0$.
- **Entrega Anticipada (Early)**: $+5$ BP.
- **Tope estricto**: Máximo el doble ($2\times$) de los puntos base de la misión.

### Niveles BioSCRUM:
- **BioExplorer**: $0 - 49$ BP
- **BioConnector**: $50 - 149$ BP
- **BioBuilder**: $150 - 299$ BP
- **BioLeader**: $300 - 499$ BP
- **BioFellow**: $\ge 500$ BP (Máxima distinción)

---

## 📁 5. Estructura del Código

```text
bioscrum/
│
├── app.py                      # Interfaz principal Streamlit, navegación y vistas
├── requirements.txt            # Dependencias del proyecto
├── README.md                   # Documentación oficial
│
├── modules/
│   ├── models.py               # Definición de constantes, squads, dificultades y badges
│   ├── scoring.py              # Motor de cálculo y bonos de BioPuntos
│   ├── gamification.py         # Motor de niveles, insignias y rachas
│   ├── kanban.py               # Lógica de estados y control de concurrencia
│   ├── sprint_health.py        # Semáforo de salud y métricas de sprint
│   └── storage.py              # Persistencia JSON y dataset semilla realista 2026
│
├── data/                       # Almacenamiento local persistente
│   ├── ambassadors.json
│   ├── missions.json
│   ├── tasks.json
│   ├── checkins.json
│   ├── reviews.json
│   ├── retros.json
│   └── sprints.json
│
└── assets/
    └── custom.css              # Identidad visual BioHubVenture
```
