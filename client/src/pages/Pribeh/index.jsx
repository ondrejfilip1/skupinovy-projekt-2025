import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { marked } from "marked";
import Header from "@/components/Header";
import {
  Sparkles,
  SendHorizontal,
  Clapperboard,
  CornerUpRight,
} from "lucide-react";
import Loading from "./Loading";
import { cn } from "@/lib/utils";
import { useSearchParams } from "react-router-dom";
import NotFound from "../NotFound";
import { createResponse } from "@/models/Story";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [hasGenerated, setHasGenerated] = useState(false);
  const [input, setInput] = useState("");
  const [currentResponse, setCurrentResponse] = useState();
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasSaved, setHasSaved] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const [stories, setStories] = useState(
    JSON.parse(localStorage.getItem("stories")) || []
  );
  const [storyId, setStoryId] = useState(searchParams.get("storyId"));

  useEffect(() => {
    if (
      storyId &&
      stories &&
      stories.length > 0 &&
      storyId < stories.length &&
      storyId >= 0
    ) {
      setMessages(stories[storyId].messages);
      scrollToBottom();
    } else if (storyId) setNotFound(true);
  }, []);

  const sendMessage = async () => {
    if (!input) return;
    const userMessage = [...messages, { text: input, user: "user" }];
    setMessages(userMessage);
    const response = await fetchMessage(input, userMessage);
    setMessages([...userMessage, { text: response, user: "bot" }]);
    setInput("");
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",
      });
    }, 10);
  };

  const fetchMessage = async (input, currentMessages) => {
    scrollToBottom();
    setIsGenerating(true);
    setHasGenerated(true);
    setHasSaved(false);

    const usedMessages = currentMessages ?? messages;

    const dataObject = {
      messages: usedMessages,
      input: input,
    };

    const data = await createResponse(dataObject);

    if (data.payload.error) {
      setIsGenerating(false);
      return `Nastala chyba: ${data.payload.error.message}`;
    }

    const regex = /<think>.*?<\/think>/gs;
    const result = data.payload.choices[0].message.content
      .trim()
      .replace(regex, "");

    scrollToBottom();

    let stories = JSON.parse(localStorage.getItem("stories")) || [];

    const newStory = {
      messages: [...usedMessages, { text: result, user: "bot" }],
      created: Date.now(),
      name: `Příběh č.${stories.length + (hasSaved ? 0 : 1)}`,
    };

    let currentIndex;
    if (storyId === undefined || storyId === null) {
      if (!hasGenerated) {
        currentIndex = stories.length;
        stories.push(newStory);
      } else {
        currentIndex = stories.length - 1;
        stories[currentIndex] = newStory;
      }
    } else {
      currentIndex = storyId;
      stories[currentIndex] = newStory;
    }

    localStorage.setItem("stories", JSON.stringify(stories));
    setHasSaved(true);
    setIsGenerating(false);

    return result;
  };

  useEffect(() => {
    if (currentResponse && currentResponse.created) setIsGenerating(false);
  }, [currentResponse]);

  if (notFound) {
    return <NotFound />;
  }

  return (
    <>
      <Header />
      {!messages ||
        (messages.length <= 0 && (
          <div className="flex flex-col gap-5 text-center items-center justify-center text-3xl h_screen_fix">
            <Sparkles strokeWidth={1} className="w-20 h-20" />
            Tvůj cyberpunkový příběh začíná teď
          </div>
        ))}
      <div className="mx-auto container text-xl py-2">
        <div
          className={
            "message-container" + (storyId || hasGenerated ? " pb-29" : "")
          }
        >
          {messages.map((message, index) => (
            <div
              key={index}
              className={cn(
                "mb-6 anim_scale",
                message.user === "bot" &&
                  ` background_text p-[1px] button_cyberpunk`
              )}
            >
              <div
                className={cn(
                  `message ${message.user}`,
                  message.user === "bot" && ` background_bg button_cyberpunk`
                )}
                dangerouslySetInnerHTML={{ __html: marked.parse(message.text) }}
              />
            </div>
          ))}
          {isGenerating && <Loading />}
        </div>
        <div className="fixed bottom-4 w-full">
          {!hasGenerated && !storyId && (
            <div className="background_text p-[1px] button_cyberpunk w-fit mb-4">
              <Button
                id="hover"
                onClick={async () => {
                  const userMessage = [
                    ...messages,
                    { text: "Vygeneruj náhodný příběh", user: "user" },
                  ];
                  setMessages(userMessage);
                  const response = await fetchMessage(
                    "Vygeneruj náhodný příběh"
                  );
                  setMessages([
                    ...userMessage,
                    { text: response, user: "bot" },
                  ]);
                  setInput("");
                }}
                className="button_cyberpunk background_bg relative text_text !text-xl py-6 px-4 focus:outline-none border-none focus-visible:border-ring focus-visible:ring-ring/0 focus-visible:ring-[0px]"
              >
                Vygeneruj náhodný příběh
                <Clapperboard />
              </Button>
            </div>
          )}
          {hasGenerated && hasSaved && (
            <>
              <div className="flex gap-4">
                <div className="background_text p-[1px] button_cyberpunk w-fit mb-4">
                  <Button
                    id="hover"
                    onClick={async () => {
                      const userMessage = [
                        ...messages,
                        { text: "Vybírám si první možnost", user: "user" },
                      ];
                      setMessages(userMessage);
                      const response = await fetchMessage(
                        "Vybírám si první možnost"
                      );
                      setMessages([
                        ...userMessage,
                        { text: response, user: "bot" },
                      ]);
                      setInput("");
                    }}
                    className="button_cyberpunk background_bg relative text_text !text-xl py-6 px-4 focus:outline-none border-none focus-visible:border-ring focus-visible:ring-ring/0 focus-visible:ring-[0px]"
                  >
                    Vybírám si první možnost
                    <CornerUpRight />
                  </Button>
                </div>
                <div className="background_text p-[1px] button_cyberpunk w-fit mb-4">
                  <Button
                    id="hover"
                    onClick={async () => {
                      const userMessage = [
                        ...messages,
                        { text: "Vybírám si druhou možnost", user: "user" },
                      ];
                      setMessages(userMessage);
                      const response = await fetchMessage(
                        "Vybírám si druhou možnost"
                      );
                      setMessages([
                        ...userMessage,
                        { text: response, user: "bot" },
                      ]);
                      setInput("");
                    }}
                    className="button_cyberpunk background_bg relative text_text !text-xl py-6 px-4 focus:outline-none border-none focus-visible:border-ring focus-visible:ring-ring/0 focus-visible:ring-[0px]"
                  >
                    Vybírám si druhou možnost
                    <CornerUpRight />
                  </Button>
                </div>
                <div className="background_text p-[1px] button_cyberpunk w-fit mb-4">
                  <Button
                    id="hover"
                    onClick={async () => {
                      const userMessage = [
                        ...messages,
                        { text: "Vybírám si třetí možnost", user: "user" },
                      ];
                      setMessages(userMessage);
                      const response = await fetchMessage(
                        "Vybírám si třetí možnost"
                      );
                      setMessages([
                        ...userMessage,
                        { text: response, user: "bot" },
                      ]);
                      setInput("");
                    }}
                    className="button_cyberpunk background_bg relative text_text !text-xl py-6 px-4 focus:outline-none border-none focus-visible:border-ring focus-visible:ring-ring/0 focus-visible:ring-[0px]"
                  >
                    Vybírám si třetí možnost
                    <CornerUpRight />
                  </Button>
                </div>
              </div>
            </>
          )}

          <div className="container background_text p-[1px] button_cyberpunk">
            <div className="button_cyberpunk flex justify-between background_bg relative">
              <Input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Napiš zprávu"
                disabled={isGenerating}
                className="text_text !text-xl py-6 pl-4 pr-12 focus:outline-none border-none focus-visible:border-ring focus-visible:ring-ring/0 focus-visible:ring-[0px]"
              />
              <SendHorizontal
                id="hover"
                className="w-6 h-6 ring-0 absolute right-3 top-3"
                onClick={sendMessage}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
