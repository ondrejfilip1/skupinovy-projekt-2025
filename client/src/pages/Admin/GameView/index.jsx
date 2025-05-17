import { Link, useParams, useNavigate } from "react-router-dom";
import { deleteGame, getGameById } from "../../../models/Game";
import { useState, useEffect } from "react";

export default function GameView() {
  const { id } = useParams();
  const [product, setProduct] = useState();
  const [isLoaded, setLoaded] = useState(false);
  const [info, setInfo] = useState();
  const [formData, setFormData] = useState();
  const navigate = useNavigate();

  if (localStorage.getItem("isAdmin") !== "true") return <NotFound />;

  const load = async () => {
    const data = await getGameById(id);
    if (data.status === 500 || data.status === 404) return setLoaded(null);
    if (data.status === 200) {
      setProduct(data.payload);
      setLoaded(true);
    }
  };

  const handleChange = (e) => {
    setFormData(e.target.value);
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    if (product.name === formData) {
      const data = await deleteGame(id);
      if (data.status === 200) {
        alert("Product deleted successfully!");
        navigate(`/`);
      } else {
        setInfo(data.message);
      }
    } else {
      setInfo("Špatný vstup");
    }
  };

  useEffect(() => {
    load();
  }, []);

  if (isLoaded === null) {
    return (
      <>
        <p>Produkt nenalezen</p>
      </>
    );
  }

  if (!isLoaded) {
    return (
      <>
        <p>Produkt se načítá...</p>
      </>
    );
  }

  return (
    <>
      <div className="container mx-auto p-4">
        <h1 className="text-4xl">Game view</h1>
        <p>{id}</p>
        <p className="text-2xl">Název:</p>
        {product.name}
        <p className="text-2xl">
          Kategorie:
          <br />
        </p>
        {product.category}
        <p className="text-2xl">Popisek:</p>
        <div dangerouslySetInnerHTML={{ __html: product.description }} />
        <p className="text-2xl">Cesta k obrázku:</p>
        {product.imagePath}
        <p className="text-2xl">Cena:</p>
        {product.price}
        <form>
          <input
            type="text"
            placeholder={product.name}
            onChange={handleChange}
          />
          <button onClick={handleDelete}>Smazat produkt</button>
        </form>
        <p>{info}</p>
        <Link to={`/update-car/${id}`}>
          <p>Aktualizovat produkt</p>
        </Link>

        <Link to="/admin">
          <p>Go home</p>
        </Link>
      </div>
    </>
  );
}
