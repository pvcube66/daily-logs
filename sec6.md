# Section 6: Databases — Complete Mastery Guide 🔥

Let's cook. I'll cover everything end-to-end. Read carefully, understand the *why*, not just the *what*.

---

# 1. ER MODEL (Entity-Relationship Model)

The ER model is a **conceptual design tool** — you use it to design a database before actually building it.

## Core Components

### Entities
An **entity** is a real-world object or concept that has data stored about it.
- **Strong Entity** — exists independently. Example: `Student`, `Employee`
- **Weak Entity** — cannot exist without a strong entity. It has no primary key of its own, only a **partial key**. Example: `Dependent` (depends on `Employee`). Represented by **double rectangle**.

### Attributes
Properties of an entity.

| Type | Meaning | Example |
|---|---|---|
| Simple | Atomic, not divisible | Age, RollNo |
| Composite | Made of sub-parts | Name → (FirstName, LastName) |
| Single-valued | One value per entity | Date of Birth |
| Multi-valued | Multiple values | Phone numbers (double ellipse) |
| Derived | Computed from another | Age (from DOB) — shown with dashed ellipse |
| Key attribute | Uniquely identifies entity | RollNo (underlined) |

### Relationships
An association between two or more entities.

**Degree of relationship:**
- Unary (1 entity) — Employee *manages* Employee
- Binary (2 entities) — Student *enrolls in* Course
- Ternary (3 entities) — Doctor *prescribes* Drug *to* Patient

**Cardinality (the most important concept):**
- **1:1** — One person has one passport
- **1:N** — One department has many employees
- **M:N** — Many students enroll in many courses

**Participation:**
- **Total participation** — every entity must participate (double line). Every employee *must* work in a department.
- **Partial participation** — some entities may not participate (single line). Some employees *may* manage a project.

### Weak Entity & Identifying Relationship
- Weak entity uses a **double diamond** for its relationship with the strong entity (called *identifying relationship*)
- Weak entity has a **discriminator / partial key** (dashed underline)
- Example: `Order_Item` (weak) depends on `Order` (strong). Item number alone doesn't identify it — you need Order ID + Item Number together.

---

# 2. RELATIONAL MODEL

The relational model represents data as **tables (relations)**.

## Key Terminology

| Term | Meaning |
|---|---|
| Relation | A table |
| Tuple | A row |
| Attribute | A column |
| Domain | Set of allowed values for an attribute |
| Degree | Number of attributes (columns) |
| Cardinality | Number of tuples (rows) |
| Schema | Structure/definition of the table |
| Instance | The actual data at a point in time |

## Keys — Super Important

- **Super Key** — Any set of attributes that uniquely identifies a tuple. Can have extra attributes.
- **Candidate Key** — Minimal super key (no unnecessary attributes). A table can have multiple candidate keys.
- **Primary Key** — The chosen candidate key. Cannot be NULL. Only one per table.
- **Alternate Key** — Candidate keys not chosen as primary key.
- **Foreign Key** — An attribute in one table that references the primary key of another table. Enforces **referential integrity**.
- **Composite Key** — Primary key made of more than one attribute.
- **Surrogate Key** — Artificially generated key (like auto-increment ID). Has no business meaning.

## Integrity Constraints
- **Entity Integrity** — Primary key cannot be NULL.
- **Referential Integrity** — Foreign key value must either be NULL or match a primary key value in the referenced table.
- **Domain Integrity** — Values must be within the defined domain.
- **Key Integrity** — Primary key must be unique.

---

# 3. RELATIONAL ALGEBRA

Relational algebra is a **procedural query language** — you specify *how* to get data step by step. It's the theoretical foundation of SQL.

## Fundamental Operations

### 1. Selection (σ) — Filter rows
```
σ_condition(Relation)
σ_age > 25(Employee)  →  returns all employees older than 25
```

### 2. Projection (π) — Select columns
```
π_attribute_list(Relation)
π_Name, Salary(Employee)  →  returns only Name and Salary columns
```
Projection automatically removes duplicates.

