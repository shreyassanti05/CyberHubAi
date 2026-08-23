import pandas as pd
import random
import os
import sys
import pickle
import gc
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier

# Setup path so url_features is accessible
current_dir = os.path.dirname(os.path.abspath(__file__))
project_root = os.path.abspath(os.path.join(current_dir, "../../"))
inference_path = os.path.join(project_root, "ai-engine", "inference")
sys.path.append(inference_path)

from url_features import extract_features

def train():
    all_urls = []
    labels = []

    print("Loading PhishTank dataset...")
    phish_path = os.path.join(project_root, "dataset_phishtank.csv")
    try:
        df_phish = pd.read_csv(phish_path, usecols=['url'])
        phish_urls = df_phish['url'].dropna().tolist()
        print(f"Loaded {len(phish_urls)} phishing URLs (Label 1).")
        all_urls.extend(phish_urls)
        labels.extend([1] * len(phish_urls))
        del df_phish
    except Exception as e:
        print(f"Failed to load PhishTank dataset: {e}")
        return

    print("Loading Kaggle Webpages Classification dataset... (This could take a minute)")
    kaggle_path = os.path.join(project_root, "Webpages_Classification_test_data.csv")
    try:
        # We only need url and label columns to save memory
        df_kaggle = pd.read_csv(kaggle_path, usecols=['url', 'label'])
        # Filter for purely authentic good links
        df_good = df_kaggle[df_kaggle['label'] == 'good']
        good_urls = df_good['url'].dropna().tolist()
        print(f"Loaded {len(good_urls)} authentic 'good' URLs (Label 0).")
        
        all_urls.extend(good_urls)
        labels.extend([0] * len(good_urls))
        
        del df_good
        del df_kaggle
        gc.collect()
    except Exception as e:
        print(f"Failed to load Kaggle dataset: {e}")
        return

    print(f"Total Combined Dataset: {len(all_urls)} URLs.")
    
    # Shuffle prior to feature mapping so memory access is uniform
    print("Extracting features using standard pipeline...")
    X = []
    y = []
    total = len(all_urls)
    
    for i, url in enumerate(all_urls):
        if i % 50000 == 0:
            print(f"Processed feature extraction... {i}/{total}")
        try:
            feats = extract_features(str(url))
            X.append([
                feats["length"],
                feats["dots"],
                feats["hyphens"],
                feats["https"],
                feats["ip"],
                feats["suspicious"]
            ])
            y.append(labels[i])
        except Exception:
            pass # ignore problematic parse rows

    print("Executing final Train/Test Split...")
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.15, random_state=42)

    print(f"Training Scaled RandomForestClassifier on {len(X_train)} elements...")
    model = RandomForestClassifier(n_estimators=100, max_depth=15, random_state=42, n_jobs=-1)
    model.fit(X_train, y_train)

    accuracy = model.score(X_test, y_test)
    print(f"Model Training Complete. Held-out Test Accuracy: {accuracy * 100:.2f}%")

    models_dir = os.path.join(project_root, "models")
    os.makedirs(models_dir, exist_ok=True)
    
    model_path = os.path.join(models_dir, "phishing_model.pkl")
    with open(model_path, "wb") as f:
        pickle.dump(model, f)
        
    print(f"Real High-Capacity Model securely saved to {model_path}.")

if __name__ == "__main__":
    train()