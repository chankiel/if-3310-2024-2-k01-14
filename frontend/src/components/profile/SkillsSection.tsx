interface SkillsSectionProps {
    skills: string;
}

export default function SkillsSection({ skills }: SkillsSectionProps) {
    return (
        <>
            <section className="bg-white mt-2 p-4 pl-8">
                <span className="text-xl font-semibold">Skills</span>
                <ul className="pt-1">
                    {/* {skills.slice(0, 5).map((skill, index) => (
                        <li key = {index} className={index < skills.length - 1 ? "border-b border-gray-300" : ""}>
                            <span className="text-base w-full flex flex-row font-semibold py-2">{skill}</span>
                        </li>
                    ))} */}
                    <li>
                        <span className="text-base w-full flex flex-row font-semibold py-2">{skills}</span>
                    </li>
                </ul>
            </section>
        </>
    );
}