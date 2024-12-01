import { useEffect, useState } from "react";
import { Sidebar } from "../../components";
import { RequestCard } from "../../components/Connection";
import { APIResponse, ConnectionFormat } from "../../types";
import ConnectionApi from "../../api/connection-api";
import { useAuth } from "../../contexts/AuthContext";
import { toast } from "react-toastify";

const Requests = () => {
  const { currentId } = useAuth();
  const [requests, setRequests] = useState<ConnectionFormat[]>([]);
  const [loading, setLoading] = useState(true);

  const handleRespond = async (id: string, isAccept: boolean) => {
    try {
      const res = await ConnectionApi.respondRequest(
        Number(id),
        currentId,
        isAccept
      );
      toast.success(res.message);

      setRequests((prev) => prev.filter((req) => req.id != id));
    } catch (error) {
      toast.error((error as APIResponse).message);
    }
  };

  useEffect(() => {
    const fetchRequests = async () => {
      if (currentId === 0) return;
      try {
        const body = await ConnectionApi.getPendingRequests(currentId);
        setRequests(body);
        setLoading(false)
      } catch (error) {
        console.log(error);
      }
    };
    fetchRequests();
  }, [currentId]);

  if(loading) return null

  return (
    <>
      <Sidebar />
      <section className="py-5">
        <h1 className="px-5 text-xl font-semibold mb-3">Manage Requests</h1>
        {requests && requests.length > 0 ? (
          requests.map((req, index) => <RequestCard key={index} {...req} handleRespond={handleRespond} isFirst={index==0}/>)
        ) : (
          <div className="w-5/6 mx-auto flex flex-col items-center mt-10">
            <img
              src="/images/no-request.png"
              alt="no-request"
              className="w-1/2"
            />
            <h1 className="text-[30px] mt-3">No new requests</h1>
          </div>
        )}
      </section>
    </>
  );
};

export default Requests;
