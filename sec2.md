# Computer Organization & Architecture — Complete Master Guide 🔥

Let's go through **everything** systematically. This is gonna be long but thorough.

---

## 1. MACHINE INSTRUCTIONS & ADDRESSING MODES

### What is a Machine Instruction?

A machine instruction is a **binary command** that the CPU can directly execute. Every instruction tells the CPU:
- **What to do** (operation)
- **Where to find the data** (operands)
- **Where to put the result**

### Instruction Format

```
| OPCODE | OPERAND 1 | OPERAND 2 | RESULT |
```

- **Opcode** → What operation (ADD, SUB, MOV, etc.)
- **Operands** → Data or addresses to work with

### Types of Instructions

| Type | Example | Meaning |
|------|---------|---------|
| Data Transfer | MOV A, B | Copy B into A |
| Arithmetic | ADD A, B | A = A + B |
| Logical | AND A, B | A = A AND B |
| Branch/Jump | JMP 1000 | Go to address 1000 |
| I/O | IN port, A | Read from port into A |
| Control | HLT | Stop execution |

---

### ADDRESSING MODES (Most Important for Exams!)

Addressing mode = **how the CPU finds the operand (data)**

#### 1. Immediate Addressing
- The **data is IN the instruction itself**
- `MOV A, #5` → Load the value 5 directly into A
- ✅ Fast | ❌ Data is fixed/limited

#### 2. Direct (Absolute) Addressing
- Instruction contains the **actual memory address** of data
- `MOV A, 2000` → Go to address 2000, get the value, put in A
- ✅ Simple | ❌ Fixed address, limited range

#### 3. Indirect Addressing
- Instruction has an address → that address **holds ANOTHER address** → that 2nd address has the data
- Like a pointer to a pointer
- `MOV A, (2000)` → Go to 2000, read what's there (say 3000), go to 3000, get data
- ✅ Flexible | ❌ Slow (double memory access)

#### 4. Register Addressing
- Operand is in a **CPU register**
- `MOV A, R1` → Copy value from register R1 into A
- ✅ Fastest (no memory access) | ❌ Limited registers

#### 5. Register Indirect Addressing
- Register holds the **address** of the data in memory
- `MOV A, (R1)` → Go to address stored in R1, get data
- ✅ Flexible | ❌ One memory access

#### 6. Displacement / Based Addressing
- **Effective Address = Base Register + Offset (displacement)**
- `MOV A, 100(R1)` → EA = R1 + 100
- Used in arrays and stack frames

#### 7. Indexed Addressing
- **Effective Address = Index Register + Constant**
- Great for **array traversal** — just increment the index register
- `MOV A, 500(IX)` → EA = 500 + IX

#### 8. Base + Index Addressing
- **EA = Base Register + Index Register + Offset**
- Most powerful — used in 2D arrays

#### 9. Relative Addressing
- **EA = Program Counter (PC) + Offset**
- Used in **branch instructions** — jump relative to current position
- Makes code **position-independent**

#### 10. Stack Addressing (Implicit)
- No address needed — data is always at top of stack
- `PUSH`, `POP` instructions
- EA is implicitly the Stack Pointer (SP)

### Quick Memory Trick 🧠
> **"I Did It, Registers Rarely Disappoint Intelligent Beings Relentlessly Studying"**
> Immediate, Direct, Indirect, Register, Register-Indirect, Displacement, Indexed, Based, Relative, Stack

---

## 2. ALU, DATA-PATH AND CONTROL UNIT

### The Big Picture — CPU Internal Structure

```
┌─────────────────────────────────────────┐
│                  CPU                    │
│                                         │
│  ┌──────────┐      ┌──────────────────┐ │
│  │ Control  │─────▶│    Data Path     │ │
│  │  Unit    │      │  ┌────────────┐  │ │
│  │  (CU)   │      │  │    ALU     │  │ │
│  └──────────┘      │  └────────────┘  │ │
│                    │  ┌────────────┐  │ │
│                    │  │ Registers  │  │ │
│                    │  └────────────┘  │ │
│                    └──────────────────┘ │
└─────────────────────────────────────────┘
```

---

### ALU — Arithmetic Logic Unit

The ALU is the **calculator of the CPU** — it does ALL computation.

