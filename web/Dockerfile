FROM node:18-alpine

WORKDIR /app

# Copia os arquivos package*.json e instala as dependências
COPY package*.json ./
RUN npm install

# Copia todos os arquivos da aplicação para o diretório de trabalho
COPY . .

# Define as variáveis de ambiente
ENV VITE_DATABASE_USER=usr_magic_commander
ENV DATABASE_PASSWORD=asmd8n1çaz11
ENV DATABASE_HOST=localhost
ENV DATABASE_PORT=27017
ENV BCRYPT_ROUNDS=10
ENV JWT_SECRET=your_secret_key
ENV VITE_SERVER_HOST=localhost
ENV VITE_SERVER_PORT=8080

# Expondo a porta que a aplicação vai rodar
EXPOSE 3000

# Comando para executar a aplicação
CMD ["npm", "run", "dev"]