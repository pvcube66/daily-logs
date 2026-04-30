# Information Security & Cyber Laws — Complete Master Guide 🔐

Let's go through **everything** systematically. I'll make this crystal clear so you can answer any question.

---

## 1. CRYPTOGRAPHY BASICS

### What is Cryptography?
Cryptography is the science of **hiding information** so that only the intended recipient can read it. It converts readable data (**plaintext**) into unreadable form (**ciphertext**).

### Core Concepts

| Term | Meaning |
|------|---------|
| **Plaintext** | Original readable data |
| **Ciphertext** | Encrypted unreadable data |
| **Encryption** | Converting plaintext → ciphertext |
| **Decryption** | Converting ciphertext → plaintext |
| **Key** | Secret value used to encrypt/decrypt |
| **Algorithm/Cipher** | The method/rule used to encrypt |

---

### Types of Cryptography

#### A) Symmetric Key Cryptography
- **Same key** is used for both encryption and decryption
- Fast, good for large data
- Problem: How do you securely share the key?
- **Examples:** AES (Advanced Encryption Standard), DES, 3DES, RC4

```
Sender → [Plaintext + Key] → Encrypt → Ciphertext → Receiver → [Ciphertext + Same Key] → Decrypt → Plaintext
```

**AES** is the gold standard today — used in banking, Wi-Fi (WPA2), file encryption.
**DES** is 56-bit — now considered **weak/broken**.
**3DES** applies DES three times — more secure but slow.

---

#### B) Asymmetric Key Cryptography (Public Key Cryptography)
- Uses a **key pair**: Public Key + Private Key
- **Public Key** → anyone can have it, used to **encrypt**
- **Private Key** → only the owner has it, used to **decrypt**
- Slower than symmetric, but solves the key distribution problem
- **Examples:** RSA, ECC (Elliptic Curve Cryptography), Diffie-Hellman

```
Sender encrypts with Receiver's PUBLIC key → only Receiver's PRIVATE key can decrypt it
```

**RSA** — most widely used. Based on the difficulty of factoring large numbers.
**Diffie-Hellman** — used for **key exchange** (allows two parties to agree on a shared secret over an insecure channel)
**ECC** — stronger with smaller key sizes, used in mobile/IoT

---

#### C) Hashing
- **One-way function** — converts data into a fixed-length hash value
- **Cannot be reversed** (not encryption, just fingerprinting)
- Used to verify data integrity — even 1 character change = completely different hash
- **Examples:** MD5 (128-bit, broken), SHA-1 (broken), **SHA-256, SHA-3** (current standard)

```
"Hello" → SHA-256 → 185f8db32921bd46d35cc2e76b941de5d5f9...
"hello" → SHA-256 → 2cf24dba5fb0a30e26e83b2ac5b9e29e1b1...  ← completely different!
```

**Uses of Hashing:**
- Storing passwords (never store plaintext passwords)
- Digital signatures
- File integrity verification
- Blockchain

---

#### D) Digital Signatures
- Proves **authenticity** (who sent it) and **integrity** (not tampered)
- Sender encrypts a hash of the message with their **private key** → this is the signature
- Receiver decrypts with sender's **public key** → if hash matches, signature is valid

```
Message → Hash → Encrypt with Sender's PRIVATE key = Digital Signature
Receiver: Decrypt signature with Sender's PUBLIC key → Compare hash → Valid!
```

---

#### E) Digital Certificates & PKI
- **Digital Certificate** = a document that links a public key to an identity (like a digital ID card)
- Issued by a **Certificate Authority (CA)** — trusted third party (e.g., DigiCert, VeriSign)
- **PKI (Public Key Infrastructure)** = the entire framework for managing digital certificates

**SSL/TLS** (used in HTTPS) uses PKI to secure web communications.

---

### Key Cryptography Algorithms — Quick Reference

| Algorithm | Type | Key Size | Status |
|-----------|------|----------|--------|
| AES | Symmetric | 128/192/256-bit | ✅ Secure |
| DES | Symmetric | 56-bit | ❌ Broken |
| 3DES | Symmetric | 168-bit | ⚠️ Deprecated |
| RSA | Asymmetric | 2048/4096-bit | ✅ Secure |
| ECC | Asymmetric | 256-bit | ✅ Very Secure |
| MD5 | Hash | 128-bit | ❌ Broken |
| SHA-1 | Hash | 160-bit | ❌ Broken |
| SHA-256 | Hash | 256-bit | ✅ Secure |

