import { useEffect, useState } from "react";
import { Sidebar } from "../../components";
import { ConnectionCard } from "../../components/Connection";
import { ConnectionFormat } from "../../types";
import ConnectionApi from "../../api/connection-api";
import { useParams } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const Connection = () => {
  const { currentId } = useAuth();
  const [connections, setConnections] = useState<ConnectionFormat[]>([]);
  const { userId } = useParams();
  const [loading, setLoading] = useState(true);
  const hasConnection = connections && connections.length > 0;
  const user_id_valid = userId ?? currentId;

  useEffect(() => {
    const fetchConnections = async () => {
      try {
        const data = await ConnectionApi.getConnections(Number(user_id_valid!));
        setConnections(data);
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
      await ConnectionApi.deleteConnection(currentId, Number(id));
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
            ? `Ignatius • ${connections.length} Connections`
            : "You don't have a connection yet."}
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
