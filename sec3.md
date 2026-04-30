# Programming Concepts — Complete Master Guide 💻

This is a BIG section. Let's absolutely cook through every topic.

---

## 1. OOP — CORE PRINCIPLES

OOP is a programming paradigm that organizes code around **objects** (data + behavior) rather than functions and logic.

### The 4 Pillars of OOP

#### 1. Encapsulation
- Bundling **data (fields) + methods** that operate on that data into a single unit (class)
- Hiding internal implementation details from outside — **data hiding**
- Achieved using **access modifiers**

```java
class BankAccount {
    private double balance;  // hidden from outside

    public void deposit(double amount) {  // controlled access
        if (amount > 0) balance += amount;
    }

    public double getBalance() {  // getter
        return balance;
    }
}
```

**Access Modifiers in Java:**

| Modifier | Same Class | Same Package | Subclass | Everywhere |
|----------|-----------|--------------|----------|------------|
| **private** | ✅ | ❌ | ❌ | ❌ |
| **default** | ✅ | ✅ | ❌ | ❌ |
| **protected** | ✅ | ✅ | ✅ | ❌ |
| **public** | ✅ | ✅ | ✅ | ✅ |

---

#### 2. Inheritance
- A class (**child/subclass**) acquires properties and methods of another class (**parent/superclass**)
- Promotes **code reuse**
- `extends` keyword in Java, Python uses parentheses

```java
class Animal {
    String name;
    void eat() { System.out.println("eating"); }
}

class Dog extends Animal {
    void bark() { System.out.println("woof"); }
}

// Dog has both eat() AND bark()
Dog d = new Dog();
d.eat();   // inherited
d.bark();  // own method
```

**Types of Inheritance:**
- **Single** — one parent, one child
- **Multilevel** — A → B → C (chain)
- **Hierarchical** — one parent, multiple children
- **Multiple** — multiple parents (Java doesn't support with classes, only with **interfaces**)
- **Hybrid** — combination (Java handles via interfaces)

**`super` keyword** — call parent class constructor or method
**`final` class** — cannot be inherited
**`final` method** — cannot be overridden

---

#### 3. Polymorphism
- Same interface, **different implementations**. "Many forms."

**A) Compile-time Polymorphism — Method Overloading**
- Same method name, different parameters (type/number)
- Resolved at **compile time** (static binding)

```java
class Calculator {
    int add(int a, int b) { return a + b; }
    double add(double a, double b) { return a + b; }  // overloaded
    int add(int a, int b, int c) { return a + b + c; } // overloaded
}
```

**B) Runtime Polymorphism — Method Overriding**
- Child class provides its own implementation of parent's method
- Resolved at **runtime** (dynamic binding)
- Requires **same method signature** (name + parameters)

```java
class Shape {
    void draw() { System.out.println("Drawing shape"); }
}

class Circle extends Shape {
    @Override
    void draw() { System.out.println("Drawing circle"); }  // overridden
}

Shape s = new Circle();  // parent reference, child object
s.draw();  // prints "Drawing circle" — runtime decides!
```

**Key Rule:** Overloading = same name, different params. Overriding = same name, same params, different class.

---

#### 4. Abstraction
- Hiding **implementation details**, showing only **essential features**
- "What it does" vs "how it does it"
- Achieved via **Abstract Classes** and **Interfaces**

**Abstract Class:**
- Cannot be instantiated directly
- Can have both abstract (no body) and concrete (with body) methods
- Use `abstract` keyword

```java
abstract class Vehicle {
    abstract void start();  // no body — must be implemented by subclass

    void stop() {           // concrete — has body
        System.out.println("Vehicle stopped");
    }
}

class Car extends Vehicle {
    @Override
    void start() { System.out.println("Car started"); }
}
```

**Interface:**
- 100% abstraction (before Java 8)
- All methods are public and abstract by default
- A class can **implement multiple interfaces** (solves multiple inheritance)
- Java 8+: can have `default` and `static` methods

```java
interface Flyable {
    void fly();  // abstract by default
}

interface Swimmable {
    void swim();
}

class Duck implements Flyable, Swimmable {
    public void fly() { System.out.println("Duck flying"); }
    public void swim() { System.out.println("Duck swimming"); }
}
```

**Abstract Class vs Interface:**

| | Abstract Class | Interface |
|--|---------------|-----------|
| **Instantiation** | ❌ | ❌ |
| **Constructor** | ✅ | ❌ |
| **Variables** | Any type | public static final (constants) |
| **Methods** | Abstract + Concrete | Abstract (default/static in Java 8+) |
| **Inheritance** | Single | Multiple |
| **Use when** | Shared base behavior | Define a contract/capability |

---

### Other Key OOP Concepts

**Constructor** — special method called when object is created, same name as class, no return type
**Destructor** — called when object is destroyed (Java has `finalize()`, Python has `__del__`)
**`this` keyword** — refers to current object
**Static** — belongs to class, not instance. Shared across all objects.
**Object** — instance of a class. `Dog d = new Dog();`
**Class** — blueprint/template for creating objects

---

## 2. ADVANCED JAVA / J2EE FUNDAMENTALS

### Java Basics Review

#### Java Memory Model
- **Stack** — stores local variables, method calls (LIFO)
- **Heap** — stores objects and instance variables
- **Method Area** — stores class-level data, static variables, bytecode
- **Garbage Collector** — automatically frees heap memory of unreferenced objects

---

### Collections Framework

The Java Collections Framework provides ready-made data structures.

```
Collection (Interface)
├── List (Interface) — ordered, allows duplicates
│   ├── ArrayList — dynamic array, fast random access, O(1) get
│   ├── LinkedList — doubly linked, fast insert/delete, O(n) get
│   └── Vector — synchronized ArrayList (thread-safe, slower)
├── Set (Interface) — no duplicates
│   ├── HashSet — unordered, O(1) operations, uses hashing
│   ├── LinkedHashSet — maintains insertion order
│   └── TreeSet — sorted order, O(log n) operations
└── Queue (Interface)
    ├── PriorityQueue — elements ordered by priority
    └── LinkedList — also implements Queue

Map (Interface) — key-value pairs (not a Collection)
├── HashMap — unordered, O(1) operations, allows one null key
├── LinkedHashMap — maintains insertion order
├── TreeMap — sorted by key, O(log n)
└── Hashtable — synchronized, no null keys/values
```

**Key differences to remember:**
- **ArrayList vs LinkedList:** ArrayList better for read, LinkedList better for insert/delete
- **HashMap vs Hashtable:** HashMap not synchronized (faster), Hashtable synchronized (thread-safe)
- **HashSet vs TreeSet:** HashSet O(1) but unordered, TreeSet sorted but O(log n)

---

### Exception Handling

```java
try {
    // risky code
    int result = 10 / 0;
} catch (ArithmeticException e) {
    // handle specific exception
    System.out.println("Cannot divide by zero: " + e.getMessage());
} catch (Exception e) {
    // handle any exception (catch-all)
} finally {
    // always executes, used for cleanup (close files, DB connections)
    System.out.println("This always runs");
}
```

**Exception Hierarchy:**
```
Throwable
├── Error (JVM errors — don't catch: OutOfMemoryError, StackOverflowError)
└── Exception
    ├── Checked Exceptions (must handle: IOException, SQLException)
    └── Unchecked/RuntimeException (optional: NullPointerException, ArrayIndexOutOfBoundsException)
```

- **`throw`** — manually throw an exception: `throw new IllegalArgumentException("bad input");`
- **`throws`** — declare that method may throw exception: `void readFile() throws IOException {}`
- **Custom Exception** — extend Exception class

---

### Multithreading

**Thread** — lightweight unit of execution within a process. Threads share memory.

**Creating Threads:**
```java
// Method 1: Extend Thread
class MyThread extends Thread {
    public void run() { System.out.println("Thread running"); }
}
MyThread t = new MyThread();
t.start();  // NOT t.run() — start() creates new thread

// Method 2: Implement Runnable (preferred)
class MyRunnable implements Runnable {
    public void run() { System.out.println("Runnable running"); }
}
Thread t = new Thread(new MyRunnable());
t.start();
```

