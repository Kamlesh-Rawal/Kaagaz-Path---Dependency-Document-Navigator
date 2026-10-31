# API Documentation

The frontend includes a self-contained in-memory store and DAG resolution engine. For backend integrations (e.g., FastAPI / PostgreSQL), the following REST API endpoints are specified:

## 1. Services & Goals
- `GET /api/v1/services`
  - Returns list of verified citizen welfare schemes and target document IDs.
- `GET /api/v1/services/{service_id}`
  - Returns specific service metadata and issuing department.

## 2. Document Catalogue
- `GET /api/v1/documents`
  - Returns full registry of verified documents, issuing authorities, and accepted alternatives.
- `GET /api/v1/documents/{document_id}`
  - Returns details, prerequisite array, and official circular references.

## 3. Dependency Solver Engine
- `POST /api/v1/solver/resolve`
  - **Payload:**
    ```json
    {
      "target_doc_id": "DOC_INCOME_CERT",
      "user_owned_docs": ["DOC_AADHAAR", "DOC_ELECTRICITY_BILL"],
      "jurisdiction": "Karnataka"
    }
    ```
  - **Response:**
    Topologically ordered list with status tags (`AVAILABLE`, `READY_TO_APPLY`, `BLOCKED`).

## 4. Drafts & Assistant
- `POST /api/v1/drafts/generate`
  - Returns structured legal text templates based on user parameters.
