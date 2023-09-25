FROM public.ecr.aws/docker/library/node:16.13.2-stretch as builder

# Create app directory
WORKDIR /usr/src/app/todo

# Copy app source
COPY ./todo .

# Create app directory
RUN mkdir /usr/src/app/common

# Copy common files
COPY ./common ../common

RUN npm install

RUN npm run build

FROM public.ecr.aws/docker/library/node:16.13.2-stretch-slim

COPY --from=public.ecr.aws/awsguru/aws-lambda-adapter:0.7.1 /lambda-adapter /opt/extensions/lambda-adapter

EXPOSE 8080 
WORKDIR /var/task/todo
COPY ./todo/package*.json ./
RUN npm install

## We just need the build to execute the command
COPY --from=builder /usr/src/app/common ../common
COPY --from=builder /usr/src/app/todo/dist ./dist

CMD [ "node", "./dist/index.js" ]
