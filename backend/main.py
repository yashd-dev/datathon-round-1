from pytesseract import image_to_string
from pdf2image import convert_from_path
from flask import Flask, request, jsonify
import os
from flask_cors import CORS


app = Flask(__name__)
CORS(app)


def extract_text(file_path):
    images = convert_from_path(file_path)
    text_content = ""
    for image in images:
        image = image.point(lambda x: 0 if x < 100 else 255)
        text = image_to_string(image)
        text_content += text
    return text_content


@app.post("/upload_pdf")
def upload_pdf():
    f = request.files.get("file")
    if not f:
        return jsonify({"success": False, "message": "No File"})
    f.save(os.path.join("uploads", f.filename))
    text = extract_text(os.path.join("uploads", f.filename))
    return jsonify(
        {
            "success": True,
            "message": "File extracted successfully",
            "data": {"text": text},
        }
    )


if __name__ == "__main__":
    app.run(debug=True)