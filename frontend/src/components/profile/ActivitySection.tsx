import { Activity } from "../../pages/Profile";

interface ActivitySectionProps {
    username: string;
    activity: Activity;
}

export default function ActivitySection({ username, activity }: ActivitySectionProps) {

    return (
        <>
            <section className="bg-white mt-2 p-4 pl-8">
                <span className="text-xl font-semibold">Activity</span>
                <ul className="pt-1">
                    <li className="py-4 border-b border-gray-300">
                        <div className="flex flex-col">
                            <div className="flex flex-col text-xs text-gray-500 py-2">
                                <strong>
                                    <span> {username} posted this • {activity.created_At}</span>
                                    <span className="block"> {username} updated this • {activity.updated_at}</span>
                                </strong>
                            </div>
                            <textarea
                                value={activity.content}
                                className=""
                            />
                        </div>
                    </li>
                </ul>
            </section>
        </>
    );
}