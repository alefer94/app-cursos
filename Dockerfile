# Usa la versión específica de Node.js que estás utilizando
FROM node:18.20.3

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar los archivos del proyecto al contenedor
COPY package.json ./
COPY package-lock.json ./

# Instalar las dependencias del proyecto
RUN npm install

# Copiar todo el contenido del proyecto al contenedor
COPY . .

# Construir el proyecto para producción (si es una aplicación React)
RUN npm run build

# Exponer el puerto 3000 (o el puerto que necesites)
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "start"]
