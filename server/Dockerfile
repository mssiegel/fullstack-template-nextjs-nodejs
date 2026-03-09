FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Expose the port (make sure this matches your config)
EXPOSE 8000

# Start the application.
CMD ["npm", "start"]
