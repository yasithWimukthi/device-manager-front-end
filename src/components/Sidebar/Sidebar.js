import React from 'react'
import
{ BsGrid1X2Fill, BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill,
    BsListCheck, BsMenuButtonWideFill, BsFillGearFill}
    from 'react-icons/bs'
import { PiButterflyFill } from "react-icons/pi";
import { MdDevices } from "react-icons/md";

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
                    <a href="">
                        <MdDevices className='icon'/> Device
                    </a>
                </li>
                <li className='sidebar-list-item'>
                    <a href="">
                        <BsFillArchiveFill className='icon'/> Products
                    </a>
                </li>
                <li className='sidebar-list-item'>
                    <a href="">
                        <BsFillGrid3X3GapFill className='icon'/> Categories
                    </a>
                </li>
                <li className='sidebar-list-item'>
                    <a href="">
                        <BsPeopleFill className='icon'/> Customers
                    </a>
                </li>
                <li className='sidebar-list-item'>
                    <a href="">
                        <BsListCheck className='icon'/> Inventory
                    </a>
                </li>
                <li className='sidebar-list-item'>
                    <a href="">
                        <BsMenuButtonWideFill className='icon'/> Reports
                    </a>
                </li>
                <li className='sidebar-list-item'>
                    <a href="">
                        <BsFillGearFill className='icon'/> Setting
                    </a>
                </li>
            </ul>
        </aside>
    )
}

export default Sidebar