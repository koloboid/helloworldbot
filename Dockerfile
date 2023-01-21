FROM node:18

WORKDIR /home/node

ADD package.json package.json
ADD package-lock.json package-lock.json
RUN npm ci

ADD dist dist
RUN ls -la .

USER node

CMD [ "node", "dist/main" ]
