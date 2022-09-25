import axios from "axios";

export const getCurrentPi = () => {
    return axios.get('https://o2gcjrpc5k.execute-api.ap-southeast-1.amazonaws.com/default/GET-Pi')
        .then(res => res).catch((e) => {
            throw e
        })
}

export const calculateMoreAccuratePi = () => {
    return axios.get('https://o2gcjrpc5k.execute-api.ap-southeast-1.amazonaws.com/default/POST-CalculatePi')
        .then(res => res.data).catch((e) => {
            throw e
        })
}