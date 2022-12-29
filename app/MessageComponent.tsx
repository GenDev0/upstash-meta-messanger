import { useSession } from "next-auth/react";
import Image from "next/image";
import { Message } from "../typings";
import TimeAgo from "react-timeago";

type Props = {
  message: Message;
};

const MessageComponent = ({ message }: Props) => {
  const { data: session } = useSession();
  const isUser = session?.user?.email === message.email;

  const date = new Date(Number(message.created_at)).toDateString();
  return (
    <div className={`flex w-fit ${isUser && "ml-auto"}`}>
      <div className={`flex-shrink-0 ${isUser && "order-2"}`}>
        <Image
          src={message.profilePic.toString()}
          alt={message.username.toString()}
          width={50}
          height={10}
          className='rounded-full mx-2'
        />
      </div>
      <div className=''>
        <p
          className={`text-[0.65rem] px-[2px] pb-[2px]  ${
            isUser ? "text-blue-400 text-right" : "text-red-400 text-left"
          }`}
        >
          {message.username}
        </p>
        <div className=' flex items-end'>
          <div
            className={`px-3 py-2 rounded-lg w-fit text-white
         ${isUser ? "bg-blue-400 ml-auto order-2" : "bg-red-400 "}`}
          >
            <p>{message.message}</p>
          </div>
          <p
            className={` text-gray-300 text-[0.65rem] px-2 italic ${
              isUser && "text-right"
            }`}
          >
            <TimeAgo date={new Date(Number(message.created_at))} />
          </p>
        </div>
      </div>
    </div>
  );
};

export default MessageComponent;