---

## 2. AUTHENTICATION MECHANISMS

### What is Authentication?
Verifying **who you are**. Confirming identity before granting access.

### The AAA Framework
- **Authentication** — Who are you? (verify identity)
- **Authorization** — What can you do? (permissions)
- **Accounting/Auditing** — What did you do? (logging)

---

### Authentication Factors (Types)

#### Factor 1 — Something You KNOW
- Passwords, PINs, security questions
- Weakest factor — can be guessed, stolen, phished

#### Factor 2 — Something You HAVE
- OTP (One-Time Password), smart card, hardware token (RSA SecurID), mobile phone (for SMS OTP)
- Stronger — attacker needs physical possession

#### Factor 3 — Something You ARE
- Biometrics: fingerprint, iris scan, face recognition, voice
- Strongest — hardest to fake, but can't be changed if compromised

#### Factor 4 — Somewhere You ARE
- Location-based (GPS, IP address)

---

### Multi-Factor Authentication (MFA)
Using **2 or more factors** together. Even if one is compromised, attacker still can't get in.
- Example: Password (know) + OTP on phone (have) = 2FA

**2FA vs MFA:** 2FA = exactly 2 factors. MFA = 2 or more.

---

### Authentication Protocols

#### Kerberos
- Network authentication protocol used in Windows Active Directory
- Uses **tickets** instead of passwords for service access
- **KDC (Key Distribution Center)** issues tickets
- Process: Client → KDC → gets Ticket Granting Ticket (TGT) → uses TGT to get service tickets → accesses services
- Prevents replay attacks using timestamps

#### LDAP (Lightweight Directory Access Protocol)
- Protocol for accessing directory services (user databases)
- Used to authenticate users against a central directory
- Port 389 (plain), Port 636 (LDAPS — secure)

#### RADIUS (Remote Authentication Dial-In User Service)
- Centralizes authentication for network access (VPN, Wi-Fi, dial-up)
- Client-server model: NAS (Network Access Server) sends credentials to RADIUS server

#### OAuth 2.0
- Authorization framework (not authentication)
- Lets apps access your data on another service **without sharing your password**
- Example: "Login with Google" on a third-party app

#### OpenID Connect
- Authentication layer built **on top of OAuth 2.0**
- Actually verifies identity (who you are), not just authorization

#### SAML (Security Assertion Markup Language)
- XML-based standard for SSO (Single Sign-On) in enterprise environments
- Used between Identity Provider (IdP) and Service Provider (SP)

#### SSO (Single Sign-On)
- Log in once, access multiple applications
- Example: Log into Google → automatically logged into Gmail, Drive, YouTube

---

### Password Security Concepts

- **Salting** — adding a random value to password before hashing, so two users with same password have different hashes
- **Hashing** — always store hashed passwords, never plaintext
- **Password policies** — minimum length, complexity, expiration
- **Brute force attack** — trying all combinations
- **Dictionary attack** — trying common words/passwords
- **Rainbow table attack** — precomputed hash lookup table (defeated by salting)

---

## 3. FIREWALLS

### What is a Firewall?
A security system that **monitors and controls** incoming/outgoing network traffic based on predefined security rules. Acts as a barrier between trusted internal network and untrusted external network.

---

### Types of Firewalls

#### 1. Packet Filtering Firewall (Stateless)
- Inspects individual packets in isolation
- Checks: source IP, destination IP, source port, destination port, protocol
- **Does NOT track connection state**
- Fast but limited — can't detect complex attacks
- Works at **Network Layer (Layer 3)**

#### 2. Stateful Inspection Firewall
- Tracks the **state of active connections**
- Maintains a state table — knows if a packet belongs to an established connection
- Much smarter than packet filtering
- Works at **Network + Transport Layer (Layer 3 & 4)**

#### 3. Application Layer Firewall (Proxy Firewall)
- Inspects traffic at **Application Layer (Layer 7)**
- Understands specific protocols (HTTP, FTP, DNS)
- Can detect malicious content in application data
- Slower but very thorough
- Acts as a proxy — client connects to firewall, firewall connects to server

