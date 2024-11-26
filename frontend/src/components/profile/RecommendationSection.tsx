import UserRecommendations from "./UserRecommendations";

export interface UserRecommendation {
    id: number;
    name: string;
    description: string;
    imageUrl: string;
}

interface RecommendationSectionProps {
    recommendations: UserRecommendation[]
}
 
export default function RecommendationSection({ recommendations }: RecommendationSectionProps) {
    return (
        <>
            <section className="bg-white rounded-lg pt-2" style={{ boxShadow: '0 0 0 1px rgba(140, 140, 140, 0.2)' }}>
                    <h1 className="font-semibold px-6 pt-3">More profiles for you</h1>
                    <ul>
                        {recommendations.map((user) => (
                            <UserRecommendations key={user.id} user={user} />
                        ))}
                    </ul>
            </section>
        </>
    );
}