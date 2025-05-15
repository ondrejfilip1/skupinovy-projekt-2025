import { getGameById } from "@/models/Game";
import { useEffect, useState } from "react";
import { Minus, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

export default function CartBox(props) {
  const [product, setProduct] = useState();
  const [isLoaded, setLoaded] = useState(false);
  const [currentQuantity, setCurrentQuantity] = useState(0);

  const { priceObject } = props;

  const loadProduct = async () => {
    const data = await getGameById(props.productId);
    if (data.status === 500 || data.status === 404) return setLoaded(null);
    if (data.status === 200) {
      setProduct(data.payload);
      setLoaded(true);
      setCurrentQuantity(props.amount);

      // posilame price object do indexu, podle ktereho pocitame celkovou cenu
      let newPriceObject = {
        price:
          data.payload.price *
          (currentQuantity ? currentQuantity : props.amount),
        productId: props.productId,
      };
      priceObject(newPriceObject);
    }
  };

  const handleQuantity = (add) => {
    let cart = JSON.parse(localStorage.getItem("cart"));
    let quantity = 1;

    if (add) cart[props.index].amount += quantity;
    else if (cart[props.index].amount !== 1)
      cart[props.index].amount -= quantity;
    else toast("Nemůžete mít méně než 1 produkt.");

    setCurrentQuantity(cart[props.index].amount);

    let newPriceObject = {
      price: product.price * cart[props.index].amount,
      productId: props.productId,
    };
    priceObject(newPriceObject);

    localStorage.setItem("cart", JSON.stringify(cart));
  };

  const handleDelete = () => {
    let cart = JSON.parse(localStorage.getItem("cart"));
    cart.splice(props.index, 1);

    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("reloadCart"));

    // kdyz se posila jen productId, tak se automaticky castka za tohle id odebere
    let newPriceObject = {
      productId: props.productId,
    };
    priceObject(newPriceObject);
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
          <div className="text-xl">{currentQuantity * product.price} $</div>
          <div className="text-xl">{currentQuantity}x</div>
        </div>
        <AlertDialog>
          <AlertDialogTrigger>
            <Button
              className="p-1 absolute right-0 top-0 text_text !bg-transparent"
              variant="ghost"
              id="hover"
            >
              <X className="!h-6 !w-6" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="background_bg border-none background_text p-[1px] button_cyberpunk">
            <div className="button_cyberpunk background_bg relative text_text p-4">
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Opravdu chcete smazat tuto položku?
                </AlertDialogTitle>
                <AlertDialogDescription className="text_text">
                  Tato akce nelze vrátit zpět
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel
                  className="bg-transparent border_color hover:bg-transparent text_text_hover rounded-none"
                  id="hover"
                >
                  Zpět
                </AlertDialogCancel>
                <AlertDialogAction
                  className="background_text text_bg rounded-none"
                  id="hover"
                  onClick={handleDelete}
                >
                  Smazat
                </AlertDialogAction>
              </AlertDialogFooter>
            </div>
          </AlertDialogContent>
        </AlertDialog>

        <div className="absolute right-0 bottom-0 button_cyberpunk border-none background_text p-[1px]">
          <div className="flex items-center text-xl button_cyberpunk background_bg">
            <Button
              className="p-1 text_text !bg-transparent"
              variant="ghost"
              id="hover"
              onClick={() => handleQuantity(false)}
            >
              <Minus className="!h-6 !w-6" />
            </Button>
            {currentQuantity}
            <Button
              className="p-1 text_text !bg-transparent"
              variant="ghost"
              id="hover"
              onClick={() => handleQuantity(true)}
            >
              <Plus className="!h-6 !w-6" />
            </Button>
          </div>
        </div>
      </div>

      <div className="background_text h-[1px] mx-12 opacity-50" />
    </>
  );
}
