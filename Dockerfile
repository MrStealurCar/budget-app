# Use Node environment
FROM node:18

# Set working directory
WORKDIR /app

# Copy backend & frontend dependency files
COPY api/package*.json ./api/
COPY client/package*.json ./client/

# Install dependencies
RUN cd api && npm install
RUN cd client && npm install

# Copy all code
COPY . .

# Build the frontend
RUN cd client && npm run build

# Expose port for Render
EXPOSE 3005

# Start the backend
# Ensure the server serves the build folder using correct paths
CMD ["npm", "start", "--prefix", "api"]
