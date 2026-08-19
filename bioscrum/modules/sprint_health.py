"""
Sprint Health monitoring and executive dashboard KPIs for BioSCRUM BHV.
"""

from typing import List, Dict, Any, Tuple, Optional
from datetime import datetime, date


def calculate_sprint_health(
    missions: List[Dict[str, Any]],
    tasks: List[Dict[str, Any]],
    checkins: List[Dict[str, Any]],
    current_date: Optional[date] = None
) -> Dict[str, Any]:
    """
    Calcula el semáforo de salud del Sprint y los 5 indicadores ejecutivos principales.
    """
    if current_date is None:
        current_date = date.today()

    # 1. Conteo de bloqueos no resueltos
    active_blockers = []
    # Revisamos checkins recientes con bloqueos
    for chk in checkins:
        blk = chk.get("blocker", "").strip()
        if blk and not chk.get("resolved", False):
            active_blockers.append({
                "checkin_id": chk.get("id"),
                "bioambassador_id": chk.get("bioambassador_id"),
                "mission_id": chk.get("mission_id"),
                "blocker": blk,
                "date": chk.get("date")
            })

    # Bloqueos en tareas
    blocked_tasks_count = len(active_blockers)

    # 2. Tareas o misiones vencidas
    overdue_missions = []
    for m in missions:
        if m.get("status") != "DONE":
            due_str = m.get("due_date", "")
            if due_str:
                try:
                    due = datetime.strptime(due_str, "%Y-%m-%d").date()
                    if due < current_date:
                        overdue_missions.append(m)
                except Exception:
                    pass

    overdue_count = len(overdue_missions)

    # 3. Semáforo oficial
    if blocked_tasks_count > 3:
        status = "🔴 Atención"
        status_color = "#EF4444"
        status_message = f"Existen {blocked_tasks_count} bloqueos activos que requieren intervención de los BioLeaders o Scrum Master."
    elif overdue_count > 2:
        status = "🟠 Riesgo"
        status_color = "#F59E0B"
        status_message = f"Hay {overdue_count} misiones que han superado su fecha límite de entrega."
    else:
        status = "🟢 Saludable"
        status_color = "#10B981"
        status_message = "El Sprint avanza con cadencia óptima y sin cuellos de botella críticos."

    # 4. Distribución de misiones y tareas
    total_missions = len(missions)
    completed_missions = len([m for m in missions if m.get("status") == "DONE"])
    active_missions = len([m for m in missions if m.get("status") in ["READY", "IN PROGRESS", "REVIEW"]])
    completion_rate = round((completed_missions / total_missions * 100), 1) if total_missions > 0 else 0.0

    task_distribution = {
        "BACKLOG": len([t for t in tasks if t.get("status") == "BACKLOG"]),
        "READY": len([t for t in tasks if t.get("status") == "READY"]),
        "IN PROGRESS": len([t for t in tasks if t.get("status") == "IN PROGRESS"]),
        "REVIEW": len([t for t in tasks if t.get("status") == "REVIEW"]),
        "DONE": len([t for t in tasks if t.get("status") == "DONE"]),
    }

    return {
        "status": status,
        "status_color": status_color,
        "status_message": status_message,
        "blocked_count": blocked_tasks_count,
        "active_blockers": active_blockers,
        "overdue_count": overdue_count,
        "overdue_missions": overdue_missions,
        "total_missions": total_missions,
        "active_missions": active_missions,
        "completed_missions": completed_missions,
        "completion_rate": completion_rate,
        "task_distribution": task_distribution
    }
