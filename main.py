"""Deployment entrypoint for platforms expecting a top-level ASGI app."""

from backend.hrms_backend.asgi import application as app

