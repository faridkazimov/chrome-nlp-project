# Chrome NLP Text Analyzer

A Chrome extension-based NLP system that analyzes selected text on web pages using a FastAPI backend and transformer-based models.

---

## 🚀 Project Overview

This project allows users to select any text on a webpage and instantly analyze it using Natural Language Processing (NLP).

The system performs:

* Sentiment Analysis
* Text Classification
* Named Entity Recognition (NER)

---

## 🧠 How It Works

1. User selects text on a webpage
2. Chrome extension captures the selected text
3. Extension sends a request to the backend API
4. Backend runs NLP analysis
5. API returns structured JSON
6. Extension displays the results

---

## 🏗️ Project Structure

```
chrome-nlp-project/
│
├── nlp/
│   ├── __init__.py
│   ├── preprocess.py
│   ├── sentiment.py
│   ├── classifier.py
│   ├── ner.py
│   └── pipeline.py
│
├── main.py
├── requirements.txt
└── .gitignore
```

---

## 🧩 NLP Pipeline

Main function:

```python
from nlp.pipeline import analyze_text
```

Example usage:

```python
result = analyze_text("Apple opened a new office in London.")
print(result)
```

---

## 📤 Example Output

```json
{
  "text": "Apple opened a new office in London.",
  "sentiment": {
    "label": "positive",
    "score": 0.99
  },
  "classification": {
    "label": "business",
    "score": 0.87
  },
  "entities": [
    {
      "text": "Apple",
      "label": "ORG",
      "start": 0,
      "end": 5,
      "score": 0.98
    },
    {
      "text": "London",
      "label": "LOC",
      "start": 27,
      "end": 33,
      "score": 0.97
    }
  ]
}
```

---

## ⚙️ Local Setup

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/chrome-nlp-project.git
cd chrome-nlp-project
```

### 2. Create virtual environment

```bash
python -m venv venv
venv\Scripts\activate   # Windows
# or
source venv/bin/activate  # Mac/Linux
```

### 3. Install dependencies

```bash
pip install -r requirements.txt
```

### 4. Run local test

```bash
python main.py
```

---

## 🔌 Backend API (To Be Implemented)

The backend should be built using FastAPI.

### Endpoint:

```
POST /analyze
```

### Request:

```json
{
  "text": "Selected text"
}
```

### Implementation:

```python
from fastapi import FastAPI
from pydantic import BaseModel
from nlp.pipeline import analyze_text

app = FastAPI()

class TextRequest(BaseModel):
    text: str

@app.post("/analyze")
def analyze(request: TextRequest):
    return analyze_text(request.text)
```

### Run API:

```bash
uvicorn app:app --reload
```

### API Docs:

```
http://127.0.0.1:8000/docs
```

---

## 🌐 Chrome Extension (To Be Implemented)

The extension should:

* Get selected text from the browser
* Send it to the backend API
* Display results in a popup

### Suggested Structure:

```
extension/
├── manifest.json
├── popup.html
└── popup.js
```

---

## 👥 Team Responsibilities

### NLP (Completed)

* Text preprocessing
* Sentiment analysis
* Text classification
* Named entity recognition
* JSON output formatting

### Backend + Extension (Next Step)

* FastAPI integration
* API endpoint creation
* Chrome extension development
* UI for displaying results

---

## 🎯 Next Steps

1. Implement FastAPI backend
2. Connect NLP pipeline to API
3. Build Chrome extension UI
4. Connect extension to API
5. Improve UI and performance

---

## 📌 Notes

* Language: English
* Models: Hugging Face Transformers
* Models are automatically loaded using `pipeline(...)`
* NLP pipeline is fully functional

---

## 💡 Future Improvements

* Better UI for results
* Highlight entities on page
* Add text summarization
* Improve model accuracy
* Add multi-language support

---

## 🏁 Conclusion

The NLP engine is complete and ready.
Next step is integrating it with a backend API and Chrome extension.

---
