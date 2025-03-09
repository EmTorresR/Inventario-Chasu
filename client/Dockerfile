# client/Dockerfile

# Usamos una imagen ligera de Node
FROM node:18-alpine

# Establecemos el directorio de trabajo
WORKDIR /app

# Copiamos solo el package.json y el package-lock.json (o yarn.lock)
COPY package*.json ./

# Instalamos las dependencias
RUN npm install

# Copiamos el resto del código
COPY . .

# Exponemos el puerto en el que corre Vite (por defecto es el 5173)
EXPOSE 5173

# Iniciamos la aplicación en modo desarrollo
CMD ["npm", "run", "dev", "--", "--host"]
