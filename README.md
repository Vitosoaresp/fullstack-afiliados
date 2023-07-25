# Fullstack Afiliados

![image](https://github.com/Vitosoaresp/fullstack-afiliados/assets/23152592/44778178-c183-4edb-8188-310d00fa08fa)

# Contexto
> This is a challenge by [Coodesh](https://coodesh.com/)

## Técnologias usadas

Front-end:
> Desenvolvido usando: [React](https://react.dev/), Typescript, Axios, Reach-hook-form, Material UI, SWR, Zod, Vite

Back-end:
> Desenvolvido usando: NodeJS, ExpressJS, Typescript, MYSQL, Zod, jsonwebtoken, bcrypt, Prisma, mocha, chai, sinon, tsx

## Configurando aplicação

> Configurar o banco de dados

- Caso tenha o MySQL instalado, configure as variaveis de ambiente
- Caso não tenha o docker já esta configurado para subir um banco de dados.

* env do Backend

```
DATABASE_URL="mysql://user:password@localhost:3306/mydb"
JWT_SECRET=
```

* env do Frontend
```
VITE_API_URL=
```
> Suba as migrations do Prisma para o db

- Com o banco já configurado, e rodando, suba as migrations do prisma para a criação das tabelas utilizando o seguinte comando no backend
```
cd server/ && npm run db:start
```
Ou via docker
```
docker exec -it backend sh
npm run db:start
```

## Portas da Aplicação
> Frontend 3000

> Backend 3001

> Prisma studio 5555

> Banco de Dados 3306


## Rodar via Docker

#### Subir o docker-compose
```
docker-compose up -d
```
![image](https://github.com/Vitosoaresp/fullstack-afiliados/assets/23152592/d207dc42-6cd9-4b2c-96b7-49cc91ff4f81)




## Rodar sem o docker

#### Instalar as dependências

> Backend
```bash
cd server/ 
npm install
``` 
> Frontend
```bash
cd web/
npm install
``` 
#### Executando aplicação

* Para rodar o back-end:

  ```
    cd server/ && npm run build && npm start
  ```

  Ou

  ```
    cd server/ && npm run dev
  ```
* Para rodar o front-end:

  ```
    cd web/ && npm start
  ```

#### Executando Testes

> Backend

* Para rodar os testes unitários:

  ```
    npm run test
  ```
  
* Para rodar os testes de integração:

  ```
    npm run test:integration
  ```
  
* Para rodar o corverage:

  ```
    npm run test:coverage
  ```
