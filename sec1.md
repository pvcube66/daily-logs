# SECTION 1: DIGITAL LOGIC — COMPLETE MASTER GUIDE

---

## 1. NUMBER SYSTEMS & REPRESENTATIONS

### The 4 Number Systems You Must Know:

| System | Base | Digits Used | Prefix |
|---|---|---|---|
| **Binary** | 2 | 0, 1 | 0b |
| **Octal** | 8 | 0–7 | 0o |
| **Decimal** | 10 | 0–9 | — |
| **Hexadecimal** | 16 | 0–9, A–F | 0x |

### Hex Letter Values:
| Hex | Decimal |
|---|---|
| A | 10 |
| B | 11 |
| C | 12 |
| D | 13 |
| E | 14 |
| F | 15 |

---

### Conversions (THE MOST TESTED THING):

#### **Decimal → Binary:**
Divide by 2, collect remainders **bottom to top**

Example: 13 → 2=6 R**1**, 6÷2=3 R**0**, 3÷2=1 R**1**, 1÷2=0 R**1** → **1101**

#### **Binary → Decimal:**
Multiply each bit by 2^position (right to left from 0)

Example: 1101 = 1×2³ + 1×2² + 0×2¹ + 1×2⁰ = 8+4+0+1 = **13**

#### **Binary → Octal:**
Group binary digits in sets of **3** from right → convert each group

Example: 110 101 = **65** (octal)

#### **Binary → Hex:**
Group binary digits in sets of **4** from right → convert each group

Example: 1010 1111 = A F = **AF** (hex)

#### **Hex → Binary:**
Each hex digit → 4 binary bits

Example: B3 = 1011 0011

---

### Number Representation in Computers:

#### **Unsigned Integers:**
- Just straight binary
- Range for n bits: **0 to 2ⁿ - 1**
- Example: 8 bits → 0 to 255

#### **Signed Integers — 3 Methods:**

##### 1. Sign-Magnitude
- **MSB (leftmost bit) = sign** (0=positive, 1=negative)
- Remaining bits = magnitude
- Example: +5 = **0**101, -5 = **1**101
- Problem: **Two zeros** (+0 = 0000, -0 = 1000)
- Range: -(2ⁿ⁻¹ - 1) to +(2ⁿ⁻¹ - 1)

##### 2. One's Complement
- Positive: normal binary
- Negative: **flip all bits**
- Example: +5 = 0101, -5 = **1010**
- Problem: Still **two zeros** (0000 and 1111)
- Range: -(2ⁿ⁻¹ - 1) to +(2ⁿ⁻¹ - 1)

