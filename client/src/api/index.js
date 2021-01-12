import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3333/api',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
})

export const insertPessoa= payload => api.post(`/pessoa`, payload)
export const getAllPessoas = () => api.get(`/pessoas`)
export const getPessoaById = (id) => api.get(`/pessoa/${id}`)
export const updatePessoaById = (id, payload) => api.put(`/pessoa/${id}`, payload)
export const deletePessoaById = id => api.delete(`/pessoa/${id}`)
export const getPessoa = payload => api.post(`/pessoa1`,payload)
export const getEstados = ()=>api.get(`/estados`)
export const getEstadosbyId = (id)=>api.get(`/estado/${id}`)

const apis = {
    insertPessoa,
    getAllPessoas,
    updatePessoaById,
    deletePessoaById,
    getPessoa,
    getEstados,
    getEstadosbyId,
    getPessoaById
}

export default apis