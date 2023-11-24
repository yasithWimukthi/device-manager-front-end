import React from 'react';
import { TbDeviceIpadHorizontalPlus } from "react-icons/tb";
import { IoLocationSharp } from "react-icons/io5";
import { FaBuilding } from "react-icons/fa6";
import './PageHeader.css';
const PageHeader = ({title}) => {

    const displayIcon = () => {
        switch (title) {
            case 'Add Device':
                return <TbDeviceIpadHorizontalPlus className="page-header-icon"/>
            case 'Location':
                return <IoLocationSharp className="page-header-icon"/>
            case 'Organization':
                return <FaBuilding className="page-header-icon"/>
            default:
                return <FaBuilding className="page-header-icon"/>
        }
    }

    return (
        <div className='page-header'>
            {displayIcon()}
            <h1 className='page-header-title'>{title}</h1>
        </div>
    )
}

export default PageHeader;