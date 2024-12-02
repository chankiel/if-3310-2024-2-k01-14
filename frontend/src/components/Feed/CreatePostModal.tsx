import { useState } from "react";
import { API_URL } from "../../constant";

interface CreatePostModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function CreatePostModal({ isOpen, onClose }: CreatePostModalProps) {
    const [postContent, setPostContent] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);
    const [responseMessage, setResponseMessage] = useState("");

    const handleClose = () => {
        setPostContent("");
        setResponseMessage("");
        onClose();
    };

    if (!isOpen) return null;

    const isButtonDisabled = postContent.trim() === "";

    const handlePost = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await fetch(`${API_URL}/feed`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    content: postContent,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setIsSuccess(true);
                setResponseMessage(data.message);
                setPostContent("");
                onClose();
                window.location.reload();
            } else {
                setIsSuccess(false);
                setResponseMessage(data.message);
            }
        } catch (err) {
            setIsSuccess(false);
            setResponseMessage("An error occurred. Please try again.");
            console.error("Error: ", err);
        }
    };

    return (
        <>
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                <div className="bg-white rounded-lg p-8 w-96 md:w-1/2 lg:w-1/2 h-auto max-h-[80vh] overflow-y-auto relative mt-16">
                    <div className="flex items-center w-full mb-4 px-2 py-2 bg-white">
                        <div className="w-1/7">
                            <img
                                src="/perry-casino.webp"
                                alt="Profile"
                                className="w-14 h-14 rounded-full"
                            />
                        </div>
                        <div className="font-semibold text-base ml-4">
                            Francesco Michael Kusuma
                        </div>
                    </div>
                    <form onSubmit={handlePost}>
                        <textarea
                            placeholder="What do you want to talk about?"
                            className="w-full h-32 p-2 border rounded-lg focus:outline-none"
                            value={postContent}
                            onChange={(e) => setPostContent(e.target.value)}
                        />
                        <div className="flex justify-end items-center mt-4">
                            <button
                                className={`px-4 py-2 rounded-lg ${isButtonDisabled ? 'bg-gray-400 text-gray-200' : 'bg-blue-500 text-white'}`}
                                type="submit"
                                disabled={isButtonDisabled}
                            >
                                Post
                            </button>
                        </div>
                    </form>
                    {responseMessage && (
                        <div className={`mt-4 text-sm ${isSuccess ? 'text-green-600' : 'text-red-600'}`}>
                            {responseMessage}
                        </div>
                    )}
                    <svg
                        className="absolute top-4 right-4 cursor-pointer h-6 w-6"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        onClick={handleClose}
                        aria-label="Close modal"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </div>
            </div>
        </>
    );
}
