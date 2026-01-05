**Vaccination Coverage Tracker (VCT)**
A full-stack web application for tracking, analyzing, and visualizing vaccination coverage data across regions, age groups, and demographics. The system provides secure access to aggregated public health data through an interactive dashboard.
Live Application

**Backend API (Render)**
https://vaccination-coverage-tracker-3.onrender.com

**Frontend (Render)**
https://vaccination-coverage-tracker-2-1kgb.onrender.com

**Project Overview**

The Vaccination Coverage Tracker (VCT) was developed to support public health monitoring by providing:

Aggregated vaccination statistics

Regional and demographic breakdowns

Time-series analysis of vaccination trends

Secure access through authentication

The application is designed to be read-only, ensuring data privacy while supporting analytics and visualization.

**System Architecture**
Frontend (React)
     |
     |  HTTPS (JWT Auth)
     v
Backend API (Node.js + Express)
     |
     v
PostgreSQL (Database)

**Technology Stack**
Frontend
React
Axios
Chart.js / Recharts
Tailwind CSS

**Backend**
Node.js
Express.js
PostgreSQL
JWT Authentication
bcrypt

**Database**
PostgreSQL

**Deployment**
Backend: Render
Frontend: Vercel
Database: Neon

**Authentication**

The application uses JSON Web Tokens (JWT) for secure authentication.
Users must register and log in to access protected endpoints
JWT is sent in the Authorization header:
Authorization: Bearer <token>

**API Endpoints**
Authentication
**Method**	**Endpoint**	**Description**
POST	   /auth/register	   Register new user
POST	   /auth/login	     Authenticate user

**Metrics (Protected)**
**Method**	**Endpoint**	    **Description**
GET	    /metrics/overview	    Overall vaccination statistics
GET	    /metrics/region	      Statistics by region
GET	    /metrics/age-group	  Statistics by age group
GET	    /metrics/gender	      Statistics by gender
GET	    /metrics/time-series	Time-series vaccination data

**Database Schema**
Users Table
**Field**	**Type**	**Description**
id	       SERIAL	    Primary key
username	 VARCHAR	  Unique username
password	 VARCHAR	  Hashed password

**Vaccination Data Table**
**Field**	        **Type**	  **Description**
id	              SERIAL	        Primary key
region	         VARCHAR	      Geographic region
age_group	       VARCHAR	      Age category
gender	         VARCHAR	      Gender
doses_administered INTEGER	  Number of doses
date_recorded	   DATE	         Date of record

**Database Seeding**

The database is populated using a seed script:
node src/scripts/seedData.js


This inserts sample vaccination data for testing and visualization.

**Environment Variables**
Create a .env file in the backend directory:
PORT=5000
DATABASE_URL=your_neon_database_url
JWT_SECRET=your_secret_key

**Running Locally**
**Backend**
cd Backend
npm install
npm run dev

**Frontend**
cd frontend
npm install
npm start

**Security & Privacy**

Passwords are hashed using bcrypt

JWT authentication with expiration

No personal or identifiable health data stored

Aggregated and anonymized statistics only

**Features**

Secure authentication

Dashboard with real-time statistics

Demographic and regional analysis

Time-series visualization

Scalable cloud deployment

**Project Status**
Backend deployed and stable
Database connected and seeded
Frontend fully functional
API documentation completed