### 3. Union (∪)
Combines tuples from two relations. Relations must be **union-compatible** (same number of attributes, same domains).
```
R ∪ S  →  all tuples in R or S (duplicates removed)
```

### 4. Set Difference (−)
```
R − S  →  tuples in R but NOT in S
```

### 5. Cartesian Product (×)
Combines every tuple of R with every tuple of S.
```
R × S  →  if R has 3 tuples, S has 4 tuples → result has 12 tuples
```

### 6. Rename (ρ)
```
ρ_NewName(Relation)  →  renames the relation or its attributes
```

## Derived Operations

### Natural Join (⋈)
Joins two tables on **common attributes** (same name and domain), removes duplicate columns. Most commonly used join.
```
Employee ⋈ Department  →  joins on common attribute (like DeptID)
```

### Theta Join (⋈_θ)
Join with any condition.
```
R ⋈_(R.A > S.B) S
```

### Equi Join
Theta join where condition is equality (=). Keeps duplicate join columns (unlike natural join).

### Left Outer Join (⟕)
All tuples from left relation + matching tuples from right. Non-matching right side filled with NULL.

### Right Outer Join (⟖)
All tuples from right relation + matching from left.

### Full Outer Join (⟗)
All tuples from both; NULLs where no match.

### Intersection (∩)
```
R ∩ S  →  tuples present in BOTH R and S
```
(Can be derived: R ∩ S = R − (R − S))

### Division (÷)
Used for "for all" queries. R ÷ S gives tuples in R that are associated with *all* tuples in S.
Example: Find students who enrolled in *all* courses.

---

# 4. TUPLE RELATIONAL CALCULUS (TRC)

TRC is a **non-procedural** query language — you specify *what* you want, not how to get it.

## Syntax
```
{ t | P(t) }
```
"Give me all tuples t such that predicate P(t) is true."

## Example
Find all employees with salary > 50000:
```
{ t | t ∈ Employee ∧ t.Salary > 50000 }
```

Find names of employees working in Department 10:
```
{ t.Name | t ∈ Employee ∧ t.DeptNo = 10 }
```

## Quantifiers
- **∃ (Existential)** — "There exists at least one"
- **∀ (Universal)** — "For all"

Find employees who work in *some* department located in Mumbai:
```
{ t | t ∈ Employee ∧ ∃s(s ∈ Department ∧ s.DeptNo = t.DeptNo ∧ s.City = 'Mumbai') }
```

## Safe vs Unsafe Expressions
A TRC expression is **safe** if it only produces values that actually exist in the database (finite result). Unsafe expressions can produce infinite results — these are not allowed.

**Domain Relational Calculus (DRC)** — similar but uses domain variables (individual attribute values) instead of tuple variables.

---

# 5. NORMALIZATION

Normalization is the process of **organizing a database to reduce redundancy and improve integrity** by decomposing tables into smaller, well-structured ones.

## Why Normalize? — Anomalies
Without normalization, you get:
- **Insertion Anomaly** — Can't insert data without unrelated data. Can't add a new department until someone is assigned to it.
- **Deletion Anomaly** — Deleting a row loses other important data. Deleting last employee in a dept loses dept info.
- **Update Anomaly** — Same data in multiple places; updating one leads to inconsistency.

## Functional Dependency (FD)
FD: X → Y means "X determines Y" — if two tuples have the same X, they must have the same Y.

- **Trivial FD** — Y ⊆ X. Example: {A, B} → A. Always holds.
- **Non-trivial FD** — Y ⊄ X. Meaningful dependency.
- **Partial FD** — Non-key attribute depends on *part of* a composite primary key.
- **Transitive FD** — A → B and B → C, so A → C (indirectly).

