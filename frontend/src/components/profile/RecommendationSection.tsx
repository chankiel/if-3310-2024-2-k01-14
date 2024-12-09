import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import UserRecommendations from "./UserRecommendations";
import { API_URL } from "../../constant";
import ConnectionApi from "../../api/connection-api";
import { toast } from "react-toastify";
import { APIResponse } from "../../types";

export interface UserRecommendation {
  id: number,
  name: string;
  profile_photo: string;
}

export default function RecommendationSection() {
  const { currentId } = useAuth();
  const [recommendations, setRecommendations] = useState<UserRecommendation[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfileDataAndConnections = async () => {
      try {
        const profileResponse = await fetch(`${API_URL}/recommendations/${currentId}`, {
          method: "GET",
        });

        if (!profileResponse.ok) {
          throw new Error("Failed to fetch recommendations data");
        }

        const recommendationData = await profileResponse.json();
        setRecommendations(recommendationData.body);
      } catch (error) {
        if (error instanceof Error) {
          console.log("Error fetching profile data and connections: ");
          console.error(error.message);
          setError(error.message);
        } else {
          console.error("An unknown error occurred");
          setError("An unknown error occurred");
        }
      }
    };

    fetchProfileDataAndConnections();
  }, [currentId]);

  const handleConnect = async (id: string) => {
    try {
      const res = await ConnectionApi.createRequest({
        from_id: currentId,
        to_id: Number(id),
      });
      toast.success(res.message)
      setRecommendations((prev) =>
        prev.filter((rec) => rec.id !== Number(id))
      );
    } catch (error) {
      console.log(error);
      toast.error((error as APIResponse).message)
    }
  };

  return (
    <section className="bg-white border rounded-lg pt-2">
      <h1 className="font-semibold px-6 pt-3">People you might know</h1>
      {error && <p className="text-red-500 px-6">{error}</p>}
      <ul>
        {recommendations.length > 0 ? (
          recommendations.map((user) => (
            <UserRecommendations key={user.id} user={user} handleConnect={handleConnect}/>
          ))
        ) : (
          <p className="px-6">No recommendations available.</p>
        )}
      </ul>
    </section>
  );
}
