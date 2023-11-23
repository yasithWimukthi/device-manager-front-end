import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Button,
} from '@mui/material';
import Chip from '@mui/material/Chip';
import DeleteIcon from '@mui/icons-material/Delete';

const LocationTable = ({ locations, onAddDevice, onRemoveDevice, handleDeviceFormOpen }) => {
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Serial Number</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>IP Address</TableCell>
                        <TableCell>Devices</TableCell>
                        <TableCell>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {locations.map((location) => (
                        <TableRow key={location.id}>
                            <TableCell>{location.serial_number}</TableCell>
                            <TableCell>{location.name}</TableCell>
                            <TableCell>{location.ip_address}</TableCell>
                            <TableCell>
                                    {location.devices && location.devices.length > 0 && location.devices.map((device) => (
                                        <Chip key={device.id} label={device.number} onDelete={() => onRemoveDevice (device.id)} />
                                    ))}
                            </TableCell>
                            <TableCell>
                                <IconButton
                                    onClick={() => console.log(location.id)}
                                    color="primary"
                                    aria-label="remove location"
                                >
                                    <DeleteIcon />
                                </IconButton>
                                <Button variant="outlined" onClick={() => handleDeviceFormOpen(location.id)}>
                                    Add Device
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default LocationTable;
