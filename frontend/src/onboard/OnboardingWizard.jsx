import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Step1Goals    from './Step1Goals'
import Step2Micros   from './Step2Micros'
import Step3Diet     from './Step3Diet'
import Step4Profile  from './Step4Profile'

export default function OnboardingWizard() {
  const [step, setStep] = useState(1)
  const navigate = useNavigate()
  const [data, setData] = useState({
    health_goals: [], micronutrient_interests: [], dietary_restrictions: [],
    budget_min: '', budget_max: '', age: '', gender: '', known_allergies: []
  })

  const update = (field, value) =>
    setData(d => ({ ...d, [field]: value }))

  const next = () => setStep(s => s + 1)

  switch(step) {
    case 1:
      return (
        <Step1Goals
          selected={data.health_goals}
          onToggle={key => {
            const arr = data.health_goals.includes(key)
              ? data.health_goals.filter(x=>x!==key)
              : [...data.health_goals, key]
            update('health_goals', arr)
          }}
          onNext={next}
        />
      )
    case 2:
      return (
        <Step2Micros
          selected={data.micronutrient_interests}
          onToggle={key => {
            const arr = data.micronutrient_interests.includes(key)
              ? data.micronutrient_interests.filter(x=>x!==key)
              : [...data.micronutrient_interests, key]
            update('micronutrient_interests', arr)
          }}
          onNext={next}
        />
      )
    case 3:
      return (
        <Step3Diet
          selectedDiet={data.dietary_restrictions}
          onToggleDiet={key => {
            const arr = data.dietary_restrictions.includes(key)
              ? data.dietary_restrictions.filter(x=>x!==key)
              : [...data.dietary_restrictions, key]
            update('dietary_restrictions', arr)
          }}
          budgetMin={data.budget_min}
          budgetMax={data.budget_max}
          onChangeBudget={(min,max) => {
            update('budget_min', min)
            update('budget_max', max)
          }}
          onNext={next}
        />
      )
    case 4:
      return (
        <Step4Profile
          age={data.age}
          gender={data.gender}
          allergies={data.known_allergies}
          onChange={({age,gender,allergies}) => {
            update('age', age)
            update('gender', gender) 
            update('known_allergies', allergies)
          }}
          onFinish={async () => {
            const token = localStorage.getItem('accessToken')
            const response = await fetch('http://localhost:8000/api/onboard/', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              },
              body: JSON.stringify(data)
            })
            if (response.ok) {
              localStorage.setItem('hasProfile', 'true')
              navigate('/dashboard')
            } else if (response.status === 401) {
              // Token expired or invalid, redirect to login
              localStorage.removeItem('accessToken')
              localStorage.removeItem('hasProfile')
              navigate('/login')
            } else {
              // Handle other errors
              console.error('Onboarding failed:', response.status)
              alert('Failed to save your profile. Please try again.')
            }
          }}
        />
      )
    default:
      return null
  }
}