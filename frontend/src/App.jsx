import UserLogin from "./pages/UserLogin"
import { Route, Routes } from "react-router-dom";
import UserRegister from "./pages/UserRegister";  
import Notes from "./pages/Notes";
import EditNotePage from "./pages/EditNotePage";
import Home from "./pages/Home";
import TrashNotes from "./pages/TrashNotes";
import SingleNotePage from "./pages/SingleNotePage";


function App() {
 

  return (
    <>
     <Routes>
      <Route path="/note" element={<Notes/>} />
      <Route path="/note/:id" element={<SingleNotePage/> }/>
      <Route path="/" element={<Home/>} />
      <Route path="/trash" element={<TrashNotes/>} />
      <Route path="/login" element={<UserLogin />} />
      <Route path="/register" element={<UserRegister />} />
      <Route path="/edit/:id" element={<EditNotePage/>} />
    
     </Routes>
    </>
  )
}

export default App
