# Step 1: Use an official Node.js image as the build environment
# Use a smaller Node.js image like 'node:18-alpine' to reduce the image size
FROM node:18-alpine AS build

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy only package.json and package-lock.json first
# This leverages Docker's caching mechanism, so dependencies are only reinstalled if these files change
COPY package*.json ./

# Step 4: Install dependencies, using 'ci' for a clean install
RUN npm ci

# Step 5: Copy the rest of the application code
COPY . .

# Step 6: Build the application
RUN npm run build

# Step 7: Use a lightweight web server to serve the production build
FROM nginx:alpine

# Step 8: Copy the build output from the previous stage
COPY --from=build /app/dist /usr/share/nginx/html

# Step 9: Remove the default Nginx configuration and replace it with a custom one, if needed
# COPY nginx.conf /etc/nginx/nginx.conf

# Step 10: Expose port 80 to the outside world
EXPOSE 80

# Step 11: Start Nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]
