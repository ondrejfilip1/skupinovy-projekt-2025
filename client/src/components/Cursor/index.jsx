import { useState, useEffect } from "react";
import defaultCur from "../../assets/cursors/default.png";
import pointerCur from "../../assets/cursors/pointer.png";

export default function Cursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [cursorPath, setCursorPath] = useState(defaultCur);
  const [visible, setVisible] = useState("none");

  useEffect(() => {
    const move = (e) => {
      setPos({ x: e.clientX, y: e.clientY });

      // nastavovani kurzoru podle idcka
      if (e.target.id === "hover") setCursorPath(pointerCur);
      else setCursorPath(defaultCur);
    };

    const show = () => {
      setVisible("inline");
    };

    const hide = () => {
      setVisible("none");
    };

    document.addEventListener("mousemove", move);
    document.addEventListener("mouseenter", show);
    document.addEventListener("mouseleave", hide);
  }, []);

  return (
    <>
      <img
        src={cursorPath}
        style={{
          left: pos.x,
          top: pos.y,
          zIndex: 99,
          display: visible,
        }}
        className="w-10 fixed pointer-events-none"
      />
    </>
  );
}