**Thread Lifecycle:** New → Runnable → Running → Blocked/Waiting → Terminated

**Thread States:**
- `start()` — moves to Runnable
- `sleep(ms)` — pauses for ms milliseconds
- `wait()` — waits for notify()
- `notify()` — wakes one waiting thread
- `join()` — wait for another thread to finish

**Synchronization** — prevents race conditions when multiple threads access shared data
```java
synchronized void increment() {  // only one thread at a time
    count++;
}
```

**Deadlock** — two threads each waiting for the other to release a lock. Prevented by lock ordering, timeouts.

---

### Java 8+ Features

**Lambda Expressions** — anonymous functions, make functional programming possible
```java
// Old way
Runnable r = new Runnable() {
    public void run() { System.out.println("Running"); }
};

// Lambda way
Runnable r = () -> System.out.println("Running");

// With parameters
List<Integer> nums = Arrays.asList(3, 1, 2);
nums.sort((a, b) -> a - b);  // lambda comparator
```

**Stream API** — process collections in a functional style
```java
List<String> names = Arrays.asList("Alice", "Bob", "Charlie", "Anna");

names.stream()
     .filter(n -> n.startsWith("A"))   // filter
     .map(String::toUpperCase)          // transform
     .sorted()                          // sort
     .forEach(System.out::println);     // terminal operation
// Output: ALICE, ANNA
```

**Optional** — wrapper to avoid NullPointerException
```java
Optional<String> name = Optional.ofNullable(getName());
name.ifPresent(n -> System.out.println(n));
String result = name.orElse("Default");
```

**Default Methods in Interfaces** — interfaces can have method bodies
```java
interface Greet {
    default void hello() { System.out.println("Hello!"); }
}
```

---

### J2EE (Java EE / Jakarta EE) Fundamentals

J2EE is Java platform for **enterprise applications** — multi-tier, distributed, web-based.

#### J2EE Architecture (3-Tier)
```
Client Tier          Middle Tier (Application Server)       Data Tier
(Browser/App) ←→ [Web Tier: Servlets/JSP] ←→ [Business Tier: EJB] ←→ [Database]
```

---

#### Servlets
- Java classes that handle **HTTP requests** and generate responses
- Run inside a **Servlet Container** (Tomcat)
- Lifecycle: `init()` → `service()` → `destroy()`

```java
@WebServlet("/hello")
public class HelloServlet extends HttpServlet {
    protected void doGet(HttpServletRequest req, HttpServletResponse res)
            throws ServletException, IOException {
        res.setContentType("text/html");
        PrintWriter out = res.getWriter();
        out.println("<h1>Hello World</h1>");
    }

    protected void doPost(HttpServletRequest req, HttpServletResponse res) {
        String name = req.getParameter("name");  // get form data
        // process...
    }
}
```

**Servlet Lifecycle:**
1. `init()` — called once when servlet is first loaded
2. `service()` — called for every request (dispatches to doGet/doPost)
3. `destroy()` — called when servlet is unloaded

**Session Management in Servlets:**
- **Cookies** — small data stored in browser
- **URL Rewriting** — session ID appended to URL
- **HttpSession** — server-side session object

```java
HttpSession session = req.getSession();
session.setAttribute("user", username);
String user = (String) session.getAttribute("user");
```

---

#### JSP (JavaServer Pages)
- HTML with embedded Java code — simpler than servlets for view layer
- JSP is compiled into a Servlet internally

```jsp
<%@ page language="java" %>
<html>
<body>
    <%  // Scriptlet — Java code
        String name = request.getParameter("name");
    %>
    <h1>Hello, <%= name %>!</h1>  <!-- Expression -->

    <%! int count = 0; %>  <!-- Declaration -->
</body>
</html>
```

**JSP Tags:**
- `<% %>` — Scriptlet (Java code)
- `<%= %>` — Expression (outputs value)
- `<%! %>` — Declaration (class-level variable/method)
- `<%@ %>` — Directive (page, include, taglib)
- `${expression}` — EL (Expression Language)
- `<c:forEach>` — JSTL tag

---

#### JDBC (Java Database Connectivity)
- API for connecting Java to databases

```java
// Step 1: Load driver
Class.forName("com.mysql.jdbc.Driver");

// Step 2: Get connection
Connection con = DriverManager.getConnection(
    "jdbc:mysql://localhost:3306/mydb", "username", "password");

// Step 3: Create statement
PreparedStatement ps = con.prepareStatement(
    "SELECT * FROM users WHERE id = ?");
ps.setInt(1, 101);

// Step 4: Execute query
ResultSet rs = ps.executeQuery();

// Step 5: Process results
while (rs.next()) {
    System.out.println(rs.getString("name"));
}

// Step 6: Close
rs.close(); ps.close(); con.close();
```

**Statement vs PreparedStatement:**
- **Statement** — simple queries, vulnerable to SQL injection
- **PreparedStatement** — parameterized, prevents SQL injection, precompiled (faster)
- **CallableStatement** — calls stored procedures

**Connection Pooling** — reusing database connections instead of creating new ones each time. Libraries: HikariCP, Apache DBCP, C3P0.

---

#### EJB (Enterprise JavaBeans)
- Server-side components for business logic
- Types: **Session Beans** (stateless, stateful, singleton), **Message-Driven Beans**
- Largely replaced by Spring Framework in modern development

---

#### JPA (Java Persistence API) & Hibernate
- ORM (Object-Relational Mapping) — maps Java objects to database tables
- Hibernate is the most popular JPA implementation

```java
@Entity
@Table(name = "employees")
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "emp_name")
    private String name;
}

// CRUD without writing SQL
EntityManager em = ...;
Employee emp = em.find(Employee.class, 1L);  // SELECT
em.persist(new Employee("John"));            // INSERT
em.remove(emp);                              // DELETE
```

---

#### Spring Framework (Modern J2EE)
- Most popular Java enterprise framework
- Key modules: **Spring Core (IoC/DI), Spring MVC, Spring Boot, Spring Security, Spring Data**

**IoC (Inversion of Control)** — framework controls object creation
**DI (Dependency Injection)** — framework injects dependencies into objects

```java
@Component
public class UserService {
    @Autowired  // Spring injects this automatically
    private UserRepository userRepo;
}
```

**Spring Boot** — opinionated, auto-configured Spring. No XML, minimal configuration. Embedded server (Tomcat). Makes microservices easy.

---

## 3. PYTHON PROGRAMMING

### Python Basics

```python
# Variables — dynamically typed
name = "Alice"
age = 25
pi = 3.14
is_valid = True

# Data Types
x = 10          # int
y = 3.14        # float
s = "hello"     # str
b = True        # bool
n = None        # NoneType
```

### Data Structures

```python
# List — ordered, mutable, allows duplicates
fruits = ["apple", "banana", "cherry"]
fruits.append("date")
fruits.remove("banana")
fruits[0]        # apple
fruits[-1]       # cherry (negative index)
fruits[1:3]      # ['banana', 'cherry'] (slicing)

# Tuple — ordered, immutable
coords = (10, 20)
x, y = coords    # unpacking

# Set — unordered, no duplicates
unique = {1, 2, 3, 3, 2}  # {1, 2, 3}
unique.add(4)
unique.discard(1)

# Dictionary — key-value pairs, ordered (Python 3.7+)
person = {"name": "Alice", "age": 25}
person["name"]           # Alice
person.get("age", 0)     # 25 (with default)
person["email"] = "a@b.com"  # add
for key, val in person.items():
    print(key, val)
```

---

### Control Flow

```python
# if-elif-else
if age >= 18:
    print("adult")
elif age >= 13:
    print("teen")
else:
    print("child")

# for loop
for i in range(5):       # 0, 1, 2, 3, 4
    print(i)

for fruit in fruits:
    print(fruit)

# while loop
count = 0
while count < 5:
    count += 1

# List Comprehension — Pythonic way
squares = [x**2 for x in range(10)]
evens = [x for x in range(20) if x % 2 == 0]
```

---

### Functions

