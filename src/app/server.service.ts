import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/Rx'
import { Observable } from 'rxjs/Observable';

@Injectable() // This decorator is required if you plan to inject a service into another service.
export class ServerService {
  constructor(private http: Http) { }

  // post: append to an existent elementStart.
  // put: will override an existent one.

  storeServers(servers: any[]) {
    // return this.http.post('https://udemy-ng-http-3.firebaseio.com/data.json', servers);
    return this.http.put('https://udemy-ng-http-3.firebaseio.com/data.json', servers);
  }

  getServers() {
    return this.http.get('https://udemy-ng-http-3.firebaseio.com/data.json')
      .map(
        (response: Response) => {
          const data = response.json();
          for (const server of data) {
            server.name = 'FETCHED_' + server.name;
          }
          return data;
        }
      )
      .catch(
        (error: Response) => {
          return Observable.throw('Something went wrong!');
        }
      );
  }

  getAppName() {
    return this.http.get('https://udemy-ng-http-3.firebaseio.com/appName.json')
      .map(
        (response: Response) => {
          return response.json();
        }
      );
  }
}