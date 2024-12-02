import { Sidebar } from "../../components";
import { UserCard } from "../../components/User";
import UserApi from "../../api/user-api";
import React, { useEffect, useState } from "react";
import { APIResponse, ConnectionFormat, UserFormat } from "../../types";
import { useDebouncedCallback } from "use-debounce";
import { useSearchParams } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import ConnectionApi from "../../api/connection-api";
import { toast } from "react-toastify";

const Users = () => {
  const { currentId } = useAuth();
  const [users, setUsers] = useState<UserFormat[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const query_value = searchParams.get("query") ?? "";
  const [loading, setLoading] = useState(true);

  const handleRequest = async (
    id: string,
    isStore: boolean,
    gotRequest: boolean = false,
    isAccept: boolean = false
  ) => {
    try {
      const res = isStore
        ? await ConnectionApi.createRequest({
            from_id: currentId,
            to_id: Number(id),
          })
        : gotRequest
        ? await ConnectionApi.respondRequest(Number(id), currentId, isAccept)
        : await ConnectionApi.deleteConnectionRequest(currentId, Number(id));

      setUsers((prev) =>
        prev.map((user) =>
          user.id === id
            ? {
                ...user,
                is_requested: isStore,
                is_connected: gotRequest && isAccept,
                got_request: gotRequest && isAccept,
                room_id:
                  !isStore && gotRequest && isAccept
                    ? (res.body as ConnectionFormat).room_id
                    : undefined,
              }
            : user
        )
      );
    } catch (error) {
      toast.error((error as APIResponse).message);
    }
  };

  const debouncedSearch = useDebouncedCallback(async (value) => {
    setSearchParams({ query: value });
  }, 500);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    debouncedSearch(val);
  };

  useEffect(() => {
    const fetchUsers = async (query: string = "") => {
      try {
        const users = await UserApi.getUsers(query);
        console.log(users);
        setUsers(users);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsers(query_value);
  }, [query_value]);

  if (loading) return null;

  return (
    <>
      <Sidebar />
      <section className="bg-linkin-subtleyellow border-none min-h-[calc(100vh-135px)]">
        <div className="py-5 bg-white min-h0vh]">
          <h1 className="px-5 text-xl font-semibold mb-3">Users</h1>
          <div className=" mx-5">
            <label
              htmlFor="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search Username or Full Name"
                defaultValue={query_value}
                onChange={handleChange}
              />
            </div>
          </div>

          {users && users.length > 0 ? (
            users.map((user, index) => (
              <UserCard
                key={index}
                user={user}
                handleRequest={handleRequest}
                isFirst={index == 0}
              />
            ))
          ) : query_value ? (
            <h1 className="px-5 mt-7 text-lg">
              Your search - <span className="font-bold">{query_value}</span> -
              did not match any user
            </h1>
          ) : (
            <h1 className="px-5 text-lg">There are no users currently....</h1>
          )}
        </div>
      </section>
    </>
  );
};

export default Users;
