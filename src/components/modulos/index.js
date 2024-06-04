import React, { useEffect, useState } from 'react';
import InactivityHOC from "../../services/inactivityHOC";
import Parcel from "single-spa-react/parcel";
import Desenvolvimento from "../em-desenvolvimento";
import ManualScreen from "../../pages/manual/manual";
import AcessoRapido from "../menu-acesso-rapido";
import PageChat from "../../pages/chat/chat";
import Solicitacao from "../../pages/solicitação";
import Perfil from "../../pages/perfil/index";
import { Box, Skeleton } from "@mui/material";
import Noticias from "../noticias";
import Valores from "../tabela-adesao-promocao";

const Modulos = ({ activeRoute, idioma, handleMenuClick, usuario, carregando }) => {
    const ParcelWithInactivity = InactivityHOC(Parcel);

    return (
        <>
            {activeRoute === "/pax-primavera/associado" ? (
                <ParcelWithInactivity
                    key={activeRoute}
                    config={() => {
                        try {
                            return System.import("@pax/pax-associado")
                        } catch (error) {
                            <Desenvolvimento tela="Associados" />;
                        }
                    }}
                />
            ) : activeRoute === "/pax-primavera/vendas" ? (
                <ParcelWithInactivity
                    key={activeRoute}
                    config={() => {
                        try {
                            return System.import("@pax/pax-venda")
                        } catch (error) {
                            <Desenvolvimento tela="Web Vendedor" />;
                        }
                    }}
                />
            ) : activeRoute === "/pax-primavera/financeiro" ? (
                // <Desenvolvimento tela="Financeiro" />
                <ParcelWithInactivity
                    key={activeRoute}
                    config={() => System.import("@pax/pax-financeiro")}
                />
            ) :
                activeRoute === "/pax-primavera/cobranca" ? (
                    <ParcelWithInactivity
                        key={activeRoute}
                        config={() => {
                            try {
                                return System.import("@pax/pax-cobranca")
                            } catch (error) {
                                <Desenvolvimento tela="Cobrança" />;
                            }
                        }}
                    />
                ) : activeRoute === "/pax-primavera/parcelas" ? (
                    <ParcelWithInactivity
                        key={activeRoute}
                        config={() => {
                            try {
                                return System.import("@pax/pax-parcelas")
                            } catch (error) {
                                <Desenvolvimento tela="Parcelas" />;
                            }
                        }}
                    />
                ) : activeRoute === "/pax-primavera/boletos" ? (
                    <ParcelWithInactivity
                        key={activeRoute}
                        config={() => {
                            try {
                                return System.import("@pax/pax-boletos");
                            } catch (error) {
                                <Desenvolvimento tela="Boletos" />;
                            }
                        }}
                    />
                ) : activeRoute === "/pax-primavera/relatorios" ? (
                    <ParcelWithInactivity
                        key={activeRoute}
                        config={() => {
                            try {
                                return System.import("@pax/pax-relatorio");
                            } catch (error) {
                                <Desenvolvimento tela="Gerencial" />;
                            }
                        }}
                    />
                ) : activeRoute === "/pax-primavera/configuracoes/cadastro" ? (
                    <ParcelWithInactivity
                        key={activeRoute}
                        config={() => {
                            try {
                                return System.import("@pax/pax-cadastro")
                            } catch (error) {
                                <Desenvolvimento tela="Cadastro" />;
                            }
                        }}
                    />
                ) : activeRoute === "/pax-primavera/suporte" ? (
                    <ParcelWithInactivity
                        key={activeRoute}
                        config={() => {
                            try {
                                return System.import("@pax/pax-suporte");
                            } catch (error) {
                                <Desenvolvimento tela="Suporte" />;
                            }
                        }}
                    />
                ) : activeRoute === "/pax-primavera/manual-sistema" ? (
                    <ManualScreen />
                ) : activeRoute === "/pax-primavera/chat" ? (
                    <PageChat />
                ) : activeRoute === "/pax-primavera/perfil" ? (
                    <Perfil />
                ) : activeRoute === "/pax-primavera/solicitacao" ? (
                    <Solicitacao />
                ) : activeRoute === "/pax-primavera" ? (
                    <>
                        {carregando ?
                            <Box sx={{ width: '100%' }}>
                                {/* Skeleton grande que ocupa toda a largura */}
                                <Skeleton
                                    variant="rectangular"
                                    width="100%"
                                    height={150} // Aumentado para 120
                                    sx={{ marginBottom: 2, borderRadius: 2 }} // Bordas arredondadas
                                />

                                {/* Container para os 6 Skeletons menores */}
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                                    {[...Array(6)].map((_, index) => (
                                        <Skeleton
                                            key={index}
                                            variant="rectangular"
                                            width="15%"
                                            height={60}
                                            sx={{ borderRadius: 2 }}
                                        />
                                    ))}
                                </Box>

                                {/* Container para os 2 Skeletons adicionais */}
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    {[...Array(2)].map((_, index) => (
                                        <Skeleton
                                            key={index}
                                            variant="rectangular"
                                            width="48%" // Largura de 48% para dois Skeletons
                                            height={190} // Aumentado para 60
                                            sx={{ borderRadius: 2 }} // Bordas arredondadas
                                        />
                                    ))}
                                </Box>
                            </Box>
                            :
                            <>
                                <AcessoRapido
                                    idioma={idioma}
                                    handleMenuClick={handleMenuClick}
                                    usuario={usuario} /><div className="mixed-chart">
                                    <Valores />
                                    <Noticias />
                                </div></>
                        }

                    </>
                ) : (
                    <></>
                )}
        </>
    )
}

export default Modulos;
