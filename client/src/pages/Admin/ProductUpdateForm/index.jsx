import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { updateGame, getGameById } from "../../../models/Game";

export default function ProductUpdateForm() {
  const { id } = useParams();
  const [ product, setProduct ] = useState();
  const [ isLoaded, setLoaded ] = useState();
  const [ info, setInfo ] = useState();
  const [ formData, setFormData ] = useState();
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
    if (data.status === 200) return navigate(`/car/${id}`);
    setInfo(data.message);
  };

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  }

  const handleUpdate = (e) => {
    e.preventDefault();
    updateForm();
  }

  useEffect(() => {
    load();
  }, []);

  if (isLoaded === null) {
    return (
      <>
        <p>Product not found</p>
      </>
    )
  }

  if (!isLoaded) {
    return (
      <>
        <p>Product is loading...</p>
      </>
    )
  }

  return (
    <>
      <h1>Product update form</h1>
      <p>{id}</p>
      <form>
      <input type="text" name="name" required placeholder="Enter name" onChange={handleChange} defaultValue={product.name}/>
        <input type="text" name="brand" required placeholder="Enter brand" onChange={handleChange} defaultValue={product.brand}/>
        <input type="text" name="color" required placeholder="Enter color" onChange={handleChange} defaultValue={product.color}/>
        <input type="number" name="price" required placeholder="Enter price" onChange={handleChange} defaultValue={product.price}/>
        <button onClick={handleUpdate}>
          Update Product
        </button>
      </form>
    </>
  )
}
