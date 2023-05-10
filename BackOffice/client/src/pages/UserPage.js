import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
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
} from '@mui/material';
import { Delete, Edit, Visibility, Search } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';

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

const UserPage = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchText, setSearchText] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);
  const [deletedUserId, setDeletedUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
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
      axios.delete(`/api/users/delete/${id}`).then(() => {
        setData(data.filter((user) => user._id !== id));
        setDeletedUserId(id);
        setTimeout(() => {
          setDeletedUserId(null);
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
    axios.get('/api/users/getAll').then((response) => setData(response.data));
    setTimeout(() => {
      setLoading(false);
    }, 200);
  }, []);

  if (loading) {
    return <CircularProgress color="success" />;
  }
  return (
    <>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        style={{ backgroundColor: 'Teal', color: 'white', marginLeft: '700px' }}
        onClick={() => navigate('/dashboard/addadmin')}
      >
        Add Admin
      </Button>
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

      {deletedUserId && (
        <Alert severity="success" onClose={() => setDeletedUserId(null)}>
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
                  <StyledTableCell>Name</StyledTableCell>
                  <StyledTableCell>Email </StyledTableCell>
                  <StyledTableCell>Role</StyledTableCell>
                  <StyledTableCell>phone</StyledTableCell>
                  <StyledTableCell>Statut</StyledTableCell>
                  <StyledTableCell sx={{ width: '200px' }}>Action</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell component="th" scope="row">
                      {item.name}
                    </StyledTableCell>
                    <StyledTableCell>{item.email}</StyledTableCell>
                    <StyledTableCell>{item.role}</StyledTableCell>
                    <StyledTableCell>{item.phoneNumber}</StyledTableCell>
                    <StyledTableCell>ok</StyledTableCell>
                    <StyledTableCell>
                    <IconButton
                        aria-label="view"
                        onClick={() => navigate(`/dashboard/detail/${item._id}`)}
                        color="primary"
                      >
                        <Visibility />
                      </IconButton>
                      <IconButton
                        aria-label="edit"
                        onClick={() => navigate(`/dashboard/modif/${item._id}`)}
                        color="success"
                      >
                        <Edit />
                      </IconButton>
                      <IconButton aria-label="delete" color="error" onClick={() => handleDelete(item._id)}>
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
    </>
  );
};

export default UserPage;
