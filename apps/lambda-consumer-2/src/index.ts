import { Handler } from 'aws-lambda';
import axios from 'axios';

export const handler: Handler = async (event, context, callback) => {
  return context.logStreamName;
};

axios.get('https://youtube.com').then((e) => console.log(e.headers));

console.log('Hello World! 2');
