import {useState} from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import './App.css';
import DevicePage from "./pages/DevicePage";
import LocationPage from "./pages/LocationPage";

function App() {
    const [openSidebarToggle, setOpenSidebarToggle] = useState(false)
    const OpenSidebar = () => {
        setOpenSidebarToggle(!openSidebarToggle)
    }

    return (
        <div className='grid-container'>
            <Router>
                <Header OpenSidebar={OpenSidebar}/>
                <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
                <Routes>
                    <Route path="/" element={<DevicePage />} />
                    <Route path="/location" element={<LocationPage />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
