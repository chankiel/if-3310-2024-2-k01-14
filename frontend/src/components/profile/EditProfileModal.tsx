import React, { useState } from "react";
import { ProfileData } from "../../pages/Profile";

interface EditModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialData: ProfileData;
}

export default function EditProfileModal({ isOpen, onClose, initialData }: EditModalProps) {
    const [profileImage, setProfileImage] = useState<File | null>(null);
    const [name, setName] = useState(initialData.name);
    const [skills, setSkills] = useState(initialData.skills);
    const [experiences, setExperiences] = useState(initialData.work_history);

    if (!isOpen) return null;

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setProfileImage(event.target.files[0]);
        }
    };

    const handleSkillChange = (value: string) => {
        setSkills(value);
    };

    const handleExperienceChange = (value: string) => {
        setExperiences(value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Profile updated:", { name, profileImage, skills, experiences });
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
                            <label className="block text-sm font-medium text-gray-700">Skills</label>
                            <div className="relative mb-4">
                                <input 
                                    type="text" 
                                    value={skills ? skills : ""} 
                                    onChange={(e) => handleSkillChange(e.target.value)} 
                                    className="block w-full border border-gray-300 rounded-md p-2 pr-10"
                                    placeholder="Your skills" 
                                />
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Experiences</label>
                            <div className="relative mb-4">
                                <textarea 
                                    value={experiences ? experiences : ""} 
                                    onChange={(e) => handleExperienceChange(e.target.value)} 
                                    className="mt-1 block w-full border border-gray-300 rounded-md p-2" 
                                    placeholder="Description" 
                                    rows={5}
                                />
                            </div>
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
