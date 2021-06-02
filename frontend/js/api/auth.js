import api from './index.js';

export const signUp = async ({ name, email, password }) => {
	const { data } = await api.post('/sign-up', { name, email, password });
	return data;
};

export const signIn = async ({ email, password }) => {
	const { data } = await api.post('/sign-in', { email, password });
	return data;
};

export const signOut = async () => {
	await api.get('/sign-out');
};

export const checkAuth = async () => {
	await api.get('/check-auth');
};

export const createNewCategory = async ()=>{
	const { data } = await api.post('/categories', { name, color });
	return data;
}