import { useState } from "react";
import EditProfileModal from "./EditProfileModal";
import { ProfileData } from "../../pages/Profile";

interface ProfileDataProps{
    data: ProfileData;
}

export default function ProfileSection({ data }: ProfileDataProps) {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleEditProfileClick = () => {
        setIsModalOpen(true);
    }

    const handleCloseModal = () => {
        setIsModalOpen(false);
    }

    return (
        <>
            <section className="relative flex flex-col rounded-lg mb-4 border bg-white overflow-hidden pb-4" >
                <div>
                    <img 
                        src="/bg-image-profile.png"
                        alt="Profile Background" 
                        className="w-full h-48 object-cover sticky"
                    />
                    <img
                        src={data.profile_photo ? data.profile_photo : "/perry-casino.webp"}
                        alt="Profile" 
                        className="w-40 h-40 rounded-full border-4 border-white relative left-8"
                        style={{ marginTop: '-110px' }}
                    />
                    <svg className="absolute top-52 right-6 cursor-pointer" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"
                        onClick={handleEditProfileClick} >
                        <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/>
                    </svg>
                </div>
                <div className="ml-4 p-4">
                    <h1 className="text-2xl font-bold">{data.name}</h1>
                    <p className="text-gray-500">{data.connection_count} connections</p>
                </div>
                <div className="ml-4 h-12 pt-2 text-base pl-4">
                    {/* <button className="rounded-2xl py-1 px-3 font-semibold"
                        style={{ backgroundColor: 'rgb(10, 102, 194)' }}>
                        <span className="px-3 py-3 text-white">Sign in to connect</span>
                    </button>
                    <button className="rounded-2xl py-1 px-3 font-semibold"
                        style={{ backgroundColor: 'rgb(10, 102, 194)' }}>
                        <span className="px-3 py-3 text-white">Connect</span>
                    </button>
                    <button className="rounded-2xl py-1 px-3 font-semibold"
                        style={{ backgroundColor: 'rgb(10, 102, 194)' }}>
                        <span className="px-3 py-3 text-white">Unconnect</span>
                    </button> */}
                    <button className="rounded-2xl py-1 px-3 font-semibold"
                        style={{ backgroundColor: 'rgb(10, 102, 194)' }} onClick={handleEditProfileClick}>
                        <span className="px-3 py-3 text-white">Edit profile</span>
                    </button>
                    {/* <button className="border border-[rgb(10,102,194)] rounded-2xl py-1 px-3 ml-4 font-semibold text-[rgb(10,102,194)]">
                        <span className="px-3 py-3">Message</span>
                    </button> */}
                </div>
            </section>

            <EditProfileModal 
                isOpen={isModalOpen} 
                onClose={handleCloseModal} 
                initialData={data}
            />
        </>
    );
}