interface SkillsSectionProps {
    skills: string | null;
}

export default function SkillsSection({ skills }: SkillsSectionProps) {
    return (
        <>
            <section className="bg-white mt-2 p-4 pl-8 rounded-lg border">
                <span className="text-xl font-semibold">Skills</span>
                <div className="pt-1">
                    {skills ? (
                        <div className="py-2">
                            {skills}
                        </div>
                    ) : (
                        <div className="py-2 text-gray-500">
                            <strong>No skills available.</strong>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}