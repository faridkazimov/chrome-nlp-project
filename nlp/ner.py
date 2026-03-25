from transformers import pipeline

_ner_model = None

def get_ner_model():
    global _ner_model
    if _ner_model is None:
        _ner_model = pipeline("ner", aggregation_strategy="simple")
    return _ner_model

def extract_entities(text: str) -> list:
    model = get_ner_model()
    results = model(text[:512])

    entities = []
    for item in results:
        word = item["word"].replace("##", "")

        entities.append({
            "text": word,
            "label": item["entity_group"],
            "start": int(item["start"]),
            "end": int(item["end"]),
            "score": float(item["score"])
        })

    return entities