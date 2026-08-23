# CyberHub AI

CyberHub AI is a next-generation cybersecurity platform designed to proactively identify, analyze, and mitigate cyber threats. At its core, the platform provides advanced **phishing detection**, **malicious link scanning**, and **real-time cyber risk assessment**. 

By combining a sleek, modern user interface with a powerful, machine learning-driven backend, CyberHub AI empowers users to browse and interact with digital content securely. The system leverages custom-trained AI models to extract features from URLs, assess behavioral risk patterns, and perform external verification checks—acting as a comprehensive shield against modern cyber attacks.

### Key Features
- **Intelligent Link Scanner**: Instantly analyze URLs for phishing indicators and malicious intent using trained ML models.
- **Dynamic Risk Engine**: Calculate comprehensive risk scores based on URL features, domain reputation, and historical threat data.
- **Interactive Dashboard**: A responsive, React/Next.js-based frontend providing users with detailed scan reports, history, and real-time alerts.
- **Robust API**: A high-performance FastAPI backend facilitating secure authentication, fast database queries, and seamless communication with the AI engine.

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
