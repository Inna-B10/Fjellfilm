FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

# Install dependencies (production only)
RUN npm install --omit=dev

COPY . .

EXPOSE 4200

CMD ["node", "src/main.js"]
