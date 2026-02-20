import type { Metadata } from "next";
import PortfolioContent from "@/components/portfolio-content";

export const metadata: Metadata = {
  title: "Oskar Valouch | Portfolio",
  description:
    "Student se zájmem o kyberbezpečnost, Python a AI. Osobní portfolio Oskara Valoucha.",
};

export default function Home() {
  return <PortfolioContent />;
}
