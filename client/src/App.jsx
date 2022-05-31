import Navigation from "./Components/Navigation/Navigation";
import Signup from "./Components/Authentication/Signup";
import Login from "./Components/Authentication/Login";
import Home from "./Components/Pages/Home";
import EditProfile from "./Components/Pages/EditProfile";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/editprofile" exact element={<EditProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
