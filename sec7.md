# Computer Networks — Complete Masterclass 🌐

Let's go absolutely deep on every single topic. Same energy as before — you should be able to answer ANYTHING.

---

# 🏗️ PART 1: NETWORKING FUNDAMENTALS

## What is a Computer Network?
A collection of interconnected devices (computers, routers, switches) that can **communicate and share resources**.

## Key Terminology
| Term | Meaning |
|---|---|
| **Node** | Any device on the network |
| **Link** | Physical/logical connection between nodes |
| **Bandwidth** | Maximum data rate (bits/sec) |
| **Throughput** | Actual data rate achieved |
| **Latency** | Time for data to travel from source to destination |
| **Protocol** | Set of rules governing communication |
| **Packet** | Unit of data transmitted over a network |

## Types of Networks
| Type | Range | Example |
|---|---|---|
| **PAN** | Personal (~1m) | Bluetooth |
| **LAN** | Local (~1km) | Office WiFi |
| **MAN** | City (~100km) | Cable TV network |
| **WAN** | Worldwide | The Internet |

## Network Topologies
```
Bus:      A---B---C---D---E   (single shared cable)
Ring:     A→B→C→D→E→A        (circular)
Star:     All connected to central hub/switch
Mesh:     Every node connected to every other
Tree:     Hierarchical star topology
```

---

# 🔵 PART 2: SWITCHING TECHNIQUES

## 1. Circuit Switching
A **dedicated physical path** is established between sender and receiver for the entire duration of communication.

```
Steps:
1. Connection Establishment  (setup phase)
2. Data Transfer             (path reserved throughout)
3. Connection Teardown       (release phase)
```

**Examples**: Traditional telephone networks (PSTN)

✅ Guaranteed bandwidth, constant delay
❌ Wastes resources if line is idle, setup delay, expensive

---

## 2. Packet Switching
Data is broken into **packets**. Each packet travels **independently** through the network and may take **different routes**.

```
Message: "HELLO WORLD"
→ Packet 1: [HELL | Header: src, dest, seq=1]
→ Packet 2: [O WO | Header: src, dest, seq=2]
→ Packet 3: [RLD  | Header: src, dest, seq=3]

Each packet routed independently → reassembled at destination
```

### Two Types:
**Datagram (Connectionless)** — No path established. Each packet routed independently. Used in **IP**.

**Virtual Circuit (Connection-oriented)** — Path established before transfer but resources NOT dedicated. All packets follow same path. Used in **ATM, Frame Relay**.

---

## Circuit vs Packet vs Virtual Circuit
| Feature | Circuit | Packet (Datagram) | Virtual Circuit |
|---|---|---|---|
| Path | Dedicated | Independent per packet | Fixed logical path |
| Setup | Required | Not needed | Required |
| Resource reservation | Yes | No | No (just path) |
| Congestion | Rare | Possible | Possible |
| Ordering | In order | May be out of order | In order |
| Failure handling | Call drops | Rerouting | Call drops |
| Example | PSTN | IP/Internet | ATM |

---

# 📚 PART 3: LAYERED ARCHITECTURE

## Why Layering?
- Breaks complex networking into manageable pieces
- Each layer has a specific function
- Layers communicate via **interfaces**
- Changes in one layer don't affect others

---

## OSI Model (7 Layers)
**"Please Do Not Throw Sausage Pizza Away"** (Physical → Application)
or top-down: **"All People Seem To Need Data Processing"**

```
┌─────────────────────────────────┐
│  7. Application Layer           │  ← HTTP, FTP, SMTP, DNS
├─────────────────────────────────┤
│  6. Presentation Layer          │  ← Encryption, Compression, Encoding
├─────────────────────────────────┤
│  5. Session Layer               │  ← Session management, Sync
├─────────────────────────────────┤
│  4. Transport Layer             │  ← TCP, UDP, Port numbers
├─────────────────────────────────┤
│  3. Network Layer               │  ← IP, Routing, Fragmentation
├─────────────────────────────────┤
│  2. Data Link Layer             │  ← MAC, Framing, Error detection
├─────────────────────────────────┤
│  1. Physical Layer              │  ← Bits, cables, signals
└─────────────────────────────────┘
```

### Each Layer — Deep Dive

| Layer | Unit | Key Functions | Devices |
|---|---|---|---|
| **Physical** | Bits | Transmission of raw bits, signal encoding, modulation | Hub, Repeater |
| **Data Link** | Frames | Framing, MAC addressing, error detection, flow control | Switch, Bridge |
| **Network** | Packets | Logical addressing (IP), routing, fragmentation | Router |
| **Transport** | Segments | End-to-end delivery, reliability, port numbers | - |
| **Session** | Data | Session establishment/termination, synchronization | - |
| **Presentation** | Data | Encryption, compression, format conversion (ASCII↔EBCDIC) | - |
| **Application** | Data | User-facing protocols, network services | - |

---

## TCP/IP Model (4 Layers)
The **real-world** model the internet actually uses.

