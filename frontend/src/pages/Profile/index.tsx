import { useParams } from "react-router-dom";
import {
  ProfileSection,
  ActivitySection,
  ExperienceSection,
  SkillsSection,
  RecommendationSection,
} from "../../components/profile";
import { useEffect, useState } from "react";
// import Cookies from "js-cookie";
// import jwtDecode from 'jwt-js-decode';

export interface Activity {
  content: string;
  created_At: string;
  updated_at: string;
}

export interface ProfileData {
  username: string;
  work_history: string | null;
  skills: string | null;
  profile_photo: string | null;
  name: string;
  connection_count: number;
  activity?: Activity;
}

export interface UserRecommendation {
  name: string;
  profile_photo: string;
}

export interface RecommendationData {
  recommendations: UserRecommendation[];
}

export default function Profile() {
  const { user_id } = useParams<{ user_id: string }>();
  // const [profileData, setProfileData] = useState<ProfileData | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(true);
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

  const dummyActivity: Activity = {
    content: "Completed a project on React and TypeScript.",
    created_At: "3 months ago",
    updated_at: "2 minutes ago"
  };

  const profileData: ProfileData = {
    "username": "francesco",
    "work_history": "Makan kentang goreng",
    "skills": "Tidur",
    "profile_photo": "/perry-casino.webp",
    "name": "Francesco Michael Kusuma",
    "connection_count": 0,
    "activity": dummyActivity
  }

  // useEffect(() => {
  //   const fetchProfileData = async () => {
  //     // const token = Cookies.get("token");

  //     // if(token) {
  //     //     try {
  //     //         const decodedToken = jwtDecode(token);
  //     //         console.log(decodedToken);
  //     //     } catch(error) {
  //     //         console.error("Token decoding failed: ", error);
  //     //     }
  //     // } else {
  //     //     console.log("No token");
  //     // }

  //     const response = await fetch(`http://localhost:3000/api/profile/${user_id}`, {
  //       method: "GET",
  //       // headers: {
  //       //     "Authorization": `Bearer ${token}`,
  //       // }
  //     });

  //     if (response.ok) {
  //       const data = await response.json();
  //       setProfileData(data.body);
  //     } else {
  //       console.error("Failed to fetch profile data");
  //     }

  //     setIsLoading(false);
  //   };

  //   fetchProfileData();
  // }, [user_id]);

  // useEffect(() => {
  //   if (profileData) {
  //     console.log("Profile data: ", profileData);
  //   }
  // }, [profileData]);

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  // if (!profileData) {
  //   return <div>No profile found.</div>;
  // }

  return (
    <>
      <div className="bg-custom-bg-color min-h-screen">
        <div className="flex flex-col md:flex-row p-24 justify-center gap-x-6 mt-8">
          <div className="ml-2 max-w-3xl">
            <ProfileSection data={profileData} />
            {profileData.activity && <ActivitySection username = {profileData.username} activity={profileData.activity} />}
            {profileData.work_history && <ExperienceSection experiences={profileData.work_history} />}
            {profileData.skills && <SkillsSection skills={profileData.skills} />}
          </div>

          <div className="max-w-xs">
            <RecommendationSection
              recommendations={recommendations}
            />
          </div>
        </div>
      </div>
    </>
  );
}
