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



---

### Zero-shot prompting 
→ Asking an AI to perform a task **without giving any examples**, only instructions.

### **Examples**

1. **Sentiment Analysis**
   *Prompt:* “Is this review positive, negative, or neutral?
   Review: *I love the new phone!*”
   *Output:* `Positive`

2. **Language Translation**
   *Prompt:* “Translate to French: I am learning AI.”
   *Output:* `J'apprends l'IA.`

3. **Text Classification**
   *Prompt:* “Classify this: ‘Bitcoin price hits \$70k’ → Options: Finance, Sports, Health.”
   *Output:* `Finance`

---

### One-shot prompting 
→ You give the AI **one example** of the task before asking it to solve a similar problem.

### **Example**

**Prompt:**

```
Example: 
Input: "I love this movie!" → Sentiment: Positive

Now, analyze this: 
Input: "The food was terrible." → Sentiment:
```

**Output:**

```
Negative
```


---

### Dynamic prompting 
→ A technique where the **prompt changes automatically** based on **user input**, **context**, or **external data** to make AI responses more accurate and relevant.

### **Example**

**Scenario:** A travel chatbot.

**Prompt Template:**

```
User's location: {city}
Weather: {weather}
User: "Suggest me a place to visit."

AI Prompt (dynamic):  
"It's sunny in {city}. Suggest a good outdoor tourist spot."
```

**If city = "Delhi" & weather = "sunny":**

```
Output: "You can visit India Gate or Lodhi Gardens for a great outdoor experience."
```

---


### Multi-shot prompting
→ You give the AI **multiple examples** of how a task should be done before asking it to solve a similar problem. This helps the model understand the **pattern** better and improves accuracy.

### **Example**

**Prompt:**

```
Example 1:
Input: "I love this movie!" → Sentiment: Positive

Example 2:
Input: "This food is horrible." → Sentiment: Negative

Example 3:
Input: "The book was okay, nothing special." → Sentiment: Neutral

Now analyze this:
Input: "The game was fantastic!" → Sentiment:
```

**Output:**

```
Positive
```

---

### Chain-of-thought (CoT) prompting
→ A prompting technique where you ask the AI to **show its step-by-step reasoning** before giving the final answer. It helps the model solve **complex problems** more accurately.

---

### **Examples**

**1. Math Problem**
**Prompt:**

```
What is 25 × 12? Think step by step.
```

**Output:**

```
25 × 12 = (25 × 10) + (25 × 2) = 250 + 50 = 300.
Answer: 300
```

---

**2. Riddle Solving**
**Prompt:**

```
If John is older than Mary, and Mary is older than Sam, who is the oldest? Think step by step.
```

**Output:**

```
John > Mary > Sam.
So, John is the oldest.
```

---

**3. Word Problem**
**Prompt:**

```
A train travels 60 km in 1.5 hours. What is its average speed? Think step by step.
```

**Output:**

```
Speed = Distance ÷ Time = 60 ÷ 1.5 = 40 km/h.
Answer: 40 km/h.
```

---

### Embeddings
→ Numerical representations of text, images, or other data in a **high-dimensional vector space** where **similar items are close together**. They’re used for **semantic search, recommendation systems, clustering, and NLP tasks**.

---

### **Examples**

**1. Semantic Text Search**

* Input: `"Best pizza places in Delhi"`
* Embedding model converts the query & restaurant descriptions into vectors.
* Finds the **closest vectors** → returns most relevant pizza places.

---

**2. Document Similarity**

* Input documents:

  * Doc A: `"Machine learning improves AI."`
  * Doc B: `"Deep learning enhances artificial intelligence."`
* Their embeddings will be **close** → meaning they're **semantically similar**.

---

**3. Recommendation System**

* If you liked `"Interstellar"`, the system finds movies with **embedding vectors** closest to `"Interstellar"` and recommends them.

---

### Cosine Similarity
 → A metric used to measure **how similar two vectors are**, based on the **cosine of the angle** between them.

* Value ranges from **-1** to **1**:

  * **1** → exactly similar (same direction)
  * **0** → no similarity (orthogonal)
  * **-1** → completely opposite

### **Example**

Let’s say we have two vectors:

* **A = \[1, 2]**
* **B = \[2, 3]**

$$
\text{Cosine Similarity} = \frac{A \cdot B}{||A|| \, ||B||}
$$

**Step 1 — Dot product:**

$$
A \cdot B = (1)(2) + (2)(3) = 8
$$

**Step 2 — Magnitudes:**

$$
||A|| = \sqrt{1^2 + 2^2} = \sqrt{5}, \quad ||B|| = \sqrt{2^2 + 3^2} = \sqrt{13}
$$

**Step 3 — Cosine similarity:**

$$
\text{Cosine Similarity} = \frac{8}{\sqrt{5} \cdot \sqrt{13}} \approx 0.992
$$

**Interpretation:**
A and B are **very similar** because the cosine similarity is close to **1**.

---