# Use the official Node.js 16 image as the base image
FROM node:16

# Set the working directory
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install the application dependencies
RUN npm install

# Copy the TypeScript configuration file
COPY tsconfig.json ./

# Copy the application code
COPY src ./src

# Compile TypeScript to JavaScript
RUN npm run build

# Expose the application port
EXPOSE 5000

# Define the command to run the application
CMD ["npm", "run", "start"]
