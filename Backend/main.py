import os
import httpx
from fastapi import FastAPI, Form, HTTPException
from fastapi.responses import JSONResponse
import logging

app = FastAPI()

# Claves de reCAPTCHA
RECAPTCHA_SECRET_KEY = os.getenv("RECAPTCHA_SECRET_KEY")



logging.basicConfig(level=logging.DEBUG)

@app.post("/api/contact")
async def contact(
    name: str = Form(...),
    email: str = Form(...),
    message: str = Form(...),
    recaptcha_response: str = Form(...),
    honeypot: str = Form("")
):
    logging.debug(f"Datos recibidos: name={name}, email={email}, message={message}")
    
    if honeypot:
        logging.debug("Honeypot detectado. Rechazando formulario.")
        raise HTTPException(status_code=400, detail="Formulario rechazado debido a un bot detectado.")

    async with httpx.AsyncClient() as client:
        recaptcha_url = "https://www.google.com/recaptcha/api/siteverify"
        recaptcha_payload = {
            'secret': RECAPTCHA_SECRET_KEY,
            'response': recaptcha_response
        }
        recaptcha_res = await client.post(recaptcha_url, data=recaptcha_payload)
        recaptcha_data = recaptcha_res.json()
        logging.debug(f"Respuesta de reCAPTCHA: {recaptcha_data}")

    if not recaptcha_data.get("success"):
        logging.debug("reCAPTCHA no válido.")
        raise HTTPException(status_code=400, detail="reCAPTCHA no válido.")

    formsubmit_url = "https://formsubmit.co/dany20bl69@gmail.com"
    form_data = {
        'name': name,
        'email': email,
        'message': message
    }

    async with httpx.AsyncClient() as client:
        response = await client.post(formsubmit_url, data=form_data)
        logging.debug(f"Respuesta de Formsubmit: {response.status_code} - {response.text}")

    if response.status_code == 200:
        return JSONResponse(content={"message": "¡Mensaje enviado con éxito!"}, status_code=200)
    else:
        logging.error(f"Error al enviar a Formsubmit: {response.status_code} - {response.text}")
        raise HTTPException(status_code=500, detail="Error al enviar el mensaje.")