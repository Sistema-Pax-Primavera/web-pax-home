import ErrorComponent from '../components/show-message';
import { Unidade } from '../entities/class/unidade';
import httpsInstance from './url';

export const useUnidade = () => {
    const https = httpsInstance()

    const getUnidades = async () => {
        try {
            const response = await https.get("/unidades");
            const data = response.data;
            if (data) {
                return data.map((item) => Unidade(item));
            } else {
                return null;
            }
        } catch (error) {
            if (error.response && error.response.status) {
                throw { message: error.message, status: error.response.status };
            } else {
                throw error;
            }
        }
    };

    const alterarSenha = async (senhaAtual, novaSenha, usuario) => {
        try {
            const response = await https.post("/user-senha", {
                senhaAtual: senhaAtual,
                novaSenha: novaSenha,
                usuario: usuario,
            });
            return response.data; // Retornar os dados da resposta, se necessário
        } catch (error) {
            if (error.response && error.response.status) {
                throw { message: error.message, status: error.response.status };
            } else {
                throw error;
            }
        }
    };

    return {
        getUnidades,
        alterarSenha,
    }
}