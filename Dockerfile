FROM node:14.13.0
# Create app directory
WORKDIR /app
# Install app dependencies
COPY package*.json ./

ENV PORT 3000
RUN npm install

ARG NODE_ENV
RUN if [ "$NODE_ENV" = "development" ]; \
        then npm install; \
        else npm install --only=production; \
        fi

# Copy app source code
COPY . ./

#Expose port and start application
EXPOSE ${PORT}
# RUN adduser --disabled-login -u 501 appuser --gid 20
# RUN chown -R appuser:20 /app

CMD npm run start