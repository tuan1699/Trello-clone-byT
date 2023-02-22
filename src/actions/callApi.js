import axios from "axios";
import { API_ROOT } from "../ulities/constant";

export const fetchBoard = async (id) => {
  const res = await axios.get(`${API_ROOT}/v1/boards/${id}`);
  return res.data;
};

export const createNewColumn = async (data) => {
  const req = await axios.post(`${API_ROOT}/v1/columns`, data);
  return req.data;
};

export const createNewCard = async (data) => {
  const req = await axios.post(`${API_ROOT}/v1/cards`, data);
  return req.data;
};
