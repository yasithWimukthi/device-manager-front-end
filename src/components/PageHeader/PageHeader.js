import React from 'react';
import { TbDeviceIpadHorizontalPlus } from "react-icons/tb";
import './PageHeader.css';
const PageHeader = ({title}) => {

    const displayIcon = () => {
        switch (title) {
            case 'Add Device':
                return <TbDeviceIpadHorizontalPlus className="page-header-icon"/>
            case 'Edit Device':
                return <i className="fas fa-edit"></i>
            default:
                return <i className="fas fa-plus-circle"></i>
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