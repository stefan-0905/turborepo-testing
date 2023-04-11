import { Handler } from 'aws-lambda';
import axios from 'axios';

export const handler: Handler = async (event, context) => {
  return context.logStreamName;
};

axios.get('https://google.com').then((e) => console.log(e.headers));

console.log('Hello World and CI! 1');
