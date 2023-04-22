import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'

import {
    Box,
    Paper,
    TextField,
    Grid,
    Typography,
    Button,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { setAlert } from "../actions/Alert"


const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: '#ffffff',
        padding: theme.spacing(2),
        margin: theme.spacing(2),
        borderRadius: theme.spacing(1),
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
    },
}));

const Admin = (props) => {
    const classes = useStyles();
    const navigate = useNavigate();
    const [data, setData] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        role: 'Admin',
        password: ''
    });

    const onValueChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(`/api/users/add`, data);
            props.setAlert('Created Account')
            navigate('/dashboard/user');
        } catch (error) {
            console.error(error);
        }
    };





    return (
        <form className={classes.root} onSubmit={handleSubmit}>
            <Paper className={classes.root}>
                <Typography variant="h5" component="h1" gutterBottom>
                    Add Admin
                </Typography>
                <Box padding={2}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                id="name"
                                label="Name"
                                name="name"
                                value={data.name}
                                fullWidth
                                required
                                onChange={(e) => onValueChange(e)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="email"
                                label="Email"
                                name="email"
                                value={data.email}
                                fullWidth
                                required
                                onChange={(e) => onValueChange(e)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="phoneNumber"
                                name="phoneNumber"
                                label="Phone Number"
                                value={data.phoneNumber}
                                fullWidth
                                required
                                onChange={(e) => onValueChange(e)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="role"
                                label="Role"
                                name="role"
                                value={data.role}
                                fullWidth
                                required
                                onChange={(e) => onValueChange(e)}

                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="password"
                                name="password"
                                label="Password"
                                value={data.password}
                                fullWidth
                                required
                                onChange={(e) => onValueChange(e)}
                            />
                        </Grid>
                    </Grid>
                </Box>
                <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    sx={{ mt: 2 }}
                    style={{ marginLeft: "10px" }}
                >
                    Add
                </Button>
                <Button
                    variant="contained"
                    color="error"
                    sx={{ mt: 2 }}
                    style={{ marginLeft: "10px" }}
                    onClick={() => navigate('/dashboard/user')}
                >
                    Back
                </Button>
            </Paper>
        </form>
    );
};
Admin.propTypes = {
    setAlert: PropTypes.func.isRequired
}

export default connect(null, { setAlert })(Admin);