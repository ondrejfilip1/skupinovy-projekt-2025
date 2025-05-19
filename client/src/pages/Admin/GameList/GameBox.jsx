import { Link } from "react-router-dom";

export default function GameBox(props) {
  return (
    <>
      <Link to={`/admin/game/${props._id}`}>
        <p className="hover:underline py-1 my-1">{props.name}</p>
      </Link>
    </>
  );
}
