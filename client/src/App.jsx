import TopBar from "./components/topbar/TopBar";
import Home from "./pages/home/Home";
import Write from "./pages/write/Write";
import Single from "./pages/single/Single";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { Context } from "./context/Context";
import MarkDown from "./pages/markDown/MarkDown";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/register/SignUp";
import About from "./pages/About/About";


function App() {
  const { user } = useContext(Context);
  return (
    <Router>
      <TopBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />

        <Route path="/register" element={user ? <Home /> : <SignUp />} />

        <Route path="/login" element={user ? <Home /> : <SignIn />} />

        <Route path="/write" element={user ? <Write /> : <SignIn />} />

        <Route path="/markdown" element={<MarkDown />} />

        <Route path="/post/:postID" element={<Single />} />
      </Routes>
      {/* <Footer /> */}
    </Router>
  );
}

export default App;