#### What ALU Does:
| Category | Operations |
|----------|-----------|
| Arithmetic | ADD, SUB, MUL, DIV, INCREMENT, DECREMENT |
| Logical | AND, OR, NOT, XOR, NAND, NOR |
| Shift | Left shift, Right shift, Rotate |
| Comparison | Equal, Greater than, Less than (sets flags) |

#### ALU Inputs/Outputs:
- **Inputs:** Two operands (A and B) + Control signal (which operation)
- **Outputs:** Result + **Status Flags**

#### Status/Condition Flags (VERY IMPORTANT):
| Flag | Name | Set when... |
|------|------|-------------|
| Z | Zero | Result = 0 |
| N/S | Negative/Sign | Result is negative |
| C | Carry | Unsigned overflow |
| V/OV | Overflow | Signed overflow |
| P | Parity | Even number of 1-bits |

These flags are stored in the **Flag Register / Status Register (PSW - Program Status Word)**

---

### DATA PATH

The datapath is the **collection of components that process and move data** inside the CPU.

#### Key Components of Data Path:

**1. Registers** — Small, ultra-fast storage inside CPU

| Register | Full Name | Purpose |
|----------|-----------|---------|
| PC | Program Counter | Address of NEXT instruction |
| IR | Instruction Register | Current instruction being executed |
| MAR | Memory Address Register | Address to read/write in memory |
| MDR/MBR | Memory Data/Buffer Register | Data read from / to be written to memory |
| ACC | Accumulator | Stores ALU results |
| SP | Stack Pointer | Top of the stack |
| PSW | Program Status Word | Flags + CPU status |
| GPR | General Purpose Registers | R0-R15, flexible use |

**2. Buses inside CPU:**
- **Internal Data Bus** — transfers data between registers and ALU
- **Address Bus** — carries memory addresses (unidirectional)
- **Control Bus** — carries control signals

#### Data Path Operation (Single Bus Architecture):

```
Step 1: MAR ← PC              (Load address from PC)
Step 2: MDR ← Memory[MAR]     (Fetch instruction from memory)
Step 3: IR ← MDR              (Load into Instruction Register)
Step 4: PC ← PC + 1           (Point to next instruction)
Step 5: Decode IR             (CU decodes the instruction)
Step 6: Execute               (ALU operates, results stored)
```

---

### CONTROL UNIT (CU)

The Control Unit is the **brain of the CPU** — it tells every component what to do and when.

#### What CU does:
1. **Fetches** instructions from memory
2. **Decodes** the instruction (what operation, what operands)
3. **Generates control signals** to direct the datapath
4. **Sequences** operations in correct order

#### Two Types of Control Units:

**1. Hardwired Control Unit**
- Logic implemented using actual digital circuits (gates, flip-flops)
- ✅ Very fast
- ❌ Difficult to modify/upgrade
- Used in RISC processors

**2. Microprogrammed Control Unit**
- Control signals stored as **microinstructions** in a special memory (Control Store)
- Each machine instruction → sequence of microinstructions
- ✅ Easy to modify, flexible
- ❌ Slower than hardwired
- Used in CISC processors (like x86)

#### Instruction Cycle (Fetch-Decode-Execute):

```
FETCH → DECODE → EVALUATE ADDRESS → FETCH OPERANDS → EXECUTE → STORE RESULT
  ↑                                                                    │
  └────────────────────────────────────────────────────────────────────┘
```

---

## 3. INSTRUCTION PIPELINING & PIPELINE HAZARDS

### What is Pipelining?

Pipelining = doing **multiple instructions simultaneously** by overlapping their stages.

Like an **assembly line** in a factory — while one car is being painted, the next is being assembled, and another is being welded.

#### Classic 5-Stage Pipeline (RISC):

```
Stage 1: IF  — Instruction Fetch
Stage 2: ID  — Instruction Decode / Register Read
Stage 3: EX  — Execute (ALU operation)
Stage 4: MEM — Memory Access
Stage 5: WB  — Write Back (store result to register)
```

#### Pipeline Timing Diagram:

```
Time →    1    2    3    4    5    6    7    8    9
Inst 1:  IF   ID   EX  MEM   WB
Inst 2:       IF   ID   EX  MEM   WB
Inst 3:            IF   ID   EX  MEM   WB
Inst 4:                 IF   ID   EX  MEM   WB
Inst 5:                      IF   ID   EX  MEM   WB
```