```python
# Basic function
def greet(name, greeting="Hello"):  # default parameter
    return f"{greeting}, {name}!"

# *args — variable positional arguments
def add(*numbers):
    return sum(numbers)
add(1, 2, 3, 4)  # 10

# **kwargs — variable keyword arguments
def display(**info):
    for key, val in info.items():
        print(f"{key}: {val}")
display(name="Alice", age=25)

# Lambda — anonymous single-expression function
square = lambda x: x**2
nums.sort(key=lambda x: x[1])  # sort by second element

# Decorators — modify function behavior
def my_decorator(func):
    def wrapper(*args, **kwargs):
        print("Before function")
        result = func(*args, **kwargs)
        print("After function")
        return result
    return wrapper

@my_decorator
def say_hello():
    print("Hello!")
```

---

### Python OOP

```python
class Animal:
    species = "Animal"  # class variable (shared)

    def __init__(self, name, age):  # constructor
        self.name = name   # instance variable
        self.age = age

    def speak(self):
        return f"{self.name} makes a sound"

    def __str__(self):  # string representation
        return f"Animal({self.name}, {self.age})"

    @classmethod
    def create_default(cls):  # class method
        return cls("Unknown", 0)

    @staticmethod
    def is_animal():  # static method
        return True


class Dog(Animal):  # inheritance
    def __init__(self, name, age, breed):
        super().__init__(name, age)  # call parent constructor
        self.breed = breed

    def speak(self):  # override
        return f"{self.name} says Woof!"


# Dunder/Magic Methods
class Vector:
    def __init__(self, x, y):
        self.x, self.y = x, y

    def __add__(self, other):      # v1 + v2
        return Vector(self.x + other.x, self.y + other.y)

    def __len__(self):             # len(v)
        return int((self.x**2 + self.y**2)**0.5)

    def __repr__(self):            # developer representation
        return f"Vector({self.x}, {self.y})"
```

---

### File Handling

```python
# Reading files
with open("file.txt", "r") as f:
    content = f.read()       # entire file as string
    lines = f.readlines()    # list of lines

# Writing files
with open("file.txt", "w") as f:  # 'w' overwrites, 'a' appends
    f.write("Hello, World!\n")

# Working with CSV
import csv
with open("data.csv", "r") as f:
    reader = csv.DictReader(f)
    for row in reader:
        print(row["name"], row["age"])
```

---

### Python Exception Handling

```python
try:
    result = int(input("Enter number: "))
    print(10 / result)
except ValueError:
    print("Not a number!")
except ZeroDivisionError:
    print("Cannot divide by zero!")
except Exception as e:
    print(f"Error: {e}")
else:
    print("Success!")  # runs if no exception
finally:
    print("Always runs")

# Custom exception
class ValidationError(Exception):
    def __init__(self, message, field):
        super().__init__(message)
        self.field = field

raise ValidationError("Invalid email", "email")
```

---

### Python Modules & Packages

```python
# Importing
import math
from os import path
from datetime import datetime, timedelta
import json
import re  # regular expressions

# Useful standard library modules
import os          # OS operations
import sys         # system operations
import json        # JSON parsing
import datetime    # date/time
import random      # random numbers
import hashlib     # hashing
import threading   # multithreading
import requests    # HTTP (needs pip install)
import numpy as np     # numerical computing
import pandas as pd    # data analysis
```

---

### Python Generators & Iterators

```python
# Generator — yields values one at a time (memory efficient)
def fibonacci():
    a, b = 0, 1
    while True:
        yield a
        a, b = b, a + b

gen = fibonacci()
print(next(gen))  # 0
print(next(gen))  # 1
print(next(gen))  # 1

# Generator expression (like list comprehension but lazy)
squares_gen = (x**2 for x in range(1000000))  # doesn't create list!
```

---

## 4. MOBILE APP DEVELOPMENT

### Android Development

#### Architecture Overview
```
App Layer (Your Code)
    ↕
Android Framework (APIs: Activity, Service, etc.)
    ↕
Android Runtime (ART - compiles Dalvik bytecode)
    ↕
Linux Kernel (Hardware abstraction)
```

#### Core Android Components

**1. Activity**
- A **single screen** with a user interface
- Every app has at least one Activity (main activity)

**Activity Lifecycle:**
```
onCreate() → onStart() → onResume() → [App Running]
                                            ↓
                                       onPause()
                                            ↓
                                       onStop()
                                            ↓
                                       onDestroy()
```
- `onCreate()` — initialize UI, called when activity first created
- `onStart()` — activity visible
- `onResume()` — activity interactive (foreground)
- `onPause()` — partially visible (another activity on top)
- `onStop()` — not visible
- `onDestroy()` — activity being destroyed

**2. Service**
- Background processing **without UI**
- Types: Foreground (user-visible notification), Background, Bound

**3. Broadcast Receiver**
- Listens to **system-wide events** (battery low, boot complete, SMS received)

**4. Content Provider**
- Manages **shared data** between apps (contacts, media)

---

#### Android UI Elements
- **Layout types:** LinearLayout, RelativeLayout, ConstraintLayout, FrameLayout
- **Views:** TextView, EditText, Button, ImageView, RecyclerView, ListView
- **Fragments** — reusable UI components within an activity

#### Intents
- Messaging objects to **communicate between components**
- **Explicit Intent** — specific component: `Intent i = new Intent(this, SecondActivity.class);`
- **Implicit Intent** — action-based: `Intent i = new Intent(Intent.ACTION_VIEW, Uri.parse("http://..."));`

#### Modern Android (Kotlin + Jetpack)
- **Kotlin** is now the preferred language (over Java) for Android
- **Jetpack Compose** — modern declarative UI toolkit
- **ViewModel + LiveData** — MVVM architecture
- **Room** — ORM for SQLite database
- **Retrofit** — HTTP client for API calls

---

### iOS Development

#### Core Concepts
- Language: **Swift** (modern) or Objective-C (legacy)
- IDE: **Xcode**
- UI Framework: **UIKit** (traditional) or **SwiftUI** (modern, declarative)
- Distribution: Apple App Store only (strict review process)

#### iOS App Lifecycle (UIKit)
- **AppDelegate** — handles app-level events (launch, background, terminate)
- **SceneDelegate** — handles UI lifecycle (iOS 13+)
- **UIViewController** — manages a single screen

```swift
// Swift basics
var name = "Alice"         // mutable
let age = 25               // immutable (constant)

// Optionals — Swift's way of handling null
var email: String? = nil   // optional string
if let e = email {
    print(e)               // safely unwrapped
}

// Class in Swift
class Person {
    var name: String
    var age: Int

    init(name: String, age: Int) {
        self.name = name
        self.age = age
    }

    func greet() -> String {
        return "Hi, I'm \(name)"
    }
}
```

---

### Cross-Platform Development
- **React Native** — JavaScript, renders native components, Meta
- **Flutter** — Dart language, custom rendering engine, Google
- **Xamarin** — C#, Microsoft
- **Ionic** — HTML/CSS/JS, wraps in WebView

---

## 5. WEB TECHNOLOGIES

### HTML (HyperText Markup Language)

Structure of web pages. HTML5 is the current standard.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Page Title</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <!-- Headings -->
    <h1>Main Heading</h1>
    <h2>Subheading</h2>

    <!-- Paragraph and text -->
    <p>This is a <strong>paragraph</strong> with <em>emphasis</em></p>

    <!-- Links and images -->
    <a href="https://example.com" target="_blank">Click here</a>
    <img src="photo.jpg" alt="Description" width="300">

    <!-- Lists -->
    <ul><li>Unordered item</li></ul>
    <ol><li>Ordered item</li></ol>

    <!-- Tables -->
    <table>
        <thead><tr><th>Name</th><th>Age</th></tr></thead>
        <tbody><tr><td>Alice</td><td>25</td></tr></tbody>
    </table>

    <!-- Forms -->
    <form action="/submit" method="POST">
        <input type="text" name="username" placeholder="Username" required>
        <input type="password" name="password">
        <input type="email" name="email">
        <select name="country">
            <option value="in">India</option>
        </select>
        <textarea name="message"></textarea>
        <button type="submit">Submit</button>
    </form>

    <!-- HTML5 Semantic Elements -->
    <header>Site header</header>
    <nav>Navigation links</nav>
    <main>
        <article>Blog post</article>
        <aside>Sidebar</aside>
        <section>Section of content</section>
    </main>
    <footer>Site footer</footer>

    <!-- HTML5 Media -->
    <video src="video.mp4" controls autoplay loop></video>
    <audio src="audio.mp3" controls></audio>
    <canvas id="myCanvas"></canvas>  <!-- for drawing with JS -->

    <script src="app.js"></script>
