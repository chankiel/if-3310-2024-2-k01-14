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
import ChatApi from "../../api/chat-api";
import ConnectionApi from "../../api/connection-api";
import { toast } from "react-toastify";
import { APIResponse } from "../../types";
import { RightSidebar } from "../../components";

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
  room_id?: number | null;
}

export interface UserRecommendation {
  name: string;
  profile_photo: string;
}

export interface RecommendationData {
  recommendations: UserRecommendation[];
}

export default function Profile() {
  const { isAuthenticated, currentId, update, setUpdate } = useAuth();
  const { user_id } = useParams<{ user_id: string }>();
  const [profileData, setProfileData] = useState<ProfileData | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasRequested, setHasRequested] = useState<boolean>(false);
  const [isConnected, setIsConnected] = useState(false);

  const handleProfileUpdate = (updatedData: ProfileData) => {
    console.log("Updating profile data:", updatedData);
    setUpdate(!update);
    setProfileData(updatedData);
  };

  const handleConnect = async (user_id: number, isConnected: boolean) => {
    try {
      const res = isConnected ? await ConnectionApi.deleteConnection(currentId, user_id) :
        await ConnectionApi.createRequest({
          from_id: currentId,
          to_id: user_id,
        })
      toast.success(res.message);
      if (isConnected) {
        setIsConnected(false)
      }
      setHasRequested(!isConnected);
    } catch (error) {
      console.log(error)
      toast.error((error as APIResponse).message)
    }
  }

  useEffect(() => {
    const fetchProfileDataAndConnections = async () => {
      try {
        const profileResponse = await fetch(`${API_URL}/profile/${user_id}`, {
          method: "GET",
        });

        if (!profileResponse.ok) {
          throw new Error("Failed to fetch profile data");
        }
        const profileData = await profileResponse.json();

        if (isAuthenticated) {

          const connectionsResponse = await fetch(`${API_URL}/connections/${currentId}`, {
            method: "GET",
          });

          if (!connectionsResponse.ok) {
            throw new Error("Failed to fetch connections data");
          }
          const connectionsData = await connectionsResponse.json();
          const isUserConnected = connectionsData.body.some((connection: any) => connection.id === Number(user_id));
          setIsConnected(isUserConnected);
          if (isUserConnected) {
            const room_id = await ChatApi.getRoomId(currentId, Number(user_id));
            profileData.body = {
              ...profileData.body,
              room_id: room_id,
            }
          }
        }

        setProfileData(profileData.body);

        await ConnectionApi.checkRequested(currentId, Number(user_id))
        setHasRequested(true);
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

    fetchProfileDataAndConnections();
  }, [user_id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!profileData) {
    return <div>No profile found.</div>;
  }


  return (
    <>
      <section className="bg-custom-bg-color min-h-screen bg-linkin-subtleyellow border-none min-w-full">
        <div className="flex flex-col md:flex-row justify-center gap-x-6">
          <div className="ml-2 max-w-3xl">
            <ProfileSection data={profileData} isAuthenticated={isAuthenticated} currentId={currentId} user_id={Number(user_id)} isConnected={isConnected} onUpdate={handleProfileUpdate} room_id={profileData.room_id ?? -1} handleConnect={handleConnect} hasRequested={hasRequested} />
            {isAuthenticated && <ActivitySection username={profileData.username} activity={profileData.feeds?.[0] || null} currentId={currentId} user_id={Number(user_id)} />}
            <ExperienceSection experiences={profileData.work_history || null} />
            <SkillsSection skills={profileData.skills || null} />
          </div>
          <RightSidebar>
            {isAuthenticated && <RecommendationSection />}
          </RightSidebar>
        </div>
      </section>
    </>
  );
}
