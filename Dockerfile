FROM node:12-slim as base
ENV NODE_ENV=production
EXPOSE 3000
RUN npm i npm@latest -g
RUN mkdir /app && chown -R node:node /app
WORKDIR /app
USER node
COPY --chown=node:node package.json package-lock*.json ./
RUN npm install && npm cache clean --force
ENV PATH /app/node_modules/.bin:$PATH
# check every 30s to ensure this service returns HTTP 200
HEALTHCHECK --interval=30s CMD node healthcheck.js

FROM base as source
COPY --chown=node:node . .

FROM source as dev
ENV NODE_ENV=development
RUN npm install --only=development
CMD ["nodemon", "server.js"]

FROM source as prod
CMD ["node", "server.js"]
