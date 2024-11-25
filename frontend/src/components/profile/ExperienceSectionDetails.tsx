import { Experience } from "./ExperienceSection";

interface ExperienceSectionDetailsProps {
    experience: Experience;
}

export default function ExperienceSectionDetails({ experience }: ExperienceSectionDetailsProps) {
    return(
        <>
            <div className="flex flex-col">
                <span className="text-base font-semibold">{experience.jobTitle}</span>
                <span className="text-sm text-gray-600">{experience.company} - {experience.location}</span>
                <span className="text-sm text-gray-500">{experience.duration}</span>
                <p className="text-sm text-gray-700 mt-1">{experience.description}</p>
            </div>
        </>
    );
}