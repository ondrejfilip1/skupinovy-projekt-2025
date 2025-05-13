import moment from "moment";
import { ArrowUpRight, X } from "lucide-react";
import { Link } from "react-router-dom";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function StoryItem(props) {
  const handleChange = (e) => {
    let stories = JSON.parse(localStorage.getItem("stories")) || [];
    stories[props.index].name = e.target.value;
    localStorage.setItem("stories", JSON.stringify(stories));
  };

  const handleDelete = () => {
    let stories = JSON.parse(localStorage.getItem("stories")) || [];
    stories.splice(props.index, 1);
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
        <div className="absolute top-3 -right-3 background_bg z-10 border border_color h-6.5">
          <AlertDialog>
            <AlertDialogTrigger>
              <X className="p-1" />
            </AlertDialogTrigger>
            <AlertDialogContent className="background_bg border-none background_text p-[1px] button_cyberpunk">
              <div className="button_cyberpunk background_bg relative text_text p-4">
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Opravdu chcete smazat tento příběh?
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text_text">
                    Tato akce nelze vrátit zpět
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel
                    className="bg-transparent border_color hover:bg-transparent text_text_hover rounded-none"
                    id="hover"
                  >
                    Zpět
                  </AlertDialogCancel>
                  <AlertDialogAction
                    className="background_text text_bg rounded-none"
                    id="hover"
                    onClick={handleDelete}
                  >
                    Smazat
                  </AlertDialogAction>
                </AlertDialogFooter>
              </div>
            </AlertDialogContent>
          </AlertDialog>
        </div>
        <div className="background_text p-[1px] button_cyberpunk w-full">
          <div className="button_cyberpunk background_bg relative text_text !text-xl p-4 flex items-center justify-between">
            <input
              onChange={handleChange}
              defaultValue={props.name}
              className="outline-none"
              id="text"
              maxLength={64}
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