## Armstrong's Axioms (Rules to derive all FDs)
- **Reflexivity** — If Y ⊆ X, then X → Y
- **Augmentation** — If X → Y, then XZ → YZ
- **Transitivity** — If X → Y and Y → Z, then X → Z
- **Union** — If X → Y and X → Z, then X → YZ
- **Decomposition** — If X → YZ, then X → Y and X → Z

## Normal Forms

### 1NF (First Normal Form)
- All attribute values must be **atomic** (indivisible)
- No repeating groups or arrays
- Each column must have a single value per cell

❌ Violation: Phone column has "9876, 5432" in one cell
✅ Fix: Create separate rows for each phone number

### 2NF (Second Normal Form)
- Must be in 1NF
- **No partial dependencies** — every non-key attribute must depend on the *entire* primary key (not just part of it)
- Only relevant when you have a **composite primary key**

❌ Example: Table(OrderID, ProductID, ProductName, Quantity)
- ProductName depends only on ProductID (partial dependency)
✅ Fix: Split into Order_Items(OrderID, ProductID, Quantity) and Products(ProductID, ProductName)

### 3NF (Third Normal Form)
- Must be in 2NF
- **No transitive dependencies** — non-key attribute should not depend on another non-key attribute

❌ Example: Employee(EmpID, DeptID, DeptName)
- EmpID → DeptID (DeptID is non-key)
- DeptID → DeptName (transitive!)
✅ Fix: Split into Employee(EmpID, DeptID) and Department(DeptID, DeptName)

**3NF Rule formally:** For every FD X → Y, either:
1. X is a superkey, OR
2. Y is part of some candidate key (prime attribute)

### BCNF (Boyce-Codd Normal Form) — Stronger 3NF
- Must be in 3NF
- For every FD X → Y, **X must be a superkey** (no exception for prime attributes)
- BCNF is stricter than 3NF — every 3NF relation is not necessarily BCNF

❌ Example: Course(Student, Course, Teacher) — Teacher → Course, but Teacher is not a superkey
✅ Fix: Decompose into (Student, Teacher) and (Teacher, Course)

⚠️ **BCNF may lose lossless join or dependency preservation** — trade-off exists

### 4NF (Fourth Normal Form)
- Must be in BCNF
- No **multi-valued dependencies (MVD)**
- X →→ Y means X multi-determines Y — for each X value, Y has a set of values independent of other attributes

❌ Example: Student(Name, Hobby, Language) — Name →→ Hobby and Name →→ Language
✅ Fix: Separate into (Name, Hobby) and (Name, Language)

### 5NF (Fifth Normal Form / PJNF)
- Must be in 4NF
- No **join dependencies** — the table cannot be decomposed further without loss
- Rarely encountered in practice

## Decomposition Properties
When you split a table, you must ensure:
- **Lossless Join** — When you join back, you get the exact original table (no spurious tuples). This is **mandatory**.
- **Dependency Preservation** — All original FDs can still be checked within the decomposed tables. Preferred but BCNF may sacrifice this.

---

# 6. SQL QUERIES

## DDL (Data Definition Language)
```sql
CREATE TABLE Student (
  RollNo INT PRIMARY KEY,
  Name VARCHAR(50) NOT NULL,
  Age INT CHECK (Age >= 18),
  DeptID INT REFERENCES Department(DeptID)
);

ALTER TABLE Student ADD COLUMN Email VARCHAR(100);
ALTER TABLE Student DROP COLUMN Age;
ALTER TABLE Student MODIFY COLUMN Name VARCHAR(100);

DROP TABLE Student;       -- Deletes table + data permanently
TRUNCATE TABLE Student;   -- Deletes all data, keeps structure (faster than DELETE, can't rollback in some DBs)
```

## DML (Data Manipulation Language)
```sql
INSERT INTO Student VALUES (1, 'Ravi', 20, 101);
INSERT INTO Student (RollNo, Name) VALUES (2, 'Priya');

UPDATE Student SET Age = 21 WHERE RollNo = 1;

DELETE FROM Student WHERE RollNo = 1;
DELETE FROM Student;  -- Deletes all rows
```

