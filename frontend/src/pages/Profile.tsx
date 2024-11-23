import { useParams } from "react-router-dom"

export default function Profile() {
    
    const { username } = useParams<{ username: string }>();
    
    return (
        <>
            <div className="text-blue-600 text-3xl">
                <h1>User Profile</h1>
                <p>Username: {username}</p>
            </div>  
        </>
    )
}