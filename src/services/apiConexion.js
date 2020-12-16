import axios from 'axios';

let url_base = "https://api.rawg.io/api/games";

export const apiGet = async () => {
    try {
        let result = await axios.get(url_base);
        return result.data;   
    } catch (error) {
        console.error(error);
    }
};