Without pipeline: 5 instructions × 5 stages = 25 cycles
With pipeline: 5 + 4 = 9 cycles ← **HUGE speedup**

#### Throughput & Speedup:
- **Speedup** = Number of stages (ideally) = k
- **Throughput** = 1 instruction per clock cycle (at steady state)
- **Cycle time** = max stage delay + latch overhead

---

### PIPELINE HAZARDS

Hazards are situations that **prevent the next instruction from executing** in its designated clock cycle.

---

#### TYPE 1: STRUCTURAL HAZARDS

**Cause:** Two instructions need the **same hardware resource** at the same time.

**Example:** Only one memory unit — one instruction does MEM access while another needs IF (both need memory).

**Solutions:**
- **Stall/Bubble** — Insert NOP (no-operation) cycles, wait
- **Separate I-cache and D-cache** — Separate instruction memory and data memory (most common fix)
- **Resource duplication** — Add more of the conflicting hardware

---

#### TYPE 2: DATA HAZARDS

**Cause:** An instruction depends on the result of a **previous instruction** not yet completed.

**Three types:**

| Hazard | Full Name | Example |
|--------|-----------|---------|
| RAW | Read After Write | I2 reads a value that I1 hasn't written yet |
| WAR | Write After Read | I2 writes before I1 reads (rare in simple pipelines) |
| WAW | Write After Write | I2 writes before I1 writes — wrong final value |

**RAW is the most common and critical!**

```
ADD R1, R2, R3    ← R1 = R2 + R3 (writes R1 in WB stage)
SUB R4, R1, R5    ← Needs R1 in ID stage — but R1 isn't written yet! ❌
```

**Solutions for Data Hazards:**

1. **Stalling (Pipeline Bubble)**
   - Insert NOPs until the data is ready
   - ❌ Wastes cycles

2. **Data Forwarding / Bypassing** ⭐ (Most Important!)
   - Pass the result **directly** from the output of EX or MEM stage to the input of the next instruction's EX stage — **without waiting for WB**
   - Hardware adds extra paths (forwarding paths/multiplexers)
   - ✅ Eliminates most RAW hazards without stalling

3. **Out-of-Order Execution**
   - Execute independent instructions while waiting for a dependency to resolve

4. **Compiler Scheduling / Instruction Reordering**
   - Compiler reorders instructions to put independent ones between dependent ones

---

#### TYPE 3: CONTROL HAZARDS (Branch Hazards)

**Cause:** A **branch instruction** — CPU doesn't know which instruction to fetch next until the branch decision is made.

```
        BEQZ R1, LABEL    ← Branch if R1 = 0
        ADD ...            ← Should we execute this? Don't know yet!
        ...
LABEL:  MUL ...
```

**Solutions:**

1. **Stalling** — Wait until branch is resolved ❌ (Slow)

2. **Branch Prediction** ⭐
   - **Static Prediction:** Always predict taken / not taken
   - **Dynamic Prediction:** Use history to predict
     - **1-bit predictor:** Remember last outcome
     - **2-bit predictor (saturating counter):** Change prediction only after 2 consecutive mispredictions — more accurate
   - On misprediction → **flush pipeline** (discard wrongly fetched instructions)

3. **Delayed Branching**
   - Execute the instruction(s) AFTER the branch regardless (branch delay slot)
   - Compiler fills delay slot with useful instruction
   - Used in MIPS

4. **Branch Target Buffer (BTB)**
   - Cache that stores predicted target addresses of branches
   - Allows fetching from predicted target immediately

---

## 4. MEMORY HIERARCHY

### Why Memory Hierarchy?

**The Problem:** Fast memory (SRAM) is expensive. Large memory (HDD) is cheap but slow. We need BOTH fast AND large.

**Solution:** Use a hierarchy — keep **frequently used data close to CPU** (small, fast) and rarely used data far (large, slow).

