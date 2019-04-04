FROM node:11-alpine


RUN apk add --no-cache tini
ENTRYPOINT ["/sbin/tini", "-e", "143", "--", "node"]


WORKDIR /app
COPY package*.json ./
COPY src ./src/
RUN npm install --production --quiet && \
    npm cache clean --force && \
    rm -rf /tmp/*


EXPOSE 3000
USER node
CMD ["src/index.js"]
