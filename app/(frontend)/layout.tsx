import Navbar from "@/app/_Components/Navbar";


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