#### 4. Next-Generation Firewall (NGFW)
- Combines stateful inspection + DPI (Deep Packet Inspection) + application awareness + IPS
- Can identify applications regardless of port (e.g., detect Facebook even if using port 80)
- Examples: Palo Alto, Cisco Firepower, Fortinet

#### 5. WAF (Web Application Firewall)
- Specifically protects **web applications**
- Defends against: SQL injection, XSS, CSRF
- Sits between web server and internet

---

### Firewall Rules
- Rules are processed **top to bottom** — first matching rule wins
- **Default policy:** Allow all (blacklist) or Deny all (whitelist — more secure)
- **DMZ (Demilitarized Zone)** — a subnet that sits between internal network and internet, hosting public-facing servers (web, mail, DNS)

```
Internet → [Outer Firewall] → DMZ (Web Server, Mail Server) → [Inner Firewall] → Internal Network
```

---

### Firewall vs. Other Concepts

| | Firewall | IDS | IPS |
|--|---------|-----|-----|
| **Function** | Filter traffic | Detect attacks | Detect + Block attacks |
| **Position** | Inline (blocks) | Passive (monitors) | Inline (blocks) |
| **Action** | Allow/Deny | Alert | Alert + Block |

---

## 4. IDS AND IPS

### IDS — Intrusion Detection System

**What it does:** Monitors network/system for suspicious activity and **generates alerts**. It does NOT block traffic — just watches and reports.

**Analogy:** A security camera that records and alerts but doesn't physically stop anyone.

#### Types of IDS

**A) Based on Location:**
- **NIDS (Network-based IDS)** — monitors network traffic at a specific point. Example: Snort, Suricata
- **HIDS (Host-based IDS)** — monitors a specific host (logs, file system, processes). Example: OSSEC, Tripwire

**B) Based on Detection Method:**
- **Signature-based Detection** — compares traffic against known attack signatures (like antivirus). Fast, accurate for known threats. **Cannot detect zero-day attacks.**
- **Anomaly-based Detection** — establishes a baseline of normal behavior, flags deviations. Can detect new attacks but higher false positive rate.
- **Heuristic-based Detection** — uses rules and algorithms to identify suspicious behavior patterns.

#### IDS Alerts
- **True Positive** — correctly identified a real attack ✅
- **False Positive** — flagged normal traffic as attack ❌ (annoying but harmless)
- **True Negative** — correctly identified normal traffic ✅
- **False Negative** — missed a real attack ❌ (dangerous!)

---

### IPS — Intrusion Prevention System

**What it does:** Everything IDS does, PLUS it **actively blocks/prevents** detected threats in real-time.

**Analogy:** A security guard who both watches AND physically stops intruders.

- Sits **inline** (all traffic passes through it)
- Can: drop malicious packets, reset connections, block IP addresses, send alerts

#### Types of IPS
- **NIPS (Network-based IPS)** — inline on network
- **HIPS (Host-based IPS)** — on individual hosts
- **WIPS (Wireless IPS)** — monitors wireless networks

---

### IDS vs IPS — Key Difference

| | IDS | IPS |
|--|-----|-----|
| **Mode** | Passive (out-of-band) | Active (inline) |
| **Action** | Only alerts | Alerts + Blocks |
| **Network impact** | No impact | Can become bottleneck |
| **False positive risk** | Low risk | High risk (blocks legitimate traffic) |

---

### Honeypot
- A **decoy system** designed to attract attackers
- Looks like a real target but is isolated
- Used to study attack techniques and distract attackers from real systems
- **Honeynet** = network of honeypots

---

## 5. MALWARE

### What is Malware?
**Malicious software** designed to damage, disrupt, or gain unauthorized access to systems.

---

### Types of Malware

#### 1. Virus
- Attaches itself to **legitimate files/programs**
- Spreads when infected file is executed
- Requires **human action** to spread
- Can corrupt/delete files
- Example: ILOVEYOU, Melissa

#### 2. Worm
- **Self-replicating** — spreads automatically without human action
- Travels across networks exploiting vulnerabilities
- Consumes bandwidth and resources
- Example: WannaCry, Conficker, Morris Worm