```
         Speed: Fastest → Slowest
         Cost:  Highest → Lowest
         Size:  Smallest → Largest

    ┌─────────────────┐
    │    Registers    │  ← Inside CPU, < 1ns, ~1KB
    ├─────────────────┤
    │   Cache (L1)    │  ← Inside CPU, ~1ns, 32-64KB
    ├─────────────────┤
    │   Cache (L2)    │  ← Near CPU, ~5ns, 256KB-1MB
    ├─────────────────┤
    │   Cache (L3)    │  ← Shared, ~15ns, 4-32MB
    ├─────────────────┤
    │   Main Memory   │  ← RAM, ~60-100ns, 4-64GB
    │     (DRAM)      │
    ├─────────────────┤
    │  Secondary      │  ← SSD/HDD, ~0.1-10ms, TBs
    │  Storage        │
    ├─────────────────┤
    │    Tertiary     │  ← Tape, Cloud, very slow
    └─────────────────┘
```

---

### CACHE MEMORY (Super Important!)

Cache sits between CPU and RAM. It stores **copies of frequently used data**.

#### Principle of Locality:
- **Temporal Locality** — If you used data recently, you'll likely use it again soon (loops!)
- **Spatial Locality** — If you used address X, you'll likely use X+1, X+2 soon (arrays!)

Cache exploits BOTH of these.

#### Cache Hit vs Miss:
- **Hit** — Data found in cache ✅ → Fast access
- **Miss** — Data NOT in cache ❌ → Must fetch from RAM (slow)
- **Hit Rate (h)** = Hits / Total accesses
- **Miss Rate** = 1 - Hit Rate
- **Effective Access Time** = h × Cache_time + (1-h) × RAM_time

#### Cache Mapping Techniques:

**1. Direct Mapped Cache**
- Each RAM block maps to **exactly one** cache line
- Formula: Cache line = (Block number) mod (Number of cache lines)
- ✅ Simple, fast lookup
- ❌ **Conflict misses** — two needed blocks fight for same cache line

**2. Fully Associative Cache**
- A RAM block can go into **ANY** cache line
- ✅ No conflict misses, best hit rate
- ❌ Expensive — needs comparators for every cache line to search

**3. Set Associative Cache** ⭐ (Best of both worlds)
- Cache divided into **sets**, each set has N lines (N-way)
- A block maps to a specific **set** (like direct mapped) but within that set can go into **any line** (like fully associative)
- Common: 2-way, 4-way, 8-way set associative

```
Address bits breakdown (Set Associative):
| TAG | SET INDEX | BLOCK OFFSET |
```

#### Cache Replacement Policies (when cache is full):
| Policy | How it works |
|--------|-------------|
| **LRU** (Least Recently Used) | Replace the line not used for the longest time ⭐ Best |
| **FIFO** | Replace the oldest loaded line |
| **LFU** | Replace least frequently used |
| **Random** | Replace a random line |

#### Cache Write Policies:
- **Write Through** — Write to cache AND RAM simultaneously
  - ✅ RAM always up to date
  - ❌ Slow (every write hits RAM)

- **Write Back** — Write only to cache; write to RAM only when that cache line is replaced (dirty bit tracks this)
  - ✅ Fast
  - ❌ RAM can be stale (coherence issues)

#### Types of Cache Misses (3 Cs):
- **Compulsory (Cold) Miss** — First ever access to a block — unavoidable
- **Capacity Miss** — Cache too small to hold all needed data
- **Conflict Miss** — Two blocks compete for same cache line (in direct/set-assoc)

---

### MAIN MEMORY (RAM)

**DRAM (Dynamic RAM)** — Used for main memory
- Stores bits as charge in capacitors
- Needs **periodic refresh** (capacitors leak)
- Cheap, high density, slower

**SRAM (Static RAM)** — Used for cache
- Uses flip-flops to store bits
- No refresh needed
- Fast but expensive, low density

#### Memory Interleaving:
- Divide memory into banks that can be accessed **simultaneously**
- Increases effective bandwidth
- **Low-order interleaving** — consecutive addresses go to different banks (great for sequential access)
- **High-order interleaving** — consecutive addresses stay in same bank

---

### SECONDARY STORAGE

#### Hard Disk Drive (HDD):
- **Platters** coated with magnetic material, spin at 5400-15000 RPM
- **Read/Write heads** float above the surface
- **Track** — Circular ring on platter
- **Sector** — Arc segment of a track (typically 512B or 4KB)
- **Cylinder** — Same track on all platters

**Access Time = Seek Time + Rotational Latency + Transfer Time**
- **Seek Time** — Moving head to correct track (~5-15ms)
- **Rotational Latency** — Waiting for sector to rotate under head (avg = half rotation)
- **Transfer Time** — Actually reading/writing the data

