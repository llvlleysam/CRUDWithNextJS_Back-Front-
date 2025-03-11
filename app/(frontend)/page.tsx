import WeatherChart from "@/app/_Components/WeatherChart";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "My App Test",
};

export default function Home() {
  return (
    <div className="p-4">
      <Suspense fallback={<div>Loading...</div>}>
        <WeatherChart />
      </Suspense>
    </div>
  );
}
