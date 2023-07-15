import { Route,Routes, BrowserRouter} from "react-router-dom";
import Signin from "./Components/Signin";
import Register from "./Components/Register";
import Home from "./Components/Home";
import AppliedJobs from "./Components/AppliedJobs";
import ApplicationResult from "./Components/ApplicationResult";
import AdminHome from "./AdminComponents/AdminHome";
import AddJobs from "./AdminComponents/AddJobs";
import ShowAllJobs from './AdminComponents/ShowAllJobs'
import UserInfo from "./Components/UserInfo";
import UserDetail from "./AdminComponents/UserDetal";
function App() {
  return (
   <BrowserRouter>
    <Routes>
        <Route path="/" element={<Signin/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/userHome" element={<Home/>}/>
        <Route path="/appliedJobs" element={<AppliedJobs/>}/>
        <Route path="/applicationResult" element={<ApplicationResult/>}/>
        <Route path="/adminHome" element={<AdminHome/>}/>
        <Route path="/addJobs" element={<AddJobs/>}/>
        <Route path="/showalljobs" element={<ShowAllJobs/>}/>
        <Route path="/userInfo" element={<UserInfo/>}/>
        <Route path="/admin/user/details/:email" element={<UserDetail/>}/>
    </Routes>
   
   </BrowserRouter>
  );
}

export default App;
