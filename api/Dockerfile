FROM node:18

ENV NODE_ENV=production

WORKDIR /workspace
ADD package.json .yarnrc.yml ./
ADD .yarn .yarn
ADD prisma prisma

RUN yarn install
ADD . .
RUN yarn build

FROM node:18

WORKDIR /app
ADD package.json .yarnrc.yml ./
COPY --from=0 /workspace/.yarn ./.yarn
COPY --from=0 /workspace/dist ./dist
COPY --from=0 /workspace/prisma ./prisma

RUN yarn install
ENTRYPOINT ["yarn", "run", "start:prod"]