#### 3. Trojan Horse
- Disguised as **legitimate software**
- Does not self-replicate
- Once installed, opens backdoors, steals data, downloads more malware
- Example: Zeus (banking trojan), RAT (Remote Access Trojan)

#### 4. Ransomware
- Encrypts victim's files and demands **ransom** for decryption key
- Modern variants also threaten to leak data (double extortion)
- Spreads via phishing emails, RDP vulnerabilities
- Example: WannaCry, REvil, LockBit, NotPetya

#### 5. Spyware
- Secretly **monitors user activity** — keystrokes, browsing, credentials
- Sends collected data to attacker
- Example: Pegasus, FinFisher

#### 6. Adware
- Displays **unwanted advertisements**
- Often bundled with free software
- Less harmful but annoying and can slow system

#### 7. Rootkit
- Hides itself and other malware **deep in the OS**
- Gains root/admin level access
- Very difficult to detect and remove
- Can persist even after OS reinstall (bootkit/firmware rootkit)

#### 8. Keylogger
- Records **every keystroke** typed by user
- Captures passwords, credit card numbers, messages
- Can be software or hardware

#### 9. Botnet
- Network of infected computers (**bots/zombies**) controlled by attacker (**botmaster**)
- Used for: DDoS attacks, spam, crypto mining, credential stuffing
- Command & Control (C2/C&C) server controls the bots
- Example: Mirai botnet (attacked IoT devices)

#### 10. Backdoor
- Secret entry point into a system, bypassing normal authentication
- Left by attackers after initial compromise for persistent access

#### 11. Logic Bomb
- Malicious code that **activates when specific conditions are met**
- Example: triggers on a specific date or when a specific user logs in

#### 12. Fileless Malware
- Operates **entirely in memory** (RAM), no files written to disk
- Harder to detect by traditional antivirus
- Uses legitimate tools like PowerShell, WMI

---

### Malware Delivery Methods
- **Phishing emails** with malicious attachments or links
- **Drive-by downloads** — visiting malicious websites
- **USB/removable media**
- **Software vulnerabilities** (unpatched systems)
- **Social engineering**
- **Malvertising** — malicious ads

---

### Malware Prevention
- Keep systems **patched/updated**
- Use **antivirus/anti-malware** software
- **Least privilege** principle
- **User education** — recognize phishing
- Regular **backups**
- **Email filtering**
- **Application whitelisting**

---

## 6. SECURE CODING PRACTICES

### Why Secure Coding?
Most security breaches exploit **vulnerabilities in code**. Writing secure code from the start is cheaper than fixing it later (Security by Design).

---

### OWASP Top 10 (Most Critical Web Security Risks)

#### 1. Injection (SQL Injection, Command Injection)
- Attacker inserts malicious code into input fields
- **SQL Injection example:**
```sql
Username: admin' OR '1'='1
Query becomes: SELECT * FROM users WHERE username='admin' OR '1'='1'
-- This returns all users! Attacker bypasses login
```
- **Prevention:** Use **parameterized queries/prepared statements**, input validation, stored procedures

#### 2. Broken Authentication
- Weak session management, predictable tokens, credential stuffing
- **Prevention:** MFA, strong session tokens, account lockout, secure password storage

#### 3. Sensitive Data Exposure
- Storing/transmitting sensitive data without encryption
- **Prevention:** Encrypt data at rest and in transit (TLS), don't store unnecessary sensitive data

#### 4. XML External Entity (XXE)
- Attacker exploits XML parsers to read files, SSRF, DoS
- **Prevention:** Disable external entity processing in XML parsers

#### 5. Broken Access Control
- Users accessing resources/functions they shouldn't
- Example: changing URL from `/user/123` to `/user/124` to see another user's data
- **Prevention:** Server-side access control checks, deny by default

#### 6. Security Misconfiguration
- Default passwords, unnecessary features enabled, error messages exposing details
- **Prevention:** Secure defaults, regular configuration audits, disable unnecessary services

#### 7. XSS — Cross-Site Scripting
- Attacker injects malicious **JavaScript** into web pages viewed by other users
- **Types:**
  - **Stored XSS** — malicious script stored in database
  - **Reflected XSS** — malicious script in URL
  - **DOM-based XSS** — client-side manipulation
- **Prevention:** Input validation, output encoding, Content Security Policy (CSP)

