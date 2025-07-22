export default function OnboardingWizard() {
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Onboarding Wizard</h2>
      <p className="mb-4">Welcome to the onboarding wizard! Let's get started.</p>
      {/* Add your onboarding steps here */}
      <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Start Onboarding
      </button>
    </div>
  );
}