import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function CallCoach360Setup() {
  const [businessType, setBusinessType] = useState('Small, Medium Business');
  const [teamSize, setTeamSize] = useState('50+ members');

  const steps = [
    { number: 1, label: 'Select Business', active: true },
    { number: 2, label: 'Add Team', active: false },
    { number: 3, label: 'Connect Calls', active: false },
    { number: 4, label: 'Add score cards', active: false },
    { number: 5, label: 'Launch', active: false }
  ];

  return (
    <div className="min-h-screen bg-[#f5f5f0] flex flex-col">
      {/* Top Blue Bar */}
      <div className="bg-blue-600 h-1 w-full"></div>

      {/* Header */}
      <div className="pt-30 pb-4 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 mb-8">
            <span className="text-gray-600 text-sm">Call Coach</span>
            <span className="text-green-600 font-semibold text-sm">360°</span>
          </div>

          <h1 className="text-5xl font-bold text-gray-900 mb-3">
            Call Coach 360° - Setup
          </h1>
          <p className="text-gray-600 text-sm">
            Start creating new score card to audit call
          </p>
          <p className="text-gray-600 text-sm">
            with <span className="text-green-600 font-medium">Call Coach 360°</span>
          </p>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="px-8 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white border-2 border-dotted border-gray-300 rounded p-4">
            <div className="flex items-center">
              {steps.map((step, index) => (
                <React.Fragment key={step.number}>
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                        step.active
                          ? 'bg-green-500 text-white'
                          : 'bg-transparent text-gray-400'
                      }`}
                    >
                      {step.active ? '✓' : step.number}
                    </div>
                    <span
                      className={`text-sm whitespace-nowrap ${
                        step.active ? 'text-gray-700' : 'text-gray-400'
                      }`}
                    >
                      {step.label}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="flex-1 flex items-center px-4">
                      <div className="text-gray-300 text-xl">←</div>
                      <div className="flex-1 h-px bg-gray-300 mx-2"></div>
                      <div className="text-gray-300 text-xl">{step.number + 1}</div>
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-8 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white border-2 border-dotted border-gray-300 rounded p-12 h-full">
            <h2 className="text-4xl font-light text-gray-300 mb-8">
              Business Title
            </h2>

            <div className="mb-8">
              <p className="text-gray-800 mb-1">
                Write the name of your{' '}
                <span className="text-green-600 font-medium">Business/Agency</span>.
              </p>
              <p className="text-gray-800">
                Just add title and select{' '}
                <span className="text-green-600 font-medium">business type</span> and
                follow up some questions.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8 max-w-4xl">
              {/* Business Type Dropdown */}
              <div>
                <label className="block text-gray-500 text-xs mb-3">
                  Business Type
                </label>
                <div className="relative">
                  <select
                    value={businessType}
                    onChange={(e) => setBusinessType(e.target.value)}
                    className="w-full px-4 py-4 border border-gray-300 rounded-md appearance-none bg-white text-gray-400 text-base focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent cursor-pointer"
                  >
                    <option>Small, Medium Business</option>
                    <option>Enterprise</option>
                    <option>Startup</option>
                    <option>Agency</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Team Size Dropdown */}
              <div>
                <label className="block text-gray-500 text-xs mb-3">
                  Team size
                </label>
                <div className="relative">
                  <select
                    value={teamSize}
                    onChange={(e) => setTeamSize(e.target.value)}
                    className="w-full px-4 py-4 border border-gray-300 rounded-md appearance-none bg-white text-gray-400 text-base focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent cursor-pointer"
                  >
                    <option>50+ members</option>
                    <option>1-10 members</option>
                    <option>11-25 members</option>
                    <option>26-50 members</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}