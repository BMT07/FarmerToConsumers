import React, { useState } from 'react'

import { useDispatch, useSelector } from "react-redux"
import { ADD, DELETE, EMPTYCART, REMOVE_INT } from "../../../controller/action"
import { useEffect } from "react"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Alert, AlertTitle, Box, Breadcrumbs, Button, Grid, Typography } from '@mui/material';
import { Link, useHistory } from 'react-router-dom';
import { AiOutlineDelete } from 'react-icons/ai';
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai"

function Cart() {
    const history=useHistory()
    const getdata = useSelector((state) => state.cartReducer.carts)
    const dispatch = useDispatch()
    const DeleteItem = (id) => {
        dispatch(DELETE(id))
    }
    const increment = (e) => {
        dispatch(ADD(e))
    }

    // descriment item
    const decrement = (item) => {
        dispatch(REMOVE_INT(item))
    }
    const Clear=()=>{
        dispatch(EMPTYCART())
        console.log("clear")
    }
    const [price, setPrice] = useState(0)
    const totals = () => {
        let price = 0
        getdata.map((e, i) => {
            price = parseFloat(e.price) * e.quantity + price
        })
        setPrice(price)
    }

    useEffect(() => {
        totals()
    }, [totals])
    return (
        <>
        <Box sx={{ backgroundColor: '#F7F7F7', height: 55, p: 2, border: '1px solid #E3E3E3',paddingLeft:5 }}>
        <div role="presentation" >
          <Breadcrumbs aria-label="breadcrumb" sx={{fontSize:14}} >
            <Typography>
              Shop
            </Typography>
            <Typography color="text.primary">Cart</Typography>
          </Breadcrumbs>
        </div>
      </Box>
      <Grid container justifyContent={'space-around'} alignItems={'end'} mt={10} sx={{ display:"flex", flexWrap: 'wrap', justifyContent: 'center' }}>        
      <div style={{ overflowX: 'auto', maxWidth: '100%' }}>
    <Table aria-label="simple table" size="small" sx={{ width: 900 }}>
                <TableHead>
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell align="left" style={{ fontSize: "20px" }}>Product</TableCell>
                        <TableCell align="left" style={{ fontSize: "20px" }}>Price</TableCell>
                        <TableCell align="left" style={{ fontSize: "20px" }}>Quantity</TableCell>
                        <TableCell align="left" style={{ fontSize: "20px" }}>Total</TableCell>
                        <TableCell align="left" style={{ fontSize: "20px" }}></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody alignItems={'center'}>
                    {getdata.length===0?(<TableRow > <TableCell rowSpan={3} /><TableCell  colSpan={4}><Alert severity="warning">
        <AlertTitle>Warning</AlertTitle>
        Your cart is empty  — <strong>check it out!</strong>
      </Alert></TableCell></TableRow>):
                    getdata.map((row) => 
                    (
                        <TableRow
                            key={row.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell component="th" scope="row">
                                <Link to={`/cart/${row._id}`}>
                                    <img width={70} height={70} src={row.image} alt='' />
                                </Link>
                            </TableCell>
                            <TableCell align="left">{row.name}</TableCell>
                            <TableCell align="left">{row.price}</TableCell>
                            <TableCell align="left">
                                <div className='qty'>
                                    <div className='count'>
                                        <button onClick={() => increment(row)}>
                                            <AiOutlinePlus />
                                        </button>
                                        <span>{row.quantity}</span>
                                        <button onClick={row.quantity <= 1 ? () => DeleteItem(row._id) : () => decrement(row)}>
                                            <AiOutlineMinus />
                                        </button>
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell align="left" >{row.price * row.quantity}</TableCell>
                            <TableCell align="left">
                                <div className='details_content_detail_icon'>
                                    <Button onClick={() =>  DeleteItem(row._id)}>
                                        <AiOutlineDelete fontSize="large" />
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            </div>
            <Grid container justifyContent={'space-around'} alignItems={'end'} mt={5} sx={{ display:"flex"}} >
                <h4>Total : ${price}</h4>
                {getdata.length!==0?(
                <Box sx={{ display:"flex"}}>
                    
                    <button className='button' onClick={()=>history.push('/cartEdit/checkout')}>Ordering</button>       
                   
                    <button className='buttonClear' onClick={() => Clear()}>Clear</button>
                </Box>):(<button className='buttonClear' onClick={()=>history.push('/shop')}>Return to shop</button>
)}
            </Grid>
        </Grid>
        </>
    )
}

export default Cart