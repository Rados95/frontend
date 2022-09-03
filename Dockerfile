FROM node:latest as frontend-builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod

FROM nginx:alpine
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=frontend-builder /app/dist/frontend /usr/share/nginx/html
