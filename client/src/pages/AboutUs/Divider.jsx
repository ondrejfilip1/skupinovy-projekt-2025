export default function Divider(props) {
  return (
    <>
      <div className="relative">
        <svg
          className={"w-full " + props.flip}
          height="60"
          viewBox="0 0 800 60"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <polyline
            points="0,30 50,30 55,25 300,25 305,30 400,30 405,35 550,35 555,30 750,30 755,28 800,28"
            fill="none"
            stroke="#d0ff57"
            strokeWidth="2"
          />
        </svg>
        {props.number && <div className="absolute top-1">0{props.number}_</div>}
      </div>
    </>
  );
}
