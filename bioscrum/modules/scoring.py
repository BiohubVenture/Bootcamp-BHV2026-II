"""
Scoring and BioPuntos calculation engine for BioSCRUM BHV v1.0.

Fórmula oficial:
- quality_bonus = 10 if quality >= 4.5 else 5 if quality >= 4.0 else 0
- collaboration_bonus = 5 if collaboration >= 4.5 else 0
- impact_bonus = 10 if impact >= 4.5 else 5 if impact >= 4.0 else 0
- early_bonus = 5 if early_delivered else 0
- final_points = min(base_points + quality_bonus + collaboration_bonus + impact_bonus + early_bonus, base_points * 2)
"""

from typing import Dict, Any, Tuple


def calculate_biopoints(
    base_points: int,
    quality: float,
    collaboration: float,
    impact: float,
    early_delivered: bool = False,
    streak_bonus: int = 0
) -> Dict[str, Any]:
    """
    Calcula los BioPuntos finales según los 4 criterios de Sprint Review y bonificaciones.
    """
    # 1. Bonificación de Calidad (0 a 10)
    if quality >= 4.5:
        quality_bonus = 10
    elif quality >= 4.0:
        quality_bonus = 5
    else:
        quality_bonus = 0

    # 2. Bonificación de Colaboración (0 a 5)
    if collaboration >= 4.5:
        collaboration_bonus = 5
    else:
        collaboration_bonus = 0

    # 3. Bonificación de Impacto (0 a 10)
    if impact >= 4.5:
        impact_bonus = 10
    elif impact >= 4.0:
        impact_bonus = 5
    else:
        impact_bonus = 0

    # 4. Bonificación de Entrega Anticipada (0 o 5)
    early_bonus = 5 if early_delivered else 0

    # Subtotal de bonificaciones por desempeño
    performance_bonuses = quality_bonus + collaboration_bonus + impact_bonus + early_bonus

    # Puntos brutos de la misión
    raw_mission_points = base_points + performance_bonuses

    # Regla de Tope: Ninguna misión puede generar más del doble de sus puntos base
    max_allowed = base_points * 2
    capped_mission_points = min(raw_mission_points, max_allowed)
    capped_applied = raw_mission_points > max_allowed

    # Suma de bonificación por racha activa (si aplica a nivel de misión)
    final_points = capped_mission_points + streak_bonus

    return {
        "base_points": base_points,
        "quality": round(float(quality), 1),
        "collaboration": round(float(collaboration), 1),
        "impact": round(float(impact), 1),
        "early_delivered": bool(early_delivered),
        "quality_bonus": quality_bonus,
        "collaboration_bonus": collaboration_bonus,
        "impact_bonus": impact_bonus,
        "early_bonus": early_bonus,
        "streak_bonus": streak_bonus,
        "total_bonuses": performance_bonuses,
        "raw_points": raw_mission_points,
        "max_allowed": max_allowed,
        "capped_applied": capped_applied,
        "final_points": final_points
    }
