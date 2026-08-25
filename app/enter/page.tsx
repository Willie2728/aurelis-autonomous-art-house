import type { Metadata } from "next";
import { EnterExperience } from "@/components/home/EnterExperience";

export const metadata: Metadata = { title: "Enter the Art House" };

export default function EnterPage() {
  return <EnterExperience />;
}
