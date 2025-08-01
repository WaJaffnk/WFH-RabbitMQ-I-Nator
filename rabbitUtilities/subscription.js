

/**
 * 
 * Subscription allows you to supply config information, 
 *  ie: exchange, server host, etc..
 * 
 * Automatically subscribes to correct exchange, and starts receiving messages. 
 * on message Received, 
 *  it breaks apart message, 
 *  confirms it's a valid subscription (ie: this if from the correct source)
 *  extrapolates the JSON
 *  if ERROR - logs it
 *  if VALID
 *      returns correct JSON to subscribing service.
 */

import amqp from 'amqplib';
import RabbitServiceBase from "./RabbitServiceBase.js"

class Subscription extends RabbitServiceBase {
    constructor(rabbitUrl, exchangeName, queueName, serviceName) {
        super("RABBITMQ SUBSCRIPTION SERVICE - MESSAGE: ", serviceName);
        this.rabbitUrl = rabbitUrl;
        this.serviceName = serviceName;
        this.exchangeName = exchangeName;
        this.queueName = queueName;
        this.connection = null;
    }

    async endConnection(connection) {
        setTimeout(function () {
            connection.close();
            process.exit(0);
        }, 500);
    }

    
    async connect(processMessageCallback) {
        try {
            this.log(`subscription attempting to start; exchange=${this.exchangeName}, queue=${this.queueName}`);
            this.connection = await amqp.connect(this.rabbitUrl);
            this.log(`Creating channel`)
            this.connection.createChannel()
                .then(channel => {
                    this.log('Assert Queue')
                    channel.assertQueue(this.queueName, { durable: true }, (error) => {
                        this.log("Queue Assertion ");
                        if (error) {
                            this.log("ERROR ON QUEUE", true, error);
                        }
                    });
                    this.log("SETTING UP CONSUMER:", this.queueName);
                    channel.consume(this.queueName, processMessageCallback, { noAck: true });
                    this.log(`subscription complete - exchange=${this.exchangeName}, queue=${this.queueName}`);

                })            
        } catch (error) {
            this.log('ERROR connecting to RabbitMQ:', true, error);
        }
    }
}

export default Subscription;