import React, { useState } from "react";
import { ProfileData } from "../../pages/Profile";
import { API_URL } from "../../constant";

interface EditModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialData: ProfileData;
    user_id: number;
    onUpdate: (updatedData: ProfileData) => void;
}

export default function EditProfileModal({ isOpen, onClose, initialData, user_id, onUpdate }: EditModalProps) {
    const [username, setUsername] = useState(initialData.username);
    const [profileImage, setProfileImage] = useState<File | null>(null);
    const [name, setName] = useState(initialData.full_name);
    const [experiences, setExperiences] = useState(initialData.work_history);
    const [skills, setSkills] = useState(initialData.skills);
    const [errorMessage, setErrorMessage] = useState<string | null>();

    if (!isOpen) return null;

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setProfileImage(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage(null);

        const formData = new FormData();
        formData.append("username", username);
        if (profileImage) {
            formData.append("profile_photo", profileImage);
        }

        formData.append("name", name);
        formData.append("work_history", experiences ?? "");
        formData.append("skills", skills ?? "");

        try {

            for (let [key, value] of formData.entries()) {
                console.log(key, value);
            }
            const response = await fetch(`${API_URL}/profile/${user_id}`, {
                method: "PUT",
                body: formData,
            });

            const data = await response.json();

            console.log("Message: ", data.message)

            if (!response.ok) {
                setErrorMessage(data.message);
                return;
            }

            onUpdate({
                ...initialData,
                username: data.username || username,
                full_name: data.full_name || name,
                work_history: data.work_history || experiences,
                skills: data.skills || skills,
                profile_photo: data.body.profile_photo
            });

            onClose();
        } catch (error) {
            console.error("Error updating profile:", error);
            setErrorMessage("An unexpected error occurred. Please try again.");
        }
    }

    return (
        <>
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                <div className="bg-white rounded-lg p-8 w-full max-w-md md:max-w-1/2 lg:max-w-1/2 h-auto max-h-[80vh] overflow-y-auto relative">
                    <svg
                        className="absolute top-8 right-8 cursor-pointer h-8 w-8"
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 0 24 24"
                        width="24px"
                        fill="#000000"
                        onClick={onClose}
                    >
                        <path d="M12 10.586l-4.293-4.293-1.414 1.414L10.586 12l-4.293 4.293 1.414 1.414L12 13.414l4.293 4.293 1.414-1.414L13.414 12l4.293-4.293-1.414-1.414z" />
                    </svg>
                    <h2 className="text-xl font-bold mb-4">Edit intro</h2>
                    {errorMessage && <div className="mb-4 text-red-600">{errorMessage}</div>}
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
                            <label className="block text-sm font-medium text-gray-700">Username</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                placeholder="Your Username"
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
                                    onChange={(e) => setSkills(e.target.value)}
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
                                    onChange={(e) => setExperiences(e.target.value)}
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