#### 8. Insecure Deserialization
- Manipulating serialized objects to execute arbitrary code
- **Prevention:** Validate serialized data, avoid deserializing untrusted data

#### 9. Using Components with Known Vulnerabilities
- Using outdated libraries/frameworks with known CVEs
- **Prevention:** Regularly update dependencies, use Software Composition Analysis (SCA) tools

#### 10. Insufficient Logging & Monitoring
- Not logging security events, not detecting breaches
- **Prevention:** Log all authentication events, monitor logs, set up alerts

---

### Secure Coding Principles

#### Input Validation
- **Never trust user input** — validate everything on the server side
- Whitelist acceptable inputs (not just blacklist bad ones)
- Validate type, length, format, range

#### Output Encoding
- Encode data before displaying it to prevent XSS
- HTML encode: `<` becomes `&lt;`, `>` becomes `&gt;`

#### Principle of Least Privilege
- Give code/users only the minimum permissions needed
- A web app shouldn't run as root/admin

#### Error Handling
- Never expose stack traces, database errors, or system info to users
- Log detailed errors internally, show generic messages externally

#### Secure Session Management
- Use long, random session IDs
- Invalidate sessions on logout
- Set session timeout
- Use **HttpOnly** and **Secure** flags on cookies

#### CSRF — Cross-Site Request Forgery
- Tricks authenticated user's browser into making unwanted requests
- **Prevention:** CSRF tokens, SameSite cookie attribute, checking Origin/Referer header

#### Buffer Overflow
- Writing more data than a buffer can hold, overwriting adjacent memory
- Can allow code execution
- **Prevention:** Use memory-safe languages, bounds checking, ASLR, DEP/NX

#### Defense in Depth
- Multiple layers of security — if one fails, others still protect

#### Secure SDLC (Software Development Life Cycle)
- Integrate security at every phase: Requirements → Design → Development → Testing → Deployment → Maintenance
- **SAST** (Static Application Security Testing) — analyze source code without executing
- **DAST** (Dynamic Application Security Testing) — test running application
- **Penetration testing** before release

---

## 7. RISK MANAGEMENT

### Core Risk Concepts

**Risk = Threat × Vulnerability × Impact**

| Term | Meaning |
|------|---------|
| **Asset** | Anything of value (data, hardware, software, people) |
| **Threat** | Potential cause of harm (hacker, natural disaster, insider) |
| **Vulnerability** | Weakness that can be exploited |
| **Risk** | Probability that a threat exploits a vulnerability causing harm |
| **Impact** | The damage caused if risk occurs |
| **Likelihood** | Probability of risk occurring |
| **Control/Safeguard** | Measure taken to reduce risk |

---

### Risk Management Process (NIST Framework)

#### Step 1: Risk Identification
- Identify all assets
- Identify threats and vulnerabilities
- Tools: asset inventory, threat modeling, vulnerability scanning

#### Step 2: Risk Assessment/Analysis

**Quantitative Analysis:**
- Uses numerical values (money)
- **AV (Asset Value)** — value of the asset
- **EF (Exposure Factor)** — % of asset lost in an incident
- **SLE (Single Loss Expectancy)** = AV × EF
- **ARO (Annualized Rate of Occurrence)** — how often threat occurs per year
- **ALE (Annualized Loss Expectancy)** = SLE × ARO
- Used to justify security spending: if countermeasure costs less than ALE, it's worth it

**Qualitative Analysis:**
- Uses subjective ratings (High/Medium/Low, 1-5 scale)
- Easier to perform, doesn't require exact dollar values
- Risk Matrix: Likelihood vs Impact

#### Step 3: Risk Treatment (Response)

| Strategy | Meaning | Example |
|----------|---------|---------|
| **Risk Avoidance** | Eliminate the activity causing risk | Stop storing credit cards |
| **Risk Mitigation/Reduction** | Reduce likelihood or impact | Install firewall, patch systems |
| **Risk Transfer** | Shift risk to another party | Buy cyber insurance, outsource |
| **Risk Acceptance** | Accept the risk as-is | Low-impact risks with high mitigation cost |

#### Step 4: Risk Monitoring
- Continuously monitor risks and controls
- Regular audits, vulnerability assessments, penetration testing

