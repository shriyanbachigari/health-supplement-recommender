import { Navigate, Outlet } from 'react-router-dom'

export default function PrivateRoute() {
  const token = localStorage.getItem('accessToken')
  const hasProfile = localStorage.getItem('hasProfile') === 'true'

  // Debug logging
  console.log('PrivateRoute check:', { token: !!token, hasProfile })

  if (!token) {
    console.log('No token, redirecting to login')
    return <Navigate to="/login" replace />
  }
  if (!hasProfile) {
    console.log('No profile, redirecting to onboard')
    return <Navigate to="/onboard" replace />
  }
  
  console.log('Access granted to protected route')
  return <Outlet />
}