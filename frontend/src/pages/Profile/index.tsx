import { useParams } from "react-router-dom";
import {
  ProfileSection,
  ActivitySection,
  ExperienceSection,
  SkillsSection,
  RecommendationSection,
} from "../../components/profile";
import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { API_URL } from "../../constant";

export interface Feed {
  content: string;
  created_at: string;
  updated_at: string;
}

export interface ProfileData {
  username: string;
  work_history: string | null;
  skills: string | null;
  profile_photo: string | null;
  full_name: string;
  connection_count: number;
  feeds?: Feed[] | null;
}

export interface UserRecommendation {
  name: string;
  profile_photo: string;
}

export interface RecommendationData {
  recommendations: UserRecommendation[];
}

interface Connection {
  id: number;
  username: string;
  full_name: string;
  profile_photo_path: string;
  created_at: string;
}

export default function Profile() {
  const { isAuthenticated, currentId } = useAuth();
  const { user_id } = useParams<{ user_id: string }>();
  const [profileData, setProfileData] = useState<ProfileData | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isConnected, setIsConnected] = useState(false);
  // const [recommendations, setRecommendations] = useState<RecommendationData | undefined>(undefined);

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

  const handleProfileUpdate = (updatedData: ProfileData) => {
    setProfileData(updatedData);
  };

  useEffect(() => {
    const fetchProfileDataAndConnecetions = async () => {
      try {
        const profileResponse = await fetch(`${API_URL}/profile/${user_id}`, {
          method: "GET",
        });

        
        if (!profileResponse.ok) {
          throw new Error("Failed to fetch profile data");
        }
        
        // const connectionsResponse = await fetch(`${API_URL}/connections/${currentId}`, {
        //   method: "GET",
        // });
        // console.log("Di sini")
        
        // if (!connectionsResponse.ok) {
        //   throw new Error("Failed to fetch connections data");
        // }
        
        const profileData = await profileResponse.json();
        setProfileData(profileData.body);

        // const connectionsData = await connectionsResponse.json();

        // const isUserConnected = connectionsData.body.some((connection: Connection) => connection.id === Number(user_id));
        const isUserConnected = true;
        setIsConnected(isUserConnected);
      } catch (error) {
        if (error instanceof Error) {
          console.log("Error fetch profile data and connections: ");
          console.error(error.message);
        } else {
          console.error("An unknown error occurred");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileDataAndConnecetions();
  }, [user_id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!profileData) {
    return <div>No profile found.</div>;
  }

  return (
    <>
      <main className="bg-custom-bg-color min-h-screen">
        <div className="flex flex-col md:flex-row justify-center gap-x-6">
          <div className="ml-2 max-w-3xl">
            <ProfileSection data={profileData} isAuthenticated={isAuthenticated} currentId={currentId} user_id={Number(user_id)} isConnected={isConnected} onUpdate={handleProfileUpdate}/>
            <ActivitySection username={profileData.username} activity={profileData.feeds?.[0] || null} currentId={currentId} user_id={Number(user_id)}/>
            <ExperienceSection experiences={profileData.work_history || null} />
            <SkillsSection skills={profileData.skills || null} />
          </div>

          <div className="max-w-xs">
            <RecommendationSection
              recommendations={recommendations}
            />
          </div>
        </div>
      </main>
    </>
  );
}
