import { Routes, Route, Navigate } from 'react-router-dom'
import LandingPage from './components/LandingPage'
import SignupForm   from './components/SignupForm'
import LoginForm    from './components/LoginForm'
import OnboardingWizard from './onboard/OnboardingWizard'
import RecommendationsPage from './components/RecommendationsPage'
import PrivateRoute from './components/PrivateRoute'

function App() {
  const token = localStorage.getItem('accessToken')
  
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signup" element={<SignupForm />} />
      <Route path="/login" element={<LoginForm />} />

      <Route
        path="/onboard"
        element={
          token ? <OnboardingWizard /> : <Navigate to="/login" replace />
        }
      />

      <Route element={<PrivateRoute />}>
        <Route path="/dashboard" element={<RecommendationsPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
