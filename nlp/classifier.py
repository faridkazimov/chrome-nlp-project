from transformers import pipeline

_classifier_model = None

CANDIDATE_LABELS = [
    "technology",
    "business",
    "politics",
    "entertainment",
    "sports",
    "education"
]

def get_classifier_model():
    global _classifier_model
    if _classifier_model is None:
        _classifier_model = pipeline("zero-shot-classification")
    return _classifier_model

def classify_text(text: str) -> dict:
    model = get_classifier_model()
    result = model(text[:512], CANDIDATE_LABELS)

    return {
        "label": result["labels"][0],
        "score": float(result["scores"][0])
    }