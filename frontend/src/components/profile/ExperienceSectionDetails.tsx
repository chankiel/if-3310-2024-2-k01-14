import { Experience } from "./ExperienceSection";

interface ExperienceSectionDetailsProps {
    experience: string;
}

export default function ExperienceSectionDetails({ experience }: ExperienceSectionDetailsProps) {
    return(
        <>
            <div className="flex flex-col">
                <span className="text-base font-semibold">{experience}</span>
            </div>
        </>
    );
}