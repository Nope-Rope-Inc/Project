import api from './index.js';

export const createNewTask = async ({name,description,importance,complited,category})=>{
	const { data } = await api.post('/tasks', { name,description,importance,complited, category });

	return data;

}
export const GetMyTasks = async ()=>{
	const { data } = await api.get('/tasks');
	return data;
}

export const SetTaskStatus = async (_id,update)=>{
	const { data } = await api.put(`/tasks/${_id}`,update);
	return data;

}

export const GetOneTask = async (_id)=>{
	const { data } = await api.get(`/tasks/${_id}/`);
	return data;
}

export const UpdateTask = async (_id, update)=>{
	const { data } = await api.put(`/tasks/${_id}`, update);
	return data;
}

export const DeleteOneTask = async (_id)=>{
	const { data } = await api.delete(`/tasks/${_id}/`);
	return data;
}