## DQL (Data Query Language)
```sql
SELECT * FROM Student;
SELECT DISTINCT DeptID FROM Student;
SELECT Name, Age FROM Student WHERE Age > 20;
SELECT * FROM Student ORDER BY Name ASC, Age DESC;
SELECT * FROM Student LIMIT 10 OFFSET 5;
```

## Aggregate Functions
```sql
SELECT COUNT(*) FROM Student;
SELECT COUNT(DISTINCT DeptID) FROM Student;
SELECT AVG(Salary) FROM Employee;
SELECT MAX(Salary), MIN(Salary) FROM Employee;
SELECT SUM(Salary) FROM Employee;
```

## GROUP BY and HAVING
```sql
-- Count students per department
SELECT DeptID, COUNT(*) AS StudentCount
FROM Student
GROUP BY DeptID;

-- Only depts with more than 5 students
SELECT DeptID, COUNT(*) AS StudentCount
FROM Student
GROUP BY DeptID
HAVING COUNT(*) > 5;
```

**Key Rule:** `WHERE` filters *before* grouping. `HAVING` filters *after* grouping. You cannot use aggregate functions in WHERE.

## JOINS
```sql
-- INNER JOIN: only matching rows
SELECT S.Name, D.DeptName
FROM Student S
INNER JOIN Department D ON S.DeptID = D.DeptID;

-- LEFT OUTER JOIN: all students, even if no dept
SELECT S.Name, D.DeptName
FROM Student S
LEFT JOIN Department D ON S.DeptID = D.DeptID;

-- RIGHT OUTER JOIN
SELECT S.Name, D.DeptName
FROM Student S
RIGHT JOIN Department D ON S.DeptID = D.DeptID;

-- FULL OUTER JOIN
SELECT S.Name, D.DeptName
FROM Student S
FULL OUTER JOIN Department D ON S.DeptID = D.DeptID;

-- CROSS JOIN: cartesian product
SELECT * FROM A CROSS JOIN B;

-- SELF JOIN: join table with itself
SELECT E1.Name AS Employee, E2.Name AS Manager
FROM Employee E1
JOIN Employee E2 ON E1.ManagerID = E2.EmpID;
```

## Subqueries
```sql
-- Scalar subquery (returns single value)
SELECT Name FROM Employee
WHERE Salary > (SELECT AVG(Salary) FROM Employee);

-- IN subquery
SELECT Name FROM Student
WHERE DeptID IN (SELECT DeptID FROM Department WHERE City = 'Mumbai');

-- EXISTS subquery (checks if rows exist)
SELECT Name FROM Student S
WHERE EXISTS (
  SELECT 1 FROM Enrollment E WHERE E.RollNo = S.RollNo
);

-- Correlated subquery (references outer query)
SELECT Name, Salary FROM Employee E1
WHERE Salary > (
  SELECT AVG(Salary) FROM Employee E2 WHERE E1.DeptID = E2.DeptID
);
```

## Set Operations
```sql
SELECT Name FROM TableA
UNION       -- removes duplicates
SELECT Name FROM TableB;

SELECT Name FROM TableA
UNION ALL   -- keeps duplicates (faster)
SELECT Name FROM TableB;

SELECT Name FROM TableA
INTERSECT
SELECT Name FROM TableB;

SELECT Name FROM TableA
EXCEPT   -- or MINUS in Oracle
SELECT Name FROM TableB;
```

## Views
```sql
CREATE VIEW HighEarners AS
SELECT Name, Salary FROM Employee WHERE Salary > 80000;

SELECT * FROM HighEarners;  -- use like a table
DROP VIEW HighEarners;
```
Views don't store data (usually). They are virtual tables. **Materialized views** store the result physically.

## Constraints Summary
| Constraint | Purpose |
|---|---|
| PRIMARY KEY | Unique + NOT NULL |
| FOREIGN KEY | Referential integrity |
| UNIQUE | No duplicates (NULLs allowed) |
| NOT NULL | Cannot be empty |
| CHECK | Custom condition |
| DEFAULT | Default value if not provided |

