# node:16.17.0
FROM node@sha256:ca988c6e7f4a41a18030a7adae34a5ea6f9faf7e4f84c8d886ce1afa0080d84a as frontend-builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod

# nginx:1.23.1
FROM nginx@sha256:89020cd33be2767f3f894484b8dd77bc2e5a1ccc864350b92c53262213257dfc
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=frontend-builder /app/dist/frontend /usr/share/nginx/html
RUN useradd -ms /bin/bash containermanager
USER containermanager
