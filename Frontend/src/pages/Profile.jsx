import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import {
  Terminal,
  Cpu,
  HardDrive,
  ImageIcon,
  User,
  Mail,
  ShieldCheck,
  Clock,
  Layers,
  Zap,
  Activity,
  ChevronRight,
} from 'lucide-react';

/* ─── stat card ─── */
const StatCard = ({ label, value, sub, icon: Icon, accent }) => (
  <div className="relative border border-neutral-800 bg-[#111111]/60 p-5 hover:border-neutral-700 transition-colors">
    <div className="absolute -top-[1px] -left-[1px] w-2 h-2 border-t border-l border-[#ff4a1c]" />
    <div className="absolute -bottom-[1px] -right-[1px] w-2 h-2 border-b border-r border-[#ff4a1c]" />
    <div className="flex items-start justify-between mb-3">
      <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-wider">{label}</span>
      <Icon className={`w-4 h-4 ${accent || 'text-[#ff4a1c]'}`} />
    </div>
    <div className={`text-2xl font-bold ${accent || 'text-[#ff4a1c]'}`}>{value}</div>
    {sub && <div className="text-[9px] font-mono text-neutral-600 mt-1">{sub}</div>}
  </div>
);

/* ─── info row ─── */
const InfoRow = ({ index, label, value, icon: Icon }) => (
  <div className="flex items-center gap-4 py-3 border-b border-neutral-900 last:border-0">
    <span className="text-[9px] font-mono text-neutral-600 w-6 shrink-0">{String(index).padStart(2, '0')}</span>
    <Icon className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
    <span className="text-[10px] font-mono text-neutral-500 flex-1">{label}</span>
    <span className="text-xs font-mono text-neutral-200 text-right break-all max-w-[55%]">{value}</span>
  </div>
);