</body>
</html>
```

---

### CSS (Cascading Style Sheets)

Styling and layout of web pages. CSS3 is current standard.

```css
/* Selectors */
p { color: blue; }           /* element selector */
.className { }               /* class selector */
#idName { }                  /* ID selector */
div p { }                    /* descendant */
div > p { }                  /* direct child */
a:hover { }                  /* pseudo-class */
p::first-line { }            /* pseudo-element */
[type="text"] { }            /* attribute selector */

/* Box Model — every element is a box */
div {
    width: 300px;
    height: 200px;
    padding: 20px;           /* inside border */
    border: 2px solid black;
    margin: 10px;            /* outside border */
    box-sizing: border-box;  /* width includes padding+border */
}

/* Positioning */
div {
    position: static;    /* default, normal flow */
    position: relative;  /* offset from normal position */
    position: absolute;  /* relative to nearest positioned parent */
    position: fixed;     /* relative to viewport, doesn't scroll */
    position: sticky;    /* relative until scroll threshold */
    top: 10px;
    left: 20px;
    z-index: 10;         /* stacking order */
}

/* Flexbox — 1D layout */
.container {
    display: flex;
    flex-direction: row;         /* row | column */
    justify-content: center;     /* main axis alignment */
    align-items: center;         /* cross axis alignment */
    flex-wrap: wrap;
    gap: 10px;
}
.item { flex: 1; }              /* grow equally */

/* CSS Grid — 2D layout */
.grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);  /* 3 equal columns */
    grid-template-rows: auto;
    gap: 20px;
}

/* Media Queries — responsive design */
@media (max-width: 768px) {
    .grid { grid-template-columns: 1fr; }  /* 1 column on mobile */
}

/* CSS Variables */
:root {
    --primary-color: #3498db;
    --font-size: 16px;
}
h1 { color: var(--primary-color); }

/* Transitions & Animations */
button {
    transition: background-color 0.3s ease, transform 0.2s;
}
button:hover {
    background-color: #blue;
    transform: scale(1.05);
}

@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}
.box { animation: fadeIn 1s ease-in-out; }
```

**CSS Specificity (priority order):**
Inline style > ID (#) > Class/Attribute/Pseudo-class > Element > Universal (*)
Calculated as: (inline, ID, class, element) = (1000, 100, 10, 1)

**Cascade** — when multiple rules apply, more specific wins. If equal specificity, later rule wins.

---

### XML (eXtensible Markup Language)

- Data format for storing and transporting data
- Self-descriptive — tags describe data
- Strict syntax (unlike HTML)

```xml
<?xml version="1.0" encoding="UTF-8"?>
<employees>
    <employee id="1">
        <name>Alice</name>
        <age>25</age>
        <department>IT</department>
    </employee>
    <employee id="2">
        <name>Bob</name>
        <age>30</age>
        <department>HR</department>
    </employee>
</employees>
```

**XML vs HTML:**
- XML: stores/transports data, custom tags, strict syntax
- HTML: displays data, predefined tags, lenient syntax

**DTD (Document Type Definition)** — defines structure and legal elements of XML
**XML Schema (XSD)** — more powerful alternative to DTD
**XPATH** — language for navigating XML documents
**XSLT** — transforms XML into other formats (HTML, PDF)
**SAX vs DOM parsing:**
- DOM — loads entire XML into memory as tree (easy to navigate, memory-heavy)
- SAX — event-based sequential parsing (memory efficient, complex to use)

---

### JavaScript

Client-side scripting language. Runs in browser. Also server-side (Node.js).

```javascript
// Variables
var x = 10;     // function scoped, hoisted (old way)
let y = 20;     // block scoped (preferred)
const PI = 3.14; // block scoped, cannot reassign

// Data types
typeof "hello"   // "string"
typeof 42        // "number"
typeof true      // "boolean"
typeof undefined // "undefined"
typeof null      // "object" (famous bug!)
typeof {}        // "object"
typeof []        // "object"
typeof function(){} // "function"

// Functions
function add(a, b) { return a + b; }
const multiply = function(a, b) { return a * b; };  // function expression
const divide = (a, b) => a / b;  // arrow function

// Arrow functions and 'this'
// Regular functions: 'this' depends on how function is called
// Arrow functions: 'this' from surrounding scope (lexical)

// Objects
const person = {
    name: "Alice",
    age: 25,
    greet() {  // method shorthand
        return `Hi, I'm ${this.name}`;  // template literal
    }
};
person.name;          // dot notation
person["age"];        // bracket notation

// Destructuring
const { name, age } = person;
const [first, second, ...rest] = [1, 2, 3, 4, 5];

// Spread operator
const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5];  // [1,2,3,4,5]
const merged = {...person, email: "alice@example.com"};
```

#### DOM Manipulation

```javascript
// Selecting elements
document.getElementById("myId");
document.querySelector(".className");    // first match
document.querySelectorAll("p");          // all matches (NodeList)

// Modifying elements
const el = document.getElementById("title");
el.innerHTML = "<strong>New Content</strong>";
el.textContent = "Plain text";
el.setAttribute("class", "active");
el.style.color = "red";
el.classList.add("active");
el.classList.remove("inactive");
el.classList.toggle("visible");

// Creating elements
const div = document.createElement("div");
div.textContent = "New div";
document.body.appendChild(div);

// Events
document.getElementById("btn").addEventListener("click", function(event) {
    event.preventDefault();  // stop default behavior
    event.stopPropagation(); // stop bubbling
    console.log("Clicked!");
});

// Event bubbling: event travels from target up to root
// Event capturing: event travels from root down to target
```

#### Asynchronous JavaScript

```javascript
// Callbacks (old way)
setTimeout(() => console.log("After 2s"), 2000);
fetchData(url, function(data) {
    processData(data, function(result) {  // callback hell!
        saveData(result, function() { ... });
    });
});

// Promises
fetch("https://api.example.com/users")
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error))
    .finally(() => console.log("Done"));

// Promise.all — wait for multiple
Promise.all([fetch(url1), fetch(url2)])
    .then(([res1, res2]) => { ... });

// Async/Await (modern, cleanest)
async function getUsers() {
    try {
        const response = await fetch("https://api.example.com/users");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}
getUsers().then(users => console.log(users));

// AJAX with XMLHttpRequest (old)
const xhr = new XMLHttpRequest();
xhr.open("GET", "url");
xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
        console.log(JSON.parse(xhr.responseText));
    }
};
xhr.send();
```

#### JavaScript ES6+ Features

```javascript
// Classes
class Animal {
    #privateField = 0;  // private field (ES2022)
    constructor(name) { this.name = name; }
    speak() { return `${this.name} makes a sound`; }
    static create(name) { return new Animal(name); }
}
class Dog extends Animal {
    speak() { return `${this.name} barks`; }
}

// Modules
export const PI = 3.14;              // named export
export default function main() {}    // default export
import { PI } from './math.js';      // named import
import main from './app.js';         // default import

// Optional chaining
const city = user?.address?.city;   // no error if address is null
const first = arr?.[0];

// Nullish coalescing
const name = user.name ?? "Anonymous";  // only falls back on null/undefined
```

---

### PHP (PHP: Hypertext Preprocessor)

Server-side scripting language, embedded in HTML.

```php
<?php
// Variables ($ prefix)
$name = "Alice";
$age = 25;
$isActive = true;

// String operations
echo "Hello, $name!";           // string interpolation
echo strlen($name);             // 5
echo strtoupper($name);         // ALICE
echo str_replace("Alice", "Bob", $name);

// Arrays
$fruits = ["apple", "banana", "cherry"];
$fruits[] = "date";             // append
echo count($fruits);            // 4

// Associative array (like a dictionary)
$person = ["name" => "Alice", "age" => 25];
echo $person["name"];

