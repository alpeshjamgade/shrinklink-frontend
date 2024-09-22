FROM nginx:1.19

ENV TZ='Asia/Kolkata'

COPY build .

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY nginxmain.conf /etc/nginx/nginx.conf