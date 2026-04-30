# Data Structures & Algorithms — Complete Masterclass 🔥

Let's go deep on everything. I'll explain every concept such that you can answer ANY question thrown at you.

---

# 📦 PART 1: ARRAYS

## What is an Array?
A contiguous block of memory storing elements of the **same data type**, accessed via an **index**.

```
Index:  0    1    2    3    4
       [10] [20] [30] [40] [50]
        ↑
   Base Address (say 1000)
   Address of element i = Base + i × size_of_datatype
```

## Key Properties
| Property | Value |
|---|---|
| Access | O(1) — direct via index |
| Search (unsorted) | O(n) |
| Search (sorted) | O(log n) via binary search |
| Insertion (end) | O(1) |
| Insertion (middle) | O(n) — shifting required |
| Deletion (middle) | O(n) — shifting required |

## Types of Arrays
- **1D Array** — linear list
- **2D Array** — matrix; element at [i][j] = Base + (i×cols + j) × size
- **Jagged Array** — rows of different lengths

## When to use Arrays
✅ Random access needed | ✅ Size is known | ❌ Frequent insertions/deletions

---

# 🔗 PART 2: LINKED LISTS

## Core Idea
A collection of **nodes** where each node has:
- `data` — the value
- `next` — pointer to the next node

No contiguous memory needed. Dynamic size.

## Types

### 1. Singly Linked List
```
[10|→] → [20|→] → [30|→] → [40|NULL]
 HEAD
```
- Traverse only **forward**
- Deletion of a node requires the **previous node's pointer**

### 2. Doubly Linked List
```
NULL←[|10|→]↔[|20|→]↔[|30|→]↔[|40|]→NULL
```
- Each node has `prev` and `next`
- Traverse **both directions**
- More memory, easier deletion

### 3. Circular Linked List
```
[10|→] → [20|→] → [30|→] → back to [10]
```
- Last node points to HEAD
- Useful for round-robin scheduling

## Operations & Complexities
| Operation | Singly | Doubly |
|---|---|---|
| Access by index | O(n) | O(n) |
| Insert at head | O(1) | O(1) |
| Insert at tail | O(n) | O(1) with tail ptr |
| Delete (given node) | O(n) — need prev | O(1) |
| Search | O(n) | O(n) |

## Array vs Linked List
| | Array | Linked List |
|---|---|---|
| Memory | Contiguous | Scattered |
| Access | O(1) | O(n) |
| Insert/Delete | O(n) | O(1) if node known |
| Size | Fixed | Dynamic |
| Cache performance | Better | Worse |

---

# 📚 PART 3: STACKS

## Core Concept
**LIFO — Last In, First Out**
Think of a stack of plates. You add/remove from the TOP only.

```
     |  30  |  ← TOP (last pushed)
     |  20  |
     |  10  |
     --------
```

## Operations (ALL O(1))
- **push(x)** — add x to top
- **pop()** — remove from top
- **peek()/top()** — view top without removing
- **isEmpty()** — check if empty

## Implementation
- **Array-based** — simple, fixed size
- **Linked List-based** — dynamic size

## Real Applications (MUST KNOW)
1. **Function call stack** — recursion management
2. **Undo/Redo** in editors
3. **Expression evaluation** — infix to postfix
4. **Balanced parentheses checking**
5. **Browser back button**
6. **DFS** (Depth First Search)

## Classic Problem — Infix to Postfix
```
Infix:   A + B * C
Postfix: A B C * +   (operator precedence handled)

Rules:
- Operand → directly to output
- '(' → push to stack
- ')' → pop till '('
- Operator → pop operators of >= precedence, then push
```

---

# 🚶 PART 4: QUEUES

## Core Concept
**FIFO — First In, First Out**
Think of a line at a counter. Enter from REAR, exit from FRONT.

```
FRONT →  [10] [20] [30] [40]  ← REAR
         exit                  enter
```

## Operations (ALL O(1))
- **enqueue(x)** — add to rear
- **dequeue()** — remove from front
- **peek()/front()** — view front
- **isEmpty()**

