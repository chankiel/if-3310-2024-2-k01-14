import { useEffect, useState } from "react";
import { Sidebar } from "../../components";
import { ConnectionCard } from "../../components/Connection";
import { ConnectionFormat } from "../../types";
import ConnectionApi from "../../api/connection-api";
import { useParams } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { toast } from "react-toastify";
import UserApi from "../../api/user-api";

const Connection = () => {
  const { currentId } = useAuth();
  const [connections, setConnections] = useState<ConnectionFormat[]>([]);
  const { userId } = useParams();
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState<string>("");
  const hasConnection = connections && connections.length > 0;
  const user_id_valid = userId ?? currentId;

  const isSelf = currentId == Number(user_id_valid);

  console.log(connections);
  useEffect(() => {
    const fetchConnections = async () => {
      try {
        const data = await ConnectionApi.getConnections(Number(user_id_valid!));
        setConnections(data);
        if(!isSelf){
          const user = await UserApi.getUser(userId!);
          setUsername(user.username);
        }
      } catch (error) {
        console.log(error);
      } finally{
        setLoading(false)
      }
    };
    fetchConnections();
  }, [user_id_valid]);

  if(loading) return null

  const handleDelete = async (id: string) => {
    try {
      ConnectionApi.deleteConnection(currentId, Number(id));
      toast.success("Connection deleted successfully!")
      setConnections((prev) =>
        prev.filter((connection) => connection.id !== id)
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Sidebar />
      <section className="py-5">
        <h1 className="px-5 text-xl font-semibold mb-3">
          {hasConnection
            ? `${isSelf ? "My connections":`${username}`} • ${connections.length} Connections`
            : `${isSelf ? "You don't":`${username} doesn't`} have any connections yet.`}
        </h1>
        {hasConnection ? (
          connections.map((con,index) => (
            <ConnectionCard
              key={index}
              created_at={new Date()}
              full_name={con.full_name}
              onDelete={handleDelete}
              id={con.id}
              profile_photo={con.profile_photo_path}
              username={con.username}
              isSelf={currentId == user_id_valid}
              isFirst={index==0}
              room_id={con.room_id}
            />
          ))
        ) : (
          <div className="flex flex-col items-center">
          <img src="/images/no-request.png" alt="no-connection" className="w-1/2 min-w-52" />
            <h2 className="px-5 text-lg mt-5">
              Discover innovative ideas and job openings on LinkedIn through
              your connections and their networks. Find your first connection
              below.
            </h2>
          </div>
        )}
      </section>
    </>
  );
};

export default Connection;
