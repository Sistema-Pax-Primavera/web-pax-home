import React, { useState } from 'react';
import './tabela-adesao-promocao.css';
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const Valores = ({ }) => {
    const [showTable, setShowTable] = useState(true);
    const [selectedOption, setSelectedOption] = useState("Adesão");

    const dadosPromocao = [
        { parcela: 1, valor: 10.0 },
        { parcela: 2, valor: 13.0 },
    ];

    const dadosAdesao = [
        {
            estado: "MS",
            planos: [
                { nome: "Plano 1", valor: 120.0 },
                { nome: "Plano 2", valor: 180.0 },
                { nome: "Plano 3" },
            ],
        },
        {
            estado: "PR",
            planos: [
                { nome: "Plano 1", valor: 130.0 },
                { nome: "Plano 2", valor: 110.0 },
                { nome: "Plano 3", valor: 160.0 },
            ],
        },
        {
            estado: "GO",
            planos: [{ nome: "Plano 1", valor: 160.0 }],
        },
    ];

    const handleButtonClick = (option) => {
        setSelectedOption(option);
        setShowTable(true);
    };

    return (
        <div className="button-group-container">
            <div className="tabela-botao-associado">
                <ButtonGroup
                    disableElevation
                    variant="contained"
                    aria-label=" elevation buttons"
                    style={{ background: "#006b33" }}
                >
                    <Button
                        onClick={() => handleButtonClick("Promoção")}
                        style={{
                            border: "3px white",
                            background: "#006b33",
                            borderBottom:
                                selectedOption === "Promoção"
                                    ? "3px solid yellow"
                                    : "",
                        }}
                    >
                        <div className="adesao-promocao">
                            <label>Promoções</label>
                        </div>
                    </Button>
                    <Button
                        onClick={() => handleButtonClick("Adesão")}
                        style={{
                            background: "#006b33",
                            borderBottom:
                                selectedOption === "Adesão"
                                    ? "3px solid yellow"
                                    : "",
                        }}
                    >
                        <div className="adesao-promocao">
                            <label>Adesão</label>
                        </div>
                    </Button>
                    <Button
                        style={{
                            background: "#006b33",
                            borderBottom:
                                selectedOption === "Adesão"
                                    ? "3px solid yellow"
                                    : "",
                        }}
                    >
                        <div className="adesao-promocao">
                            <select>
                                <option>Dourados</option>
                                <option>Itaporã</option>
                            </select>
                        </div>
                    </Button>
                </ButtonGroup>
            </div>
            {showTable && selectedOption === "Adesão" && (
                <div className="tabela-abaixo-botoes">
                    <TableContainer
                        component={Paper}
                        className="TableContainer"
                    >
                        <Table
                            sx={{ maxWidth: 1100 }}
                            aria-label="simple table"
                        >
                            <TableHead className="TableHead">
                                <TableCell align="center">Estado</TableCell>
                                {dadosAdesao[0]?.planos.map(
                                    (plano, index) => (
                                        <TableCell key={index} align="center">
                                            {plano.nome}
                                        </TableCell>
                                    )
                                )}
                            </TableHead>
                            <TableBody className="TableBody">
                                {dadosAdesao.map((row, index) => (
                                    <TableRow key={index}>
                                        <TableCell align="center">
                                            {row.estado}
                                        </TableCell>
                                        {row.planos.map((plano, planoIndex) => (
                                            <TableCell
                                                key={planoIndex}
                                                align="center"
                                            >
                                                {plano.valor}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            )}
            {showTable && selectedOption === "Promoção" && (
                <div className="tabela-abaixo-botoes">
                    <TableContainer
                        component={Paper}
                        className="TableContainer"
                    >
                        <Table
                            sx={{ maxWidth: 1100 }}
                            aria-label="simple table"
                        >
                            <TableHead className="TableHead">
                                <TableRow>
                                    <TableCell align="center">
                                        Parcela
                                    </TableCell>
                                    <TableCell align="center">
                                        Valor R$
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody className="TableBody">
                                {dadosPromocao.map((row, index) => (
                                    <TableRow key={index}>
                                        <TableCell align="center">
                                            {row.parcela}
                                        </TableCell>
                                        <TableCell align="center">
                                            {row.valor}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            )}
        </div>
    );
};

export default Valores;

