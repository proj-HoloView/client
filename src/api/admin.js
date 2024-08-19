import axios from "axios";
import config from "./config";

const url = `${config.baseUrl}/admins`;

const postAdmin = async body => {
    const res = await axios.post(url, body);

    if (res.status === 201)
        return res.data;
}

const admins = {
    post: postAdmin
}

export default admins;