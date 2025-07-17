import axios from "axios";
import { User } from "@/types/user";

const API_BASE_URL = "https://first-laravel-2-production.up.railway.app/api/users";

export const getUsers = () => {
  return axios.get<User[]>(`${API_BASE_URL}`);
};

export const getUserById = (id: string | number) => {
  return axios.get<User>(`${API_BASE_URL}/${id}`);
};

export const deleteUser = (id: number) => {
  return axios.delete(`${API_BASE_URL}/delete/${id}`);
};

export const createUser = (formData: FormData) =>
  axios.post(`${API_BASE_URL}/create`, formData);

export const updateUser = (id: number, data: FormData) =>
  axios.post(`${API_BASE_URL}/update/${id}`, data);

