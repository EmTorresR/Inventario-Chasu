FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

# Instala ts-node-dev globalmente
RUN npm install -g ts-node-dev

COPY . .

EXPOSE 5000

# Ejecuta ts-node-dev directamente
CMD ["ts-node-dev", "--respawn", "src/index.ts"]

