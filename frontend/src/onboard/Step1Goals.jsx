import { HEALTH_GOAL_OPTIONS } from './constants'
import Navbar from '../components/NavBar'

export default function Step1Goals({ selected, onToggle, onNext }) {
  const handleCheckboxChange = (goalKey) => {
    onToggle(goalKey)
  }

  return (
    <div>
      <Navbar />
      <div
        className="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden"
        style={{
          '--checkbox-tick-svg': "url('data:image/svg+xml,%3csvg viewBox=%270 0 16 16%27 fill=%27rgb(14,21,27)%27 xmlns=%27http://www.w3.org/2000/svg%27%3e%3cpath d=%27M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z%27/%3e%3c/svg%3e')",
          fontFamily: 'Lexend, "Noto Sans", sans-serif'
        }}
      >
        <div className="layout-container flex h-full grow flex-col">
          <div className="px-20 flex flex-1 justify-center py-5">
            <div className="layout-content-container flex flex-col w-[1100px] max-w-[1100px] py-5 flex-1">
              <div className="flex flex-col gap-3 p-4">
                <div className="flex gap-6 justify-between">
                  <p className="text-[#0e151b] text-base font-medium leading-normal">Step 1 of 4</p>
                </div>
                <div className="rounded bg-[#d0dde7]">
                  <div className="h-2 rounded bg-[#47a6ea]" style={{ width: '25%' }}></div>
                </div>
              </div>
              <h2 className="text-[#0e151b] tracking-light text-[28px] font-bold leading-tight px-4 text-center pb-3 pt-5">
                What are your primary health goals?
              </h2>
              <p className="text-[#0e151b] text-base font-normal leading-normal pb-3 pt-1 px-4 text-center">
                Select all that apply. This will help us tailor your supplement recommendations.
              </p>
              <div className="px-4">
                {HEALTH_GOAL_OPTIONS.map((goal) => (
                  <label key={goal.key} className="flex gap-x-3 py-3 flex-row">
                    <input
                      type="checkbox"
                      checked={selected.includes(goal.key)}
                      onChange={() => handleCheckboxChange(goal.key)}
                      className="h-5 w-5 rounded border-[#d0dde7] border-2 bg-transparent text-[#47a6ea] checked:bg-[#47a6ea] checked:border-[#47a6ea] checked:bg-[image:--checkbox-tick-svg] focus:ring-0 focus:ring-offset-0 focus:border-[#d0dde7] focus:outline-none"
                    />
                    <p className="text-[#0e151b] text-base font-normal leading-normal">{goal.label}</p>
                  </label>
                ))}
              </div>
              <div className="flex px-4 py-3 justify-end">
                <button
                  onClick={onNext}
                  className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#47a6ea] text-[#0e151b] text-sm font-bold leading-normal tracking-[0.015em]"
                >
                  <span className="truncate">Next</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
