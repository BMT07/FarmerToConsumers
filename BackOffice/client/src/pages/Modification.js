import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { makeStyles } from '@mui/styles';
import { TextField, Button, Box } from '@mui/material';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '100%',
        },
    },
}));

const Modification = () => {
    const classes = useStyles();
    const { id } = useParams();
    const navigate = useNavigate();
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
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.put(`/api/users/update/${id}`, data);
            navigate('/dashboard/user');
        } catch (error) {
            console.error(error);
        }
    };

    const onValueChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    return (
        <form className={classes.root} onSubmit={handleSubmit}>
            <Box bgcolor="white" p={3} borderRadius="10px">
                <TextField
                    required
                    id="name"
                    label="Name"
                    name="name"
                    variant="outlined"
                    fullWidth
                    value={data.name}
                    onChange={(e) => onValueChange(e)}
                />

                <TextField
                    required
                    id="email"
                    label="Email"
                    name="email"
                    type="email"
                    variant="outlined"
                    fullWidth
                    value={data.email}
                    onChange={(e) => onValueChange(e)}
                />

                <TextField
                    required
                    name="phoneNumber"
                    id="phone"
                    label="Phone"
                    type="tel"
                    variant="outlined"
                    fullWidth
                    value={data.phoneNumber}
                    onChange={(e) => onValueChange(e)}
                />

                <TextField
                    required
                    id="role"
                    name="role"
                    label="role"
                    multiline
                    variant="outlined"
                    fullWidth
                    value={data.role}
                    onChange={(e) => onValueChange(e)}
                />

                <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    sx={{ mt: 2 }}
                    style={{marginLeft:"380px"}}
                >
                    Submit
                </Button>
                <Button
                    variant="contained"
                    color="error"

                    sx={{ mt: 2 }}
                    style={{marginLeft:"10px"}}
                    onClick={()=>navigate('/dashboard/user')}
                >
                    Back
                </Button>
            </Box>
        </form>
    );
};

export default Modification;
