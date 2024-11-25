import React, { useState } from "react";

interface EditModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialData: {
        name: string;
        description: string;
        profileImage: string;
        skills: string[];
        experiences: {
            id: number;
            jobTitle: string;
            company: string;
            location: string;
            duration: string;
            description: string;
        }[];
    };
}

export default function EditProfileModal({ isOpen, onClose, initialData }: EditModalProps) {
    const [profileImage, setProfileImage] = useState<File | null>(null);
    const [name, setName] = useState<string>(initialData.name);
    const [description, setDescription] = useState<string>(initialData.description);
    const [skills, setSkills] = useState<string[]>(initialData.skills);
    const [experiences, setExperiences] = useState(initialData.experiences);

    if (!isOpen) return null;

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setProfileImage(event.target.files[0]);
        }
    };

    const handleSkillChange = (index: number, value: string) => {
        const updatedSkills = [...skills];
        updatedSkills[index] = value;
        setSkills(updatedSkills);
    };

    const handleExperienceChange = (index: number, field: string, value: string) => {
        const updatedExperiences = [...experiences];
        updatedExperiences[index] = { ...updatedExperiences[index], [field]: value };
        setExperiences(updatedExperiences);
    };

    const handleAddSkill = () => {
        setSkills([...skills, ""]);
    };

    const handleDeleteSkill = (index: number) => {
        const updatedSkills = skills.filter((_, i) => i !== index);
        setSkills(updatedSkills);
    }

    const handleAddExperience = () => {
        const newExperience = {
            id: experiences.length + 1,
            jobTitle: "",
            company: "",
            location: "",
            duration: "",
            description: "",
        };
        setExperiences([...experiences, newExperience]);
    };

    const handleDeleteExperience = (index: number) => {
        const updatedExperiences = experiences.filter((_, i) => i !== index);
        setExperiences(updatedExperiences);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Profile updated:", { name, description, profileImage, skills, experiences });
        onClose();
    }

    return (
        <>
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                <div className="bg-white rounded-lg p-8 w-48 md:w-1/2 lg:w-1/2 h-auto max-h-[80vh] overflow-y-auto relative">
                    <svg 
                        className="absolute top-8 right-8 cursor-pointer h-8 w-8" 
                        xmlns="http://www.w3.org/2000/svg" 
                        height="24px" 
                        viewBox="0 0 24 24" 
                        width="24px" 
                        fill="#000000"
                        onClick={onClose}
                    >
                        <path d="M12 10.586l-4.293-4.293-1.414 1.414L10.586 12l-4.293 4.293 1.414 1.414L12 13.414l4.293 4.293 1.414-1.414L13.414 12l4.293-4.293-1.414-1.414z"/>
                    </svg>
                    <h2 className="text-xl font-bold mb-4">Edit intro</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Profile Image</label>
                            <input 
                                type="file" 
                                accept="image/*" 
                                onChange={handleImageChange} 
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2" 
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Name</label>
                            <input 
                                type="text" 
                                value={name} 
                                onChange={(e) => setName(e.target.value)} 
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2" 
                                placeholder="Your Name" 
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Description</label>
                            <input 
                                type="text" 
                                value={description} 
                                onChange={(e) => setDescription(e.target.value)} 
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2" 
                                placeholder="Your Description" 
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Skills</label>
                            {skills.map((skill, index) => (
                                <div key={index} className="relative mb-4">
                                    <input 
                                        type="text" 
                                        value={skill} 
                                        onChange={(e) => handleSkillChange(index, e.target.value)} 
                                        className="block w-full border border-gray-300 rounded-md p-2 pr-10"
                                        placeholder={`Skill ${index + 1}`} 
                                    />
                                    <svg 
                                        xmlns="http://www.w3.org/2000/svg" 
                                        height="24px" 
                                        viewBox="0 -960 960 960" 
                                        width="24px" 
                                        fill="#FF0000"
                                        className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
                                        onClick={() => handleDeleteSkill(index)}
                                    >
                                        <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
                                    </svg>
                                </div>
                            ))}
                            <button 
                                type="button" 
                                onClick={handleAddSkill} 
                                className="flex items-center border border-black rounded-2xl py-0.5 px-3 mt-2"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000">
                                    <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/>
                                </svg>
                                <span className="pl-0.5">Add Skill</span>
                            </button>
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Experiences</label>
                            {experiences.map((experience, index) => (
                                <div key={experience.id} className="relative mb-4">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="font-semibold">Experience {index + 1}</span>
                                        <svg 
                                            xmlns="http://www.w3.org/2000/svg" 
                                            className="h-6 w-6 text-red-500 cursor-pointer"
                                            viewBox="0 -960 960 960" 
                                            fill="#FF0000"
                                            onClick={() => handleDeleteExperience(index)}
                                        >
                                            <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
                                        </svg>
                                    </div>
                                    <input 
                                        type="text" 
                                        value={experience.jobTitle} 
                                        onChange={(e) => handleExperienceChange(index, 'jobTitle', e.target.value)} 
                                        className="mt-1 block w-full border border-gray-300 rounded-md p-2" 
                                        placeholder="Job Title" 
                                    />
                                    <input 
                                        type="text" 
                                        value={experience.company} 
                                        onChange={(e) => handleExperienceChange(index, 'company', e.target.value)} 
                                        className="mt-1 block w-full border border-gray-300 rounded-md p-2" 
                                        placeholder="Company" 
                                    />
                                    <input 
                                        type="text" 
                                        value={experience.location} 
                                        onChange={(e) => handleExperienceChange(index, 'location', e.target.value)} 
                                        className="mt-1 block w-full border border-gray-300 rounded-md p-2" 
                                        placeholder="Location" 
                                    />
                                    <input 
                                        type="text" 
                                        value={experience.duration} 
                                        onChange={(e) => handleExperienceChange(index, 'duration', e.target.value)} 
                                        className="mt-1 block w-full border border-gray-300 rounded-md p-2" 
                                        placeholder="Duration" 
                                    />
                                    <textarea 
                                        value={experience.description} 
                                        onChange={(e) => handleExperienceChange(index, 'description', e.target.value)} 
                                        className="mt-1 block w-full border border-gray-300 rounded-md p-2" 
                                        placeholder="Description" 
                                    />
                                </div>
                            ))}
                            <button 
                                type="button" 
                                onClick={handleAddExperience} 
                                className="flex items-center border border-black rounded-2xl py-0.5 px-3 mt-2"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000">
                                    <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/>
                                </svg>
                                <span className="pl-0.5">Add Experience</span>
                            </button>
                        </div>
                        <div className="flex justify-end">
                            <button type="button" className="mr-2 rounded-md bg-gray-300 px-4 py-2" onClick={onClose}>Cancel</button>
                            <button type="submit" className="rounded-md bg-blue-600 text-white px-4 py-2">Save</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
