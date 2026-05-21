import AppShell from "@/components/AppShell";

export default function DoctorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppShell role="doctor">{children}</AppShell>;
}
