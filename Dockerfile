FROM node:16.17.1

WORKDIR /app
COPY . .

RUN npm install
RUN npm run build

EXPOSE 3000

ENV PORT=3000
CMD ["node", "server.js"]
