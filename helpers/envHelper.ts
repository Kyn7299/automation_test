// helpers/envHelper.ts
import dotenv from 'dotenv';

dotenv.config();

export const getBaseUrl = (): string => {
  const baseUrl = process.env.BASE_URL;
  if (!baseUrl) {
    throw new Error('BASE_URL is not defined in .env');
  }
  return baseUrl;
};

export const getUsername = (): string => {
  const username = process.env.USERNAME;
  if (!username) {
    throw new Error('USERNAME is not defined in .env');
  }
  return username;
};

export const getPassword = (): string => {
  const password = process.env.PASSWORD;
  if (!password) {
    throw new Error('PASSWORD is not defined in .env');
  }
  return password;
};
