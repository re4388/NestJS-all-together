import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD
}));