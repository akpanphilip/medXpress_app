import Link from "next/link";
import {
  Stethoscope,
  Users,
  Video,
  Wallet,
  Siren,
  BadgeCheck,
  ChevronRight,
  ArrowUpRight,
} from "lucide-react";
import {
  adminStats,
  consultationVolume,
  revenueTrend,
  pendingDoctors,
  doctors,
} from "@/lib/data";
import { formatMoney } from "@/lib/utils";
import Card from "@/components/ui/Card";
import Avatar from "@/components/ui/Avatar";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import StatCard from "@/components/StatCard";
import BarChart from "@/components/BarChart";

export default function AdminOverviewPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-extrabold">
          Platform overview
        </h1>
        <p className="text-sm text-muted">
          Monitor consultations, revenue and doctor onboarding across
          MEDXPRESS.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard
          icon={Stethoscope}
          label="Active doctors"
          value={adminStats.totalDoctors.toString()}
          delta="6 new"
          deltaUp
          tone="sky"
        />
        <StatCard
          icon={Users}
          label="Total patients"
          value={adminStats.totalPatients.toLocaleString()}
          delta="9%"
          deltaUp
          tone="online"
        />
        <StatCard
          icon={Video}
          label="Consultations"
          value={adminStats.consultations.toLocaleString()}
          delta="14%"
          deltaUp
          tone="amber"
        />
        <StatCard
          icon={Wallet}
          label="Revenue (month)"
          value={formatMoney(adminStats.revenue)}
          delta="12%"
          deltaUp
          tone="red"
        />
      </div>

      {/* Charts */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-display text-lg font-extrabold">
                Consultation volume
              </h2>
              <p className="text-sm text-muted">Last 7 days</p>
            </div>
            <Badge tone="sky">
              <ArrowUpRight size={12} /> 14%
            </Badge>
          </div>
          <div className="mt-4">
            <BarChart data={consultationVolume} tone="sky" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-display text-lg font-extrabold">
                Revenue trend
              </h2>
              <p className="text-sm text-muted">Last 6 months (thousands)</p>
            </div>
            <Badge tone="red">
              <ArrowUpRight size={12} /> 12%
            </Badge>
          </div>
          <div className="mt-4">
            <BarChart data={revenueTrend} tone="red" unit="N" />
          </div>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {/* Pending verifications */}
        <Card className="p-4 lg:col-span-2">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-display text-lg font-extrabold">
              Pending doctor verifications
            </h2>
            <Link
              href="/admin/doctors"
              className="flex items-center gap-0.5 text-sm font-bold text-sky hover:underline"
            >
              Review all <ChevronRight size={15} />
            </Link>
          </div>
          <div className="space-y-2">
            {pendingDoctors.map((d) => (
              <div
                key={d.id}
                className="flex items-center gap-3 rounded-xl bg-surface-2 p-3"
              >
                <Avatar
                  src={d.avatar}
                  name={d.name}
                  size={42}
                  className="rounded-lg"
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold">{d.name}</p>
                  <p className="truncate text-xs text-muted">
                    {d.specialty} | {d.submitted}
                  </p>
                </div>
                <Badge tone="amber">{d.documents} docs</Badge>
              </div>
            ))}
          </div>
        </Card>

        {/* Side cards */}
        <div className="space-y-4">
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-red/10 text-red">
                <Siren size={24} />
              </div>
              <div>
                <p className="font-display text-2xl font-extrabold">
                  {adminStats.emergencyToday}
                </p>
                <p className="text-sm text-muted">Emergency consults today</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-online/10 text-online">
                <BadgeCheck size={24} />
              </div>
              <div>
                <p className="font-display text-2xl font-extrabold">
                  {doctors.length}
                </p>
                <p className="text-sm text-muted">Doctors online now</p>
              </div>
            </div>
          </Card>
          <Button href="/admin/analytics" variant="outline" fullWidth>
            View full analytics
          </Button>
        </div>
      </div>
    </div>
  );
}
