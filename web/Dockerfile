FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
ENV VITE_DATABASE_USER=usr_magic_commander
ENV DATABASE_PASSWORD=asmd8n1çaz11
ENV DATABASE_HOST=localhost
ENV DATABASE_PORT=27017
ENV BCRYPT_ROUNDS=10
ENV JWT_SECRET=your_secret_key
ENV VITE_SERVER_HOST=localhost
ENV VITE_SERVER_PORT=8080
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
