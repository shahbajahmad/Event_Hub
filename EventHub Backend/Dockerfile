# Backend Dockerfile
FROM node:20.11.0

WORKDIR /usr/src/app
RUN rm -rf node_modules package-lock.json


COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm", "start"]
