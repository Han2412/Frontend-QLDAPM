import axios from "axios";

const axiosBaseQuery =
  ({ baseUrl }) =>
  async ({ url, method, data, params }) => {
    try {
      const token = localStorage.getItem("token");

      // Nếu data là FormData thì không set Content-Type
      const isFormData = data instanceof FormData;

      const headers = {
        ...(isFormData ? {} : { "Content-Type": "application/json" }),
        ...(token && { Authorization: `Bearer ${token}` }),
      };

      const result = await axios({
        url: baseUrl + url,
        method,
        data,
        params,
        headers,
      });

      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response || err.message,
        },
      };
    }
  };

export default axiosBaseQuery;
