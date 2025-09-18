FROM node:alpine 

WORKDIR /app

COPY . /app

RUN npm config set registry https://verdaccio.haddoworld.com
RUN npm install 
RUN chmod +x /app/startServer.sh

CMD ["/app/startServer.sh"]