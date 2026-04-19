import { useAtom, useAtomValue } from "jotai";
import { useEffect } from "react";
import { profilePanelAtom, profileCacheAtom } from "@/atoms/community";
import { SidePanel } from "./SidePanel";
import { getInstrument } from "@catalogs/instrumentCatalog";
import type { PublicProfile } from "@catalogs/communityTypes";

/** Public profile view — instruments + certificates + featured recital. */
export function ProfilePanel() {
  const [userId, setUserId] = useAtom(profilePanelAtom);
  const [cache, setCache] = useAtom(profileCacheAtom);

  useEffect(() => {
    if (!userId) return;
    if (cache[userId]) return;
    // Production: fetch(`/api/v1/profiles/${userId}`)
    setCache((prev) => ({ ...prev, [userId]: buildMockProfile(userId) }));
  }, [userId, cache, setCache]);

  const profile = userId ? cache[userId] : null;
  return (
    <SidePanel title={profile?.displayName ?? "Profile"} open={!!userId} onClose={() => setUserId(null)} width="w-full md:w-[28rem]">
      {profile && <ProfileBody profile={profile} />}
    </SidePanel>
  );
}

function ProfileBody({ profile }: { profile: PublicProfile }) {
  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500/40 to-violet-500/40 flex items-center justify-center text-2xl">
          {profile.displayName[0]}
        </div>
        <div>
          <div className="display text-lg font-semibold">{profile.displayName}</div>
          <div className="text-[10px] uppercase tracking-widest text-white/40">
            Joined {new Date(profile.joinedAt).toLocaleDateString()}
          </div>
          {profile.isTeacher && <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 mr-1">Teacher</span>}
          {profile.isCreator && <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300">Creator</span>}
        </div>
      </div>

      {profile.bio && <p className="text-sm text-white/70">{profile.bio}</p>}

      <div className="grid grid-cols-2 gap-2">
        <StatBox label="Total XP" value={profile.totalXp.toLocaleString()} />
        <StatBox label="Streak" value={`${profile.currentStreak} 🔥`} />
      </div>

      <section>
        <div className="text-[10px] uppercase tracking-widest text-white/40 mb-2">Instruments</div>
        <div className="space-y-1.5">
          {profile.instruments.map((i) => {
            const inst = getInstrument(i.id);
            return (
              <div key={i.id} className="flex items-center gap-3 p-2.5 rounded-lg bg-white/[0.02] border border-white/5">
                <span className="text-xl">{inst?.glyph}</span>
                <div className="flex-1">
                  <div className="text-sm">{inst?.name}</div>
                  <div className="text-[10px] text-white/50">L{i.level} · {i.tier} · {i.xp} XP</div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section>
        <div className="text-[10px] uppercase tracking-widest text-white/40 mb-2">Certificates</div>
        <div className="flex flex-wrap gap-2">
          {profile.certificates.map((c, i) => (
            <div key={i} className="text-[11px] px-2.5 py-1 rounded-full bg-white/5 border border-white/10">
              {getInstrument(c.instrumentId)?.name} · {c.tier}
            </div>
          ))}
          {profile.certificates.length === 0 && <div className="text-xs text-white/40">No certificates yet.</div>}
        </div>
      </section>
    </div>
  );
}

function StatBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5 text-center">
      <div className="font-mono text-base font-semibold">{value}</div>
      <div className="text-[10px] uppercase tracking-widest text-white/40">{label}</div>
    </div>
  );
}

function buildMockProfile(userId: string): PublicProfile {
  return {
    userId,
    displayName: userId.replace(/_/g, " "),
    bio: "Learning one raga at a time.",
    joinedAt: new Date(Date.now() - 180 * 86400e3).toISOString(),
    instruments: [
      { id: "sitar", level: 6, tier: "pro", xp: 4200 },
      { id: "vocals", level: 3, tier: "standard", xp: 1100 },
    ],
    certificates: [
      { instrumentId: "sitar", tier: "standard", earnedAt: new Date().toISOString() },
      { instrumentId: "sitar", tier: "pro", earnedAt: new Date().toISOString() },
      { instrumentId: "vocals", tier: "standard", earnedAt: new Date().toISOString() },
    ],
    totalXp: 5300,
    currentStreak: 42,
  };
}