// Control flow
if ($age >= 18) {
    echo "Adult";
} elseif ($age >= 13) {
    echo "Teen";
} else {
    echo "Child";
}

foreach ($fruits as $fruit) {
    echo $fruit;
}

foreach ($person as $key => $value) {
    echo "$key: $value";
}

// Functions
function greet($name, $greeting = "Hello") {
    return "$greeting, $name!";
}

// OOP in PHP
class Person {
    private $name;
    public $age;

    public function __construct($name, $age) {
        $this->name = $name;
        $this->age = $age;
    }

    public function getName() { return $this->name; }
}

$alice = new Person("Alice", 25);
echo $alice->getName();

// PHP + HTML form handling
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = htmlspecialchars($_POST["username"]);  // XSS prevention
    $password = $_POST["password"];
}

// PHP + MySQL (PDO — secure way)
$pdo = new PDO("mysql:host=localhost;dbname=mydb", "user", "pass");
$stmt = $pdo->prepare("SELECT * FROM users WHERE id = ?");
$stmt->execute([$userId]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);

// Sessions in PHP
session_start();
$_SESSION["user"] = $username;

// Cookies
setcookie("name", "Alice", time() + 3600, "/");  // expires in 1 hour
echo $_COOKIE["name"];

// File handling
$content = file_get_contents("file.txt");
file_put_contents("file.txt", "New content");
?>
```

---

## 6. UNIX/LINUX SHELL PROGRAMMING

### Linux Basics

**File System Structure:**
```
/ (root)
├── /bin  — essential user commands (ls, cp, mv)
├── /sbin — system admin commands
├── /etc  — configuration files
├── /home — user home directories
├── /var  — variable data (logs, databases)
├── /tmp  — temporary files
├── /usr  — user programs
├── /dev  — device files
├── /proc — process information (virtual filesystem)
└── /root — root user's home
```

**Essential Commands:**
```bash
# Navigation
pwd              # print working directory
ls -la           # list all files with details
cd /path/to/dir  # change directory
cd ..            # go up one level
cd ~             # go to home directory

# File Operations
cp file1 file2          # copy
mv file1 /path/file2    # move/rename
rm file                 # delete file
rm -rf directory        # delete directory recursively (careful!)
mkdir -p a/b/c          # create nested directories
touch filename          # create empty file
ln -s target link       # create symbolic link

# File Content
cat file.txt            # print file content
less file.txt           # paginated view
head -n 20 file.txt     # first 20 lines
tail -f file.txt        # follow file (watch logs)
grep "pattern" file.txt # search for pattern
grep -r "pattern" /dir  # recursive search
wc -l file.txt          # word/line count

# Permissions
chmod 755 file          # rwxr-xr-x
chmod +x script.sh      # add execute permission
chown user:group file   # change ownership
# Permissions: r=4, w=2, x=1. 755 = rwx(7) r-x(5) r-x(5)

# Process Management
ps aux                  # list all processes
top                     # real-time process monitor
htop                    # interactive process viewer
kill -9 PID             # force kill process
& (background: command &)
nohup command &         # run after logout

# Networking
ping google.com         # test connectivity
ifconfig / ip addr      # network interfaces
netstat -tlnp           # listening ports
ssh user@host           # remote login
scp file user@host:/path # secure copy
curl -X GET url         # HTTP request
wget url                # download file

# Search
find /path -name "*.txt"          # find files
find /path -type f -size +100M    # find large files
locate filename                    # fast search (uses database)
which python                      # find command location

# Disk
df -h                   # disk free space
du -sh /directory       # directory size
```

---

### Shell Scripting (Bash)

```bash
#!/bin/bash
# First line (shebang) tells OS which interpreter to use

# Variables (no spaces around =)
NAME="Alice"
AGE=25
echo "Hello, $NAME!"
echo "Age: ${AGE}"

# User input
read -p "Enter your name: " USER_NAME
echo "Hello, $USER_NAME"

# Command substitution
CURRENT_DATE=$(date +%Y-%m-%d)
FILES=$(ls /home)

# Arithmetic
RESULT=$((10 + 5 * 2))
echo $RESULT  # 20