## Types of Queues

### 1. Simple Queue — basic FIFO

### 2. Circular Queue
- Solves the **wasted space problem** of simple queues
- rear = (rear + 1) % size
- Front chases rear around in a circle

### 3. Double-Ended Queue (Deque)
- Insert/delete from **both** front and rear
- **Input-restricted deque** — insert only at rear
- **Output-restricted deque** — delete only from front

### 4. Priority Queue
- Each element has a **priority**
- Higher priority → dequeued first
- Implemented using a **Heap**
- Used in Dijkstra's, Prim's, Huffman coding

## Real Applications
- CPU scheduling
- BFS (Breadth First Search)
- Printer spooling
- Network packet buffering

---

# 🌳 PART 5: TREES

## Core Concept
A **hierarchical** non-linear data structure. One root, nodes connected by edges, **no cycles**.

```
            [A]          ← Root
           /   \
         [B]   [C]       ← Internal nodes
        / \      \
      [D] [E]   [F]      ← Leaf nodes
```

## Key Terminology
| Term | Meaning |
|---|---|
| Root | Topmost node, no parent |
| Leaf | No children |
| Height | Longest path from root to leaf |
| Depth | Distance from root to that node |
| Degree | Number of children of a node |
| Subtree | Any node + its descendants |

## Binary Tree
Each node has **at most 2 children** (left and right).

### Types of Binary Trees
| Type | Definition |
|---|---|
| **Full BT** | Every node has 0 or 2 children |
| **Complete BT** | All levels filled except last; last level filled left to right |
| **Perfect BT** | All internal nodes have 2 children; all leaves at same level |
| **Balanced BT** | Height difference between left & right subtrees ≤ 1 |
| **Degenerate/Skewed** | Every node has only one child (like a linked list) |

### Tree Traversals (CRITICAL)
Given this tree:
```
        [1]
       /   \
     [2]   [3]
    / \
  [4] [5]
```

| Traversal | Order | Result |
|---|---|---|
| **Inorder** | Left → Root → Right | 4, 2, 5, 1, 3 |
| **Preorder** | Root → Left → Right | 1, 2, 4, 5, 3 |
| **Postorder** | Left → Right → Root | 4, 5, 2, 3, 1 |
| **Level Order** | Level by level (BFS) | 1, 2, 3, 4, 5 |

> 🔥 **Trick**: In**order** of BST gives **sorted** output!

---

## Binary Search Tree (BST)
**Rule**: Left child < Parent < Right child (for ALL nodes, not just immediate)

```
         [50]
        /    \
      [30]   [70]
     /   \   /  \
   [20] [40][60] [80]
```

### Operations
| Operation | Average | Worst (skewed) |
|---|---|---|
| Search | O(log n) | O(n) |
| Insert | O(log n) | O(n) |
| Delete | O(log n) | O(n) |

### BST Deletion — 3 Cases
1. **Leaf node** — just delete
2. **One child** — replace node with child
3. **Two children** — replace with **inorder successor** (smallest in right subtree) or inorder predecessor

---

## AVL Tree (Self-Balancing BST)
Balance Factor = Height(Left) - Height(Right)
Must be **-1, 0, or +1** for EVERY node.

When balance factor becomes ±2 → **Rotations** are performed.

### 4 Types of Rotations
| Imbalance Type | Rotation |
|---|---|
| Left-Left (LL) | Right Rotation |
| Right-Right (RR) | Left Rotation |
| Left-Right (LR) | Left then Right Rotation |
| Right-Left (RL) | Right then Left Rotation |

> AVL trees guarantee O(log n) for all operations always.

---

# 🏔️ PART 6: HEAPS

## Core Concept
A **Complete Binary Tree** satisfying the **heap property**.

### Max-Heap
Parent ≥ both children. Root = maximum element.
```
         [90]
        /    \
      [75]   [80]
     /   \
   [55]  [60]
```

