import React from "react";
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {TextField, Button, FormControl, InputLabel, Select, MenuItem, Box, Input} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import PageHeader from "../../components/PageHeader/PageHeader";
import axios from '../../services/axiosConfig';
import './index.css';

const validationSchema = Yup.object({
    number: Yup.number().required('Please enter a valid number.'),
    type: Yup.string().required('Please select a type.'),
    image: Yup.mixed().required('Please upload an image.'),
    dateCreated: Yup.date().required('Please select a date.'),
    status: Yup.string().required('Please choose status.'),
});

const DevicePage = () => {
    const formik = useFormik({
        initialValues: {
            number: '',
            type: '',
            image: null,
            dateCreated: '',
            status: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            // Handle form submission here
            console.log(values);
            const formData = new FormData();
            formData.append('number', values.number);
            formData.append('type', values.type);
            formData.append('image', values.image);
            formData.append('date_created', values.dateCreated);
            formData.append('status', values.status);

            axios.post('/devices', formData)
                .then(response => {
                    console.log(response);
                    formik.resetForm();
                })
                .catch(error => {
                    console.log(error);
                });
        },
    });

    const handleImageChange = (event) => {
        formik.setFieldValue('image', event.currentTarget.files[0]);
    };

    return (
        <div>
            <PageHeader title="Add Device"/>
            <div className="form-container">
                <form onSubmit={formik.handleSubmit}>
                    <TextField
                        fullWidth
                        id="number"
                        name="number"
                        label="Unique Number"
                        value={formik.values.number}
                        onChange={formik.handleChange}
                        error={formik.touched.number && Boolean(formik.errors.number)}
                        helperText={formik.touched.number && formik.errors.number}
                        margin="normal"
                    />

                    <FormControl fullWidth margin="normal">
                        <InputLabel id="type-label">Type</InputLabel>
                        <Select
                            labelId="type-label"
                            id="type"
                            name="type"
                            value={formik.values.type}
                            onChange={formik.handleChange}
                            error={formik.touched.type && Boolean(formik.errors.type)}
                        >
                            <MenuItem value="pos">POS</MenuItem>
                            <MenuItem value="kiosk">Kiosk</MenuItem>
                            <MenuItem value="digitalSignage">Digital Signage</MenuItem>
                        </Select>
                    </FormControl>

                    <p className="image-error">{formik.errors.type ? formik.errors.type : null}</p>

                    <TextField
                        fullWidth
                        id="dateCreated"
                        name="dateCreated"
                        label="Date Created"
                        type="date"
                        InputLabelProps={{shrink: true}}
                        value={formik.values.dateCreated}
                        onChange={formik.handleChange}
                        error={formik.touched.dateCreated && Boolean(formik.errors.dateCreated)}
                        helperText={formik.touched.dateCreated && formik.errors.dateCreated}
                        margin="normal"
                    />

                    <FormControl fullWidth margin="normal">
                        <InputLabel id="status-label">Status</InputLabel>
                        <Select
                            labelId="status-label"
                            id="status"
                            name="status"
                            value={formik.values.status}
                            onChange={formik.handleChange}
                            error={formik.touched.status && Boolean(formik.errors.status)}
                        >
                            <MenuItem value="active">Active</MenuItem>
                            <MenuItem value="inactive">Inactive</MenuItem>
                        </Select>
                    </FormControl>

                    <p className="image-error">{formik.errors.status ? formik.errors.status : null}</p>

                    <label htmlFor="image">
                        <Button variant="outlined" component="span" style={{marginTop: '15px'}}>
                            Upload Image
                        </Button>
                    </label>

                    <p className="image-error">{formik.errors.image ? formik.errors.image : null}</p>

                    <Input
                        fullWidth
                        type="file"
                        id="image"
                        name="image"
                        onChange={handleImageChange}
                        error={formik.touched.image && Boolean(formik.errors.image)}
                        inputProps={{accept: 'image/*'}}
                        margin="normal"
                        style={{display: 'none'}}
                    />

                    {formik.values.image && (
                        <Box mt={2}>
                            <img src={URL.createObjectURL(formik.values.image)} alt="Selected"
                                 style={{maxWidth: '100%', maxHeight: '200px'}}/>
                        </Box>
                    )}

                    <Box mt={2} style={{textAlign: 'end'}}>
                        <Button variant="contained" type="submit" endIcon={<SendIcon/>}>
                            Submit
                        </Button>
                    </Box>
                </form>
            </div>
        </div>
    );
}

export default DevicePage;