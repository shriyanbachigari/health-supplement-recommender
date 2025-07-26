import { GENDER_OPTIONS } from './constants'
import Navbar from '../components/NavBar'

export default function Step4Profile({ age, gender, allergies, onChange, onFinish }) {
  const handleAgeChange = (e) => {
    onChange({ age: e.target.value, gender, allergies })
  }

  const handleGenderChange = (e) => {
    onChange({ age, gender: e.target.value, allergies })
  }

  const handleAllergiesChange = (e) => {
    const allergyList = e.target.value.split(',').map(item => item.trim()).filter(item => item)
    onChange({ age, gender, allergies: allergyList })
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
                  <p className="text-[#0e151b] text-base font-medium leading-normal">Step 4 of 4</p>
                </div>
                <div className="rounded bg-[#d0dde7]">
                  <div className="h-2 rounded bg-[#47a6ea]" style={{ width: '100%' }}></div>
                </div>
              </div>

              <h2 className="text-[#0e151b] tracking-light text-[28px] font-bold leading-tight px-4 text-center pb-3 pt-5">
                Tell us a bit about yourself
              </h2>
              <p className="text-[#0e151b] text-base font-normal leading-normal pb-10 pt-1 px-4 text-center">
                This helps us provide more personalized recommendations.
              </p>

              <div className="px-4 space-y-14">
                <div className="flex justify-center gap-16">
                  <div className="flex flex-col items-center gap-3">
                    <label className="text-[#0e151b] text-lg font-medium">Age</label>
                    <input
                      type="number"
                      value={age}
                      onChange={handleAgeChange}
                      placeholder="25"
                      min="13"
                      max="120"
                      className="w-32 h-10 px-3 rounded-xl border-2 border-[#d0dde7] bg-transparent text-[#0e151b] focus:border-[#47a6ea] focus:outline-none text-center"
                    />
                  </div>

                  <div className="flex flex-col items-center gap-3">
                    <label className="text-[#0e151b] text-lg font-medium">Gender</label>
                    <div className="flex gap-4">
                      {GENDER_OPTIONS.map((option) => (
                        <label key={option.key} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="gender"
                            value={option.key}
                            checked={gender === option.key}
                            onChange={handleGenderChange}
                            className="h-4 w-4 border-2 border-[#d0dde7] text-[#47a6ea] focus:border-[#47a6ea] focus:outline-none"
                          />
                          <span className="text-[#0e151b] text-base">{option.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-center">
                  <label className="text-[#0e151b] text-lg font-medium mb-3">Known Allergies</label>
                  <p className="text-gray-600 text-sm mb-2 text-center">
                    (Optional - separate multiple allergies with commas)
                  </p>
                  <input
                    type="text"
                    value={allergies.join(', ')}
                    onChange={handleAllergiesChange}
                    placeholder="e.g., peanuts, shellfish, dairy"
                    className="w-80 h-10 px-3 rounded-xl border-2 border-[#d0dde7] bg-transparent text-[#0e151b] focus:border-[#47a6ea] focus:outline-none text-center"
                  />
                </div>
              </div>

              <div className="flex px-4 py-8 justify-end">
                <button
                  onClick={onFinish}
                  className="flex min-w-[120px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 px-6 bg-[#47a6ea] text-white text-base font-bold leading-normal tracking-[0.015em] hover:bg-blue-600 transition-colors"
                >
                  <span className="truncate">Complete Setup</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
