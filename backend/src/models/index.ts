import dynamoose from 'dynamoose';
export * from './thread';

dynamoose.aws.ddb.local('http://ddb:8000');
