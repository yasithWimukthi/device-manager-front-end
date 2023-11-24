import React from 'react'
import {BsFillGrid3X3GapFill} from 'react-icons/bs';
import { PiButterflyFill } from "react-icons/pi";
import { IoLocationOutline } from "react-icons/io5";
import { MdDevices } from "react-icons/md";
import {NavLink} from "react-router-dom";
import './Sidebar.css';

const Sidebar = ({openSidebarToggle, OpenSidebar}) =>{
    return (
        <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive": ""}>
            <div className='sidebar-title'>
                <div className='sidebar-brand'>
                    <PiButterflyFill  className='icon_header'/> Layout Index
                </div>
                <span className='icon close_icon' onClick={OpenSidebar}>X</span>
            </div>

            <ul className='sidebar-list'>
                <li className='sidebar-list-item'>
                    <NavLink to="/">
                        <MdDevices className='icon'/> Device
                    </NavLink>
                </li>
                <li className='sidebar-list-item'>
                    <NavLink to="/location">
                        <IoLocationOutline className='icon'/> Location
                    </NavLink>
                </li>
                <li className='sidebar-list-item'>
                    <NavLink to="/organization">
                        <BsFillGrid3X3GapFill className='icon'/> Organization
                    </NavLink>
                </li>
            </ul>
        </aside>
    )
}

export default Sidebar