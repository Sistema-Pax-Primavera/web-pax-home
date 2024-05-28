import React, { useEffect, useState } from "react";
import ColunasCobranca from "../../components/colunas-cobranca";
import "./escritorio.css";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useNavigate } from "react-router-dom";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import ButtonIcon from "../../../../pax-associado/src/components/button-icon";
import ModalLateral from "../../components/modal-lateral";
import ButtonText from "../../../../pax-associado/src/components/button-texto/index";
import ModalClientes from "../../components/modal-clientes";
import StoreIcon from '@mui/icons-material/Store';
import Checkbox from "@mui/material/Checkbox";
import { useCRM } from "../../service/api";
import { toast } from "react-toastify";
import { converterDataParaFormatoBackend } from "../../utils/fuctions";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const Atendimento = () => {
  const { getCRMEsc } = useCRM();
  const navigate = useNavigate();
  const [dadosPorColuna, setDadosPorColuna] = useState({});
  const [modalAberta, setModalAberta] = useState(false); // Estado para a modal existente
  const [modalClientes, setModalClientes] = useState(false);
  const [selectedCardData, setSelectedCardData] = useState(null);


  const handleCloseFormularioModal = () => {
    setModalClientes(false);
  };

  useEffect(() => {
    getCRMEsc()
      .then((data) => {
        const colunas = construirColunasDinamicamente(data);
        setDadosPorColuna(colunas);
      })
      .catch((error) => {
        toast.error("Erro ao obter dados do CRM:" + error);
      });
  }, []);

  return (
    <div className="container-atendimento">
      <ModalClientes
        open={modalClientes}
        onClose={handleCloseFormularioModal}
        clienteData={selectedCardData}
      />
    </div>
  );
};

export default EscritorioCobranca;