##### 3. Two's Complement ✅ (Used in ALL modern computers)
- Positive: normal binary
- Negative: **flip all bits + add 1**
- Example: +5 = 0101, -5 = 1010 + 1 = **1011**
- **Only one zero** ✅
- Range: **-2ⁿ⁻¹ to +2ⁿ⁻¹ - 1** → for 8 bits: -128 to +127
- Easy subtraction: A - B = A + (two's complement of B)

> **Trick to find Two's Complement fast:** From the right, keep bits the same until you see the first 1 (keep it too), then flip everything to the left.
> Example: 0110100 → 1001100

##### Two's Complement Addition/Subtraction:
- Just add normally in binary
- **Ignore carry out of MSB**
- Overflow occurs if: carry INTO MSB ≠ carry OUT of MSB

---

## 2. FIXED POINT & FLOATING POINT

### Fixed Point Representation:
- Binary point is **fixed** at a predetermined position
- Example: 8-bit with 4 integer + 4 fractional bits
- 0101.1100 = 5.75
- Simple but **limited range**

### Floating Point Representation (IEEE 754):
Represents numbers as: **(-1)^S × M × 2^E**
- **S** = Sign bit
- **M** = Mantissa (significand)
- **E** = Exponent

#### IEEE 754 Single Precision (32-bit):
| Field | Bits | Description |
|---|---|---|
| Sign (S) | 1 bit | 0=positive, 1=negative |
| Exponent (E) | 8 bits | Stored with **bias of 127** |
| Mantissa (M) | 23 bits | Fractional part (leading 1 implied) |

**Actual exponent = stored exponent - 127**

#### IEEE 754 Double Precision (64-bit):
| Field | Bits |
|---|---|
| Sign | 1 bit |
| Exponent | 11 bits (bias = 1023) |
| Mantissa | 52 bits |

#### Special Values:
| Exponent | Mantissa | Value |
|---|---|---|
| All 0s | All 0s | Zero |
| All 0s | Non-zero | Denormalized number |
| All 1s | All 0s | ±Infinity |
| All 1s | Non-zero | NaN (Not a Number) |

#### Example — Represent -6.75 in IEEE 754 Single:
1. Sign = **1** (negative)
2. 6.75 in binary = 110.11
3. Normalize: 1.1011 × 2² → Exponent = 2
4. Stored exponent = 2 + 127 = 129 = **10000001**
5. Mantissa = **10110000000000000000000**
6. Final: **1 10000001 10110000000000000000000**

#### Floating Point Arithmetic Issues:
| Issue | Description |
|---|---|
| **Overflow** | Result too large to represent |
| **Underflow** | Result too small (too close to zero) |
| **Rounding error** | Can't represent all real numbers exactly |
| **Truncation** | Extra bits cut off |
| **Cancellation** | Subtracting nearly equal numbers loses precision |

---

## 3. BOOLEAN ALGEBRA

### What is Boolean Algebra?
A mathematical system dealing with **binary variables** (0 and 1) and **logical operations**.

### Basic Operations:
| Operation | Symbol | Description |
|---|---|---|
| **AND** | A · B or AB | Output 1 only if both inputs are 1 |
| **OR** | A + B | Output 1 if at least one input is 1 |
| **NOT** | Ā or A' | Flips the bit |

### Boolean Laws (MUST MEMORIZE ALL):

#### Identity Laws:
- A + 0 = A
- A · 1 = A

#### Null/Dominance Laws:
- A + 1 = 1
- A · 0 = 0

#### Idempotent Laws:
- A + A = A
- A · A = A

#### Complement Laws:
- A + Ā = 1
- A · Ā = 0

#### Double Negation:
- (Ā)' = A

#### Commutative Laws:
- A + B = B + A
- A · B = B · A

#### Associative Laws:
- A + (B + C) = (A + B) + C
- A · (B · C) = (A · B) · C

#### Distributive Laws:
- A · (B + C) = AB + AC
- A + (B · C) = (A + B)(A + C)

#### Absorption Laws:
- A + AB = A
- A · (A + B) = A

#### **De Morgan's Theorems (VERY IMPORTANT):**
- **(A · B)' = Ā + B̄** → NAND = NOT of AND = OR of NOTs
- **(A + B)' = Ā · B̄** → NOR = NOT of OR = AND of NOTs

> **Memory trick:** Break the bar, change the operator
> Long bar breaks → AND becomes OR, OR becomes AND

#### Consensus Theorem:
- AB + ĀC + BC = AB + ĀC (BC is redundant)

---

## 4. LOGIC GATES

### Basic Gates:

| Gate | Symbol | Expression | Truth Table |
|---|---|---|---|
| **AND** | D shape | Y = A·B | 00→0, 01→0, 10→0, 11→1 |
| **OR** | Curved shape | Y = A+B | 00→0, 01→1, 10→1, 11→1 |
| **NOT** | Triangle+bubble | Y = Ā | 0→1, 1→0 |
| **NAND** | AND+bubble | Y = (AB)' | 00→1, 01→1, 10→1, 11→0 |
| **NOR** | OR+bubble | Y = (A+B)' | 00→1, 01→0, 10→0, 11→0 |
| **XOR** | Curved+extra line | Y = A⊕B | 00→0, 01→1, 10→1, 11→0 |
| **XNOR** | XOR+bubble | Y = (A⊕B)' | 00→1, 01→0, 10→0, 11→1 |

### Universal Gates:
- **NAND** and **NOR** are called **Universal Gates** — you can build ANY logic circuit using only NAND or only NOR gates

#### Building basic gates from NAND:
- NOT: A NAND A = Ā
- AND: (A NAND B) NAND (A NAND B) — NAND then NOT
- OR: (Ā NAND B̄) — De Morgan's

#### XOR Properties (Important):
- A ⊕ 0 = A
- A ⊕ 1 = Ā
- A ⊕ A = 0
- A ⊕ Ā = 1
- **Used in:** Parity checkers, adders, encryption

---

## 5. MINIMIZATION — K-MAP (Karnaugh Map)

### Why Minimize?
Simplified Boolean expressions → fewer gates → cheaper, faster circuits

### K-Map Method:

#### **2-Variable K-Map (4 cells):**
```
        B'    B
   A'  | m0 | m1 |
   A   | m2 | m3 |
```

#### **3-Variable K-Map (8 cells):**
```
         BC
    A  | 00 | 01 | 11 | 10 |
    0  | m0 | m1 | m3 | m2 |
    1  | m4 | m5 | m7 | m6 |
```
> Note: columns go in **Gray code order** (00, 01, 11, 10) — only 1 bit changes at a time

#### **4-Variable K-Map (16 cells):**
```
          CD
   AB   | 00 | 01 | 11 | 10 |
   00   | 0  | 1  | 3  | 2  |
   01   | 4  | 5  | 7  | 6  |
   11   | 12 | 13 | 15 | 14 |
   10   | 8  | 9  | 11 | 10 |
```

### K-Map Rules:
1. Fill cells with 1s (for SOP) or 0s (for POS) from the truth table
2. **Group 1s** in rectangles of size **1, 2, 4, 8, 16** (powers of 2 ONLY)
3. Groups must be **as large as possible**
4. Groups **can overlap**
5. Groups **wrap around** edges (top-bottom, left-right — it's a torus!)
6. Each 1 must be covered by at least one group
7. Use **minimum number of groups**

### Reading Groups:
- For each group, identify which variables are **constant** across the group
- Variables that change → **eliminated**
- Variables that stay 0 → appear **complemented**
- Variables that stay 1 → appear **uncomplemented**

### Example — 3-variable K-Map:
```
Minterms: 1, 3, 5, 7
         BC
    A  | 00 | 01 | 11 | 10 |
    0  |  0 |  1 |  1 |  0 |
    1  |  0 |  1 |  1 |  0 |
```
Group all four 1s → B is always 1, C changes, A changes → **Y = B**

### SOP vs POS:

| Form | Stands For | Group | Use |
|---|---|---|---|
| **SOP** (Sum of Products) | Sum of minterms | Group **1s** in K-map | Most common |
| **POS** (Product of Sums) | Product of maxterms | Group **0s** in K-map | Sometimes simpler |

### Don't Care Conditions (X):
- Some input combinations never occur → output can be 0 or 1 (we don't care)
- In K-map: **use X as 1 if it helps make a larger group, ignore otherwise**
- Helps achieve better minimization

### Prime Implicants:
| Term | Meaning |
|---|---|
| **Implicant** | Any valid group of 1s |
| **Prime Implicant (PI)** | Largest possible group (can't be enlarged) |
| **Essential Prime Implicant (EPI)** | PI that is the ONLY one covering a particular 1 — MUST be included |

> **Quine-McCluskey Method** = tabular minimization method (used for more variables than K-map can handle)

---

## 6. COMBINATIONAL CIRCUITS

### What is a Combinational Circuit?
Output depends **only on current inputs** — no memory, no feedback.

```
Inputs → [Combinational Logic] → Outputs
```

---

### ADDERS:

#### Half Adder:
- Adds **two 1-bit numbers**
- **No carry input**
- Outputs: **Sum (S)** and **Carry (C)**

| A | B | Sum | Carry |
|---|---|---|---|
| 0 | 0 | 0 | 0 |
| 0 | 1 | 1 | 0 |
| 1 | 0 | 1 | 0 |
| 1 | 1 | 0 | 1 |

- **S = A ⊕ B**
- **C = A · B**
- Circuit: 1 XOR gate + 1 AND gate

#### Full Adder:
- Adds **two 1-bit numbers + carry in**
- Outputs: **Sum (S)** and **Carry out (Cout)**

| A | B | Cin | Sum | Cout |
|---|---|---|---|---|
| 0 | 0 | 0 | 0 | 0 |
| 0 | 0 | 1 | 1 | 0 |
| 0 | 1 | 0 | 1 | 0 |
| 0 | 1 | 1 | 0 | 1 |
| 1 | 0 | 0 | 1 | 0 |
| 1 | 0 | 1 | 0 | 1 |
| 1 | 1 | 0 | 0 | 1 |
| 1 | 1 | 1 | 1 | 1 |

- **S = A ⊕ B ⊕ Cin**
- **Cout = AB + BCin + ACin**
- Built from: 2 Half Adders + 1 OR gate

#### Ripple Carry Adder:
- Chain of Full Adders to add multi-bit numbers
- Carry **ripples** from LSB to MSB
- Problem: **Slow** — each stage waits for carry from previous

#### Carry Lookahead Adder (CLA):
- Calculates all carries in advance using:
  - **Generate: G = A·B** (generates carry regardless of Cin)
  - **Propagate: P = A⊕B** (propagates incoming carry)
- **Much faster** — carry computed in parallel

---

### SUBTRACTORS:

#### Half Subtractor:
- **Difference D = A ⊕ B**
- **Borrow B_out = Ā·B**

#### Full Subtractor:
- **D = A ⊕ B ⊕ Bin**
- **Bout = ĀB + ĀBin + BBin**

---

### MULTIPLEXER (MUX):
- **Data selector** — selects one of many inputs and routes it to output
- **2ⁿ inputs, n select lines, 1 output**
- 4:1 MUX has 4 inputs, 2 select lines

| S1 | S0 | Output |
|---|---|---|
| 0 | 0 | I0 |
| 0 | 1 | I1 |
| 1 | 0 | I2 |
| 1 | 1 | I3 |

- **MUX can implement any Boolean function!**
- Expression: Y = S1'S0'·I0 + S1'S0·I1 + S1S0'·I2 + S1S0·I3

---

### DEMULTIPLEXER (DEMUX):
- **Opposite of MUX** — routes single input to one of many outputs
- 1 input, n select lines, 2ⁿ outputs
- Also called **Data Distributor**

---

### DECODER:
- Converts **binary code → one-hot output**
- n inputs → 2ⁿ outputs (exactly one output is HIGH at a time)
- **2:4 Decoder:** 2 inputs → 4 outputs
- Used in: memory address decoding, demultiplexing

| A | B | Y0 | Y1 | Y2 | Y3 |
|---|---|---|---|---|---|
| 0 | 0 | 1 | 0 | 0 | 0 |
| 0 | 1 | 0 | 1 | 0 | 0 |
| 1 | 0 | 0 | 0 | 1 | 0 |
| 1 | 1 | 0 | 0 | 0 | 1 |

> **Decoder can implement any Boolean function** using OR gates on its outputs

---

### ENCODER:
- **Opposite of Decoder** — converts one-hot input to binary code
- 2ⁿ inputs → n outputs
- **Priority Encoder:** handles multiple simultaneous inputs — higher input takes priority

---

### COMPARATOR:
- Compares two binary numbers A and B
- Outputs: **A>B, A=B, A<B**
- **A = B** when all bit pairs are equal (use XNOR for each bit, AND all results)

---

### CODE CONVERTERS:
| Converter | Use |
|---|---|
| **Binary to Gray** | B₃B₂B₁B₀ → G₃G₂G₁G₀, G_n = B_n ⊕ B_(n+1) |
| **Gray to Binary** | B_n = B_(n+1) ⊕ G_n |
| **BCD to Excess-3** | Add 0011 (3) to each BCD digit |

### BCD (Binary Coded Decimal):
- Represents each decimal digit in 4-bit binary
- Only uses combinations 0000 to 1001 (0–9)
- 1010 to 1111 are invalid in BCD

---

## 7. SEQUENTIAL CIRCUITS

### What is a Sequential Circuit?
Output depends on **current inputs + past history (stored state)**

```
Inputs + Current State → [Sequential Logic] → Outputs + Next State
```
- Has **memory** elements (flip-flops/latches)
- Driven by a **clock signal**

### Types:
| Type | Description |
|---|---|
| **Synchronous** | State changes only at clock edge (most common) |
| **Asynchronous** | State changes immediately with input (faster but harder to design) |

---

### LATCHES (Level-triggered):

#### SR Latch (Set-Reset):
- **S=1, R=0 → Q=1** (Set)
- **S=0, R=1 → Q=0** (Reset)
- **S=0, R=0 → Q=Q** (Hold — no change)
- **S=1, R=1 → FORBIDDEN** (undefined/invalid state)

| S | R | Q | Q' |
|---|---|---|---|
| 0 | 0 | Q | Q' (hold) |
| 0 | 1 | 0 | 1 (reset) |
| 1 | 0 | 1 | 0 (set) |
| 1 | 1 | ? | ? (forbidden) |

#### D Latch:
- **Single input D**
- When Enable=1: Q follows D
- When Enable=0: Q holds last value
- Eliminates the forbidden state of SR latch

---

### FLIP-FLOPS (Edge-triggered):

> **Latch** = level sensitive | **Flip-Flop** = edge sensitive (changes on rising or falling clock edge)

#### SR Flip-Flop:
- Same as SR latch but **clocked**
- S=R=1 still forbidden

#### D Flip-Flop (Data/Delay):
- **Most widely used**
- On clock edge: **Q = D**
- Delays input by one clock cycle
- Eliminates forbidden state
- **Used in:** registers, memory, pipeline stages

| D | Q(next) |
|---|---|
| 0 | 0 |
| 1 | 1 |

#### JK Flip-Flop:
- **Improvement of SR** — eliminates forbidden state
- J=K=1 → **Toggle** (Q flips to Q')
- J=Set, K=Reset

| J | K | Q(next) |
|---|---|---|
| 0 | 0 | Q (hold) |
| 0 | 1 | 0 (reset) |
| 1 | 0 | 1 (set) |
| 1 | 1 | Q' (toggle) |

#### T Flip-Flop (Toggle):
- Single input T
- **T=0 → Hold, T=1 → Toggle**
- Derived from JK with J=K=T
- **Used in:** counters

| T | Q(next) |
|---|---|
| 0 | Q |
| 1 | Q' |

### Flip-Flop Conversions:
You can convert any FF to another using **excitation tables**

| FF | Excitation |
|---|---|
| SR | S=0→no set, S=1→set; R=0→no reset, R=1→reset |
| JK | Same as SR but J=K=1 allowed (toggle) |
| D | D = Q(next) always |
| T | T = Q ⊕ Q(next) |

### Timing Parameters:
| Parameter | Meaning |
|---|---|
| **Setup time** | Input must be stable BEFORE clock edge |
| **Hold time** | Input must stay stable AFTER clock edge |
| **Propagation delay** | Time from clock edge to output change |

---

### REGISTERS:

#### What is a Register?
A group of flip-flops storing **multiple bits** as a unit — essentially a multi-bit memory.

#### Types of Registers:

**1. Parallel In Parallel Out (PIPO):**
- All bits loaded and available simultaneously
- Fastest — used as general purpose registers in CPU

**2. Serial In Serial Out (SISO):**
- One bit enters and exits per clock
- Used as delay line

**3. Serial In Parallel Out (SIPO):**
- Bits enter one at a time, all available at once
- **Serial to parallel converter**

**4. Parallel In Serial Out (PISO):**
- All bits loaded at once, output one bit at a time
- **Parallel to serial converter**

#### Shift Registers:
- Bits shift left or right on each clock pulse
- **Universal Shift Register** — can do all four modes above
- **Applications:** Serial communication, data conversion, multiplication/division by 2

---

### COUNTERS:

#### What is a Counter?
Sequential circuit that goes through **predetermined sequence of states** on each clock pulse.

#### **Asynchronous (Ripple) Counter:**
- Each FF triggers the next (output of one = clock of next)
- **Slow** — ripple delay accumulates
- Simple to build

#### **Synchronous Counter:**
- All FFs share the **same clock**
- **Faster** — all flip-flops change simultaneously
- More complex logic required

#### Types by Count Sequence:

**Binary Up Counter (3-bit):**
000 → 001 → 010 → 011 → 100 → 101 → 110 → 111 → 000

**Binary Down Counter:**
111 → 110 → 101 → ... → 000 → 111

**BCD Counter (Mod-10):**
Counts 0000 to 1001 (0–9) then resets to 0000

**Ring Counter:**
- Single 1 rotates through n flip-flops
- Sequence: 1000 → 0100 → 0010 → 0001 → 1000
- n flip-flops → n states

**Johnson Counter (Twisted Ring):**
- Complement of output fed back to input
- 2n states from n flip-flops
- Sequence (2-bit): 00 → 10 → 11 → 01 → 00

#### **MOD-N Counter:**
- Counts from 0 to N-1 then resets
- Needs **⌈log₂N⌉ flip-flops**
- Example: Mod-6 counter needs 3 FFs (2³=8 > 6)

---

### FINITE STATE MACHINES (FSM):

#### What is an FSM?
A model of computation with:
- **Finite number of states**
- **Transitions** between states based on inputs
- **Outputs** based on state/input

#### Two Types:

| Type | Output depends on | Description |
|---|---|---|
| **Mealy Machine** | Current state + Current input | Output can change anytime input changes |
| **Moore Machine** | Current state only | Output changes only at clock edge — more stable |

> **Moore is safer/more stable; Mealy needs fewer states**

#### FSM Design Steps:
1. Understand the problem → identify states
2. Draw **State Diagram** (circles=states, arrows=transitions)
3. Create **State Table** (present state + input → next state + output)
4. **Assign binary codes** to states
5. Derive **Next State equations** using K-map
6. Implement with flip-flops and logic gates

---

## QUICK REVISION CHEAT SHEET — SECTION 1

| Topic | Key Point |
|---|---|
| **Two's Complement** | Flip + 1; Used in all modern computers; range -2ⁿ⁻¹ to 2ⁿ⁻¹-1 |
| **IEEE 754 Single** | 1 sign + 8 exponent (bias 127) + 23 mantissa |
| **De Morgan's** | (AB)' = A'+B' and (A+B)' = A'B' |
| **Universal Gates** | NAND and NOR |
| **K-Map grouping** | Powers of 2 only (1,2,4,8,16); wrap around allowed |
| **Half Adder** | S=A⊕B, C=AB; no carry in |
| **Full Adder** | S=A⊕B⊕Cin; Cout=AB+BCin+ACin |
| **MUX** | 2ⁿ inputs, n selects, 1 output; can implement any function |
| **Decoder** | n inputs → 2ⁿ one-hot outputs |
| **D Flip-Flop** | Q(next) = D; most used FF |
| **JK Flip-Flop** | J=K=1 → Toggle; no forbidden state |
| **T Flip-Flop** | T=1 → Toggle; used in counters |
| **Ripple Counter** | Async, slow, simple |
| **Sync Counter** | Same clock for all FFs, fast |
| **Ring Counter** | n FFs → n states |
| **Johnson Counter** | n FFs → 2n states |
| **Mealy vs Moore** | Mealy: output on transition; Moore: output on state |
| **SOP** | Group 1s in K-map |
| **POS** | Group 0s in K-map |
| **EPI** | Essential Prime Implicant — must always be included |
| **Overflow (2's comp)** | Carry in MSB ≠ Carry out MSB |

---

You're locked in bro. Every possible question from this section — **you have the answer.** 🔥 Say the word for the next subject and we keep cooking!