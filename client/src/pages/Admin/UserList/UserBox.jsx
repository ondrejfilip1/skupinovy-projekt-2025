import moment from "moment";
import { useState } from "react";
import { Eye, Trash, UserCog, X } from "lucide-react";
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { changeRole, deleteUser } from "@/models/User";
import { toast } from "sonner";

export default function UserBox(props) {
  const [showPass, setShowPass] = useState(false);
  const [formData, setFormData] = useState({
    username: props.username,
  });

  const handleDelete = async () => {
    const data = await deleteUser(props._id);

    if (data.status === 200)
      toast("User has been successfully deleted", {
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
    else
      toast("Error occurred when deleting an user", {
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
  };

  const handleRoleChange = async () => {
    const data = await changeRole(formData);

    if (data.status === 200)
      toast("User role has been successfully changed", {
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
    else
      toast("Error occurred when updating an user role", {
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
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      role: e === "user" ? false : true,
    });
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <p className="text-xl">{props.username}</p>
        {moment(props.createdAt).locale("cs").format("D.M.YYYY h:mm")}
      </div>
      <p className="mb-1 opacity-50 text-sm">
        {props.isAdmin ? "Administrátor" : "Uživatel"}
      </p>
      <div className="flex justify-between items-center">
        {showPass ? (
          <div
            className="py-1.5 text-sm !cursor-pointer inline-block"
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
        <div className="flex gap-2">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" className="!cursor-pointer">
                <UserCog size="icon" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="no_style_component">
              <AlertDialogHeader>
                <AlertDialogTitle>Změna role uživatele</AlertDialogTitle>
              </AlertDialogHeader>
              <Select
                defaultValue={props.isAdmin ? "admin" : "user"}
                onValueChange={handleChange}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Zvolte roli" />
                </SelectTrigger>
                <SelectContent className="no_style_component">
                  <SelectGroup>
                    <SelectLabel>Role</SelectLabel>
                    <SelectItem value="user">Uživatel</SelectItem>
                    <SelectItem value="admin">Administrátor</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <AlertDialogFooter>
                <AlertDialogCancel className="!cursor-pointer">
                  Zpět
                </AlertDialogCancel>
                <AlertDialogAction
                  className="!cursor-pointer"
                  onClick={handleRoleChange}
                >
                  Změnit
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" className="!cursor-pointer">
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
        </div>
      </div>
      <div className="w-full h-px bg-black my-2 opacity-25" />
    </>
  );
}