# String operations
STR="Hello World"
echo ${#STR}          # length: 11
echo ${STR:0:5}       # substring: Hello
echo ${STR/World/Shell} # replace: Hello Shell

# Conditionals
if [ $AGE -ge 18 ]; then
    echo "Adult"
elif [ $AGE -ge 13 ]; then
    echo "Teen"
else
    echo "Child"
fi

# String comparison
if [ "$NAME" == "Alice" ]; then echo "Found Alice"; fi
if [ -f "file.txt" ]; then echo "File exists"; fi
if [ -d "/home" ]; then echo "Directory exists"; fi
if [ -z "$VAR" ]; then echo "Variable is empty"; fi
if [ -n "$VAR" ]; then echo "Variable is not empty"; fi

# Comparison operators
# -eq (equal), -ne (not equal), -lt (less than), -le (less or equal)
# -gt (greater than), -ge (greater or equal)

# Loops
# For loop
for i in 1 2 3 4 5; do
    echo "Number: $i"
done

for i in $(seq 1 10); do
    echo $i
done

for file in *.txt; do
    echo "Processing: $file"
done

# While loop
COUNT=0
while [ $COUNT -lt 5 ]; do
    echo "Count: $COUNT"
    ((COUNT++))
done

# Until loop (runs until condition is true)
until [ $COUNT -eq 10 ]; do
    ((COUNT++))
done

# Functions
function greet() {
    local NAME=$1  # first argument, local scope
    local AGE=$2   # second argument
    echo "Hello, $NAME! You are $AGE years old."
    return 0       # exit code (0 = success)
}
greet "Alice" 25

# Exit codes
echo $?  # exit code of last command (0 = success, non-zero = error)

# Arrays
FRUITS=("apple" "banana" "cherry")
echo ${FRUITS[0]}          # apple
echo ${#FRUITS[@]}         # length: 3
echo ${FRUITS[@]}          # all elements
FRUITS+=("date")           # append

# Pipes and redirection
ls | grep ".txt"              # pipe output to grep
command > file.txt            # redirect stdout to file (overwrite)
command >> file.txt           # append to file
command 2> errors.txt         # redirect stderr
command > out.txt 2>&1        # redirect both stdout and stderr
command < input.txt           # read stdin from file

# Useful commands
cat file.txt | sort | uniq -c | sort -rn  # frequency count
awk '{print $2}' file.txt    # print second column
sed 's/old/new/g' file.txt   # find and replace
cut -d',' -f1,3 data.csv     # cut columns 1 and 3

# Cron jobs (scheduled tasks)
# crontab -e to edit
# Format: minute hour day month weekday command
0 2 * * * /path/to/backup.sh   # run at 2 AM every day
*/5 * * * * /path/to/script.sh  # every 5 minutes
```

---

## 7. DATABASE PROGRAMMING — SQL & PL/SQL

### SQL (Structured Query Language)

#### DDL — Data Definition Language
```sql
-- Create table
CREATE TABLE employees (
    emp_id     INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name  VARCHAR(50) NOT NULL,
    email      VARCHAR(100) UNIQUE,
    salary     DECIMAL(10,2) DEFAULT 0.00,
    dept_id    INT,
    hire_date  DATE,
    FOREIGN KEY (dept_id) REFERENCES departments(dept_id)
);

-- Modify table
ALTER TABLE employees ADD COLUMN phone VARCHAR(15);
ALTER TABLE employees MODIFY COLUMN salary DECIMAL(12,2);
ALTER TABLE employees DROP COLUMN phone;
ALTER TABLE employees RENAME COLUMN first_name TO fname;

-- Remove
DROP TABLE employees;       -- delete table and data
TRUNCATE TABLE employees;   -- delete all data, keep structure
```

#### DML — Data Manipulation Language
```sql
-- INSERT
INSERT INTO employees (first_name, last_name, email, salary, dept_id)
VALUES ('Alice', 'Smith', 'alice@example.com', 75000, 3);

INSERT INTO employees VALUES (DEFAULT, 'Bob', 'Jones', 'bob@example.com', 80000, 2, CURDATE());

-- UPDATE
UPDATE employees
SET salary = salary * 1.10, dept_id = 4
WHERE emp_id = 101;

-- DELETE
DELETE FROM employees WHERE emp_id = 101;
DELETE FROM employees WHERE salary < 30000;
```

#### DQL — Data Query Language (SELECT)
```sql
-- Basic SELECT
SELECT * FROM employees;
SELECT first_name, last_name, salary FROM employees;
SELECT first_name AS name, salary * 12 AS annual_salary FROM employees;

-- WHERE clause
SELECT * FROM employees WHERE salary > 50000;
SELECT * FROM employees WHERE dept_id = 3 AND salary > 60000;
SELECT * FROM employees WHERE salary BETWEEN 50000 AND 80000;
SELECT * FROM employees WHERE dept_id IN (2, 3, 5);
SELECT * FROM employees WHERE last_name LIKE 'S%';  -- starts with S
SELECT * FROM employees WHERE email IS NULL;

-- ORDER BY, LIMIT
SELECT * FROM employees ORDER BY salary DESC;
SELECT * FROM employees ORDER BY last_name ASC, first_name ASC;
SELECT * FROM employees ORDER BY salary DESC LIMIT 10;  -- top 10
SELECT * FROM employees LIMIT 10 OFFSET 20;            -- pagination

-- Aggregate Functions
SELECT COUNT(*) FROM employees;
SELECT COUNT(DISTINCT dept_id) FROM employees;
SELECT MAX(salary), MIN(salary), AVG(salary), SUM(salary) FROM employees;

-- GROUP BY + HAVING
SELECT dept_id, COUNT(*) as emp_count, AVG(salary) as avg_salary
FROM employees
GROUP BY dept_id
HAVING COUNT(*) > 5         -- HAVING filters AFTER grouping (WHERE filters before)
ORDER BY avg_salary DESC;
```

#### JOINS
```sql
-- INNER JOIN — only matching rows from both tables
SELECT e.first_name, d.dept_name
FROM employees e
INNER JOIN departments d ON e.dept_id = d.dept_id;

-- LEFT JOIN — all rows from left + matching from right (NULL if no match)
SELECT e.first_name, d.dept_name
FROM employees e
LEFT JOIN departments d ON e.dept_id = d.dept_id;

-- RIGHT JOIN — all rows from right + matching from left
SELECT e.first_name, d.dept_name
FROM employees e
RIGHT JOIN departments d ON e.dept_id = d.dept_id;

-- FULL OUTER JOIN — all rows from both tables
SELECT e.first_name, d.dept_name
FROM employees e
FULL OUTER JOIN departments d ON e.dept_id = d.dept_id;

-- SELF JOIN — join table with itself
SELECT e1.first_name AS employee, e2.first_name AS manager
FROM employees e1
JOIN employees e2 ON e1.manager_id = e2.emp_id;

-- CROSS JOIN — cartesian product (every combination)
SELECT * FROM table1 CROSS JOIN table2;
```

#### Subqueries
```sql
-- Subquery in WHERE
SELECT * FROM employees
WHERE salary > (SELECT AVG(salary) FROM employees);

-- Subquery with IN
SELECT * FROM employees
WHERE dept_id IN (SELECT dept_id FROM departments WHERE location = 'Mumbai');

-- Correlated subquery (references outer query)
SELECT e1.first_name, e1.salary
FROM employees e1
WHERE e1.salary > (
    SELECT AVG(e2.salary)
    FROM employees e2
    WHERE e2.dept_id = e1.dept_id  -- references outer query
);

-- EXISTS
SELECT * FROM departments d
WHERE EXISTS (
    SELECT 1 FROM employees e WHERE e.dept_id = d.dept_id
);
```

#### Views, Indexes, Transactions
```sql
-- VIEW — virtual table based on query
CREATE VIEW high_earners AS
SELECT first_name, last_name, salary
FROM employees
WHERE salary > 70000;

SELECT * FROM high_earners;  -- use like a table

-- INDEX — speeds up queries, slows inserts/updates
CREATE INDEX idx_salary ON employees(salary);
CREATE UNIQUE INDEX idx_email ON employees(email);
DROP INDEX idx_salary ON employees;

-- TRANSACTIONS — ACID properties
START TRANSACTION;
UPDATE accounts SET balance = balance - 1000 WHERE id = 1;
UPDATE accounts SET balance = balance + 1000 WHERE id = 2;
COMMIT;   -- save changes

-- If error occurs:
ROLLBACK;  -- undo all changes in transaction

-- SAVEPOINT
SAVEPOINT sp1;
-- do something
ROLLBACK TO sp1;  -- rollback to savepoint
```

**ACID Properties:**
- **Atomicity** — all or nothing (transaction fully completes or fully rolls back)
- **Consistency** — database remains in valid state before and after
- **Isolation** — concurrent transactions don't interfere
- **Durability** — committed transactions persist even after crash

---

### PL/SQL (Oracle's Procedural Language Extension to SQL)

```sql
-- Basic PL/SQL Block Structure
DECLARE
    -- variable declarations
    v_name    VARCHAR2(50);
    v_salary  NUMBER(10,2);
    v_count   NUMBER := 0;
BEGIN
    -- executable statements
    SELECT first_name, salary
    INTO v_name, v_salary
    FROM employees
    WHERE emp_id = 101;

    DBMS_OUTPUT.PUT_LINE('Name: ' || v_name);
    DBMS_OUTPUT.PUT_LINE('Salary: ' || v_salary);

EXCEPTION
    -- error handling
    WHEN NO_DATA_FOUND THEN
        DBMS_OUTPUT.PUT_LINE('Employee not found');
    WHEN OTHERS THEN
        DBMS_OUTPUT.PUT_LINE('Error: ' || SQLERRM);
END;
/
```

#### Stored Procedures
```sql
CREATE OR REPLACE PROCEDURE give_raise(
    p_emp_id   IN  NUMBER,
    p_percent  IN  NUMBER,
    p_new_sal  OUT NUMBER
)
IS
    v_current_salary NUMBER;
BEGIN
    SELECT salary INTO v_current_salary
    FROM employees WHERE emp_id = p_emp_id;

    p_new_sal := v_current_salary * (1 + p_percent/100);

    UPDATE employees
    SET salary = p_new_sal
    WHERE emp_id = p_emp_id;

    COMMIT;
EXCEPTION
    WHEN NO_DATA_FOUND THEN
        RAISE_APPLICATION_ERROR(-20001, 'Employee not found');
END give_raise;
/

-- Call procedure
DECLARE
    v_new_salary NUMBER;
BEGIN
    give_raise(101, 10, v_new_salary);
    DBMS_OUTPUT.PUT_LINE('New salary: ' || v_new_salary);
END;
```

#### Functions
```sql
CREATE OR REPLACE FUNCTION get_annual_salary(p_emp_id NUMBER)
RETURN NUMBER
IS
    v_monthly NUMBER;
BEGIN
    SELECT salary INTO v_monthly
    FROM employees WHERE emp_id = p_emp_id;
    RETURN v_monthly * 12;
EXCEPTION
    WHEN NO_DATA_FOUND THEN RETURN 0;
END;
/

-- Use in SQL
SELECT first_name, get_annual_salary(emp_id) AS annual_sal FROM employees;
```

#### Cursors
```sql
-- Implicit cursor (for single row SELECT INTO — Oracle manages automatically)
-- Explicit cursor (for multi-row processing)

DECLARE
    CURSOR emp_cursor IS
        SELECT first_name, salary FROM employees WHERE dept_id = 3;
    v_name   VARCHAR2(50);
    v_salary NUMBER;
BEGIN
    OPEN emp_cursor;
    LOOP
        FETCH emp_cursor INTO v_name, v_salary;
        EXIT WHEN emp_cursor%NOTFOUND;  -- exit when no more rows
        DBMS_OUTPUT.PUT_LINE(v_name || ': ' || v_salary);
    END LOOP;
    CLOSE emp_cursor;
END;

-- Cursor FOR loop (cleaner)
BEGIN
    FOR emp_rec IN (SELECT first_name, salary FROM employees) LOOP
        DBMS_OUTPUT.PUT_LINE(emp_rec.first_name || ': ' || emp_rec.salary);
    END LOOP;
END;
```

#### Triggers
```sql
-- Trigger fires automatically on events (INSERT/UPDATE/DELETE)
CREATE OR REPLACE TRIGGER audit_salary_change
AFTER UPDATE OF salary ON employees
FOR EACH ROW
BEGIN
    INSERT INTO salary_audit (
        emp_id, old_salary, new_salary, changed_by, changed_date
    ) VALUES (
        :OLD.emp_id, :OLD.salary, :NEW.salary, USER, SYSDATE
    );
END;
/

-- :OLD — values before change
-- :NEW — values after change
-- BEFORE trigger — fires before the DML operation
-- AFTER trigger — fires after the DML operation
-- FOR EACH ROW — row-level trigger (fires for each affected row)
-- (without it) — statement-level trigger (fires once)
```

#### Packages
```sql
-- Package = group of related procedures, functions, variables

-- Package Specification (public interface)
CREATE OR REPLACE PACKAGE emp_package AS
    PROCEDURE add_employee(p_name VARCHAR2, p_salary NUMBER);
    FUNCTION get_count RETURN NUMBER;
END emp_package;

-- Package Body (implementation)
CREATE OR REPLACE PACKAGE BODY emp_package AS
    PROCEDURE add_employee(p_name VARCHAR2, p_salary NUMBER) IS
    BEGIN
        INSERT INTO employees(first_name, salary) VALUES(p_name, p_salary);
    END;

    FUNCTION get_count RETURN NUMBER IS
        v_count NUMBER;
    BEGIN
        SELECT COUNT(*) INTO v_count FROM employees;
        RETURN v_count;
    END;
END emp_package;
/

-- Usage
EXEC emp_package.add_employee('Charlie', 65000);
SELECT emp_package.get_count() FROM DUAL;
```

---

## 8. APPLICATION SERVERS

### What is an Application Server?
Middleware that hosts and executes server-side application logic. Sits between the web server and database. Manages: request handling, transaction management, security, connection pooling, session management.

---

### Apache Tomcat
- **Java Servlet Container** (not a full Java EE server)
- Hosts Servlets and JSP
- Open source, by Apache Software Foundation
- Default port: **8080**
- Directory structure:
  - `/webapps` — deploy WAR files here
  - `/conf/server.xml` — main configuration
  - `/conf/web.xml` — default servlet configuration
  - `/logs` — log files
- **WAR (Web Application Archive)** — packaged Java web app (.war file)

---

### IIS (Internet Information Services)
- Microsoft's web server + application server
- Runs on Windows only
- Hosts: ASP.NET, ASP, PHP, static HTML
- Default port: **80** (HTTP), **443** (HTTPS)
- Managed via IIS Manager GUI or PowerShell
- Tightly integrated with Windows Authentication, Active Directory

---

### Node.js
- **JavaScript runtime** on the server using **V8 engine** (Chrome's JS engine)
- **Event-driven, non-blocking I/O** — handles many concurrent connections efficiently
- Single-threaded but asynchronous — perfect for I/O-heavy apps
- NOT a framework — a runtime. Express.js is the framework built on Node.js

```javascript
// Basic Node.js HTTP server
const http = require('http');

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('<h1>Hello from Node.js!</h1>');
});

