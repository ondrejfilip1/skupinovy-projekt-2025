import NotFound from "@/pages/NotFound";

export default function AdminRoute({ route }) {
  // admin check - jde obejit, ale uzivatel se stejne nedostane do citlivych casti admin panelu
  if (localStorage.getItem("isAdmin") !== "true") return <NotFound />;

  return (
    <>
      <div className="no_style">{route}</div>
    </>
  );
}
