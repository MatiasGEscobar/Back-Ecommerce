# Usa Node.js con Alpine
FROM node:20-alpine

# Crea el directorio de trabajo
WORKDIR /usr/src/app

# Instala compiladores para dependencias nativas
RUN apk add --no-cache make gcc g++ python3

# Copia solo los archivos necesarios primero
COPY package*.json ./

# Instala dependencias
RUN npm install

# Copia el resto del código
COPY . .

# Compila el proyecto
RUN npm run build

# Expone el puerto en el que corre NestJS (3000 dentro del contenedor)
EXPOSE 3000

# Comando que inicia la app
CMD ["node", "dist/main"]
