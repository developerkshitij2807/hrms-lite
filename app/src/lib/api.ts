import axios from "axios"

const API = process.env.NEXT_PUBLIC_API_URL

export const getEmployees = () => axios.get(`${API}/employees`)

export const addEmployee = (data: any) =>
  axios.post(`${API}/employees`, data)

export const deleteEmployee = (id: string) =>
  axios.delete(`${API}/employees/${id}`)

export const markAttendance = (data: any) =>
  axios.post(`${API}/attendance`, data)