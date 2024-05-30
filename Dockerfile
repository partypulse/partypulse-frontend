FROM bitnami/node as builder
LABEL maintainer="bettina.toth@gritacademy.se"

COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .
RUN npm run build

FROM bitnami/nginx
USER root
RUN rm -rf /opt/bitnami/nginx/conf/nginx.conf
COPY nginx/nginx.conf /opt/bitnami/nginx/conf/nginx.conf
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /app/build /opt/bitnami/nginx/html/
EXPOSE 9000

CMD ["nginx", "-g", "daemon off;"]
