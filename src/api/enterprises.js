import api from "./axios";

export const getAllEnterprises = async () => {
  const response = await api.get("/enterprises");
  return response.data;
};

export const createEnterprise = async (enterpriseData) => {
    try {
        const response = await api.post('/enterprises', enterpriseData);
        response.data;
    } catch (error) {
        console.error("Error to create the enterprise", error);
    }
}
