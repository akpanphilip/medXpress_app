import { notFound } from "next/navigation";
import { getDoctor, doctors } from "@/lib/data";
import ConsultationRoom from "./ConsultationRoom";

export function generateStaticParams() {
  return doctors.map((d) => ({ id: d.id }));
}

export default async function ConsultationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const doctor = getDoctor(id);
  if (!doctor) notFound();
  return <ConsultationRoom doctor={doctor} />;
}
