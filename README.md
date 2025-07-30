# Health Supplement Recommender

A personalized health supplement recommendation system built with Django REST Framework and React.

## Features

- **Personalized Onboarding**: 4-step wizard to capture health goals, micronutrient interests, dietary restrictions, and personal info
- **ML-Powered Recommendations**: Intelligent supplement suggestions based on user preferences
- **Beautiful Dashboard**: Clean, modern interface with real-time data
- **User Authentication**: Secure JWT-based authentication system
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Tech Stack

- **Backend**: Django REST Framework, PostgreSQL, JWT Authentication
- **Frontend**: React, Tailwind CSS, React Router
- **Deployment**: Docker & Docker Compose

## Quick Start with Docker

1. **Clone the repository**
   ```bash
   git clone https://github.com/shriyanbachigari/health-supplement-recommender.git
   cd health-supplement-recommender
   ```

2. **Run with Docker Compose**
   ```bash
   docker-compose up --build
   ```

3. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000

## Manual Setup

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Create virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Run migrations**
   ```bash
   python manage.py migrate
   ```

5. **Start development server**
   ```bash
   python manage.py runserver
   ```

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```

## API Endpoints

- `POST /api/auth/register/` - User registration
- `POST /api/auth/login/` - User login
- `GET /api/profile/` - Get user profile
- `POST /api/onboard/` - Submit onboarding data
- `GET /api/recommend/` - Get personalized recommendations


## License

This project is licensed under the MIT License.
