FROM node:13.7.0-alpine3.10

RUN npm install

ENTRYPOINT [ "npm", "run start" ]