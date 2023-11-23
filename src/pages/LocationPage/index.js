import React, {useEffect, useState} from "react";
import PageHeader from "../../components/PageHeader/PageHeader";
import LocationForm from "./LocationForm";
import {Button} from "@mui/material";
import Swal from 'sweetalert2'
import axios from '../../services/axiosConfig'
import LocationTable from "./LocationTable";
import DeviceForm from "./DeviceForm";

const LocationPage = () => {
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
        console.log('Location form submitted with values:', values);

        const locationData = {
            serial_number: values.serialNumber,
            name: values.name,
            ip_address: values.ipAddress,
            devices: values.devices,
        }

        axios.post('/locations', locationData)
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            });
    };

    useEffect(() => {
        // fetch all devices here
        axios.get('/devices')
            .then(response => {
                console.log(response);
                setDevices(response.data.data);
            })
            .catch(error => {
                console.log(error);
            });

        // fetch all locations here
        axios.get('/locations')
            .then(response => {
                console.log(response);
                setLocations(response.data.data);
            })
            .catch(error => {
                console.log(error);
            });
    },[]);

    const handleAddDevice = (value) => {
        console.log('Device form submitted with values:', value);
        console.log('Selected location:', selectedLocation);

        axios.post('/locations/add-devices', {devices:value.devices, location_id: selectedLocation})
            .then(response => {
                setLocations(response.data.data);
            })
            .catch(error => {
                console.log(error);
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
            <PageHeader title="Location"/>
            <Button variant="contained" color="primary" onClick={handleLocationFormOpen}>
                Open Location Form
            </Button>
            <LocationForm
                open={isLocationFormOpen}
                devices={devices}
                onClose={handleLocationFormClose}
                onSubmit={handleLocationFormSubmit}
            />
            <div>
                <LocationTable
                    locations={locations}
                    onAddDevice={handleAddDevice}
                    onRemoveDevice={handleRemoveDevice}
                    handleDeviceFormOpen={handleDeviceFormOpen}
                />
            </div>
            <DeviceForm
                open={isLocationDeviceOpen}
                devices={devices}
                onClose={handleDeviceFormClose}
                onSubmit={handleAddDevice}
            />
        </div>
    )
}

export default LocationPage;