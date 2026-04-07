# Chrome NLP Text Analyzer

A Chrome extension that analyzes selected text on web pages using a FastAPI backend and transformer-based NLP models.

Select any text on a webpage, right-click "Analyze with NLP", and instantly get sentiment analysis, text classification, and named entity recognition results.

---

## How It Works

1. User selects text on any webpage
2. Right-clicks and selects "Analyze with NLP" (or opens the extension popup)
3. Chrome extension sends the text to the FastAPI backend
4. Backend runs the NLP pipeline (sentiment, classification, NER)
5. Results are displayed in a clean popup UI

---

## Project Structure

```
chrome-nlp-project/
│
├── nlp/                    # NLP engine
│   ├── __init__.py
│   ├── preprocess.py       # Text cleaning
│   ├── sentiment.py        # Sentiment analysis (DistilBERT)
│   ├── classifier.py       # Zero-shot text classification
│   ├── ner.py              # Named entity recognition
│   └── pipeline.py         # Orchestrates all NLP modules
│
├── extension/              # Chrome extension (Manifest V3)
│   ├── manifest.json
│   ├── background.js       # Context menu handler
│   ├── popup.html          # Extension popup UI
│   ├── popup.js            # API calls and result rendering
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
│
├── app.py                  # FastAPI backend
├── main.py                 # Local test script
├── requirements.txt
└── README.md
```

---

## NLP Pipeline

| Module | Task | Model |
|--------|------|-------|
| `sentiment.py` | Sentiment Analysis | `distilbert-base-uncased-finetuned-sst-2-english` |
| `classifier.py` | Zero-shot Classification | `facebook/bart-large-mnli` (default) |
| `ner.py` | Named Entity Recognition | `dbmdz/bert-large-cased-finetuned-conll03-english` (default) |

Categories for classification: technology, business, politics, entertainment, sports, education.

---

## Example Output

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

## Setup

### 1. Clone and install

```bash
git clone https://github.com/YOUR_USERNAME/chrome-nlp-project.git
cd chrome-nlp-project
python -m venv venv
source venv/bin/activate  # Mac/Linux
# venv\Scripts\activate   # Windows
pip install -r requirements.txt
```

### 2. Start the backend

```bash
uvicorn app:app --reload
```

The API will be available at `http://127.0.0.1:8000`. You can test it at `http://127.0.0.1:8000/docs`.

### 3. Load the Chrome extension

1. Open `chrome://extensions` in Chrome
2. Enable **Developer mode** (top right toggle)
3. Click **Load unpacked**
4. Select the `extension/` folder

### 4. Use it

- Select any text on a webpage
- Right-click and choose **"Analyze with NLP"**
- Or click the extension icon and type/paste text manually
- Results appear in the popup: sentiment, category, and named entities

---

## API Reference

### POST /analyze

**Request:**

```json
{
  "text": "Your text to analyze"
}
```

**Response:** See example output above.

**Errors:**
- `400` — Empty text or text too short (min 3 characters)
- Text longer than 1000 characters is automatically truncated

---

## Local Test (without API)

```bash
python main.py
```

Runs the NLP pipeline directly on a sample sentence and prints the JSON result.

---

## Tech Stack

- **Backend:** Python, FastAPI, Uvicorn
- **NLP:** Hugging Face Transformers, PyTorch
- **Extension:** Chrome Manifest V3, vanilla JavaScript
- **Models:** Loaded lazily on first request and cached in memory

---

## Future Improvements

- Highlight entities directly on the webpage
- Add text summarization
- Multi-language support
- Improved UI with dark mode
- Deploy backend to cloud (Railway, Render, etc.)
