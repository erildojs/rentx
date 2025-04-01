FROM node:22.14.0-alpine3.20

WORKDIR /usr/app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3333

CMD [ "npm", "run", "dev" ]