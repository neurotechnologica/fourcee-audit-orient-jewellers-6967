import React, { useEffect, useMemo, useState } from 'react';
import logoUrl from '../assets/logo.png';
import placeholderGif from '../public/assets/placeholder.gif';
import nivodaGif from '../public/assets/nivoda.gif';
import { PendantFBX } from './PendantFBX';
import { MiniPhone } from './ui/mini-phone';
import { IncomingCallPhone } from './ui/incoming-call-phone';
import { ValueCalculator } from './ValueCalculator';
import type { AuditData } from '../types/audit';
import {
  BeforeAfterCards,
  CallVolumeBarChart,
  GbpSnapshotMockup,
  MissedCallDonutChart,
  RevenueLeakLineChart,
  SectionTrustFooter,
  TrafficPieChart,
} from './AuditCharts';

interface AuditPageProps {
  isDarkMode: boolean;
  onGetLive: () => void;
  onBookCall: () => void;
  data: AuditData;
}

const HeaderMetaItem: React.FC<{ label: string; tone?: 'gold' | 'silver' }> = ({ label, tone = 'silver' }) => (
  <span
    className={
      tone === 'gold'
        ? 'rounded-full border border-amber-400/35 bg-gradient-to-r from-amber-950/80 via-zinc-900/90 to-amber-950/70 px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-amber-100/95 shadow-[inset_0_1px_0_rgba(253,230,138,0.35),0_8px_32px_rgba(212,175,55,0.12)]'
        : 'rounded-full border border-white/20 bg-gradient-to-r from-zinc-800/95 via-slate-900/90 to-zinc-800/95 px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_6px_24px_rgba(0,0,0,0.35)]'
    }
  >
    {label}
  </span>
);

const HeroMetricPill: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.02] px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-md">
    <p className="text-[10px] uppercase tracking-[0.22em] text-slate-400">{label}</p>
    <p className="mt-2 text-xl font-semibold text-slate-100">{value}</p>
  </div>
);

const KpiCard: React.FC<{ title: string; value: string }> = ({ title, value }) => (
  <div className="group rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-950/80 to-black p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition hover:-translate-y-0.5 hover:border-amber-500/20">
    <p className="text-[10px] uppercase tracking-[0.24em] text-slate-500">{title}</p>
    <p className="mt-3 text-3xl font-semibold text-slate-100 transition group-hover:text-amber-100">{value}</p>
  </div>
);

const ProgressMetric: React.FC<{ label: string; value: string; widthClass: string }> = ({
  label,
  value,
  widthClass,
}) => (
  <div className="space-y-3">
    <div className="flex items-center justify-between gap-4 text-sm">
      <span className="font-medium text-slate-300">{label}</span>
      <span className="shrink-0 text-right text-base font-semibold tabular-nums text-slate-100">{value}</span>
    </div>
    <div className="h-3.5 rounded-full border border-white/10 bg-gradient-to-b from-zinc-900 to-black p-0.5 shadow-[inset_0_2px_6px_rgba(0,0,0,0.65)]">
      <div
        className={`h-full min-h-[10px] rounded-full bg-gradient-to-r from-slate-400 via-amber-300 to-yellow-500 shadow-[0_0_16px_rgba(212,175,55,0.45),inset_0_1px_0_rgba(255,255,255,0.35)] ${widthClass}`}
      />
    </div>
  </div>
);

const scrollToId = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

