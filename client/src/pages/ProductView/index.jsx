import { Link, useParams, useNavigate } from "react-router-dom";
import { deleteGame, getGameById } from "../../models/Game";
import { useState, useEffect } from "react";

export default function ProductView() {
  const { id } = useParams();
  const [product, setProduct] = useState();
  const [isLoaded, setLoaded] = useState(false);
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
      <h1>Zobrazení produktu</h1>
      <p>{id}</p>
      <p>
        Název:
        <br /> {product.name}
      </p>
      <p>
        Kategorie:
        <br /> {product.category}
      </p>
      <p>
        Popisek:
        <br /> {product.description}
      </p>
      <p>
        Cesta k obrázku:
        <br />
        {product.imagePath}
      </p>
      <p>
        Cena:
        <br />
        {product.price}
      </p>
      <form>
        <input type="text" placeholder={product.name} onChange={handleChange} />
        <button onClick={handleDelete}>Smazat produkt</button>
      </form>
      <p>{info}</p>
      <Link to={`/update-car/${id}`}>
        <p>Aktualizovat produkt</p>
      </Link>

      <Link to={"/"}>
        <p>Go home</p>
      </Link>
    </>
  );
}