---

# 7. FILE ORGANISATION

How data is physically stored in files on disk.

## Types

### Heap (Unordered) File Organisation
- Records stored in no particular order
- Inserted at the end
- **Search:** O(n) — must scan all records (slow)
- **Insert:** Very fast
- Best for bulk loading or when full scans are needed

### Sequential (Ordered) File Organisation
- Records stored sorted by a **key field**
- **Search:** Binary search possible — O(log n)
- **Insert/Delete:** Expensive — must maintain order, may need reorganization
- Used for ordered reporting

### Hash File Organisation
- A **hash function** maps a key to a bucket (file page)
- **Search/Insert/Delete:** O(1) average for equality queries
- ❌ Bad for range queries
- **Static Hashing:** Fixed number of buckets — overflow possible
- **Dynamic Hashing (Extendible/Linear):** Buckets grow as data grows

### Clustered vs Unclustered
- **Clustered:** Physical order of records matches index order. One per table.
- **Unclustered:** Index order differs from physical order.

---

# 8. INDEXING

An index is a data structure that speeds up data retrieval — like the index of a book.

## Types of Indexes

### Primary Index
- Built on an **ordered file** based on the **primary key**
- One entry per data block (sparse) — "anchor record"
- File must be physically sorted

### Secondary Index
- Built on a **non-ordering, non-key field**
- Dense — one entry per record
- Points to the actual record location
- Multiple secondary indexes possible per table

### Clustering Index
- Built on a **non-key ordering field** (field used to sort the file, but not unique)
- One entry per distinct value of the field

## Dense vs Sparse Index
| Dense | Sparse |
|---|---|
| One index entry per record | One index entry per block |
| Faster search | Less storage |
| More storage needed | Only works on sorted files |

## B-Tree and B+ Tree (Most Important!)

### B-Tree
- Balanced tree where all leaves are at same level
- Data records stored at **both internal nodes and leaf nodes**
- Keys are not repeated

### B+ Tree ⭐ (Used in almost all real databases)
- All data records stored **only at leaf nodes**
- Internal nodes contain only keys for routing
- **Leaf nodes are linked** — great for range queries
- Remains balanced after insertions and deletions
- Height is O(log_n(N)) — very efficient

**Order of B+ Tree:** Maximum number of children an internal node can have.

## Multilevel Index
When index itself is too large, build an index on the index → multilevel index. B+ tree is essentially a multilevel index.

## Hash Index
- Uses hash function on key → bucket
- Great for equality search
- Poor for range queries

---

# 9. TRANSACTIONS

A **transaction** is a logical unit of work — a sequence of operations that must be executed as a whole.

Example: Bank transfer — debit account A, credit account B. Both must succeed or both must fail.

## ACID Properties ⭐ (Must know inside out)

### Atomicity
- "All or Nothing"
- Either ALL operations of a transaction complete, or NONE do
- If a crash occurs mid-transaction, all partial changes are rolled back
- Implemented by: **Undo logs, Rollback**

### Consistency
- Transaction brings the database from one **valid state** to another valid state
- All integrity constraints must be satisfied before and after the transaction
- Responsibility of: both the DBMS and the application developer

### Isolation
- Concurrent transactions must execute as if they are running **serially** (one at a time)
- Intermediate states of a transaction are not visible to other transactions
- Implemented by: **Locking, MVCC**

### Durability
- Once a transaction is **committed**, its changes are permanent — even if the system crashes
- Implemented by: **Write-ahead logging (WAL), Redo logs**

## Transaction States
```
Active → Partially Committed → Committed
                ↓
             Failed → Aborted (Rolled Back)
```
- **Active** — Transaction is executing
- **Partially Committed** — Last operation executed, not yet written to disk
- **Committed** — All changes written, transaction complete
- **Failed** — Error occurred
- **Aborted** — Rolled back to initial state

