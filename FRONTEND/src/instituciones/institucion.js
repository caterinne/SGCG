import React, { useState, useEffect } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash} from '@fortawesome/free-solid-svg-icons';
import Header from '../header/header';
import { styled } from '@mui/material/styles';
import { getInstituciones, deleteInstitucion } from '../services/instituciones';
import './institucion.css';
import LoginService from '../services/LoginService';

const StyledTablePagination = styled(TablePagination)(({ theme }) => ({
  '& .MuiTablePagination-toolbar': {
    backgroundColor: '#f5f5f5',
    minHeight: '40px',
    paddingLeft: '16px',
    paddingRight: '80px',
  },
  '& .MuiTablePagination-actions': {
    marginLeft: '8px',
    display: 'flex',
    alignItems: 'center',
    gap: '0px',
    padding: '0 4px'
  },
  '& .MuiSelect-icon': {
    top: 'calc(50% - 12px)',
  },
}));

const CustomTablePagination = (props) => {
  return <StyledTablePagination {...props} />;
};

const Institucion = () => {
  const [instituciones, setInstitucion] = useState([]);
  const [filter, setFilter] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const userRole = LoginService.getUserRole();

  useEffect(() => {
    const fetchInstitucion = async () => {
      try {
        const data = await getInstituciones();
        setInstitucion(data);
      } catch (error) {
        console.error('Error fetching coordinadores:', error);
      }
    };

    fetchInstitucion();
  }, []);

  const handleDelete = async (id) => {
    const isConfirmed = window.confirm(`¿Estás seguro de que deseas eliminar el coordinador con ID ${id}?`);
    if (isConfirmed) {
      try {
        await deleteInstitucion(id);
        setInstitucion(instituciones.filter((institucion) => institucion._id !== id));
        alert('Institucion eliminado');
      } catch (error) {
        console.error('Error deleting institucion:', error);
      }
    }
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const handleEdit = (data) => {
    // Lógica para editar
  };

  const filteredCoordinador = instituciones.filter((institucion) =>
    Object.values(institucion).some((value) =>
      String(value).toLowerCase().includes(filter.toLowerCase())
    )
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div className="body">
      <Header filter={filter} onFilterChange={handleFilterChange} />
      <TableContainer component={Paper} className="table-container">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Institución</TableCell>
              <TableCell>País</TableCell>
              <TableCell>Tipo Institucion</TableCell>
              <TableCell>Departamento</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCoordinador.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
              <TableRow key={row._id}>
                <TableCell>{row.nombre_institucion}</TableCell>
                <TableCell>{row.pais}</TableCell>
                <TableCell>{row.tipo_institucion}</TableCell>
                <TableCell>{row.departamento}</TableCell>
                <TableCell>
                  <div className="icon-container">
                    {userRole !== 'viewer' && (
                      <>
                        <FontAwesomeIcon icon={faPen} className="icon-edit" onClick={() => handleEdit(row)}/>
                        <FontAwesomeIcon icon={faTrash} className="icon-delete" onClick={() => handleDelete(row._id)} />
                      </>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {filteredCoordinador.length === 0 && (
              <TableRow>
                <TableCell colSpan={10} align="center">
                  No se ha encontrado ningún resultado con: {filter}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <CustomTablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={filteredCoordinador.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </div>
  );
};

export default Institucion;
