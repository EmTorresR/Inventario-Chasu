FROM node:18-alpine

WORKDIR /app

# Copia solo los archivos de dependencias primero
COPY package*.json ./
RUN npm install

# Instala ts-node-dev globalmente
RUN npm install -g ts-node-dev
RUN chmod +x $(command -v ts-node-dev)

# Luego copia el resto
COPY . .

EXPOSE 5000

CMD ["ts-node-dev", "--respawn", "src/index.ts"]
