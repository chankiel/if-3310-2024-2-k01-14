import ConnectButton from "./ConnectButton";
import { UserRecommendation } from "./RecommendationSection";

interface UserRecommendationsProps {
    user: UserRecommendation;
}

export default function UserRecommendations({ user }: UserRecommendationsProps) {
    return (
        <li className="w-full flex flex-row py-3 px-6 border-b border-gray-300 last:border-b-0">
            <div className="w-1/4">
                <img 
                    src={user.imageUrl} 
                    alt="Profile" 
                    className="w-14 h-14 rounded-full border-4 border-white"
                />
            </div>
            <div className="flex-1 w-3/4">
                <h1 className="text-base font-bold">{user.name}</h1>
                <p className="text-sm text-gray-600 truncate overflow-hidden whitespace-nowrap max-w-xs relative">
                    {user.description}
                </p>
                <div className="h-12 py-2">
                    <ConnectButton />
                </div>
            </div>                   
        </li>
    );
}
