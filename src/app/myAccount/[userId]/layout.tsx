import UserNavbar from "@/components/UserNavbar";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className={"min-h-screen"}>
      <UserNavbar />
      {children}
    </main>
  );
}
