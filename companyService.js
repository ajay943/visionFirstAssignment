
import axios from 'axios';

export const fetchCompanies = () => axios.get('/api/companies');

export const createCompany = (companyData) => axios.post('/api/companies', companyData);

export const approveCompany = (companyId) => axios.post(`/api/companies/${companyId}/approve`);