import { useNavigate } from "react-router-dom";
import ActivitySectionDetails from "./ActivitySectionDeatails";

export interface Activity {
    name: string;
    time: string;
    description: string;
}

interface ActivitySectionProps {
    activities: Activity[];
}

export default function ActivitySection({ activities }: ActivitySectionProps) {

    const navigate = useNavigate();

    return (
        <>
            <section className="bg-white mt-2 p-4 pl-8">
                <span className="text-xl font-semibold">Activity</span>
                <ul className="pt-1">
                    {activities.slice(0, 3).map((activity, index) => (
                        <li className={index < activities.length - 1 ? "py-4 border-b border-gray-300" : "py-2"}>
                            <ActivitySectionDetails key={index} activity={activity} />
                        </li>
                    ))}
                </ul>
                {activities.length > 3 && (
                    <div className="mt-2 cursor-pointer flex items-center justify-center" onClick={() => navigate("./details/activities")}>
                        <span className="mr-2">Show all {activities.length} activities</span>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000">
                            <path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z"/>
                        </svg>
                    </div>
                )}
            </section>
        </>
    );
}