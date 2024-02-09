import axios, { AxiosError } from 'axios';

import { JobListing } from '../types';
import { baseUrl } from '../config';

type GreenhouseResponse = {
  data: {
    jobs: JobListing[];
    meta: { total: number };
  };
  status: number;
};

export function JobsQuery() {
  return axios
    .get(`${baseUrl}`)
    .then((response: GreenhouseResponse) => response.data)
    .catch((error: AxiosError) => {
      console.error('Error fetching jobs', error);
      throw new Error(error.message);
    });
}
