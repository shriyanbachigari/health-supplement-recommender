// src/components/Features.jsx
export default function Features() {
  const features = [
    {
      title: "Personalized Assessment",
      text: "Answer a few questions about your health goals, lifestyle, and dietary preferences.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="currentColor" viewBox="0 0 256 256">
          <path d="M178,32c-20.65,0-38.73,8.88-50,23.89C116.73,40.88,98.65,32,78,32A62.07,62.07,0,0,0,16,94c0,70,103.79,126.66,108.21,129a8,8,0,0,0,7.58,0C136.21,220.66,240,164,240,94A62.07,62.07,0,0,0,178,32ZM128,206.8C109.74,196.16,32,147.69,32,94A46.06,46.06,0,0,1,78,48c19.45,0,35.78,10.36,42.6,27a8,8,0,0,0,14.8,0c6.82-16.67,23.15-27,42.6-27a46.06,46.06,0,0,1,46,46C224,147.61,146.24,196.15,128,206.8Z"/>
          <path d="M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Z"/>
        </svg>
      )
    },
    {
      title: "Expert Recommendations",
      text: "Receive a curated list of supplements from our team of health experts.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="currentColor" viewBox="0 0 256 256">
          <path d="M223.45,40.07a8,8,0,0,0-7.52-7.52C139.8,28.08,78.82,51,52.82,94a87.09,87.09,0,0,0-12.76,49c.57,15.92,5.21,32,13.79,47.85l-19.51,19.5a8,8,0,0,0,11.32,11.32l19.5-19.51C81,210.73,97.09,215.37,113,215.94q1.67.06,3.33.06A86.93,86.93,0,0,0,162,203.18C205,177.18,227.93,116.21,223.45,40.07ZM153.75,189.5c-22.75,13.78-49.68,14-76.71.77l88.63-88.62a8,8,0,0,0-11.32-11.32L65.73,179c-13.19-27-13-54,.77-76.71,22.09-36.47,74.6-56.44,141.31-54.06C210.2,114.89,190.22,167.41,153.75,189.5Z"/>
        </svg>
      )
    },
    {
      title: "Seamless Integration",
      text: "Easily incorporate your recommended supplements into your daily routine.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="currentColor" viewBox="0 0 256 256">
          <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm64-88a8,8,0,0,1-8,8H128a8,8,0,0,1-8-8V72a8,8,0,0,1,16,0v48h48A8,8,0,0,1,192,128Z"/>
        </svg>
      )
    },
  ]

  return (
    <div className="px-4 md:px-40">
      <div className="max-w-[1000px] mx-auto grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {features.map(({ title, text, icon }) => (
          <div key={title} className="flex flex-col gap-3 p-4 bg-white border border-[#cedbe8] rounded-lg">
            <div className="text-[#0d141c]">
              {icon}
            </div>
            <h2 className="text-[#0d141c] text-base font-bold leading-tight">
              {title}
            </h2>
            <p className="text-[#49739c] text-sm">
              {text}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
