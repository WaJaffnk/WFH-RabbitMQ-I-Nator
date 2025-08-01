This Node utility provides default uses for usage in other applications. 

Note: 
During the original inception, this project is to provide rabbit-utilities package for the logging-service.  Therefor, both publishing and installing packages from this service will be necessary. 

Before usage of this application - you will need to run the package-server `(found:  "../package-server")` docker-compose file. 
Once the app runs, navigate to `http://0.0.0.0:4873/` and use the instructions to add user found there. (see README in package-server)

Once you make changes to this file - you will need to publish the new application.  NOTE - you will need to change the version found in the `package.json`
```bash
npm publish 
```