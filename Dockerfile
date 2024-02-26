# Usa una imagen de Node.js como base
FROM node:latest

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia el archivo package.json y package-lock.json al directorio de trabajo
COPY package*.json ./

# Instala las dependencias del proyecto
RUN npm install

# Copia el resto de los archivos del proyecto al directorio de trabajo
COPY . .

# Compila el código TypeScript a JavaScript
RUN npm run tsc

# Expone el puerto en el que se ejecutará la aplicación
EXPOSE 3000

# Define variables de entorno
# Variables de entorno para entorno de desarrollo
ENV DB_DATABASE=bluee
ENV DB_USERNAME=postgres
ENV DB_HOST=127.0.0.1
ENV DB_PORT=5432
ENV PORT=5004
ENV JWT_SECRET="hsdIUFIASUDHYI"

# Variables de entorno para entorno de producción
ENV PROD_DB_DATABASE=produccion_db
ENV PROD_DB_USERNAME=produccion_user
ENV PROD_DB_PASSWORD=produccion_password
ENV PROD_DB_HOST=produccion_host
ENV PROD_DB_PORT=produccion_port
ENV PROD_PORT=8080
ENV PROD_JWT_SECRET="hsdIUFIASUDHYI"

# Comando para iniciar la aplicación
CMD ["npm", "start"]
