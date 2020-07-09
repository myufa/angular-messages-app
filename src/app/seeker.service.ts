import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Message, Seeker} from './seeker';
import  *  as  data  from  './data.json';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SeekerService {

  private seekerUrl = "https://x17hs8niwh.execute-api.us-east-1.amazonaws.com/dev/demo/get-seekers";
  private testData: Seeker[] = [];

  constructor(private http: HttpClient) {
  }

  dataTest(): void{
    console.log(this.converstSeekers(data["seekers"]));
  }

  converstSeekers(seekerArray: any): Seeker[] {
    this.testData = seekerArray.map((seekerObject: any)=>{
      return {
        _id: seekerObject._id!,
        firstName: seekerObject.firstName!,
        lastName: seekerObject.lastName!,
        lastMessageDate: seekerObject.lastMessageDate!,
        messages: (seekerObject.messages as any).map((messageObject: any) => <Message> {
            dateCompleted: new Date(messageObject.dateCompleted),
            direction: Number(messageObject.direction),
            body: messageObject.body.length < 250? messageObject.body : messageObject.body.substr(0,250),
            seekerId: seekerObject._id,
            status: messageObject.status
        }).sort((n1: Message, n2: Message)=>{ 
            if(n1.dateCompleted && n2.dateCompleted) {return n1.dateCompleted.getTime() - n2.dateCompleted.getTime()}
            else return -1;
        })
      }
    }).filter((spam: Seeker)=>{return spam.firstName && spam.lastName})
      .sort((n1: Seeker, n2: Seeker)=>Date.parse(n1.lastMessageDate) - Date.parse(n2.lastMessageDate))
    return this.testData
  }

  getSeekers(): Promise<Seeker[]> {
    const promise = this.http.get(this.seekerUrl)
    .toPromise()
    .then((data: any)=>{
      return this.converstSeekers(data["seekers"])
    })
    return promise;
  }

  getData(): Observable<any> {
    const data =  this.http.get<any>(this.seekerUrl);
    console.log(data);
    return data;
  }
}
