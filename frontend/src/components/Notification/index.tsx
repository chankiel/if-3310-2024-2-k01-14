import React, { useState } from 'react';
import Notification from './Notification';

const NotificationContainer: React.FC = () => {
    const [notifications, setNotifications] = useState<string[]>([]);

    const addNotification = (message: string) => {
        setNotifications((prev) => [...prev, message]);

        // Automatically remove the notification after 5 seconds
        setTimeout(() => {
            removeNotification(message);
        }, 5000);
    };

    const removeNotification = (message: string) => {
        setNotifications((prev) => prev.filter((n) => n !== message));
    };

    return (
        <div className="fixed top-0 right-0 p-4 z-50">
            <button
                onClick={() => addNotification("This is a custom notification!")}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600"
            >
                Show Notification
            </button>
            <div className="mt-4">
                {notifications.map((message, index) => (
                    <Notification key={index} message={message} onClose={() => removeNotification(message)} />
                ))}
            </div>
        </div>
    );
};

export default NotificationContainer;
