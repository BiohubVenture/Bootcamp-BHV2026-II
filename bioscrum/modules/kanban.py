"""
Kanban business logic, state transitions, and Scrum validation rules for BioSCRUM BHV.
"""

from typing import List, Dict, Any, Tuple, Optional
from .models import KANBAN_STATUSES

MAX_ACTIVE_TASKS_PER_USER = 2
ACTIVE_STATUSES = ["IN PROGRESS", "REVIEW"]


def get_user_active_tasks(tasks: List[Dict[str, Any]], bioambassador_id: str) -> List[Dict[str, Any]]:
    """Retorna las tareas actualmente activas (IN PROGRESS o REVIEW) para un Bioembajador."""
    return [
        t for t in tasks
        if t.get("assigned_to") == bioambassador_id and t.get("status") in ACTIVE_STATUSES
    ]


def can_user_take_new_task(tasks: List[Dict[str, Any]], bioambassador_id: str) -> Tuple[bool, str]:
    """Valida si el Bioembajador tiene cupo para tomar una nueva tarea (Regla: Máximo 2 activas)."""
    active = get_user_active_tasks(tasks, bioambassador_id)
    count = len(active)
    if count >= MAX_ACTIVE_TASKS_PER_USER:
        return False, f"El Bioembajador ya tiene {count} tareas activas ({', '.join([t.get('title', '') for t in active])}). El límite máximo permitido es {MAX_ACTIVE_TASKS_PER_USER}."
    return True, f"Cupo disponible ({count}/{MAX_ACTIVE_TASKS_PER_USER} tareas activas)."


def validate_status_transition(
    current_status: str,
    target_status: str,
    has_deliverable: bool = True
) -> Tuple[bool, str]:
    """
    Valida si la transición de estado en el Kanban cumple las reglas oficiales:
    1. No se puede pasar directamente de BACKLOG o READY a DONE.
    2. Todo entregable debe pasar por REVIEW antes de DONE.
    """
    if current_status == target_status:
        return True, "Sin cambio de estado."

    # Regla 1: No salto directo de READY o BACKLOG a DONE
    if current_status in ["BACKLOG", "READY"] and target_status == "DONE":
        return False, "Regla BioSCRUM: No se puede pasar directamente a 'DONE'. Debe pasar por 'IN PROGRESS' y 'REVIEW'."

    # Regla 2: Para llegar a DONE, debe venir de REVIEW
    if target_status == "DONE" and current_status != "REVIEW":
        return False, "Regla BioSCRUM: Toda tarea o misión debe pasar por 'REVIEW' antes de finalizarse como 'DONE'."

    # Regla 3: No saltar de BACKLOG directo a REVIEW o DONE
    if current_status == "BACKLOG" and target_status in ["REVIEW", "DONE"]:
        return False, "Una tarea en BACKLOG debe prepararse como READY antes de avanzar."

    return True, "Transición válida."
