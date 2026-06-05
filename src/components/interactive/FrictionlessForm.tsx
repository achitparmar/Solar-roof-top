import React, { useState } from 'react';

export default function FrictionlessForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    postcode: '',
    name: '',
    phone: '',
  });

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.postcode.length >= 4) {
      setStep(2);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Lead captured: ${JSON.stringify(formData)}`);
    // In a real app, send to API/Formspree/Zapier
  };

  return (
    <div id="quote" className="bg-white rounded-2xl shadow-2xl p-8 border border-slate-100 max-w-lg mx-auto scroll-mt-24">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Get Your Free Quote</h2>
        <p className="text-slate-500 italic">We'll call you back within 2 hours — guaranteed.</p>
      </div>

      <div className="relative overflow-hidden">
        {step === 1 && (
          <form onSubmit={handleNext} className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
            <div>
              <label htmlFor="postcode" className="block text-sm font-semibold text-slate-700 mb-2">
                Enter your Postcode to check eligibility
              </label>
              <input
                type="text"
                id="postcode"
                placeholder="e.g. 4000"
                required
                maxLength={4}
                value={formData.postcode}
                onChange={(e) => setFormData({ ...formData, postcode: e.target.value })}
                className="w-full h-14 px-4 rounded-xl border-2 border-slate-100 focus:border-orange-500 focus:ring-0 text-lg transition-all"
              />
            </div>
            <button
              type="submit"
              className="w-full h-14 bg-orange-500 text-white text-lg font-bold rounded-xl hover:bg-orange-600 active:scale-[0.98] transition-all shadow-lg shadow-orange-500/20"
            >
              Next Step
            </button>
            <p className="text-center text-xs text-slate-400">
              Your data is secure and never shared with 3rd parties.
            </p>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleSubmit} className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-2">
                Your Full Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="John Doe"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full h-14 px-4 rounded-xl border-2 border-slate-100 focus:border-orange-500 focus:ring-0 text-lg transition-all"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-semibold text-slate-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                placeholder="0412 345 678"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full h-14 px-4 rounded-xl border-2 border-slate-100 focus:border-orange-500 focus:ring-0 text-lg transition-all"
              />
            </div>
            <button
              type="submit"
              className="w-full h-14 bg-orange-500 text-white text-lg font-bold rounded-xl hover:bg-orange-600 active:scale-[0.98] transition-all shadow-lg shadow-orange-500/20"
            >
              Text Me The Quote
            </button>
            <button 
              type="button" 
              onClick={() => setStep(1)}
              className="w-full text-slate-400 text-sm hover:text-slate-600"
            >
              ← Back to step 1
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
