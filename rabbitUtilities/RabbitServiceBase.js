class RabbitServiceBase {
    #primaryMessage
    #serviceName
    constructor(primaryMessage, serviceName)  {
        this.#primaryMessage = primaryMessage
        this.#serviceName = serviceName
    }
    log(logNote, isError = false){
        if(isError)
            console.error(`!!!! ${this.#primaryMessage} FOR SERVICE: ${this.#serviceName}: ${logNote}`, arguments);
        else
            console.log(`!!!! ${this.#primaryMessage} FOR SERVICE: ${this.#serviceName}: ${logNote}`);
    }

}

export default RabbitServiceBase;