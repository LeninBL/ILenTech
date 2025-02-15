import httpx
from fastapi import FastAPI, Form, HTTPException
import os

app = FastAPI()

# Claves de reCAPTCHA
RECAPTCHA_SECRET_KEY = os.getenv("RECAPTCHA_SECRET_KEY")

@app.post("/contact")
async def contact(
    name: str = Form(...),
    email: str = Form(...),
    message: str = Form(...),
    recaptcha_response: str = Form(...),
):
    # Verificar reCAPTCHA
    async with httpx.AsyncClient() as client:
        recaptcha_url = "https://www.google.com/recaptcha/api/siteverify"
        recaptcha_payload = {
            'secret': RECAPTCHA_SECRET_KEY,
            'response': recaptcha_response
        }
        recaptcha_res = await client.post(recaptcha_url, data=recaptcha_payload)
        recaptcha_data = recaptcha_res.json()

    if not recaptcha_data.get("success"):
        raise HTTPException(status_code=400, detail="reCAPTCHA no válido.")
    
    return {"message": "¡Mensaje enviado con éxito!"}

