FROM node:18-alpine

WORKDIR /app-backend

COPY package*.json ./

COPY ./prisma ./

COPY . .

EXPOSE 3001

ENV DATABASE_URL=mysql://root:password@localhost:3306/database?schema=public

RUN npm install && npm run build

CMD [ "npm", "start" ]