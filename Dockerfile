FROM node:20-alpine as build-stage

WORKDIR /app

ARG VITE_API_HOST=

COPY package*.json /app/
RUN npm install

COPY ./ /app/
RUN npm run build

FROM nginx:1.28
COPY --from=build-stage /app/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build-stage /app/dist/ /usr/share/nginx/html
