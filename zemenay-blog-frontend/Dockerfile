# zemenay-blog-frontend/Dockerfile

# Development version - optimized for performance
FROM node:18-alpine

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Set environment variables for better performance
ENV NODE_ENV=development
ENV NEXT_TELEMETRY_DISABLED=1

EXPOSE 3000

# Use dev mode with optimized settings
CMD ["npm", "run", "dev"] 