# Datalytics - ML Model Comparison Dashboard

Datalytics (NeuralForge-auto-ML) is a powerful full-stack platform designed to streamline the machine learning lifecycle, from data ingestion to model training, comparison, and interactive prediction visualization.

## 🚀 Full Tech Stack

### Frontend (Client)
- **Framework**: Next.js (React)
- **Styling**: Tailwind CSS
- **Animations & 3D**: Framer Motion, React Three Fiber (`@react-three/drei`, `three`)
- **Data Visualization**: Plotly.js (`react-plotly.js`), Recharts
- **HTTP Client**: Axios

### Backend (Server)
- **Framework**: FastAPI
- **Server**: Uvicorn
- **Data Processing**: Pandas, NumPy
- **Machine Learning**: Scikit-Learn, XGBoost, CatBoost
- **Visualization (Server-side)**: Plotly

### Infrastructure & Deployment
- **Platform**: Render (configured via `render.yaml`)
- **Architecture**: Separated frontend (`node` environment) and backend (`python` environment) web services.

---

## 🔄 Full Workflow

### 1. Data Ingestion & Integration
The platform allows you to import datasets from a variety of external and local sources.
- **Local Uploads**: Direct upload of CSV and JSON files.
- **Cloud Databases**: Direct integration with MongoDB and MySQL databases.
- **Web Sources**: Import directly from Google Sheets.
- **Process**: Secure authentication and session management via the FastAPI backend ensure that your data sources are safely connected and your ingestion pipeline is seamless.

### 2. Data Profiling & Preprocessing
Once the data is ingested, the system profiles it to understand its structure and quality.
- **Cleaning**: Handling missing values, outliers, and duplicates.
- **Transformation**: Encoding categorical variables and scaling numerical features.
- **Process**: The Next.js frontend provides an intuitive interface to review the dataset and select preprocessing steps, which are executed efficiently by Pandas/NumPy on the FastAPI backend.

### 3. Model Training & Comparison
Train multiple models simultaneously to determine the best fit for your dataset.
- **Algorithms**: Support for various algorithms via Scikit-Learn, plus advanced gradient boosting with XGBoost and CatBoost.
- **Comparison**: Compare models based on accuracy, precision, recall, F1-score, and other relevant metrics.
- **Process**: Users select their target variable and desired models. The backend trains these models, tracking their performance metrics and returning the results to the client.

### 4. Prediction & Visualization
Visualize the results and use the best model for new predictions.
- **Interactive Dashboards**: Rich, interactive charts and graphs built with Plotly and Recharts.
- **Real-time Predictions**: Input new data points to get instant predictions from your trained models.
- **Process**: The dashboard provides a comprehensive view of model performance and data insights. Users can interact with the 3D elements (powered by Three.js) and dynamic charts to fully understand their ML pipeline's outputs.

---

## 📂 Project Structure

- `/client` - Contains the Next.js frontend application (React, Tailwind, Plotly).
- `/server` - Contains the FastAPI backend application (Python, Scikit-Learn, XGBoost).
- `render.yaml` - Configuration file for seamlessly deploying both services to Render.

---

## 🛠️ Getting Started (Local Development)

### 1. Start the Backend
Navigate to the server directory, install dependencies, and start the FastAPI server:
```bash
cd server
python -m venv venv
# On Windows: venv\Scripts\activate
# On Mac/Linux: source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload
```

### 2. Start the Frontend
Navigate to the client directory, install dependencies, and start the Next.js development server:
```bash
cd client
npm install
npm run dev
```

Both development servers will now be running. You can access the frontend dashboard in your browser to begin testing the data workflows.
