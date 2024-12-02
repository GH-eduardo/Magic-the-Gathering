import { useUsersStore } from '@/stores/users/user.store';
import axios, { type AxiosInstance, type AxiosRequestTransformer } from 'axios';
import { stringify } from 'qs';

function apiServiceInstance(): AxiosInstance {
    const userStore = useUsersStore();

	const isIsoDateString = (value: any) => {
		return typeof value === 'string' && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?([+-]\d{2}:\d{2}|Z)?$/.test(value);
	};

	const transformDates = (data: any): any => {
		if (typeof data === 'object' && data !== null) {
			for (const key in data) {
				if (isIsoDateString(data[key])) {
					data[key] = new Date(data[key]);
				} else if (typeof data[key] === 'object') {
					transformDates(data[key]);
				}
			}
		}
		return data;
	};

	axios.defaults.transformResponse = [
		(data) => {
			let parsedData;
			try {
				parsedData = JSON.parse(data);
			} catch (error) {
				return data;
			}
			return transformDates(parsedData);
		},
	];
	const axiosInstance = axios.create({
		baseURL: `http://${import.meta.env.VITE_SERVER_HOST}:${import.meta.env.VITE_SERVER_PORT}`,
		headers: {
			Accept: 'application/json',
            Authorization: "Bearer " + userStore.accessToken.token
		},
		transformRequest: axios.defaults.transformRequest as AxiosRequestTransformer[],
		paramsSerializer: (params) => {
			return stringify(params, {
				encode: false,
				arrayFormat: 'indices',
				allowDots: true,
				skipNulls: true
			});
		},
	});
	return axiosInstance;
}

export default apiServiceInstance;
