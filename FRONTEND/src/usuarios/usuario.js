import React, { useState, useEffect } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash, faClockRotateLeft, faBuilding, faHouse, faBuildingUser } from '@fortawesome/free-solid-svg-icons';
import Header from '../header/headerSec';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { getUsuarios, deleteUsuario } from '../services/usuarios';
import LoginService from '../services/LoginService';
import EditarUsuarioModal from '../modal/EditarUsuarioModal';
import './usuario.css';

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

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [filter, setFilter] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [editingUsuario, setEditingUsuario] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const userRole = LoginService.getUserRole();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const data = await getUsuarios();
        setUsuarios(data);
      } catch (error) {
        console.error('Error fetching usuarios:', error);
      }
    };

    fetchUsuarios();
  }, []);

  const handleNavigate = (path) => {
    navigate(path);
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const handleDelete = async (id) => {
    const isConfirmed = window.confirm(`¿Estás seguro de que deseas eliminar el usuario con ID ${id}?`);
    if (isConfirmed) {
      try {
        await deleteUsuario(id);
        setUsuarios(usuarios.filter((usuario) => usuario._id !== id));
        alert('Usuario eliminado');
      } catch (error) {
        console.error('Error deleting usuario:', error);
      }
    }
  };

  const handleEdit = (usuario) => {
    setEditingUsuario(usuario);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setEditingUsuario(null);
  };

  const handleUsuarioUpdated = async () => {
    const data = await getUsuarios();
    setUsuarios(data);
  };

  const filteredUsuarios = usuarios.filter((usuario) =>
    Object.values(usuario).some((value) =>
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
      <h1 className="usuariosTitulo">Usuarios</h1>
      <div className="dockContainer7">
          <FontAwesomeIcon icon={faHouse} title="Página Principal" className="dockIcon7" onClick={() => handleNavigate('/home')} />
          <FontAwesomeIcon icon={faBuilding} title="Instituciones" className="dockIcon7" onClick={() => handleNavigate('/instituciones')} />
          <FontAwesomeIcon icon={faBuildingUser} title="Coordinadores" className="dockIcon7" onClick={() => handleNavigate('/coordinadores')} />
          <FontAwesomeIcon icon={faClockRotateLeft} title="Historial" className="dockIcon7" onClick={() => handleNavigate('/historial')} />
      </div>
      <TableContainer component={Paper} className="tableContainer7">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre Usuario</TableCell>
              <TableCell>Correo Usuario</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsuarios.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
              <TableRow key={row._id}>
                <TableCell>{`${row.nombre} ${row.apellido}`}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.rol}</TableCell>
                <TableCell>
                  <div className="icon-container">
                    {userRole !== 'viewer' && (
                      <>
                        <FontAwesomeIcon icon={faPen} className="icon-edit" onClick={() => handleEdit(row)} />
                        <FontAwesomeIcon icon={faTrash} className="icon-delete" onClick={() => handleDelete(row._id)} />
                      </>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {filteredUsuarios.length === 0 && (
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
          count={filteredUsuarios.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
      {editingUsuario && (
        <EditarUsuarioModal
          open={isEditModalOpen}
          onClose={handleCloseEditModal}
          usuario={editingUsuario}
          onUsuarioUpdated={handleUsuarioUpdated}
        />
      )}
    </div>
  );
};

export default Usuarios;