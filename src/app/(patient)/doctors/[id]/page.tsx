import { notFound } from "next/navigation";
import { getDoctor, doctors } from "@/lib/data";
import DoctorProfile from "./DoctorProfile";

export function generateStaticParams() {
  return doctors.map((d) => ({ id: d.id }));
}

export default async function DoctorProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const doctor = getDoctor(id);
  if (!doctor) notFound();
  return <DoctorProfile doctor={doctor} />;
}
