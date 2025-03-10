import NavbarAuth from "../_Components/NavbarAuth";

export default function LayoutFrontend({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <NavbarAuth/>
      {children}
    </>
  );
}
