"""
Gamification Engine: Levels, Badges, Streaks (Rachas) and Ranking for BioSCRUM BHV.
"""

from typing import Dict, List, Any, Tuple
from .models import BADGE_DEFINITIONS

LEVELS_CONFIG = [
    {"name": "BioExplorer", "min_pts": 0, "max_pts": 49, "icon": "🧭", "color": "#64748B", "desc": "Fase inicial de exploración e inmersión en el ecosistema."},
    {"name": "BioConnector", "min_pts": 50, "max_pts": 149, "icon": "🔗", "color": "#0284C7", "desc": "Conecta iniciativas, startups y apoya squads activamente."},
    {"name": "BioBuilder", "min_pts": 150, "max_pts": 299, "icon": "🏗️", "color": "#10B981", "desc": "Construye entregables estratégicos y lidera tareas complejas."},
    {"name": "BioLeader", "min_pts": 300, "max_pts": 499, "icon": "⭐", "color": "#F59E0B", "desc": "Coordina squads, facilita procesos ágiles y mentorea a otros."},
    {"name": "BioFellow", "min_pts": 500, "max_pts": 999999, "icon": "👑", "color": "#8B5CF6", "desc": "Máxima distinción de impacto y trayectoria consolidada en BHV."}
]


def get_level(points: int) -> str:
    """Retorna el nombre del nivel según los puntos acumulados."""
    if points < 50:
        return "BioExplorer"
    elif points < 150:
        return "BioConnector"
    elif points < 300:
        return "BioBuilder"
    elif points < 500:
        return "BioLeader"
    else:
        return "BioFellow"


def get_level_info(points: int) -> Dict[str, Any]:
    """Retorna detalles completos del nivel actual y el progreso hacia el siguiente."""
    current_idx = 0
    for idx, lvl in enumerate(LEVELS_CONFIG):
        if lvl["min_pts"] <= points <= lvl["max_pts"]:
            current_idx = idx
            break

    curr_lvl = LEVELS_CONFIG[current_idx]
    is_max = current_idx == len(LEVELS_CONFIG) - 1
    next_lvl = None if is_max else LEVELS_CONFIG[current_idx + 1]

    if is_max:
        progress_pct = 1.0
        pts_needed = 0
    else:
        span = curr_lvl["max_pts"] - curr_lvl["min_pts"] + 1
        achieved = points - curr_lvl["min_pts"]
        progress_pct = max(0.0, min(1.0, achieved / span))
        pts_needed = (curr_lvl["max_pts"] + 1) - points

    return {
        "current_level": curr_lvl["name"],
        "icon": curr_lvl["icon"],
        "color": curr_lvl["color"],
        "description": curr_lvl["desc"],
        "points": points,
        "is_max_level": is_max,
        "next_level": next_lvl["name"] if next_lvl else None,
        "next_level_min": next_lvl["min_pts"] if next_lvl else None,
        "progress_pct": progress_pct,
        "points_needed": pts_needed
    }


def evaluate_badges(impact_stats: Dict[str, int], active_sprints: int, existing_badges: List[str]) -> Tuple[List[str], List[str]]:
    """
    Evalúa qué badges aplican para un Bioembajador según sus métricas.
    Retorna (todas_las_badges, nuevas_badges_desbloqueadas).
    """
    earned_badges = list(existing_badges)
    new_unlocked = []

    # Métricas combinadas
    metrics = dict(impact_stats or {})
    metrics["active_sprints"] = active_sprints

    for badge_name, badge_data in BADGE_DEFINITIONS.items():
        metric_key = badge_data["condition_metric"]
        threshold = badge_data["threshold"]
        curr_val = metrics.get(metric_key, 0)

        if curr_val >= threshold and badge_name not in earned_badges:
            earned_badges.append(badge_name)
            new_unlocked.append(badge_name)

    return earned_badges, new_unlocked


def get_streak_perks(active_sprints: int) -> List[Dict[str, Any]]:
    """Retorna los beneficios y el estado de la racha de sprints."""
    perks = [
        {
            "threshold": 2,
            "title": "+5 BioPuntos por Sprint Activo",
            "unlocked": active_sprints >= 2,
            "desc": "Bonificación por constancia de participación continua."
        },
        {
            "threshold": 4,
            "title": "Insignia 'Consistency Champion'",
            "unlocked": active_sprints >= 4,
            "desc": "Badge oficial que acredita compromiso sostenido."
        },
        {
            "threshold": 6,
            "title": "Prioridad en Moonshot Missions",
            "unlocked": active_sprints >= 6,
            "desc": "Acceso preferente para postular a proyectos estratégicos de alto puntaje."
        },
        {
            "threshold": 8,
            "title": "Elegibilidad para rol BioLeader",
            "unlocked": active_sprints >= 8,
            "desc": "Calificación formal para coordinar una BioSquad completa."
        }
    ]
    return perks
