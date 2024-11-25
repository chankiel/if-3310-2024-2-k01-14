import { useLocation } from "react-router-dom";

interface LocationState {
    skills: string[];
}

export default function SkillDetails() {
    const location = useLocation();
    const { skills } = location.state as LocationState;

    return (
        <div className="bg-custom-bg-color min-h-screen">
            <div className="flex flex-row md:flex-row p-12 justify-center max-w-3xl bg-white">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000">
                    <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z"/>
                </svg>
                <h1 className="text-xl font-bold">Skill Details</h1>
                <div>
                    <ul>
                        {skills.map((skill: string, index: number) => (
                            <li key={index} className="py-2">{skill}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
