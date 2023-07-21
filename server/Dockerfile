FROM node:18-alpine

WORKDIR /app-backend

COPY package*.json ./

COPY prisma ./prisma/

COPY . .

EXPOSE 3001

RUN npm install && npm run build

CMD [ "npm", "start" ]