import React from 'react';

interface NotificationProps {
    message: string;
    onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ message, onClose }) => {
    return (
        <div className="flex items-center justify-between bg-green-500 text-white p-4 rounded-lg shadow-md mb-2">
            <p>{message}</p>
            <button onClick={onClose} className="ml-4 text-white hover:text-gray-200">
                Close
            </button>
        </div>
    );
};

export default Notification;
