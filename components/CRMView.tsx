import React, { useEffect, useMemo, useState } from 'react';
import fcWhite from '../public/assets/fcwhite.png';

interface CRMViewProps {
  isDarkMode?: boolean;
}

interface LeadLog {
  id: string;
  time: string;
  customerName: string;
  intent: string;
  status: string;
}

type PortalTab = 'simulation' | 'overview';

const formatMoney = (value: number) =>
  value.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

export const CRMView: React.FC<CRMViewProps> = () => {
  const [activeTab, setActiveTab] = useState<PortalTab>('simulation');
  const [revenueSaved, setRevenueSaved] = useState(125500);
  const [appointmentsBooked, setAppointmentsBooked] = useState(48);
  const [logEntries, setLogEntries] = useState<LeadLog[]>([]);
  const [liveSeconds, setLiveSeconds] = useState(98);
  const [waveHeights, setWaveHeights] = useState<number[]>([12, 20, 15, 25, 14, 22, 10, 24, 16, 19, 12, 21]);

  // Customize these names to simulate your exact showroom personas.
  const simulatedNames = useMemo(
    () => [
      'Amelia Stone',
      'Noah Patel',
      'Harper Wellington',
      'Mason Brooks',
      'Sophia Vale',
      'Ethan Rhodes',
      'Olivia Sterling',
      'Liam Carter',
    ],
    []
  );

  // Customize these intent labels to match your future campaign angles.
  const simulatedIntents = useMemo(
    () => [
      'Oval Diamond Query',
      'Halo Ring Consultation',
      'Emerald Cut Upgrade',
      'Lab-Grown Bridal Request',
      'Custom Setting Appointment',
      'Eye-Clean Diamond Clarification',
      '2.5ct Comparison Request',
    ],
    []
  );

  const calls = useMemo(
    () => [
      {
        id: 'call-1',
        customerName: 'Amelia Stone',
        phone: '+1 (212) 555-0191',
        intent: 'Oval diamond comparison',
        status: 'active',
        impact: '$$$',
        startedAgo: '01:38',
        transcript: [
          { speaker: 'Agent', line: 'Thank you for calling Cape Diamonds. How may I assist you?', at: '00:02' },
          { speaker: 'Customer', line: 'I am looking for eye-clean ovals around 2 carats.', at: '00:08' },
          { speaker: 'Agent', line: 'Great choice. I can compare premium options for you right now.', at: '00:14' },
          { speaker: 'Customer', line: 'Can I come in today to view them in person?', at: '00:28' },
          { speaker: 'Agent', line: 'Yes. We have a 2 PM private slot available. Shall I secure it?', at: '00:38' },
          { speaker: 'Customer', line: 'Please do.', at: '00:45' },
        ],
      },
      {
        id: 'call-2',
        customerName: 'Noah Patel',
        phone: '+1 (917) 555-0107',
        intent: 'Custom halo redesign',
        status: 'active',
        impact: '$$',
        startedAgo: '00:52',
        transcript: [
          { speaker: 'Agent', line: 'Cape Diamonds concierge desk, how can I help?', at: '00:01' },
          { speaker: 'Customer', line: 'I want to redesign my engagement ring into a halo setting.', at: '00:11' },
          { speaker: 'Agent', line: 'Understood. I can book you with our custom design specialist.', at: '00:19' },
        ],
      },
      {
        id: 'call-3',
        customerName: 'Harper Wellington',
        phone: '+1 (646) 555-0169',
        intent: 'Appointment booking',
        status: 'resolved',
        impact: '$',
        startedAgo: 'Resolved',
        transcript: [
          { speaker: 'Agent', line: 'Welcome to Cape Diamonds, how may I assist?', at: '00:02' },
          { speaker: 'Customer', line: 'I would like to book a viewing for Saturday.', at: '00:06' },
          { speaker: 'Agent', line: 'Done. You are confirmed for Saturday at 11 AM.', at: '00:15' },
        ],
      },
      {
        id: 'call-4',
        customerName: 'Sophia Vale',
        phone: '+1 (332) 555-0188',
        intent: 'Lab-grown bridal request',
        status: 'resolved',
        impact: '$$',
        startedAgo: 'Resolved',
        transcript: [
          { speaker: 'Agent', line: 'Thank you for calling Cape Diamonds.', at: '00:01' },
          { speaker: 'Customer', line: 'I am looking for a lab-grown bridal set under 15k.', at: '00:09' },
          { speaker: 'Agent', line: 'Perfect. I can shortlist options and send them over today.', at: '00:18' },
        ],
      },
    ],
    []
  );
  const [selectedCallId, setSelectedCallId] = useState(calls[0].id);
  const selectedCall = calls.find((call) => call.id === selectedCallId) ?? calls[0];
  const activeCalls = calls.filter((call) => call.status === 'active');
  const callHistory = calls.filter((call) => call.status !== 'active');

  useEffect(() => {
    const pushLead = () => {
      const now = new Date();
      const customerName = simulatedNames[Math.floor(Math.random() * simulatedNames.length)];
      const intent = simulatedIntents[Math.floor(Math.random() * simulatedIntents.length)];

      setLogEntries((prev) => [
        {
          id: `${now.getTime()}-${Math.random()}`,
          time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
          customerName,
          intent,
          status: '✅ Qualified & Booked',
        },
        ...prev,
      ].slice(0, 12));
    };

    pushLead();
    const startDelayMs = 10000 + Math.floor(Math.random() * 5001);
    let nextTimeout: ReturnType<typeof setTimeout>;
    let timeoutCancelled = false;

    const schedule = (delayMs: number) => {
      nextTimeout = setTimeout(() => {
        if (timeoutCancelled) return;
        pushLead();
        schedule(10000 + Math.floor(Math.random() * 5001));
      }, delayMs);
    };

    schedule(startDelayMs);
    return () => {
      timeoutCancelled = true;
      clearTimeout(nextTimeout);
    };
  }, [simulatedIntents, simulatedNames]);

  useEffect(() => {
    const metricInterval = setInterval(() => {
      setRevenueSaved((prev) => prev + Math.floor(Math.random() * 1900) + 300);
      setAppointmentsBooked((prev) => prev + (Math.random() > 0.45 ? 1 : 0));
    }, 5000);
    return () => clearInterval(metricInterval);
  }, []);

  useEffect(() => {
    const liveTicker = setInterval(() => {
      setLiveSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(liveTicker);
  }, []);

  useEffect(() => {
    const waveInterval = setInterval(() => {
      setWaveHeights((prev) => prev.map(() => 10 + Math.round(Math.random() * 24)));
    }, 320);
    return () => clearInterval(waveInterval);
  }, []);

  const liveDuration = `${String(Math.floor(liveSeconds / 60)).padStart(2, '0')}:${String(liveSeconds % 60).padStart(2, '0')}`;

  return (
    <div className="min-h-screen px-4 py-8 md:px-8 md:py-10 text-[#E7E7E7]">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between">
        <h1 className="text-xs uppercase tracking-[0.35em] text-amber-200/80">Concierge Intelligence Portal</h1>
        <div className="flex rounded-full border border-white/10 bg-black/50 p-1 backdrop-blur-xl">
          {(['simulation', 'overview'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`rounded-full px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.25em] transition ${
                activeTab === tab
                  ? 'bg-gradient-to-r from-slate-200 via-amber-200 to-slate-400 text-black shadow-[inset_0_1px_0_rgba(255,255,255,0.65)]'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'overview' ? (
        <div className="mx-auto mt-8 grid w-full max-w-7xl gap-4 md:grid-cols-3">
          <OverviewCard title="Revenue Saved" value={formatMoney(revenueSaved)} />
          <OverviewCard title="Appointments Booked (AI)" value={appointmentsBooked.toString()} />
          <OverviewCard title="Average Handling Time" value="1.2 Mins" />
        </div>
      ) : (
        <div className="mx-auto mt-8 flex w-full max-w-7xl flex-col gap-6">
          <header className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-r from-black via-[#111111] to-[#1C1C1C] p-6 md:p-8 shadow-[0_20px_100px_rgba(0,0,0,0.65)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_20%,rgba(212,175,55,0.16),transparent_38%)]" />
            <div className="relative z-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <img src={fcWhite} alt="Fourcee" className="mt-2 h-10 w-auto object-contain md:h-12" />
                <p className="mt-2 text-sm font-medium tracking-wide text-slate-200 md:text-base">Concierge Intelligence Engine</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-xl">
                <p className="text-[10px] uppercase tracking-[0.28em] text-white/60">Concierge Brain Sync</p>
                <div className="mt-2 flex items-center gap-2 text-sm font-semibold text-[#CCFF00]">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#CCFF00] animate-pulse" />
                  Online
                </div>
              </div>
            </div>
          </header>

          <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
            <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-sm uppercase tracking-[0.3em] text-slate-200">Current Concierge Calls</h3>
                <p className="text-[10px] uppercase tracking-[0.25em] text-white/55">{activeCalls.length} live</p>
              </div>
              <div className="space-y-3">
                {activeCalls.map((call) => (
                  <button
                    key={call.id}
                    type="button"
                    onClick={() => setSelectedCallId(call.id)}
                    className={`grid w-full gap-2 rounded-2xl border p-4 text-left text-xs transition md:grid-cols-[1fr_auto] ${
                      selectedCallId === call.id
                        ? 'border-amber-300/35 bg-amber-100/5'
                        : 'border-white/10 bg-black/40 hover:border-white/20'
                    }`}
                  >
                    <div>
                      <p className="font-semibold text-white">{call.customerName}</p>
                      <p className="mt-1 text-white/70">{call.intent}</p>
                      <p className="mt-1 text-white/50">{call.phone}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] uppercase tracking-[0.2em] text-white/50">Impact</p>
                      <p className="mt-1 font-semibold text-amber-200">{call.impact}</p>
                    </div>
                  </button>
                ))}
              </div>

              <div className="mt-6 mb-4 flex items-center justify-between">
                <h3 className="text-sm uppercase tracking-[0.3em] text-white/70">Concierge Call History</h3>
                <p className="text-[10px] uppercase tracking-[0.25em] text-white/45">Recent</p>
              </div>
              <div className="space-y-2">
                {logEntries.map((entry) => (
                  <div
                    key={entry.id}
                    className="grid gap-2 rounded-2xl border border-white/10 bg-black/40 p-4 text-xs md:grid-cols-[0.7fr_1fr_1.4fr_1fr]"
                  >
                    <span className="text-white/60">{entry.time}</span>
                    <span className="font-medium text-white">{entry.customerName}</span>
                    <span className="text-white/80">{entry.intent}</span>
                    <span className="font-medium text-emerald-300">{entry.status}</span>
                  </div>
                ))}
              </div>
              <div className="mt-3 space-y-2">
                {callHistory.map((call) => (
                  <button
                    key={call.id}
                    type="button"
                    onClick={() => setSelectedCallId(call.id)}
                    className={`grid w-full gap-2 rounded-2xl border p-3 text-left text-xs transition md:grid-cols-[1fr_auto] ${
                      selectedCallId === call.id
                        ? 'border-amber-300/30 bg-amber-100/5'
                        : 'border-white/10 bg-black/30 hover:border-white/20'
                    }`}
                  >
                    <div>
                      <p className="font-medium text-white">{call.customerName}</p>
                      <p className="mt-1 text-white/60">{call.intent}</p>
                    </div>
                    <span className="self-center text-[10px] uppercase tracking-[0.2em] text-white/50">Resolved</span>
                  </button>
                ))}
              </div>
            </section>

            <aside className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-2xl">
              <h3 className="text-sm uppercase tracking-[0.3em] text-slate-200">AI Concierge Conversation Transcript</h3>
              <div className="mt-4 rounded-2xl border border-white/10 bg-black/50 p-4">
                <div className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.02] px-3 py-2">
                  <div>
                    <p className="text-xs font-semibold text-white">{selectedCall.customerName}</p>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-white/60">{selectedCall.intent}</p>
                  </div>
                  <span className="text-xs font-semibold text-emerald-300">
                    {selectedCall.status === 'active' ? `LIVE ${liveDuration}` : 'ENDED'}
                  </span>
                </div>

                <div className="mt-3 rounded-xl border border-white/10 bg-black/60 px-3 py-2">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-white/50">Voice activity</p>
                  <div className="mt-2 flex h-10 items-end gap-1">
                    {waveHeights.map((h, i) => (
                      <span
                        // eslint-disable-next-line react/no-array-index-key
                        key={i}
                        className={`w-1.5 rounded-full ${
                          i % 3 === 0
                            ? 'bg-gradient-to-t from-emerald-500/30 to-emerald-300'
                            : i % 2 === 0
                              ? 'bg-gradient-to-t from-amber-500/35 to-amber-300'
                              : 'bg-gradient-to-t from-slate-500/35 to-slate-200'
                        }`}
                        style={{ height: `${h}px` }}
                      />
                    ))}
                  </div>
                </div>

                <div className="mt-3 max-h-[340px] space-y-2 overflow-auto rounded-xl border border-white/10 bg-black/40 p-3">
                  {selectedCall.transcript.map((row, idx) => {
                    const isLatest = selectedCall.status === 'active' && idx === selectedCall.transcript.length - 1;
                    return (
                    <div
                      key={`${selectedCall.id}-${idx}`}
                      className={`rounded-lg border p-2.5 transition ${
                        isLatest
                          ? 'border-emerald-300/35 bg-emerald-100/[0.04] shadow-[0_0_18px_rgba(16,185,129,0.2)]'
                          : 'border-white/5 bg-white/[0.02]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`text-[11px] font-semibold ${row.speaker === 'Agent' ? 'text-slate-100' : 'text-blue-300'}`}>
                          {row.speaker}
                        </span>
                        <span className="text-[10px] text-white/45">{row.at}</span>
                      </div>
                      <p className="mt-1 text-sm leading-relaxed text-white/85">
                        {row.line}
                        {isLatest && <span className="ml-1 inline-block h-2 w-2 animate-pulse rounded-full bg-emerald-300" />}
                      </p>
                    </div>
                  )})}
                </div>
              </div>
            </aside>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <MetricCard label="Revenue Saved" value={formatMoney(revenueSaved)} />
            <MetricCard label="Appointments Booked (AI)" value={appointmentsBooked.toString()} />
            <MetricCard label="Average Handling Time" value="1.2 Mins" />
          </div>
        </div>
      )}
    </div>
  );
};

const MetricCard: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-2xl">
    <p className="text-[10px] uppercase tracking-[0.28em] text-white/60">{label}</p>
    <p className="mt-3 text-2xl font-semibold tracking-tight text-amber-200 md:text-3xl">{value}</p>
  </div>
);

const OverviewCard: React.FC<{ title: string; value: string }> = ({ title, value }) => (
  <div className="rounded-3xl border border-white/10 bg-white/[0.05] p-6 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.35)]">
    <p className="text-[10px] uppercase tracking-[0.28em] text-white/60">{title}</p>
    <p className="mt-3 text-3xl font-semibold text-amber-200">{value}</p>
  </div>
);
