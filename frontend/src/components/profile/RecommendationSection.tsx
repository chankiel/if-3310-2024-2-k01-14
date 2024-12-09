import { useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import UserRecommendations from "./UserRecommendations";

export interface UserRecommendation {
    name: string;
    profile_photo: string;
  }
  
  export interface RecommendationData {
    recommendations: UserRecommendation[];
  }
 
export default function RecommendationSection() {

    // const { isAuthenticated, currentId } = useAuth();

    // useEffect(() => {
    //     const fetchProfileDataAndConnecetions = async () => {
    //       try {
    //         const profileResponse = await fetch(`${API_URL}/profile/${user_id}`, {
    //           method: "GET",
    //         });
    
            
    //         if (!profileResponse.ok) {
    //           throw new Error("Failed to fetch profile data");
    //         }
            
    //         // const connectionsResponse = await fetch(`${API_URL}/connections/${currentId}`, {
    //         //   method: "GET",
    //         // });
    //         // console.log("Di sini")
            
    //         // if (!connectionsResponse.ok) {
    //         //   throw new Error("Failed to fetch connections data");
    //         // }
            
    //         const profileData = await profileResponse.json();
    //         setProfileData(profileData.body);
    
    //         // const connectionsData = await connectionsResponse.json();
    
    //         // const isUserConnected = connectionsData.body.some((connection: Connection) => connection.id === Number(user_id));
    //         const isUserConnected = true;
    //         setIsConnected(isUserConnected);
    //       } catch (error) {
    //         if (error instanceof Error) {
    //           console.log("Error fetch profile data and connections: ");
    //           console.error(error.message);
    //         } else {
    //           console.error("An unknown error occurred");
    //         }
    //       } finally {
    //         setIsLoading(false);
    //       }
    //     };
    
    //     fetchProfileDataAndConnecetions();
    //   }, [user_id]);

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
            <section className="bg-white border rounded-lg pt-2">
                    <h1 className="font-semibold px-6 pt-3">More profiles for you</h1>
                    <ul>
                        {recommendations && recommendations.map((user, index) => (
                            <UserRecommendations key={index} user={user} />
                        ))}
                    </ul>
            </section>
        </>
    );
}