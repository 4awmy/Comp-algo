import os
import json
from pathlib import Path

BASE_DIR = Path(r"C:\Users\omarh\projects\Comp-algo")
SHEETS_DIR = BASE_DIR / "src" / "data" / "sheets"

TOPIC_EXPLANATIONS = {
    "sheet01": [
        {"step": 1, "text": "Understand the input parameters and the expected output for the given problem statement."},
        {"step": 2, "text": "Determine the design method (e.g. Brute Force, Decrease & Conquer) suitable for this problem."},
        {"step": 3, "text": "Validate the finiteness and correctness of the algorithm by walking through a test case."}
    ],
    "sheet02": [
        {"step": 1, "text": "Identify the basic operation of the algorithm (e.g. comparisons, assignments)."},
        {"step": 2, "text": "Set up a summation representing the execution count of the basic operation based on input size n."},
        {"step": 3, "text": "Solve the summation using standard arithmetic or geometric series formulas."},
        {"step": 4, "text": "Determine the asymptotic growth class (O, Θ, Ω) using limits or definitions."}
    ],
    "sheet03": [
        {"step": 1, "text": "Formulate a recurrence relation representing the recursive calls (e.g., T(n) = aT(n/b) + f(n))."},
        {"step": 2, "text": "Determine if the Master Theorem can be applied: check if a >= 1 and b > 1."},
        {"step": 3, "text": "Compare the growth of the split term n^(log_b a) with the work term f(n)."},
        {"step": 4, "text": "Apply Case 1, 2, or 3 of the Master Theorem to find the final complexity growth rate."}
    ],
    "sheet04": [
        {"step": 1, "text": "Understand the brute-force search space by analyzing all possible permutations or combinations."},
        {"step": 2, "text": "Implement nested loops to compare elements systematically (e.g., Selection Sort or Bubble Sort passes)."},
        {"step": 3, "text": "Analyze the worst-case number of comparisons, which is typically quadratic: O(n²)."}
    ],
    "sheet05": [
        {"step": 1, "text": "Align the search pattern P at the current shift index i of the main text T."},
        {"step": 2, "text": "Perform character-by-character comparisons from index j = 0 to m-1."},
        {"step": 3, "text": "If a mismatch occurs, increment the shift index i by 1 and repeat the search space."}
    ],
    "sheet06": [
        {"step": 1, "text": "Determine how the problem is reduced at each step (e.g. by a constant factor like Binary Search, or constant size like Insertion Sort)."},
        {"step": 2, "text": "Analyze the sub-problem solution and determine how it is extended to solve the original instance."},
        {"step": 3, "text": "Express the recurrence relation (e.g. T(n) = T(n/2) + O(1) for search) and solve for O(log n)."}
    ],
    "sheet09": [
        {"step": 1, "text": "Divide the input dataset into two or more disjoint sub-problems of equal size (e.g., n/2)."},
        {"step": 2, "text": "Recursively solve each sub-problem independently."},
        {"step": 3, "text": "Combine the sub-problem solutions (e.g. the merge step in Merge Sort) in linear time: O(n)."}
    ],
    "sheet10": [
        {"step": 1, "text": "Transform the problem representation into a more convenient structure (e.g. a Binary Search Tree or Heap)."},
        {"step": 2, "text": "For heaps: use bottom-up heapify to convert an array into a heap structure in O(n) time."},
        {"step": 3, "text": "Perform the required operation (e.g. delete-max in Heapsort) and re-heapify in O(log n) time."}
    ],
    "sheet11": [
        {"step": 1, "text": "Determine the trade-off: use extra memory space to decrease the overall running time of the algorithm."},
        {"step": 2, "text": "For Hashing: map keys to indices using a hash function and handle collisions with chaining or open addressing."},
        {"step": 3, "text": "For Counting Sort: use a frequency array to count occurrences, achieving O(n) time with O(k) space."}
    ]
}

def main():
    if not SHEETS_DIR.exists():
        print("Sheets directory does not exist.")
        return

    for fname in os.listdir(SHEETS_DIR):
        if not fname.endswith(".json"):
            continue
        
        path = SHEETS_DIR / fname
        with open(path, "r", encoding="utf-8") as f:
            try:
                data = json.load(f)
            except Exception as e:
                print(f"Error reading {fname}: {e}")
                continue
        
        sheet_id = data.get("id")
        problems = data.get("problems", [])
        
        # Get explanations for this sheet
        steps = TOPIC_EXPLANATIONS.get(sheet_id, TOPIC_EXPLANATIONS["sheet01"])
        
        updated = False
        for p in problems:
            # If explanation is empty or invalid, populate it
            if not p.get("explanation"):
                p["explanation"] = steps
                updated = True
        
        if updated:
            with open(path, "w", encoding="utf-8") as f:
                json.dump(data, f, indent=2, ensure_ascii=False)
            print(f"Populated explanations in {fname}")
        else:
            print(f"Explanations already present in {fname}")

if __name__ == "__main__":
    main()
