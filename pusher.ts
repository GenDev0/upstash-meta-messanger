import Pusher from "pusher";
import ClientPusher from "pusher-js";

const { PUSHER_APPID, PUSHER_KEY, PUSHER_SECRET } = process.env;

export const serverPusher = new Pusher({
  appId: "1512497",
  key: "929c2505b6d0c49fbb22",
  secret: "3bccbb0c020ea6801491",
  cluster: "eu",
  useTLS: true,
});

export const clientPusher = new ClientPusher("929c2505b6d0c49fbb22", {
  cluster: "eu",
  forceTLS: true,
});
