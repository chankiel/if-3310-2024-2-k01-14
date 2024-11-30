export function sendChatNotification(sender: string, receiver: string, message: string) {
    if(Notification.permission === "granted") {
        new Notification(`${sender} sent you a message`, {
            body: message,
            data: {
                chatId: `/chat/${receiver}`
            }
        }).onclick = function(event) {
            event.preventDefault();
            window.location.href = `/chat/${receiver}`
        }
    }
}