---

### Security Frameworks & Standards

- **NIST Cybersecurity Framework (CSF)** — Identify, Protect, Detect, Respond, Recover
- **ISO/IEC 27001** — International standard for Information Security Management Systems (ISMS)
- **ISO 27002** — Code of practice for information security controls
- **COBIT** — IT governance framework
- **PCI DSS** — Payment Card Industry Data Security Standard

---

### Business Continuity & Disaster Recovery

- **BCP (Business Continuity Plan)** — keeps business running during/after disaster
- **DRP (Disaster Recovery Plan)** — restores IT systems after disaster
- **RTO (Recovery Time Objective)** — maximum acceptable downtime
- **RPO (Recovery Point Objective)** — maximum acceptable data loss (how old can backup be)
- **MTTR (Mean Time To Recover)** — average time to restore system
- **MTBF (Mean Time Between Failures)** — average time between system failures

---

## 8. CYBER LAWS

### Indian Cyber Laws

#### IT Act 2000 (Information Technology Act)
India's primary cyber law. Amended in 2008 (IT Amendment Act 2008).

**Key Provisions:**

| Section | Offence | Punishment |
|---------|---------|------------|
| **Section 43** | Unauthorized access, downloading, introducing virus, damage to computer | Compensation up to ₹1 crore |
| **Section 65** | Tampering with computer source documents | Up to 3 years imprisonment / ₹2 lakh fine |
| **Section 66** | Computer-related offences (hacking) | Up to 3 years / ₹5 lakh fine |
| **Section 66A** | Sending offensive/false messages (struck down by SC in 2015) | — |
| **Section 66B** | Dishonestly receiving stolen computer resource | Up to 3 years / ₹1 lakh fine |
| **Section 66C** | Identity theft | Up to 3 years / ₹1 lakh fine |
| **Section 66D** | Cheating by personation using computer | Up to 3 years / ₹1 lakh fine |
| **Section 66E** | Violation of privacy (capturing/publishing private images) | Up to 3 years / ₹2 lakh fine |
| **Section 66F** | Cyber terrorism | Life imprisonment |
| **Section 67** | Publishing obscene material in electronic form | Up to 5 years / ₹10 lakh fine |
| **Section 69** | Power to intercept/monitor/decrypt information | Up to 7 years |
| **Section 70** | Protected systems | Up to 10 years |
| **Section 72** | Breach of confidentiality and privacy | Up to 2 years / ₹1 lakh fine |

**Important Provisions of IT Act 2008 Amendment:**
- Recognized **electronic signatures** (not just digital signatures)
- Added cyber terrorism (66F)
- Added provisions for intermediary liability
- CERT-In (Computer Emergency Response Team India) given statutory recognition

---

### International Cyber Laws

- **GDPR (General Data Protection Regulation)** — EU law, protects EU citizens' personal data, applies globally if handling EU data. Heavy fines: up to €20 million or 4% of global turnover.
- **CFAA (Computer Fraud and Abuse Act)** — US federal law against unauthorized computer access
- **DMCA (Digital Millennium Copyright Act)** — US copyright law for digital content
- **Budapest Convention** — first international treaty on cybercrime

---

### Data Privacy Laws in India

- **DPDP Act 2023 (Digital Personal Data Protection Act)** — India's comprehensive data privacy law
  - Establishes rights of **Data Principals** (individuals)
  - Duties of **Data Fiduciaries** (organizations processing data)
  - Requires **consent** for data processing
  - Right to erasure, correction, grievance redressal
  - **Data Protection Board** for adjudication
  - Heavy penalties for breaches

---

### Intellectual Property in Cyber Law
- **Copyright** — protects software code, digital content automatically
- **Patent** — protects inventions (software patents controversial)
- **Trademark** — protects brand names, logos
- **Trade Secret** — protects confidential business information

---

## 9. ETHICAL HACKING

### What is Ethical Hacking?
**Authorized** attempt to gain unauthorized access to a system, with the goal of finding vulnerabilities before malicious hackers do. Also called **penetration testing** or **white-hat hacking**.

---

### Types of Hackers

