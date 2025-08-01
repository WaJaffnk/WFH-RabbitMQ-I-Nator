import LogLevel from "./LogLevel.js";
import LogCategory from "./LogCategory.js";
import LogMessage from "./LogMessage.js";
import RabbitServiceBase from "./RabbitServiceBase.js"
import amqp from 'amqplib';

class Publication extends RabbitServiceBase {
    constructor(rabbitUrl, exchangeName, queueName, serviceName) {
        super("RABBITMQ PUBLICATION SERVICE - MESSAGE: ", serviceName);
        this.rabbitUrl = rabbitUrl;
        this.serviceName = serviceName;
        this.exchangeName = exchangeName;
        this.queueName = queueName;
        this.connection = null;
        this.channel = null;
    }

    async publish(message, targetService="undefined", logLevel=LogLevel.DEBUG, logCategory=LogCategory.JsonMessage){
        if(!this.connection){
            await this.connect();
        }

        try {
            this.log("CREATING LOG MESSAGE");
            let logMessage = new LogMessage(null, null, null, logLevel, logCategory, message, this.serviceName,  targetService);        
            let logMessageJson = logMessage.toJson();
            this.log("PUBLISHING MESSAGE: ", logMessageJson);
            await this.channel.sendToQueue(this.queueName, Buffer.from(logMessageJson));
            this.log(`SETUP PUBLICATION complete - exchange=${this.exchangeName}, queue=${this.queueName}`);
        } catch (error) {
            this.log('ERROR publishing to RabbitMQ:', true, error);
        }
    }

    async connect(){
        try {
            this.log(`publication attempting to start; URL: ${this.rabbitUrl} exchange=${this.exchangeName}, queue=${this.queueName}`);
            this.connection = await amqp.connect(this.rabbitUrl);
            this.log(`Creating channel`)
            
            await this.connection.createChannel()
                .then(channel => {
                    this.log('Asserting Queue')
                    this.channel = channel;
                    channel.assertQueue(this.queueName, { durable: true }, (error) => {
                        this.log("Queue Assertion ");
                        if (error) {
                            this.log("ERROR ON QUEUE", true, error);
                        }
                    });
                })
        }   
        catch (error) {
            this.log('ERROR connecting to RabbitMQ:', true, error);
        }
    }
}

export default Publication;