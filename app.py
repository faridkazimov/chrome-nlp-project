from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from nlp.pipeline import analyze_text

app = FastAPI(title="Chrome NLP Text Analyzer")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["POST"],
    allow_headers=["*"],
)


class TextRequest(BaseModel):
    text: str


@app.post("/analyze")
def analyze(request: TextRequest):
    try:
        return analyze_text(request.text)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
