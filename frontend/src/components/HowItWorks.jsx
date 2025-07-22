// src/components/HowItWorks.jsx
import { Link } from 'react-router-dom'

export default function HowItWorks() {
  return (
    <div className="px-4 md:px-40 py-10">
      <div className="max-w-[1000px] mx-auto flex flex-col gap-10">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <h1 className="text-[#0d141c] text-2xl md:text-4xl font-bold leading-tight max-w-[720px]">
              How It Works
            </h1>
            <p className="text-[#0d141c] text-base max-w-[720px]">
              Our app uses a simple, three-step process to help you find the right supplements:
            </p>
          </div>
          <Link
            to="/signup"
            className="inline-block bg-[#0c7ff2] text-white text-sm md:text-base font-bold px-4 py-2 md:px-5 md:py-3 rounded-xl hover:bg-blue-600 transition w-fit"
          >
            Get Started Today
          </Link>
        </div>
      </div>
    </div>
  )
}