```
┌──────────────────────────────────┐
│  4. Application Layer            │  ← HTTP, DNS, FTP, SMTP (OSI 5+6+7)
├──────────────────────────────────┤
│  3. Transport Layer              │  ← TCP, UDP (OSI 4)
├──────────────────────────────────┤
│  2. Internet Layer               │  ← IP, ICMP, ARP (OSI 3)
├──────────────────────────────────┤
│  1. Network Access Layer         │  ← Ethernet, WiFi (OSI 1+2)
└──────────────────────────────────┘
```

## OSI vs TCP/IP
| | OSI | TCP/IP |
|---|---|---|
| Layers | 7 | 4 |
| Purpose | Reference model | Practical implementation |
| Transport | TCP | TCP + UDP |
| Session/Presentation | Separate layers | Merged into Application |
| Development | Theory first | Protocol first |

---

# 🔗 PART 4: DATA LINK LAYER

## Core Functions
1. **Framing** — Package bits into frames
2. **Error Detection/Correction** — Catch transmission errors
3. **MAC** — Control access to shared medium
4. **Flow Control** — Match sender/receiver speeds

---

## Framing
Breaking the bit stream into discrete frames so the receiver knows where each frame starts and ends.

### Methods:

**1. Character Count** — First field in header says how many characters in frame
- Problem: If count corrupted → sync lost permanently

**2. Flag Bytes with Byte Stuffing**
- Special flag byte (e.g., 01111110) marks frame boundaries
- If flag pattern appears in data → insert escape byte before it
- Receiver removes escape bytes (destuffs)

**3. Flag Bits with Bit Stuffing (HDLC)**
- Flag: `01111110`
- If 5 consecutive 1s appear in data → sender inserts a 0
- Receiver: after 5 ones, if next bit is 0 → remove it (destuff); if 1 → it's a flag
```
Data:       0111111101
After stuff: 01111101101   ← 0 inserted after five 1s
```

**4. Physical Layer Violations** — Use invalid signal patterns (not valid in encoding) as delimiters

---

## Error Detection

### 1. Parity Bit
Add one bit so that total number of 1s is even (even parity) or odd (odd parity).
```
Data: 1010001  →  Count of 1s = 3 (odd)
Even parity bit = 1  →  Transmitted: 10100011
```
- Detects **single-bit errors** only
- Cannot detect 2-bit errors

### 2. Two-Dimensional Parity
Arrange data in rows and columns; compute parity for each row AND column.
- Can detect AND correct single-bit errors
- Detects burst errors up to 2 bits

### 3. Checksum
- Divide data into segments, add all together
- Take 1's complement → checksum
- Receiver adds all segments + checksum → should be all 1s
- Used in TCP, UDP, IP headers

### 4. CRC (Cyclic Redundancy Check) — MOST POWERFUL
Treats frame as a binary polynomial. Divides by a **generator polynomial** using XOR (mod-2 division).

```
Message M(x), Generator G(x) of degree r:
1. Append r zeros to M → M'
2. Divide M' by G using XOR division
3. Remainder R = CRC bits
4. Transmit M + R

Receiver: Divide received frame by G
→ If remainder = 0 → No error
→ If remainder ≠ 0 → Error detected
```

- Detects all single-bit errors
- Detects all double-bit errors (if G has ≥3 terms)
- Detects all odd number of errors (if G contains factor x+1)
- Detects all burst errors of length ≤ r

---

## Error Correction — Hamming Code
Calculate minimum number of **redundancy bits** r such that:
```
2^r ≥ m + r + 1   (m = data bits)
```

Redundancy bits placed at positions 1, 2, 4, 8... (powers of 2).
Each checks specific bit positions.

To detect error: XOR all check values → gives **syndrome** → position of erroneous bit.

---

## Flow Control

### Stop-and-Wait
- Send one frame → wait for ACK → send next
- Simple but slow (wastes time waiting)
- Efficiency = T_transmission / (T_transmission + 2×T_propagation)

### Sliding Window Protocols
Sender can send **multiple frames** without waiting for each ACK.

**Go-Back-N (GBN)**
- Window size = N (sender can have N unacknowledged frames)
- If frame i is lost → **retransmit frame i and ALL subsequent frames**
- Receiver only accepts frames in order
- Receiver window size = 1

**Selective Repeat (SR)**
- If frame i is lost → retransmit **only** frame i
- Receiver buffers out-of-order frames
- More complex but more efficient
- Sender window = Receiver window = N/2 (for n-bit sequence numbers, max window = 2^(n-1))

| | Stop-and-Wait | Go-Back-N | Selective Repeat |
|---|---|---|---|
| Sender window | 1 | N | N |
| Receiver window | 1 | 1 | N |
| Retransmit on error | 1 frame | N frames | 1 frame |
| Complexity | Simple | Medium | Complex |

---

## Medium Access Control (MAC)

The problem: **Multiple devices sharing same channel** — who transmits when?

### 1. Channel Partitioning (Static)
**TDMA** — Time Division Multiple Access: Each device gets a fixed time slot
**FDMA** — Frequency Division Multiple Access: Each device gets a frequency band
**CDMA** — Code Division Multiple Access: Each device uses unique code; all transmit simultaneously

