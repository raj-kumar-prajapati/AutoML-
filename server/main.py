"""
FastAPI main application entry point.
"""
from __future__ import annotations

import uuid
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from routers import data, upload, preprocess, train, predict

app = FastAPI(
    title="ML Dashboard API",
    description="FastAPI backend for the ML Model Comparison Dashboard",
    version="1.0.0",
)

# ── CORS ──────────────────────────────────────────────────────────────────────
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5174",
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "https://neuroforge-shqe.onrender.com",
    ],
    allow_origin_regex=r"https?://(localhost|127\.0\.0\.1|.*\.onrender\.com)(:\d+)?",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["X-Session-ID"],
)   


# ── Session-ID middleware ─────────────────────────────────────────────────────
@app.middleware("http")
async def session_middleware(request: Request, call_next):
    """
    Auto-generate a session ID if the client doesn't send one.
    Echo it back in the response header so the frontend can persist it.
    """
    session_id = request.headers.get("X-Session-ID")
    # FastAPI validates required headers from the request scope.
    # If the client doesn't send X-Session-ID, inject it here so endpoints
    # that declare it as required don't fail with 422.
    if not session_id:
        session_id = str(uuid.uuid4())
        headers = list(request.scope.get("headers") or [])
        headers.append((b"x-session-id", session_id.encode("latin-1")))
        request.scope["headers"] = headers

    response = await call_next(request)
    response.headers["X-Session-ID"] = session_id
    return response


# ── Routers ───────────────────────────────────────────────────────────────────
app.include_router(upload.router,     prefix="/api", tags=["Upload"])
app.include_router(data.router,       prefix="/api", tags=["Data"])
app.include_router(preprocess.router, prefix="/api", tags=["Preprocess"])
app.include_router(train.router,      prefix="/api", tags=["Train"])
app.include_router(predict.router,    prefix="/api", tags=["Predict"])


@app.get("/")
async def root():
    return {"message": "ML Dashboard API is running. Docs at /docs"}


@app.get("/health")
async def health():
    return {"status": "ok"}
