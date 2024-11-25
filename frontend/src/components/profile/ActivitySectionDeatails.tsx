import { Activity } from "./ActivitySection";

interface ActivitySectionDetailsProps {
    activity: Activity;
}

export default function ActivitySectionDetails({ activity }: ActivitySectionDetailsProps) {
    return (
        <>
            <div className="flex flex-col">
                <div className="text-xs text-gray-500 py-2">
                    <strong>{activity.name}</strong>
                    <span> posted this • {activity.time}</span>
                    
                </div>
                <div className="">
                    {activity.description}
                </div>
            </div>
        </>
    );
}