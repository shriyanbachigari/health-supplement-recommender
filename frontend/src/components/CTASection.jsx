// src/components/CTASection.jsx
import { Link } from 'react-router-dom'

export default function CTASection() {
  return (
    <div className="px-4 md:px-40 flex justify-center py-30">
      <div className="max-w-[1000px] mx-auto flex flex-col items-center gap-8">
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-[#0d141c] text-2xl md:text-4xl font-bold leading-tight max-w-[720px] text-center">
            Ready to Elevate Your Health?
          </h1>
          <p className="text-[#0d141c] text-base max-w-[720px] text-center">
            Begin your personalized supplement journey today and unlock a healthier, more vibrant you.
          </p>
        </div>
        <Link
          to="/signup"
          className="min-w-[84px] px-4 py-2 md:px-5 md:py-3 bg-[#0c7ff2] text-white text-sm md:text-base font-bold rounded-xl hover:bg-blue-600 transition"
        >
          Start Your Journey
        </Link>
      </div>
    </div>
  )
}
