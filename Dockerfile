# Build stage
FROM node:15-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ENV NODE_ENV=production
RUN npm run build

# Production stage
FROM node:15-alpine as production-stage
WORKDIR /app
COPY --from=build-stage /app/dist /app
COPY package*.json ./
RUN npm install --only=production

ENV NODE_ENV=production
CMD [ "npm", "start" ]

LABEL authors="Nicholai Nissen"
