"use client";
import { useEffect, useRef } from "react";
import useSWR from "swr";
import { clientPusher } from "../pusher";
import { Message } from "../typings";
import fetcher from "../utils/fetchMessages";
import MessageComponent from "./MessageComponent";

type Props = {
  initialMessages: Message[];
};

const MessageList = ({ initialMessages }: Props) => {
  const {
    data: messages,
    error,
    mutate,
  } = useSWR<Message[]>("/api/getMessages", fetcher);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const channel = clientPusher.subscribe("messages");

    channel.bind("new-message", async (data: Message) => {
      // if I sent the message , no need to update cache
      if (messages?.find((message) => message.id === data.id)) return;
      console.log("--New Message From Pusher: ", data.message, "--");
      if (!messages) {
        mutate(fetcher);
      } else {
        mutate(fetcher, {
          optimisticData: [data, ...messages!],
          rollbackOnError: true,
        });
      }
    });
    scrollToBottom();
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages, mutate, clientPusher]);

  return (
    <div className='space-y-5 px-5 pt-8 pb-32 xl:max-w-4xl mx-auto'>
      {(messages || initialMessages).map((message) => (
        <MessageComponent key={message.id.toString()} message={message} />
      ))}
      <div className='mb-5' ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;
