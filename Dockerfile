# node:16.17.0
FROM node@sha256:ca988c6e7f4a41a18030a7adae34a5ea6f9faf7e4f84c8d886ce1afa0080d84a as frontend-builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod

# nginx:alpine
FROM nginx@sha256:2959a35e1b1e61e2419c01e0e457f75497e02d039360a658b66ff2d4caab19c4
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=frontend-builder /app/dist/frontend /usr/share/nginx/html
