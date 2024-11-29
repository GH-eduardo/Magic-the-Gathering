FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
ENV DATABASE_USER=usr_magic_commander
ENV DATABASE_PASSWORD=asmd8n1çaz11
ENV DATABASE_HOST=localhost
ENV DATABASE_PORT=27017
ENV BCRYPT_ROUNDS=10
ENV JWT_SECRET=your_secret_key
EXPOSE 3000
CMD ["npm", "run", "start:prod"]
