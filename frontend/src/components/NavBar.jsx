import { Link } from 'react-router-dom'
import { MdSpa } from 'react-icons/md'

export default function Navbar() {
  return (
    <header className="flex items-center justify-between border-b border-[#e7edf4] px-4 md:px-10 py-3 bg-white">
      
      <div className="flex items-center gap-4 text-[#0d141c]">
        <MdSpa className="text-[#0c7ff2] text-3xl" />
        <h2 className="text-[#0d141c] text-lg font-bold leading-tight tracking-[-0.015em]">
          SuppleNet
        </h2>
      </div>

      <div className="flex flex-1 justify-end gap-8">
        <div className="hidden sm:flex items-center gap-9">
          <Link to="/" className="text-[#0d141c] text-sm font-medium">
            Home
          </Link>
          <Link to="/dashboard" className="text-[#0d141c] text-sm font-medium">
            Supplements
          </Link>
          <Link to="/about" className="text-[#0d141c] text-sm font-medium">
            About Us
          </Link>
          <Link to="/contact" className="text-[#0d141c] text-sm font-medium">
            Contact
          </Link>
        </div>
        <Link
          to="/signup"
          className="flex items-center justify-center min-w-[84px] h-10 px-4 bg-[#0c7ff2] text-white text-sm font-bold rounded-xl hover:bg-blue-600 transition"
        >
          Get Started
        </Link>
      </div>
    </header>
  )
}
