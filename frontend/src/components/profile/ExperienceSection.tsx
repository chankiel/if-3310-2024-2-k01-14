import ExperienceSectionDetails from "./ExperienceSectionDetails";

export interface Experience {
    id: number;
    jobTitle: string;
    company: string;
    location: string;
    duration: string;
    description: string;
}

interface ExperienceSectionProps {
    experiences: string
}

export default function ExperienceSection({ experiences }: ExperienceSectionProps) {
    return(
        <>
            <section className="bg-white mt-2 p-4 pl-8 rounded-lg border">
                <span className="text-xl font-semibold">Experience</span>
                <ul className="pt-1">
                        <li className="py-2">
                            <ExperienceSectionDetails experience={experiences}/>
                        </li>
                </ul>
                {/* {experiences.length > 3 && (
                    <div className="mt-2 cursor-pointer flex items-center justify-center" onClick={() => navigate("./details/experiences")}>
                        <span className="mr-2">Show all {experiences.length} experiences</span>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000">
                            <path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z"/>
                        </svg>
                    </div>
                )} */}
            </section>
        </>
    );
}