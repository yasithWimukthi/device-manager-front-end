import React, {useEffect, useState} from "react";
import PageHeader from "../../components/PageHeader/PageHeader";
import {Button} from "@mui/material";
import Swal from 'sweetalert2';
import axios from '../../services/axiosConfig'
import AddIcon from '@mui/icons-material/Add';


const OrganizationPage = () => {
    const [isLocationFormOpen, setIsLocationFormOpen] = useState(false);
    const [isLocationDeviceOpen, setIsDeviceFormOpen] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState(null); // [1
    const [devices, setDevices] = useState([]);
    const [locations, setLocations] = useState([]);

    const handleLocationFormOpen = () => {
        setIsLocationFormOpen(true);
    };

    const handleLocationFormClose = () => {
        setIsLocationFormOpen(false);
    };

    const handleDeviceFormOpen = (locationId) => {
        setIsDeviceFormOpen(true);
        setSelectedLocation(locationId);
    };

    const handleDeviceFormClose = () => {
        setIsDeviceFormOpen(false);
    };
    const handleLocationFormSubmit = (values) => {
        // Handle form submission logic here
        const locationData = {
            serial_number: values.serialNumber,
            name: values.name,
            ip_address: values.ipAddress,
            devices: values.devices,
        }

        axios.post('/locations', locationData)
            .then(response => {
                setLocations(response.data.data);
                Swal.fire({
                    icon: "success",
                    title: "Location added successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
            })
            .catch(error => {
                console.log(error);
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong!",
                });
            });
    };

    useEffect(() => {
        // fetch all devices here
        axios.get('/devices')
            .then(response => {
                setDevices(response.data.data);
            })
            .catch(error => {
                console.log(error);
            });

        // fetch all locations here
        axios.get('/locations')
            .then(response => {
                setLocations(response.data.data);
            })
            .catch(error => {
                console.log(error);
            });
    },[]);

    const handleAddDevice = (value,formik) => {
        axios.post('/locations/add-devices', {devices:value.devices, location_id: selectedLocation})
            .then(response => {
                formik.resetForm();
                setLocations(response.data.data);
                Swal.fire({
                    icon: "success",
                    title: "Device added successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
            })
            .catch(error => {
                console.log(error);
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong!",
                });
            });
    };

    const handleRemoveDevice = (deviceId) => {
        Swal.fire({
            title: "Do you want to remove the device?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Remove",
            denyButtonText: `Don't remove`
        }).then((result) => {
            if (result.isConfirmed) {
                axios.post('/devices/detach', {device_id: deviceId})
                    .then(response => {
                        setLocations(response.data.data);
                    })
                    .catch(error => {
                        console.log(error);
                    });
            } else if (result.isDenied) {
                Swal.fire("Changes are not saved", "", "info");
            }
        });
    };

    return (
        <div>
            <PageHeader title="Organization"/>
            <div style={{display:"flex",justifyContent:'flex-end',margin:'30px'}}>
                <Button variant="contained" color="primary" onClick={handleLocationFormOpen} endIcon={<AddIcon/>}>
                    Open Organization Form
                </Button>
            </div>
            {/*<LocationForm*/}
            {/*    open={isLocationFormOpen}*/}
            {/*    devices={devices}*/}
            {/*    onClose={handleLocationFormClose}*/}
            {/*    onSubmit={handleLocationFormSubmit}*/}
            {/*/>*/}
            {/*<div>*/}
            {/*    <LocationTable*/}
            {/*        locations={locations}*/}
            {/*        onAddDevice={handleAddDevice}*/}
            {/*        onRemoveDevice={handleRemoveDevice}*/}
            {/*        handleDeviceFormOpen={handleDeviceFormOpen}*/}
            {/*    />*/}
            {/*</div>*/}
            {/*<DeviceForm*/}
            {/*    open={isLocationDeviceOpen}*/}
            {/*    devices={devices}*/}
            {/*    onClose={handleDeviceFormClose}*/}
            {/*    onSubmit={handleAddDevice}*/}
            {/*/>*/}
        </div>
    )
}

export default OrganizationPage;