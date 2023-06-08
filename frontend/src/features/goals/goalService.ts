import { AxiosRequestConfig } from 'axios';
import axiosClient from '../../utils/axiosClient';

const API_URL = '/api/goals';

const getConfig = (token: string): AxiosRequestConfig => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export interface GoalData {
  text: string;
}

const createGoal = async (goalData: GoalData, token: string) => {
  const res = await axiosClient.post(API_URL, goalData, getConfig(token));

  return res.data;
};

const getGoals = async (token: string) => {
  const res = await axiosClient.get(API_URL, getConfig(token));

  return res.data;
};

const goalService = {
  createGoal,
  getGoals,
};

export default goalService;
