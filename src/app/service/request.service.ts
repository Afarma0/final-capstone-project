import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Request } from '../model/request';
import { RequestCreate } from '../model/request-create';

const URL = 'http://localhost:8080/api/requests';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private http: HttpClient) {}

  list(): Observable<Request[]> {
    return this.http.get(`${URL}/`) as Observable<Request[]>;
  }

  getById(id: number): Observable<Request> {
    return this.http.get(`${URL}/${id}`) as Observable<Request>;
  }

  add(request: RequestCreate): Observable<Request> {
    return this.http.post(`${URL}`, request) as Observable<Request>;
  }
  
  update(request: Request): Observable<Request> {
    return this.http.put(`${URL}/${request.id}`, request) as Observable<Request>;
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${URL}/${id}`);
  }

  submitForReview(id: number): Observable<any> {
    return this.http.put(`${URL}/submit-review/${id}`, null);
  }

  getRequestsInReviewNotOwned(userId: number): Observable<Request[]> {
    return this.http.get<Request[]>(`http://localhost:8080/api/requests/list-review/${userId}`);
  }
  
  approve(id: number): Observable<any> {
    return this.http.put(`${URL}/approve/${id}`, null);
  }
  
  reject(id: number, request: Request): Observable<any> {
    return this.http.put(`${URL}/reject/${id}`, request);
  }
  
  }
  
  