### 2. Random Access Protocols (Dynamic)
No coordination; collisions possible.

**ALOHA (Pure)**
- Transmit whenever you want
- If collision → wait random time → retransmit
- Efficiency: max 18.4%

**Slotted ALOHA**
- Time divided into slots; transmit only at start of slot
- Efficiency: max 37% (1/e)

**CSMA (Carrier Sense Multiple Access)**
- **Listen before transmit** (carrier sense)
- Still possible to have collision due to propagation delay

**CSMA/CD (Collision Detection)** — Used in **Ethernet**
```
1. Listen to channel
2. If idle → transmit
3. While transmitting → monitor channel
4. If collision detected → stop, send jam signal
5. Wait random backoff time (exponential backoff)
6. Retry
```
- Minimum frame size: 2×propagation_delay×bandwidth (so collision detected before frame finishes)

**CSMA/CA (Collision Avoidance)** — Used in **WiFi (802.11)**
- Can't detect collision (wireless)
- Wait random backoff BEFORE transmitting
- Optionally use RTS/CTS (Ready to Send / Clear to Send)

### 3. Taking Turns (Controlled)
**Polling** — Master polls each device: "do you have data?"
**Token Ring** — Token passed around; only token holder can transmit

---

## Ethernet & Bridging

### Ethernet (IEEE 802.3)
The dominant LAN technology.

**Ethernet Frame Format:**
```
| Preamble(7B) | SFD(1B) | Dest MAC(6B) | Src MAC(6B) | Type(2B) | Data(46-1500B) | FCS(4B) |
```
- **Preamble**: Sync signal (10101010...)
- **SFD**: Start Frame Delimiter (10101011)
- **MAC**: 48-bit hardware address (burned into NIC)
- **Type**: Upper layer protocol (0x0800 = IPv4)
- **FCS**: CRC error detection

**MAC Address**: 48 bits = 6 bytes
```
Format: AA:BB:CC:DD:EE:FF
First 24 bits = OUI (manufacturer)
Last 24 bits = device-specific
FF:FF:FF:FF:FF:FF = broadcast
```

### Bridges & Switches
**Bridge**: Connects two LAN segments, filters traffic based on MAC addresses.

**Switch**: Multi-port bridge. Learns MAC addresses by observing source addresses. Builds a **MAC table (forwarding table)**:

```
Algorithm:
- Frame arrives on port X from MAC A
→ Learn: MAC A is at port X
→ Look up destination MAC in table
→ If found: forward only to that port (filtering)
→ If not found: flood to all ports except incoming (flooding)
```

---

# 🗺️ PART 5: ROUTING

## Routing Protocols

### 1. Shortest Path Routing (Dijkstra-based)
- Uses Dijkstra's algorithm on network graph
- Edge weights = cost (delay, bandwidth, hop count)
- Every router maintains complete network topology
- Used in **OSPF** (Link State Protocol)

