import { getGameById } from "@/models/Game";
import { useEffect, useState } from "react";
import { X } from "lucide-react";

export default function CartBox(props) {
  const [product, setProduct] = useState();
  const [isLoaded, setLoaded] = useState(false);

  const loadProduct = async () => {
    const data = await getGameById(props.productId);
    if (data.status === 500 || data.status === 404) return setLoaded(null);
    if (data.status === 200) {
      setProduct(data.payload);
      setLoaded(true);
    }
  };

  useEffect(() => {
    loadProduct();
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
        <p>Produkt se načítá</p>
      </>
    );
  }

  return (
    <>
      <div className="my-6 flex items-center mx-12 relative">
        <img
          src={`${product.imagePath}1.png`}
          alt={product.name}
          className="aspect-square w-32 mr-4"
          draggable={false}
        />
        <div>
          <div className="text-2xl">{product.name}</div>
          <div className="text-xl">{props.amount * product.price} $</div>
          <div className="text-xl">{props.amount}x</div>
        </div>
        <div className="p-1 h-8 w-8 absolute right-0 top-0">
        <X id="hover" />
        </div>
      </div>
      <div className="background_text h-[1px] mx-12 opacity-50" />
    </>
  );
}
