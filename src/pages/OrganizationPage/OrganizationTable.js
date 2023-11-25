import React from 'react';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from '@mui/material';
import Chip from '@mui/material/Chip';

const OrganizationTable = ({organizations, onAddDevice, onRemoveDevice, handleDeviceFormOpen}) => {
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Organization Code</TableCell>
                        <TableCell>Organization Name</TableCell>
                        <TableCell>Locations and Devices</TableCell>
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
                                            {location.name}
                                            {location.devices.length > 0 && (
                                                <div>
                                                    {location.devices.map((device) => (
                                                         <Chip key={device.id} label={device.number}/>
                                                    ))}
                                                </div>
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
