import axios from "axios";
import { User } from "@/types/user";

const API_BASE_URL = "http://localhost:8000/api/users";

export const getUsers = () => {
  return axios.get<User[]>(`${API_BASE_URL}`);
};

export const deleteUser = (id: number) => {
  return axios.delete(`${API_BASE_URL}/delete/${id}`);
};

export const createUser = (formData: FormData) =>
  axios.post(`${API_BASE_URL}/create`, formData);
