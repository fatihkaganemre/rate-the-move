FROM node:22 AS build
WORKDIR /app
COPY src ./src
COPY package-lock.json ./package-lock.json
COPY package.json ./package.json
COPY public ./public
RUN npm ci
RUN npm run build

FROM nginx:1.27.3
COPY --from=build  /app/build /var/www/html
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf.template

COPY ./nginx/env-entrypoint.sh /docker-entrypoint.d/env-entrypoint.sh 
RUN chmod +x /docker-entrypoint.d/env-entrypoint.sh

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
