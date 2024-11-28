import { useEffect, useState } from "react";
import { Sidebar } from "../../components";
import { RequestCard } from "../../components/Connection";
import { ConnectionFormat } from "../../types";
import ConnectionApi from "../../api/connection-api";
import { UseAuth } from "../../contexts/AuthContext";

const Requests = () => {
  const {currentId} = UseAuth()
  const [requests, setRequests] = useState<ConnectionFormat[]>([])

  useEffect(()=>{
    const fetchRequests = async ()=>{
      if(currentId===0) return
      try{
        const body = await ConnectionApi.getPendingRequests(currentId)
        setRequests(body)
      }catch(error){
        console.log(error)
      }
    }
    fetchRequests()
  },[currentId])

  return (
    <>
      <Sidebar />
      <section className="py-5">
        <h1 className="px-5 text-xl font-semibold mb-3">Manage Requests</h1>
        {requests && requests.length > 0 ? requests.map((req,index)=>(
          <RequestCard key={index}/>
        )) : 
        <div className="w-5/6 mx-auto flex flex-col items-center mt-10">
          <img src="/images/no-request.png" alt="no-request" className="w-1/2" />
          <h1 className="text-[30px] mt-3">No new requests</h1>
        </div>
        }
      </section>
    </>
  );
};

export default Requests;
