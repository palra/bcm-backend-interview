FROM node:12.3-alpine
WORKDIR /usr/src/app

COPY package.json yarn.lock ./
RUN yarn install

COPY . .
EXPOSE 3000
CMD [ "yarn", "start:dev" ]