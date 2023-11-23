import React, {useEffect, useState} from "react";
import PageHeader from "../../components/PageHeader/PageHeader";
import LocationForm from "./LocationForm";
import {Button} from "@mui/material";
import axios from '../../services/axiosConfig';

const LocationPage = () => {
    const [isLocationFormOpen, setIsLocationFormOpen] = useState(false);
    const [devices, setDevices] = useState([]);

    const handleLocationFormOpen = () => {
        setIsLocationFormOpen(true);
    };

    const handleLocationFormClose = () => {
        setIsLocationFormOpen(false);
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
    }, []);

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
        </div>
    )
}

export default LocationPage;