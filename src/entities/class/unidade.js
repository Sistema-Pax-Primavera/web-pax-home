import { formatCNPJ, formatCEP, formatarTelefone } from '../../utils/fuctions';

export const Unidade = (data) => ({
    id: data?.id,
    nome_unidade: data?.unidade,
    cnpj: formatCNPJ(data?.cnpj),
    endereco_filial: data?.endereco,
    uf: data?.estado,
    cep: formatCEP(data?.cep),
    telefone: formatarTelefone(data?.telefone),
    email: data?.email,
    permissao: data?.permissao

})