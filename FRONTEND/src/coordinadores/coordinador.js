import React, { useState, useEffect } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash, faClockRotateLeft, faBuilding, faHouse, faBuildingUser} from '@fortawesome/free-solid-svg-icons';
import Header from '../header/header';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { getCoordinadores, deleteCoordinador } from '../services/coordinadores';
import LoginService from '../services/LoginService';
import EditarCoordinadorModal from '../modal/EditarCoordinadorModal';
import './coordinador.css';

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

const Coordinador = () => {
  const [coordinadores, setCoordinador] = useState([]);
  const [filter, setFilter] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [editingCoordinador, setEditingCoordinador] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const userRole = LoginService.getUserRole();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCoordinador = async () => {
      try {
        const data = await getCoordinadores();
        setCoordinador(data);
      } catch (error) {
        console.error('Error fetching coordinadores:', error);
      }
    };

    fetchCoordinador();
  }, []);

  const handleNavigate = (path) => {
    navigate(path);
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const handleDelete = async (id) => {
    const isConfirmed = window.confirm(`¿Estás seguro de que deseas eliminar el coordinador con ID ${id}?`);
    if (isConfirmed) {
      try {
        await deleteCoordinador(id);
        setCoordinador(coordinadores.filter((coordinador) => coordinador._id !== id));
        alert('Coordinador eliminado');
      } catch (error) {
        console.error('Error deleting coordinador:', error);
      }
    }
  };

  const handleEdit = (coordinador) => {
    setEditingCoordinador(coordinador);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setEditingCoordinador(null);
  };

  const handleCoordinadorUpdated = async () => {
    const data = await getCoordinadores();
    setCoordinador(data);
  };

  const filteredCoordinador = coordinadores.filter((coordinador) =>
    Object.values(coordinador).some((value) =>
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
      <h1 className="coorTitulo">Coordinadores</h1>
      <div className="dockContainer3">
        <FontAwesomeIcon icon={faHouse} title="Página Principal" className="dockIcon3" onClick={() => handleNavigate('/home')} />
        <FontAwesomeIcon icon={faBuilding} title="Instituciones" className="dockIcon3" onClick={() => handleNavigate('/instituciones')} />
        <FontAwesomeIcon icon={faBuildingUser} title="Coordinadores" className="dockIcon3" onClick={() => handleNavigate('/coordinadores')} />
        <FontAwesomeIcon icon={faClockRotateLeft} title="Historial" className="dockIcon3" onClick={() => handleNavigate('/historial')} />
      </div>
      <TableContainer component={Paper} className="table-container">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre Coordinador</TableCell>
              <TableCell>Correo Coordinador</TableCell>
              <TableCell>Institución</TableCell>
              <TableCell>País</TableCell>
              <TableCell>Tipo Coordinador</TableCell>
              {userRole !== 'viewer' && <TableCell>Acciones</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCoordinador.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
              <TableRow key={row._id}>
                <TableCell>{`${row.nombre} ${row.apellido}`}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.institucion.nombre_institucion}</TableCell>
                <TableCell>{row.institucion.pais}</TableCell>
                <TableCell>{row.tipo_coordinador}</TableCell>
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
            {filteredCoordinador.length === 0 && (
              <TableRow>
                <TableCell colSpan={userRole !== 'viewer' ? 6 : 5} align="center">
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
      {editingCoordinador && (
        <EditarCoordinadorModal
          open={isEditModalOpen}
          onClose={handleCloseEditModal}
          coordinador={editingCoordinador}
          onCoordinadorUpdated={handleCoordinadorUpdated}
        />
      )}
    </div>
  );
};

export default Coordinador;