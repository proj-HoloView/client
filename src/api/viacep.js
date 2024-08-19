import axios from "axios"

class ViacepException {
    message;

    ViacepException(message) {
        this.message = message;
    }
}

export default async function getAddress(cep) {
    const res = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);

    if(!res.data.erro)
        return res.data;

    throw new ViacepException('Endereço não encontrado');
}