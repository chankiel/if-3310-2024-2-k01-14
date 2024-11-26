import Feed from "./Feed";
import Login from "./Login";
import NotFound from "./NotFound";
import Profile from "./Profile";
import Register from "./Register/Register";
import Connection from "./Connection";
import Requests from "./Request";
import Users from "./Users";

export{
    Users,
    Feed,
    Login,
    NotFound,
    Profile,
    Register,
    Connection,
    Requests
};


//       <Router>
//       {/* user={{ role: "jobseeker",nama:"kiel" }} */}
//         <Navbar/>
//         <Routes>
//             <Route path="/feed" element={<Feed />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="/register" element={<Register />} />
//             <Route path="/profile/:username" element={<Profile />} />
//             <Route path="*" element={<NotFound />}/>
//             <Route ></Route>
//           </Routes>
//       </Router>