# SuppleNet - Health Supplement Recommender

A deployed full-stack web application that provides personalized supplement recommendations to patients based on their health profiles and goals. Currently used by patients of healthcare practitioners to optimize their supplement regimens.

## What it does

- **Patient-focused platform**: Helps patients manage their supplement regimens as recommended by physician
- **Smart onboarding**: Collects comprehensive health information, goals, and preferences
- **Clinical recommendations**: Provides supplements tailored to individual patient profiles  
- **Regimen compliance**: Enables patients to track daily supplement schedules with custom timing

## Tech Stack

**Backend:** Django, PostgreSQL, JWT auth  
**Frontend:** React, Tailwind CSS  
**Deployment:** Docker, Nginx  
**Database:** PostgreSQL with 3000+ supplement records  

## Development Setup

For developers wanting to contribute or set up a local development environment:

```bash
git clone https://github.com/shriyanbachigari/health-supplement-recommender.git
cd health-supplement-recommender
docker-compose up --build
```

Visit `http://localhost:3000` for local development.

> **Note:** This is the development setup. The production application is deployed.

## Features

### Authentication
- Secure signup/login with JWT tokens
- Protected routes and session management

### Health Profiling  
- Multi-step onboarding wizard for comprehensive patient data collection
- Health goals, medical conditions, and lifestyle tracking
- Clinical-grade recommendations based on patient profiles
- Integration with healthcare provider workflows

### Supplement Management
- Browse complete supplement database with search and filtering
- Pagination for performance with large datasets
- Add to personal regimen with dosage/timing
- Visual organization by time of day (morning, evening, etc.)
- Direct links to purchase products
- Category-based browsing with visual icons

## API Endpoints

```
POST /api/signup/       # User registration
POST /api/token/        # Login
GET  /api/recommend/    # Get recommendations
GET  /api/supplements/  # Browse all supplements
POST /api/regimen/      # Manage supplement regimen
GET  /api/profile/      # User profile management
```

## Screenshots

### Landing Page
![Landing Page](screenshots/landing.png)
*Full homepage overview - clean design with clear navigation and call-to-action (zoomed out to show complete layout)*

### Sign Up
![Sign Up](screenshots/signup.png)
*User registration form with clean validation*

### Login
![Login](screenshots/login.png)
*Secure authentication interface*

### Onboarding Wizard
![Onboarding](screenshots/onboarding.png)
*Multi-step health profile creation process*

### Dashboard
![Dashboard](screenshots/dashboard.png)
*Daily supplement schedule organized by timing along with personalized recommendations with visual category icons*

### Supplements Directory
![Supplements](screenshots/supplements.png)
*Complete supplement database with search, filtering, and pagination*

### Add to Regimen Modal
![Add Modal](screenshots/add-modal.png)
*Easy supplement addition with dosage and timing options*

## What I learned

- Building production-grade REST APIs with Django
- Implementing secure JWT authentication for healthcare applications
- Advanced React state management and routing for complex workflows
- Docker containerization and production deployment
- Database design for patient data and clinical recommendations
- Healthcare application security and compliance considerations

## Future improvements

- Machine learning for better recommendations (scikit-learn)
- Supplement interaction warnings
- Progress tracking and analytics
- Mobile app

