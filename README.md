# UnivBot

**UnivBot** is a full-stack AI-powered assistant built using **Next.js** and **Gemini API**, designed to provide a personalized, context-aware FAQ experience for college students. Users can upload documents (like handbooks, syllabi, or policies) or input custom information, and UnivBot will intelligently answer questions using that data.

---

## 🔧 Core Concepts

### 🧠 Prompting

We use carefully crafted prompts to guide the Gemini model into understanding the user's intent. These prompts dynamically include context from the uploaded documents to improve relevance.

### 📊 Structured Output

The Gemini API is guided to return structured JSON responses using few-shot examples and prompt templates. This allows easy parsing and better UI rendering, such as categorizing answers or suggesting follow-ups.

### ⚙️ Function Calling

Gemini’s function calling is leveraged for actions like:

* Fetching document metadata
* Summarizing uploaded files
* Searching relevant sections from stored user documents

Function definitions are passed into the prompt, and the model chooses when to invoke them.

### 🔍 RAG (Retrieval-Augmented Generation)

UnivBot uses a basic RAG pipeline:

* Document chunks are stored and retrieved using similarity search (basic in-memory or local vector store).
* Retrieved chunks are injected into the prompt for Gemini, improving factual accuracy and contextual grounding.

---

## ⚙️ Implementation Stack

* **Frontend**: Next.js (App Router)
* **Backend**: Next.js API Routes
* **LLM**: Google Gemini API
* **File Upload**: Client uploads are parsed and chunked for context building

---

## ✅ Evaluation Criteria

### ✔️ Correctness

Answers are backed by user-uploaded or provided documents using Gemini’s generation + RAG, ensuring factual accuracy.

### ⚡ Efficiency

Context retrieval and function calls are optimized using chunking and prompt templating to minimize latency and cost.

### 📈 Scalability

Built on Next.js API routes, the system can be easily scaled using Vercel or edge functions. Gemini API is highly scalable for inference.