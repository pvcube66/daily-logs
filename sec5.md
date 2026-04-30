# Operating Systems — Complete Master Guide 🔥

Buckle up, this is the biggest section. Let's absolutely cook. 🍳

---

## 1. SYSTEM CALLS

### What is a System Call?

A system call is the **mechanism by which a user program requests a service from the OS kernel**.

User programs run in **User Mode** (restricted). The OS runs in **Kernel Mode** (full access). System calls are the bridge.

```
User Program
     │
     │  system call (e.g., read(), write())
     ▼
  ┌──────────────────────┐
  │      OS KERNEL       │  ← Kernel Mode (ring 0)
  │  (full hardware      │
  │     access)          │
  └──────────────────────┘
     │
     ▼
  Hardware
```

### How a System Call Works (Step by Step):

```
1. User program calls library function (e.g., printf)
2. Library puts system call NUMBER in a register
3. Library executes TRAP / INT instruction
4. CPU switches from User Mode → Kernel Mode
5. Kernel looks up system call number in syscall table
6. Kernel executes the requested service
7. Kernel puts return value in register
8. CPU switches back to User Mode
9. Library function returns to user program
```

### Categories of System Calls:

| Category | Examples | What they do |
|----------|----------|-------------|
| **Process Control** | fork(), exec(), exit(), wait() | Create/terminate processes |
| **File Management** | open(), read(), write(), close() | File operations |
| **Device Management** | ioctl(), read(), write() | I/O device control |
| **Information** | getpid(), gettime(), uname() | Get system info |
| **Communication** | pipe(), socket(), send(), recv() | IPC |
| **Memory** | mmap(), brk(), mprotect() | Memory management |

### User Mode vs Kernel Mode:

| Feature | User Mode | Kernel Mode |
|---------|-----------|-------------|
| Privilege | Low (Ring 3) | High (Ring 0) |
| Memory access | Own process only | All memory |
| Hardware access | None directly | Full |
| Error consequences | Process crashes | System crashes |
| Transition | Via system call/trap | Via IRET |

---

## 2. PROCESSES

### What is a Process?

A process = **a program in execution** — it's not just the code, it includes:

```
┌─────────────────────────────┐  ← High address
│          Stack              │  (local vars, function calls, return addr)
│            ↓                │
│     (grows downward)        │
│                             │
│     (grows upward)          │
│            ↑                │
│           Heap              │  (dynamic memory: malloc/new)
├─────────────────────────────┤
│      BSS Segment            │  (uninitialized global vars)
├─────────────────────────────┤
│      Data Segment           │  (initialized global/static vars)
├─────────────────────────────┤
│      Text Segment           │  (program code / instructions)
└─────────────────────────────┘  ← Low address
```

### Process Control Block (PCB) ⭐

The PCB is the **data structure the OS uses to represent a process** — everything the OS knows about a process.

| PCB Field | Content |
|-----------|---------|
| Process ID (PID) | Unique identifier |
| Process State | Ready, Running, Waiting... |
| Program Counter | Address of next instruction |
| CPU Registers | All register values (saved on context switch) |
| Memory Info | Base/limit, page table pointer |
| I/O Status | Open files, devices allocated |
| Scheduling Info | Priority, CPU time used |
| Parent PID | Who created this process |

### Process States & State Diagram:

```
              admit
   NEW ──────────────→ READY
                         │  ↑
              scheduler  │  │  I/O complete /
              dispatches │  │  event occurs
                         ↓  │
                       RUNNING ──────────────→ TERMINATED
                         │         exit()
           I/O request / │
           event wait    │
                         ↓
                       WAITING
```

| State | Meaning |
|-------|---------|
| **New** | Process being created |
| **Ready** | Waiting for CPU (in ready queue) |
| **Running** | Currently executing on CPU |
| **Waiting/Blocked** | Waiting for I/O or event |
| **Terminated** | Finished execution |

### Context Switch:

When CPU switches from process A to process B:
1. Save ALL of A's state into A's PCB (registers, PC, stack pointer)
2. Load B's state from B's PCB
3. Resume B

