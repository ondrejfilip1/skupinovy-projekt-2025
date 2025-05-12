import moment from "moment";

export default function StoryItem(props) {
  return (
    <>
      <div className="relative">
        <div className="top-0 right-0">
          {moment(props.created * 1000)
            .locale("cs")
            .format("D.M.YYYY")}
        </div>
        <div className="background_text p-[1px] button_cyberpunk w-full">
          <div className="button_cyberpunk background_bg relative text_text !text-xl p-4">
            <div>Konverzace č.{props.index + 1}</div>
          </div>
        </div>
      </div>
    </>
  );
}
