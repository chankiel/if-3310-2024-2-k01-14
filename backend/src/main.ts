import { server } from "./application/web";
import { ChatController } from "./controller/chat-controller";

const PORT = process.env.PORT || 3000;

export const vapidKeys = {
    publicKey: process.env.VAPID_PUBLIC_KEY,
    privateKey: process.env.VAPID_PRIVATE_KEY
}

ChatController.setupSocket()

server.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}`);
})