Context switching is **pure overhead** — no useful work done during switch.

### Process Creation (fork/exec):

```c
pid = fork();     // Creates exact copy of parent process
                  // Returns 0 to child, child's PID to parent
if (pid == 0) {
    exec("program"); // Replace child's memory with new program
} else {
    wait();       // Parent waits for child to finish
}
```

- **fork()** — duplicates process
- **exec()** — replaces process image with new program
- **wait()** — parent waits for child termination
- **exit()** — process terminates itself
- **Zombie Process** — Child finished but parent hasn't called wait() yet
- **Orphan Process** — Parent died before child; adopted by init (PID 1)

---

## 3. THREADS

### What is a Thread?

A thread = **a lightweight process** — the smallest unit of CPU execution.

Multiple threads share the same process's memory space.

```
Process A
┌──────────────────────────────────┐
│   Code  │   Data  │   Files      │  ← SHARED by all threads
├──────────────────────────────────┤
│ Thread 1│ Thread 2│ Thread 3     │
│ Stack   │ Stack   │ Stack        │  ← Each thread has its OWN
│ Regs    │ Regs    │ Regs         │  ← Each thread has its OWN
│ PC      │ PC      │ PC           │  ← Each thread has its OWN
└──────────────────────────────────┘
```

### Process vs Thread:

| Feature | Process | Thread |
|---------|---------|--------|
| Memory | Separate address space | Shared address space |
| Creation cost | Heavy (slow) | Light (fast) |
| Communication | Needs IPC mechanisms | Direct (shared memory) |
| Context switch | Expensive | Cheap |
| Crash effect | Only that process | Can crash whole process |
| Example | Chrome tab (process) | Chrome JS engine + renderer (threads) |

### Types of Threads:

**1. User-Level Threads (ULT)**
- Managed by user-space thread library (not OS kernel)
- OS doesn't know about them
- ✅ Fast to create/switch
- ❌ If one blocks, ALL threads in process block

**2. Kernel-Level Threads (KLT)**
- OS knows and manages each thread
- ✅ True parallelism on multi-core
- ❌ Slower (kernel involvement)

**3. Hybrid (Many-to-Many Model)**
- Multiple ULTs mapped to multiple KLTs
- Best of both worlds

### Thread Models:

| Model | Mapping | Issue |
|-------|---------|-------|
| Many-to-One | Many ULT → 1 KLT | No parallelism |
| One-to-One | 1 ULT → 1 KLT | Too many kernel threads |
| Many-to-Many | Many ULT → Many KLT | Complex but best |

### Multithreading Benefits:
- **Responsiveness** — UI thread stays alive while worker threads run
- **Resource sharing** — Share memory without IPC
- **Economy** — Cheaper than multi-process
- **Scalability** — Use multiple CPU cores

---

## 4. INTER-PROCESS COMMUNICATION (IPC)

Processes have separate address spaces — they need special mechanisms to communicate.

### IPC Mechanisms:

---

#### 1. Pipes

Unidirectional data channel — one process writes, other reads.

```
Process A ──write──→ [PIPE BUFFER] ──read──→ Process B
```

- **Anonymous Pipe** — Only between parent-child processes
- **Named Pipe (FIFO)** — Between unrelated processes, has a name in filesystem
- Data flows in order (FIFO)

---

#### 2. Message Queues

OS-maintained queue of messages. Processes send/receive messages.
- Messages have **types** — receivers can select specific types
- Persists even after sender exits
- `msgsnd()`, `msgrcv()` in Linux

---

#### 3. Shared Memory ⭐ (Fastest IPC)

Two processes map the **same region of physical memory** into their address spaces.

```
Process A         Process B
Address Space     Address Space
┌─────────┐       ┌─────────┐
│         │       │         │
│ shared  │       │ shared  │
│ region  │       │ region  │
│         │       │         │
└─────────┘       └─────────┘
      ↑                 ↑
      └────────┬────────┘
           Physical RAM
           (same page)
```

