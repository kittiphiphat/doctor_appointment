import axios from "axios";


const API_KEY = process.env.NEXT_PUBLIC_STRAPI_API_KEY;

const axiosClient = axios.create({
  baseURL: "http://localhost:1337/api",  
  headers: {
    "Authorization": `Bearer ${API_KEY}`,
    "Content-Type": "application/json",
  },
});


const getCategory = () => axiosClient.get("/categories?populate=Icon");
const getDoctorList = () => axiosClient.get("/doctors?populate=*");


const getDoctorByCategory = (category) => {
  if (!category) {
    console.error("Category is undefined or empty.");
    return Promise.reject("Invalid category.");
  }
  return axiosClient.get(`/doctors?filters[categories][Name][$in]=${encodeURIComponent(category)}&populate=*`);
};


const getDoctorById = (id) => axiosClient.get(`/doctors/${id}?populate=*`);


const bookAppointment = (data) => {
  return axiosClient.post("/appointments", data); 
};

const sendEmail = (data) => axios.post('/api/sendEmail',data);


export default {
  getCategory,
  getDoctorList,
  getDoctorByCategory,
  getDoctorById,
  bookAppointment,
  sendEmail
};
