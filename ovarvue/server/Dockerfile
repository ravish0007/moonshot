# Builder Stage
FROM node:lts AS builder

WORKDIR /usr/src/app

COPY package*.json ./
COPY prisma ./prisma/

# Install all dependencies, including development dependencies
RUN npm install

COPY . .

# Build the application
RUN npm run build

# # Development Stage
# FROM builder AS development

# # Install only development dependencies
# RUN npm install

# EXPOSE 3000

# CMD ["npm", "run", "start:dev"]

# Production Stage
FROM node:lts AS production

COPY --from=builder /usr/src/app/package*.json ./
COPY --from=builder /usr/src/app/prisma ./prisma/
COPY --from=builder /usr/src/app/dist ./dist/

WORKDIR /usr/src/app

# Install only production dependencies
RUN npm install --only=production

EXPOSE 3000

CMD ["npm", "run", "start:migrate:prod"]
