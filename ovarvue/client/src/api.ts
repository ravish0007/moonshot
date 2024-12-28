import axios, { AxiosInstance } from "axios";
import useUserStore from "@/store/userStore";
import { buildParams } from "@/lib/utils";
import { navigateTo } from "./navigationService";

const BASE_URL = import.meta.env.VITE_API_URL;

class API {
  private axios: AxiosInstance;

  constructor() {
    this.axios = axios.create({ baseURL: BASE_URL });
    this.axios.interceptors.response.use(
      // eslint-disable-next-line arrow-body-style
      (response) => {
        return response;
      },
      (error) => {
        if (error.response.status === 401) {
          sessionStorage.clear();
          useUserStore.getState().removeUser();
          navigateTo("/login");
        }
        return Promise.reject(error);
      }
    );
  }

  setAccessToken = (token: string) => {
    this.axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  };

  async getAggregates(
    age: string | null,
    gender: string | null,
    startDate: string | null,
    endDate: string | null
  ) {
    const params = {
      age,
      gender,
      start_date: startDate,
      end_date: endDate,
    };

    const response = await this.axios.get(
      `/features/aggregate?${buildParams(params)}`
    );

    return response.data;
  }

  async getTimeTrend(
    age: string | null,
    gender: string | null,
    startDate: string | null,
    endDate: string | null,
    label: string | null
  ) {
    const params = {
      age,
      gender,
      start_date: startDate,
      end_date: endDate,
      label,
    };

    // without label is a expensive network io
    if (!label) {
      return [];
    }

    const response = await this.axios.get(`/features?${buildParams(params)}`);

    return response.data;
  }

  async login(email: string, password: string) {
    try {
      const response = await this.axios.post("/auth/login", {
        email,
        password,
      });
      return { error: null, data: response.data };
    } catch (error: any) {
      if (error.response?.status === 401) {
        return { error: 401, data: null };
      }
      return { error: 500, data: null };
    }
  }

  async signup(
    email: string,
    password: string,
    first_name: string,
    last_name: string
  ) {
    try {
      const response = await this.axios.post("/auth/signup", {
        email,
        password,
        first_name,
        last_name,
      });
      return { error: null, data: response.data };
    } catch (error: any) {
      if (error.response?.status === 409) {
        return { error: 409, data: null };
      }
      return { error: 500, data: null };
    }
  }
}

export default new API();
