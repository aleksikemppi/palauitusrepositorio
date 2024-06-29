# Stage 1: Build the frontend
FROM node:14 as build-frontend

WORKDIR /app/frontend

COPY ../puhelinluettelo/package*.json ./
RUN npm install
COPY ../puhelinluettelo/ ./
RUN npm run build

# Stage 2: Build the backend
FROM node:14

WORKDIR /app/backend

COPY package*.json ./
RUN npm install
COPY . .

# Copy frontend build to backend build directory
COPY --from=build-frontend /app/frontend/dist ./build

CMD [ "node", "index.js" ]

EXPOSE 3001
