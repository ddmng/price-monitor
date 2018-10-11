FROM cypress/base:10

RUN mkdir /app
WORKDIR /app
COPY package.json /app/package.json

RUN npm install

COPY cypress /app/cypress
COPY cypress.json /app/cypress.json

CMD $(npm bin)/cypress run