| Type | Description |
|------|-------------|
| **White Hat** | Ethical hacker, authorized testing |
| **Black Hat** | Malicious hacker, illegal activities |
| **Grey Hat** | Hacks without permission but no malicious intent, may disclose to vendor |
| **Script Kiddie** | Uses existing tools without understanding them |
| **Hacktivist** | Hacks for political/social cause (e.g., Anonymous) |
| **State-sponsored** | Government-backed hackers, cyber espionage |
| **Insider Threat** | Employee/contractor misusing access |

---

### Penetration Testing Phases (CEH Methodology)

#### Phase 1: Reconnaissance (Information Gathering)
- Collect information about target **without touching the system**
- **Passive Recon** — OSINT (Open Source Intelligence), Google dorking, WHOIS, LinkedIn, Shodan
- **Active Recon** — directly interacting with target (ping, traceroute, port scanning)
- Tools: Maltego, theHarvester, Recon-ng, WHOIS

#### Phase 2: Scanning & Enumeration
- Discover open ports, services, OS, vulnerabilities
- **Port Scanning** — identify open ports (Nmap)
- **Vulnerability Scanning** — find known vulnerabilities (Nessus, OpenVAS)
- **Enumeration** — extract detailed info (usernames, shares, services)
- Tools: Nmap, Nessus, Nikto, Metasploit

#### Phase 3: Gaining Access (Exploitation)
- Exploit discovered vulnerabilities
- SQL injection, buffer overflow, password attacks, social engineering
- Tools: Metasploit, SQLmap, Burp Suite, John the Ripper, Hashcat

#### Phase 4: Maintaining Access
- Establish persistent access (backdoors, rootkits)
- Create additional accounts, schedule tasks
- This phase is done in authorized testing to demonstrate impact

#### Phase 5: Covering Tracks
- Clear logs, hide malicious files
- In ethical hacking: documenting what an attacker would do

#### Phase 6: Reporting
- Document all findings, vulnerabilities, proof of exploitation, risk ratings
- Provide remediation recommendations

---

### Types of Penetration Testing

| Type | Knowledge Level |
|------|----------------|
| **Black Box** | No knowledge of system (simulates external attacker) |
| **White Box** | Full knowledge (source code, architecture, credentials) |
| **Grey Box** | Partial knowledge (some credentials, network diagrams) |

---

### Common Hacking Techniques

#### Social Engineering
- Manipulating people rather than systems
- **Phishing** — mass fraudulent emails
- **Spear Phishing** — targeted phishing (specific person/org)
- **Whaling** — targeting executives/C-level
- **Vishing** — voice phishing (phone calls)
- **Smishing** — SMS phishing
- **Pretexting** — fabricating a scenario to extract info
- **Baiting** — leaving infected USB drives
- **Tailgating/Piggybacking** — physically following someone into restricted area

#### Network Attacks
- **Man-in-the-Middle (MitM)** — intercept communications between two parties
- **ARP Poisoning** — associate attacker's MAC with legitimate IP
- **DNS Spoofing/Poisoning** — corrupt DNS cache to redirect traffic
- **DoS (Denial of Service)** — overwhelm system to make it unavailable
- **DDoS (Distributed DoS)** — DoS from multiple sources (botnet)
- **Replay Attack** — capture and retransmit valid data packets
- **Session Hijacking** — steal session token to impersonate user
- **Sniffing** — capturing network packets (Wireshark, tcpdump)

#### Password Attacks
- **Brute Force** — try all combinations
- **Dictionary Attack** — use wordlist
- **Rainbow Table** — precomputed hash table
- **Credential Stuffing** — use leaked username/password pairs

---

### Important Security Tools

| Tool | Purpose |
|------|---------|
| **Nmap** | Network/port scanning |
| **Metasploit** | Exploitation framework |
| **Wireshark** | Network packet analyzer |
| **Burp Suite** | Web application testing |
| **Nessus** | Vulnerability scanner |
| **John the Ripper** | Password cracking |
| **Hashcat** | GPU-based password cracking |
| **SQLmap** | Automated SQL injection |
| **Aircrack-ng** | Wi-Fi security auditing |
| **Kali Linux** | Security-focused Linux distro |

---

