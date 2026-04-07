from nlp.pipeline import analyze_text

if __name__ == "__main__":
    text = "Apple held a new event in Wroclaw."
    result = analyze_text(text)
    print(result)