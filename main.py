from fastapi import FastAPI, Request, Form, HTTPException, Header
from fastapi.responses import JSONResponse
from pydantic import BaseModel, EmailStr
from typing import Optional
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os
from dotenv import load_dotenv
import requests

# Cargar variables de entorno (para credenciales de correo y reCAPTCHA)
load_dotenv()

app = FastAPI()

# Configuración del servidor SMTP
SMTP_SERVER = "smtp.gmail.com"
SMTP_PORT = 587
SMTP_USERNAME = os.getenv("SMTP_USERNAME")  # Tu correo electrónico
SMTP_PASSWORD = os.getenv("SMTP_PASSWORD")  # Tu contraseña de aplicación
RECAPTCHA_SECRET_KEY = os.getenv("RECAPTCHA_SECRET_KEY")  # Tu clave secreta de reCAPTCHA

class ContactForm(BaseModel):
    name: str
    email: EmailStr
    message: str
    honeypot: Optional[str] = None

def send_email(name: str, email: str, message: str):
    """Envía un correo electrónico con los datos del formulario."""
    try:
        # Crear el mensaje
        msg = MIMEMultipart()
        msg["From"] = SMTP_USERNAME
        msg["To"] = SMTP_USERNAME  # Enviar a ti mismo
        msg["Subject"] = f"Nuevo mensaje de contacto de {name}"

        body = f"""
        Nombre: {name}
        Correo: {email}
        Mensaje:
        {message}
        """
        msg.attach(MIMEText(body, "plain"))

        # Conectar al servidor SMTP y enviar el correo
        with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
            server.starttls()
            server.login(SMTP_USERNAME, SMTP_PASSWORD)
            server.sendmail(SMTP_USERNAME, SMTP_USERNAME, msg.as_string())

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al enviar el correo: {str(e)}")

def validate_recaptcha(recaptcha_response: str):
    """Valida la respuesta del reCAPTCHA con la API de Google."""
    url = "https://www.google.com/recaptcha/api/siteverify"
    payload = {
        "secret": RECAPTCHA_SECRET_KEY,
        "response": recaptcha_response,
    }
    response = requests.post(url, data=payload)
    result = response.json()
    return result.get("success", False)

@app.post("/contact")
async def contact_form(
    request: Request,
    name: str = Form(...),
    email: str = Form(...),
    message: str = Form(...),
    honeypot: str = Form(None),
    recaptcha_response: str = Header(None),  # Captura la respuesta del reCAPTCHA
):
    # Validar el campo honeypot
    if honeypot:
        raise HTTPException(status_code=400, detail="Spam detectado")

    # Validar el reCAPTCHA
    if not validate_recaptcha(recaptcha_response):
        raise HTTPException(status_code=400, detail="reCAPTCHA no válido")

    # Enviar el correo electrónico
    send_email(name, email, message)

    return JSONResponse(content={"message": "Mensaje enviado con éxito"}, status_code=200)