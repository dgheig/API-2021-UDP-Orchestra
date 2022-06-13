FROM node:18.3.0-bullseye-slim

COPY ./src /src

WORKDIR /src
RUN npm install

ENTRYPOINT ["node", "/src"]