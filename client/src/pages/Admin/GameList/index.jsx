import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getAllGames } from "../../../models/Game";
import GameBox from "./GameBox";
import NotFound from "@/pages/NotFound";
import { Button } from "@/components/ui/button";

export default function GameList() {
  const [games, setGames] = useState();
  const [isLoaded, setLoaded] = useState(false);

  if (localStorage.getItem("isAdmin") !== "true") return <NotFound />;

  const load = async () => {
    const data = await getAllGames();
    if (data.status === 404 || data.status === 500) return setLoaded(null);
    if (data.status === 200) {
      setGames(data.payload);
      setLoaded(true);
    }
  };

  useEffect(() => {
    load();
  }, []);

  if (isLoaded === null) {
    return (
      <>
        <p>Games not found</p>
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
          <h1 className="text-4xl">Games list</h1>
          {games.map((car, index) => (
            <GameBox key={index} {...car} />
          ))}

          <Button>
            <Link to="/admin">
              <p>Go home</p>
            </Link>
          </Button>
        </div>
      </>
    );
  }
}
