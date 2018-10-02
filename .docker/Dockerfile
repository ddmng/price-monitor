FROM registry.genesi.lan/genesi.common/node9:dev

RUN apk update && apk --no-cache add \
    xvfb \
    udev \
    ttf-freefont \
    curl

WORKDIR /ng-app

COPY package.json /ng-app/

# needed to override frontend's package.json
RUN npm i

CMD ash
