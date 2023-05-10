import axios from 'axios';

import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, PureComponent } from 'react';
import * as React from 'react';
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
  Hidden,
  TableSortLabel,
} from '@mui/material';
import { format } from 'date-fns';

import { DataGrid } from '@mui/x-data-grid';

// ----------------------------------------------------------------------

export default function ProductsPage() {
  const [openFilter, setOpenFilter] = useState(false);
  const [data, setData] = useState([]);
  const [row, setRow] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [deletedProductId, setDeletedProductId] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const navigate = useNavigate();
  const [valueToOrderBy, setValueToOrderBy] = useState('name');
  const [orderDirection, setOrderDirection] = useState('asc');

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
    console.log(searchText);
    setPage(0);
  };
  const filteredData = data.filter((row) => (row.name ?? '').toLowerCase().includes(searchText.toLowerCase()));

  useEffect(() => {
    axios.get('/api/products/getAll').then((response) => setData(response.data));
    setTimeout(() => {
      setLoading(false);
    }, 200);
  }, []);

  const handleRequestSort = (event, property) => {
    const isAscending = valueToOrderBy === property && orderDirection === 'asc';
    setValueToOrderBy(property);
    setOrderDirection(isAscending ? 'desc' : 'asc');
  };

  const createSortHandler = (property) => (event) => {
    handleRequestSort(event, property);
  };

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }
  function getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }
  const sortedRowInformation = (rowArray, comparator) => {
    const stabilizedRowArray = rowArray.map((el, index) => [el, index]);
    stabilizedRowArray.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedRowArray.map((el) => el[0]);
  };

  return (
    <>
      <Helmet>
        <title> Dashboard: Products </title>
      </Helmet>
      <title> Dashboard: Products </title>

      <Box display="flex" justifyContent="space-between" p={2}>
        <Box display="flex" borderRadius="3px" backgroundColor="#ffff">
          <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" value={searchText} onChange={handleChangeSearchText} />
          <IconButton>
            <Search sx={{ color: 'gray' }} />
          </IconButton>
        </Box>
      </Box>

      {deletedProductId && (
        <Alert severity="success" onClose={() => setDeletedProductId(null)}>
          <AlertTitle>Product deleted</AlertTitle>
          Product deleted successfully !
        </Alert>
      )}

      <Grid container spacing={2} justify="center">
        <Grid item xs={12} sm={16} md={10}>
          <TableContainer component={Paper}>
            <Table aria-label="customized table">
              <TableHead>
                <TableRow>
                  

                  <StyledTableCell key="name">
                    <TableSortLabel
                      active={valueToOrderBy === 'name'}
                      direction={valueToOrderBy === 'name' ? orderDirection : 'asc'}
                      onClick={createSortHandler('name')}
                    >
                      Name
                    </TableSortLabel>
                  </StyledTableCell>

                  <StyledTableCell key="quantity">
                    <TableSortLabel
                      active={valueToOrderBy === 'quantity'}
                      direction={valueToOrderBy === 'quantity' ? orderDirection : 'asc'}
                      onClick={createSortHandler('quantity')}
                    >
                      Quantity
                    </TableSortLabel>
                  </StyledTableCell>
                  <StyledTableCell key="productionDate">
                    <TableSortLabel
                      active={valueToOrderBy === 'productionDate'}
                      direction={valueToOrderBy === 'productionDate' ? orderDirection : 'asc'}
                      onClick={createSortHandler('productionDate')}
                    >
                      Production Date
                    </TableSortLabel>
                  </StyledTableCell>
                  <StyledTableCell key="price">
                    <TableSortLabel
                      active={valueToOrderBy === 'price'}
                      direction={valueToOrderBy === 'price' ? orderDirection : 'asc'}
                      onClick={createSortHandler('price')}
                    >
                      Price
                    </TableSortLabel>
                  </StyledTableCell>
                  <StyledTableCell>Farmer</StyledTableCell>
                  <StyledTableCell sx={{ width: '200px' }}>Action</StyledTableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {sortedRowInformation(filteredData, getComparator(orderDirection, valueToOrderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((p, index) => (
                    // filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => (
                    <StyledTableRow key={index}>
                      
                      <StyledTableCell>{p.name}</StyledTableCell>
                      <StyledTableCell>{p.quantity}</StyledTableCell>
                      <StyledTableCell>{format(new Date(p.productionDate), 'dd-MM-yyyy')}</StyledTableCell>
                      <StyledTableCell>{p.price}</StyledTableCell>
                      <StyledTableCell>{p.farmer}</StyledTableCell>

                      <StyledTableCell>

                      <IconButton
                          aria-label="view"
                          onClick={() => navigate(`/dashboard/prodDetail/${p._id}`)}
                          color="primary"
                        >
                          <Visibility />
                        </IconButton>
                        <IconButton
                          aria-label="edit"
                          onClick={() => navigate(`/dashboard/modifProd/${p._id}`)}
                          color="success"
                        >
                          <Edit />
                        </IconButton>
                        <IconButton aria-label="delete" color="error" onClick={() => handleDelete(p._id)}>
                          <Delete />
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

      {/* <div style={{ height: 400, width: '100%' }}>
        <DataGrid rows={data} columns={columns} paginationModel={{ page: 0, pageSize: 5 }} />
      </div> */}
    </>
  );
}
