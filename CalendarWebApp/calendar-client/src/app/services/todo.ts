import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class Todo {
    // getTodos(): string [] {
    //     return ['Learn angular', 'Learn DI', 'Learn testing'];
    // }


    // same as below implementation 
//   // Base URL of the API endpoint this service talks to.
//   private apiUrl = 'http://localhost:5220/todo';

//   // HttpClient is injected here the same way Todo itself gets injected into
//   // App — a class asking for a dependency, the DI container supplying it.
//   constructor(private http: HttpClient) {}

//   // http.get() doesn't return the data directly — it returns an Observable,
//   // a "value that will arrive later" wrapper, since the network call is async.
//   // Whoever calls this method has to .subscribe() to actually get the result.
//   getTodos(): Observable<any[]> {
//     return this.http.get<any[]>(this.apiUrl);
//   }

  private apiUrl: string;   // where the API lives
  private http: HttpClient; // the injected HTTP client, stored for use in methods below

  constructor(http: HttpClient) {
    // Angular's DI container supplies http automatically (registered via
    // provideHttpClient() in app.config.ts). We just store it here.
    this.http = http;
    this.apiUrl = 'http://localhost:5220/todo';
  }

  getTodos(): Observable<any[]> {
    // http.get() fires the request immediately but returns an Observable,
    // not the data itself — the response hasn't arrived yet when this line runs.
    const request: Observable<any[]> = this.http.get<any[]>(this.apiUrl);

    // Hand the Observable back to whoever called getTodos(). They'll need to
    // .subscribe() to it to actually receive the data once the request completes.
    return request;
  }

}