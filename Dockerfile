FROM node:20

WORKDIR /app

RUN npm i -g bun nodemon pm2

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

EXPOSE 5000

CMD ["npm", "start"]
