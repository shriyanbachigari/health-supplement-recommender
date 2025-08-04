import { Routes, Route, Navigate } from 'react-router-dom'
import LandingPage from './components/LandingPage'
import SignupForm   from './components/SignupForm'
import LoginForm    from './components/LoginForm'
import OnboardingWizard from './onboard/OnboardingWizard'
import Dashboard from './components/Dashboard'
import SupplementsPage from './components/SupplementsPage'
import PrivateRoute from './components/PrivateRoute'

function App() {
  
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signup" element={<SignupForm />} />
      <Route path="/login" element={<LoginForm />} />

      <Route
        path="/onboard"
        element={
          localStorage.getItem('accessToken') ? <OnboardingWizard /> : <Navigate to="/login" replace />
        }
      />

      <Route element={<PrivateRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/supplements" element={<SupplementsPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
