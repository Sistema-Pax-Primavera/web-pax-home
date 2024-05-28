import React, { useState } from "react";
import "./recebimento.css";
import SearchIcon from "@mui/icons-material/Search";
import Pesquisar from "../../../assets/png/pesquisar.png";
import CancelIcon from "@mui/icons-material/Cancel";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import CircularProgress from "@mui/material/CircularProgress";
import AddAlertIcon from "@mui/icons-material/AddAlert";
import PriceChangeIcon from "@mui/icons-material/PriceChange";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import { green, red } from "@mui/material/colors";
import { Snackbar } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import { useLocation } from "react-router-dom";
import moment from "moment";
import PaidIcon from "@mui/icons-material/Paid";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import PixIcon from "@mui/icons-material/Pix";
import SourceIcon from "@mui/icons-material/Source";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(
  name,
  cpf,
  numerocontrato,
  cidade,
  telefone,
  ultimoPagamento
) {
  return { name, cpf, numerocontrato, cidade, telefone, ultimoPagamento };
}

const rows = [
  createData(
    "Carlos Henrique",
    "06777303146",
    "12345",
    "Dourados",
    "671234567",
    "20/05/2024"
  ),
  createData(
    "Diogo",
    "Ponta Porã",
    "51902630106",
    "54321",
    "6778945612",
    "28/05/2024"
  ),
];

function tabela(
  parcela, valor, datapagamento,
) {
  return { parcela, valor, datapagamento, };
}

const tabelaValores = [
  tabela(
    '01',
    "100,00",
    "22/05/2023",
  ),
  tabela(
    '02',
    "100,00",
    "22/07/2023",
  ),
];

