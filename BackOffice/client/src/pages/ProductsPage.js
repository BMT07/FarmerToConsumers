import axios from 'axios';

import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, PureComponent } from 'react';
import { Delete, Edit, Visibility, Search } from '@mui/icons-material';

// @mui
import {
  Container,
  Stack,
  Typography,
  Alert,
  AlertTitle,
  Box,
  styled,
  TableBody,
  tableCellClasses,
  CircularProgress,
  InputBase,
  Grid,
  TableCell,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton,
  TablePagination,
  TextField,
  Avatar,
} from '@mui/material';
import { format } from 'date-fns';

// ----------------------------------------------------------------------

export default function ProductsPage() {
  const [openFilter, setOpenFilter] = useState(false);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [deletedProductId, setDeletedProductId] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const navigate = useNavigate();

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: 'SkyBlue',
      color: theme.palette.common.black,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const refreshPage = () => {
    navigate(0);
  };

  const handleDelete = (id) => {
    try {
      axios.delete(`/api/products/${id}`).then(() => {
        setData(data.filter((prod) => prod._id !== id));
        setDeletedProductId(id);
        setTimeout(() => {
          setDeletedProductId(null);
        }, 3000);
      });
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleChangeSearchText = (event) => {
    setSearchText(event.target.value);
    setPage(0);
  };
  const filteredData = data.filter((row) => (row.name ?? '').toLowerCase().includes(searchText.toLowerCase()));

  useEffect(() => {
    axios.get('/api/products/getAll').then((response) => setData(response.data));
    setTimeout(() => {
      setLoading(false);
    }, 200);
  }, []);

  // *
  // *
  // *
  // chart
  // *
  // *
  // *

  if (loading) {
    return <CircularProgress color="success" />;
  }

  // const handleOpenFilter = () => {
  //   setOpenFilter(true);
  // };

  // const handleCloseFilter = () => {
  //   setOpenFilter(false);
  // };

  return (
    <>
      <Helmet>
        <title> Dashboard: Products </title>
      </Helmet>

      <Box display="flex" justifyContent="space-between" p={2}>
        <Box display="flex" borderRadius="3px" backgroundColor="#ffff">
          <InputBase
            sx={{ ml: 2, flex: 1 }}
            placeholder="Search"
            value={searchText}
            onChange={handleChangeSearchText}
          />
          <IconButton>
            <Search sx={{ color: 'gray' }} />
          </IconButton>
        </Box>
      </Box>

      {deletedProductId && (
        <Alert severity="success" onClose={() => setDeletedProductId(null)}>
          <AlertTitle>Utilisateur supprimé</AlertTitle>
          L'utilisateur a été supprimé avec succès !
        </Alert>
      )}

      <Grid container spacing={2} justify="center">
        <Grid item xs={12} sm={14} md={10}>
          <TableContainer component={Paper}>
            <Table aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>image</StyledTableCell>
                  <StyledTableCell>Name</StyledTableCell>
                  <StyledTableCell>Quantity </StyledTableCell>
                  <StyledTableCell>Production Date</StyledTableCell>
                  <StyledTableCell>Price</StyledTableCell>
                  <StyledTableCell>Farmer</StyledTableCell>
                  <StyledTableCell>Action</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell component="th" scope="row">
                      <Avatar alt="image" src={item.image} />
                    </StyledTableCell>
                    <StyledTableCell>{item.name}</StyledTableCell>
                    <StyledTableCell>{item.quantity}</StyledTableCell>
                    <StyledTableCell>{format(new Date(item.productionDate), 'dd-MM-yyyy')}</StyledTableCell>
                    <StyledTableCell>{item.price}</StyledTableCell>
                    <StyledTableCell>{item.farmer}</StyledTableCell>

                    <StyledTableCell>
                      <IconButton
                        aria-label="edit"
                        onClick={() => navigate(`/dashboard/modifProd/${item._id}`)}
                        color="success"
                      >
                        <Edit />
                      </IconButton>
                      <IconButton aria-label="delete" color="error" onClick={() => handleDelete(item._id)}>
                        <Delete />
                      </IconButton>
                      <IconButton
                        aria-label="view"
                        onClick={() => navigate(`/dashboard/prodDetail/${item._id}`)}
                        color="primary"
                      >
                        <Visibility />
                      </IconButton>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[5, 10, 15]}
              component="div"
              count={filteredData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableContainer>
        </Grid>
      </Grid>

      {/* <Box text-A>Stats</Box>
      <BarChart width={600} height={300} data={chartData}>
        <XAxis dataKey="category" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#8884d8" />
      </BarChart> */}
    </>
  );
}