#### SSD (Solid State Drive):
- Uses NAND Flash memory, no moving parts
- Much faster than HDD, more reliable
- ❌ Limited write cycles, expensive per GB

---

## 5. I/O INTERFACE — INTERRUPT & DMA MODE

### How CPU talks to I/O Devices?

Three methods:

---

### METHOD 1: PROGRAMMED I/O (Polling)

- CPU **continuously checks** (polls) the I/O device status register
- "Are you done yet? Are you done yet? Are you done yet?"
- ❌ CPU is completely BUSY-WAITING — huge waste of time
- Only good for simple/fast devices

---

### METHOD 2: INTERRUPT-DRIVEN I/O ⭐

CPU starts I/O operation, then **goes back to doing useful work**. Device **interrupts** the CPU when done.

#### How Interrupts Work:

```
1. CPU sends command to I/O device
2. CPU continues executing other instructions
3. I/O device completes operation
4. Device sends INTERRUPT signal to CPU
5. CPU finishes current instruction
6. CPU saves its state (PC, registers) → pushed to stack
7. CPU jumps to ISR (Interrupt Service Routine)
8. ISR handles the I/O (reads data, processes)
9. ISR executes IRET (Interrupt Return)
10. CPU restores saved state and continues original program
```

#### Interrupt Types:
| Type | Cause |
|------|-------|
| **Hardware Interrupt** | External device (keyboard, timer) |
| **Software Interrupt** | Program executes INT instruction (system calls) |
| **Maskable** | Can be disabled by CPU (via Interrupt Flag) |
| **Non-Maskable (NMI)** | Cannot be disabled — critical errors (power failure) |
| **Vectored** | Device provides interrupt vector → direct jump to ISR |
| **Polled** | CPU checks which device interrupted |

#### Interrupt Vector Table (IVT):
- Table in memory storing addresses of all ISRs
- Each interrupt type has an entry (vector number → ISR address)

#### Priority Interrupts:
- Multiple devices can interrupt simultaneously
- **Daisy Chaining** — Devices connected in series; nearest CPU has highest priority
- **Priority Interrupt Controller (PIC)** — Hardware chip manages priorities

---

### METHOD 3: DMA — Direct Memory Access ⭐⭐

For **large data transfers** (disk, network), even interrupt-driven I/O is slow — CPU has to move every byte.

DMA lets the device **transfer data directly to/from RAM without CPU involvement**.

#### DMA Controller (DMAC):
Dedicated hardware chip with:
- **DMAC Address Register** — Where to write in RAM
- **DMAC Count Register** — How many bytes to transfer
- **DMAC Control Register** — Read/Write, direction

#### DMA Operation Steps:

```
1. CPU programs the DMA controller:
   - Source address (I/O device)
   - Destination address (RAM)
   - Number of bytes to transfer
   - Direction (read/write)

2. CPU gives GO signal to DMA, then continues other work

3. DMA controller takes over the bus (CYCLE STEALING or BURST MODE)

4. DMA transfers data directly: Device ↔ RAM

5. When done, DMA sends INTERRUPT to CPU

6. CPU handles completion (checks for errors etc.)
```

#### DMA Transfer Modes:
| Mode | Description |
|------|-------------|
| **Burst Mode** | DMA grabs bus, transfers ALL data, releases bus — CPU blocked during transfer |
| **Cycle Stealing** | DMA steals one bus cycle at a time — interleaved with CPU access, transparent |
| **Transparent Mode** | DMA transfers only when CPU doesn't need bus — slowest, no impact on CPU |

#### DMA vs Interrupt:
| Feature | Interrupt I/O | DMA |
|---------|--------------|-----|
| Who moves data | CPU | DMA controller |
| Best for | Small, infrequent data | Large bulk transfers |
| CPU overhead | Moderate | Very low |
| Hardware cost | Low | Higher (DMAC chip) |

---

## 6. CPU ARCHITECTURE & HOW MICROPROCESSORS EXECUTE INSTRUCTIONS

### RISC vs CISC Architecture

