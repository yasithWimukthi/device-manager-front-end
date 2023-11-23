import React from 'react';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    Button,
    Box,
    Chip,
    MenuItem,
    FormControl,
    InputLabel, Select
} from '@mui/material';

const validationSchema = Yup.object({
    devices: Yup.array().required('At least one device is required').min(1, 'At least one device is required').max(10, 'Maximum 10 devices allowed'),
});

const DeviceForm = ({open, devices, onClose, onSubmit}) => {
    const formik = useFormik({
        initialValues: {
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
            <DialogTitle>Add Device</DialogTitle>
            <DialogContent>
                <form onSubmit={formik.handleSubmit} style={{width:'300px'}}>
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
                                        <Chip key={value} label={value} style={{margin: 2}}/>
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

                    <Box mt={2}>
                        <Button variant="contained" color="primary" type="submit">
                            Add Device
                        </Button>
                    </Box>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default DeviceForm;