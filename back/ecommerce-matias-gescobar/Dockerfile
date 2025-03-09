FROM node:20-alpine

WORKDIR /usr/src/app

# Instalar dependencias de compilación
RUN apk add --no-cache make gcc g++ python3

# Copiar archivos de configuración
COPY package*.json ./
RUN npm uninstall bcrypt
RUN npm install bcryptjs
RUN npm install

# Copiar el resto del código
COPY . .

# Compilar la aplicación
RUN npm run build

# Exponer puerto
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["npm", "run", "start:prod"]