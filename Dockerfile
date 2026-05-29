FROM node:22-slim
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --production --ignore-scripts
COPY . .
EXPOSE 3000
CMD ["node", "app.js"]
