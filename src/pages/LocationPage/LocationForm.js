import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    Button,
    Box,
    Chip,
    MenuItem,
    FormControl,
    InputLabel, Select
} from '@mui/material';

const validationSchema = Yup.object({
    serialNumber: Yup.string().required('Unique serial number is required.'),
    name: Yup.string().required('Name is required.'),
    ipAddress: Yup.string().required('IP address is required.').matches(
        /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/,
        'Invalid IPv4 address'
    ),
    devices: Yup.array().required('At least one device is required').min(1, 'At least one device is required').max(10, 'Maximum 10 devices allowed'),
});

const LocationForm = ({ open, devices, onClose, onSubmit }) => {
    const formik = useFormik({
        initialValues: {
            serialNumber: '',
            name: '',
            ipAddress: '',
            devices: [],
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            onSubmit(values,formik);
            onClose();
        },
    });

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Create Location</DialogTitle>
            <DialogContent>
                <form onSubmit={formik.handleSubmit}>
                    <TextField
                        fullWidth
                        id="serialNumber"
                        name="serialNumber"
                        label="Serial Number"
                        value={formik.values.serialNumber}
                        onChange={formik.handleChange}
                        error={formik.touched.serialNumber && Boolean(formik.errors.serialNumber)}
                        helperText={formik.touched.serialNumber && formik.errors.serialNumber}
                        margin="normal"
                    />

                    <TextField
                        fullWidth
                        id="name"
                        name="name"
                        label="Name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        error={formik.touched.name && Boolean(formik.errors.name)}
                        helperText={formik.touched.name && formik.errors.name}
                        margin="normal"
                    />

                    <TextField
                        fullWidth
                        id="ipAddress"
                        name="ipAddress"
                        label="IPv4 Address"
                        value={formik.values.ipAddress}
                        onChange={formik.handleChange}
                        error={formik.touched.ipAddress && Boolean(formik.errors.ipAddress)}
                        helperText={formik.touched.ipAddress && formik.errors.ipAddress}
                        margin="normal"
                    />

                    <FormControl fullWidth margin="normal">
                        <InputLabel id="devices-label">Devices</InputLabel>
                        <Select
                            labelId="devices-label"
                            id="devices"
                            name="devices"
                            multiple
                            value={formik.values.devices}
                            onChange={formik.handleChange}
                            error={formik.touched.devices && Boolean(formik.errors.devices)}
                            renderValue={(selected) => (
                                <Box display="flex" flexWrap="wrap">
                                    {selected.map((value) => (
                                        <Chip key={value} label={value} style={{ margin: 2 }} />
                                    ))}
                                </Box>
                            )}
                        >
                            {devices.map((device) => (
                                <MenuItem key={device.number} value={device.id}>
                                    {device.number}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <p className="image-error">{formik.touched.devices && Boolean(formik.errors.devices) ? formik.errors.devices : null}</p>

                    <Box mt={2}>
                        <Button variant="contained" color="primary" type="submit">
                            Create
                        </Button>
                    </Box>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default LocationForm;