// Tables.js
import React from 'react';
import './tabelas.css';

const AdesaoTable = () => {
    return (
        <div className="table-container">
            <h4 className="table-title">ADESÕES</h4>
            <table>
                <thead>
                    <tr>
                        <th>Estado</th>
                        <th>Plano 1</th>
                        <th>Plano 2</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>MS</td>
                        <td>100</td>
                        <td>200</td>
                    </tr>
                    <tr>
                        <td>PR</td>
                        <td>300</td>
                        <td>400</td>
                    </tr>
                    <tr>
                        <td>GO</td>
                        <td>500</td>
                        <td>600</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

const PromocaoTable = () => {
    return (
        <div className="table-container2">
            <h4 className="table-title">PROMOÇÕES</h4>
            <table>
                <thead>
                    <tr>
                        <th>Parcela</th>
                        <th>Desconto</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>5%</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>10%</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export { AdesaoTable, PromocaoTable };
