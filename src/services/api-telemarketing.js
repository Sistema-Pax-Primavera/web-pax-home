import { Telemarketing } from '../entities/class/telemarketing';
import httpsInstance from './url';

export const useTelemarketing = () => {
    const https = httpsInstance();

    const getTelemarketing = async () => {
        try {
            const response = await https.get("/telemarketing");
            const data = response.data;
            if (data && Array.isArray(data)) {
                const crmData = data.map(item => {
                    return new Telemarketing(item);
                });
                return crmData;
            } else {
                return null;
            }
        } catch (error) {
            if (error.response && error.response.status) {
                throw { message: error.message, status: error.response.status };
            } else {
                throw error;
            }
        }
    };


    return {
        getTelemarketing
    }
}