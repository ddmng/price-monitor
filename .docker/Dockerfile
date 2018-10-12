FROM cypress/base:10

RUN mkdir /app
COPY package.json /app/package.json
COPY .gitmodules /app/.gitmodules
COPY .git /app/.git
COPY index.html /app/index.html
COPY src /app/src

RUN mkdir -p local_modules/hyperapp
RUN mkdir -p local_modules/hyperapp-fx

WORKDIR /app
RUN npm run build

COPY cypress /app/cypress
COPY cypress.json /app/cypress.json

CMD $(npm bin)/cypress run
