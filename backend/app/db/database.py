import os
import json
import asyncio

class MockCollection:
    def __init__(self, name):
        self.file_path = os.path.join(os.path.dirname(__file__), f"{name}.json")
        if not os.path.exists(self.file_path):
            with open(self.file_path, "w") as f:
                json.dump([], f)

    async def insert_one(self, record):
        if "timestamp" in record:
             record["timestamp"] = str(record["timestamp"])
        with open(self.file_path, "r") as f:
            data = json.load(f)
        data.append(record)
        with open(self.file_path, "w") as f:
            json.dump(data, f)
        return True

class MockDB:
    def __getitem__(self, name):
        return MockCollection(name)

client = None
db = MockDB()
users_collection = db["users"]