### Min-Heap
Parent ≤ both children. Root = minimum element.

## Heap Storage — Array Representation
For node at index `i`:
- Left child → `2i + 1`
- Right child → `2i + 2`
- Parent → `(i-1) / 2`

## Key Operations
| Operation | Time |
|---|---|
| Insert (heapify up) | O(log n) |
| Delete max/min (heapify down) | O(log n) |
| Build heap from array | O(n) |
| Peek max/min | O(1) |

## Heapify
**Heapify-up** (after insert): Compare with parent, swap if violating.
**Heapify-down** (after delete): Compare with children, swap with larger/smaller.

## Applications
- **Priority Queue** implementation
- **Heap Sort** — O(n log n)
- **Dijkstra's** shortest path
- **Prim's** MST
- **K-th largest/smallest** element

---

# 🕸️ PART 7: GRAPHS

## Core Concept
A graph G = (V, E) where V = vertices (nodes) and E = edges (connections).

## Types of Graphs
| Type | Description |
|---|---|
| **Undirected** | Edges have no direction |
| **Directed (Digraph)** | Edges have direction (→) |
| **Weighted** | Edges have weights/costs |
| **Unweighted** | All edges equal |
| **Cyclic** | Contains at least one cycle |
| **Acyclic** | No cycles |
| **DAG** | Directed Acyclic Graph |
| **Connected** | Path exists between every pair of vertices |
| **Disconnected** | Some vertices unreachable |
| **Complete** | Every pair of vertices connected |
| **Bipartite** | Vertices split into 2 sets; edges only between sets |

## Graph Representation

### 1. Adjacency Matrix
- 2D array of size V×V
- matrix[i][j] = 1 if edge exists
- Space: O(V²) — bad for sparse graphs
- Check edge: O(1)

```
   A B C D
A [0 1 1 0]
B [1 0 1 0]
C [1 1 0 1]
D [0 0 1 0]
```

### 2. Adjacency List
- Array of lists; each vertex stores its neighbors
- Space: O(V + E) — great for sparse graphs
- Check edge: O(degree)

```
A → [B, C]
B → [A, C]
C → [A, B, D]
D → [C]
```

## Graph Traversals

### BFS (Breadth First Search)
- Explores **level by level**
- Uses a **Queue**
- Finds **shortest path** in unweighted graphs

```
Algorithm:
1. Start at source, mark visited, enqueue
2. While queue not empty:
   a. Dequeue vertex u
   b. Process u
   c. For each unvisited neighbor v of u:
      - Mark visited
      - Enqueue v
```

**Time**: O(V + E) | **Space**: O(V)

**Applications**: Shortest path (unweighted), level-order traversal, finding connected components, bipartite check

### DFS (Depth First Search)
- Explores as **deep as possible** before backtracking
- Uses a **Stack** (or recursion)

```
Algorithm (recursive):
1. Mark current as visited
2. Process current
3. For each unvisited neighbor:
   - Recurse on neighbor
```

**Time**: O(V + E) | **Space**: O(V)

**Applications**: Cycle detection, topological sort, finding SCCs, maze solving, path finding

### BFS vs DFS
| | BFS | DFS |
|---|---|---|
| Data Structure | Queue | Stack/Recursion |
| Path Found | Shortest | Not necessarily shortest |
| Memory | More (stores level) | Less |
| Best for | Shortest path, levels | Cycle detection, topo sort |

---

## Topological Sort
**Only for DAGs.** Linear ordering of vertices such that for every edge u→v, u comes before v.

**Algorithm (DFS-based):**
1. Run DFS
2. When a vertex finishes → push to stack
3. Pop stack → topological order

