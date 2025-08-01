WORKDIR /app

# Copy package.json and package-lock.json (if present) to install dependencies
COPY package.json package-lock.json ./

# Install package dependencies
RUN npm install

# Copy the rest of your package source code
COPY . .
COPY .env .

# Set a non-root user for security (optional but recommended)
# Ensure this user has necessary permissions to write to the working directory if needed for build steps
RUN adduser -D 
USER appuser

# Define the command to publish the package
# This command will be executed when the container runs
CMD ["npm", "publish"]