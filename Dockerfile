# Use a Node.js base image
FROM node:latest

# Set working directory
WORKDIR /home/node/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app's source code
COPY . .

# Generate Prisma client during build
RUN npx prisma generate

# Expose the port your app runs on
EXPOSE 8888

# Command to run your Node.js app
CMD ["npm", "start"] 
