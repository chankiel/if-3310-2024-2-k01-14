import { Sidebar } from "../../components";
import { UserCard } from "../../components/User";
import UserApi from "../../api/user-api";
import React, { useEffect, useState } from "react";
import { UserFormat } from "../../types";
import { useDebouncedCallback } from "use-debounce";
import { useSearchParams } from "react-router-dom";

const Users = () => {
  const [users, setUsers] = useState<UserFormat[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const query_value = searchParams.get("query") ?? "";
  console.log(users)
  const fetchUsers = async (query: string = "") => {
    try {
      const users = await UserApi.getUsers(query);
      setUsers(users);
    } catch (error) {
      console.log(error);
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
    fetchUsers(query_value);
  }, [query_value]);

  return (
    <>
      <Sidebar />
      <section className="py-5">
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

        {users && users.length > 0 ? users.map((user) => (
          <UserCard key={user.id} id={user.id!} name={user.name} username={user.username} profile_photo_path={user.profile_photo ?? ""}/>
        )) : (
            query_value ?
            <h1 className="px-5 mt-7 text-lg">
              Your search - <span className="font-bold">{query_value}</span> - did not match any user
            </h1>
            :
            <h1 className="px-5 text-lg">
              There are no users currently....
            </h1>
        )}
      </section>
    </>
  );
};

export default Users;
