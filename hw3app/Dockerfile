# Completed by Matt Courchaine and Satwik Tadikamalla 
# This file is the dockerfile for the front end. It uses a amd64 base image, loads in /app code,
# and will ruun nginx to serve the react app.  It also copys in nginx.conf to setup the nginx server.
FROM --platform=linux/amd64 node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM --platform=linux/amd64 nginx:1.27-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
