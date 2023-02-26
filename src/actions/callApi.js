import axios from "axios";
import { API_ROOT } from "../ulities/constant";

export const fetchBoard = async (id) => {
  const res = await axios.get(`${API_ROOT}/v1/boards/${id}`);
  return res.data;
};

export const updateBoard = async (id, data) => {
  const res = await axios.put(`${API_ROOT}/v1/boards/${id}`, data);
  return res.data;
};

export const createNewColumn = async (data) => {
  const req = await axios.post(`${API_ROOT}/v1/columns`, data);
  return req.data;
};

export const updateTitle = async (id, data) => {
  const req = await axios.put(`${API_ROOT}/v1/columns/${id}`, data);
  return req.data;
};

export const deleteColumn = async (id, data) => {
  const req = await axios.put(`${API_ROOT}/v1/columns/${id}`, data);
  return req.data;
};

export const createNewCard = async (data) => {
  const req = await axios.post(`${API_ROOT}/v1/cards`, data);
  return req.data;
};

export const updateCard = async (id, data) => {
  const req = await axios.put(`${API_ROOT}/v1/cards/${id}`, data);
  return req.data;
};
