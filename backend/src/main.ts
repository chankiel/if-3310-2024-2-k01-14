import { server } from "./application/web";
import { ChatController } from "./controller/chat-controller";

const PORT = process.env.PORT || 3000;

ChatController.setupSocket()

server.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}`);
    console.log(`Swagger Docs available at http://localhost:${PORT}/api-docs`);

})