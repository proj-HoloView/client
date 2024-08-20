import axios from "axios";
import config from "./config";
import exceptions from './exceptions';

const url = `${config.baseUrl}/admins`;

const postAdmin = async body => {
    const res = await axios.post(url, body);

    if (res.status === 201)
        return res.data;
}

const login = async body => {
    const res = await axios.post(`${url}/login`, body);

    if (res.status === 200)
        return res.data

    throw new exceptions.AdminException('Login incorreto');
}

const admins = {
    post: postAdmin,
    login
}

export default admins;