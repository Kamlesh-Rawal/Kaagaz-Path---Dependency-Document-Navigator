# Architecture & Technical Specifications

## 1. System Overview
Kaagaz Path implements a deterministic graph-based dependency resolution engine paired with a modern React UI.

```
+-----------------------------------------------------------+
|                       Presentation                        |
|  - Responsive React 18 Components                         |
|  - Tailwind CSS Styling (Forest Green / Teal Palette)    |
|  - Multilingual Dictionaries (EN, HI, KN)                 |
|  - Web Speech API TTS & Accessibility Layer               |
+-----------------------------+-----------------------------+
                              |
+-----------------------------v-----------------------------+
|                     Algorithmic Core                      |
|  - Directed Acyclic Graph (DAG) Representation            |
|  - Kahn's Algorithm (Topological Sort)                    |
|  - Cycle & Blocking Detection Engine                      |
|  - Alternative Credential Verification Logic              |
+-----------------------------+-----------------------------+
                              |
+-----------------------------v-----------------------------+
|                     Data Layer (Store)                    |
|  - Verified Master Document Catalogue                     |
|  - State Service Schemas (Sakala / Revenue Circulars)     |
|  - Local Storage / State Digital Locker (Zero PII)        |
+-----------------------------------------------------------+
```

## 2. Dependency Resolution Algorithm
The solver treats documents as vertices $V$ and prerequisites as directed edges $E$:
- **Root Nodes:** In-degree $= 0$ (e.g., Electricity Bill, Passport Photo).
- **Intermediate Nodes:** Require prerequisites (e.g., Domicile Certificate).
- **Target Goal Nodes:** Sinks representing the desired certificate.

### Algorithm Steps:
1. Traverse transitive prerequisites using Depth First Search (DFS).
2. Calculate in-degrees for all required sub-graph nodes.
3. Apply Kahn's Algorithm to produce an optimal topological order.
4. Compare nodes against user-held documents:
   - If document is owned $ightarrow$ `AVAILABLE` / `COMPLETED`.
   - If unowned and has missing prerequisites $ightarrow$ `BLOCKED`.
   - If unowned and all prerequisites are satisfied $ightarrow$ `READY_TO_APPLY`.
