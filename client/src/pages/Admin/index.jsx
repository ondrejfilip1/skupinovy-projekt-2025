import NotFound from "../NotFound";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Admin() {
  if (localStorage.getItem("isAdmin") !== "true") return <NotFound />;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl">Admin panel</h1>
      <h2 className="text-xl">Games</h2>
      <Link to="/game-list">
        <Button>Games list</Button>
      </Link>
      <Link to="/game-create">
        <Button>Create game</Button>
      </Link>
      <h2 className="text-xl">Users</h2>
      <Link to="/user-list">
        <Button>Users list</Button>
      </Link>
    </div>
  );
}
