class RabbitServiceBase {
    #primaryMessage
    #serviceName
    constructor(primaryMessage, serviceName)  {
        this.#primaryMessage = primaryMessage
        this.#serviceName = serviceName
    }
    log(logNote, isError = false){
        if(isError)
            if(Array.isArray(arguments) && arguments.length > 0){
                console.error(`!!!! ${this.#primaryMessage} FOR SERVICE: ${this.#serviceName}: ${logNote}`, ...arguments);
            } else 
                console.error(`!!!! ${this.#primaryMessage} FOR SERVICE: ${this.#serviceName}: ${logNote}`);
        else
            console.log(`!!!! ${this.#primaryMessage} FOR SERVICE: ${this.#serviceName}: ${logNote}`);
    }

}

export default RabbitServiceBase;