# Utiliza la imagen base de Node.js
FROM node:18-alpine

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias
RUN npm install

RUN npx browserslist@latest --update-db

# Copia el resto de los archivos de la aplicación
COPY . .

# Exponer el puerto en el que correrá la aplicación
EXPOSE 3000

# Establecer las variables de entorno necesarias
ENV HOST 0.0.0.0
ENV PORT 3000
ENV NEXT_TELEMETRY_DISABLED 1

# Comando por defecto para iniciar la aplicación en modo desarrollo
CMD ["npm", "run", "dev"]