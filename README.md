# CAD-Viewer
A web-based application to upload, view, and manipulate 3D models (e.g., .obj or .stl files) in the browser. Built with React, Three.js, and Flask.


Features
Upload 3D models (.obj or .stl files).

View 3D models in the browser with interactive controls (rotate, zoom, pan).

Export models in different formats (e.g., .obj to .stl).

Clean and modern user interface.

Technologies Used
Frontend: React, Three.js

Backend: Flask

Styling: CSS

Prerequisites
Before running the application, ensure you have the following installed:

Node.js (for the React frontend)

Python (for the Flask backend)

pip (Python package manager)

Setup and Installation
1. Clone the Repository
bash
Copy
git clone https://github.com/your-username/cad-viewer.git
cd cad-viewer
2. Set Up the Backend
Navigate to the backend folder:

bash
Copy
cd backend
Create a virtual environment (optional but recommended):

bash
Copy
python -m venv venv
Activate the virtual environment:

On Windows:

bash
Copy
venv\Scripts\activate
On macOS/Linux:

bash
Copy
source venv/bin/activate
Install the required Python packages:

bash
Copy
pip install -r requirements.txt
Start the Flask backend:

bash
Copy
python app.py
The backend will run at http://127.0.0.1:5000.

3. Set Up the Frontend
Open a new terminal window and navigate to the frontend folder:

bash
Copy
cd ../frontend
Install the required Node.js packages:

bash
Copy
npm install
Start the React frontend:

bash
Copy
npm start
The frontend will run at http://localhost:3000.

Running the Application
Open your browser and go to http://localhost:3000.

Upload a 3D model file (e.g., .obj or .stl).

Interact with the model using your mouse:

Left-click and drag to rotate.

Right-click and drag to pan.

Scroll to zoom.

Use the export buttons to download the model in a different format.
