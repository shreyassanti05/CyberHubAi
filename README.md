# CyberHub AI

CyberHub AI is an intelligent platform designed for phishing detection, link scanning, and cyber risk assessment. It leverages a modern tech stack to provide an intuitive dashboard for users while running sophisticated machine learning models on the backend.

## Architecture & Structure

The repository is divided into several main components:

- **`frontend/`**: The user interface built with Next.js, React, and Tailwind CSS. It features a comprehensive dashboard, link scanner UI, and user authentication components.
- **`backend/`**: A RESTful API built with FastAPI (Python) that handles authentication, database interactions, and serves as a bridge to the AI engine.
- **`ai-engine/`**: The core intelligence module containing training and inference scripts.
  - `training/`: Scripts used to train the machine learning models.
  - `inference/`: Scripts for real-time link prediction (`predict_link.py`), risk assessment (`risk_engine.py`), URL feature extraction (`url_features.py`), and external verification checks.
- **`models/`**: Stores the trained machine learning models, such as `phishing_model.pkl`.
- **`database/`**: Contains database schemas and connection configurations used by the backend.
- **Datasets**: Contains data files like `dataset_phishtank.csv` used for training the phishing detection models.

## Getting Started

### Prerequisites
- Node.js & npm (for the frontend)
- Python 3.8+ (for backend and ai-engine)

### Frontend Setup
1. Navigate to the `frontend/` directory.
2. Install dependencies: `npm install`
3. Run the development server: `npm run dev`

### Backend Setup
1. Navigate to the `backend/` directory.
2. Install Python dependencies: `pip install -r requirements.txt`
3. Start the FastAPI server (e.g., using uvicorn): `uvicorn app.main:app --reload`

## License
MIT License
