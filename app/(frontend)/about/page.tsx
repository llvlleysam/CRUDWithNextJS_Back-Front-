import SocialLinks from "@/app/_Components/SocialLinks";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About page",
};

export default async function AboutPage() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return (
    <div className="p-4 flex flex-col justify-center">
      <h1>About Me</h1>
      <p className="text-2xl">I am Meysam Farzalian</p>
      <p className="text-xl">I am a junior-level frontend developer.</p>
      <p className="text-xl">
        I have been coding and practicing programming for about a year.
      </p>
      <p className="text-xl">
        I was born in 1991 in Iran and currently live in Tehran.
      </p>
      <p className="text-xl">Ways to contact me:</p>
      <SocialLinks />
    </div>
  );
}
