# 1. Use official Node image
FROM node:18-alpine

# 2. Set working directory
WORKDIR /app

# 3. Copy package files & install dependencies
COPY package.json package-lock.json ./
RUN npm install

# 4. Copy all source code
COPY . .

# 5. Build the Next.js app
RUN npm run build

# 6. Expose the port Next.js runs on
EXPOSE 3000

# 7. Start the Next.js app
CMD ["npm", "start"]
