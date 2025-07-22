// src/components/Hero.jsx
import { Link } from 'react-router-dom'
import heroBg from '../assets/images/yoga.jpg'

export default function Hero() {
  return (
    <div className="px-4 md:px-40 flex justify-center py-8">
      <div className="flex flex-col max-w-[1000px] flex-1">
        <div
          className="flex flex-col items-center justify-center gap-8 p-4 bg-cover bg-center bg-no-repeat min-h-[480px] rounded-none md:rounded-xl"
          style={{
            backgroundImage: `
              linear-gradient(
                rgba(0, 0, 0, 0.1) 0%,
                rgba(0, 0, 0, 0.4) 100%
              ),
              url(${heroBg})
            `,
          }}
        >
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-white text-4xl md:text-5xl font-black leading-tight tracking-[-0.033em]">
              Find the Perfect Supplements for Your Health Goals
            </h1>
            <h2 className="text-white text-sm md:text-base font-normal leading-normal">
              Discover personalized supplement recommendations tailored to your unique
              needs and wellness aspirations. Our app simplifies your journey to optimal
              health with expert guidance and easy-to-use features.
            </h2>
          </div>

          <Link
            to="/signup"
            className="flex items-center justify-center min-w-[84px] max-w-[480px] h-10 px-4 md:h-12 md:px-5 bg-[#0c7ff2] text-slate-50 text-sm md:text-base font-bold rounded-xl tracking-[0.015em] hover:bg-[#0a6cdc] transition"
          >
            <span className="truncate">Take Our Quiz</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
