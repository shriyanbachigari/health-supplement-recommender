// src/components/SignUp.jsx
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MdSpa } from 'react-icons/md'

export default function SignupForm() {
  const [name, setName] = useState('')
  const [email, setEmail]     = useState('')
  const [password, setPassword] = useState('')
  const [agreed, setAgreed]   = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async e => {
    e.preventDefault()
    const resp = await fetch('http://localhost:8000/api/signup/', {
      method: 'POST',
      headers: { 'Content-Type':'application/json' },
      body: JSON.stringify({
        username: email,
        email: email,
        password,
        first_name: name,
      }),
    })
    const data = await resp.json()
    if (!resp.ok) {
      console.error(data)
      return alert('Signup failed')
    }
    // Store tokens
    localStorage.setItem('accessToken', data.access)
    localStorage.setItem('refreshToken', data.refresh)
    localStorage.setItem('hasProfile', 'false')
    // Redirect into onboarding
    navigate('/onboard')
    console.log({ name, email, password, agreed })
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <header className="flex items-center justify-between border-b border-[#e7edf4] px-4 md:px-10 py-3 bg-white">
        <Link to="/" className="flex items-center gap-4 text-[#0d141c] hover:text-[#0c7ff2] transition-colors">
          <MdSpa className="text-[#0c7ff2] text-3xl" />
          <h2 className="text-[#0d141c] text-lg font-bold">SuppleNet</h2>
        </Link>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-[#0c7ff2] bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-semibold text-sm">
            ?
          </div>
          <Link
            to="/login"
            className="h-10 px-4 bg-[#0c7ff2] text-white text-sm font-bold rounded-xl hover:bg-blue-600 transition flex items-center"
          >
            Log In
          </Link>
        </div>
      </header>

      <main className="flex-1 flex justify-center py-5 px-4 md:px-40">
        <div className="w-full max-w-md bg-white rounded-lg">
          <h2 className="text-[#0d141c] text-2xl font-bold text-center pt-5 pb-3">
            Create your account
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4 px-4 py-3">
            <div>
              <label className="block text-[#0d141c] text-base font-medium mb-2">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full h-14 px-4 border border-[#cedbe8] rounded-xl bg-white placeholder-[#49739c] focus:outline-none focus:ring-0 focus:border-[#cedbe8]"
                required
              />
              <p className="text-[#49739c] text-sm mt-1">
                No spaces or special characters allowed.
              </p>
            </div>

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
                placeholder="Create a password"
                className="w-full h-14 px-4 border border-[#cedbe8] rounded-xl bg-white placeholder-[#49739c] focus:outline-none focus:ring-0 focus:border-[#cedbe8]"
                required
              />
              <p className="text-[#49739c] text-sm mt-1">
                Password must be at least 8 characters long and include at least one number and one special character.
              </p>
            </div>

            <div className="flex items-center space-x-3">
              <input
                id="agree"
                type="checkbox"
                checked={agreed}
                onChange={e => setAgreed(e.target.checked)}
                className="h-5 w-5 rounded border-[#cedbe8] bg-transparent text-[#0c7ff2] focus:ring-0"
                required
              />
              <label htmlFor="agree" className="text-[#0d141c] text-base">
                I agree to the{' '}
                <Link to="/terms" className="underline text-blue-600">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className="underline text-blue-600">
                  Privacy Policy
                </Link>.
              </label>
            </div>

            <button
              type="submit"
              className="w-full h-12 bg-[#0c7ff2] text-white text-base font-bold rounded-xl hover:bg-blue-600 transition"
            >
              Sign Up
            </button>
          </form>
        </div>
      </main>
    </div>
  )
}
