import { useParams } from "react-router-dom"

export default function Profile() {
    
    const { username } = useParams<{ username: string }>();
    
    return (
        <>
            <div className="bg-custom-bg-color min-h-screen">
                <h1>User Profile</h1>
                <p>Username: {username}</p>
            </div>  
        </>
    )
}