import moment from "moment";
import { ArrowUpRight, X } from "lucide-react";
import { Link } from "react-router-dom";

export default function StoryItem(props) {
  const handleChange = (e) => {
    let stories = JSON.parse(localStorage.getItem("stories")) || [];
    stories[props.index].name = e.target.value;
    localStorage.setItem("stories", JSON.stringify(stories));
  };

  return (
    <>
      <div className="relative">
        <div>
          {moment(props.created * 1000)
            .locale("cs")
            .format("D.M.YYYY H:MM")}
        </div>
        <div className="absolute top-3 -right-3 background_bg z-10 border border_color">
          <X className="p-1"/>
        </div>
        <div className="background_text p-[1px] button_cyberpunk w-full">
          <div className="button_cyberpunk background_bg relative text_text !text-xl p-4 flex items-center justify-between">
            <input
              onChange={handleChange}
              defaultValue={props.name}
              className="outline-none"
            />
            <Link to={`/pribeh?storyId=${props.index}`}>
              <ArrowUpRight className="p-2 w-10 h-10" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
