import moment from "moment";
import { useState } from "react";
import { Eye, Trash } from "lucide-react";
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

export default function UserBox(props) {
  const [showPass, setShowPass] = useState(false);

  const handleDelete = () => {
    // TODO
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <p className="text-xl">{props.username}</p>
        {moment(props.createdAt).locale("cs").format("D.M.YYYY h:mm")}
      </div>
      <p className="mb-1 opacity-50">
        {props.isAdmin ? "Administrátor" : "Uživatel"}
      </p>
      <div className="flex justify-between items-center">
        {showPass ? (
          <div
            className="py-1.5 !cursor-pointer inline-block"
            onClick={() => setShowPass(!showPass)}
          >
            {props.password}
          </div>
        ) : (
          <Button
            variant="outline"
            className="flex gap-2 !cursor-pointer"
            onClick={() => setShowPass(!showPass)}
          >
            <Eye />
            Zobrazit hash hesla
          </Button>
        )}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="destructive"
              className="!cursor-pointer"
              onClick={handleDelete}
            >
              <Trash size="icon" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="no_style_component">
            <AlertDialogHeader>
              <AlertDialogTitle>
                Opravdu chcete smazat uživatele?
              </AlertDialogTitle>
              <AlertDialogDescription>
                Tato akce nelze vrátit zpět
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Zpět</AlertDialogCancel>
              <AlertDialogAction>Smazat</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      <div className="w-full h-px bg-black my-2 opacity-25" />
    </>
  );
}
