"""
Model definitions and constants for BioSCRUM BHV v1.0.
"""

from typing import Dict, List, Optional, Any
from dataclasses import dataclass, field

# ==========================================
# Constantes del Sistema
# ==========================================

SQUADS = [
    "Research",
    "Ecosystem",
    "Growth",
    "Startup Support",
    "Events",
    "Tech"
]

MISSION_DIFFICULTIES = {
    "Seed": {"name": "Seed Mission", "complexity": "Tarea puntual", "base_points_range": (5, 10), "default_base": 10},
    "Growth": {"name": "Growth Mission", "complexity": "Análisis / coordinación", "base_points_range": (15, 30), "default_base": 25},
    "Impact": {"name": "Impact Mission", "complexity": "Resultado estratégico", "base_points_range": (30, 50), "default_base": 40},
    "Moonshot": {"name": "Moonshot Mission", "complexity": "Proyecto crítico", "base_points_range": (50, 100), "default_base": 75},
}

KANBAN_STATUSES = [
    "BACKLOG",
    "READY",
    "IN PROGRESS",
    "REVIEW",
    "DONE"
]

BADGE_DEFINITIONS = {
    "Green Startup Scout": {
        "icon": "🌱",
        "description": "Mapeó e identificó 30 o más startups de biotecnología o bioeconomía.",
        "condition_metric": "startups_scouted",
        "threshold": 30
    },
    "Community Builder": {
        "icon": "🤝",
        "description": "Completó al menos 5 misiones de fortalecimiento comunitario y vinculación.",
        "condition_metric": "community_missions",
        "threshold": 5
    },
    "Researcher": {
        "icon": "🔬",
        "description": "Entregó 5 o más reportes/análisis de investigación estratégica.",
        "condition_metric": "research_missions",
        "threshold": 5
    },
    "Event Ambassador": {
        "icon": "🎙️",
        "description": "Apoyó activamente en la ejecución de 4 o más eventos o bootcamps BHV.",
        "condition_metric": "events_supported",
        "threshold": 4
    },
    "Ecosystem Connector": {
        "icon": "🌐",
        "description": "Originó y facilitó 3 o más alianzas o acuerdos institucionales.",
        "condition_metric": "alliances_generated",
        "threshold": 3
    },
    "Consistency Champion": {
        "icon": "🔥",
        "description": "Participó activamente durante 4 o más Sprints consecutivos.",
        "condition_metric": "active_sprints",
        "threshold": 4
    },
    "BioMentor": {
        "icon": "🎓",
        "description": "Brindó mentoría o acompañamiento a 3 o más nuevos Bioembajadores.",
        "condition_metric": "mentorships_done",
        "threshold": 3
    },
    "Moonshot Striker": {
        "icon": "🚀",
        "description": "Lideró y completó con éxito al menos una misión de escala Moonshot.",
        "condition_metric": "moonshot_missions",
        "threshold": 1
    }
}