### 2. Flooding
- Every incoming packet forwarded on **every outgoing link** except incoming
- **Guaranteed** to reach destination if path exists
- Extremely **robust** but creates massive traffic
- Controlled with:
  - **Hop count limit** (TTL)
  - **Sequence numbers** (don't forward duplicates)
- Used in: Military networks, route discovery, initial broadcast

### 3. Distance Vector Routing (Bellman-Ford based)

Each router maintains a **routing table** = distance (cost) to every other router via best next hop.

```
Router's table:
Destination | Cost | Next Hop
    A       |  0   |   -
    B       |  2   |   B
    C       |  5   |   B
    D       |  3   |   D
```

**Algorithm**:
1. Each router shares its table with **immediate neighbors** periodically
2. On receiving neighbor's table:
   - For each destination D via neighbor N:
   - New cost = cost(me, N) + cost(N, D)
   - If new cost < current → update table

**Convergence**: Eventually all routers agree on best paths.

**Count-to-Infinity Problem** (Critical weakness):
```
A --1-- B --1-- C
If A-B link fails:
B thinks: C can reach A via me? No. But can reach via C (cost 2+1=3)
C thinks: B can reach A via me? But via B cost is 3+1=4
They keep incrementing each other's cost to infinity
```

**Fix**: Split Horizon — don't advertise routes back to where you learned them from.
**Fix**: Poison Reverse — advertise failed routes with infinite cost.

**Protocol using DV**: **RIP** (Routing Information Protocol)

### 4. Link State Routing

Each router:
1. **Discovers neighbors** and measures cost to each
2. **Broadcasts LSP** (Link State Packet) to ALL routers in network (flooding)
3. Every router builds complete **topology map**
4. Runs **Dijkstra's** to compute shortest paths

```
LSP contains:
- Router ID
- List of neighbors + costs
- Sequence number (to detect stale packets)
- TTL
```

**Protocol using LS**: **OSPF** (Open Shortest Path First)

### Distance Vector vs Link State
| | Distance Vector | Link State |
|---|---|---|
| Knowledge | Local (neighbors) | Global (full topology) |
| Algorithm | Bellman-Ford | Dijkstra |
| Info shared | Routing table | Link state packets |
| Convergence | Slow | Fast |
| Count-to-infinity | Yes | No |
| Memory/CPU | Low | High |
| Scalability | Poor | Good |
| Example | RIP | OSPF |

---

# 🌐 PART 6: NETWORK LAYER — IP

## Fragmentation
IP packets may need to be broken into smaller pieces (fragments) to fit through networks with smaller **MTU** (Maximum Transmission Unit).

```
IP Header fragmentation fields:
- Identification: Same for all fragments of a packet
- Fragment Offset: Position of fragment in original packet (in units of 8 bytes)
- MF (More Fragments) flag: 1 if more fragments follow, 0 for last
- DF (Don't Fragment) flag: If set, don't fragment; drop + send ICMP error
```

**Reassembly** happens only at **destination** (not at intermediate routers in IPv4).

```
Original packet: 4000 bytes data, MTU = 1500 bytes
Max data per fragment = 1500 - 20(header) = 1480 bytes

Fragment 1: bytes 0-1479,    offset=0,    MF=1
Fragment 2: bytes 1480-2959, offset=185,  MF=1  (1480/8=185)
Fragment 3: bytes 2960-3999, offset=370,  MF=0
```

---

## IP Addressing (IPv4)

### IPv4 Address
32-bit address, written in **dotted decimal**: `192.168.1.1`

```
192   .   168   .   1   .   1
11000000  10101000  00000001  00000001
```

### Classful Addressing (Old System)
| Class | Range | Default Mask | Networks | Hosts/Network |
|---|---|---|---|---|
| **A** | 1.0.0.0 – 126.255.255.255 | /8 | 128 | 16M |
| **B** | 128.0.0.0 – 191.255.255.255 | /16 | 16K | 65K |
| **C** | 192.0.0.0 – 223.255.255.255 | /24 | 2M | 254 |
| **D** | 224.0.0.0 – 239.255.255.255 | Multicast | — | — |
| **E** | 240.0.0.0 – 255.255.255.255 | Reserved | — | — |

**127.x.x.x** = Loopback (localhost)

### CIDR — Classless Inter-Domain Routing
Eliminates class boundaries. Use prefix notation: `192.168.1.0/24`

```
192.168.1.0/24 means:
- First 24 bits = Network part
- Last 8 bits = Host part
- Subnet mask: 255.255.255.0
- Hosts: 2^8 - 2 = 254 (subtract network and broadcast)
```

**Subnet Calculation (MUST KNOW)**:
```
IP: 192.168.10.50/26

Subnet mask: /26 = 11111111.11111111.11111111.11000000 = 255.255.255.192

Block size = 256 - 192 = 64

Subnets: .0, .64, .128, .192
50 falls in .0-.63 block:
  Network address: 192.168.10.0
  Broadcast:       192.168.10.63
  Usable hosts:    192.168.10.1 – 192.168.10.62 (62 hosts)
```

**CIDR Supernetting** — Aggregate multiple networks into one:
```
192.168.0.0/24 }
192.168.1.0/24 } → 192.168.0.0/23 (supernet)
```

### Private IP Ranges (RFC 1918)
```
10.0.0.0    – 10.255.255.255   /8
172.16.0.0  – 172.31.255.255   /12
192.168.0.0 – 192.168.255.255  /16
```
These are NOT routed on the public internet → used with NAT.

---

## IP Header Format
```
 0                   1                   2                   3
 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|Version|  IHL  |Type of Service|          Total Length         |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|         Identification        |Flags|      Fragment Offset    |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|  Time to Live |    Protocol   |         Header Checksum       |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                       Source Address                          |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                    Destination Address                        |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
```

Key fields:
- **Version**: 4 for IPv4
- **IHL**: Header length in 32-bit words (min=5, so min header=20 bytes)
- **TTL**: Decremented at each hop; packet dropped at TTL=0
- **Protocol**: 6=TCP, 17=UDP, 1=ICMP
- **Flags**: DF, MF bits

---

# 🛠️ PART 7: IP SUPPORT PROTOCOLS

## ARP — Address Resolution Protocol

**Problem**: You know the IP address of destination but need the **MAC address** to send an Ethernet frame.

```
Process:
1. Host A wants to send to 192.168.1.5
2. A broadcasts: "Who has 192.168.1.5? Tell 192.168.1.1"
   (ARP Request — broadcast to FF:FF:FF:FF:FF:FF)
3. 192.168.1.5 replies: "I am 192.168.1.5, my MAC is AA:BB:CC:DD:EE:FF"
   (ARP Reply — unicast)
4. A caches this in ARP table
5. A sends frame to that MAC address
```

**ARP Cache**: Temporary storage of IP→MAC mappings (typically expires in 20 minutes)

**Gratuitous ARP**: A host ARPs for its own IP — used to detect conflicts and update others' caches.

**Proxy ARP**: Router answers ARP requests on behalf of hosts on another network.

---

## DHCP — Dynamic Host Configuration Protocol

**Purpose**: Automatically assigns IP addresses (and other config) to hosts.

```
DORA Process:
1. DISCOVER  — Client broadcasts: "Anyone there? I need an IP!"
               (src IP: 0.0.0.0, dst IP: 255.255.255.255)

2. OFFER     — Server broadcasts: "I offer you 192.168.1.100"
               (includes IP, subnet mask, gateway, DNS, lease time)

3. REQUEST   — Client broadcasts: "I accept 192.168.1.100 from server X"
               (broadcast because multiple servers may have offered)

4. ACK       — Server: "Confirmed! 192.168.1.100 is yours for X seconds"
```

**DHCP provides**: IP address, Subnet mask, Default gateway, DNS server address, Lease time

**Port**: Server uses **UDP port 67**, Client uses **UDP port 68**

---

## ICMP — Internet Control Message Protocol

**Purpose**: Error reporting and diagnostic functions for IP.

```
ICMP Message Types:
Type 0  — Echo Reply           (ping response)
Type 3  — Destination Unreachable (with codes: port, host, net, protocol unreachable)
Type 5  — Redirect             (use a better router)
Type 8  — Echo Request         (ping)
Type 11 — Time Exceeded        (TTL expired → used by traceroute)
Type 12 — Parameter Problem
```

**ping**: Sends ICMP Echo Request → receives Echo Reply → measures RTT

**traceroute**:
```
1. Send packet with TTL=1 → first router drops it → sends "TTL exceeded"
2. Send packet with TTL=2 → second router drops it → sends "TTL exceeded"
3. Repeat → map out entire path to destination
```

ICMP is encapsulated **within IP packets** (Protocol number = 1).

---

## NAT — Network Address Translation

**Problem**: Private IPs can't be routed on internet. But we're running out of public IPs.

**Solution**: NAT router translates private IP:port ↔ public IP:port.

```
Internal Network             NAT Router              Internet
192.168.1.10:3000 ──→  [203.0.113.1:5001] ──→  93.184.216.34:80
192.168.1.11:4000 ──→  [203.0.113.1:5002] ──→  93.184.216.34:80
192.168.1.12:5000 ──→  [203.0.113.1:5003] ──→  93.184.216.34:80
```

**NAT Translation Table**:
```
Private IP:Port     | Public IP:Port     | Destination IP:Port
192.168.1.10:3000   | 203.0.113.1:5001  | 93.184.216.34:80
```

**Types of NAT**:
- **Static NAT**: One private IP ↔ one public IP (1:1)
- **Dynamic NAT**: Pool of public IPs assigned dynamically
- **PAT (Port Address Translation) / NAPT**: Many private IPs share ONE public IP (many:1) — most common

✅ Conserves public IP addresses | ✅ Security (hides internal network)
❌ Breaks end-to-end principle | ❌ Problems with some protocols | ❌ No incoming connections without port forwarding

---

# 🚚 PART 8: TRANSPORT LAYER

## Port Numbers
| Range | Type |
|---|---|
| 0–1023 | Well-known ports (HTTP=80, HTTPS=443, FTP=21, SSH=22, DNS=53, SMTP=25) |
| 1024–49151 | Registered ports |
| 49152–65535 | Dynamic/Ephemeral ports (used by clients) |

---

## UDP — User Datagram Protocol

**Connectionless, unreliable, fast.**

```
UDP Header (8 bytes):
| Source Port (16) | Dest Port (16) |
| Length (16)      | Checksum (16)  |
| Data ...                          |
```

✅ No connection setup → Fast
✅ No reliability overhead
✅ Supports broadcast/multicast
❌ No guarantee of delivery
❌ No ordering
❌ No congestion control

**Use cases**: DNS, DHCP, VoIP, Video streaming, Online gaming, TFTP

---

## TCP — Transmission Control Protocol

**Connection-oriented, reliable, ordered, byte-stream.**

```
TCP Header (20 bytes minimum):
| Source Port (16)  | Dest Port (16)          |
| Sequence Number (32)                         |
| Acknowledgment Number (32)                   |
| Data Offset | Flags | Window Size (16)       |
| Checksum (16)       | Urgent Pointer (16)    |
```

**Flags**:
- **SYN** — Synchronize (connection setup)
- **ACK** — Acknowledgment
- **FIN** — Finish (connection teardown)
- **RST** — Reset (abort connection)
- **PSH** — Push (deliver immediately)
- **URG** — Urgent

### TCP 3-Way Handshake (Connection Setup)
```
Client                              Server
  |  SYN (seq=x)                →  |   "I want to connect"
  |  ←  SYN+ACK (seq=y, ack=x+1)  |   "OK, I acknowledge"
  |  ACK (ack=y+1)              →  |   "Connection established"
  |  ← → Data Transfer             |
```

### TCP Connection Teardown (4-Way)
```
Client                              Server
  |  FIN (seq=x)                →  |   "I'm done sending"
  |  ←  ACK (ack=x+1)             |   "OK"
  |  ←  FIN (seq=y)               |   "I'm done too"
  |  ACK (ack=y+1)             →  |   
  (Client waits 2×MSL before closing — TIME_WAIT state)
```

### TCP Reliability Mechanism
- **Sequence Numbers**: Each byte of data has a sequence number
- **ACK Numbers**: "I've received up to byte X, send from X+1"
- **Cumulative ACKs**: ACK covers all bytes up to that point
- **Retransmission**: If ACK not received within timeout → retransmit

---

## Flow Control

Prevents fast sender from overwhelming slow receiver.

### Sliding Window
```
Receiver advertises window size W in each ACK
Sender can have at most W bytes unacknowledged at any time

If receiver buffer fills up → advertises window = 0 → sender pauses
When buffer frees → sends window update
```

**Silly Window Syndrome**: Both sender and receiver send tiny segments.
- **Nagle's Algorithm** (sender side): Don't send tiny segment if unACKed data exists; wait to accumulate more data.
- **Clark's Solution** (receiver side): Don't advertise small windows; wait for meaningful space.

---

## Congestion Control

Too many packets in the network → **congestion collapse**. TCP handles this.

### Key Variables
- **cwnd** (Congestion Window): Sender-side limit
- **ssthresh** (Slow Start Threshold)
- Effective window = min(cwnd, receiver's window)

### TCP Congestion Control Phases

**1. Slow Start**
```
Start: cwnd = 1 MSS (Max Segment Size)
Each ACK received: cwnd += 1 MSS
→ Exponential growth (doubles each RTT)
Continue until cwnd = ssthresh
```

**2. Congestion Avoidance**
```
When cwnd ≥ ssthresh:
Each RTT: cwnd += 1 MSS
→ Linear (additive) growth
```

**3. Congestion Detection**
```
Timeout (severe):
  ssthresh = cwnd / 2
  cwnd = 1 MSS
  Restart Slow Start

3 Duplicate ACKs (mild) → Fast Retransmit + Fast Recovery:
  ssthresh = cwnd / 2
  cwnd = ssthresh (TCP Reno) or cwnd = ssthresh + 3 (TCP Reno variant)
  Continue Congestion Avoidance (skip slow start)
```

**AIMD**: Additive Increase, Multiplicative Decrease — core principle of TCP congestion control.

```
Timeline:
cwnd
  |    /\
  |   /  \        /\
  |  /    \      /  \
  | /      \    /    \
  |/        \  /      \
  +-------------------→ time
  Slow Start → CA → Timeout → Repeat
```

---

## Sockets

**Socket**: Endpoint of a communication channel = IP address + Port number

```
Socket = (IP address, Port number, Protocol)
Connection = (src IP, src port, dest IP, dest port, protocol)
```

### Socket Types
- **SOCK_STREAM** — TCP socket (reliable, ordered)
- **SOCK_DGRAM** — UDP socket (connectionless)

### TCP Socket Lifecycle
```
Server:                         Client:
socket()                        socket()
bind()                          
listen()                        
accept() ←───────────────────── connect()
recv()/send() ←───────────────→ send()/recv()
close()                         close()
```

---

# 💻 PART 9: APPLICATION LAYER PROTOCOLS

## DNS — Domain Name System

**Purpose**: Translates human-readable domain names → IP addresses.

```
www.google.com → 142.250.190.68
```

### DNS Hierarchy
```
                    . (Root)
                   / | \
              .com .org .net .in
              /
           google.com
           /        \
    www.google.com  mail.google.com
```

**DNS Servers**:
- **Root Servers**: Know addresses of TLD servers (13 sets worldwide)
- **TLD Servers**: Handle .com, .org, .in etc. — know authoritative servers
- **Authoritative Servers**: Know actual IP for a domain
- **Local DNS Server (Resolver)**: First contacted by client (ISP's DNS)

### DNS Resolution Process
```
1. Client asks Local DNS: "What is IP of www.google.com?"
2. Local DNS not cached → asks Root: "Who handles .com?"
3. Root → returns address of .com TLD server
4. Local DNS asks TLD: "Who handles google.com?"
5. TLD → returns address of google.com authoritative server
6. Local DNS asks authoritative: "What is www.google.com?"
7. Authoritative → returns IP: 142.250.190.68
8. Local DNS caches + returns to client

This is Iterative resolution (most common)
```

**Recursive resolution**: Local DNS does all the work on behalf of client.

### DNS Record Types
| Type | Meaning | Example |
|---|---|---|
| **A** | Hostname → IPv4 | www.google.com → 142.250.190.68 |
| **AAAA** | Hostname → IPv6 | |
| **CNAME** | Alias to canonical name | www.google.com → google.com |
| **MX** | Mail server for domain | google.com → smtp.google.com |
| **NS** | Authoritative name server | |
| **PTR** | Reverse lookup: IP → hostname | |
| **TXT** | Text records (SPF, DKIM etc.) | |

**DNS uses UDP port 53** (TCP for zone transfers > 512 bytes)

---

## HTTP — HyperText Transfer Protocol

**Stateless** request-response protocol for the web.

### HTTP Methods
| Method | Purpose |
|---|---|
| **GET** | Retrieve a resource |
| **POST** | Submit data (create) |
| **PUT** | Update a resource |
| **DELETE** | Delete a resource |
| **HEAD** | Get headers only (no body) |
| **OPTIONS** | Ask what methods are supported |

### HTTP Request Format
```
GET /index.html HTTP/1.1
Host: www.example.com
User-Agent: Mozilla/5.0
Accept: text/html
Connection: keep-alive
[blank line]
[body — for POST/PUT]
```

### HTTP Response
```
HTTP/1.1 200 OK
Content-Type: text/html
Content-Length: 1234
Date: Thu, 01 Jan 2026 00:00:00 GMT
[blank line]
[HTML body]
```

### Status Codes (MUST KNOW)
| Code | Category | Examples |
|---|---|---|
| 1xx | Informational | 100 Continue |
| 2xx | Success | 200 OK, 201 Created, 204 No Content |
| 3xx | Redirection | 301 Moved Permanently, 302 Found |
| 4xx | Client Error | 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found |
| 5xx | Server Error | 500 Internal Server Error, 503 Service Unavailable |

### HTTP Versions
| Version | Key Feature |
|---|---|
| **HTTP/1.0** | New connection per request |
| **HTTP/1.1** | **Persistent connections** (keep-alive), pipelining |
| **HTTP/2** | **Multiplexing** (multiple requests over one connection), header compression, binary |
| **HTTP/3** | Uses **QUIC** (UDP-based), even faster |

**HTTPS** = HTTP over **TLS/SSL** (Port 443)

### Cookies & Sessions
HTTP is stateless → cookies add state:
```
Server → Client: Set-Cookie: session_id=abc123; Expires=...
Client → Server: Cookie: session_id=abc123 (on every subsequent request)
```

---

## FTP — File Transfer Protocol

**Purpose**: Transfer files between client and server.

**Uses TWO connections**:
- **Control connection** — Port 21 (commands: USER, PASS, LIST, RETR, STOR)
- **Data connection** — Port 20 (actual file data)

**Modes**:
- **Active mode**: Server initiates data connection back to client (problems with NAT/firewalls)
- **Passive mode**: Client initiates both connections (NAT-friendly)

**Commands**:
```
USER username
PASS password
LIST           (list files)
RETR file.txt  (download)
STOR file.txt  (upload)
QUIT
```

---

## Email Protocols

### SMTP — Simple Mail Transfer Protocol
**For sending email.** Port 25 (or 587 for submission).

```
SMTP Communication:
Client: HELO sender.com
Server: 250 Hello
Client: MAIL FROM:<alice@sender.com>
Server: 250 OK
Client: RCPT TO:<bob@receiver.com>
Server: 250 OK
Client: DATA
Server: 354 Start input
Client: Subject: Hello
        Message body here.
        .                    ← single dot = end of message
Server: 250 OK
Client: QUIT
```

### POP3 — Post Office Protocol v3
**For receiving email** (Port 110)
- Downloads emails to local client → deletes from server (by default)
- Simple, one-way sync

### IMAP — Internet Message Access Protocol
**For receiving email** (Port 143)
- Emails remain on server
- Full sync, folder management, read/unread state
- Better for multiple devices

### Email Flow
```
Alice                  Mail Server (sender.com)    Mail Server (receiver.com)      Bob
  |──SMTP──→|                                                                        |
             |──────────────SMTP────────────────→|                                  |
                                                  |──POP3/IMAP──→|
```

---

# 🔐 PART 10: NETWORK SECURITY PRINCIPLES

## Core Security Goals (CIA Triad)
| Goal | Meaning |
|---|---|
| **Confidentiality** | Only authorized parties can read data |
| **Integrity** | Data not modified in transit |
| **Availability** | System available when needed |
| + **Authentication** | Verify identity |
| + **Non-repudiation** | Can't deny sending a message |

---

## Cryptography Fundamentals

### Symmetric Encryption
**Same key** for encryption and decryption.
```
Plaintext → [Encrypt with key K] → Ciphertext → [Decrypt with key K] → Plaintext
```
- Fast, efficient for bulk data
- **Problem**: How to securely share the key?
- Examples: **AES** (Advanced Encryption Standard), DES, 3DES, RC4

### Asymmetric Encryption (Public Key)
**Two keys**: Public key (shared openly) + Private key (secret)
```
Encryption: Plaintext → [Encrypt with Bob's PUBLIC key] → Ciphertext
Decryption: Ciphertext → [Decrypt with Bob's PRIVATE key] → Plaintext

Digital Signature:
Sign:   Message → [Sign with Alice's PRIVATE key] → Signature
Verify: Signature → [Verify with Alice's PUBLIC key] → Valid/Invalid
```
- Slow, used for key exchange and digital signatures
- Examples: **RSA**, Diffie-Hellman, ECC

### Diffie-Hellman Key Exchange
Allows two parties to establish a **shared secret** over an insecure channel without ever transmitting the secret.

```
1. Alice and Bob agree on public values: g=2, p=23 (prime)
2. Alice picks secret a=6: sends A = g^a mod p = 2^6 mod 23 = 18
3. Bob picks secret b=15: sends B = g^b mod p = 2^15 mod 23 = 19
4. Alice computes: B^a mod p = 19^6 mod 23 = 2
5. Bob computes:   A^b mod p = 18^15 mod 23 = 2
   Shared secret = 2 (neither transmitted it!)
```

---

## Hashing (for integrity)
One-way function: any input → fixed-length digest.
```
MD5:    128-bit hash (weak, broken)
SHA-1:  160-bit hash (weak)
SHA-256: 256-bit hash (currently secure)
SHA-3:  Latest standard
```

Properties:
- Same input always gives same hash
- Tiny change in input → completely different hash (avalanche effect)
- Infeasible to reverse
- Infeasible to find two inputs with same hash (collision-resistant)

**HMAC**: Hash + Secret key = Message Authentication Code (proves integrity AND authenticity)

---

## TLS/SSL — Transport Layer Security

**Secures HTTP → HTTPS**. Also used by SMTP, FTP, etc.

```
TLS Handshake:
1. ClientHello: "I support TLS 1.3, these cipher suites..."
2. ServerHello: "Use this cipher suite"
3. Server sends Certificate (contains public key)
4. Client verifies certificate with CA
5. Key Exchange (Diffie-Hellman) → establish session key
6. Both send Finished message (encrypted)
7. Secure channel established → data flows encrypted
```

**Certificate** = Public key + Identity + Digital signature from **CA (Certificate Authority)**

---

## Common Network Attacks

### 1. Man-in-the-Middle (MitM)
Attacker intercepts communication between two parties.
**Defense**: TLS/SSL, certificate pinning

### 2. DoS / DDoS
Overwhelm a server with traffic → make it unavailable.
**DDoS**: Distributed — thousands of bots attack simultaneously
**Defense**: Rate limiting, CDN, filtering

### 3. Phishing
Deceptive emails/websites to steal credentials.

### 4. SQL Injection
Inject malicious SQL through input fields.
**Defense**: Parameterized queries, input validation

### 5. ARP Spoofing
Attacker sends fake ARP replies → maps their MAC to another's IP → intercept traffic.
**Defense**: Dynamic ARP Inspection, static ARP entries

### 6. DNS Spoofing / Cache Poisoning
Inject fake DNS records → redirect users to malicious sites.
**Defense**: DNSSEC (DNS Security Extensions)

### 7. SYN Flood (TCP)
Send millions of SYN packets → server opens half-connections → exhausts resources.
**Defense**: SYN cookies, firewalls, rate limiting

### 8. Replay Attack
Capture valid packets, retransmit them later.
**Defense**: Timestamps, nonces, sequence numbers

---

## Firewalls
Filter traffic based on rules.

| Type | Operates at | How it works |
|---|---|---|
| **Packet Filter** | Network layer | Allow/deny based on IP, port, protocol |
| **Stateful Firewall** | Transport layer | Track connection state; allow only established connections' return traffic |
| **Application Firewall** | Application layer | Deep packet inspection; understand HTTP, FTP etc. |

---

## VPN — Virtual Private Network
Creates an **encrypted tunnel** over the public internet.
- Uses **IPSec** or **TLS**
- Makes traffic appear to come from VPN server's IP
- Encrypts all traffic between client and VPN server

---

# 🧠 NETWORK QUICK REVISION SHEET

```
OSI Layers (top to bottom): App, Pres, Sess, Trans, Net, Data Link, Physical
TCP/IP (top to bottom):     App, Transport, Internet, Network Access

Switching:
  Circuit → dedicated path, PSTN
  Packet  → independent routing, IP
  Virtual Circuit → logical path, ATM

MAC Protocols:
  CSMA/CD → Ethernet (wired)
  CSMA/CA → WiFi (wireless)

Routing:
  Distance Vector → Bellman-Ford, RIP, slow convergence
  Link State      → Dijkstra, OSPF, fast convergence

IP Support:
  ARP  → IP to MAC
  DHCP → auto IP assignment (DORA)
  ICMP → ping, traceroute, error reporting

TCP vs UDP:
  TCP → reliable, ordered, connection-oriented, flow+congestion control
  UDP → fast, connectionless, no guarantees

Key Ports:
  HTTP=80, HTTPS=443, FTP=21/20, SSH=22
  SMTP=25, DNS=53, DHCP=67/68, POP3=110, IMAP=143

TCP Congestion:
  Slow Start → exponential growth
  Congestion Avoidance → linear growth (AIMD)
  Timeout → ssthresh=cwnd/2, cwnd=1, restart
  3 dup ACKs → Fast Retransmit/Recovery

Security:
  Symmetric → same key (AES, DES)
  Asymmetric → public/private key (RSA)
  Hash → integrity (SHA-256)
  TLS → encrypts transport layer
  Firewall → packet/stateful/application level
```

---

That's **every single networking concept** from your syllabus bro — layered architecture, switching, data link, routing, IP, ARP, DHCP, ICMP, NAT, TCP, UDP, all application protocols, and security — all explained deep. Go through this 2-3 times and you're set for Sunday! Which subject is next? 🔥