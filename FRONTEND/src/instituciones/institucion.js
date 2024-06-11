import React, { useState, useEffect } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash, faClockRotateLeft, faBuilding, faHouse, faBuildingUser } from '@fortawesome/free-solid-svg-icons';
import Header from '../header/header';
import { styled } from '@mui/material/styles';
import { getInstituciones, deleteInstitucion } from '../services/instituciones';
import './institucion.css';
import LoginService from '../services/LoginService';
import EditarInstitucionModal from '../modal/EditarInstitucionModal';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();
  const [instituciones, setInstitucion] = useState([]);
  const [filter, setFilter] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedInstitucion, setSelectedInstitucion] = useState(null);
  const userRole = LoginService.getUserRole();

  useEffect(() => {
    const fetchInstitucion = async () => {
      try {
        const data = await getInstituciones();
        setInstitucion(data);
      } catch (error) {
        console.error('Error fetching instituciones:', error);
      }
    };

    fetchInstitucion();
  }, []);

  const handleNavigate = (path) => {
    navigate(path);
  };

  const handleDelete = async (id) => {
    const isConfirmed = window.confirm(`¿Estás seguro de que deseas eliminar la institución con ID ${id}?`);
    if (isConfirmed) {
      try {
        await deleteInstitucion(id);
        setInstitucion(instituciones.filter((institucion) => institucion._id !== id));
        alert('Institución eliminada');
      } catch (error) {
        console.error('Error deleting institución:', error);
      }
    }
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const handleEdit = (institucion) => {
    setSelectedInstitucion(institucion);
    setEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setEditModalOpen(false);
    setSelectedInstitucion(null);
  };

  const handleInstitucionUpdated = async () => {
    setEditModalOpen(false);
    const data = await getInstituciones();
    setInstitucion(data);
  };

  const filteredInstituciones = instituciones.filter((institucion) =>
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
      <h1 className="instTitulo">Instituciones</h1>
      <div className="dockContainer2">
        <FontAwesomeIcon icon={faHouse} title="Página Principal" className="dockIcon2" onClick={() => handleNavigate('/home')} />
        <FontAwesomeIcon icon={faBuilding} title="Instituciones" className="dockIcon2" onClick={() => handleNavigate('/instituciones')} />
        <FontAwesomeIcon icon={faBuildingUser} title="Coordinadores" className="dockIcon2" onClick={() => handleNavigate('/coordinadores')} />
        <FontAwesomeIcon icon={faClockRotateLeft} title="Historial" className="dockIcon2" onClick={() => handleNavigate('/historial')} />
      </div>
      <TableContainer component={Paper} className="tableContainer2">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Institución</TableCell>
              <TableCell>País</TableCell>
              <TableCell>Tipo Institución</TableCell>
              <TableCell>Departamento</TableCell>
              {userRole !== 'viewer' && <TableCell>Acciones</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredInstituciones.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
              <TableRow key={row._id}>
                <TableCell>{row.nombre_institucion}</TableCell>
                <TableCell>{row.pais}</TableCell>
                <TableCell>{row.tipo_institucion}</TableCell>
                <TableCell>{row.departamento}</TableCell>
                {userRole !== 'viewer' && (
                  <TableCell>
                    <div className="icon-container">
                      <FontAwesomeIcon icon={faPen} className="icon-edit" onClick={() => handleEdit(row)} />
                      <FontAwesomeIcon icon={faTrash} className="icon-delete" onClick={() => handleDelete(row._id)} />
                    </div>
                  </TableCell>
                )}
              </TableRow>
            ))}
            {filteredInstituciones.length === 0 && (
              <TableRow>
                <TableCell colSpan={userRole !== 'viewer' ? 5 : 4} align="center">
                  No se ha encontrado ningún resultado con: {filter}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <CustomTablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={filteredInstituciones.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
      {selectedInstitucion && (
        <EditarInstitucionModal
          open={editModalOpen}
          onClose={handleEditModalClose}
          institucion={selectedInstitucion}
          onInstitucionUpdated={handleInstitucionUpdated}
        />
      )}
    </div>
  );
};

export default Institucion;