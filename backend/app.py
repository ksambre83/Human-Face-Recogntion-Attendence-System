from flask import Flask, Response, jsonify, send_file
from flask_cors import CORS
import face_recognition
import cv2
import numpy as np
import os
import csv
from datetime import datetime
import pandas as pd

app = Flask(__name__)
CORS(app)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
KNOWN_DIR = os.path.join(BASE_DIR, "known_faces")
ATTENDANCE_FILE = os.path.join(BASE_DIR, "attendance.csv")
EXCEL_FILE = os.path.join(BASE_DIR, "attendance.xlsx")

TOL = 0.5
SCALE = 0.25

encs = []
names = []

# Load known faces
for f in os.listdir(KNOWN_DIR):
    if f.lower().endswith((".jpg", ".jpeg", ".png")):
        path = os.path.join(KNOWN_DIR, f)
        img = face_recognition.load_image_file(path)
        e = face_recognition.face_encodings(img)

        if e:
            encs.append(e[0])
            names.append(os.path.splitext(f)[0])

print("Known faces loaded:", names)

# Mark attendance
def mark_attendance(name):
    if name == "Unknown":
        return

    if not os.path.exists(ATTENDANCE_FILE):
        with open(ATTENDANCE_FILE, "w", newline="") as f:
            writer = csv.writer(f)
            writer.writerow(["Name", "Date", "Time"])

    existing_names = []

    with open(ATTENDANCE_FILE, "r") as f:
        reader = csv.reader(f)
        next(reader)
        existing_names = [row[0] for row in reader]

    if name not in existing_names:
        now = datetime.now()
        date = now.strftime("%d-%m-%Y")
        time = now.strftime("%H:%M:%S")

        with open(ATTENDANCE_FILE, "a", newline="") as f:
            writer = csv.writer(f)
            writer.writerow([name, date, time])


# CAMERA
camera = cv2.VideoCapture(0)

def generate_frames():
    while True:
        success, frame = camera.read()
        if not success:
            break

        small = cv2.resize(frame, (0, 0), fx=SCALE, fy=SCALE)
        rgb = cv2.cvtColor(small, cv2.COLOR_BGR2RGB)

        faces = face_recognition.face_locations(rgb, model="hog")

        if len(faces) > 0:
            face_encs = face_recognition.face_encodings(rgb, faces)
        else:
            face_encs = []

        for (top, right, bottom, left), face_enc in zip(faces, face_encs):
            name = "Unknown"

            matches = face_recognition.compare_faces(
                encs, face_enc, tolerance=TOL
            )
            dist = face_recognition.face_distance(encs, face_enc)

            if len(dist) > 0:
                best_match = np.argmin(dist)

                if matches[best_match]:
                    name = names[best_match]
                    mark_attendance(name)

            top = int(top / SCALE)
            right = int(right / SCALE)
            bottom = int(bottom / SCALE)
            left = int(left / SCALE)

            cv2.rectangle(
                frame, (left, top), (right, bottom), (0, 255, 0), 2
            )
            cv2.putText(
                frame,
                name,
                (left, top - 10),
                cv2.FONT_HERSHEY_SIMPLEX,
                0.8,
                (0, 255, 0),
                2,
            )

        ret, buffer = cv2.imencode(".jpg", frame)
        frame_bytes = buffer.tobytes()

        yield (
            b"--frame\r\n"
            b"Content-Type: image/jpeg\r\n\r\n" + frame_bytes + b"\r\n"
        )


# ROUTES
@app.route("/")
def home():
    return "AttendAI Backend Running Successfully 🚀"

@app.route("/video_feed")
def video_feed():
    return Response(
        generate_frames(),
        mimetype="multipart/x-mixed-replace; boundary=frame",
    )

@app.route("/download")
def download():
    if os.path.exists(ATTENDANCE_FILE):
        df = pd.read_csv(ATTENDANCE_FILE)
        df.to_excel(EXCEL_FILE, index=False)
        return send_file(EXCEL_FILE, as_attachment=True)

    return jsonify({"error": "No attendance file found"}), 404

@app.route("/get_attendance")
def get_attendance():
    if not os.path.exists(ATTENDANCE_FILE):
        return jsonify([])

    df = pd.read_csv(ATTENDANCE_FILE)
    students = [{"name": row["Name"]} for _, row in df.iterrows()]
    return jsonify(students)

if __name__ == "__main__":
    port=int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port,)