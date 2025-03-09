# server/Dockerfile

FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Exponemos el puerto del servidor (por defecto 5000 en el ejemplo)
EXPOSE 5000

# Iniciamos el servidor con ts-node-dev (o el script que uses)
CMD ["npm", "run", "start"]