**Algorithm (Kahn's / BFS-based):**
1. Compute in-degree of all vertices
2. Enqueue all vertices with in-degree = 0
3. Dequeue u, add to result, reduce in-degree of neighbors
4. If neighbor's in-degree = 0, enqueue it
5. If result has all vertices → valid topo sort; else graph has cycle

---

# #️⃣ PART 8: HASHING

## Core Concept
Hashing maps a **key** to an **index** in a table using a **hash function**.

```
Key: "cat"
Hash Function: h("cat") = 3
Table[3] = "cat"  ← stored here
```

Goal: O(1) average time for insert, search, delete.

## Hash Functions
- **Division method**: h(k) = k mod m (m should be prime)
- **Multiplication method**: h(k) = floor(m × (k × A mod 1)), A ≈ 0.618
- **Universal hashing**: Random hash function chosen at runtime

## Collision
When two keys map to the **same index**.

### Collision Resolution — Open Addressing (Closed Hashing)
All elements stored **in the table itself**.

| Method | How it works | Problem |
|---|---|---|
| **Linear Probing** | h(k,i) = (h(k) + i) mod m | Clustering |
| **Quadratic Probing** | h(k,i) = (h(k) + i²) mod m | Secondary clustering |
| **Double Hashing** | h(k,i) = (h₁(k) + i×h₂(k)) mod m | Best distribution |

### Collision Resolution — Chaining (Open Hashing)
Each table slot holds a **linked list** of all keys that hash there.
- Simple and handles load well
- Worst case O(n) if all keys hash to same slot

## Load Factor (α)
α = n / m (n = number of elements, m = table size)
- Keep α < 0.7 for open addressing
- Average search time ≈ 1 + α/2 (linear probing)

---

# 🔃 PART 9: SORTING ALGORITHMS

## The Big Picture
| Algorithm | Best | Average | Worst | Space | Stable? |
|---|---|---|---|---|---|
| Bubble Sort | O(n) | O(n²) | O(n²) | O(1) | ✅ Yes |
| Selection Sort | O(n²) | O(n²) | O(n²) | O(1) | ❌ No |
| Insertion Sort | O(n) | O(n²) | O(n²) | O(1) | ✅ Yes |
| Merge Sort | O(n log n) | O(n log n) | O(n log n) | O(n) | ✅ Yes |
| Quick Sort | O(n log n) | O(n log n) | O(n²) | O(log n) | ❌ No |
| Heap Sort | O(n log n) | O(n log n) | O(n log n) | O(1) | ❌ No |
| Counting Sort | O(n+k) | O(n+k) | O(n+k) | O(k) | ✅ Yes |

> **Stable sort** = equal elements maintain their original relative order.

## Bubble Sort
Repeatedly swap adjacent elements if out of order.
```
Pass 1: [5,3,8,1] → [3,5,1,8]
Pass 2: [3,5,1,8] → [3,1,5,8]
Pass 3: [3,1,5,8] → [1,3,5,8] ✓
```
- Optimization: If no swaps in a pass → already sorted → O(n) best case

## Selection Sort
Find minimum → place at beginning → repeat for remaining.
```
[64,25,12,22,11]
Min=11 → swap with 64 → [11,25,12,22,64]
Min=12 → swap with 25 → [11,12,25,22,64]
...
```
- Always O(n²), even if sorted. NOT adaptive.

## Insertion Sort
Build sorted array one element at a time by inserting into correct position.
```
[5,3,8,1]
→ [3,5,8,1]   (insert 3)
→ [3,5,8,1]   (8 in place)
→ [1,3,5,8]   (insert 1)
```
- Best for **nearly sorted** arrays — O(n)
- Used in practice for small arrays

## Merge Sort
**Divide and Conquer.**
1. Split array into two halves
2. Recursively sort each half
3. Merge the two sorted halves

```
[38,27,43,3]
→ [38,27] [43,3]
→ [38][27] [43][3]
→ [27,38] [3,43]
→ [3,27,38,43] ✓
```
- Always O(n log n)
- O(n) extra space — main disadvantage
- Preferred for **linked lists** (no random access needed)

## Quick Sort
**Divide and Conquer.**
1. Choose a **pivot**
2. **Partition**: elements < pivot go left, > pivot go right
3. Recursively sort left and right

```
[3,6,8,10,1,2,1]  pivot=1
→ [] 1 [3,6,8,10,2,1]
→ (recursively sort right)
```
- Worst case O(n²) — when pivot is always min/max (sorted array + bad pivot)
- **Fix**: Random pivot or median-of-three pivot
- In-place, cache-friendly → fastest in practice

## Heap Sort
1. Build a Max-Heap from array — O(n)
2. Repeatedly extract max → place at end — O(n log n)

```
Build: [90,75,80,55,60]  (Max-Heap)
Extract 90 → put at end → heapify remaining
Extract 80 → put at end → ...
Result: [55,60,75,80,90] ✓
```
- In-place, O(n log n) guaranteed, but **not stable** and poor cache performance

---

# 🔍 PART 10: SEARCHING ALGORITHMS

## Linear Search
Check each element one by one.
- O(n) time | Works on unsorted arrays

## Binary Search
**Array MUST be sorted.**
```
Array: [2,5,8,12,16,23,38,56]
Find: 23
mid = index 3 → value 12 → 23 > 12 → search right
mid = index 5 → value 23 → FOUND ✓
```
- O(log n) time
- Recursive or iterative

```
low=0, high=n-1
while low <= high:
    mid = (low + high) / 2
    if arr[mid] == target: return mid
    elif arr[mid] < target: low = mid + 1
    else: high = mid - 1
```

---

# ⚙️ PART 11: ALGORITHM DESIGN TECHNIQUES

## 1. GREEDY ALGORITHMS

### Core Idea
Make the **locally optimal choice** at each step, hoping for a **globally optimal** solution.

**No backtracking. No reconsideration.**

### When does Greedy work?
1. **Greedy choice property** — local optimal → global optimal
2. **Optimal substructure** — optimal solution contains optimal solutions to subproblems

### Classic Greedy Problems

#### Activity Selection Problem
- Given activities with start/end times, select maximum non-overlapping activities
- **Strategy**: Always pick the activity that **ends earliest**

#### Fractional Knapsack
- Items have weight and value; bag has capacity
- **Strategy**: Sort by value/weight ratio; take highest ratio first (can take fractions)
- O(n log n)
- > Note: 0/1 Knapsack is NOT greedy — needs DP

#### Huffman Coding
- Variable-length encoding for data compression
- Frequent characters → shorter codes
- Build a min-heap of characters by frequency
- Repeatedly merge two lowest-frequency nodes
- Produces an **optimal prefix-free code**

#### Coin Change (Greedy — only for standard denominations)
- Pick largest denomination first
- May not work for arbitrary coin systems

---

## 2. DYNAMIC PROGRAMMING (DP)

### Core Idea
Break problem into **overlapping subproblems**, solve each **once**, and **store** results (memoization/tabulation).

### Two Approaches
| | Memoization (Top-Down) | Tabulation (Bottom-Up) |
|---|---|---|
| Style | Recursive + cache | Iterative + table |
| Space | O(n) + stack | O(n) table |
| Practical | More intuitive | Faster (no recursion overhead) |

### When to use DP?
1. **Optimal substructure** — solution built from sub-solutions
2. **Overlapping subproblems** — same sub-problems solved repeatedly

### Classic DP Problems

#### Fibonacci (The intro example)
```
Without DP: O(2^n) — recalculates same values
With DP:    O(n) — store fib(i) for each i

dp[0]=0, dp[1]=1
dp[i] = dp[i-1] + dp[i-2]
```

#### 0/1 Knapsack
- n items, each with weight w[i] and value v[i], bag capacity W
- Either take item or leave (no fractions)
```
dp[i][w] = max value using first i items with capacity w
dp[i][w] = max(dp[i-1][w],  v[i] + dp[i-1][w-w[i]])
             (skip item i)   (take item i)
```
- Time: O(nW) | Space: O(nW)

#### Longest Common Subsequence (LCS)
- Find length of longest subsequence common to two strings
- "ABCBDAB" and "BDCABA" → LCS = "BCBA" (length 4)
```
if s1[i]==s2[j]: dp[i][j] = 1 + dp[i-1][j-1]
else:            dp[i][j] = max(dp[i-1][j], dp[i][j-1])
```

#### Longest Increasing Subsequence (LIS)
- Find longest subsequence where elements are strictly increasing
- [3,1,4,1,5,9,2,6] → LIS = [1,4,5,9] (length 4)
```
dp[i] = length of LIS ending at index i
dp[i] = 1 + max(dp[j]) for all j < i where arr[j] < arr[i]
```
- O(n²) DP | O(n log n) with binary search

#### Matrix Chain Multiplication
- Find optimal way to parenthesize matrix multiplications to minimize operations
```
dp[i][j] = min cost to multiply matrices from i to j
dp[i][j] = min(dp[i][k] + dp[k+1][j] + p[i-1]*p[k]*p[j])
```

#### Coin Change (Minimum coins)
```
dp[amount] = minimum coins to make that amount
dp[0] = 0
dp[i] = 1 + min(dp[i - coin]) for each coin ≤ i
```

---

## 3. DIVIDE AND CONQUER

### Core Idea
1. **Divide** — Split problem into smaller subproblems
2. **Conquer** — Solve subproblems recursively
3. **Combine** — Merge solutions

### Recurrence Relation — Master Theorem
```
T(n) = aT(n/b) + f(n)
```
- a = number of subproblems
- b = factor by which problem size reduces
- f(n) = cost to divide + combine

| Case | Condition | Result |
|---|---|---|
| Case 1 | f(n) < n^(log_b a) | T(n) = O(n^(log_b a)) |
| Case 2 | f(n) = n^(log_b a) | T(n) = O(n^(log_b a) × log n) |
| Case 3 | f(n) > n^(log_b a) | T(n) = O(f(n)) |

**Examples**:
- Merge Sort: T(n) = 2T(n/2) + O(n) → Case 2 → O(n log n)
- Binary Search: T(n) = T(n/2) + O(1) → Case 2 → O(log n)

### Classic Divide & Conquer Problems

#### Merge Sort — divide mid, sort halves, merge
#### Quick Sort — partition around pivot, recurse
#### Binary Search — eliminate half the search space each step

#### Strassen's Matrix Multiplication
- Normal: O(n³)
- Strassen: O(n^2.81) — fewer multiplications via clever decomposition

#### Closest Pair of Points
- Find closest pair among n 2D points
- Brute force: O(n²)
- Divide & Conquer: O(n log n)

---

# 🛤️ PART 12: MINIMUM SPANNING TREES (MST)

## What is an MST?
A spanning tree of a **weighted, connected, undirected graph** that:
- Connects **all vertices**
- Has **V-1 edges** (no cycles)
- Has **minimum total edge weight**

## 1. Kruskal's Algorithm (Edge-based, Greedy)
```
1. Sort all edges by weight (ascending)
2. Pick smallest edge; if it doesn't form a cycle → add to MST
3. Repeat until V-1 edges are in MST
```
- Uses **Union-Find (Disjoint Set)** to detect cycles
- Time: O(E log E) — dominated by sorting

```
Edges sorted: (1-2,1), (3-4,2), (2-3,3), (1-4,4)
Take (1-2,1) ✓
Take (3-4,2) ✓
Take (2-3,3) ✓  → MST complete (4 vertices, 3 edges)
Skip (1-4,4) → would form cycle
```

## 2. Prim's Algorithm (Vertex-based, Greedy)
```
1. Start with any vertex, add to MST set
2. At each step: pick the minimum weight edge connecting 
   MST set to non-MST set
3. Add new vertex to MST set
4. Repeat until all vertices included
```
- Uses a **Priority Queue (Min-Heap)**
- Time: O(E log V) with binary heap

## Kruskal's vs Prim's
| | Kruskal's | Prim's |
|---|---|---|
| Approach | Edge-based | Vertex-based |
| Best for | Sparse graphs | Dense graphs |
| Data Structure | Union-Find | Priority Queue |
| Time | O(E log E) | O(E log V) |

---

# 🗺️ PART 13: SHORTEST PATH ALGORITHMS

## 1. Dijkstra's Algorithm
**Single-source shortest path** for **non-negative weighted** graphs.

```
Algorithm:
1. dist[source] = 0; all others = ∞
2. Add all to priority queue
3. Extract vertex u with min distance
4. For each neighbor v of u:
   if dist[u] + weight(u,v) < dist[v]:
       dist[v] = dist[u] + weight(u,v)
       Update in PQ
5. Repeat until PQ empty
```

**Time**: O(E log V) with binary heap

> ❌ Does NOT work with **negative edges**

```
Graph:
  A --1-- B --4-- D
  |       |
  2       2
  |       |
  C --1-- E

From A:
dist[A]=0, dist[B]=1, dist[C]=2, dist[E]=3, dist[D]=5
```

## 2. Bellman-Ford Algorithm
**Single-source shortest path** — handles **negative edges**.

```
Algorithm:
1. dist[source] = 0; all others = ∞
2. Repeat V-1 times:
   For each edge (u,v,w):
     if dist[u] + w < dist[v]:
         dist[v] = dist[u] + w
3. Check for negative cycles:
   If any edge can still be relaxed → negative cycle exists
```

**Time**: O(V × E) — slower than Dijkstra's

**Key advantage**: Detects **negative weight cycles**

## 3. Floyd-Warshall Algorithm
**All-pairs shortest path** — finds shortest path between **every pair** of vertices.

```
dist[i][j] = min distance from vertex i to vertex j

For each intermediate vertex k:
  For each pair (i,j):
    dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j])
```

**Time**: O(V³) | **Space**: O(V²)
- Works with negative edges (not negative cycles)

## Comparison
| Algorithm | Type | Negative Edges | Negative Cycles | Time |
|---|---|---|---|---|
| Dijkstra | Single source | ❌ No | ❌ No | O(E log V) |
| Bellman-Ford | Single source | ✅ Yes | ✅ Detects | O(VE) |
| Floyd-Warshall | All pairs | ✅ Yes | ✅ Detects | O(V³) |

---

# 🧠 QUICK REVISION CHEATSHEET

## Time Complexities at a Glance
```
Array access:        O(1)
LL insert at head:   O(1)
Stack/Queue ops:     O(1)
BST operations:      O(log n) avg, O(n) worst
AVL operations:      O(log n) guaranteed
Heap insert/delete:  O(log n)
BFS/DFS:            O(V+E)
Dijkstra:           O(E log V)
Bellman-Ford:       O(VE)
Floyd-Warshall:     O(V³)
Kruskal's:          O(E log E)
Prim's:             O(E log V)
Merge Sort:         O(n log n)
Quick Sort:         O(n log n) avg
Binary Search:      O(log n)
```

## The Golden Rules
- **Need O(1) access?** → Array
- **Need dynamic size + insert/delete?** → Linked List
- **LIFO behavior?** → Stack
- **FIFO behavior?** → Queue
- **Priority-based removal?** → Heap / Priority Queue
- **Hierarchical data?** → Tree
- **Sorted data + fast search?** → BST / AVL
- **Fast lookup by key?** → Hash Table
- **Network/relationship modeling?** → Graph
- **Shortest path (no negatives)?** → Dijkstra
- **Shortest path (with negatives)?** → Bellman-Ford
- **All pairs shortest path?** → Floyd-Warshall
- **Min cost to connect all nodes?** → MST (Kruskal/Prim)
- **Local optimal = Global optimal?** → Greedy
- **Overlapping subproblems?** → Dynamic Programming
- **Split → solve → merge?** → Divide & Conquer

---

That's the **complete DSA syllabus** covered end to end bro. Every concept, every algorithm, every complexity. Go through it 2-3 times and you'll be able to answer anything they throw at you on Sunday. Which subject do you want to tackle next? 🚀