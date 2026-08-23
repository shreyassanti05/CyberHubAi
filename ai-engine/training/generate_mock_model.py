import os
import pickle
from sklearn.ensemble import RandomForestClassifier

def generate_mock_model():
    print("Generating mock Random Forest Model...")
    
    # Create simple dummy data (length, dots, hyphens, https, ip, suspicious)
    # Class 0 = Safe, Class 1 = Phishing
    X_train = [
        [15, 1, 0, 1, 0, 0],  # Short, 1 dot, safe
        [20, 2, 0, 1, 0, 0],  # Normal, safe
        [80, 5, 2, 0, 1, 1],  # Phishing-like
        [100, 3, 3, 0, 0, 1], # Phishing-like
        [10, 1, 0, 1, 0, 0],  # Safe
        [120, 6, 4, 1, 1, 1]  # Phishing-like
    ]
    y_train = [0, 0, 1, 1, 0, 1]
    
    model = RandomForestClassifier(n_estimators=10, random_state=42)
    model.fit(X_train, y_train)
    
    # Ensure models directory exists
    current_dir = os.path.dirname(os.path.abspath(__file__))
    models_dir = os.path.abspath(os.path.join(current_dir, "../../models"))
    os.makedirs(models_dir, exist_ok=True)
    
    model_path = os.path.join(models_dir, "phishing_model.pkl")
    with open(model_path, "wb") as f:
        pickle.dump(model, f)
        
    print(f"Model saved successfully to {model_path}")

if __name__ == "__main__":
    generate_mock_model()
