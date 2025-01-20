# Use an official Node runtime as a parent image
FROM node:18-slim

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application code
COPY . .

# Expose the port your app runs on
EXPOSE 5000

# Run the application
CMD [ "node", "server.js" ]
# RUN npm run build

# FROM nginx:alpine
# COPY --from=build /app/build /usr/share/nginx/html
# EXPOSE 80
# CMD [ "nginx", "-g", "daemon off;"]
