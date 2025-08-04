# SuppleNet - Health Supplement Recommender

A full-stack web app that recommends personalized supplements based on your health profile and goals.

## What it does

- **Smart onboarding**: Collects your health info, goals, and preferences
- **Personalized recommendations**: Shows supplements tailored to your profile  
- **Regimen management**: Add supplements to your daily routine with custom timing
- **Clean interface**: Easy to use on any device

## Tech Stack

**Backend:** Django, PostgreSQL, JWT auth  
**Frontend:** React, Tailwind CSS  
**Deployment:** Docker, Nginx  

## Quick Start

```bash
git clone https://github.com/shriyanbachigari/health-supplement-recommender.git
cd health-supplement-recommender
docker-compose up --build
```

Visit `http://localhost:3000` to try it out.

## Features

### Authentication
- Secure signup/login with JWT tokens
- Protected routes and session management

### Health Profiling  
- Multi-step onboarding wizard
- Health goals, conditions, lifestyle tracking
- Personalized recommendations based on your data

### Supplement Management
- Browse recommended supplements by category
- Add to personal regimen with dosage/timing
- Visual organization by time of day (morning, evening, etc.)
- Direct links to purchase products

## API Endpoints

```
POST /api/signup/       # User registration
POST /api/token/        # Login
GET  /api/recommend/    # Get recommendations
POST /api/regimen/      # Manage supplement regimen
```

## Screenshots

### Landing Page
![Landing Page](screenshots/landing.png)
*Clean, professional homepage with clear call-to-action*

### Onboarding Wizard
![Onboarding](screenshots/onboarding.png)
*Multi-step health profile creation process*

### Dashboard
![Dashboard](screenshots/dashboard.png)
*Personalized recommendations with visual category icons*

### Regimen Management
![Regimen](screenshots/regimen.png)
*Daily supplement schedule organized by timing*

### Add to Regimen Modal
![Add Modal](screenshots/add-modal.png)
*Easy supplement addition with dosage and timing options*

## What I learned

- Building REST APIs with Django
- JWT authentication implementation
- React state management and routing
- Docker containerization
- Database design for user profiles and recommendations

## Future improvements

- Machine learning for better recommendations (scikit-learn)
- Supplement interaction warnings
- Progress tracking and analytics
- Mobile app

