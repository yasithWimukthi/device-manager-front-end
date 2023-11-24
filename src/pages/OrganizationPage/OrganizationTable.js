import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';


const OrganizationTable = ({organizations, onAddDevice, onRemoveDevice, handleDeviceFormOpen}) => {
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Organization Code</TableCell>
                        <TableCell>Organization Name</TableCell>
                        <TableCell>Locations</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {organizations.map((organization) => (
                        <TableRow key={organization.id}>
                            <TableCell>{organization.code}</TableCell>
                            <TableCell>{organization.name}</TableCell>
                            <TableCell>
                                <ul>
                                    {organization.locations.map((location) => (
                                        <li key={location.id}>
                                            {location.name} (Serial Number: {location.serial_number})
                                            {location.devices.length > 0 && (
                                                <ul>
                                                    {location.devices.map((device) => (
                                                        <li key={device.id}>
                                                            Device Number: {device.number}, Type: {device.type}
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default OrganizationTable;