## Operations
- **Commit** — Save all changes permanently
- **Rollback / Abort** — Undo all changes
- **Savepoint** — Partial rollback point within a transaction

---

# 10. CONCURRENCY CONTROL

When multiple transactions run simultaneously, problems can occur.

## Concurrency Problems

### 1. Dirty Read (Write-Read conflict)
- T1 writes data, T2 reads it, T1 rolls back
- T2 has read **uncommitted (dirty) data**

### 2. Lost Update (Write-Write conflict)
- T1 reads value (100), T2 reads value (100)
- T1 writes 150, T2 writes 120
- T1's update is **lost**

### 3. Unrepeatable Read (Read-Write conflict)
- T1 reads X = 100, T2 updates X = 200 and commits
- T1 reads X again → gets 200 (different value!)
- T1 can't repeat its own read

### 4. Phantom Read
- T1 reads all rows where salary > 50000 → 5 rows
- T2 inserts a new employee with salary 60000
- T1 reads again → 6 rows
- A new "phantom" row appeared

## Serializability ⭐
A schedule of concurrent transactions is **serializable** if its result is equivalent to some serial (sequential) execution of those transactions.

### Conflict Serializability
Two operations **conflict** if:
- They belong to different transactions
- They access the same data item
- At least one is a write

A schedule is **conflict serializable** if it can be transformed into a serial schedule by swapping **non-conflicting** operations.

**Test:** Draw a **Precedence Graph (Serialization Graph)**
- Node for each transaction
- Edge Ti → Tj if an operation of Ti conflicts with a later operation of Tj
- **No cycle = Conflict Serializable** ✅
- **Cycle = Not Conflict Serializable** ❌

## Locking ⭐

### Types of Locks
- **Shared Lock (S / Read Lock)** — Multiple transactions can hold it simultaneously. Used for reading.
- **Exclusive Lock (X / Write Lock)** — Only one transaction can hold it. Used for writing. No other lock allowed simultaneously.

### Lock Compatibility Matrix
|  | S | X |
|---|---|---|
| **S** | ✅ Compatible | ❌ Conflict |
| **X** | ❌ Conflict | ❌ Conflict |

### Two-Phase Locking (2PL) ⭐
A protocol that guarantees conflict serializability.

**Phase 1 — Growing Phase:** Transaction can acquire locks but cannot release any.
**Phase 2 — Shrinking Phase:** Transaction can release locks but cannot acquire new ones.

The point where the last lock is acquired = **Lock Point**

Variants:
- **Strict 2PL** — All exclusive locks held until commit/abort. Prevents cascading rollbacks.
- **Rigorous 2PL** — All locks (S and X) held until commit/abort.
- **Conservative 2PL** — All locks acquired before transaction starts. No deadlocks, but impractical.

### Deadlock
- T1 holds lock on A, waits for B
- T2 holds lock on B, waits for A
- Both wait forever → **Deadlock**

**Detection:** Wait-for graph — cycle means deadlock. Resolve by aborting one transaction (victim).

**Prevention:**
- **Wait-Die** — Older transaction waits, younger dies (rolled back)
- **Wound-Wait** — Older wounds (aborts) younger, younger waits for older

**Avoidance:** Banker's algorithm (theoretical)

**Timeout:** Abort transaction if it waits too long

## Isolation Levels (SQL Standard)
| Level | Dirty Read | Unrepeatable Read | Phantom Read |
|---|---|---|---|
| READ UNCOMMITTED | ✅ Possible | ✅ Possible | ✅ Possible |
| READ COMMITTED | ❌ Prevented | ✅ Possible | ✅ Possible |
| REPEATABLE READ | ❌ Prevented | ❌ Prevented | ✅ Possible |
| SERIALIZABLE | ❌ Prevented | ❌ Prevented | ❌ Prevented |

Higher isolation = more safety but less performance.

