import { Link, useParams, useNavigate } from "react-router-dom";
import { deleteGame, getGameById } from "../../../models/Game";
import { useState, useEffect } from "react";
import { CornerUpLeft, X } from "lucide-react";
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

export default function GameView() {
  const { id } = useParams();
  const [product, setProduct] = useState();
  const [isLoaded, setLoaded] = useState(false);
  const [info, setInfo] = useState();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const load = async () => {
    const data = await getGameById(id);
    if (data.status === 500 || data.status === 404) return setLoaded(null);
    if (data.status === 200) {
      setProduct(data.payload);
      setLoaded(true);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    setOpen(false);
    const data = await deleteGame(id);
    if (data.status === 200) {
      navigate("/admin/game-list/");
      toast("Game deleted successfully", {
        unstyled: false,
        cancel: {
          label: <X className="text-black" />,
        },
        classNames: {
          toast:
            "no_style_component !rounded-xl !border-[#e5e5e5] !bg-white !toaster !text-sm",
          title: "!text-sm",
        },
      });
    } else {
      setInfo(data.message);
    }
  };

  useEffect(() => {
    load();
  }, []);

  if (isLoaded === null) {
    return (
      <>
        <p>Game nenalezen</p>
      </>
    );
  }

  if (!isLoaded) {
    return (
      <>
        <p>Game se načítá...</p>
      </>
    );
  }

  return (
    <>
      <div className="container mx-auto p-4">
        <h1 className="text-4xl flex justify-between items-center">
          Game view
          <Link to={-1}>
            <Button>
              <CornerUpLeft />
              Go back
            </Button>
          </Link>
        </h1>
        <p className="text-2xl my-1">ID:</p>
        {product._id}
        <p className="text-2xl my-1">Název:</p>
        {product.name}
        <p className="text-2xl my-1">
          Kategorie:
          <br />
        </p>
        {product.category}
        <p className="text-2xl my-1">Popisek:</p>
        <div dangerouslySetInnerHTML={{ __html: product.description }} />
        <p className="text-2xl my-1">Cesta k obrázku:</p>
        {product.imagePath}
        <p className="text-2xl my-1">Cena:</p>
        {product.price}
        <br />
        <AlertDialog open={open} onOpenChange={setOpen}>
          <AlertDialogTrigger asChild>
            <Button className="my-2 !cursor-pointer" variant="destructive">
              Delete game
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="no_style_component">
            <AlertDialogHeader>
              <AlertDialogTitle>Opravdu chcete smazat hru?</AlertDialogTitle>
              <AlertDialogDescription>
                Tato akce nelze vrátit zpět
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="!cursor-pointer">
                Zpět
              </AlertDialogCancel>
              <AlertDialogAction
                className="!cursor-pointer"
                onClick={handleDelete}
              >
                Smazat
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <p>{info}</p>
        <Link to={`/admin/game-update/${id}`}>
          <Button>Update game</Button>
        </Link>
      </div>
    </>
  );
}
