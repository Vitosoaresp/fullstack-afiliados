FROM node:18-alpine

WORKDIR /app-frontend

COPY package*.json ./

RUN npm install

EXPOSE 3000

COPY . .

CMD [ "npm", "start" ]