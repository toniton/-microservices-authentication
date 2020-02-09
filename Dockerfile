FROM node:13.7.0-alpine3.10

WORKDIR /

ENV PATH /node_modules/.bin:${PATH}

COPY . .

RUN npm install

RUN npm run build

EXPOSE 8090

ENTRYPOINT [ "npm", "start" ]