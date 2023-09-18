import { API_URL } from '../utils/contants'
import axios from 'axios';

export const registerApi = async (formData) => {
    try {
        // const url = `${API_URL}/api/auth/local/register`
        // const params = {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json"
        //     },
        //     body: JSON.stringify(formData)
        // };
        // const response = await fetch(url, params)
        // const result = await response.json()
        // return result
        const result = await axios.post('http://localhost:1337/api/auth/local/register', formData)
        return result.data
    } catch (error) {
        console.log(error);
        return null
    }
}