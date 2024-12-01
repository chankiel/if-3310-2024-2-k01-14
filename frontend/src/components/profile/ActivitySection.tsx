import { Feed } from "../../pages/Profile";

interface ActivitySectionProps {
    username: string;
    activity: Feed | null;
}

export default function ActivitySection({ username, activity }: ActivitySectionProps) {

    return (
        <>
            <section className="bg-white mt-2 p-4 pl-8 rounded-lg border">
                <span className="text-xl font-semibold">Latest Activity</span>
                <div className="flex flex-col">
                    {activity ? (
                        <>
                            <div className="flex flex-col text-xs text-gray-500 py-2">
                                <strong>
                                    <span> {username} posted this • {activity.created_at}</span>
                                    <span className="block"> {username} updated this • {activity.updated_at}</span>
                                </strong>
                            </div>
                            <textarea
                                value={activity.content}
                                className="resize-none"
                                rows={5}
                            />
                        </>
                    ) : (
                        <div className="text-xs text-gray-500 py-2">
                            <strong>
                                <span>No activity available for {username}.</span>
                            </strong>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}
