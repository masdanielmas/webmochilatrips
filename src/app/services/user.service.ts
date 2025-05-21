import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUri = '/api/user';
  httpOptions = new HttpHeaders().set('Content-Type', 'application/json');

  // 💡 Aquí se inyecta HttpClient
  constructor(private http: HttpClient) {}

  getAllUsersData(): Observable<any> {
    return this.http.get<any>(this.apiUri);
  }
}

