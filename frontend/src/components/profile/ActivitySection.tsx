import { useState } from "react";
import { Feed } from "../../pages/Profile";
import CreatePostModal from "../Feed/CreatePostModal";

interface ActivitySectionProps {
    username: string;
    activity: Feed | null;
    currentId: number;
    user_id: number;
}

export default function ActivitySection({ username, activity, currentId, user_id }: ActivitySectionProps) {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleAddPostClick = () => {
        setIsModalOpen(true);
    }

    const handleCloseModal = () => {
        setIsModalOpen(false);
    }

    return (
        <>
            <section className="bg-white mt-2 p-4 pl-8 rounded-lg border">
                <div className="flex justify-between items-center">
                    <span className="text-xl font-semibold">Latest Activity</span>
                    {currentId === user_id &&
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000" className="cursor-pointer"
                            onClick={handleAddPostClick}>
                            <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
                        </svg>
                    }
                </div>
                <div className="flex flex-col">
                    {activity ? (
                        <>
                            <div className="flex flex-col text-xs text-gray-500 py-2">
                                <strong>
                                    <span> {username} posted this • {activity.created_at}</span>
                                    <span className="block"> {username} updated this • {activity.updated_at}</span>
                                </strong>
                            </div>
                            <div
                                className="resize-none rounded"
                            >
                                {activity.content}
                            </div>
                        </>
                    ) : (
                        <div className="text-xs text-gray-500 py-2">
                            <strong>
                                <span>No activity available for {username}.</span>
                            </strong>
                        </div>
                    )}
                </div>
            </section>

            <CreatePostModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
            />
        </>
    );
}
