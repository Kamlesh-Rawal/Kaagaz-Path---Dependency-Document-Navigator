# Kaagaz Path – AI-Powered Document Dependency Solver

**Kaagaz Path** is a social-impact web application designed to help Indian citizens, rural families, students, senior citizens, and persons with disabilities navigate complex government paperwork.

It models government certificate requirements as a **Directed Acyclic Graph (DAG)** and utilizes **Kahn's Topological Sorting Algorithm** to calculate an actionable, step-by-step roadmap for obtaining certificates without getting blocked.

---

## Key Features

1. **Topological Dependency Solver (DAG Engine):**
   - Automatically orders document prerequisites.
   - Identifies root documents, blocked dependencies, and ready-to-apply steps.
   - Detects circular dependencies.
2. **Interactive Flowchart & Inspector:**
   - Visual tiered graph showing prerequisite flow.
   - Node drawer to inspect verified alternatives and official departmental URLs.
3. **Multilingual Support:**
   - English, Hindi (`हिन्दी`), and Kannada (`ಕನ್ನಡ`).
4. **Comprehensive Accessibility:**
   - Web Speech API Text-to-Speech (TTS) integration.
   - High Contrast toggle.
   - Dynamic font zoom controls.
5. **Digital Locker & Journey Tracker:**
   - Track active applications.
   - Updates progress percentages dynamically.
6. **Application Draft Generator:**
   - Generates formal legal drafts (Request Letters, Declarations, Missing Document Petitions).
   - Instant printable views.
7. **Zero-PII Privacy Protection:**
   - Strict privacy-by-design architecture: no real biometric identifiers, account numbers, or personal credentials stored.

---

## Quick Start (Local Setup)

### Prerequisites
- Node.js (v18.0.0 or higher)
- npm or yarn

### Installation
```bash
# 1. Unzip the archive and enter directory
unzip kaagaz-path.zip
cd kaagaz-path

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

Visit `http://localhost:5173` in your browser.
