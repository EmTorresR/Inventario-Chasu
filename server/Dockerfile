# server/Dockerfile

FROM node:18-alpine

WORKDIR /app

# Copiar archivos de dependencias y luego instalarlas
COPY package*.json ./
RUN npm install

# Otorgar permisos de ejecución a ts-node-dev
RUN chmod +x ./node_modules/.bin/ts-node-dev

# Copiar el resto del código
COPY . .

# Exponer el puerto del servidor
EXPOSE 5000

# Iniciar el servidor
CMD ["npm", "run", "start"]
