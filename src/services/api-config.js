import { Unidade } from '../entities/class/unidade';
import httpsInstance from './url';

export const useUnidade = () => {
    const https = httpsInstance()

    const getUnidades = async () =>
        https.get("/35bea800-d5f9-484f-8b53-290a0f730e6e")
            .then(({ data }) =>
                data.map((item) =>
                    Unidade(item)
                )
            );

    return {
        getUnidades,
    }
}