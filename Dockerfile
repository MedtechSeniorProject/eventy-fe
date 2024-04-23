# Stage 1: Build the React app using Vite and npm
FROM node:alpine as build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React app for production
RUN npm run build

# Stage 2: Serve the built application using a lightweight server
FROM node:alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the built files from the previous stage
COPY --from=build /app/dist ./dist

# Install a simple HTTP server for serving static content
RUN npm install -g serve

# Expose the port that the server will run on
EXPOSE 3000

# Command to run the application when the container starts
CMD ["serve", "-s", "dist"]
 