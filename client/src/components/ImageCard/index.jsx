import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function ImageCard({ img, title, text }) {
  const checkText = () => {
    if ((text === true)) {
      return "text-4xl";
    } else {
      return "text-2xl";
    }
  };

  return (
    <>
      <div className="group relative overflow-hidden">
        <p>NEWS_</p>
        <Card
          style={{ backgroundImage: `url(${img})` }}
          className="home-card bg-cover bg-transparent bg-no-repeat bg-center border-0 rounded-none w-full h-full"
        >
          <CardHeader className="absolute bottom-6 left-0 w-full">
            <CardTitle className={`${checkText()} text_text`}>{title}</CardTitle>
          </CardHeader>
        </Card>
        <div className="border-[1px] border-[#d0ff57] my-2 w-20 transition-all duration-300 group-hover:w-full"></div>
      </div>
    </>
  );
}
