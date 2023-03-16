import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
    Box,
    Paper,
    TextField,
    Grid,
    Typography,
    Button,
} from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: '#ffffff',
        padding: theme.spacing(2),
        margin: theme.spacing(2),
        borderRadius: theme.spacing(1),
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
    },
}));

const DetailUsers = () => {
    const classes = useStyles();
    const navigate = useNavigate();
    const { id } = useParams();
    const [data, setData] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        role: '',
    });

    useEffect(() => {
        axios.get(`/api/getOne/${id}`).then((response) => {
            const { name, email, phoneNumber, role } = response.data;
            setData({ name, email, phoneNumber, role });
        });
    }, [id]);

    const handleBackClick = () => {
        navigate('/dashboard/user');
    };

    return (
        <Paper className={classes.root}>
            <Typography variant="h5" component="h1" gutterBottom>
                User Details
            </Typography>
            <Box padding={2}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            id="name"
                            label="Name"
                            value={data.name}
                            InputProps={{
                                readOnly: true,
                            }}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="email"
                            label="Email"
                            value={data.email}
                            InputProps={{
                                readOnly: true,
                            }}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="phoneNumber"
                            label="Phone Number"
                            value={data.phoneNumber}
                            InputProps={{
                                readOnly: true,
                            }}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="role"
                            label="Role"
                            value={data.role}
                            InputProps={{
                                readOnly: true,
                            }}
                            fullWidth
                        />
                    </Grid>
                </Grid>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                <Button variant="outlined" onClick={handleBackClick}>
                    Back to Dashboard
                </Button>
            </Box>
        </Paper>
    );
};

export default DetailUsers;
