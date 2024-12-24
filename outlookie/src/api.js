import axios from "axios";

const BASE_URL = "https://flipkart-email-mock.vercel.app";

class API {
  constructor() {
    this.axios = axios.create({ baseURL: BASE_URL });
  }

  async getEmails(page) {
    try {
      const response = await this.axios.get(`?page=${page}`);

      console.log(response.data);
      return response.data;
    } catch (error) {
      if (error?.code == "ERR_BAD_RESPONSE") {
        return { list: [] };
      }
      throw error;
    }
  }

  async getEmail(email_id) {
    try {
      const response = await this.axios.get(`?id=${email_id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default new API();
