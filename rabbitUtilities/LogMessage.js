import LogLevel from "./LogLevel.js"
import LogCategory from "./LogCategory.js"
import { v4 as uuidv4 } from 'uuid';

class LogMessage {
    constructor(id, messageId, createdTimeStamp, logLevel, category, message, publishingService, consumingService ){
        this.id = id;
        this.messageId = messageId ?? uuidv4();
        this.createdTimeStamp = createdTimeStamp ?? Date.UTC();        
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
            id: this.id, 
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

    toLogTableInsert(){
        let jsonObject = {
            id: this.id, 
            message_id: this.messageId, 
            created_time_stamp: this.createdTimeStamp, 
            level: this.logLevel,  
            category: this.category,
            message: this.message,
            publishing_service_name: this.publishingService,
            consuming_service_name: this.consumingService
        }
        return JSON.stringify(jsonObject);
    }

}

export default LogMessage