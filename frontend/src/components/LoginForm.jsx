// src/components/Login.jsx
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MdSpa } from 'react-icons/md'

export default function LoginForm() {
  const [email, setEmail]         = useState('')
  const [password, setPassword]   = useState('')
  const [rememberMe, setRemember] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async e => {
    e.preventDefault()
    const resp = await fetch('http://localhost:8000/api/token/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: email, password }),
    })
    const data = await resp.json()
    if (!resp.ok) {
      console.error(data)
      return alert('Login failed')
    }
    console.log('Access token:', data.access)
    localStorage.setItem('accessToken', data.access)
    localStorage.setItem('refreshToken', data.refresh)
    if (rememberMe) {
      localStorage.setItem('rememberMe', 'true')
    }
    const profileResp = await fetch('http://localhost:8000/api/profile/', {
      headers: { Authorization: `Bearer ${data.access}` }
    })
    const hasProfile = profileResp.ok
    localStorage.setItem('hasProfile', hasProfile ? 'true' : 'false')
    navigate(hasProfile ? '/dashboard' : '/onboard')
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <header className="flex items-center justify-between border-b border-[#e7edf4] px-4 md:px-10 py-3 bg-white">
        <div className="flex items-center gap-4 text-[#0d141c]">
          <MdSpa className="text-[#0c7ff2] text-3xl" />
          <h2 className="text-[#0d141c] text-lg font-bold leading-tight tracking-[-0.015em]">SuppleNet</h2>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-[#0c7ff2] bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-semibold text-sm">
            ?
          </div>
          <Link
            to="/signup"
            className="h-10 px-4 bg-[#0c7ff2] text-white text-sm font-bold rounded-xl hover:bg-blue-600 transition flex items-center"
          >
            Sign Up
          </Link>
        </div>
      </header>

      <main className="flex-1 flex justify-center py-5 px-4 md:px-40">
        <div className="w-full max-w-md bg-white rounded-lg ">
          <h2 className="text-[#0d141c] text-2xl font-bold text-center pt-5 pb-3">
            Welcome back
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4 px-4 py-3">
            <div>
              <label className="block text-[#0d141c] text-base font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full h-14 px-4 border border-[#cedbe8] rounded-xl bg-white placeholder-[#49739c] focus:outline-none focus:ring-0 focus:border-[#cedbe8]"
                required
              />
            </div>

            <div>
              <label className="block text-[#0d141c] text-base font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full h-14 px-4 border border-[#cedbe8] rounded-xl bg-white placeholder-[#49739c] focus:outline-none focus:ring-0 focus:border-[#cedbe8]"
                required
              />
            </div>

            <div className="flex justify-between items-center">
              <Link to="/forgot-password" className="text-[#49739c] text-sm underline">
                Forgot password?
              </Link>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={e => setRemember(e.target.checked)}
                  className="h-5 w-5 rounded border-[#cedbe8] bg-transparent text-[#0c7ff2] focus:ring-0"
                />
                <span className="text-[#0d141c] text-base">Remember me</span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full h-12 bg-[#0c7ff2] text-white text-base font-bold rounded-xl hover:bg-blue-600 transition"
            >
              Log In
            </button>
          </form>
        </div>
      </main>
    </div>
  )
}

