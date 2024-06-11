import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash, faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import Header from '../header/header';
import { styled } from '@mui/material/styles';
import { getConvenios, deleteConvenio } from '../services/convenios';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import LoginService from '../services/LoginService';
import EditarConvenioModal from '../modal/EditConvenio';
import styles from './convenio.css';

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

const Convenio = () => {
  const [convenios, setConvenios] = useState([]);
  const [filter, setFilter] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedConvenio, setSelectedConvenio] = useState(null); 
  const navigate = useNavigate();
  const userRole = LoginService.getUserRole();

  useEffect(() => {
    const fetchConvenios = async () => {
      try {
        const data = await getConvenios();
        setConvenios(data);
      } catch (error) {
        console.error('Error fetching convenios:', error);
      }
    };

    fetchConvenios();
  }, []);

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const handleDelete = async (id) => {
    const isConfirmed = window.confirm(`¿Estás seguro de que deseas eliminar el convenio: ${id}?`);
    if (isConfirmed) {
      try {
        await deleteConvenio(id);
        setConvenios(convenios.filter((convenio) => convenio._id !== id));
        alert('Convenio eliminado');
      } catch (error) {
        console.error('Error deleting convenio:', error);
      }
    }
  };

  const handleEdit = (convenio) => {
    setSelectedConvenio(convenio); 
    setEditModalOpen(true); 
  };

  const handleEditModalClose = () => {
    setEditModalOpen(false); 
    setSelectedConvenio(null);
  };

  const handleConvenioUpdated = async () => {
    setEditModalOpen(false); 
    const data = await getConvenios();
    setConvenios(data);
  };

  const handleViewDetails = (convenio) => {
    navigate(`/convenio-detalle/${convenio._id}`);
  };

  const estadoVigencia = (convenio) => {
    const fechaVigencia = new Date(convenio.vigencia);
    const fechaActual = new Date();
    return fechaActual > fechaVigencia ? 'Caducado' : 'Vigente';
  };

  const formatFecha = (fecha) => {
    if (!fecha) return 'Fecha inválida';
    try {
      return format(new Date(fecha), "dd 'de' MMMM 'de' yyyy", { locale: es });
    } catch (error) {
      return 'Fecha inválida';
    }
  };

  const filteredConvenios = convenios.filter((convenio) =>
    Object.values(convenio).some((value) =>
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
    <div className={styles.body}>
      <Header filter={filter} onFilterChange={handleFilterChange} />
      <TableContainer component={Paper} className={'tableContainer'}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Estado</TableCell>
              <TableCell>Alcance</TableCell>
              <TableCell>Cupos</TableCell>
              <TableCell>País</TableCell>
              <TableCell>Institución</TableCell>
              <TableCell>Convenio</TableCell>
              <TableCell>Vigencia</TableCell>
              <TableCell>Nombre Coordinador</TableCell>
              <TableCell>Correo Coordinador</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredConvenios.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
              <TableRow key={row._id}>
                <TableCell>
                  <span className={estadoVigencia(row).toLowerCase()}>
                    {estadoVigencia(row)}
                  </span>
                </TableCell>
                <TableCell>{row.alcance}</TableCell>
                <TableCell>{row.cupos}</TableCell>
                <TableCell>{row.coordinador.institucion.pais}</TableCell>
                <TableCell>{row.coordinador.institucion.nombre_institucion}</TableCell>
                <TableCell>{row.tipo_convenio}</TableCell>
                <TableCell>{formatFecha(row.vigencia)}</TableCell>
                <TableCell>{`${row.coordinador.nombre} ${row.coordinador.apellido}`}</TableCell>
                <TableCell>{row.coordinador.email}</TableCell>
                <TableCell>
                  <div className={styles.iconContainer}>
                    <FontAwesomeIcon icon={faCircleInfo} title="Ver detalles" className={'icon-info'} onClick={() => handleViewDetails(row)} />
                    {userRole !== 'viewer' && (
                      <>
                        <FontAwesomeIcon icon={faPen} title="Editar" className={'iconEdit'} onClick={() => handleEdit(row)} />
                        <FontAwesomeIcon icon={faTrash} title="Eliminar" className={'iconDelete'} onClick={() => handleDelete(row._id)} />
                      </>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {filteredConvenios.length === 0 && (
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
          count={filteredConvenios.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
      {selectedConvenio && (
        <EditarConvenioModal
          open={editModalOpen}
          onClose={handleEditModalClose}
          convenio={selectedConvenio}
          onConvenioUpdated={handleConvenioUpdated}
        />
      )}
    </div>
  );
};

export default Convenio;