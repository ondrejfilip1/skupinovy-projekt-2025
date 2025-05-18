import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getAllUsers } from "@/models/User";
import UserBox from "./UserBox";
import { CornerUpLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function UserList() {
  const [users, setUsers] = useState();
  const [isLoaded, setLoaded] = useState(false);

  if (localStorage.getItem("isAdmin") !== "true") return <NotFound />;

  const load = async () => {
    const data = await getAllUsers();
    if (data.status === 404 || data.status === 500) return setLoaded(null);
    if (data.status === 200) {
      setUsers(data.payload);
      setLoaded(true);
    }
  };

  useEffect(() => {
    load();
  }, []);

  if (isLoaded === null) {
    return (
      <>
        <p>Users not found</p>
      </>
    );
  }

  if (!isLoaded) {
    return (
      <>
        <p>Loading...</p>
      </>
    );
  }

  if (isLoaded) {
    return (
      <>
        <div className="container mx-auto p-4">
          <h1 className="text-4xl flex justify-between items-center">
            User list
            <Link to={-1}>
              <Button>
                <CornerUpLeft />
                Go back
              </Button>
            </Link>
          </h1>
          <div className="my-2">
            {users.map((car, index) => (
              <UserBox key={index} {...car} />
            ))}
          </div>
        </div>
      </>
    );
  }
}
