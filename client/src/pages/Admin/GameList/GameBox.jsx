import { Link } from "react-router-dom";

export default function GameBox(props) {
  return (
    <>
      <Link to={`/game/${props._id}`}>
        <p id="hover">{props.name}</p>
      </Link>
    </>
  );
}
