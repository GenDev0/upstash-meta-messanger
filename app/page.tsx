import { unstable_getServerSession } from "next-auth/next";
import { Message } from "../typings";
import ChatInput from "./ChatInput";
import MessageList from "./MessageList";
import { Providers } from "./providers";

async function HomePage() {
  // const data = await fetch(`${process.env.NEXTAUTH_URL}/api/getMessages`).then(
  //   (res) => res.json()
  // );

  // const messages: Message[] = data.messages;
  // const session = await unstable_getServerSession();

  return (
    <Providers session={null}>
      <main>
        {/* <MessageList initialMessages={null} /> */}
        {/* <ChatInput session={session} /> */}
      </main>
    </Providers>
  );
}

export default HomePage;