server.listen(3000, () => {
    console.log('Server running on port 3000');
});

// Express.js (Node.js framework)
const express = require('express');
const app = express();

app.use(express.json());  // middleware to parse JSON body

app.get('/users', (req, res) => {
    res.json([{ id: 1, name: 'Alice' }]);
});

app.post('/users', (req, res) => {
    const { name, email } = req.body;
    // save to DB...
    res.status(201).json({ message: 'Created', name });
});

app.listen(3000, () => console.log('Express app on port 3000'));
```

**Node.js Event Loop:**
Call Stack → Node APIs → Callback Queue → Event Loop picks callbacks → Call Stack

**npm (Node Package Manager)** — package manager for Node.js
- `npm init` — create package.json
- `npm install express` — install package
- `package.json` — project metadata and dependencies

---

### Comparison

| | Tomcat | IIS | Node.js |
|--|--------|-----|---------|
| **Language** | Java | ASP.NET/multiple | JavaScript |
| **OS** | Cross-platform | Windows only | Cross-platform |
| **Model** | Thread-per-request | Thread-per-request | Event-driven single thread |
| **Best for** | Java web apps | .NET/Windows apps | Real-time, high-concurrency |
| **Default Port** | 8080 | 80 | Any (commonly 3000) |

---

## 9. REACT FRAMEWORK

### What is React?
JavaScript library (by Meta/Facebook) for building **user interfaces**, specifically **Single Page Applications (SPAs)**. UI = components. DOM updates are efficient via **Virtual DOM**.

---

### Core React Concepts

#### Components
```jsx
// Functional Component (modern standard)
function Welcome({ name, age }) {  // props destructured
    return (
        <div className="welcome">
            <h1>Hello, {name}!</h1>
            <p>Age: {age}</p>
        </div>
    );
}

// Usage
<Welcome name="Alice" age={25} />
```

#### JSX (JavaScript XML)
- HTML-like syntax in JavaScript
- Compiled to `React.createElement()` calls
- Rules: single root element, `className` not `class`, `htmlFor` not `for`, self-close tags `<img />`

---

#### Hooks

**useState — state management**
```jsx
import { useState } from 'react';

function Counter() {
    const [count, setCount] = useState(0);  // [state, setter]

    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={() => setCount(count + 1)}>+</button>
            <button onClick={() => setCount(prev => prev - 1)}>-</button>
        </div>
    );
}
```

**useEffect — side effects (API calls, subscriptions, DOM manipulation)**
```jsx
import { useState, useEffect } from 'react';

function UserList() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // Runs after render
        fetch('/api/users')
            .then(res => res.json())
            .then(data => setUsers(data));

        return () => {
            // Cleanup function — runs on unmount
        };
    }, []);  // [] = run only once on mount
             // [userId] = run when userId changes
             // (no array) = run on every render

    return (
        <ul>
            {users.map(user => (
                <li key={user.id}>{user.name}</li>  // key required in lists!
            ))}
        </ul>
    );
}
```

**Other Important Hooks:**
```jsx
// useContext — access React context (avoid prop drilling)
const theme = useContext(ThemeContext);

// useRef — reference DOM elements or persist values without re-render
const inputRef = useRef(null);
inputRef.current.focus();

// useReducer — complex state logic (like Redux but local)
const [state, dispatch] = useReducer(reducer, initialState);
dispatch({ type: 'INCREMENT' });

// useMemo — memoize expensive calculations
const sortedList = useMemo(() => list.sort(), [list]);

// useCallback — memoize functions (prevent unnecessary re-renders)
const handleClick = useCallback(() => { ... }, [dependency]);
```

---

#### Props and State

- **Props** — read-only data passed from parent to child. One-way data flow.
- **State** — mutable data local to component. When state changes, component re-renders.
- **Lifting State Up** — move state to common ancestor when siblings need to share it

---

#### React Router (Navigation in SPA)
```jsx
import { BrowserRouter, Routes, Route, Link, useNavigate, useParams } from 'react-router-dom';

