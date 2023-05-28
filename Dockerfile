# Establece la imagen base
FROM node:18

# Instala las dependencias necesarias para FFmpeg
RUN apt-get update && \
    apt-get install -y ffmpeg

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia el resto de los archivos de la aplicación en el contenedor
COPY . .

RUN npm install -g npm@9.6.5
# Instala las dependencias del proyecto
RUN npm install


# Expone el puerto en el que se ejecutará la aplicación
EXPOSE 3000

# Ejecuta la aplicación
# CMD ["npm", "start"]
