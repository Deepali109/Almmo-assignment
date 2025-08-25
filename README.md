# Affiliate Tracking System (Postback URL – S2S Tracking)

This project is an MVP implementation of an **Affiliate Tracking System** using **Node.js, Express, PostgreSQL, and Next.js**.  
It allows tracking **clicks** and **conversions** via S2S Postback URLs, and provides an **Affiliate Dashboard** to view performance.

---

## 🚀 Features

- Track **Clicks** from affiliates under campaigns
- Track **Conversions** using Postback URLs
- Store data in **PostgreSQL** (affiliates, campaigns, clicks, conversions)
- Simple **Affiliate Dashboard (Frontend)** to display:
  - Clicks (grouped by campaigns)
  - Conversions (with amount & currency)
- Uses **environment variables** for secure DB connection
- Fully REST-based APIs

---

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js  
- **Database:** PostgreSQL  
- **Frontend:** Next.js (React + TailwindCSS)  
- **Other:** CORS enabled, REST APIs  

---

## 📂 Project Structure

newassignment/
│── backend/ # Node.js + Express backend
│ ├── db.js # PostgreSQL connection
│ ├── server.js # Backend entry point
│ └── routes/ # API routes (clicks, postbacks, affiliates)
│
│── frontend/ # Next.js frontend
│ ├── src/app/ # Next.js app router pages
│ │ ├── page.js # Login (enter Affiliate ID)
│ │ └── dashboard/page.js # Dashboard UI
│ └── styles/ # Global CSS
│
│── README.md # Project documentation


---

## 🗄️ Database Schema

### `affiliates` table
| Column | Type    |
|--------|---------|
| id     | SERIAL PRIMARY KEY |
| name   | VARCHAR |

### `campaigns` table
| Column | Type    |
|--------|---------|
| id     | SERIAL PRIMARY KEY |
| name   | VARCHAR |

### `clicks` table
| Column       | Type    |
|--------------|---------|
| id           | SERIAL PRIMARY KEY |
| affiliate_id | INT (FK → affiliates) |
| campaign_id  | INT (FK → campaigns) |
| click_id     | VARCHAR (UNIQUE) |
| timestamp    | TIMESTAMP DEFAULT now() |

### `conversions` table
| Column     | Type    |
|------------|---------|
| id         | SERIAL PRIMARY KEY |
| click_id   | INT (FK → clicks) |
| amount     | DECIMAL |
| currency   | VARCHAR |
| timestamp  | TIMESTAMP DEFAULT now() |

---

## ⚙️ Setup Instructions

### 1. Clone repository
```bash
git clone https://github.com/Deepali109/Almmo-assignment.git
cd newassignment
```
### 1. Setup Database (PostgreSQL)
Login into PostgreSQL:
```bash
psql -U postgres
```
Create database and tables:
```bash
CREATE DATABASE affiliate_db;
\c affiliate_db

-- Affiliates table
CREATE TABLE affiliates (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100)
);

-- Campaigns table
CREATE TABLE campaigns (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100)
);

-- Clicks table
CREATE TABLE clicks (
  id SERIAL PRIMARY KEY,
  affiliate_id INT REFERENCES affiliates(id),
  campaign_id INT REFERENCES campaigns(id),
  click_id VARCHAR(255) UNIQUE,
  timestamp TIMESTAMP DEFAULT NOW()
);

-- Conversions table
CREATE TABLE conversions (
  id SERIAL PRIMARY KEY,
  click_id INT REFERENCES clicks(id),
  amount DECIMAL,
  currency VARCHAR(10),
  timestamp TIMESTAMP DEFAULT NOW()
);
```
Insert sample data:
```bash
INSERT INTO affiliates (name) VALUES ('Affiliate A'), ('Affiliate B');
INSERT INTO campaigns (name) VALUES ('Campaign 1'), ('Campaign 10');
```
## 3️⃣ Backend Setup
```bash
cd backend
npm install
```
Create .env file in backend/:
```bash
DB_PASSWORD=yourpassword
```
Run backend:
```bash
node server.js
```
Server runs at → http://localhost:3001

## 4️⃣ Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Frontend runs at → http://localhost:3000

## 🔗 API Endpoints
📌 Track Click
```bash
GET /click?affiliate_id=1&campaign_id=10&click_id=xyz01
```
👉 Stores a Click for affiliate under a campaign.

📌 Track Conversion (Postback URL)
```bash
GET /postback?affiliate_id=1&click_id=xyz01&amount=50&currency=USD
```
👉 Stores a Conversion for the given click.

📌 Get Conversions by Affiliate
```bash
GET /affiliate/1/conversions
```
👉 Returns all Conversions for affiliate 1.

📌 Get Clicks by Affiliate
```bash
GET /affiliate/1/clicks
```
✅ Returns all Clicks for affiliate 1 with campaign info.

## 🖥️ Frontend Flow

Login Page → Enter Affiliate ID → Redirects to Dashboard

Dashboard Sections:

📊 Clicks → List of clicks grouped by campaign

💰 Conversions → List of conversions with amount, currency, and time
