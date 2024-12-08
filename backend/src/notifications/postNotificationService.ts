export async function notifyPost(userId: string, postId: string, content: string) {
    const connections = await getConnectionName(userId);
    connections.forEach(connections => {
        if(Notification.permission === "granted") {
            new Notification(`New post from ${userId}`, {
                body: `User ${userId} has a new post: ${content}`,
                data: {
                    postId: `/post/${postId}`
                }
            }).onclick = function(event) {
                event.preventDefault();
                window.location.href = `/post/${postId}`
            }
        }
    })
}