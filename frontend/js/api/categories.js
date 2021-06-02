import api from './index.js';

export const createNewCategory = async ({name,color})=>{
	const { data } = await api.post('/categories', { name, color });
	return data;
}

export const getMyCategories = async ()=>{
	const { data } = await api.get('/categories');
	return data;
}

export const selectCategories = async ()=>{
	const { data } = await api.get('/categories');
	return data;
}

export const UpdateCategory = async (_id, update)=>{
	const { data } = await api.put(`/categories/${_id}`, update);
	return data;
}

export const deleteOneCategory = async (_id)=>{
	const { data } = await api.delete(`/categories/${_id}`);
	return data;
}