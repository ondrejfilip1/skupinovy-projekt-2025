import moment from "moment";
import { useState } from "react";
import { Eye } from "lucide-react";

export default function UserBox(props) {
  const [showPass, setShowPass] = useState(false);

  return (
    <>
      <p>{props.username}</p>
      {moment(props.createdAt).locale("cs").format("D.M.YYYY H:MM")}
      <p></p>
      {showPass ? (
        <div onClick={() => setShowPass(!showPass)}>{props.password}</div>
      ) : (
        <div className="flex gap-2" onClick={() => setShowPass(!showPass)}>
          <Eye />
          Zobrazit hash hesla
        </div>
      )}
      <div className="w-full h-px background_text my-2"></div>
    </>
  );
}
