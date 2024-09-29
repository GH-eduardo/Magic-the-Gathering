FROM node:18-alpine
WORKDIR /app

# Copia os arquivos de dependências e instala as dependências
COPY package*.json ./
RUN npm install

# Copia todos os arquivos do projeto e constrói o aplicativo
COPY . .
RUN npm run build

# Instala o Nginx para servir o conteúdo estático
RUN apk add --no-cache nginx

# Copia os arquivos estáticos do build para o diretório padrão do Nginx
COPY /app/dist /usr/share/nginx/html

# Configura variáveis de ambiente
ENV VITE_DATABASE_USER=usr_magic_commander
ENV DATABASE_PASSWORD=asmd8n1çaz11
ENV DATABASE_HOST=localhost
ENV DATABASE_PORT=27017
ENV BCRYPT_ROUNDS=10
ENV JWT_SECRET=your_secret_key
ENV VITE_SERVER_HOST=localhost
ENV VITE_SERVER_PORT=8080

# Expõe a porta 80 para o Nginx
EXPOSE 80

# Inicia o Nginx
CMD ["nginx", "-g", "daemon off;"]