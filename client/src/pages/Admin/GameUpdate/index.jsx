import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { updateGame, getGameById } from "../../../models/Game";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CornerUpLeft } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function GameUpdate() {
  const { id } = useParams();
  const [product, setProduct] = useState();
  const [isLoaded, setLoaded] = useState();
  const [info, setInfo] = useState();
  const [formData, setFormData] = useState();
  const navigate = useNavigate();

  const load = async () => {
    const data = await getGameById(id);
    if (data.status === 500 || data.status === 404) return setLoaded(null);
    if (data.status === 200) {
      setProduct(data.payload);
      setLoaded(true);
    }
  };

  const updateForm = async () => {
    const data = await updateGame(id, formData);
    if (data.status === 200) return navigate(`/admin/game/${id}`);
    setInfo(data.message);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    updateForm();
  };

  useEffect(() => {
    load();
  }, []);

  if (isLoaded === null) {
    return (
      <>
        <p>Game not found</p>
      </>
    );
  }

  if (!isLoaded) {
    return (
      <>
        <p>Game is loading...</p>
      </>
    );
  }

  return (
    <>
      <div className="container mx-auto p-4">
        <h1 className="text-4xl flex justify-between items-center mb-2">
          Update game
          <Link to={-1}>
            <Button>
              <CornerUpLeft />
              Go back
            </Button>
          </Link>
        </h1>
        <form className="grid gap-2 my-2">
          <Label>Enter name</Label>
          <Input
            type="text"
            name="name"
            required
            placeholder="Enter name"
            onChange={handleChange}
            defaultValue={product.name}
          />
          <Label>Enter category</Label>
          <Input
            type="text"
            name="category"
            required
            placeholder="Enter category"
            onChange={handleChange}
            defaultValue={product.category}
          />
          <Label>Enter description</Label>
          <Textarea
            type="text"
            name="description"
            required
            placeholder="Enter description"
            onChange={handleChange}
            defaultValue={product.description}
          />
          <Label>Enter imagePath</Label>
          <Input
            type="text"
            name="imagePath"
            required
            placeholder="Enter imagePath"
            onChange={handleChange}
            defaultValue={product.imagePath}
          />
          <Label>Enter price</Label>
          <Input
            type="number"
            name="price"
            required
            placeholder="Enter price"
            onChange={handleChange}
            defaultValue={product.price}
          />
          <Button className="w-fit" onClick={handleUpdate}>
            Update Game
          </Button>
        </form>
      </div>
    </>
  );
}
