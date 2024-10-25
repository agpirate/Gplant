#sudo apt  install docker.io
#create ProjectFolder....$touch Gplant2 & 
#cd Gplant2
#copy all ssr and src-ssr file into Gplant2
#create makefile,ignorefile....and build_docker...
#--------------------
# touch .dockerignore
#node_modules
#npm-debug.log
#.dockerignore
#Dockerfile
#--------------------

# we will use the latest version of node available from the Docker Hub.
FROM node:v18

#RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

# Create app directory, where your app will live its lifetime. 
#NNNNNNBBBBBBB::::---- ( this is not, same folder as the original_project to be imaged_)
WORKDIR /home/maqadev/itService

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Installing the packages_libraries(inside package.json) while the image is building
RUN npm install

# Bundle app source, i.e. copying all your required files for the app
# Note: files & folders inside .dockerignore will not be copied.
COPY . .

# The app binds to port 3000, so exposing port 3000 to be used by the docker network
EXPOSE 3000 
#Expose 9100 

# Runtime command to be executed when the container is launched
#CMD ["node", "app.js"]
#here since we using quasar_build(run env) 
CMD ["quasar","dev"]
#,"-m","ssr"]

#run the docker first to build an image
#docker build  -t imageNameYGPPro .
#docker images //list the images we created 
#docker run -d -p 3000:9100 imageNameYGPPro //docker_Port ( 3000(browser) :-bindTo-: SSR_port ( 9100))
#docker ps //listing the process
