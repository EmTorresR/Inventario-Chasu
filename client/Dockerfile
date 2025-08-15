# client/Dockerfile

# --- Build Stage ---
# Usamos una imagen de Node para construir la aplicación
FROM node:18-alpine AS build

# Establecemos el directorio de trabajo
WORKDIR /app

# Copiamos package.json y package-lock.json
COPY package*.json ./

# Instalamos dependencias
RUN npm install

# Copiamos todo el código fuente
# Esto incluirá el .env.production que creamos
COPY . .

# Construimos la aplicación para producción
# npm run build usará .env.production automáticamente
RUN npm run build

# --- Production Stage ---
# Usamos una imagen de Nginx para servir los archivos estáticos
FROM nginx:stable-alpine

# Copiamos los archivos construidos desde la etapa de 'build' al directorio de Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Exponemos el puerto 80
EXPOSE 80

# Cuando el contenedor inicie, Nginx se ejecutará automáticamente
CMD ["nginx", "-g", "daemon off;"]