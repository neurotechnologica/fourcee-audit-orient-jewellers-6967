
import React, { useState, useMemo } from 'react';

export const ValueCalculator: React.FC = () => {
  const [avgValue, setAvgValue] = useState(5000);
  const [missedCalls, setMissedCalls] = useState(20);
  const [staffSalary, setStaffSalary] = useState(3500);
  const [showInsights, setShowInsights] = useState(false);

  const results = useMemo(() => {
    const months = 12;
    const recoveryRate = 0.2;
    const automationShare = 0.3;

    const extraBookingsPerMonth = missedCalls * recoveryRate;
    const extraBookingsYear = extraBookingsPerMonth * months;
    const addedRevenue = extraBookingsYear * avgValue;

    const staffingSavings = staffSalary * months * automationShare;
    const totalBenefit = addedRevenue + staffingSavings;
    const monthlyBenefit = totalBenefit / months || 0;
    const firstMonthHurdle = 997;
    const roiMonths = monthlyBenefit > 0 ? firstMonthHurdle / monthlyBenefit : Infinity;

    return {
      annual: totalBenefit,
      roiMonths,
      recoveryRate,
      automationShare,
      extraBookingsPerMonth,
      extraBookingsYear,
      addedRevenue,
      staffingSavings,
      monthlyBenefit,
    };
  }, [avgValue, missedCalls, staffSalary]);

  const formatCurrency = (value: number) =>
    value.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

  const roiMonthsLabel =
    results.roiMonths === Infinity || Number.isNaN(results.roiMonths)
      ? '—'
      : results.roiMonths.toFixed(1);

  const rangeClass =
    'h-2 w-full cursor-pointer appearance-none rounded-full bg-zinc-800 accent-amber-500 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border [&::-webkit-slider-thumb]:border-amber-400/50 [&::-webkit-slider-thumb]:bg-gradient-to-br [&::-webkit-slider-thumb]:from-amber-200 [&::-webkit-slider-thumb]:to-amber-700 [&::-webkit-slider-thumb]:shadow-[0_0_12px_rgba(212,175,55,0.45)]';

  return (
    <div className="w-full min-w-0 rounded-[2rem] border border-white/10 bg-gradient-to-br from-zinc-950/80 via-black to-zinc-900 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] md:p-10">
      <h3 className="serif text-2xl font-bold text-slate-100">Value Calculator</h3>
      <p className="mb-6 mt-2 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 sm:text-xs">
        Calculate ROI now — see if Fourcee is even worth it for your current setup.
      </p>

      <div className="space-y-8">
        <div>
          <label className="mb-3 flex justify-between text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
            <span>Avg. Piece Value</span>
            <span className="text-slate-100">${avgValue.toLocaleString()}</span>
          </label>
          <input
            type="range"
            min="1000"
            max="50000"
            step="500"
            value={avgValue}
            onChange={(e) => setAvgValue(parseInt(e.target.value, 10))}
            className={rangeClass}
          />
        </div>

        <div>
          <label className="mb-3 flex justify-between text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
            <span>Monthly Missed Calls</span>
            <span className="text-slate-100">{missedCalls}</span>
          </label>
          <input
            type="range"
            min="0"
            max="100"
            step="5"
            value={missedCalls}
            onChange={(e) => setMissedCalls(parseInt(e.target.value, 10))}
            className={rangeClass}
          />
        </div>

        <div>
          <label className="mb-3 flex justify-between text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
            <span>Monthly Staff Salary Cost</span>
            <span className="text-slate-100">${staffSalary.toLocaleString()}</span>
          </label>
          <input
            type="range"
            min="1000"
            max="10000"
            step="100"
            value={staffSalary}
            onChange={(e) => setStaffSalary(parseInt(e.target.value, 10))}
            className={rangeClass}
          />
        </div>

        <div className="flex flex-col items-start justify-between gap-6 border-t border-white/10 pt-8 sm:flex-row sm:items-center">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Est. Annual Value</p>
            <p className="serif mt-1 text-4xl font-bold text-slate-100">{formatCurrency(results.annual)}</p>
          </div>
          <div className="rounded-full border border-amber-500/35 bg-gradient-to-r from-zinc-900 via-zinc-800 to-black px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-amber-100 shadow-[0_0_24px_rgba(212,175,55,0.15)]">
            ROI in {roiMonthsLabel} Months
          </div>
        </div>

        <button
          type="button"
          onClick={() => setShowInsights((prev) => !prev)}
          className="mt-2 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 transition-colors hover:text-slate-200"
        >
          <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-white/20 bg-white/5 text-[9px] font-semibold text-slate-300">
            i
          </span>
          <span>Show the math behind this ROI</span>
        </button>

        {showInsights && (
          <div className="mt-4 space-y-2 rounded-2xl border border-white/10 bg-black/60 px-5 py-4 text-xs leading-relaxed text-slate-300">
            <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-amber-200/90">
              How we arrive at your annual value
            </p>
            <p>
              • Missed-call recovery: {missedCalls} missed calls/month × {(results.recoveryRate * 100).toFixed(0)}% of
              those saved by Fourcee × 12 months × {formatCurrency(avgValue)} average piece value ≈{' '}
              <span className="font-semibold text-slate-100">{formatCurrency(results.addedRevenue)}</span> in reclaimed
              sales opportunity.
            </p>
            <p>
              • Front-desk efficiency: assuming Fourcee quietly handles {(results.automationShare * 100).toFixed(0)}%
              of your phone load, that&apos;s about{' '}
              <span className="font-semibold text-slate-100">{formatCurrency(results.staffingSavings)}</span> per year in
              staff time you can redirect to white-glove client work instead of chasing the phone.
            </p>
            <p>
              • Combined lift: {formatCurrency(results.addedRevenue)} + {formatCurrency(results.staffingSavings)} ≈{' '}
              <span className="font-semibold text-slate-100">{formatCurrency(results.annual)}</span> extra economic
              value flowing through your showroom each year at these inputs.
            </p>
            {roiMonthsLabel !== '—' && (
              <p>
                • Payback window (illustrative): first month subscription (e.g. {formatCurrency(997)} on Pro, setup
                waived on annual) vs about{' '}
                <span className="font-semibold text-slate-100">{formatCurrency(results.monthlyBenefit)}</span> of
                monthly uplift → roughly{' '}
                <span className="font-semibold text-slate-100">{roiMonthsLabel} months</span> to break even on that
                month, then upside.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
