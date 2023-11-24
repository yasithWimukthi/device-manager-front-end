import {useState} from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import './App.css';
import DevicePage from "./pages/DevicePage";
import LocationPage from "./pages/LocationPage";
import OrganizationPage from "./pages/OrganizationPage";

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
                    <Route path="/organization" element={<OrganizationPage />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
