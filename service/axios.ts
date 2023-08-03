import axios from "axios";
import { Solicitud } from "../interface/Sgd";

const newAxios = axios.create({
    baseURL: '/api',
    // headers: { 'Content-Type': 'application/json'}
});

//crear objecto de respuesta al front
// {
//     status:
//     data: {}
// }

export const getAllSolicitud = async (url: string): Promise<Solicitud []> => {
    const response = await newAxios.get<any>(`${url}`)
    return response.data.data
}

export const getOneSolicitud = async (url: string): Promise<Solicitud> => {
    const response = await newAxios.get<any>(`${url}`)
    return response.data.data
}