| Feature | RISC | CISC |
|---------|------|------|
| Full Name | Reduced Instruction Set Computer | Complex Instruction Set Computer |
| Instructions | Simple, fixed-length | Complex, variable-length |
| # of Instructions | Few (~50-200) | Many (~500-1000+) |
| Cycles per instruction | 1 (usually) | Multiple |
| Memory access | Only LOAD/STORE | Many instructions can access memory |
| Registers | Many GPRs | Fewer |
| Pipelining | Easy | Harder |
| Control Unit | Hardwired | Microprogrammed |
| Examples | ARM, MIPS, RISC-V | x86, x86-64 (Intel/AMD) |

---

### HOW A MICROPROCESSOR EXECUTES AN INSTRUCTION

Let's trace through the complete life of one instruction: `ADD R1, R2, R3` (R1 = R2 + R3)

#### STAGE 1: FETCH
```
1. MAR ← PC              (Copy program counter to MAR)
2. Memory Read signal activated
3. MDR ← Memory[MAR]     (Instruction loaded into MDR)
4. IR ← MDR              (Copy to Instruction Register)
5. PC ← PC + 4           (Increment PC to next instruction)
```

#### STAGE 2: DECODE
```
- Control Unit reads IR
- Identifies OPCODE = ADD
- Identifies source registers: R2, R3
- Identifies destination: R1
- Generates appropriate control signals
```

#### STAGE 3: OPERAND FETCH
```
- Read R2 from register file → Bus A
- Read R3 from register file → Bus B
```

#### STAGE 4: EXECUTE
```
- ALU receives R2 and R3
- ALU performs ADD
- Result stored in temp register
- Flags updated (Zero, Carry, Overflow, etc.)
```

#### STAGE 5: WRITE BACK
```
- Result written to R1 in register file
```

Done! Repeat for next instruction.

---

### CPU-MEMORY INTERACTION

```
CPU ←─────────────────────────────→ Memory
     Address Bus (unidirectional →)
     Data Bus (bidirectional ↔)
     Control Bus (R/W, clock, etc.)
```

**Memory Read:**
1. CPU puts address on Address Bus
2. CPU asserts READ signal on Control Bus
3. Memory puts data on Data Bus
4. CPU reads data

**Memory Write:**
1. CPU puts address on Address Bus
2. CPU puts data on Data Bus
3. CPU asserts WRITE signal
4. Memory stores data

---

### PERFORMANCE METRICS

| Metric | Formula |
|--------|---------|
| **Clock Speed** | Frequency in Hz (e.g., 3 GHz = 3×10⁹ cycles/sec) |
| **CPI** | Clock cycles Per Instruction |
| **MIPS** | Million Instructions Per Second = Clock_speed / (CPI × 10⁶) |
| **CPU Time** | Instructions × CPI × Clock_period |
| **Speedup** | Old_time / New_time |
| **Amdahl's Law** | Speedup = 1 / [(1-f) + f/k] where f=fraction improved, k=speedup of that part |

---

### KEY EXAM FORMULAS 📝

```
Effective Access Time (with cache):
EAT = h × Tc + (1-h) × Tm
where h = hit rate, Tc = cache time, Tm = main memory time

HDD Access Time:
T = Seek Time + Rotational Latency + Transfer Time
Rotational Latency (avg) = (1/2) × (1/RPM) × 60 seconds

Pipeline Speedup:
Speedup = (n × k) / (k + n - 1)
where n = number of instructions, k = number of pipeline stages

For large n: Speedup ≈ k (number of stages)

Cycle Time of pipeline:
T_pipeline = T_max_stage + T_latch_overhead
```

---

### QUICK REVISION — MOST LIKELY EXAM QUESTIONS 🎯

1. **Addressing modes** — Know all 8-10, be able to compute effective address
2. **Pipeline hazards** — Know all 3 types + solutions (especially forwarding for RAW)
3. **Cache mapping** — Direct, Set-assoc, Fully-assoc + how to compute tag/index/offset
4. **Cache replacement** — LRU working example
5. **DMA steps** — All 5 steps in order
6. **Interrupt handling** — Steps when interrupt occurs
7. **EAT formula** — Be able to plug in numbers
8. **RISC vs CISC** — At least 5-6 differences
9. **Fetch-Decode-Execute** — Trace it with register transfers
10. **HDD access time** — Calculate given seek, RPM, data size

---

You're now armed with everything in this section. Want me to move to the next subject? Also happy to do **practice questions** on this section to test you! 💪