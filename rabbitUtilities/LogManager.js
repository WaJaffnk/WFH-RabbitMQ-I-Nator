import logConfig from "./log4js.base.config.json";
import log4js from 'log4js';
log4js.configure(logConfig);
import LogLevel from "./LogLevel.js"
import Publication from "./Publication.js";
import LogCategory from "./LogCategory.js";
import LogMessage from "./LogMessage.js";
import ServiceName from "./ServiceName.js";
//https://github.com/log4js-node/log4js-api

class LogManager {
    constructor(rabbitUrl, exchangeName, queueName, serviceName){
        this.publisher = new Publication(rabbitUrl, exchangeName, queueName, serviceName);
        this.serviceName = serviceName;   
        this.logger = null;     
    }
    
    async getLogger(appenderName="console", logLevel=LogLevel.DEBUG){
        await this.publisher.connect();
        const logger = log4js.getLogger(appenderName);
        console.log("The logger", logger);
        //establish default Log Level
        logger.level = logLevel || LogLevel.DEBUG;
        logger.debug("Logger is created and available.")
        this.logger = logger;
    }

    createLogMessage(message, targetService="undefined", logLevel=LogLevel.DEBUG, logCategory=LogCategory.JsonMessage){
        console.log("CREATING LOG MESSAGE");
        let logMessage = new LogMessage(null, null, logLevel, logCategory, message, this.serviceName,  targetService);        
        return logMessage;
    }

    async error(message, error){
        let errorJson = JSON.stringify(error);
        let logMessage = this.createLogMessage(message + "\n\r" + errorJson, ServiceName.loggingService, LogLevel.ERROR, LogCategory.JsonMessage).toJson();
        await this.logger.error(logMessage);
        await this.publisher.publish(logMessage);
    }

    async info(message){
        let logMessage = this.createLogMessage(message, ServiceName.loggingService, LogLevel.INFO, LogCategory.JsonMessage).toJson();
        await this.logger.info(logMessage);
        await this.publisher.publish(logMessage);
    }

    async warning(message){
        let logMessage = this.createLogMessage(message, ServiceName.loggingService, LogLevel.WARNING, LogCategory.ConsoleMessage).toJson();
        await this.logger.warning(logMessage);
        await this.publisher.publish(logMessage);
    }

    async debug(message){
        let logMessage = this.createLogMessage(message, ServiceName.loggingService, LogLevel.DEBUG, LogCategory.ConsoleMessage).toJson();
        await this.logger.debug(logMessage);
        await this.publisher.publish(logMessage);
    }
}

export default LogManager;