const FloatingWindow = ({ onClose, children }) => {
  const classes = useStyles();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isTableVisible, setIsTableVisible] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [isRowClicked, setIsRowClicked] = useState(false); // New state to track if a row is clicked
  const [isSearchVisible, setIsSearchVisible] = useState(true); // New state to track visibility of search field
  const [quantidadeMensalidades, setQuantidadeMensalidades] = useState("");
  const [totalPagar, setTotalPagar] = useState("");
  const [valorOriginal, setValorOriginal] = useState("");
  const [desconto, setDesconto] = useState("");
  const [parcelasAdicionais, setParcelasAdicionais] = useState([]);
  const [receberDisponivel, setReceberDisponivel] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const hoje = moment().format("DD/MM/YYYY");
  const hora = moment().format("HH:mm");
  const [mensagemCor, setMensagemCor] = useState(red[500]);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setReceberDisponivel(false);
    setOpen(false);
  };
  const location = useLocation();
  const cliente = location.state && location.state.cliente;
  const [novaParcela, setNovaParcela] = useState({
    formaPagamento: "Dinheiro",
    conta: "Conta 1",
    valor: "",
  });

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

  const handleClose2 = () => {
    setSearchTerm("");
    setIsTableVisible(false);
    setShowAlert(false);
    setIsSearching(false);
    setIsLoading(false);
    onClose();
  };

  const handleInputBlur = () => {
    if (searchTerm.trim() === "") {
      setIsTableVisible(false);
      setShowAlert(false);
      setIsSearching(false);
    }
  };

  const handleRowClick = () => {
    setIsRowClicked(true); // Set isRowClicked to true when a row is clicked
    setIsSearchVisible(false); // Hide search field when a row is clicked
  };

  const imprimirComprovante = async () => {
    let conteudoComprovante = `
<style>

  @media print {
    /* Oculta cabeçalho e rodapé padrão do navegador */
    @page {
    margin:0;
      margin-top: 0;
      margin-bottom: 0;
    }
    body {
        
      padding-top:0; /* Adicione um espaço para a margem superior do comprovante */
    }
    /* Adicione outros estilos de impressão personalizados aqui */
  }

  /* Estilos visíveis na tela */
  body {
    font-family: Arial, sans-serif;
    font-size: 11px;
    margin: 25px;
  }
  .titulo {
    text-align: center;
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 5px;
  }
  .subtitulo {
    text-align: center;
    font-size: 12px;
    margin-bottom: 5px;
  }
  .cnpj {
    text-align: center;
    font-size: 10px;
  }
  .info {
    font-size: 11px;
    margin-bottom: 5px;
  }
  .linha {
    border-bottom: 1px solid #000;
    margin-bottom: 5px;
  }
  .parcela {
    display: flex;
    justify-content: space-between;
    margin-bottom: 5px;
  }
  .total {
    display: flex;
    justify-content: space-between;
    font-weight: bold;
    margin-bottom: 5px;
  }
  .contrato {
    margin-bottom: 5px;
  }
  .cliente {
    margin-bottom: 5px;
  }
  .obs {
    font-size: 11px;
    margin-bottom: 5px;
  }
  .assinatura {
    margin-top: 10px;
    text-align: center;
    font-weight: bold;
  }
</style>
<div class="titulo">PAX PRIMAVERA</div>
<div class="cnpj">CNPJ </div>
<div class="subtitulo">TELEFONE (67) 3411 - 8200</div>
<div class="subtitulo">IMPRESSÃO</div>
<br>
<div class="info">
    <div class="parcela">
        <div>DATA: ${hoje}</div>
        <div>HORA: ${hora}</div>
    </div>
</div>
<div class="info">USUARIO:</div>
<div class="linha"></div>
<div class="parcela">
  <div>Parcela</div>
  <div>VALOR</div>
</div>
<div class="linha"></div>
<div class="parcela">
<div class="data-vencimento">Data Vencimento</div>
<div class="valor">Valor</div>
</div> 
    </div>
<div class="linha"></div>
<div class="total">
  <div>2 Parcelas</div>
  <div>TOTAL = 300</div>
</div>
<div class="linha"></div>
<div class="contrato">Data Pagamento: ${hoje}</div>
<div class="contrato">Contrato: 00000</div>
<div class="contrato">Regiao: COBRADOR</div>
<div class="cliente">
ADERBAL TESTE<br>
  RUA DOS BOBOS, N 0, BAIRRO DOIDO<br>
</div>
<div class="linha"></div>
<div class="obs">BAIXE NOSSO APLICATIVO PAX PRIMAVERA<br>E CONFIRA NOSSAS PROMOÇÕES!</div>
<div class="info">INFORMAÇÕES (67) 99680-8200</div>
<br></br>
<div class="linha"></div>
<div class="assinatura">ADMINISTRADOR</div>
`;
    const janelaImprimir = window.open("", "_blank");
    janelaImprimir.document.write(conteudoComprovante);
    janelaImprimir.document.close();

    // Verifica se a janela foi aberta corretamente
    if (janelaImprimir && !janelaImprimir.closed) {
      // Chama o método de impressão diretamente na janela atual
      janelaImprimir.print();
    } else {
      // Se não foi possível abrir uma nova janela, imprime na janela atual
      window.print();
    }
  };

  const formaPagamentoIcone = {
    Dinheiro: CurrencyExchangeIcon,
    Débito: CreditScoreIcon,
    Crédito: CreditScoreIcon,
    PIX: PixIcon,
    Cheque: SourceIcon,
  };

  const renderizarIconeFormaPagamento = (formaPagamento) => {
    const Icone = formaPagamentoIcone[formaPagamento];
    if (Icone) {
      return <Icone fontSize={"small"} />;
    } else {
      return null; // Retornar null se não houver correspondência de ícone
    }
  };

  const handleQuantidadeChange = (event) => {
    const quantidade = event.target.value;
    const novoValor = parseFloat(quantidade);
    if (!isNaN(novoValor) && novoValor >= 0) {
      setQuantidadeMensalidades(quantidade);
      const valorParcela = 100; // Valor fixo por parcela
      const total = valorParcela * quantidade; // Calcula o valor total
      setValorOriginal(total.toFixed(2)); // Atualiza o valor original
      setTotalPagar(total.toFixed(2)); // Atualiza o valor total
      setDesconto("");
    } else {
      alert("Digite um valor válido (positivo ou zero)");
      setQuantidadeMensalidades("");
    }
  };

  const handleChange = (index, campo, valor) => {
    const newParcelas = [...parcelasAdicionais];
    if (campo === "formaPagamento") {
      newParcelas[index].formaPagamento = valor;
    } else if (campo === "valor") {
      newParcelas[index].valor = valor;
    }
    setParcelasAdicionais(newParcelas);
  };

  const aplicarDesconto = () => {
    const valorComDesconto =
      parseFloat(valorOriginal) - parseFloat(desconto || 0);
    const valorComDescontoFormatado = valorComDesconto.toFixed(2);
    setTotalPagar(valorComDescontoFormatado);
    setReceberDisponivel(true);
  };



  const handleNovaParcelaChange = (campo, valor) => {
    setNovaParcela({
      ...novaParcela,
      [campo]: valor,
    });
  };

  const handleAdicionarParcela = () => {
    if (!novaParcela.valor || isNaN(parseFloat(novaParcela.valor))) {
      alert("Digite um valor válido para a parcela.");
      return;
    }

    // Verifica se a forma de pagamento é Cheque ou PIX
    if (["Cheque", "PIX"].includes(novaParcela.formaPagamento)) {
      // Se for Cheque ou PIX, verifica se a conta está selecionada
      if (!novaParcela.conta) {
        alert("Selecione uma conta para a forma de pagamento Cheque ou PIX.");
        return;
      }
    }

    setParcelasAdicionais([...parcelasAdicionais, { ...novaParcela }]);
    setNovaParcela({
      formaPagamento: "Dinheiro",
      conta: "Conta 1",
      valor: "",
    });
  };

  const handleRemoverParcela = (index) => {
    const novasParcelas = parcelasAdicionais.filter((_, i) => i !== index);
    setParcelasAdicionais(novasParcelas);
  };

  const handleReceber = () => {
    let somaValores = parseFloat(totalPagar);
    parcelasAdicionais.forEach((parcela) => {
      somaValores -= parseFloat(parcela.valor);
    });

    if (somaValores === 0) {
      setMensagem("Pagamento Realizado!");
      setMensagemCor(green[500]);
      // Verifica se a forma de pagamento é PIX
      const isPixPayment = parcelasAdicionais.some(
        (parcela) => parcela.formaPagamento === "PIX"
      );
      if (isPixPayment) {
        handleOpen();
        setParcelasAdicionais([]);
        setQuantidadeMensalidades("");
        setValorOriginal("");
        setDesconto("");
      } else {
        setParcelasAdicionais([]);
        setQuantidadeMensalidades("");
        setValorOriginal("");
        setDesconto("");
        imprimirComprovante();
      }
    } else if (somaValores > 0) {
      setMensagem("Pagamento incompleto!");
      setMensagemCor(red[500]);
    } else if (somaValores < 0) {
      setMensagem("Pagamento excede o valor a receber!");
      setMensagemCor(red[500]);
    } else {
      setMensagem("Pagamento não realizado!");
      setMensagemCor(red[500]);
    }
  };

  const handleCloseMensagem = () => {
    setMensagem("");
  };

  return (
    <div className="floating-window">
      <div className="floating-window2">
        <label>
          <PaidIcon /> Recebimento
        </label>
        <div className="window-content">
          <button className="close-button" onClick={handleClose2}>
            <CancelIcon fontSize={"small"} />
          </button>
          {children}
        </div>
      </div>
      {isSearchVisible && ( // Render search field only if it's visible
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
      )}
      {isLoading && (
        <div className="loading">
          <p>Carregando...</p>
        </div>
      )}
      <div
        className="pesquisar-cliente-recebimento"
        style={{
          display:
            isTableVisible || isLoading || !isSearchVisible ? "none" : "block",
        }}
      >
        <img src={Pesquisar} alt="pesquisar" />
      </div>
      {isLoading && !isSearching && (
        <div className="loading">
          <p>Carregando...</p>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircularProgress color="success" />
          </div>
        </div>
      )}
      {!isRowClicked && ( // Render table only if no row is clicked
        <div
          className="tabela-recebimento"
          style={{ display: isTableVisible ? "block" : "none" }}
        >
          <TableContainer component={Paper}>
            <Table
              className={classes.table}
              size="small"
              aria-label="a dense table"
            >
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
                  <TableRow key={row.name} onClick={handleRowClick}>
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
      )}
      {!isRowClicked &&
        showAlert && ( // Render alert only if no row is clicked
          <div className="custom-alert">
            <p>Cliente não encontrado.</p>
          </div>
        )}
      {isRowClicked && (
        <div className="recebimento-home">
          <div className="info-recebi-home">
            <div className="aberto-home">
              <label>EM ABERTO</label>
              <div className="aberto-reci-home">
                <AddAlertIcon fontSize="small" />
                <input placeholder="1" disabled={true} value={2} />
              </div>
            </div>
            <div className="aberto-home">
              <label>VALOR</label>
              <div className="aberto-reci-home">
                <PaidIcon fontSize="small" />
                <input placeholder="2" disabled={true} value={300} />
              </div>
            </div>
            <div className="aberto-home">
              <label>VALOR PLANO</label>
              <div className="aberto-reci-home">
                <PriceChangeIcon fontSize="small" />
                <input placeholder="1" disabled={true} value={2} />
              </div>
            </div>
            <div className="ult-mes-pago-home">
              <label>ULT. MÊS PAGO</label>
              <div className="aberto-reci-home">
                <CalendarMonthIcon fontSize="small" />
                <input placeholder="1" disabled={true} value={2} />
              </div>
            </div>
            <div className="ult-mes-pago-home">
              <label>ULT. PAGAMENTO</label>
              <div className="aberto-reci-home">
                <EventAvailableIcon fontSize="small" />
                <input placeholder="1" disabled={true} value={2} />
              </div>
            </div>
          </div>
          <div className="tabela-acerto-recebimento2">
            <div className="recebimento-associado">
              <div className="campos-recebimento">
                <div className="linhas-recebimento-home">
                  <div className="recebimento-01-home">
                    <label>Quant. Mensalidades</label>
                    <input
                      type="number"
                      value={quantidadeMensalidades}
                      onChange={handleQuantidadeChange}
                    />
                  </div>
                  <div className="recebimento-02-home">
                    <label>Total a Pagar</label>
                    <input value={valorOriginal} readOnly />
                  </div>
                  <div className="recebimento-02-home">
                    <label>Desconto</label>
                    <input
                      type="number"
                      value={desconto}
                      onChange={(e) => setDesconto(e.target.value)}
                    />
                  </div>
                  <button onClick={aplicarDesconto}>APLICAR DESCONTO</button>
                  <div className="recebimento-01-home">
                    <label>Valor com Desconto</label>
                    <input type="number" value={totalPagar} disabled />
                  </div>
                </div>
              </div>
            </div>
            <div></div>
            {receberDisponivel ? (
              <div className="pag-dupl-men">
                <div className="duplica-adiciona-recebimento">
                  <div className="container-linha-recebimento">
                    <div className="resultado-forma-pagamento">
                      <div key={1} className="pag-forma-valor-rec">
                        <div className="forma-pagamento-home">
                          <label>Forma de Pagamento</label>
                          <select
                            value={novaParcela.formaPagamento}
                            onChange={(e) =>
                              handleNovaParcelaChange(
                                "formaPagamento",
                                e.target.value
                              )
                            }
                          >
                            <option>Dinheiro</option>
                            <option>Débito</option>
                            <option>Crédito</option>
                            <option>PIX</option>

                            <option>Cheque</option>
                          </select>
                        </div>
                        {["Dinheiro", "Débito", "Crédito"].includes(
                          novaParcela.formaPagamento
                        ) ? null : (
                          <div className="conta-bancaria-home">
                            <label>Conta</label>
                            <select
                              value={novaParcela.conta}
                              onChange={(e) =>
                                handleNovaParcelaChange("conta", e.target.value)
                              }
                            >
                              <option>Conta 1</option>
                              <option>Conta 2</option>
                              <option>Conta 3</option>
                            </select>
                          </div>
                        )}
                        <div className="conta-bancaria-home">
                          <label>Valor a Pagar</label>
                          <input
                            type="number"
                            value={novaParcela.valor}
                            onChange={(e) =>
                              handleNovaParcelaChange("valor", e.target.value)
                            }
                          />
                        </div>
                        <div className="adicionar-recebimento-home">
                          <button onClick={handleAdicionarParcela}>
                            <AddCircleOutlineIcon fontSize={"small"} />
                          </button>
                        </div>
                      </div>
                      {parcelasAdicionais.length > 0 && (
                        <div className="lista-parcelas">
                          <div>
                            {parcelasAdicionais.map((parcela, index) => (
                              <div
                                className="container-valores-recebimento"
                                key={index}
                              >
                                <div className="tipo-pagamento-recebimento-home">
                                  <div className="tipo-pagamento-2-home">
                                    {renderizarIconeFormaPagamento(
                                      parcela.formaPagamento
                                    )}
                                    <label>{parcela.formaPagamento}</label>
                                  </div>
                                </div>
                                <div className="tipo-pagamento-recebimento-3-home">
                                  <h2> Valor $</h2>
                                  <label>{parcela.valor}</label>
                                </div>
                                {/* Exibir campo de conta apenas se a forma de pagamento for "PIX" ou "Cheque" */}
                                {["PIX", "Cheque"].includes(
                                  parcela.formaPagamento
                                ) && (
                                    <div className="tipo-pagamento-recebimento-3-home">
                                      <h2> Conta</h2>
                                      <label>{parcela.conta}</label>
                                    </div>
                                  )}
                                <div className="remove-forma-paga-home">
                                  <button
                                    onClick={() => handleRemoverParcela(index)}
                                  >
                                    <CancelIcon />
                                  </button>
                                </div>
                              </div>
                            ))}
                            <div className="receber-add-recebimento-home">
                              {receberDisponivel ? (
                                <>
                                  <button
                                    onClick={handleReceber}
                                    disabled={!receberDisponivel}
                                  >
                                    RECEBER
                                  </button>
                                </>
                              ) : (
                                <></>
                              )}

                              <Modal
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                              >
                                <Box sx={style}>
                                  <Typography
                                    id="modal-modal-title"
                                    variant="h6"
                                    component="h2"
                                  >
                                    <div className="icones-nome">
                                      <label>
                                        <CurrencyExchangeIcon
                                          fontSize={"small"}
                                        />
                                        Acertar pagamento
                                      </label>
                                    </div>
                                  </Typography>
                                  <Typography
                                    id="modal-modal-description"
                                    sx={{ mt: 2 }}
                                  >
                                    <div>
                                      <label>
                                        Aponte para o QR code e realize o
                                        pagamento!
                                      </label>
                                      <button
                                        onClick={() => imprimirComprovante()}
                                      >
                                        IMPRIMIR COMPROVANTE
                                      </button>
                                    </div>
                                  </Typography>
                                </Box>
                              </Modal>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="acordion-recebimento">
                      <div>
                        <TableContainer
                          component={Paper}
                          style={{ maxHeight: 210 }}
                        >
                          <Table
                            sx={{ minWidth: 200 }}
                            aria-label="simple table"
                          >
                            <TableHead>
                              <TableRow sx={{ backgroundColor: "#006b33" }}>
                                <TableCell
                                  align="start"
                                  sx={{
                                    fontSize: 5,
                                    backgroundColor: "#006b33",
                                    color: "#ffff",
                                    paddingY: 1,
                                  }}
                                >
                                  Data Vencimento
                                </TableCell>
                                <TableCell
                                  align="start"
                                  sx={{
                                    fontSize: 5,
                                    backgroundColor: "#006b33",
                                    color: "#ffff",
                                    paddingY: 1,
                                  }}
                                >
                                  Valor
                                </TableCell>
                                <TableCell
                                  align="center"
                                  sx={{
                                    backgroundColor: "#006b33",
                                    fontSize: 5,
                                    color: "#ffff",
                                    paddingY: 1,
                                  }}
                                >
                                  Data Pagamento
                                </TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {tabelaValores.map((tabelaValore) => (
                                <TableRow
                                  key={tabelaValore.parcela}
                                  sx={{
                                    "&:last-child td, &:last-child th": {
                                      border: 0,
                                    },
                                  }}
                                >
                                  <TableCell
                                    align="center"
                                    sx={{ fontSize: 10 }}
                                  >
                                    {tabelaValore.parcela}
                                  </TableCell>
                                  <TableCell
                                    align="center"
                                    sx={{ fontSize: 10 }}
                                  >
                                    {tabelaValore.valor}
                                  </TableCell>
                                  <TableCell
                                    align="center"
                                    sx={{ fontSize: 10 }}
                                  >
                                    {tabelaValore.datapagamento}
                                  </TableCell>


                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <></>
            )}

            <Snackbar
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              open={mensagem !== ""}
              autoHideDuration={6000}
              onClose={handleCloseMensagem}
              message={mensagem}
              ContentProps={{
                style: { backgroundColor: mensagemCor },
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default FloatingWindow;
