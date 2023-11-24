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
    code: Yup.string().required('Required'),
    name: Yup.string().required('Required'),
    locations: Yup.array().required('At least one location is required').min(1, 'At least one location is required').max(5, 'Maximum 5 location allowed'),
});

const OrganizationForm = ({ open, locations, onClose, onSubmit }) => {
    const formik = useFormik({
        initialValues: {
            code: '',
            name: '',
            locations: [],
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            onSubmit(values);
            onClose();
        },
    });

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Create Organization</DialogTitle>
            <DialogContent>
                <form onSubmit={formik.handleSubmit}>
                    <TextField
                        fullWidth
                        id="code"
                        name="code"
                        label="Unique Code"
                        value={formik.values.code}
                        onChange={formik.handleChange}
                        error={formik.touched.code && Boolean(formik.errors.code)}
                        helperText={formik.touched.code && formik.errors.code}
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

                    <FormControl fullWidth margin="normal">
                        <InputLabel id="locations-label">Locations</InputLabel>
                        <Select
                            labelId="locations-label"
                            id="locations"
                            name="locations"
                            multiple
                            value={formik.values.locations}
                            onChange={formik.handleChange}
                            error={formik.touched.locations && Boolean(formik.errors.locations)}
                            renderValue={(selected) => (
                                <Box display="flex" flexWrap="wrap">
                                    {selected.map((value) => (
                                        <Chip key={value} label={value} style={{ margin: 2 }} />
                                    ))}
                                </Box>
                            )}
                        >
                            {locations.map((location) => (
                                <MenuItem key={location.id} value={location.id}>
                                    {location.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

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

export default OrganizationForm;