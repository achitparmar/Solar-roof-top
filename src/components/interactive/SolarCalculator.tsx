import React, { useState, useEffect } from 'react';

export default function SolarCalculator() {
  const [bill, setBill] = useState(600); // Quarterly bill
  const [usage, setUsage] = useState('daytime');
  const [results, setResults] = useState({
    systemSize: 0,
    cost: 0,
    annualSavings: 0,
    payback: 0,
    roi: 0
  });

  const calculate = () => {
    // Basic solar math for AU (simplified for prototype)
    const dailyKwh = (bill / 90) / 0.30; // approx 30c per kWh
    let size = dailyKwh / 3.5; // AU average peak sun hours
    
    // Usage multipliers
    const usageFactor = usage === 'daytime' ? 0.9 : usage === 'evening' ? 0.5 : 0.7;
    
    // Recommended size (standard steps)
    const recommendedSize = size < 4 ? 3.3 : size < 7 ? 6.6 : size < 11 ? 10.5 : 13.2;
    
    const costPerKw = 1000; // After STCs approx $1000 per kW installed
    const totalCost = recommendedSize * costPerKw;
    
    const annualSavings = (recommendedSize * 3.5 * 365 * 0.25) * usageFactor; // 25c avg saving per kwh
    const payback = totalCost / annualSavings;
    const roi = ((annualSavings * 25 - totalCost) / totalCost) * 100;

    setResults({
      systemSize: recommendedSize,
      cost: totalCost,
      annualSavings,
      payback,
      roi
    });
  };

  useEffect(() => {
    calculate();
  }, [bill, usage]);

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-100 max-w-4xl mx-auto">
      <div className="grid md:grid-cols-2 gap-12">
        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-6">1. Your Energy Usage</h3>
            <label className="block text-sm font-semibold text-slate-700 mb-4">
              Average Quarterly Bill: <span className="text-orange-500 text-lg ml-2">${bill}</span>
            </label>
            <input 
              type="range" 
              min="200" 
              max="2000" 
              step="50"
              value={bill}
              onChange={(e) => setBill(parseInt(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
            />
            <div className="flex justify-between text-xs text-slate-400 mt-2">
              <span>$200</span>
              <span>$2000+</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-4">When do you use the most power?</label>
            <div className="grid grid-cols-2 gap-4">
              {[
                { id: 'daytime', label: 'Daytime', desc: 'Working from home' },
                { id: 'evening', label: 'Evening', desc: 'Families/Cookers' },
                { id: 'morning', label: 'Morning', desc: 'Early risers' },
                { id: 'allday', label: 'All Day', desc: 'Hybrid/Active' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setUsage(item.id)}
                  className={`p-4 rounded-xl border-2 text-left transition-all ${
                    usage === item.id 
                    ? 'border-orange-500 bg-orange-50/50 ring-1 ring-orange-500' 
                    : 'border-slate-100 hover:border-slate-200'
                  }`}
                >
                  <div className="font-bold text-slate-900">{item.label}</div>
                  <div className="text-xs text-slate-500">{item.desc}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-slate-900 rounded-2xl p-8 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 7V3L8 7l4 4V7zM16 17v4l4-4-4-4v4z" />
            </svg>
          </div>
          
          <h3 className="text-xl font-bold mb-8 text-orange-400">Your Solar Forecast</h3>
          
          <div className="space-y-6">
            <div className="flex justify-between items-end border-b border-slate-800 pb-4">
              <span className="text-slate-400">Recommended System</span>
              <span className="text-2xl font-bold">{results.systemSize} kW</span>
            </div>
            <div className="flex justify-between items-end border-b border-slate-800 pb-4">
              <span className="text-slate-400">Upfront Cost (Est.)</span>
              <span className="text-2xl font-bold text-orange-500">${Math.round(results.cost).toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-end border-b border-slate-800 pb-4">
              <span className="text-slate-400">Annual Savings</span>
              <span className="text-2xl font-bold text-green-400">${Math.round(results.annualSavings).toLocaleString()}</span>
            </div>
            
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="bg-slate-800 rounded-xl p-4 text-center">
                <div className="text-xs text-slate-400 uppercase tracking-wider mb-1">Payback</div>
                <div className="text-xl font-bold">{results.payback.toFixed(1)} Yrs</div>
              </div>
              <div className="bg-slate-800 rounded-xl p-4 text-center">
                <div className="text-xs text-slate-400 uppercase tracking-wider mb-1">25-Yr ROI</div>
                <div className="text-xl font-bold text-green-400">{Math.round(results.roi)}%</div>
              </div>
            </div>
          </div>

          <p className="mt-8 text-[10px] text-slate-500 leading-tight">
            *Estimates based on average Brisbane sun hours (3.5/day) and 30c/kWh utility rate. Actual results vary by roof orientation and shading.
          </p>
        </div>
      </div>
    </div>
  );
}
