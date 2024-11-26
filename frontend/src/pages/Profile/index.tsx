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

export interface User {
  name: string;
  description: string;
  connections: number;
  profile_photo: string;
}

export interface Activity {
  name: string;
  time: string;
  description: string;
}

// export interface Experience {
//   id: number;
//   jobTitle: string;
//   company: string;
//   location: string;
//   duration: string;
//   description: string;
// }

export interface UserRecommendation {
  id: number;
  name: string;
  description: string;
  profile_photo: string;
}

export interface ProfileData {
  user: User;
  activities: Activity[];
  experiences: string;
  skills: string;
  recommendations: UserRecommendation[];
}

export default function Profile() {
  const { user_id } = useParams<{ user_id: string }>();
  const [profileData, setProfileData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
      const fetchProfileData = async () => {
          // const token = Cookies.get("token");

          // if(token) {
          //     try {
          //         const decodedToken = jwtDecode(token);
          //         console.log(decodedToken);
          //     } catch(error) {
          //         console.error("Token decoding failed: ", error);
          //     }
          // } else {
          //     console.log("No token");
          // }

          const response = await fetch(`http://localhost:3000/api/profile/${user_id}`, {
              method: "GET",
              // headers: {
              //     "Authorization": `Bearer ${token}`,
              // }
          });

          if(response.ok) {
              const data = await response.json();
              console.log('Response: ', data);
              setProfileData(data.data);
          } else {
              console.error("Failed to fetch profile data");
          }

          setIsLoading(false);
      };

      fetchProfileData();
  }, [user_id]);

  if(isLoading) {
      return <div>Loading...</div>;
  }

  if(!profileData) {
      return <div>No profile found.</div>;
  }

  // const profileData: ProfileData = {
  //   user: {
  //     name: "Francesco Michael Kusuma",
  //     description: "Undergraduate Informatics Engineering Student",
  //     connections: 156,
  //     profileImage: "/perry-casino.webp",
  //     backgroundImage: "/bg-image-profile.png",
  //   },
  //   activities: [
  //     {
  //       name: "Francesco Michael Kusuma",
  //       time: "3w",
  //       description:
  //         "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Id eum quod reiciendis quos magni tempora qui laborum, natus perferendis maxime corporis molestiae nam ut, temporibus illo velit mollitia error consequuntur!",
  //     },
  //     {
  //       name: "John Doe",
  //       time: "1w",
  //       description:
  //         "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Id eum quod reiciendis quos magni tempora qui laborum, natus perferendis maxime corporis molestiae nam ut, temporibus illo velit mollitia error consequuntur!",
  //     },
  //     {
  //       name: "Jane Smith",
  //       time: "2w",
  //       description:
  //         "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Id eum quod reiciendis quos magni tempora qui laborum, natus perferendis maxime corporis molestiae nam ut, temporibus illo velit mollitia error consequuntur!",
  //     },
  //     {
  //       name: "Francesco Michael Kusuma",
  //       time: "3w",
  //       description:
  //         "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Id eum quod reiciendis quos magni tempora qui laborum, natus perferendis maxime corporis molestiae nam ut, temporibus illo velit mollitia error consequuntur!",
  //     },
  //     {
  //       name: "John Doe",
  //       time: "1w",
  //       description:
  //         "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Id eum quod reiciendis quos magni tempora qui laborum, natus perferendis maxime corporis molestiae nam ut, temporibus illo velit mollitia error consequuntur!",
  //     },
  //     {
  //       name: "Jane Smith",
  //       time: "2w",
  //       description:
  //         "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Id eum quod reiciendis quos magni tempora qui laborum, natus perferendis maxime corporis molestiae nam ut, temporibus illo velit mollitia error consequuntur!",
  //     },
  //     {
  //       name: "Francesco Michael Kusuma",
  //       time: "3w",
  //       description:
  //         "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Id eum quod reiciendis quos magni tempora qui laborum, natus perferendis maxime corporis molestiae nam ut, temporibus illo velit mollitia error consequuntur!",
  //     },
  //     {
  //       name: "John Doe",
  //       time: "1w",
  //       description:
  //         "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Id eum quod reiciendis quos magni tempora qui laborum, natus perferendis maxime corporis molestiae nam ut, temporibus illo velit mollitia error consequuntur!",
  //     },
  //     {
  //       name: "Jane Smith",
  //       time: "2w",
  //       description:
  //         "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Id eum quod reiciendis quos magni tempora qui laborum, natus perferendis maxime corporis molestiae nam ut, temporibus illo velit mollitia error consequuntur!",
  //     },
  //     {
  //       name: "Francesco Michael Kusuma",
  //       time: "3w",
  //       description:
  //         "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Id eum quod reiciendis quos magni tempora qui laborum, natus perferendis maxime corporis molestiae nam ut, temporibus illo velit mollitia error consequuntur!",
  //     },
  //     {
  //       name: "John Doe",
  //       time: "1w",
  //       description:
  //         "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Id eum quod reiciendis quos magni tempora qui laborum, natus perferendis maxime corporis molestiae nam ut, temporibus illo velit mollitia error consequuntur!",
  //     },
  //     {
  //       name: "Jane Smith",
  //       time: "2w",
  //       description:
  //         "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Id eum quod reiciendis quos magni tempora qui laborum, natus perferendis maxime corporis molestiae nam ut, temporibus illo velit mollitia error consequuntur!",
  //     },
  //   ],
  //   experiences: "Developing and maintaining web applications using React and Node.js.",
  //   // experiences: [
  //   //   {
  //   //     id: 1,
  //   //     jobTitle: "Software Engineer",
  //   //     company: "Tech Company",
  //   //     location: "New York, NY",
  //   //     duration: "Jan 2021 - Present",
  //   //     description:
  //   //       "Developing and maintaining web applications using React and Node.js.",
  //   //   },
  //   //   {
  //   //     id: 2,
  //   //     jobTitle: "Intern",
  //   //     company: "Another Tech Company",
  //   //     location: "San Francisco, CA",
  //   //     duration: "Jun 2020 - Dec 2020",
  //   //     description:
  //   //       "Assisted in the development of internal tools and participated in code reviews.",
  //   //   },
  //   //   {
  //   //     id: 3,
  //   //     jobTitle: "Junior Developer",
  //   //     company: "Startup Inc.",
  //   //     location: "Remote",
  //   //     duration: "Jan 2020 - May 2020",
  //   //     description:
  //   //       "Worked on various projects, focusing on front-end development and user experience.",
  //   //   },
  //   //   {
  //   //     id: 4,
  //   //     jobTitle: "Software Engineer",
  //   //     company: "Tech Company",
  //   //     location: "New York, NY",
  //   //     duration: "Jan 2021 - Present",
  //   //     description:
  //   //       "Developing and maintaining web applications using React and Node.js.",
  //   //   },
  //   //   {
  //   //     id: 5,
  //   //     jobTitle: "Intern",
  //   //     company: "Another Tech Company",
  //   //     location: "San Francisco, CA",
  //   //     duration: "Jun 2020 - Dec 2020",
  //   //     description:
  //   //       "Assisted in the development of internal tools and participated in code reviews.",
  //   //   },
  //   //   {
  //   //     id: 6,
  //   //     jobTitle: "Junior Developer",
  //   //     company: "Startup Inc.",
  //   //     location: "Remote",
  //   //     duration: "Jan 2020 - May 2020",
  //   //     description:
  //   //       "Worked on various projects, focusing on front-end development and user experience.",
  //   //   },
  //   // ],
  //   // skills: [
  //   //   "Communication",
  //   //   "Teamwork",
  //   //   "Problem Solving",
  //   //   "Adaptability",
  //   //   "Creativity",
  //   //   "Communication",
  //   //   "Teamwork",
  //   //   "Problem Solving",
  //   //   "Adaptability",
  //   //   "Creativity",
  //   // ],
  //   skills: "Tidur",
  //   recommendations: [
  //     {
  //       id: 1,
  //       name: "Francesco Michael Kusuma",
  //       description: "Undergraduate Informatics Engineering Student",
  //       imageUrl: "/perry-casino.webp",
  //     },
  //     {
  //       id: 2,
  //       name: "John Doe",
  //       description: "Software Engineer",
  //       imageUrl: "/perry-casino.webp",
  //     },
  //     {
  //       id: 3,
  //       name: "Jane Smith",
  //       description: "Data Scientist",
  //       imageUrl: "/perry-casino.webp",
  //     },
  //     {
  //       id: 4,
  //       name: "Alice Johnson",
  //       description: "Product Manager",
  //       imageUrl: "/perry-casino.webp",
  //     },
  //     {
  //       id: 5,
  //       name: "Bob Brown",
  //       description: "UX Designer",
  //       imageUrl: "/perry-casino.webp",
  //     },
  //   ],
  // };

  return (
    <>
      <div className="bg-custom-bg-color min-h-screen">
        <div className="flex flex-col md:flex-row p-12 justify-center gap-x-6">
          {/* Left Content */}
          <div className="ml-2 max-w-3xl">
            <ProfileSection
              profileData={profileData.user}
              skills={profileData.skills}
              experiences={profileData.experiences}
            />
            <ActivitySection activities={profileData.activities} />
            <ExperienceSection experiences={profileData.experiences} />
            <SkillsSection skills={profileData.skills} />
          </div>

          {/* Right Content */}
          <div className="max-w-xs">
            <RecommendationSection
              recommendations={profileData.recommendations}
            />
          </div>
        </div>
      </div>
    </>
  );
}
