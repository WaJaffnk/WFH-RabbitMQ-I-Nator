const Subscription = require('./Subscription.js');


const DEFAULT_RABBIT_URL = 'amqp://wajaffnk:wajaffnk@rabbitmq:5672/';
const QUEUE_NAME = 'wfh-inator-logging-queue';
const SERVICE_NAME = 'wfh-inator-logging-service';
const EXCHANGE_NAME = 'wfh-inator-logging-exchange';

let amqp = require('amqplib');

jest.mock('amqplib', () => {
  const mData = {
    content: 'teresa teng',
  };

  const mChannel = {
    assertQueue: jest.fn(),
    consume: jest.fn().mockImplementation((queue, callback) => {
      callback(mData);
    }),
  };

  return {
    connect: jest.fn().mockResolvedValue({
      createChannel: jest.fn().mockImplementation(() => {
        return mChannel;
      }),
    }),
  };
});

describe('Subscription', () => {
  it('should call amqp.connect', () => {
    const subscription = new Subscription(DEFAULT_RABBIT_URL, EXCHANGE_NAME, QUEUE_NAME, SERVICE_NAME);
    subscription.connect();
    expect(amqp.connect).toHaveBeenCalledTimes(1);
    expect(amqp.connect).toHaveBeenCalledWith(DEFAULT_RABBIT_URL);
  });
});