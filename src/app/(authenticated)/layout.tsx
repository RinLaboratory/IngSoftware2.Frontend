import Sidebar from "~/components/sidebar/sidebar";
import { verifySession } from "./actions";
import { redirect } from "next/navigation";

export default async function AuthenticatedLayout(props: {
  children: React.ReactNode;
}) {
  const verifiedSession = await verifySession();

  if (!verifiedSession) {
    redirect("/login");
  }

  return (
    <>
      <Sidebar />
      <div className="super">
        <div className="main">{props.children}</div>
      </div>
    </>
  );
}
