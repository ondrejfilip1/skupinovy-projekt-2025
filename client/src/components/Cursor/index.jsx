import { useState, useEffect } from "react";
import defaultCur from "../../assets/cursors/default.png";
import pointerCur from "../../assets/cursors/pointer.png";
import textCur from "../../assets/cursors/text.png";
import { Await, useLocation } from "react-router-dom";

export default function Cursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [cursorPath, setCursorPath] = useState(defaultCur);
  const [visible, setVisible] = useState("none");

  const location = useLocation();
  const isAdminURL = location.pathname.startsWith("/admin");

  useEffect(() => {
    // custom kurzor chci skryt v admin panelu a defaultni zviditelnit
    const headElement = document.head;
    if (isAdminURL) {
      const styleElement = document.createElement("style");
      styleElement.setAttribute("cursor-css", "");
      styleElement.innerText = "* { cursor: auto !important; }";
      headElement.append(styleElement);
      return setVisible("none");
    } else {
      const cursorElement = headElement.querySelector("[cursor-css]");
      if (cursorElement) return cursorElement.remove();
    }
  }, [isAdminURL]);

  useEffect(() => {
    const move = (e) => {
      if (isAdminURL) return;

      setVisible("inline");
      // nastavovani pozice kurzoru
      setPos({ x: e.clientX, y: e.clientY });
      // ziskani id (cinske)
      let id = e.target.farthestViewportElement
        ? e.target.farthestViewportElement.id
        : e.target.id;

      // nefunguje nad stripe payment elementem
      if (e.target.localName === "iframe") setVisible("none");
      else setVisible("inline");

      // nastavovani obrazku kurzoru podle idcka
      switch (id) {
        case "hover":
          setCursorPath(pointerCur);
          break;
        case "text":
          setCursorPath(textCur);
          break;
        default:
          setCursorPath(defaultCur);
      }
    };

    // jestli ma nebo nema byt kurzor viditelny
    const show = () => {
      setVisible("inline");
    };

    const hide = () => {
      setVisible("none");
    };

    // event listenery
    document.addEventListener("mousemove", move);
    document.addEventListener("mouseenter", show);
    document.addEventListener("mouseleave", hide);
  }, []);
  
  useEffect(() => {
    if (isAdminURL) return;

    const handleDragStart = () => {
      setVisible("none"); // skryj vlastní kurzor
    };

    const handleDragEnd = async () => {
      const onMouseMove = () => {
        setVisible("inline");
        window.removeEventListener("mousemove", onMouseMove);
      };
    
      window.addEventListener("mousemove", onMouseMove);
    };

    document.addEventListener("dragstart", handleDragStart);
    document.addEventListener("dragend", handleDragEnd);

    return () => {
      document.removeEventListener("dragstart", handleDragStart);
      document.removeEventListener("dragend", handleDragEnd);
    };
  }, [isAdminURL]);useEffect(() => {
    if (isAdminURL) return;
  
    const handleDragStart = () => {
      setVisible("none"); // schovej kurzor
    };
  
    const handleDragEnd = () => {
      setVisible("inline"); // zobraz kurzor zpět
    };
  
    document.addEventListener("dragstart", handleDragStart);
    document.addEventListener("dragend", handleDragEnd);
  
    return () => {
      document.removeEventListener("dragstart", handleDragStart);
      document.removeEventListener("dragend", handleDragEnd);
    };
  }, [isAdminURL]);

  if (isAdminURL) return null;

  return (
    <>
      <img
        src={cursorPath}
        style={{
          transform: `translate(${pos.x}px, ${pos.y}px)`,
          zIndex: 9999999999,
          display: visible,
        }}
        title="cursor"
        className="w-10 h-10 object-contain object-left-top fixed pointer-events-none drop-shadow-[0_0px_4px_rgba(0,0,0,0.75)]"
      />
    </>
  );
}
