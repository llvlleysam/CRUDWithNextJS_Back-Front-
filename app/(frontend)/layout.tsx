import Navbar from "@/app/_Components/Navbar";
import Link from "next/link";


export default function LayoutFrontend({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar/>
      {children}
    </>
  );
}
