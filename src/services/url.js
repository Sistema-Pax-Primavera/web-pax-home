import axios from "axios";

const httpsInstance = () => {
    let token = '';
    const savedUsuario = localStorage.getItem("usuario");
    if (savedUsuario) {
        const usuarioObj = JSON.parse(savedUsuario);
        token = usuarioObj.token;
    }
    const API_URL = 'https://run.mocky.io/v3'
    const headers = {
        "Access-Control-Allow-Origin": "*",
    }
    headers.Authorization = `Bearer ${token}`;
    const httpsAuthenticated = axios.create({
        baseURL: API_URL,
        headers
    })
    return httpsAuthenticated
}

export default httpsInstance;