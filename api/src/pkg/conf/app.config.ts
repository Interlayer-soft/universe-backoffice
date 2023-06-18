import { registerAs } from '@nestjs/config';

export const APP_CONFIG_KEY = 'app';
export const appConfig = registerAs(APP_CONFIG_KEY, () => ({
  port: parseInt(process.env.PORT, 10),
  docUrl: process.env.DOC_URL,
}));
