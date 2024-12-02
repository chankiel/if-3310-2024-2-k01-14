import { useEffect, useState } from "react";
import { RightSidebar, Sidebar } from "../../components";
import InboxCard from "../../components/Chat/InboxCard";
import { useAuth } from "../../contexts/AuthContext";
import { ConnectionFormat, InboxFormat } from "../../types";
import ChatApi from "../../api/chat-api";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../../components/ui/command";
import ConnectionApi from "../../api/connection-api";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import { Link } from "react-router-dom";

const Inbox = () => {
  const { currentId } = useAuth();
  const [inboxes, setInboxes] = useState<InboxFormat[]>([]);
  const [connections, setConnections] = useState<ConnectionFormat[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchInboxes = async () => {
      try {
        const body = await ChatApi.getInboxes(currentId);
        setInboxes(body);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchInboxes();
  }, [currentId]);

  useEffect(() => {
    const fetchConnections = async () => {
      try {
        const body = await ConnectionApi.getConnections(currentId);
        setConnections(body);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchConnections();
  }, [currentId]);

  if (loading) return null;

  return (
    <>
      <Sidebar />
      <section className="py-5">
        <CommandDialog open={open} onOpenChange={setOpen}>
          <CommandInput placeholder="Type a friend's name..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {connections.map((con,index) => (
                <CommandItem key={index}>
                  <Link to={`/chat/${con.room_id}`} className="flex items-center">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={con.profile_photo_path ?? ""} />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className="w-full ml-3">
                      <h2 className="text-lg font-bold">{con.username}</h2>
                      <h3 className="text-gray-600">{con.full_name}</h3>
                    </div>
                  </Link>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </CommandDialog>
        <div className="px-5 mb-3 flex justify-between">
          <h1 className="text-xl font-semibold">Chats</h1>
          <button
            onClick={() => {
              setOpen(true);
            }}
          >
            <PencilSquareIcon width={30} height={30} />
          </button>
        </div>
        <ul>
          {inboxes.map((inbox, index) => (
            <InboxCard
              isFirst={index == 0}
              isLastSender={inbox.last_sender_id == currentId}
              last_message={inbox.last_message}
              profile_photo={inbox.profile_photo}
              room_id={inbox.room_id}
              updated_at={new Date(inbox.updated_at)}
              username={inbox.username}
              key={index}
            />
          ))}
        </ul>
      </section>
      <RightSidebar />
    </>
  );
};

export default Inbox;
