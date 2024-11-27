import { useEffect, useState } from "react";
import { Sidebar } from "../../components";
import { ConnectionCard } from "../../components/Connection";
import { ConnectionFormat } from "../../types";
import ConnectionApi from "../../api/connection-api";
import { useParams } from "react-router-dom";
import { UseAuth } from "../../contexts/AuthContext";

const Connection = () => {
  const { currentId } = UseAuth();
  const [connections, setConnections] = useState<ConnectionFormat[]>([]);
  const { userId } = useParams();
  console.log(connections)
  useEffect(() => {
    const fetchConnections = async () => {
      try {
        const data = await ConnectionApi.getConnections(Number(userId!));
        setConnections(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchConnections();
  }, []);

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
          Ignatius • {connections.length} Connections
        </h1>
        {connections.map((con) => (
          <ConnectionCard
            key={con.id}
            created_at={new Date()}
            full_name={con.full_name}
            onDelete={handleDelete}
            id={con.id}
            profile_photo_path={con.profile_photo_path}
            username={con.username}
            isSelf={currentId === Number(userId)}
          />
        ))}
      </section>
    </>
  );
};

export default Connection;
