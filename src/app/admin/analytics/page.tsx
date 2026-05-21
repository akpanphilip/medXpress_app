import {
  Wallet,
  Video,
  Star,
  CheckCircle2,
  TrendingUp,
} from "lucide-react";
import {
  consultationVolume,
  revenueTrend,
  specialties,
  adminStats,
} from "@/lib/data";
import { formatMoney } from "@/lib/utils";
import Card from "@/components/ui/Card";
import StatCard from "@/components/StatCard";
import BarChart from "@/components/BarChart";
import DynamicIcon from "@/components/ui/DynamicIcon";

export default function AdminAnalyticsPage() {
  const maxSpecialty = Math.max(...specialties.map((s) => s.count));
  const totalConsults = consultationVolume.reduce((s, d) => s + d.value, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-extrabold">
          Analytics dashboard
        </h1>
        <p className="text-sm text-muted">
          Consultation volume, revenue and specialty performance.
        </p>
      </div>

      {/* Key metrics */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard
          icon={Wallet}
          label="Revenue (month)"
          value={formatMoney(adminStats.revenue)}
          delta="12%"
          deltaUp
          tone="red"
        />
        <StatCard
          icon={Video}
          label="Consults (week)"
          value={totalConsults.toLocaleString()}
          delta="14%"
          deltaUp
          tone="sky"
        />
        <StatCard
          icon={Star}
          label="Avg. rating"
          value="4.8"
          delta="0.2"
          deltaUp
          tone="amber"
        />
        <StatCard
          icon={CheckCircle2}
          label="Completion rate"
          value="96%"
          delta="3%"
          deltaUp
          tone="online"
        />
      </div>

      {/* Charts */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="p-4">
          <h2 className="font-display text-lg font-extrabold">
            Consultation volume
          </h2>
          <p className="text-sm text-muted">Daily consultations, last 7 days</p>
          <div className="mt-4">
            <BarChart data={consultationVolume} tone="sky" height={190} />
          </div>
        </Card>
        <Card className="p-4">
          <h2 className="font-display text-lg font-extrabold">
            Revenue trend
          </h2>
          <p className="text-sm text-muted">
            Monthly revenue in thousands of Naira
          </p>
          <div className="mt-4">
            <BarChart
              data={revenueTrend}
              tone="red"
              unit="N"
              height={190}
            />
          </div>
        </Card>
      </div>

      {/* Specialty distribution */}
      <Card className="p-4">
        <h2 className="font-display text-lg font-extrabold">
          Consultations by specialty
        </h2>
        <p className="text-sm text-muted">
          Where patients are spending their consultations.
        </p>
        <div className="mt-4 space-y-3">
          {[...specialties]
            .sort((a, b) => b.count - a.count)
            .map((s) => (
              <div key={s.id} className="flex items-center gap-3">
                <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-sky/10 text-sky">
                  <DynamicIcon name={s.icon} size={17} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span className="font-bold">{s.name}</span>
                    <span className="text-muted">{s.count} doctors</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-surface-2">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-sky to-sky-600"
                      style={{
                        width: `${(s.count / maxSpecialty) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
        </div>
      </Card>

      {/* Insight */}
      <Card className="flex items-center gap-3 p-4">
        <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-online/10 text-online">
          <TrendingUp size={24} />
        </div>
        <div>
          <p className="font-bold">Platform is growing steadily</p>
          <p className="text-sm text-muted">
            Consultations rose 14% this week, with Friday as the busiest day.
          </p>
        </div>
      </Card>
    </div>
  );
}
