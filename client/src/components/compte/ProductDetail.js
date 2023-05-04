import { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, Grid } from '@mui/material';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

const ProductDetail = () => {
    const { id } = useParams()
    const [data, setData] = useState([])
    const history = useHistory()

    useEffect(() => {
        axios.get(`http://localhost:8080/FarmerToConsumer/getProducts/${id}`).then((res) => setData(res.data))
    }, [])

    return (
        <Grid container justifyContent="center">
            <Grid item xs={10} sm={8} md={6} lg={4} mt={2}>
                <Card sx={{ maxWidth: 345 }}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            width="100%"
                            height="140"
                            image={data.image}
                            alt="green iguana"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                Name:  {data.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Price:${data.price}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Quantity:{data.quantity}Kg
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Category:{data.category}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              ProductionDate: {data.productionDate ? data.productionDate.slice(0, 10) : ""}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Likes:{data.likes ? data.likes.length : 0}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button size="small" color="error" onClick={() => history.push('/farmer')}>
                            Back
                        </Button>
                    </CardActions>
                </Card>
            </Grid>
        </Grid>

    )
}

export default ProductDetail
