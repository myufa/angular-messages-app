export interface Message {
  dateCompleted ?: Date;
  direction: 0 | 1; // 0 is inbound, 1 is outbound
  body: string; 
  seekerId: string;
  //"channel": 'sms' | 'email'; // 'sms' or 'email'
  status ?: string; // 'delivered' 'queued' 'etc'
}

export interface Seeker {
  "_id": string,
  "firstName": string,
  "lastName": string,
  "lastMessageDate": string,
  "messages": Message[]
};