function App() {
    return (
        <BrowserRouter>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
            </nav>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/users/:id" element={<UserDetail />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

function UserDetail() {
    const { id } = useParams();   // get URL parameter
    const navigate = useNavigate(); // programmatic navigation
    return <div>User {id} <button onClick={() => navigate(-1)}>Back</button></div>;
}
```

---

#### State Management (Redux)
For large apps where many components share state.

```
Action → Reducer → Store → Component (re-renders)
Component dispatches Action → Reducer returns new State → Store updated → Component gets new props
```

```javascript
// Redux Toolkit (modern Redux)
import { createSlice, configureStore } from '@reduxjs/toolkit';

const counterSlice = createSlice({
    name: 'counter',
    initialState: { value: 0 },
    reducers: {
        increment: state => { state.value += 1; },
        decrement: state => { state.value -= 1; },
        incrementByAmount: (state, action) => { state.value += action.payload; }
    }
});

const store = configureStore({ reducer: { counter: counterSlice.reducer } });

// In component
const count = useSelector(state => state.counter.value);
const dispatch = useDispatch();
dispatch(counterSlice.actions.increment());
```

---

#### React Lifecycle (for reference)
```
Mount:   constructor → render → componentDidMount (≈ useEffect with [])
Update:  render → componentDidUpdate (≈ useEffect with [deps])
Unmount: componentWillUnmount (≈ useEffect cleanup)
```

---

#### Virtual DOM
- React maintains a **lightweight copy of the real DOM** in memory
- On state change: creates new Virtual DOM → **diffs** with old Virtual DOM → applies only the minimum changes to real DOM (**reconciliation**)
- This makes React very efficient

---

## 10. API CONCEPTS & RESTful SERVICES

### What is an API?
**Application Programming Interface** — a contract that defines how software components communicate. Exposes functionality/data to external callers.

---

### REST (Representational State Transfer)

Architectural style for web APIs. Not a protocol — a set of constraints.

#### REST Principles (Constraints)
1. **Client-Server** — separation of concerns, client and server evolve independently
2. **Stateless** — each request contains all info needed; server stores no client session state
3. **Cacheable** — responses can be cached to improve performance
4. **Uniform Interface** — standardized way to interact (HTTP methods + URIs)
5. **Layered System** — client doesn't know if talking to server or proxy
6. **Code on Demand** (optional) — server can send executable code

---

#### HTTP Methods (REST Verbs)

| Method | Operation | Idempotent | Safe |
|--------|-----------|-----------|------|
| **GET** | Read/Retrieve | ✅ | ✅ |
| **POST** | Create | ❌ | ❌ |
| **PUT** | Replace entire resource | ✅ | ❌ |
| **PATCH** | Partial update | ❌ | ❌ |
| **DELETE** | Delete | ✅ | ❌ |

- **Idempotent** = same result no matter how many times you call it
- **Safe** = doesn't modify server state

---

#### HTTP Status Codes

| Code | Meaning |
|------|---------|
| **200 OK** | Success |
| **201 Created** | Resource created (POST) |
| **204 No Content** | Success, no body (DELETE) |
| **400 Bad Request** | Invalid input |
| **401 Unauthorized** | Not authenticated |
| **403 Forbidden** | Authenticated but no permission |
| **404 Not Found** | Resource doesn't exist |
| **405 Method Not Allowed** | HTTP method not supported |
| **409 Conflict** | Conflict (duplicate, version mismatch) |
| **422 Unprocessable Entity** | Validation failed |
| **429 Too Many Requests** | Rate limit exceeded |
| **500 Internal Server Error** | Server bug |
| **503 Service Unavailable** | Server down/overloaded |

---

#### REST API Design

```
# Resources as nouns, HTTP methods as verbs

GET    /users              # get all users
POST   /users              # create new user
GET    /users/123          # get user 123
PUT    /users/123          # replace user 123
PATCH  /users/123          # update parts of user 123
DELETE /users/123          # delete user 123

GET    /users/123/orders   # get orders for user 123
POST   /users/123/orders   # create order for user 123
GET    /users/123/orders/456  # get specific order

# Query parameters for filtering, sorting, pagination
GET /users?role=admin&sort=name&page=2&limit=10
```

**REST API Response (JSON):**
```json
{
    "id": 123,
    "name": "Alice Smith",
    "email": "alice@example.com",
    "role": "admin",
    "createdAt": "2024-01-15T10:30:00Z",
    "_links": {
        "self": { "href": "/users/123" },
        "orders": { "href": "/users/123/orders" }
    }
}
```

---

#### SOAP vs REST

| | REST | SOAP |
|--|------|------|
| **Protocol** | Architectural style | Protocol |
| **Format** | JSON (usually) | XML only |
| **Speed** | Faster, lightweight | Slower, heavy |
| **Flexibility** | Flexible | Strict, rigid |
| **Security** | HTTPS, OAuth | WS-Security (built-in) |
| **Best for** | Web/mobile APIs | Enterprise, banking |
| **Standard** | No strict standard | W3C standard |

---

#### API Authentication

**API Key** — simple token in header or query string
```
GET /api/users
Authorization: Api-Key abc123xyz
```

**Basic Auth** — base64-encoded username:password (insecure without HTTPS)
```
Authorization: Basic dXNlcjpwYXNz==
```

**Bearer Token / JWT (JSON Web Token)**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiJ9...
```

**JWT Structure:** `header.payload.signature`
- **Header** — algorithm type (base64 encoded)
- **Payload** — claims/data (base64 encoded) — userId, role, expiry
- **Signature** — HMAC of header + payload with secret key
- JWT is **self-contained** — server doesn't need to look up session

**OAuth 2.0 Flow (Authorization Code):**
1. User clicks "Login with Google"
2. Redirect to Google's authorization server
3. User authenticates and consents
4. Google redirects back with **authorization code**
5. App exchanges code for **access token**
6. App uses access token to call Google API

---

#### API Versioning
```
/api/v1/users  → stable old version
/api/v2/users  → new version with breaking changes
```

---

#### GraphQL (Alternative to REST)
- Query language for APIs — client specifies exactly what data it needs
- Single endpoint: `POST /graphql`
- No over-fetching or under-fetching

```graphql
# Query
{
    user(id: "123") {
        name
        email
        orders {
            id
            total
        }
    }
}
```

---

#### API Gateway
- Entry point for all client requests to microservices
- Handles: routing, authentication, rate limiting, SSL termination, load balancing
- Examples: AWS API Gateway, Kong, Nginx, Apigee

---

#### Microservices vs Monolith

| | Monolith | Microservices |
|--|---------|--------------|
| **Structure** | Single deployable unit | Independent small services |
| **Deployment** | Deploy all at once | Deploy individually |
| **Scaling** | Scale entire app | Scale specific services |
| **Development** | Simple initially | Complex, but flexible |
| **Tech stack** | Usually one | Each service can use different |
| **Communication** | In-process | HTTP/REST, gRPC, Message Queue |

---

## QUICK REVISION — KEY TERMS

| Term | One-liner |
|------|-----------|
| **Encapsulation** | Bundling data + methods, hiding internal state |
| **Inheritance** | Child class acquires parent class properties |
| **Polymorphism** | Same interface, different implementations |
| **Abstraction** | Hide implementation, show only essential features |
| **Interface** | Contract of methods a class must implement |
| **Abstract Class** | Partial implementation, can't be instantiated |
| **Overloading** | Same method name, different parameters |
| **Overriding** | Child redefines parent's method |
| **Lambda** | Anonymous function: `(x) -> x * 2` |
| **Stream** | Functional pipeline for collections |
| **Servlet** | Java class handling HTTP requests |
| **JSP** | HTML with embedded Java |
| **JDBC** | Java API for database connections |
| **JPA/Hibernate** | ORM — maps Java objects to DB tables |
| **Spring Boot** | Auto-configured Java enterprise framework |
| **DOM** | Tree representation of HTML/XML document |
| **AJAX** | Asynchronous HTTP requests from JS |
| **Promise** | Represents eventual value of async operation |
| **Flexbox** | 1D CSS layout system |
| **CSS Grid** | 2D CSS layout system |
| **Semantic HTML** | Tags that describe content meaning |
| **Servlet Container** | Tomcat — hosts Java web apps |
| **Event Loop** | Node.js mechanism for async execution |
| **Virtual DOM** | React's in-memory DOM copy for efficient updates |
| **useState** | React hook for component state |
| **useEffect** | React hook for side effects |
| **REST** | Architectural style for web APIs |
| **Idempotent** | Same result no matter how many times called |
| **JWT** | Self-contained token for authentication |
| **OAuth 2.0** | Authorization framework |
| **GraphQL** | Query language — client specifies exact data needed |
| **Microservices** | App as small, independently deployable services |
| **ACID** | Atomicity, Consistency, Isolation, Durability |
| **Cursor (PL/SQL)** | Pointer to query result set |
| **Trigger** | Auto-executing DB code on events |
| **Stored Procedure** | Named compiled PL/SQL code block |
| **Index** | Database structure for faster queries |
| **JOIN** | Combine rows from multiple tables |

---

That's **everything** in Section 3, covered thoroughly. Drop the next subject and we keep cooking! 🔥