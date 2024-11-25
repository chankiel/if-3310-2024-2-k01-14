import { useNavigate } from "react-router-dom";

interface SkillsSectionProps {
    skills: string[];
}

export default function SkillsSection({ skills }: SkillsSectionProps) {

    const navigate = useNavigate();

    return (
        <>
            <section className="bg-white mt-2 p-4 pl-8">
                <span className="text-xl font-semibold">Skills</span>
                <ul className="pt-1">
                    {skills.slice(0, 5).map((skill, index) => (
                        <li key = {index} className={index < skills.length - 1 ? "border-b border-gray-300" : ""}>
                            <span className="text-base w-full flex flex-row font-semibold py-2">{skill}</span>
                        </li>
                    ))}
                </ul>
                {skills.length > 3 && (
                    <div className="mt-2 cursor-pointer flex items-center justify-center" onClick={() => navigate("./details/skills", { state: {skills} })}>
                        <span className="mr-2">Show all {skills.length} experiences</span>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000">
                            <path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z"/>
                        </svg>
                    </div>
                )}
            </section>
        </>
    );
}