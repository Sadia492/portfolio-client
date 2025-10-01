import Navbar from "@/components/shared/Navbar/Navbar";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar></Navbar>
      <main className="min-h-dvh">{children}</main>
    </>
  );
}
