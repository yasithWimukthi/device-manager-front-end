import React, {useEffect, useState} from "react";
import PageHeader from "../../components/PageHeader/PageHeader";
import {Button} from "@mui/material";
import Swal from 'sweetalert2';
import axios from '../../services/axiosConfig'
import AddIcon from '@mui/icons-material/Add';
import OrganizationForm from "./OrganizationForm";
import OrganizationTable from "./OrganizationTable";


const OrganizationPage = () => {
    const [isOrganizationFormOpen, setIsOrganizationFormOpen] = useState(false);
    const [isLocationDeviceOpen, setIsDeviceFormOpen] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState(null); // [1
    const [locations, setLocations] = useState([]);
    const [organizations, setOrganizations] = useState([]);

    const handleOrganizationFormOpen = () => {
        setIsOrganizationFormOpen(true);
    };

    const handleOrganizationFormClose = () => {
        setIsOrganizationFormOpen(false);
    };

    const handleDeviceFormOpen = (locationId) => {
        setIsDeviceFormOpen(true);
        setSelectedLocation(locationId);
    };

    const handleDeviceFormClose = () => {
        setIsDeviceFormOpen(false);
    };
    const handleOrganizationFormSubmit = (values,formik) => {
        axios.post('/organizations', values)
            .then(response => {
                setOrganizations(response.data.data);
                Swal.fire({
                    icon: "success",
                    title: "Organization added successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
                formik.resetForm();
            })
            .catch(error => {
                console.log(error);
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: error.response.data.data,
                });
            });
    };

    useEffect(() => {
        // fetch all organizations here
        axios.get('/organizations')
            .then(response => {
                setOrganizations(response.data.data);
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
                setOrganizations(response.data.data);
                Swal.fire({
                    icon: "success",
                    title: "Device added successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
            })
            .catch(error => {
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
                        setOrganizations(response.data.data);
                    })
                    .catch(error => {
                        Swal.fire({
                            icon: "error",
                            title: "Oops...",
                            text: "Something went wrong!",
                        });
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
                <Button variant="contained" color="primary" onClick={handleOrganizationFormOpen} endIcon={<AddIcon/>}>
                    Open Organization Form
                </Button>
            </div>
            <OrganizationForm
                open={isOrganizationFormOpen}
                locations={locations}
                onClose={handleOrganizationFormClose}
                onSubmit={handleOrganizationFormSubmit}
            />
            <div>
                <OrganizationTable
                    organizations={organizations}
                    onAddDevice={handleAddDevice}
                    onRemoveDevice={handleRemoveDevice}
                    handleDeviceFormOpen={handleDeviceFormOpen}
                />
            </div>
        </div>
    )
}

export default OrganizationPage;