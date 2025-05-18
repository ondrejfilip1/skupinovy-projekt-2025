import moment from "moment";
import { useState } from "react";
import { Eye } from "lucide-react";

export default function UserBox(props) {
  const [showPass, setShowPass] = useState(false);

  return (
    <>
    <div className="flex justify-between items-center">
      <p className="text-2xl">{props.username}</p>
      {moment(props.createdAt).locale("cs").format("D.M.YYYY h:mm")}</div>
      <p>{props.isAdmin ? "Administrátor" : "Uživatel"}</p>
      {showPass ? (
        <div id="hover" onClick={() => setShowPass(!showPass)}>{props.password}</div>
      ) : (
        <div id="hover" className="flex gap-2" onClick={() => setShowPass(!showPass)}>
          <Eye />
          Zobrazit hash hesla
        </div>
      )}
      <div className="w-full h-px background_text my-2 opacity-50"></div>
    </>
  );
}
