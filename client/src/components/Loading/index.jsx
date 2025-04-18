import Logo from "@/assets/logo.png";

export default function Loading() {
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <img src={Logo} alt="NIGHTGRID" className="w-56" />
        <svg
          width="80px"
          height="80px"
          xmlns="http://www.w3.org/2000/svg"
          className="svg_loading_anim mt-2"
        >
          <rect
            x="10"
            y="10"
            width="60"
            height="60"
            fill="none"
            strokeWidth="1"
          />
        </svg>
      </div>
    </>
  );
}
