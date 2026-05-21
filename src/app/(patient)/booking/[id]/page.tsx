import { notFound } from "next/navigation";
import { getDoctor, doctors } from "@/lib/data";
import BookingFlow from "./BookingFlow";

export function generateStaticParams() {
  return doctors.map((d) => ({ id: d.id }));
}

export default async function BookingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const doctor = getDoctor(id);
  if (!doctor) notFound();
  return <BookingFlow doctor={doctor} />;
}
