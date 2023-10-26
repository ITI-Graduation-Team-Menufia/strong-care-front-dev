import { useState } from 'react';
import axios from 'axios';

export function useApiRequest() {
    const [loading, setLoading] = useState(false);

    const makeApiRequest = async (url, method = 'get', data = null, headers = {}) => {
        setLoading(true);
        try {
            const response = await axios({
                method,
                url,
                data,
                headers,
            });

            if (response.status >= 200 && response.status < 300) {
                setLoading(false);
                return response.data;
            }
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    };

    return { makeApiRequest, loading };
}