### CVE & Vulnerability Databases
- **CVE (Common Vulnerabilities and Exposures)** — standardized IDs for known vulnerabilities (e.g., CVE-2021-44228 = Log4Shell)
- **CVSS (Common Vulnerability Scoring System)** — rates vulnerability severity 0-10
- **NVD (National Vulnerability Database)** — US government database of CVEs
- **0-day (Zero-day)** — vulnerability unknown to vendor, no patch exists

---

## 10. DATA PRIVACY & COMPLIANCE

### Privacy Principles (from GDPR & globally accepted)

1. **Lawfulness, Fairness, Transparency** — process data legally and openly
2. **Purpose Limitation** — collect data only for specified purposes
3. **Data Minimization** — collect only what's necessary
4. **Accuracy** — keep data accurate and up to date
5. **Storage Limitation** — don't keep data longer than needed
6. **Integrity & Confidentiality** — secure the data
7. **Accountability** — be responsible for compliance

---

### Individual Rights (GDPR/DPDP)
- **Right to Access** — see what data is held about you
- **Right to Rectification** — correct inaccurate data
- **Right to Erasure** ("Right to be Forgotten") — delete your data
- **Right to Portability** — receive your data in a machine-readable format
- **Right to Object** — object to processing
- **Right not to be subject to automated decision-making**

---

### Data Classification
- **Public** — can be shared freely
- **Internal/Private** — internal use only
- **Confidential** — sensitive business data, limited access
- **Restricted/Top Secret** — highest sensitivity, strict controls

---

### Compliance Standards

| Standard | Applies To |
|----------|-----------|
| **PCI DSS** | Any org handling credit/debit card data |
| **HIPAA** | Healthcare data (US) |
| **GDPR** | Personal data of EU residents |
| **DPDP Act 2023** | Personal data in India |
| **SOX (Sarbanes-Oxley)** | Financial data of publicly traded US companies |
| **ISO 27001** | Information security management |

---

### Security Incident Response

#### NIST Incident Response Lifecycle
1. **Preparation** — policies, tools, training
2. **Detection & Analysis** — identify and confirm incident
3. **Containment** — limit damage (short-term + long-term containment)
4. **Eradication** — remove malware, close vulnerabilities
5. **Recovery** — restore systems, verify functionality
6. **Post-Incident Activity** — lessons learned, report

---

### CERT-In (Indian Context)
- **Computer Emergency Response Team — India**
- National nodal agency for cybersecurity
- Under Ministry of Electronics and IT (MeitY)
- Issues security advisories, handles cyber incidents
- CERT-In Directions 2022: Organizations must report cyber incidents within **6 hours**

---

## QUICK REVISION — KEY TERMS CHEAT SHEET

| Term | One-line Definition |
|------|-------------------|
| **AES** | Symmetric encryption standard, 128/256-bit |
| **RSA** | Asymmetric encryption, uses public/private key pair |
| **SHA-256** | Secure hash function, 256-bit output |
| **PKI** | Framework for managing digital certificates |
| **MFA** | Authentication using 2+ factors |
| **Firewall** | Filters network traffic based on rules |
| **IDS** | Detects intrusions, alerts only |
| **IPS** | Detects AND blocks intrusions |
| **NIDS** | Network-based IDS |
| **HIDS** | Host-based IDS |
| **Ransomware** | Encrypts files, demands ransom |
| **Botnet** | Network of infected computers under attacker control |
| **Rootkit** | Hides malware deep in OS |
| **SQL Injection** | Inserting SQL code into input fields |
| **XSS** | Injecting malicious scripts into web pages |
| **CSRF** | Forging requests using victim's authenticated session |
| **OWASP** | Organization publishing top web security risks |
| **Phishing** | Fraudulent emails to steal credentials |
| **Zero-day** | Unknown vulnerability, no patch |
| **CVE** | Standard ID for known vulnerabilities |
| **ALE** | Annual financial loss expectancy from a risk |
| **RPO** | Max acceptable data loss |
| **RTO** | Max acceptable downtime |
| **GDPR** | EU data privacy regulation |
| **IT Act 2000** | India's cyber law |
| **DPDP Act 2023** | India's data protection law |
| **CERT-In** | India's national cyber incident response team |
| **White Hat** | Ethical/authorized hacker |
| **Pen Testing** | Authorized simulated attack to find vulnerabilities |

---

You're now covered on **every single topic** in Section 8. Give me the next subject and we'll crush that too! 💪