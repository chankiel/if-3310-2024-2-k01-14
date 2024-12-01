import { useState } from "react";
import { Sidebar } from "../../components";
import { RecommendationSection } from "../../components/profile";
import CreatePostModal from "../../components/Feed/CreatePostModal";
import { useAuth } from "../../contexts/AuthContext";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

export interface UserRecommendation {
    name: string;
    profile_photo: string;
}

export default function Feed() {

    const { isAuthenticated } = useAuth();
    const [isModalOpen, setIsModalOpen] = useState(false);

    if(!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    const handleEditProfileClick = () => {
        setIsModalOpen(true);
    }

    const handleCloseModal = () => {
        setIsModalOpen(false);
    }

    const dummyFeeds = [
        {
            content: "Excited to start my new project on AI! I've been researching various algorithms and frameworks, and I can't wait to implement them in my upcoming project. It's going to be a challenging yet rewarding experience as I dive deeper into machine learning and artificial intelligence.",
            created: "3d",
            updated: "3h",
        },
        {
            content: "Just finished reading a great book on software development. The insights on agile methodologies and best practices for coding have really inspired me to improve my own workflow. I highly recommend it to anyone looking to enhance their programming skills and project management techniques.",
            created: "4d",
            updated: "1h",
        },
        {
            content: "Had a productive meeting with my team today! We discussed our progress on the current project and brainstormed some innovative ideas for the next phase. Collaboration is key, and I feel fortunate to work with such talented individuals who are passionate about what they do.",
            created: "5d",
            updated: "30m",
        },
        {
            content: "Looking forward to the weekend! I plan to catch up on some personal projects and spend quality time with family and friends. It's important to recharge and find a balance between work and personal life, and I’m excited to take a break from the usual routine.",
            created: "6d",
            updated: "2h",
        },
        {
            content: "Just launched my new website! Check it out. I've put a lot of effort into designing a user-friendly interface and showcasing my portfolio. It features my latest projects, blog posts, and a contact form for potential collaborations. I would love to hear your feedback!",
            created: "7d",
            updated: "5h",
        },
    ];

    const recommendations: UserRecommendation[] = [
        {
            name: "Francesco Michael Kusuma",
            profile_photo: "/perry-casino.webp",
        },
        {
            name: "John Doe",
            profile_photo: "/perry-casino.webp",
        },
        {
            name: "Jane Smith",
            profile_photo: "/perry-casino.webp",
        },
        {
            name: "Alice Johnson",
            profile_photo: "/perry-casino.webp",
        },
        {
            name: "Bob Brown",
            profile_photo: "/perry-casino.webp",
        },
    ];

    return (
        <>
            <main className="flex flex-col md:flex-row p-4 justify-center gap-x-6">
                <Sidebar />
                <div className="min-w-[600px] max-w-[600px] flex-1">
                    <div className="flex items-center w-full mb-4 border rounded-lg px-8 py-6 bg-white">
                        <div className="w-1/7">
                            <img
                                src="/perry-casino.webp"
                                alt="Profile"
                                className="w-14 h-14 rounded-full"
                            />
                        </div>
                        <button
                            className="flex-1 ml-4 p-4 border border-gray-400 rounded-3xl text-left focus:outline-none hover:bg-gray-100"
                            onClick={handleEditProfileClick}
                        >
                            Start a post, try writing with AI
                        </button>
                    </div>
                    <ul>
                        {dummyFeeds.map((feed, index) => (
                            <li key={index} className="flex flex-row py-4 px-4 border-b bg-white mb-4 border rounded-lg">
                                <div>
                                    <div className="flex items-center w-full pb-2">
                                        <div className="w-1/7 pl-4">
                                            <img
                                                src="/perry-casino.webp"
                                                alt="Profile"
                                                className="w-14 h-14 rounded-full"
                                            />
                                        </div>
                                        <div className="flex-1 w-6/7 px-4">
                                            <div className="py-2">
                                                <div className="font-semibold text-base">
                                                    Francesco Michael Kusuma
                                                </div>
                                                <div className="font-normal text-xs text-gray-500">
                                                    posted {feed.created} ago
                                                </div>
                                                <div className="font-normal text-xs text-gray-500">
                                                    updated {feed.updated} ago
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-xl ml-4">
                                        {feed.content}
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="max-w-sm">
                    <RecommendationSection
                        recommendations={recommendations}
                    />
                </div>
            </main>

            <CreatePostModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
            />
        </>
    );
}
