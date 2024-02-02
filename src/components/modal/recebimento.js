import React, { useState } from 'react';
import './recebimento.css';
import PaidIcon from '@mui/icons-material/Paid';
import SearchIcon from '@mui/icons-material/Search';
import Pesquisar from '../../../assets/pesquisar.png';
import CancelIcon from '@mui/icons-material/Cancel';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

function createData(name, cpf, numerocontrato, cidade, telefone, ultimoPagamento) {
    return { name, cpf, numerocontrato, cidade, telefone, ultimoPagamento };
}

const rows = [
    createData('Carlos Henrique', '06777303146', '12345', 'Dourados', '671234567', '20/05/2024'),
    createData('Diogo', 'Ponta Porã', '51902630106', '54321', '6778945612', '28/05/2024'),
];

const FloatingWindow = ({ onClose, children }) => {
    const classes = useStyles();
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isTableVisible, setIsTableVisible] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isSearching, setIsSearching] = useState(false);

    const handleSearch = () => {
        setIsSearching(true);
        setIsLoading(true);

        // Simular um atraso de 3 segundos
        setTimeout(() => {
            const filteredRows = rows.filter(
                (row) =>
                    row.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    row.cpf.includes(searchTerm) ||
                    row.numerocontrato.includes(searchTerm)
            );

            setSearchResults(filteredRows);
            setIsTableVisible(filteredRows.length > 0);
            setShowAlert(filteredRows.length === 0);
            setIsLoading(false);
            setIsSearching(false);
        }, 3000);
    };

    const handleClose = () => {
        setSearchTerm('');
        setIsTableVisible(false);
        setShowAlert(false);
        setIsSearching(false);
        setIsLoading(false);
        onClose();
    };

    const handleInputBlur = () => {
        if (searchTerm.trim() === '') {
            setIsTableVisible(false);
            setShowAlert(false);
            setIsSearching(false);
        }
    };
    return (
        <div className="floating-window">
            <div className="floating-window2">
                <label>
                    <PaidIcon /> Recebimento
                </label>
                <div className="window-content">
                    <button className="close-button" onClick={handleClose}>
                        <CancelIcon fontSize={'small'} />
                    </button>
                    {children}
                </div>
            </div>
            <div className="clientes-recebimento">
                <input
                    placeholder="Informe o nome, nº do contrato ou CPF"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button onClick={handleSearch}>
                    <SearchIcon /> PESQUISAR
                </button>
            </div>
            {isLoading && (
                <div className="loading">
                    <p>Carregando...</p>
                </div>
            )}
            <div className="pesquisar-cliente-recebimento" style={{ display: isTableVisible || isLoading ? 'none' : 'block' }}>
                <img src={Pesquisar} alt="pesquisar" />
            </div>
            {isLoading && !isSearching && (
                <div className="loading">
                    <p>Carregando...</p>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <CircularProgress color="success" />
                    </div>
                </div>
            )}
            <div className='tabela-recebimento' style={{ display: isTableVisible ? 'block' : 'none' }}>
                <TableContainer component={Paper}>
                    <Table className={classes.table} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Nome</TableCell>
                                <TableCell align="center">CPF</TableCell>
                                <TableCell align="center">Nº de Contrato</TableCell>
                                <TableCell align="center">Cidade</TableCell>
                                <TableCell align="center">Telefone</TableCell>
                                <TableCell align="center">Ultímo Pagamento</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {searchResults.map((row) => (
                                <TableRow key={row.name}>
                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="left">{row.cpf}</TableCell>
                                    <TableCell align="left">{row.numerocontrato}</TableCell>
                                    <TableCell align="left">{row.cidade}</TableCell>
                                    <TableCell align="left">{row.telefone}</TableCell>
                                    <TableCell align="left">{row.ultimoPagamento}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            {showAlert && (
                <div className="custom-alert">
                    <p>Cliente não encontrado.</p>
                </div>
            )}
        </div>
    );
};

export default FloatingWindow;