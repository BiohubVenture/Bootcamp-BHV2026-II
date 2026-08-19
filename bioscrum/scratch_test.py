import sys
import os
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

from bioscrum.modules.scoring import calculate_biopoints
from bioscrum.modules.gamification import get_level, get_level_info, evaluate_badges, get_streak_perks
from bioscrum.modules.kanban import can_user_take_new_task, validate_status_transition
from bioscrum.modules.sprint_health import calculate_sprint_health
from bioscrum.modules.storage import init_database, load_data, get_ambassador_by_dni

print("--- Testing BioSCRUM Core Logic ---")

# 1. Test Scoring
res1 = calculate_biopoints(base_points=10, quality=4.8, collaboration=5.0, impact=4.5, early_delivered=True)
print("Scoring 10 base with max bonuses (expected 20 due to 2x cap):", res1["final_points"], "Bonuses:", res1["total_bonuses"], "Capped:", res1["capped_applied"])
assert res1["final_points"] == 20, f"Expected 20, got {res1['final_points']}"

res2 = calculate_biopoints(base_points=40, quality=4.0, collaboration=4.0, impact=4.0, early_delivered=False)
print("Scoring 40 base with quality 4.0 (5), impact 4.0 (5):", res2["final_points"], "Expected 50")
assert res2["final_points"] == 50

# 2. Test Gamification
assert get_level(45) == "BioExplorer"
assert get_level(100) == "BioConnector"
assert get_level(200) == "BioBuilder"
assert get_level(350) == "BioLeader"
assert get_level(600) == "BioFellow"
print("Levels tested successfully!")

# 3. Test Storage & Seed
init_database(force_reset=True)
ambs = load_data("ambassadors")
print(f"Loaded {len(ambs)} ambassadors.")
amb = get_ambassador_by_dni("72948102")
assert amb is not None
print(f"Found Ambassador by DNI 72948102: {amb['name']} ({amb['level']})")

# 4. Test Kanban Rules
tasks = load_data("tasks")
can_take, msg = can_user_take_new_task(tasks, "BIO-014")
print(f"Can BIO-014 take new task? {can_take} ({msg})")

val1, msg1 = validate_status_transition("READY", "DONE", user_role="Bioembajador")
assert not val1
print(f"Transition READY->DONE correctly rejected: {msg1}")

val2, msg2 = validate_status_transition("REVIEW", "DONE", user_role="Mission Owner")
assert val2
print(f"Transition REVIEW->DONE by Mission Owner accepted: {msg2}")

print("All Core Logic Tests Passed Successfully!")
