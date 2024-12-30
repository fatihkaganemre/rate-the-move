FROM node:22

WORKDIR /app

RUN chown node:node ./
USER node

COPY package.json package-lock.json ./
RUN npm ci && npm cache clean --force

COPY ./src ./src
COPY ./docker-entrypoint.sh ./docker-entrypoint.sh

CMD ["sh" , "./docker-entrypoint.sh"]