export const AuditPage: React.FC<AuditPageProps> = ({ isDarkMode, onGetLive, onBookCall, data }) => {
  const generatedDate = useMemo(() => data.auditMeta.generatedDate, [data]);
  const [showIntroSplash, setShowIntroSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowIntroSplash(false), 2800);
    return () => clearTimeout(timer);
  }, []);

  // Format currency helper
  const formatCurrency = (amount: number) => {
    return `${data.auditMeta.currencySymbol}${amount.toLocaleString(data.auditMeta.locale)}`;
  };

  // Format range helper
  const formatRange = (min: number, max: number) => {
    return `${min}-${max}`;
  };

  return (
    <div className="min-h-screen bg-black pb-8 text-white [background:radial-gradient(ellipse_100%_60%_at_50%_-10%,rgba(212,175,55,0.07),transparent_55%),linear-gradient(180deg,#0a0a0a_0%,#000_40%,#050505_100%)]">
      {showIntroSplash && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/95 p-6 backdrop-blur-md">
          <div className="w-full max-w-2xl rounded-[2rem] border border-amber-300/25 bg-gradient-to-br from-zinc-950 via-black to-zinc-900 p-8 text-center shadow-[0_20px_80px_rgba(0,0,0,0.65),inset_0_1px_0_rgba(255,255,255,0.08)] md:p-10">
            <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-amber-200/80">{data.auditMeta.confidentialityLabel}</p>
            <h2 className="mt-3 text-2xl font-semibold text-slate-100 md:text-4xl">{data.auditMeta.preparedForLabel} {data.business.name}</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-300 md:text-base">
              This intelligence report is private, tailored to your showroom performance, and intended only for the
              {` `}<span className="font-semibold text-amber-100">{data.business.name}</span> leadership team.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-emerald-300/30 bg-emerald-100/5 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-300">
              <span className="h-2 w-2 rounded-full bg-emerald-300 animate-pulse" />
              Secure access granted
            </div>
            <div className="mt-7">
              <button
                type="button"
                onClick={() => setShowIntroSplash(false)}
                className="rounded-full border border-white/20 bg-white/5 px-5 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-200 transition hover:bg-white/10"
              >
                Continue to report
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="fixed top-0 left-0 right-0 z-40 border-b border-white/10 bg-black/90 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-4 py-3 md:px-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex min-w-0 items-center gap-3">
              <img
                src={data.business.logoUrl}
                alt={`${data.business.name} logo`}
                className="h-11 w-11 shrink-0 rounded-xl object-cover ring-2 ring-amber-500/25 shadow-[0_8px_30px_rgba(212,175,55,0.15)]"
              />
              <div className="min-w-0">
                <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-slate-500">Audit prepared for</p>
                <p className="truncate text-base font-semibold tracking-tight text-white md:text-lg">{data.business.name}</p>
                <p className="truncate text-xs text-slate-400">{data.business.location}</p>
              </div>
            </div>
            <div className="text-left sm:text-right">
              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-slate-500">Intelligence by</p>
              <p className="text-sm font-semibold tracking-[0.22em] text-slate-300">FOURCEE</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <HeaderMetaItem tone="gold" label="Phone Performance Audit Report" />
            <HeaderMetaItem tone="silver" label={`${data.business.name} • ${data.business.location}`} />
            <HeaderMetaItem tone="gold" label={`Generated: ${generatedDate}`} />
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-7xl px-4 pt-52 sm:pt-48 md:px-8 md:pt-40">
        {/* Hero: copy + Google reviews + MiniPhone + 3D ring */}
        <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-zinc-950 via-black to-zinc-900 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] md:p-10">
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)',
              backgroundSize: '32px 32px',
            }}
          />
          <div className="relative z-10 grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-slate-500">Prepared exclusively for:</p>
              <div className="mt-3 flex flex-wrap items-center gap-3">
                <img
                  src={data.business.logoUrl}
                  alt=""
                  className="hidden h-12 w-12 rounded-xl object-cover ring-1 ring-white/15 sm:block"
                  aria-hidden
                />
                <div>
                  <h1 className="text-3xl font-semibold leading-tight text-slate-100 md:text-5xl">
                    Phone Performance Audit Report
                  </h1>
                  <p className="mt-2 text-lg text-slate-200">
                    {data.business.name} — {data.business.location}
                  </p>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-3 rounded-2xl border border-white/10 bg-black/40 px-4 py-3 shadow-inner">
                <span className="text-lg text-amber-300 drop-shadow-[0_0_8px_rgba(253,224,71,0.55)]">{data.reviews.starsDisplay}</span>
                <span className="bg-gradient-to-r from-white to-amber-200 bg-clip-text text-lg font-semibold text-transparent">
                  {data.reviews.rating}
                </span>
                <span className="text-sm text-slate-400">{data.reviews.count} Google reviews</span>
              </div>

              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-400">
                We analyzed your business over the past 30 days to determine exactly how many potential customers are
                trying to reach you by phone — and how many are currently being missed.
              </p>

              <div className="mt-7 grid gap-3 sm:grid-cols-3">
                <HeroMetricPill label="Inbound Calls / Week" value={formatRange(data.callModel.inboundCallsPerWeekMin, data.callModel.inboundCallsPerWeekMax)} />
                <HeroMetricPill label="Typical Answer Rate" value={`${formatRange(data.callModel.answerRateMin, data.callModel.answerRateMax)}%`} />
                <HeroMetricPill label="Likely Missed / Week" value={`${formatRange(data.callModel.missedCallsPerWeekMin, data.callModel.missedCallsPerWeekMax)} calls`} />
              </div>

              <div className="mt-7">
                <button
                  type="button"
                  onClick={() => scrollToId('audit-full-report')}
                  className="rounded-full border border-white/20 bg-gradient-to-r from-slate-800 to-zinc-900 px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] text-slate-200 shadow-lg transition hover:border-amber-500/30 hover:from-zinc-800 hover:to-black"
                >
                  Go live in 2 hours
                </button>
              </div>
            </div>

            <div className="flex min-w-0 flex-col gap-8 lg:max-w-[min(100%,440px)] lg:justify-self-end">
              <div className="relative isolate flex min-h-[240px] w-full items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-transparent sm:min-h-[280px]">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_40%_35%,rgba(212,175,55,0.14),transparent_55%)]" />
                <div className="pointer-events-none absolute bottom-6 left-1/2 h-14 w-44 -translate-x-1/2 rounded-[100%] bg-white/10 blur-2xl" />
                <PendantFBX
                  className="relative z-0 mx-auto h-[220px] w-full max-w-[min(100%,320px)] sm:h-[280px] sm:max-w-[360px]"
                  isDarkMode={isDarkMode}
                />
              </div>
              <div id="audit-live-test" className="scroll-mt-32 w-full max-w-md shrink-0 self-center">
                <p className="mb-3 text-center text-[10px] font-semibold uppercase tracking-[0.28em] text-amber-200/85">
                  Try Fourcee on your phone
                </p>
                <MiniPhone isDarkMode={isDarkMode} className="w-full" />
                <p className="mt-3 text-center text-xs text-slate-400">
                  Uses your public profile &amp; site context. No charge. ~60–90s.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Executive Summary + demo gif */}
        <section className="mt-8 overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-zinc-950 to-black p-6 md:p-8">
          <p className="text-[10px] uppercase tracking-[0.27em] text-slate-500">Executive Summary</p>
          <p className="mt-3 max-w-4xl text-sm leading-relaxed text-slate-300">
            We analyzed your business over the past 30 days to determine exactly how many potential customers are
            trying to reach you by phone — and how many are currently being missed.
          </p>
          <div className="mt-6 flex min-h-[12rem] justify-center overflow-hidden rounded-2xl border border-white/10 bg-black/50 shadow-2xl md:min-h-[14rem]">
            <img
              src={placeholderGif}
              alt="Call intelligence preview"
              className="max-h-56 w-auto max-w-full object-contain object-center md:max-h-64"
            />
          </div>
          <SectionTrustFooter dataSourceLine={data.compliance.dataSourceLine} />
        </section>

        {/* Methodology */}
        <section className="mt-8 rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 shadow-[0_10px_50px_rgba(0,0,0,0.45)] md:p-8">
          <p className="text-[10px] uppercase tracking-[0.27em] text-white/60">Research Methodology</p>
          <p className="mt-3 max-w-4xl text-sm leading-relaxed text-white/85">
            This report is based on your Google Business Profile performance ({data.reviews.count} reviews), website traffic patterns
            for {data.business.industry} businesses, local search behavior in your area, and industry benchmarks.
          </p>
          <SectionTrustFooter dataSourceLine={data.compliance.dataSourceLine} />
        </section>

        {/* Key findings + revenue impact + vibrating phone */}
        <section className="mt-8">
          <h2 className="text-lg font-semibold text-slate-100">Key Findings</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            <KpiCard title="Estimated Inbound Calls" value={`${formatRange(data.callModel.inboundCallsPerWeekMin, data.callModel.inboundCallsPerWeekMax)} per week`} />
            <KpiCard title="Typical Answer Rate" value={`${formatRange(data.callModel.answerRateMin, data.callModel.answerRateMax)}%`} />
            <KpiCard title="Likely Missed Calls" value={`${formatRange(data.callModel.missedCallsPerWeekMin, data.callModel.missedCallsPerWeekMax)} per week`} />
          </div>
          <div className="mt-8 flex flex-col gap-8 rounded-[2rem] border border-white/10 bg-gradient-to-br from-zinc-950/90 via-black to-zinc-900 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] lg:flex-row lg:items-center lg:justify-between lg:gap-10 lg:p-10">
            <div className="text-center lg:max-w-xl lg:text-left">
              <p className="text-[10px] uppercase tracking-[0.28em] text-slate-500">Revenue Impact</p>
              <p className="mt-3 text-2xl font-semibold leading-tight text-slate-100 lg:text-4xl">
                Estimated Monthly Lost Revenue: {formatCurrency(data.revenueModel.monthlyLossMin)} - {formatCurrency(data.revenueModel.monthlyLossMax)}
              </p>
              <p className="mt-2 text-sm text-slate-500">~{formatCurrency(data.revenueModel.monthlyLossMidpoint)} / month at typical mid-range assumptions</p>
            </div>
            <div className="mx-auto w-full max-w-sm shrink-0 lg:mx-0 lg:max-w-md">
              <IncomingCallPhone isDarkMode={isDarkMode} className="w-full" />
            </div>
          </div>
          <SectionTrustFooter dataSourceLine={data.compliance.dataSourceLine} />
        </section>

        {/* Charts: bar → donut → line */}
        <div id="audit-full-report" className="mt-10 scroll-mt-28 space-y-8">
          <CallVolumeBarChart callModel={data.callModel} />
          <SectionTrustFooter dataSourceLine={data.compliance.dataSourceLine} />
          <div className="grid gap-8 lg:grid-cols-2">
            <MissedCallDonutChart missedCallTypeSplit={data.callModel.missedCallTypeSplit} />
            <RevenueLeakLineChart lineSeries={data.revenueModel.lineSeries} currencySymbol={data.auditMeta.currencySymbol} cumulativeLeak={data.revenueModel.sixMonthCumulativeLeak} />
          </div>
          <SectionTrustFooter dataSourceLine={data.compliance.dataSourceLine} />
        </div>

        {/* Table */}
        <section className="mt-10">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-lg font-semibold text-slate-100">Missed Calls Breakdown</h2>
            <div className="rounded-full border border-red-400/30 bg-red-950/20 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-red-200/90">
              {data.breakdown.riskBadge}
            </div>
          </div>
          <div className="mt-4 overflow-hidden rounded-3xl border border-white/10">
            <table className="w-full">
              <thead className="bg-white/[0.04] text-left">
                <tr className="text-[10px] uppercase tracking-[0.24em] text-white/60">
                  <th className="px-5 py-4">Call Type</th>
                  <th className="px-5 py-4">Est. Missed / Week</th>
                  <th className="px-5 py-4">Monthly Revenue Impact</th>
                </tr>
              </thead>
              <tbody>
                {data.breakdown.rows.map((row) => (
                  <tr
                    key={row.callType}
                    className="border-t border-white/10 transition hover:bg-white/[0.06] hover:translate-x-[2px]"
                  >
                    <td className="px-5 py-4 text-sm text-white/90">{row.callType}</td>
                    <td className="px-5 py-4 text-sm text-white/80">{formatRange(row.weeklyMissedMin, row.weeklyMissedMax)}</td>
                    <td className="px-5 py-4 text-sm font-medium">
                      <span className="text-amber-100">
                        {formatCurrency(row.monthlyImpactMin)} - {formatCurrency(row.monthlyImpactMax)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-6 rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-950/90 via-black to-zinc-900 p-4 md:p-6">
            <div className="grid gap-4 md:gap-5">
              <div className="grid w-full items-stretch gap-3 md:grid-cols-[minmax(0,1fr)_168px]">
                <div className="rounded-2xl border border-emerald-300/30 bg-emerald-100/90 p-4 text-emerald-900">
                  <p className="text-base font-semibold">High-value product inquiries</p>
                  <p className="mt-1 text-sm text-emerald-800">Pricing, availability &amp; detailed questions</p>
                  <p className="mt-2 text-sm font-medium text-emerald-700">Highest revenue potential per call</p>
                </div>
                <div className="rounded-2xl border border-emerald-300/30 bg-emerald-900/80 p-4 text-center text-emerald-50">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-emerald-200/80">Monthly impact</p>
                  <p className="mt-2 text-2xl font-bold">$$$</p>
                </div>
              </div>

              <div className="grid w-[88%] items-stretch gap-3 md:w-full md:grid-cols-[minmax(0,1fr)_168px]">
                <div className="rounded-2xl border border-blue-300/30 bg-blue-100/90 p-4 text-blue-900">
                  <p className="text-base font-semibold">Custom &amp; bespoke requests</p>
                  <p className="mt-1 text-sm text-blue-800">Complex orders needing consultation</p>
                  <p className="mt-2 text-sm font-medium text-blue-700">Mid-to-high revenue per conversion</p>
                </div>
                <div className="rounded-2xl border border-blue-300/30 bg-blue-900/80 p-4 text-center text-blue-50">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-blue-200/80">Monthly impact</p>
                  <p className="mt-2 text-2xl font-bold">$$</p>
                </div>
              </div>

              <div className="grid w-[76%] items-stretch gap-3 md:w-full md:grid-cols-[minmax(0,1fr)_168px]">
                <div className="rounded-2xl border border-amber-300/35 bg-amber-100/90 p-4 text-amber-900">
                  <p className="text-base font-semibold">Booking requests</p>
                  <p className="mt-1 text-sm text-amber-800">Appointments &amp; scheduling</p>
                  <p className="mt-2 text-sm font-medium text-amber-700">Consistent volume, steady value</p>
                </div>
                <div className="rounded-2xl border border-amber-300/35 bg-amber-900/80 p-4 text-center text-amber-50">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-amber-200/85">Monthly impact</p>
                  <p className="mt-2 text-2xl font-bold">$</p>
                </div>
              </div>
            </div>
            <p className="mt-5 text-center text-sm text-slate-300">
              Every missed call is a missed opportunity — the cost adds up across all categories.
            </p>
          </div>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
              <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500">Most exposed segment</p>
              <p className="mt-2 text-sm font-semibold text-slate-100">{data.breakdown.rows[0]?.callType || 'High-value inquiries'}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
              <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500">Immediate monthly leak</p>
              <p className="mt-2 text-sm font-semibold text-amber-100">{formatCurrency(data.revenueModel.monthlyLossMin)} - {formatCurrency(data.revenueModel.monthlyLossMax)}</p>
            </div>
            <div className="rounded-2xl border border-amber-400/25 bg-amber-950/20 p-4">
              <p className="text-[10px] uppercase tracking-[0.2em] text-amber-200/80">Decision pressure</p>
              <p className="mt-2 text-sm font-semibold text-slate-100">Each missed call compounds every week.</p>
            </div>
          </div>
          <SectionTrustFooter dataSourceLine={data.compliance.dataSourceLine} />
        </section>

        <section className="mt-10 rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 md:p-8">
          <h2 className="text-xl font-semibold text-slate-100">What This Means For Your Business</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-2xl border border-white/10 bg-black/40 p-5">
              <p className="text-sm leading-relaxed text-white/85">
                You are currently losing between <span className="font-semibold text-amber-100">{formatCurrency(data.revenueModel.monthlyLossMin)} and {formatCurrency(data.revenueModel.monthlyLossMax)}</span>{' '}
                every month simply because calls are going unanswered. Most of these callers do not call back.
              </p>
            </div>
            <div className="rounded-2xl border border-red-400/25 bg-red-950/20 p-5">
              <p className="text-[10px] uppercase tracking-[0.2em] text-red-200/85">Behavioral reality</p>
              <p className="mt-2 text-sm font-semibold text-slate-100">Buyers call the next jeweller within minutes.</p>
            </div>
          </div>
          <SectionTrustFooter dataSourceLine={data.compliance.dataSourceLine} />
        </section>

        {/* Proof: GBP + traffic + before/after */}
        <section className="mt-10 grid gap-8 lg:grid-cols-2">
          <GbpSnapshotMockup reviews={data.reviews} />
          <TrafficPieChart trafficSources={data.traffic.sources} />
        </section>
        <div className="mt-8">
          <BeforeAfterCards comparison={data.comparison} currencySymbol={data.auditMeta.currencySymbol} />
          <SectionTrustFooter dataSourceLine={data.compliance.dataSourceLine} />
        </div>

        <section className="mt-10 rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 md:p-8">
          <h2 className="text-lg font-semibold text-slate-100">Projected Results Within 90 Days</h2>
          <div className="mt-5 space-y-5">
            <ProgressMetric label="Answer rate" value={data.projection90d.answerRateProjected} widthClass={data.projection90d.barWidths.answerRate} />
            <ProgressMetric label="Monthly revenue recovered" value={data.projection90d.monthlyRecoveredProjected} widthClass={data.projection90d.barWidths.monthlyRecovered} />
            <ProgressMetric label="Typical payback period" value={data.projection90d.paybackPeriodProjected} widthClass={data.projection90d.barWidths.paybackPeriod} />
          </div>
          <SectionTrustFooter dataSourceLine={data.compliance.dataSourceLine} />
        </section>

        {/* ROI calculator — metallic theme */}
        <section className="mt-10">
          <p className="mb-4 text-[10px] uppercase tracking-[0.28em] text-slate-400">Model your own numbers</p>
          <ValueCalculator />
          <SectionTrustFooter dataSourceLine={data.compliance.dataSourceLine} />
        </section>

        {/* Recovery plan + Nivoda gif */}
        <section className="mt-10 overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] md:grid md:grid-cols-[1fr_minmax(0,380px)] md:gap-0">
          <div className="p-6 md:p-8">
            <h2 className="text-xl font-semibold text-slate-100">{data.recoveryPlan.headline}</h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/75">
              {data.recoveryPlan.body}
            </p>
            <SectionTrustFooter dataSourceLine={data.compliance.dataSourceLine} />
          </div>
          <div className="border-t border-white/10 bg-black/50 md:border-l md:border-t-0">
            <img src={data.recoveryPlan.supportingMediaUrl} alt="Live inventory intelligence" className="h-full min-h-[200px] w-full object-cover" />
          </div>
        </section>

        <section className="mt-10 rounded-[2rem] border border-white/10 bg-gradient-to-br from-zinc-950 via-black to-zinc-900 px-6 py-10 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] md:px-12 md:py-12">
          <p className="mx-auto max-w-3xl text-xl font-bold leading-snug text-slate-100 md:text-2xl md:leading-relaxed">
            A serious buyer reaching out to their preferred jeweller should never be lost because no one could answer
            the phone. <span className="text-amber-200">That changes with Fourcee.</span>
          </p>
        </section>

        <section className="mt-10 rounded-[2rem] border border-amber-500/20 bg-gradient-to-br from-zinc-950 via-black to-zinc-900 p-8 text-center shadow-[inset_0_1px_0_rgba(212,175,55,0.12)]">
          <p className="text-[10px] uppercase tracking-[0.3em] text-amber-200/80">Choose Your Next Step</p>
          <h2 className="mt-3 text-2xl font-semibold text-slate-100 md:text-4xl">
            You are currently losing between {formatCurrency(data.revenueModel.monthlyLossMin)} and {formatCurrency(data.revenueModel.monthlyLossMax)} every month simply because calls are going unanswered.
          </h2>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={onGetLive}
              className="rounded-full bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-600 px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] text-black shadow-lg shadow-amber-900/30 transition hover:brightness-110"
            >
              Get Live in Under 2 Hours
            </button>
            <button
              type="button"
              onClick={onBookCall}
              className="rounded-full border border-white/20 bg-gradient-to-r from-white/10 to-white/5 px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] text-slate-200 transition hover:border-amber-500/30 hover:from-white/15"
            >
              Book a 15-Minute Strategy Call
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};
