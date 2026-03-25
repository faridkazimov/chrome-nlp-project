from nlp.preprocess import clean_text
from nlp.sentiment import analyze_sentiment
from nlp.classifier import classify_text
from nlp.ner import extract_entities

MAX_TEXT_LENGTH = 1000
MIN_TEXT_LENGTH = 3


def analyze_text(text: str) -> dict:
    cleaned = clean_text(text)

    if not cleaned:
        raise ValueError("Text cannot be empty.")

    if len(cleaned) < MIN_TEXT_LENGTH:
        raise ValueError("Text is too short.")

    if len(cleaned) > MAX_TEXT_LENGTH:
        cleaned = cleaned[:MAX_TEXT_LENGTH]

    return {
        "text": cleaned,
        "sentiment": analyze_sentiment(cleaned),
        "classification": classify_text(cleaned),
        "entities": extract_entities(cleaned)
    }