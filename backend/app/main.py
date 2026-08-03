from fastapi import FastAPI

app = FastAPI(title="Home Advisor API")


@app.get("/health")
def health() -> dict[str, str]:
    """Smoke-test route: confirms the app boots and routing works."""
    return {"status": "ok"}
