import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getAllUsers } from "@/models/User";
import UserBox from "./UserBox";

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
          <h1 className="text-4xl">User list</h1>
          {users.map((car, index) => (
            <UserBox key={index} {...car} />
          ))}

        <Link to={-1}>
          <p>Go back</p>
        </Link>
        </div>
      </>
    );
  }
}
