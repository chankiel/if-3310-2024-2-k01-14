import { useState, useEffect, useRef } from "react";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { Sidebar } from "../../components";
import { RecommendationSection } from "../../components/profile";
import CreatePostModal from "../../components/Feed/CreatePostModal";
import { useAuth } from "../../contexts/AuthContext";
import FeedApi from "../../api/feed-api";
import { Navigate } from "react-router-dom";
import moment from "moment";
import EditPostModal from "../../components/Feed/EditPostModal";
import {TrashIcon, PencilIcon} from "@heroicons/react/24/solid";

export interface UserRecommendation {
    name: string;
    profile_photo: string;
}


export default function Feed() {
    const { currentId } = useAuth();
    const { isAuthenticated } = useAuth();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const loadMoreRef = useRef<HTMLDivElement | null>(null);    
    const queryClient = useQueryClient();
    const {username} = useAuth();
    const [editContent, setEditContent] = useState("")
    const [isModalEdit, setIsModalEdit] = useState(false);
    const [feedIdEdit, setFeedIdEdit] = useState(0);
    // console.log(currentId)

    // Menggunakan useInfiniteQuery untuk pagination
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        isError,
    } = useInfiniteQuery({
            queryKey : ["feeds"],
            queryFn : async ({ pageParam = null }: { pageParam: number | null }) => FeedApi.getFeed(pageParam),
            getNextPageParam: (lastPage) => {
                // console.log(lastPage.body.cursor)
                return lastPage.body.cursor ? lastPage.body.cursor : undefined;
            },
            initialPageParam: null, // Nilai awal untuk pageParam
        },
    );

    const feeds = data?.pages.flatMap((page) => page.body.feeds) || [];
    const hasFeed = feeds.length > 0;

    const handleEditProfileClick = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleCloseModalEdit = () => {
        setIsModalEdit(false);
    };
    

    // Menggunakan efek untuk mendeteksi scroll dan memuat halaman berikutnya
    useEffect(() => {
        const handleScroll = () => {
            if (
                loadMoreRef.current &&
                loadMoreRef.current.getBoundingClientRect().top <= window.innerHeight
            ) {
                if (hasNextPage && !isFetchingNextPage) {
                    fetchNextPage();
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

    const handleEdit = async (feed_id: number, content:string) => {
        setEditContent(content)
        setFeedIdEdit(feed_id)
        setIsModalEdit(true)
    };

    const handleDelete = async (feed_id: number) => {
        try {
            await FeedApi.deleteFeed(feed_id);
            console.log(data)
            // Optimistically update the UI
            data?.pages.forEach((page) =>
                page.body.feeds.splice(
                    page.body.feeds.findIndex((feed) => feed.id === feed_id),
                    1
                )
            );
            queryClient.invalidateQueries(["feeds"]);
        } catch (error) {
            console.error("Failed to delete feed", error);
        }
    };

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    const recommendations: UserRecommendation[] = [
        {
            name: "Francesco Michael Kusuma",
            profile_photo: "/perry-casino.webp",
        },
        {
            name: "John Doe",
            profile_photo: "/perry-casino.webp",
        },
        {
            name: "Jane Smith",
            profile_photo: "/perry-casino.webp",
        },
        {
            name: "Alice Johnson",
            profile_photo: "/perry-casino.webp",
        },
        {
            name: "Bob Brown",
            profile_photo: "/perry-casino.webp",
        },
    ];

    return (
        <>
            <main className="flex flex-col md:flex-row p-4 justify-center gap-x-6">
                <Sidebar />
                <div className="min-w-[600px] max-w-[600px] flex-1">
                    <div className="flex items-center w-full mb-4 border rounded-lg px-8 py-6 bg-white">
                        <div className="w-1/7">
                            <img
                                src="/perry-casino.webp"
                                alt="Profile"
                                className="w-14 h-14 rounded-full"
                            />
                        </div>
                        <button
                            className="flex-1 ml-4 p-4 border border-gray-400 rounded-3xl text-left focus:outline-none hover:bg-gray-100"
                            onClick={handleEditProfileClick}
                        >
                            Start a post, try writing with AI
                        </button>
                    </div>
                    <h1 className="px-5 text-xl font-semibold mb-3">
                        {hasFeed
                            ? ``
                            : "You don't have a Feed yet."}
                    </h1>
                    {isLoading ? (
                        <p>Loading feeds...</p>
                    ) : isError ? (
                        <p>Failed to load feeds.</p>
                    ) : hasFeed ? (
                        <ul>
                            {feeds.map((feed, index) => (
                                <li
                                key={index}
                                className="relative flex flex-row py-4 px-4 border-b bg-white mb-4 border rounded-lg"
                            >
                                <div>
                                    <div className="flex items-center w-full pb-2">
                                        <div className="w-1/7 pl-4">
                                            <img
                                                src={
                                                    feed.user.profile_photo_path
                                                        ? feed.user.profile_photo_path
                                                        : "/perry-casino.webp"
                                                }
                                                alt="Profile"
                                                className="w-14 h-14 rounded-full"
                                            />
                                        </div>
                                        <div className="flex-1 w-6/7 px-4">
                                            <div className="py-2">
                                                <div className="font-semibold text-base">
                                                    {feed.user.username}
                                                </div>
                                                <div className="font-normal text-xs text-gray-500">
                                                    posted {moment(feed.created_at).fromNow()}
                                                </div>
                                                <div className="font-normal text-xs text-gray-500">
                                                    updated {moment(feed.updated_at).fromNow()}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-xl ml-4">{feed.content}</div>
                                </div>
                            
                                {/* Tombol di kanan atas */}
                                <div
                                    className={`absolute top-2 right-2 flex gap-2 ${
                                        currentId === feed.user.id ? "" : "hidden"
                                    }`}
                                >
                                    <button
                                        onClick={() => handleEdit(feed.id, feed.content)}
                                        className="p-2 text-sm text-white bg-blue-500 rounded hover:bg-blue-600"
                                        aria-label="Edit"
                                    >
                                        <PencilIcon height={20} width={20} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(feed.id)}
                                        className="p-2 text-sm text-white bg-red-500 rounded hover:bg-red-600"
                                        aria-label="Delete"
                                    >
                                        <TrashIcon height={20} width={20} />
                                    </button>
                                </div>
                            </li>
                            
                            ))}
                        </ul>
                    ) : (
                        <div className="flex flex-col items-center">
                            <img
                                src="/images/no-request.png"
                                alt="no-connection"
                                className="w-1/2 min-w-52"
                            />
                            <h2 className="px-5 text-lg mt-5">
                                Discover innovative ideas and job openings on LinkedIn
                                through your connections and their networks. Find your
                                first connection below.
                            </h2>
                        </div>
                    )}
                    {hasNextPage && (isFetchingNextPage && <div>Loading more...</div>)}
                    <div ref={loadMoreRef} />
                </div>
                <div className="max-w-sm">
                    <RecommendationSection recommendations={recommendations} />
                </div>
            </main>

            <CreatePostModal isOpen={isModalOpen} onClose={handleCloseModal} />
            <EditPostModal isOpen={isModalEdit} onClose={handleCloseModalEdit} feed_id={feedIdEdit} user_id={currentId} username={username} content={editContent} />
        </>
    );
}
