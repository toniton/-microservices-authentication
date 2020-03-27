import { createHmac } from 'crypto';

export const hashPlainPassword = (password) =>
    createHmac('sha256', password).digest('hex');