const Profile = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  const userName = user?.name || user?.username || user?.email?.split('@')[0] || 'UNKNOWN_OPERATOR';
  const userEmail = user?.email || 'N/A';
  const credits = user?.imageCount ?? 0;
  const totalUsed = typeof user?.totalGenerated === 'number' ? user.totalGenerated : '—';
  const joinDate = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
    : '—';

  const tabs = ['overview', 'identity', 'system'];

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white pt-24 pb-20 relative overflow-hidden font-sans-modern">

      {/* side rulers */}
      <div className="absolute left-4 md:left-12 top-0 bottom-0 w-[1px] bg-neutral-800/80 pointer-events-none hidden sm:block z-10">
        <div className="absolute top-28 flex flex-col gap-20 text-[9px] font-mono text-neutral-700 pl-2">
          {['000','100','200','300','400','500','600'].map(n => <span key={n}>{n}</span>)}
        </div>
      </div>
      <div className="absolute right-4 md:right-12 top-0 bottom-0 w-[1px] bg-neutral-800/80 pointer-events-none hidden sm:block z-10">
        <div className="absolute top-28 flex flex-col gap-20 text-[9px] font-mono text-neutral-700 pr-2 right-0 text-right">
          {['000','100','200','300','400','500','600'].map(n => <span key={n}>{n}</span>)}
        </div>
      </div>

      {/* grid bg */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: 'linear-gradient(#ff4a1c 1px, transparent 1px), linear-gradient(90deg, #ff4a1c 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">

        {/* page header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <div className="flex items-center gap-2 text-[9px] font-mono text-[#ff4a1c] mb-3">
            <Terminal className="w-3.5 h-3.5" />
            USER_PROFILE_MODULE_v2.0
            <span className="ml-auto text-neutral-600">SESSION_ACTIVE</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-editorial font-normal uppercase tracking-wider">
            Operator <span className="italic text-neutral-400 text-4xl md:text-5xl block mt-1">Profile</span>
          </h1>
        </motion.div>

        {/* hero identity card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative border border-neutral-800 bg-[#111111]/60 backdrop-blur-md p-6 md:p-8 mb-8 flex flex-col sm:flex-row items-start sm:items-center gap-6"
        >
          <div className="absolute -top-[1px] -left-[1px] w-3 h-3 border-t border-l border-[#ff4a1c]" />
          <div className="absolute -top-[1px] -right-[1px] w-3 h-3 border-t border-r border-[#ff4a1c]" />
          <div className="absolute -bottom-[1px] -left-[1px] w-3 h-3 border-b border-l border-[#ff4a1c]" />
          <div className="absolute -bottom-[1px] -right-[1px] w-3 h-3 border-b border-r border-[#ff4a1c]" />

          {/* avatar */}
          <div className="relative shrink-0">
            <div className="w-20 h-20 border-2 border-[#ff4a1c]/40 bg-neutral-900 flex items-center justify-center text-3xl font-bold text-[#ff4a1c] uppercase select-none">
              {userName.charAt(0)}
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-[#0b0b0b]" title="Online" />
          </div>

          {/* identity info */}
          <div className="flex-1 min-w-0">
            <div className="text-[9px] font-mono text-neutral-500 mb-1">OPERATOR_HANDLE</div>
            <h2 className="text-xl md:text-2xl font-bold text-white truncate">{userName}</h2>
            <div className="text-xs font-mono text-neutral-500 mt-0.5 truncate">{userEmail}</div>
            <div className="flex flex-wrap gap-3 mt-4">
              <span className="inline-flex items-center gap-1.5 text-[9px] font-mono px-2.5 py-1 border border-neutral-800 text-neutral-400 bg-neutral-900/50">
                <ShieldCheck className="w-3 h-3 text-emerald-500" /> VERIFIED_IDENTITY
              </span>
              <span className="inline-flex items-center gap-1.5 text-[9px] font-mono px-2.5 py-1 border border-neutral-800 text-neutral-400 bg-neutral-900/50">
                <Zap className="w-3 h-3 text-[#ff4a1c]" /> ACTIVE_CLUSTER_ACCESS
              </span>
              <span className="inline-flex items-center gap-1.5 text-[9px] font-mono px-2.5 py-1 border border-neutral-800 text-neutral-400 bg-neutral-900/50">
                <Activity className="w-3 h-3 text-blue-400" /> DIFFUSION_ENGINE_LINKED
              </span>
            </div>
          </div>

          {/* credits (desktop) */}
          <div className="shrink-0 text-center hidden sm:block">
            <div className="text-[9px] font-mono text-neutral-500 mb-1">CREDITS_REMAINING</div>
            <div className="text-4xl font-bold text-emerald-400">{credits}</div>
            <div className="text-[9px] font-mono text-neutral-600 mt-0.5">GENERATION_TOKENS</div>
          </div>
        </motion.div>

        {/* stats grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          <StatCard label="Credits_Left" value={credits} sub="GEN_TOKENS_AVAILABLE" icon={Zap} accent="text-emerald-400" />
          <StatCard label="Images_Generated" value={totalUsed} sub="TOTAL_RENDERS" icon={ImageIcon} />
          <StatCard label="Joined_Node" value={joinDate} sub="REGISTRATION_DATE" icon={Clock} accent="text-blue-400" />
          <StatCard label="Engine_Status" value="LIVE" sub="STABILITY_AI_V1" icon={Activity} accent="text-emerald-400" />
        </motion.div>

        {/* tabbed panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="relative border border-neutral-800 bg-[#111111]/60 backdrop-blur-md"
        >
          <div className="absolute -top-[1px] -left-[1px] w-3 h-3 border-t border-l border-[#ff4a1c]" />
          <div className="absolute -top-[1px] -right-[1px] w-3 h-3 border-t border-r border-[#ff4a1c]" />
          <div className="absolute -bottom-[1px] -left-[1px] w-3 h-3 border-b border-l border-[#ff4a1c]" />
          <div className="absolute -bottom-[1px] -right-[1px] w-3 h-3 border-b border-r border-[#ff4a1c]" />

          {/* tab bar */}
          <div className="flex border-b border-neutral-800">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-3.5 text-[10px] font-mono uppercase tracking-widest transition-colors border-r border-neutral-800 last:border-0 ${
                  activeTab === tab
                    ? 'text-[#ff4a1c] bg-[#ff4a1c]/5 border-b-2 border-b-[#ff4a1c]'
                    : 'text-neutral-500 hover:text-neutral-300'
                }`}
              >
                {tab}
              </button>
            ))}
            <div className="ml-auto flex items-center gap-2 px-4 text-[9px] font-mono text-neutral-600">
              <span className="text-emerald-500 animate-pulse">●</span> SECURE
            </div>
          </div>

          <div className="p-6 md:p-8">

            {/* OVERVIEW */}
            {activeTab === 'overview' && (
              <motion.div key="overview" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
                <div className="text-[9px] font-mono text-[#ff4a1c] mb-6 flex items-center gap-2">
                  <Cpu className="w-3.5 h-3.5" /> SYSTEM_OVERVIEW_MODULE
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <div className="text-[9px] font-mono text-neutral-500 mb-4 uppercase tracking-wider">Account_Data_Tensor</div>
                    <InfoRow index={1} label="OPERATOR_HANDLE" value={userName} icon={User} />
                    <InfoRow index={2} label="EMAIL_IDENTIFIER" value={userEmail} icon={Mail} />
                    <InfoRow index={3} label="CREDITS_BALANCE" value={`${credits} TOKENS`} icon={Zap} />
                    <InfoRow index={4} label="REGISTRATION_TIMESTAMP" value={joinDate} icon={Clock} />
                  </div>
                  <div>
                    <div className="text-[9px] font-mono text-neutral-500 mb-4 uppercase tracking-wider">Cluster_Specifications</div>
                    <InfoRow index={1} label="ENGINE_VERSION" value="STABILITY_AI_V1" icon={HardDrive} />
                    <InfoRow index={2} label="STORAGE_PROVIDER" value="CLOUDINARY_SECURE" icon={Layers} />
                    <InfoRow index={3} label="API_LATENCY_BOUND" value="< 3200ms" icon={Activity} />
                    <InfoRow index={4} label="AUTH_PROTOCOL" value="JWT_BEARER_TOKEN" icon={ShieldCheck} />
                  </div>
                </div>
                <div className="mt-8 pt-6 border-t border-neutral-800">
                  <div className="text-[9px] font-mono text-neutral-500 mb-4">QUICK_ACTIONS</div>
                  <div className="flex flex-wrap gap-3">
                    <Link to="/generate">
                      <button className="flex items-center gap-2 px-4 py-2.5 text-[10px] font-mono font-bold uppercase tracking-wider bg-[#ff4a1c] text-white border border-[#ff4a1c] hover:brightness-110 active:scale-[0.98] transition-all">
                        <Zap className="w-3.5 h-3.5" /> Generate Image <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </Link>
                    <Link to="/history">
                      <button className="flex items-center gap-2 px-4 py-2.5 text-[10px] font-mono uppercase tracking-wider bg-transparent text-neutral-300 border border-neutral-800 hover:border-neutral-600 hover:text-white active:scale-[0.98] transition-all">
                        <ImageIcon className="w-3.5 h-3.5" /> View History <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}

            {/* IDENTITY */}
            {activeTab === 'identity' && (
              <motion.div key="identity" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
                <div className="text-[9px] font-mono text-[#ff4a1c] mb-6 flex items-center gap-2">
                  <User className="w-3.5 h-3.5" /> IDENTITY_TENSOR_MODULE
                </div>
                <div className="max-w-lg">
                  <div className="flex items-center gap-5 mb-8 p-4 border border-neutral-800 bg-neutral-900/30">
                    <div className="w-16 h-16 border border-[#ff4a1c]/40 bg-neutral-900 flex items-center justify-center text-2xl font-bold text-[#ff4a1c] uppercase">
                      {userName.charAt(0)}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">{userName}</div>
                      <div className="text-[10px] font-mono text-neutral-500 mt-0.5">{userEmail}</div>
                      <div className="text-[9px] font-mono text-emerald-500 mt-1.5 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" /> VERIFIED_OPERATOR
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-mono text-neutral-400">[01_USERNAME_HANDLE]</label>
                      <div className="w-full p-3 bg-neutral-900/40 text-neutral-400 border border-neutral-800 text-xs font-mono cursor-not-allowed select-all">{userName}</div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-mono text-neutral-400">[02_EMAIL_KEY_IDENTIFIER]</label>
                      <div className="w-full p-3 bg-neutral-900/40 text-neutral-400 border border-neutral-800 text-xs font-mono cursor-not-allowed select-all">{userEmail}</div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-mono text-neutral-400">[03_SECURE_PASSPHRASE]</label>
                      <div className="w-full p-3 bg-neutral-900/40 text-neutral-500 border border-neutral-800 text-xs font-mono cursor-not-allowed">●●●●●●●●●●●●</div>
                    </div>
                  </div>
                  <div className="mt-6 p-3 border border-neutral-800 bg-neutral-900/20 text-[9px] font-mono text-neutral-500 flex items-start gap-2">
                    <Terminal className="w-3.5 h-3.5 shrink-0 text-[#ff4a1c] mt-0.5" />
                    <span>Profile editing will be available in a future update. Identity fields are read-only during the beta period.</span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* SYSTEM */}
            {activeTab === 'system' && (
              <motion.div key="system" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
                <div className="text-[9px] font-mono text-[#ff4a1c] mb-6 flex items-center gap-2">
                  <HardDrive className="w-3.5 h-3.5" /> SYSTEM_DIAGNOSTICS_MODULE
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="border border-neutral-800 bg-neutral-900/20 p-5">
                    <div className="text-[9px] font-mono text-neutral-500 mb-4 uppercase tracking-wider">Service_Health</div>
                    {[
                      { name: 'DIFFUSION_ENGINE', status: 'OPERATIONAL', cls: 'text-emerald-400' },
                      { name: 'CLOUDINARY_CDN', status: 'OPERATIONAL', cls: 'text-emerald-400' },
                      { name: 'AUTH_GATEWAY', status: 'OPERATIONAL', cls: 'text-emerald-400' },
                      { name: 'HISTORY_STORE', status: 'OPERATIONAL', cls: 'text-emerald-400' },
                      { name: 'RATE_LIMITER', status: 'ACTIVE', cls: 'text-blue-400' },
                    ].map(({ name, status, cls }) => (
                      <div key={name} className="flex items-center justify-between py-2 border-b border-neutral-900 last:border-0">
                        <span className="text-[9px] font-mono text-neutral-500">{name}</span>
                        <span className={`text-[9px] font-mono flex items-center gap-1.5 ${cls}`}>
                          <span className={`w-1.5 h-1.5 rounded-full inline-block ${cls.replace('text-', 'bg-')}`} />
                          {status}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="border border-neutral-800 bg-neutral-900/20 p-5">
                    <div className="text-[9px] font-mono text-neutral-500 mb-4 uppercase tracking-wider">Resource_Allocation</div>
                    {[
                      { label: 'FREE_GEN_TENSORS', value: '10 OBJECTS', note: 'on registration' },
                      { label: 'STABILITY_INTEGRATION', value: 'V1_COHESIVE', note: 'stable diffusion' },
                      { label: 'ASPECT_RATIOS', value: '4 SUPPORTED', note: '1:1 / 4:3 / 3:4 / 16:9' },
                      { label: 'MAX_PROMPT_LENGTH', value: '500 CHARS', note: 'per request' },
                      { label: 'STORAGE_HOST', value: 'CLOUDINARY', note: 'persistent CDN' },
                    ].map(({ label, value, note }) => (
                      <div key={label} className="py-2 border-b border-neutral-900 last:border-0">
                        <div className="flex items-center justify-between">
                          <span className="text-[9px] font-mono text-neutral-500">{label}</span>
                          <span className="text-[9px] font-mono text-neutral-300">{value}</span>
                        </div>
                        <div className="text-[8px] font-mono text-neutral-700 mt-0.5"># {note}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-6 flex items-center gap-3 text-[9px] font-mono text-neutral-600 border border-neutral-900 bg-black/20 p-3">
                  <HardDrive className="w-3.5 h-3.5 shrink-0" />
                  <span>NODE: IMAGINO_CLUSTER_PROD • API: v1.0 • BUILD: STABLE</span>
                  <span className="ml-auto text-emerald-600">ALL_SYSTEMS_NOMINAL</span>
                </div>
              </motion.div>
            )}

          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default Profile;
