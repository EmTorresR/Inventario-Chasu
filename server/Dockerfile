FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

# Instala ts-node-dev globalmente
RUN npm install -g ts-node-dev

# Asegura que el binario tenga permisos de ejecución usando command -v para ubicarlo
RUN chmod +x $(command -v ts-node-dev)

COPY . .

EXPOSE 5000

CMD ["ts-node-dev", "--respawn", "src/index.ts"]

