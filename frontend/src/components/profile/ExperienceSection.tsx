interface ExperienceSectionProps {
    experiences: string | null;
}

export default function ExperienceSection({ experiences }: ExperienceSectionProps) {
    return (
        <>
            <div className="bg-white mt-2 p-4 pl-8 rounded-lg border">
                <span className="text-xl font-semibold">Experience</span>
                <div className="pt-1">
                    {experiences ? (
                        <div className="py-2">
                            <span className="text-base">{experiences}</span>
                        </div>
                    ) : (
                        <div className="py-2 text-gray-500">
                            <strong>No experiences available.</strong>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
