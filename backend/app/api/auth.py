from fastapi import APIRouter, HTTPException
from app.schemas.auth_schema import RegisterSchema, LoginSchema
from app.db.database import users_collection
from app.core.security import hash_password, verify_password, create_token

router = APIRouter()

@router.post("/register")
async def register(user: RegisterSchema):
    existing = await users_collection.find_one({"email": user.email})
    if existing:
        raise HTTPException(status_code=400, detail="User already exists")

    hashed = hash_password(user.password)

    new_user = {
        "name": user.name,
        "email": user.email,
        "password": hashed
    }

    await users_collection.insert_one(new_user)

    return {"message": "User registered successfully"}

@router.post("/login")
async def login(user: LoginSchema):
    db_user = await users_collection.find_one({"email": user.email})

    if not db_user or not verify_password(user.password, db_user["password"]):
        raise HTTPException(status_code=400, detail="Invalid credentials")

    token = create_token({"email": user.email})

    return {"token": token}


@router.post("/register")
async def register(user: RegisterSchema):
    existing = await users_collection.find_one({"email": user.email})
    if existing:
        raise HTTPException(status_code=400, detail="User already exists")

    hashed = hash_password(user.password)

    new_user = {
        "name": user.name,
        "email": user.email,
        "password": hashed
    }

    await users_collection.insert_one(new_user)

    token = create_token({"email": user.email})

    return {"message": "User registered", "token": token}

from google.oauth2 import id_token
from google.auth.transport import requests

@router.post("/google")
async def google_login(data: dict):
    try:
        idinfo = id_token.verify_oauth2_token(
            data["token"],
            requests.Request(),
            "YOUR_GOOGLE_CLIENT_ID"
        )

        email = idinfo["email"]

        user = await users_collection.find_one({"email": email})

        if not user:
            await users_collection.insert_one({
                "email": email,
                "name": idinfo.get("name", ""),
                "auth_type": "google"
            })

        token = create_token({"email": email})
        return {"token": token}

    except Exception:
        raise HTTPException(status_code=400, detail="Invalid Google token")
    

    otp_store = {}

@router.post("/send-otp")
async def send_otp(phone: str):
    otp = "123456"  # demo
    otp_store[phone] = otp
    return {"message": "OTP sent"}

@router.post("/verify-otp")
async def verify_otp(phone: str, otp: str):
    if otp_store.get(phone) != otp:
        raise HTTPException(status_code=400, detail="Invalid OTP")

    user = await users_collection.find_one({"phone": phone})

    if not user:
        await users_collection.insert_one({"phone": phone})

    token = create_token({"phone": phone})
    return {"token": token}