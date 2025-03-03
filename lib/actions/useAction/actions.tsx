import axios from "axios";
import { User } from "@/types/user";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;
axios.defaults.headers.common["Authorization"] = `Bearer ${process.env.NEXT_PUBLIC_GOREST_TOKEN}`;

// Fetch Users (GET)
export const fetchUsers = async (): Promise<User[]> => {
  const response = await axios.get<User[]>("/users");
  return response.data;
};
// Create User (POST)
export const createUser = async (user: Partial<User>): Promise<User> => {
  console.log("Creating user with data:", user);

  const response = await axios.post<User>("/users", user, {
    headers: { "Content-Type": "application/json" },
  });

  return response.data;
};
// Update User (PUT)
export const updateUser = async (id: number, user: Partial<User>): Promise<User> => {
  const response = await axios.put<User>(`users/${id}`, user);
  return response.data;
};

// Delete User (DELETE)
export const deleteUser = async (id: number): Promise<void> => {
  await axios.delete(`users/${id}`);
};
