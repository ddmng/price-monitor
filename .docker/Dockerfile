FROM cypress/base:10

RUN mkdir /ng-app
WORKDIR /ng-app

COPY package.json /ng-app/

# needed to override frontend's package.json
RUN npm i

COPY cypress /ng-app/cypress
COPY cypress.json /ng-app/cypress.json

CMD $(npm bin)/cypress run --spec 'cypress/integration/ci/**/*'
