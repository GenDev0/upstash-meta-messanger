// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { serverPusher } from "../../pusher";
import redis from "../../redis";
import { Message } from "../../typings";

type Data = {
  message: Message;
};
type ErrorData = {
  body: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | ErrorData>
) {
  if (req.method !== "POST") {
    res.status(405).json({ body: "Method Not Allowed !" });
    return;
  }
  const { message } = req.body;

  const newMessage = {
    ...message,
    // Replace user's timestamp with server's timestamp
    created_at: Date.now(),
  };

  // push to upstash Redis DB
  await redis.hset("messages", newMessage.id, JSON.stringify(newMessage));
  // Event Pusher
  serverPusher.trigger("messages", "new-message", newMessage);

  res.status(200).json({ message: newMessage });
}
