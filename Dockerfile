# Stage 1: Build
FROM node:20-alpine AS builder
WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .
RUN yarn build

# Stage 2: Runtime
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV production
ENV PORT 3000

# copy built app
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/yarn.lock ./yarn.lock

RUN yarn install --frozen-lockfile --production

EXPOSE 3000
CMD ["yarn", "start"]
