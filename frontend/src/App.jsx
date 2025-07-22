import { Routes, Route, Navigate } from 'react-router-dom'
import LandingPage from './components/LandingPage'
import SignupForm   from './components/SignupForm'
import LoginForm    from './components/LoginForm'
import OnboardingWizard from './components/OnboardingWizard'
import RecommendationsPage from './components/RecommendationsPage'

function App() {
  const token = localStorage.getItem('accessToken')
  const hasProfile = Boolean(localStorage.getItem('hasProfile'))
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signup" element={<SignupForm />} />
      <Route path="/login"  element={<LoginForm />} />

      <Route
        path="/onboard"
        element={
          token ? <OnboardingWizard /> : <Navigate to="/login" replace />
        }
      />

      <Route
        path="/dashboard"
        element={
          token && hasProfile
            ? <RecommendationsPage />
            : <Navigate to={token ? "/onboard" : "/login"} replace />
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  
  )
}

export default App