## MVCC (Multi-Version Concurrency Control)
- Maintains **multiple versions** of data
- Readers don't block writers, writers don't block readers
- Each transaction sees a **snapshot** of the database from when it started
- Used in PostgreSQL, Oracle, MySQL InnoDB

---

# 11. BACKUP AND RECOVERY

## Types of Failures
- **Transaction Failure** — Logical error (divide by zero), system error (deadlock)
- **System Failure** — OS crash, power failure — volatile storage (RAM) lost, non-volatile (disk) intact
- **Media Failure** — Disk crash — data on disk is lost. Rare but catastrophic.

## Log-Based Recovery ⭐

A **log** is an append-only file on stable storage recording all database changes.

Each log record:
```
<T1, Start>
<T1, X, old_value, new_value>  ← for each write
<T1, Commit>  or  <T1, Abort>
```

### Write-Ahead Logging (WAL)
**Rule:** Log record must be written to stable storage **before** the actual data is written to disk.
This is the golden rule of recovery.

### Recovery Operations
- **UNDO** — Roll back incomplete transactions (failure occurred before commit)
- **REDO** — Re-apply committed transactions whose changes may not have reached disk

### Checkpoint
- Periodically, DBMS writes a **checkpoint** to log — flushes all dirty pages to disk
- On recovery, only need to process logs **after the last checkpoint**
- Drastically reduces recovery time

## Recovery Algorithms

### Deferred Update (No-Undo / Redo)
- Changes NOT written to disk until commit
- On failure: just discard (no undo needed)
- On recovery: redo committed transactions

### Immediate Update (Undo / Redo)
- Changes written to disk immediately (before commit)
- On failure: undo uncommitted, redo committed

### ARIES Algorithm (Industry standard)
Three phases:
1. **Analysis** — Scan log from last checkpoint, identify active transactions and dirty pages at crash
2. **Redo** — Redo all operations from earliest dirty page LSN to bring DB to crash state
3. **Undo** — Undo all incomplete (uncommitted) transactions in reverse order

## Backup Types
| Type | What's backed up | Speed | Recovery |
|---|---|---|---|
| Full Backup | Entire database | Slow | Fast (single backup) |
| Incremental | Changes since last backup (any) | Fast | Slow (need chain) |
| Differential | Changes since last full backup | Medium | Medium |

## Recovery Methods
- **Cold Backup** — DB shut down, files copied. Simple but causes downtime.
- **Hot Backup** — Backup while DB is running. Complex, uses logs to ensure consistency.
- **Point-in-Time Recovery (PITR)** — Restore to exact moment before failure using full backup + logs.

---

# 12. QUERY OPTIMIZATION

## Query Processing Steps
```
SQL Query → Parser → Relational Algebra Expression → Query Optimizer → Execution Plan → Results
```

## Query Optimizer
Converts a query into an efficient execution plan.

**Two approaches:**
- **Rule-based (Heuristic):** Apply transformation rules (push selections down, push projections down)
- **Cost-based:** Estimate cost (I/O, CPU) of multiple plans, pick cheapest

## Key Heuristics
- **Push selections down** — Filter rows early to reduce intermediate result size
- **Push projections down** — Eliminate unnecessary columns early
- **Perform most restrictive selection first**
- **Avoid Cartesian products** — Convert to joins

## Join Algorithms
- **Nested Loop Join** — For each row in R, scan S. O(n*m). Simple but slow.
- **Block Nested Loop** — Load blocks instead of rows. Better I/O.
- **Sort-Merge Join** — Sort both relations on join attribute, then merge. Good for large sorted data.
- **Hash Join** — Hash smaller relation, probe with larger. Very efficient in practice.

## EXPLAIN / EXPLAIN ANALYZE (SQL)
Use `EXPLAIN SELECT ...` to see the execution plan the optimizer chose.

---

# 13. DATABASE ARCHITECTURES

## RDBMS (Relational DBMS)
- Data stored in tables with strict schema
- ACID compliant
- Uses SQL
- Examples: MySQL, PostgreSQL, Oracle, SQL Server
- Best for: Structured data, complex queries, financial systems

