import NotFound from "../NotFound";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CornerLeftUp } from "lucide-react";

export default function Admin() {
  if (localStorage.getItem("isAdmin") !== "true") return <NotFound />;

  return (
    <>
      <div className="container mx-auto p-4">
        <h1 className="text-4xl">Admin panel</h1>
        <h2 className="text-xl mt-2">Games</h2>
        <div className="flex gap-2 my-2">
          <Link to="/admin/game-list">
            <Button>Games list</Button>
          </Link>
          <Link to="/admin/game-create">
            <Button>Create game</Button>
          </Link>
        </div>
        <h2 className="text-xl mt-2">Users</h2>
        <div className="flex gap-2 my-2">
          <Link to="/admin/user-list">
            <Button>Users list</Button>
          </Link>
        </div>
      </div>
    </>
  );
}
