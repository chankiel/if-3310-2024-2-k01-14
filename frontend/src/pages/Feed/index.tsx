import { useState, useEffect, useRef } from "react";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { RightSidebar, Sidebar } from "../../components";
import { RecommendationSection } from "../../components/profile";
import CreatePostModal from "../../components/Feed/CreatePostModal";
import { useAuth } from "../../contexts/AuthContext";
import FeedApi from "../../api/feed-api";
import { Navigate } from "react-router-dom";
import moment from "moment";
import EditPostModal from "../../components/Feed/EditPostModal";
import { TrashIcon, PencilIcon } from "@heroicons/react/24/solid";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { API_PHOTO } from "../../constant";

export interface UserRecommendation {
    name: string;
    profile_photo: string;
}

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "../../components/ui/alert-dialog";


export default function Feed() {
    const { currentId, profile_photo } = useAuth();
    const { isAuthenticated } = useAuth();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const loadMoreRef = useRef<HTMLDivElement | null>(null);
    const queryClient = useQueryClient();
    const [editContent, setEditContent] = useState("")
    const [isModalEdit, setIsModalEdit] = useState(false);
    const [feedIdEdit, setFeedIdEdit] = useState(0);
    const [update, setUpdate] = useState(false);
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
        queryKey: ["feeds"],
        queryFn: async ({ pageParam = null }: { pageParam: number | null }) => FeedApi.getFeed(pageParam),
        getNextPageParam: (lastPage) => {
            // console.log(lastPage.body.cursor)
            return lastPage.body.cursor ? lastPage.body.cursor : undefined;
        },
        initialPageParam: null, // Nilai awal untuk pageParam
    },
    );


    const feeds = data?.pages.flatMap((page) => page.body.feeds) || [];
    const hasFeed = feeds.length > 0;

    const handleNewPostClick = () => {
        setIsModalOpen(true);
        setUpdate(!update)
    };

    const handleNewPost = (newFeed: any) => {
        queryClient.setQueryData(["feeds"], (prevData: any) => {
            if (!prevData) return;
            return {
                ...prevData,
                pages: prevData.pages.map((page: any, index: number) =>
                    index === 0
                        ? {
                            ...page,
                            body: {
                                ...page.body,
                                feeds: [newFeed, ...page.body.feeds],
                            },
                        }
                        : page
                ),
            };
        });
    };


    const handleUpdateFeed = (feed_id: number, updatedContent: string) => {
        const updatedFeeds = feeds.map((feed) =>
            feed.id === feed_id ? { ...feed, content: updatedContent, updated_at: new Date().toISOString() } : feed
        );
        console.log(updatedFeeds)
        // Perbarui cache `react-query` atau gunakan state local
        queryClient.setQueryData(["feeds"], (prevData: any) => {
            if (!prevData) return;
            return {
                ...prevData,
                pages: prevData.pages.map((page: any) => ({
                    ...page,
                    body: {
                        ...page.body,
                        feeds: updatedFeeds,
                    },
                })),
            };
        });
    };

    useEffect(() => {
        console.log(data);
    }, [data]);


    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleCloseModalEdit = () => {
        setIsModalEdit(false);
    };

    useEffect(() => {
        const fecthUlang = async () => {
            queryClient.invalidateQueries({
                queryKey: ["feeds"],
                exact: true,
            }
            );
        };

        fecthUlang();
    }, [update]);

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


    const handleEdit = async (feed_id: number, content: string) => {
        setEditContent(content)
        setFeedIdEdit(feed_id)
        setIsModalEdit(true)
        console.log(feed_id)
        console.log(content)
        console.log("ikan")
        console.log(editContent)
        console.log(feedIdEdit)
        console.log(data)
        setUpdate(!update)
    };

    const handleDelete = async (feed_id: number) => {
        try {
            await FeedApi.deleteFeed(feed_id);
            setUpdate(!update)
            console.log(data)
            // Optimistically update the UI
            data?.pages.forEach((page) =>
                page.body.feeds.filter(((feed) => feed.id !== feed_id)
                )
            );
        } catch (error) {
            console.error("Failed to delete feed", error);
        }
    };

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return (
        <>
            <Sidebar />
            <section className="flex-1 bg-transparent border-0">
                <div className="flex items-center w-full mb-4 border rounded-lg px-8 py-6 bg-white">
                    <div className="w-1/7">
                        <Avatar>
                            <AvatarImage src={`${API_PHOTO}/${profile_photo}`} alt="profile-photo"/>
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </div>
                    <button
                        className="flex-1 ml-4 p-4 border border-gray-400 rounded-3xl text-left focus:outline-none hover:bg-gray-100"
                        onClick={handleNewPostClick}
                    >
                        Start a post, try writing with AI
                    </button>
                </div>

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
                                            <Avatar>
                                                <AvatarImage src={`${API_PHOTO}/${feed.user.profile_photo_path}`} alt="profile-photo"/>
                                                <AvatarFallback>CN</AvatarFallback>
                                            </Avatar>
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
                                    <div className="text-xl ml-4 max-w-xs sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-2xl break-words overflow-hidden">
                                        {feed.content}
                                    </div>
                                </div>

                                <div className={`absolute top-6 right-4 flex gap-2 ${
                                    currentId === feed.user.id ? "" : "hidden"
                                }`}>
                                <button
                                    className="p-2 text-sm text-white bg-blue-500 rounded hover:bg-blue-600"
                                    onClick={() => handleEdit(feed.id, feed.content)}
                                >
                                    <PencilIcon height={15} width={15} />
                                </button>
                                <AlertDialog>
                                    <AlertDialogTrigger className="p-2 text-sm text-white bg-red-500 rounded hover:bg-red-600">
                                        <TrashIcon height={15} width={15} />
                                    </AlertDialogTrigger>
                                    <AlertDialogContent className="md:w-1/2 w-2/3">
                                    <AlertDialogHeader>
                                        <AlertDialogTitle className="text-xl font-semibold py-2 border-b-2 border-b-linkin-border">Delete Feed</AlertDialogTitle>
                                        <AlertDialogDescription className="text-md text-black pb-2 border-b-2 border-b-linkin-border">
                                            You are about delete this feed. This action cannot be undone.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel className="button-blue text-lg">Cancel</AlertDialogCancel>
                                        <AlertDialogAction onClick={() => handleDelete(feed.id)} className="button-white bg-white text-lg">
                                            Continue
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                                
                                </div>
                            </li>

                        ))}
                    </ul>
                ) : (
                    <section className="flex flex-col items-center">
                        <img
                            src="/images/no-request.png"
                            alt="no-connection"
                            className="w-1/2 min-w-52"
                        />
                        <h2 className="px-5 text-lg mt-5 mb-8">
                            You don't have a Feed yet.
                        </h2>
                    </section>
                )}
                {hasNextPage && (isFetchingNextPage && <div>Loading more...</div>)}
                <div ref={loadMoreRef} />
            </section>
            <RightSidebar>
                <RecommendationSection />
            </RightSidebar>

            <CreatePostModal isOpen={isModalOpen} onClose={handleCloseModal} onAddFeed={handleNewPost} />
            <EditPostModal isOpen={isModalEdit} onClose={handleCloseModalEdit} feed_id={feedIdEdit} content={editContent} onUpdate={handleUpdateFeed} />
        </>
    );
}