- ✅ Fastest — no kernel in data path
- ❌ Needs **synchronization** (can't both write at same time!)
- Linux: `shmget()`, `shmat()`

---

#### 4. Signals

Software interrupts sent to a process.
- `SIGKILL` — Kill process (can't be caught)
- `SIGTERM` — Request termination (can be handled)
- `SIGSEGV` — Segmentation fault
- `SIGINT` — Ctrl+C

---

#### 5. Sockets

Communication endpoint — works **across machines** (network) too.
- TCP/UDP sockets
- Used in client-server architecture
- Most powerful, most complex IPC

---

#### 6. Semaphores

Used mainly for **synchronization** (covered in concurrency section below).

---

## 5. DEADLOCKS

### What is a Deadlock?

A set of processes are **ALL waiting for resources held by other processes in the set** — nobody can proceed. EVER.

Classic example:

```
Process P1 holds Resource R1, wants R2
Process P2 holds Resource R2, wants R1

P1 ──wants──→ R2 ──held by──→ P2
P2 ──wants──→ R1 ──held by──→ P1

STUCK FOREVER = DEADLOCK ☠️
```

### Four Necessary Conditions (Coffman Conditions) ⭐

ALL FOUR must hold simultaneously for deadlock:

| Condition | Meaning |
|-----------|---------|
| **Mutual Exclusion** | Resource can be held by only one process at a time |
| **Hold and Wait** | Process holding a resource can request more |
| **No Preemption** | Resource can only be released voluntarily by holder |
| **Circular Wait** | Circular chain: P1→R1→P2→R2→P1 |

Deny ANY ONE condition → deadlock impossible.

### Resource Allocation Graph (RAG):

- **Circle** = Process
- **Square** = Resource
- **Arrow P→R** = Process P requesting resource R
- **Arrow R→P** = Resource R assigned to process P
- **Cycle in RAG** = Deadlock (if single instance per resource)

---

### Deadlock Handling Strategies:

#### Strategy 1: Deadlock Prevention
**Eliminate at least one Coffman condition at design time.**

| Condition to eliminate | How |
|----------------------|-----|
| Mutual Exclusion | Make resources shareable (not always possible) |
| Hold and Wait | Process must request ALL resources at once before starting |
| No Preemption | OS can forcibly take resources away |
| Circular Wait | Impose ordering on resources — always request in fixed order |

❌ Usually wasteful/impractical — low resource utilization

---

#### Strategy 2: Deadlock Avoidance ⭐ — Banker's Algorithm

OS checks before granting any resource — "will this lead to deadlock?"

**Safe State** — there exists a sequence of processes that can all finish using available resources.

**Banker's Algorithm** (for multiple resources):

Data structures:
- `Available[j]` — Number of available instances of resource j
- `Max[i][j]` — Maximum demand of process i for resource j
- `Allocation[i][j]` — Currently allocated
- `Need[i][j]` = Max[i][j] - Allocation[i][j]

**Safety Algorithm:**
```
1. Work = Available; Finish[i] = false for all i
2. Find i where: Finish[i]=false AND Need[i] ≤ Work
3. Work = Work + Allocation[i]; Finish[i] = true
4. Repeat step 2-3
5. If all Finish[i] = true → SAFE STATE ✅
   Else → UNSAFE (may deadlock) ❌
```

**Resource Request Algorithm:**
```
When Pi requests Resources[]:
1. If Request[i] ≤ Need[i] → proceed, else error
2. If Request[i] ≤ Available → proceed, else wait
3. Pretend to allocate:
   Available -= Request[i]
   Allocation[i] += Request[i]
   Need[i] -= Request[i]
4. Run Safety Algorithm
5. If SAFE → grant; else → rollback and wait
```

---

#### Strategy 3: Deadlock Detection + Recovery

Let deadlock happen, then detect and fix it.

**Detection:** Run RAG cycle detection periodically

**Recovery options:**
- **Process Termination** — Kill one or all deadlocked processes
- **Resource Preemption** — Take resources from some processes, give to others (rollback)

---

#### Strategy 4: Ignore (Ostrich Algorithm)

Pretend deadlocks don't happen — let user reboot.

Used by: Windows, early Linux (rare deadlocks aren't worth the overhead to prevent)

---

## 6. CONCURRENCY AND SYNCHRONIZATION

### The Critical Section Problem

When multiple threads/processes access **shared data** simultaneously, results can be inconsistent.

**Race Condition** — Outcome depends on execution order (bad!)

**Critical Section** — Code that accesses shared resources

### Requirements for a Valid Solution:

| Requirement | Meaning |
|-------------|---------|
| **Mutual Exclusion** | Only one process in critical section at a time |
| **Progress** | If no one is in CS, someone who wants to enter should be able to |
| **Bounded Waiting** | A process can't wait forever (no starvation) |

---

### Synchronization Mechanisms:

#### 1. Mutex (Mutual Exclusion Lock)

Binary lock — locked or unlocked.

```c
mutex.lock();
// CRITICAL SECTION
mutex.unlock();
```

Only the **thread that locked it can unlock it**.

---

#### 2. Semaphore ⭐

An integer variable with two atomic operations:

- **wait() / P() / down()** — Decrement; if negative, block
- **signal() / V() / up()** — Increment; if any blocked, wake one

```
wait(S):
  S = S - 1
  if S < 0: block this process (add to queue)

signal(S):
  S = S + 1
  if S ≤ 0: wake one blocked process
```

**Binary Semaphore (S=1)** — Acts like mutex

**Counting Semaphore (S=N)** — Controls access to N resources (e.g., N buffer slots)

---

#### 3. Classic Synchronization Problems:

**Producer-Consumer (Bounded Buffer):**
```
Shared buffer of size N
Semaphores: mutex=1, empty=N, full=0

Producer:
  wait(empty)    ← Wait if buffer full
  wait(mutex)    ← Lock
  add item
  signal(mutex)  ← Unlock
  signal(full)   ← Tell consumer item available

Consumer:
  wait(full)     ← Wait if buffer empty
  wait(mutex)    ← Lock
  remove item
  signal(mutex)  ← Unlock
  signal(empty)  ← Tell producer space available
```

**Readers-Writers Problem:**
- Multiple readers can read simultaneously
- Writers need exclusive access
- Solution: Keep count of readers, writers wait when readers active

**Dining Philosophers Problem:**
- 5 philosophers, 5 forks, each needs 2 forks to eat
- Classic deadlock demonstration
- Solution: Allow at most 4 philosophers to pick up forks simultaneously, OR pick up both forks atomically

---

#### 4. Monitors

High-level synchronization construct — like a class where only one method can execute at a time.

- **Condition variables** — `wait()` and `signal()` inside monitor
- Compiler enforces mutual exclusion
- Cleaner than semaphores

---

## 7. CPU SCHEDULING

### Scheduling Queues:
- **Job Queue** — All processes in system
- **Ready Queue** — Processes in RAM, ready to run
- **Device Queue** — Processes waiting for I/O

### Scheduling Criteria:

| Metric | Goal |
|--------|------|
| **CPU Utilization** | Keep CPU busy (maximize) |
| **Throughput** | Processes completed per unit time (maximize) |
| **Turnaround Time** | Submission to completion time (minimize) |
| **Waiting Time** | Time spent in ready queue (minimize) |
| **Response Time** | First response time (minimize, for interactive) |

Key formulas:
```
Turnaround Time = Completion Time - Arrival Time
Waiting Time = Turnaround Time - Burst Time
Response Time = First CPU Time - Arrival Time
```

---

### Scheduling Algorithms:

#### 1. FCFS — First Come First Served
- Non-preemptive, simplest
- Process that arrives first gets CPU first
- ❌ **Convoy Effect** — short processes stuck behind long ones

**Example:**
```
Process: P1(24ms), P2(3ms), P3(3ms) arrive at 0
Order: P1→P2→P3
Avg Waiting: (0+24+27)/3 = 17ms ← Bad!

If order: P2→P3→P1
Avg Waiting: (0+3+6)/3 = 3ms ← Much better!
```

---

#### 2. SJF — Shortest Job First
- Pick process with **shortest burst time** next
- **Optimal** — gives minimum average waiting time
- ❌ Starvation of long processes
- ❌ Can't know burst time in advance (predict using exponential averaging)

**Preemptive SJF = SRTF (Shortest Remaining Time First)**
- If new process arrives with shorter burst than remaining time of current → preempt

---

#### 3. Round Robin (RR) ⭐ (Most common for time-sharing)
- Each process gets a **time quantum (q)** of CPU
- After quantum, preempt and move to end of queue
- Fair, great for interactive systems
- Performance depends heavily on **quantum size**:
  - Too large → degenerates to FCFS
  - Too small → too many context switches (overhead)
  - Rule of thumb: 80% of bursts should be < quantum

---

#### 4. Priority Scheduling
- Each process has a priority number
- CPU given to highest priority process
- ❌ **Starvation** — low priority processes may never run
- ✅ Solution: **Aging** — gradually increase priority of waiting processes

---

#### 5. Multilevel Queue Scheduling
- Ready queue divided into multiple queues (e.g., foreground, background)
- Each queue has its own algorithm
- Fixed priority between queues

#### 6. Multilevel Feedback Queue
- Processes can **move between queues** based on behavior
- CPU-bound processes drop to lower priority queues
- I/O-bound processes stay in high priority
- Most flexible and complex — used in real OSes

---

### Preemptive vs Non-Preemptive:

| Type | Meaning | Examples |
|------|---------|---------|
| **Non-preemptive** | Process runs until it voluntarily yields | FCFS, SJF |
| **Preemptive** | OS can forcibly take CPU away | RR, SRTF, Priority |

---

## 8. MEMORY MANAGEMENT

### Why Memory Management?

Multiple processes need memory simultaneously. OS must:
- Allocate/deallocate memory
- Keep processes isolated from each other
- Allow processes larger than physical RAM

---

### Contiguous Allocation:

Each process occupies one contiguous block of memory.

**Problems:**
- **External Fragmentation** — Free memory is scattered in small holes
- **Internal Fragmentation** — Allocated block is larger than needed, wasted space inside

**Compaction** — Move processes to make one big free block (expensive)

---

### PAGING ⭐⭐

Divide memory into **fixed-size** chunks. Eliminate external fragmentation.

```
Physical Memory → divided into FRAMES (fixed size, e.g., 4KB)
Process Memory → divided into PAGES (same fixed size as frames)
```

Any page can go into any frame — no need to be contiguous!

#### Page Table:
Maps page numbers to frame numbers.

```
Virtual Address = [Page Number | Page Offset]
Physical Address = [Frame Number | Page Offset]

Frame Number = PageTable[Page Number]
Physical Address = Frame Number × Page Size + Offset
```

#### Address Translation:

```
Virtual Address: 
┌──────────────┬──────────────┐
│  Page Number │   Offset     │
└──────────────┴──────────────┘
        │
        ▼ (index into page table)
   Page Table
   [0] → Frame 3
   [1] → Frame 7   ← Page Number = 1 → Frame 7
   [2] → Frame 1
        │
        ▼
Physical Address:
┌──────────────┬──────────────┐
│ Frame Number │   Offset     │  ← Same offset, different frame
└──────────────┴──────────────┘
```

#### TLB — Translation Lookaside Buffer ⭐

Page table is in RAM → every memory access needs 2 RAM accesses (bad!).

TLB = **hardware cache for page table entries** (inside CPU).

```
CPU generates virtual address
        │
        ▼
    TLB Lookup
   /           \
HIT             MISS
 │               │
 │          Look up page table in RAM
 │               │
 ▼               ▼
Frame Number → Physical Address
              Update TLB
```

**Effective Access Time with TLB:**
```
EAT = α(TLB_time + Memory_time) + (1-α)(TLB_time + 2×Memory_time)
where α = TLB hit rate
```

#### Multi-Level Page Tables:

For large address spaces (64-bit), page table itself is huge!

Solution: **Two-level (or more) page tables**

```
Virtual Address = [P1 | P2 | Offset]
P1 → Outer page table → Inner page table → P2 → Frame
```

Used in x86: CR3 register points to top-level page directory.

#### Inverted Page Tables:
- One entry per physical frame (not per virtual page)
- Saves memory but slower lookup (need to search for matching PID + page)

---

### SEGMENTATION ⭐

Divide process into **logical units** of **variable size** (segments).

```
Segments of a process:
- Code segment
- Data segment
- Stack segment
- Heap segment
- Library segment
```

Each segment has: **Base address + Limit (size)**

#### Segment Table:
```
Logical Address = [Segment Number | Offset]

Segment Table:
[0] Base=1000, Limit=400  ← Code
[1] Base=2000, Limit=300  ← Data
[2] Base=3000, Limit=100  ← Stack

Physical = Base[Segment_Number] + Offset
(Check: Offset < Limit, else → Segmentation fault!)
```

### Paging vs Segmentation:

| Feature | Paging | Segmentation |
|---------|--------|-------------|
| Size | Fixed | Variable |
| Fragmentation | Internal | External |
| Logical view | No (arbitrary divisions) | Yes (code, data, stack) |
| Protection | Harder | Easy per-segment |
| Used in | x86 (paging), ARM | x86 (legacy), some OSes |

### Segmentation with Paging:
Intel x86 uses BOTH — segments divided into pages. Best protection + no external fragmentation.

---

### VIRTUAL MEMORY ⭐⭐

**Key Idea:** Run processes that are **larger than physical RAM** by keeping only **active parts in RAM**, rest on disk.

#### Demand Paging:
- Pages loaded into RAM **only when needed** (on demand)
- Initially, process has no pages in RAM
- **Page Fault** occurs when CPU accesses a page not in RAM

#### Page Fault Handling:

```
1. CPU accesses virtual address
2. MMU checks page table → Page not present (valid bit = 0)
3. MMU raises PAGE FAULT exception
4. OS Page Fault Handler takes over
5. OS checks if address is valid (else segfault)
6. OS finds a free frame in RAM (or evicts one)
7. OS reads page from disk (swap space) into frame
8. OS updates page table (valid bit = 1, frame number)
9. Restart the faulting instruction
10. CPU re-executes → page now in RAM → success!
```

#### Page Replacement Algorithms:

When RAM is full and a new page is needed, which page to evict?

**1. FIFO (First In First Out)**
- Replace the page that has been in memory the longest
- Simple but can suffer **Belady's Anomaly** (more frames → more faults!)

**2. Optimal (OPT)**
- Replace the page that won't be used for the longest time in future
- ✅ Best possible, minimal page faults
- ❌ Impossible in practice (can't predict future) — used as benchmark

**3. LRU (Least Recently Used) ⭐**
- Replace the page not used for the longest time in the past
- Good approximation of Optimal
- ❌ Hard to implement exactly (needs timestamp per page)
- Approximation: **Clock Algorithm (Second Chance)**

**4. Clock Algorithm (Second Chance)**
- Pages in circular list, each with a reference bit
- When bit=1, give it a second chance (set to 0, move on)
- When bit=0, replace it
- Good LRU approximation, practical

#### Thrashing:

Thrashing = CPU spending more time handling page faults than executing processes.

Happens when:
- Too many processes competing for too little RAM
- Each process constantly needs pages the others are using

```
More processes → Less frames per process
→ More page faults
→ CPU busy doing I/O (disk)
→ CPU utilization drops
→ OS thinks: "need more processes to use CPU"
→ EVEN MORE page faults → 💀 Thrashing
```

**Solutions:**
- **Working Set Model** — Keep in memory only the pages a process actively uses (working set)
- **Page Fault Frequency Control** — If fault rate too high, give process more frames
- **Reduce degree of multiprogramming** — Suspend some processes

---

## 9. I/O MANAGEMENT

### I/O Software Layers:

```
┌──────────────────────────────┐
│     User-level I/O library   │  (printf, scanf)
├──────────────────────────────┤
│  Device-independent OS layer │  (buffering, caching, spooling)
├──────────────────────────────┤
│      Device Drivers          │  (device-specific code)
├──────────────────────────────┤
│    Interrupt Handlers        │
├──────────────────────────────┤
│         Hardware             │
└──────────────────────────────┘
```

### Device Drivers:
- Software that knows HOW to talk to a specific device
- Written by hardware manufacturers
- Runs in kernel mode
- Translates generic OS requests to device-specific commands

### Buffering:
- Temporary storage of I/O data in memory
- **Single buffer** — OS buffer between device and user
- **Double buffer** — Two buffers; one fills while other is processed
- **Circular buffer** — Ring of buffers for streaming data

### Spooling (Simultaneous Peripheral Operations On-Line):
- Buffer output for slow devices (e.g., printer)
- Multiple jobs spooled to disk, printer processes one at a time
- Example: Print queue

---

## 10. DISK MANAGEMENT

### Disk Scheduling Algorithms:

Goal: Minimize **seek time** (moving read/write head).

Assume disk arm starts at track 50, requests: 98, 183, 37, 122, 14, 124, 65, 67

**1. FCFS** — Service in order of arrival
```
50→98→183→37→122→14→124→65→67
Total movement = huge
```

**2. SSTF (Shortest Seek Time First)**
- Always go to closest request
- ❌ Starvation of far requests

**3. SCAN (Elevator Algorithm) ⭐**
- Arm moves in one direction, services all requests, then reverses
- Like an elevator — goes up servicing floors, then comes back down
- Fair, no starvation

**4. C-SCAN (Circular SCAN)**
- Only services requests in ONE direction
- After reaching end, jumps back to beginning (no servicing on return)
- More uniform wait time than SCAN

**5. LOOK / C-LOOK**
- Like SCAN/C-SCAN but only goes as far as the last request in each direction (doesn't go to disk edge)
- More efficient than SCAN

---

## 11. USER MANAGEMENT

### User & Group Concepts (Linux):

- Every user has a **UID (User ID)** and **GID (Group ID)**
- **root** = superuser (UID 0) — unlimited privileges
- `/etc/passwd` — User account info
- `/etc/shadow` — Encrypted passwords
- `/etc/group` — Group definitions

### File Permissions (Linux) ⭐:

```
-rwxr-xr--  1  owner  group  size  date  filename
│└┬┘└┬┘└┬┘
│ │  │  └── Others: r-- (read only)
│ │  └───── Group: r-x (read + execute)
│ └──────── Owner: rwx (full)
└────────── File type: - = file, d = directory, l = link
```

**Permission bits:**
- `r` = 4 (read)
- `w` = 2 (write)
- `x` = 1 (execute)

`chmod 755 file` → Owner: 7(rwx), Group: 5(r-x), Others: 5(r-x)

### Windows User Management:
- **SAM (Security Account Manager)** — stores user accounts
- **Active Directory** — centralized user management for domains
- **ACL (Access Control List)** — per-resource permission list
- User groups: Administrators, Standard Users, Guests

---

## 12. FILE SYSTEMS

### File Attributes:
Name, Type, Size, Permissions, Timestamps (Created/Modified/Accessed), Owner, Location on disk

### File Operations:
`create, open, read, write, seek, delete, truncate, close`

### Directory Structure:
- **Single-level** — All files in one directory (simple, conflicts)
- **Two-level** — One directory per user
- **Tree-structured** — Hierarchical (what we use today)
- **Acyclic Graph** — Allow shared files/directories (symlinks)

### File Allocation Methods:

**1. Contiguous Allocation**
- File occupies consecutive disk blocks
- ✅ Fast sequential + random access
- ❌ External fragmentation, file growth problem

**2. Linked Allocation**
- Each block has pointer to next block
- ✅ No fragmentation, easy growth
- ❌ Random access slow, pointer overhead
- **FAT (File Allocation Table)** — Linked allocation with all pointers in a table at disk start

**3. Indexed Allocation ⭐**
- Each file has an **index block** containing pointers to all data blocks
- ✅ Fast random access, no external fragmentation
- ❌ Index block overhead
- **Unix inode** — Indexed allocation

### Unix inode Structure ⭐:

```
inode:
├── File metadata (size, permissions, timestamps, owner)
├── 12 Direct block pointers → point directly to data blocks
├── 1 Single Indirect pointer → points to block of pointers → data blocks
├── 1 Double Indirect pointer → pointer → pointers → data blocks
└── 1 Triple Indirect pointer → 3 levels of indirection
```

### Free Space Management:
- **Bit Vector (Bitmap)** — 1 bit per block (1=free, 0=used)
- **Free List** — Linked list of free blocks
- **Grouping** — Store addresses of n free blocks in first free block
- **Counting** — Store (first free block, count of consecutive free blocks)

---

### Linux File System (ext4):

- Uses **inodes** for file metadata
- **Journal** — Logs changes before applying (crash recovery)
- **Superblock** — Stores FS metadata (size, block size, inode count)
- **Block Groups** — Divide disk into groups, each with own inode table

**Key directories:**
```
/         Root
/bin      Essential binaries (ls, cp, mv)
/etc      Configuration files
/home     User home directories
/var      Variable data (logs)
/proc     Virtual FS — process info
/dev      Device files
/tmp      Temporary files
```

---

### Windows File System (NTFS):

- **MFT (Master File Table)** — Database of all files, each file has MFT entry
- **Journaling** — Like ext4, logs changes for recovery
- **ACL support** — Per-file, per-user permissions
- **ADS (Alternate Data Streams)** — Multiple data streams per file
- **Volume Shadow Copy** — Snapshot of disk state

---

## 13. CONTEMPORARY OS — WINDOWS vs LINUX

### Kernel Architecture:

| Feature | Linux | Windows |
|---------|-------|---------|
| Kernel type | **Monolithic** (+ modules) | **Hybrid** (Monolithic + microkernel elements) |
| Source | Open source | Closed source |
| Scheduler | CFS (Completely Fair Scheduler) | Priority-based preemptive |
| File system | ext4, XFS, Btrfs | NTFS, ReFS |
| Security | DAC + SELinux/AppArmor | DAC + ACL + UAC |
| Package mgmt | apt, yum, pacman | Windows Update, winget |

### Linux Kernel:
- **Monolithic** — All OS services in kernel space (fast, but one bug = crash)
- **Loadable Kernel Modules (LKMs)** — Drivers loaded at runtime
- **CFS (Completely Fair Scheduler)** — Uses red-black tree, tracks virtual runtime, gives CPU to process with lowest vruntime

### Windows Kernel:
- **NT Kernel** — Hybrid architecture
- **HAL (Hardware Abstraction Layer)** — Hides hardware differences
- **Executive** — Above HAL, manages I/O, memory, processes
- **Registry** — Centralized configuration database

---

## QUICK REVISION CHEAT SHEET 🎯

### Deadlock Conditions (remember: **M**y **H**ouse, **N**o **C**ars):
**M**utual Exclusion, **H**old & Wait, **N**o Preemption, **C**ircular Wait

### Scheduling Formula:
```
Turnaround = Completion - Arrival
Waiting = Turnaround - Burst
```

### Page Fault Handling: 7 Steps
Fault → Check valid → Find frame → Read disk → Update table → Restart instruction → Execute

### Semaphore P/V:
- **P (wait)** = decrement, block if < 0
- **V (signal)** = increment, wake one if ≤ 0

### Memory Techniques:
- **Paging** = fixed size, no external fragmentation
- **Segmentation** = variable size, logical units, external fragmentation
- **Virtual Memory** = demand paging + page replacement

### File Allocation:
- **Contiguous** = fast, fragmentation
- **Linked** = flexible, slow random
- **Indexed (inode)** = best of both, Unix uses this

---

That's the COMPLETE Operating Systems section! 🔥 Ready for the next subject whenever you are bro. Want me to do **practice questions** on this? 💪