import axios from "axios";
import config from "./config";
import exceptions from './exceptions';

const url = `${config.baseUrl}/shops`;

const postShop = async body => {
    const res = await axios.post(url, body);

    if (res.status === 201)
        return res.data;

    throw new exceptions.ShopException('Erro ao criar uma loja');
}

const shops = {
    post: postShop
}

export default shops;