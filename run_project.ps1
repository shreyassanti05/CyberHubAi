$ErrorActionPreference = "Stop"

Write-Host "Setting up Python Backend..." -ForegroundColor Cyan
pip install -r backend/requirements.txt
if ($LASTEXITCODE -ne 0) { throw "Pip install failed" }

Write-Host "Ensuring model exists..." -ForegroundColor Cyan
if (-Not (Test-Path "models/phishing_model.pkl")) {
    Write-Host "Model not found, running training..." -ForegroundColor Yellow
    python ai-engine/training/train_model.py
}

Write-Host "Setting up Node Frontend..." -ForegroundColor Cyan
Set-Location frontend
if (-Not (Test-Path "node_modules")) {
    npm install
}

Write-Host "Starting Servers..." -ForegroundColor Green
# Start frontend in background
Start-Process npm -ArgumentList "run dev" -NoNewWindow
Set-Location ../backend

# Start backend
uvicorn app.main:app --reload
