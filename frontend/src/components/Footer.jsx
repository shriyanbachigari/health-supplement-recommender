// src/components/Footer.jsx
export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="px-4 md:px-40 py-10">
        <div className="max-w-[1000px] mx-auto flex flex-col items-center gap-6">
          <div className="flex flex-wrap justify-center gap-6">
            {['Privacy Policy','Terms of Service','Contact Us'].map(label => (
              <a key={label} href="#" className="text-[#49739c] text-base">
                {label}
              </a>
            ))}
          </div>
          <p className="text-[#49739c] text-base">@2025 SuppleNet. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
