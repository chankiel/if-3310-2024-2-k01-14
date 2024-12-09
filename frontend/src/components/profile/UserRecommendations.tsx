import { API_URL } from "../../constant";
import ConnectButton from "./ConnectButton";
import { UserRecommendation } from "./RecommendationSection";

interface UserRecommendationsProps {
    user: UserRecommendation;
}

export default function UserRecommendations({ user }: UserRecommendationsProps) {
    return (
        <li className="w-full flex flex-row py-3 px-6 border-b border-gray-300 last:border-b-0">
            <a href={`/profile/${user.id}`} className="flex w-full" onClick={(e) => e.stopPropagation()}>
                <div className="w-1/4">
                    <img 
                        src={`${API_URL}/show-image/${user.profile_photo}`}
                        alt="Profile" 
                        className="w-32 h-16 rounded-full border-4 border-white"
                    />
                </div>
                <div className="flex-1 w-3/4 ml-4">
                    <h1 className="text-base font-bold">{user.name}</h1>
                    <div className="h-12 py-2">
                        <ConnectButton />
                    </div>
                </div>
            </a>          
        </li>
    );
}
