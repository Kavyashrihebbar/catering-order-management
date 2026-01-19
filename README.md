# Catering Order Management System

A full-stack web application to manage catering orders efficiently.
Users can add catering orders, calculate total cost automatically, store data securely in a database, and view all orders in a clean UI.

## Project Idea

Managing catering orders manually can be time-consuming and error-prone.
This project provides a digital solution where:

* Catering orders can be added through a web interface
* Total amount is calculated automatically based on selected menu and guests
* Orders are stored permanently in a PostgreSQL database
* All orders can be viewed and deleted easily
* This project is suitable for:
* Catering businesses
* Event management companies
* Academic & placement projects

## Tech Stack

### Frontend

* React.js (Vite)
* HTML
* CSS
* JavaScript

### Backend

* FastAPI (Python)

### Database

* PostgreSQL

### Tools

* Git & GitHub
* VS Code
* pgAdmin / psql
* Uvicorn
  
## Project Structure

```text
catering-order-management/
│
├── backend/
│   ├── main.py
│   ├── database.py
│   ├── models.py
│   ├── schemas.py
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   └── package.json
│
└── README.md
```

## Setup Instructions

### Prerequisites

* Python 3.9+
* Node.js (v18+ recommended)
* PostgreSQL

### Backend Setup (FastAPI)

1️. Create virtual environment

```
python -m venv venv
```

2. Activate virtual environment
* Windows

```
venv\Scripts\activate
```

*Mac/Linux

```
source venv/bin/activate
```

3. Install dependencies

```
pip install -r requirements.txt
```

4. Configure database

Create a PostgreSQL database:

```
CREATE DATABASE catering_db;
```

Update database.py:

```
DATABASE_URL = "postgresql://postgres:your_password@127.0.0.1:5432/catering_db"
```

Run backend server

```
uvicorn main:app --reload
```

Backend will run at:

```
http://127.0.0.1:8000
```

Swagger Docs:

```
http://127.0.0.1:8000/docs
```

### Frontend Setup (React)

1. Navigate to frontend folder

```
cd frontend
```

2. Install dependencies

```
npm install
```

3. Start React app

```
npm run dev
```

Frontend will run at:

```
http://localhost:5173
```

### Database Check
To verify stored data:

```
psql -U postgres -d catering_db
```

```
SELECT * FROM orders;
```

## Author

Kavyashri Hebbar


    

