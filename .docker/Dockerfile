FROM cypress/base:10

RUN mkdir /app
WORKDIR /app
COPY package.json /app/package.json

RUN yarn install

COPY src/index.js /app/index.js

EXPOSE 3000

CMD node index.js