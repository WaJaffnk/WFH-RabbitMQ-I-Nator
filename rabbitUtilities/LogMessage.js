import LogLevel from "./LogLevel.js"
import LogCategory from "./LogCategory.js"
import { v4 as uuidv4 } from 'uuid';

class LogMessage {
    constructor(messageId, createdTimeStamp, logLevel, category, message, publishingService, consumingService ){
        this.messageId = messageId ?? uuidv4();
        //knex will tolerate an iso string - to convert to appropriate timezone (note Date.now() captures timezone.
        this.createdTimeStamp = createdTimeStamp ?? new Date().toISOString(); 
        if(Object.values(LogLevel).includes(logLevel)){
            this.logLevel = logLevel;
        } else {
            this.invalidLogLevel(logLevel);
        }
        if(Object.values(LogCategory).includes(category)){
            this.category = category;
        } else {
            this.invalidLogLevel(logLevel);
        }
        this.message = message;
        this.publishingService = publishingService;
        this.consumingService = consumingService;
    }

    invalidLogLevel(logLevel){
        throw Error(`###${Date.UTC()}### Invalid Log Level Passed to LogMessage.  LogLevel: ${logLevel}; MessageId: ${this.messageId}, Publishing Service: ${this.publishingService};`)
    }

    toJson(){
        let jsonObject = {
            messageId: this.messageId, 
            createdTimeStamp: this.createdTimeStamp, 
            logLevel: this.logLevel, 
            category: this.category,
            message: this.message,
            publishingService: this.publishingService,
            consumingService: this.consumingService
        }
        return JSON.stringify(jsonObject);
    }

    static fromJson(json){
        let message = JSON.parse(json);
        let logMessage = new LogMessage(message.messageId, message.createdTimeStamp, message.logLevel, message.category, message.message, message.publishingService, message.consumingService);
        return logMessage
    }

    toLogTableInsert(){
        let result = {
            id: this.id, 
            message_id: this.messageId, 
            created_timestamp: this.createdTimeStamp, 
            log_level: this.logLevel,  
            log_category: this.category,
            message: this.message,
            publishing_service_name: this.publishingService,
            consuming_service_name: this.consumingService
        }
        return result;
    }

}

export default LogMessage