FROM public.ecr.aws/docker/library/node:16.13.2-stretch as builder

RUN mkdir /usr/src/app
COPY ./todo /usr/src/app/todo
COPY ./common /usr/src/app/common
RUN cd /usr/src/app/common && npm install
RUN cd /usr/src/app/todo && npm install && npm run build

FROM public.ecr.aws/docker/library/node:16.13.2-stretch-slim

COPY --from=public.ecr.aws/awsguru/aws-lambda-adapter:0.7.1 /lambda-adapter /opt/extensions/lambda-adapter
EXPOSE 8080 
RUN mkdir -p /var/task/todo && mkdir ~/.aws
WORKDIR /var/task/todo
COPY ./todo/package*.json ./
COPY ./todo/config.yml ./
RUN npm install

## We just need the build to execute the command
COPY --from=builder /usr/src/app/common ../common
COPY --from=builder /usr/src/app/todo/dist ./dist

CMD [ "node", "./dist/todo/index.js" ]
