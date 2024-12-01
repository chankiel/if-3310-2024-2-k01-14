import { useState } from "react";
import { Sidebar } from "../../components";

export default function Notifications() {
    const [notifications, setNotifications] = useState([
        {
            type: "chat",
            user: "John Doe",
            message: "Hey! Are we still on for the meeting tomorrow?",
            url: "/chat/2",
            time: "2h",
            read: false,
        },
        {
            type: "post",
            user: "Layla A. Ramadhani",
            action: "A new document is available.",
            url: "/post/2",
            time: "3h",
            read: true,
        },
        {
            type: "chat",
            user: "Jane Smith",
            message: "Don't forget to submit your report!",
            url: "/chat/3",
            time: "1h",
            read: true,
        },
        {
            type: "post",
            user: "LinkedIn News Asia",
            action: "Friday Wrap-Up: K-pop stars break away; E-commerce platforms must register; and more.",
            url: "/post/3",
            time: "3h",
            read: false,
        },
    ]);

    const handleNotificationClick = (index: number) => {
        const updatedNotifications = [...notifications];
        updatedNotifications[index].read = true;
        setNotifications(updatedNotifications);
    }

    return (
        <>
            <main className="flex flex-col md:flex-row p-4 justify-center gap-x-6">
                <Sidebar />
                <section>
                    <ul className="">
                        {notifications.map((notification, index) => (
                            <li
                                key={index}
                                style={{ backgroundColor: notification.read ? '#ffffff' : 'rgba(55, 143, 233, 0.2)' }}
                                className="flex flex-row py-4 px-6 border-b"
                                onClick={() => handleNotificationClick(index)}
                            >
                                <a
                                    href={notification.url}
                                    className="flex-1 flex items-center justify-between"
                                    onClick={(e) => e.stopPropagation()}>
                                    <div className="flex items-center w-6/7">
                                        <div className={`w-2 h-2 rounded-full mr-4 ${notification.read ? 'bg-white' : 'bg-blue-500'}`}></div>
                                        <div className="w-1/7">
                                            <img
                                                src="/perry-casino.webp"
                                                alt="Profile"
                                                className="w-14 h-14 rounded-full"
                                            />
                                        </div>
                                        <div className="flex-1 w-6/7 px-4">
                                            <div className="py-2">
                                                {notification.type === "chat" ? (
                                                    <div>
                                                        <h1 className="text-base">
                                                            <span className="font-bold">{notification.user}</span> sent you a message
                                                        </h1>
                                                        <p className="text-gray-800 mt-1">{notification.message}</p>
                                                    </div>
                                                ) : (
                                                    <div>
                                                        <h1 className="text-base">
                                                            <span className="font-bold">{notification.user}</span> has shared a new post!
                                                        </h1>
                                                        <p className="text-gray-800 mt-1">{notification.action}</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-gray-400 text-xs ml-4">
                                        {notification.time}
                                    </div>
                                </a>
                            </li>
                        ))}
                    </ul>
                </section>
            </main>
        </>
    );
}
