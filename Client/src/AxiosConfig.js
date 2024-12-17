// // src/api.js
import axios from 'axios';

const API_BASE_URL = 'http://samsangtech.dyipspot.com'; // Replace with your actual API base URL



export  const getALLCustomer = ()=>{
    return axios.get(`${API_BASE_URL}/customers`)
}
export  const getALLProducts = ()=>{
    return axios.get(`${API_BASE_URL}/products`)
}

export  const getALLOrders = ()=>{
    return axios.get(`${API_BASE_URL}/orders`)
}



export const deleteOrder = (orderId) => {
    return axios.get(`${API_BASE_URL}/order/${orderId}`);
}


export const deleteAllOrder = (orderId) => {
    return axios.get(`${API_BASE_URL}/AllOrder/${orderId}`);
}






export const updateCustomer = (id, customerData) => {
    return axios.put(`${API_BASE_URL}/api/UpdateCustomers/${id}`, customerData);
};



export const updateProduct = (id, productData) => {
    return axios.put(`${API_BASE_URL}/api/UpdateProduct/${id}`, productData);
};

export const DeleteProduct = (id) => {
    return axios.delete(`${API_BASE_URL}/api/DeleteProduct/${id}`);
};










export const AddProduct = (orderData) => {
    return axios.post(`${API_BASE_URL}/api/AddProduct`, orderData);
};

export const Validate = (Credentials) => {
    return axios.post(`${API_BASE_URL}/api/login`,Credentials);
};


export const Authorization = (token) => {
    return axios.get(
        `${API_BASE_URL}/api/user`,

        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
};