## NoSQL
Designed for scalability, flexibility, speed — relaxes ACID (often BASE: **Basically Available, Soft state, Eventually consistent**)

### Types of NoSQL:

| Type | Structure | Example | Use Case |
|---|---|---|---|
| Document | JSON/BSON documents | MongoDB, CouchDB | User profiles, catalogs |
| Key-Value | Key → Value pairs | Redis, DynamoDB | Caching, sessions |
| Column-Family | Column-oriented rows | Cassandra, HBase | Time-series, analytics |
| Graph | Nodes + Edges | Neo4j, ArangoDB | Social networks, recommendation |

**CAP Theorem:** A distributed system can guarantee only 2 of 3:
- **Consistency** — All nodes see same data
- **Availability** — Every request gets a response
- **Partition Tolerance** — System works despite network partition

## Vector Database
- Stores data as **high-dimensional vectors** (embeddings)
- Supports **similarity search** (ANN — Approximate Nearest Neighbor)
- Examples: Pinecone, Weaviate, Milvus, pgvector (PostgreSQL extension)
- Used for: AI/ML applications, semantic search, recommendation systems, RAG (Retrieval Augmented Generation)

How it works: Convert data (text, images) to vectors using ML models → store vectors → query by similarity (cosine distance, euclidean distance)

## Graph Database
- Data stored as **nodes (entities)** and **edges (relationships)** with properties
- Query language: **Cypher** (Neo4j), SPARQL, Gremlin
- Excellent for traversal queries ("find friends of friends")
- Examples: Neo4j, Amazon Neptune
- Use cases: Social networks, fraud detection, knowledge graphs

## Distributed Database
- Data stored across **multiple physically separate nodes**
- Appears as single logical database to users

### Architectures:
- **Shared Memory** — All processors access same memory
- **Shared Disk** — All processors access same disks (like Oracle RAC)
- **Shared Nothing** — Each node has its own memory and disk. Most scalable (Google Spanner, Cassandra)

### Key Concepts:
- **Sharding / Horizontal Partitioning** — Split rows across nodes (User IDs 1-1M on Node1, 1M-2M on Node2)
- **Replication** — Copy data to multiple nodes for fault tolerance
- **Horizontal Scaling (Scale Out)** — Add more nodes
- **Vertical Scaling (Scale Up)** — Add more power to existing node

### Distributed Transactions:
**2-Phase Commit (2PC):**
1. **Prepare Phase** — Coordinator asks all nodes "are you ready to commit?"
2. **Commit Phase** — If all say yes → commit. If any says no → abort.

---

# 14. QUICK REVISION CHEAT SHEET 🎯

| Concept | Key Point |
|---|---|
| Weak Entity | Double rectangle, needs strong entity, has partial key |
| 2NF | No partial dependency (composite key) |
| 3NF | No transitive dependency |
| BCNF | Every determinant must be superkey |
| ACID | Atomicity, Consistency, Isolation, Durability |
| Dirty Read | Reading uncommitted data |
| Lost Update | Overwriting another transaction's write |
| 2PL | Growing + Shrinking phase → Conflict serializable |
| Deadlock | Cycle in wait-for graph, resolved by victim rollback |
| WAL | Log before data — golden rule of recovery |
| B+ Tree | All data at leaves, leaves linked, used in real DBs |
| MVCC | Multiple versions, readers don't block writers |
| CAP Theorem | Choose 2: Consistency, Availability, Partition Tolerance |

---

You now have a **complete, exam-ready mastery** of the entire Databases section. Every concept you could be asked about is here — ER models, all normal forms, relational algebra, SQL (joins, subqueries, aggregates), indexing, ACID, locks, deadlocks, 2PL, recovery, and all DB architectures.

**Study tip:** After reading once, go topic by topic and try to explain it out loud as if you're teaching someone. If you can teach it, you can answer any exam question. Come back with specific doubts or practice questions anytime. You've got this! 💪