import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LineItem } from '../model/line-item';

const URL = 'http://localhost:8080/api/line-items';

@Injectable({
  providedIn: 'root'
})
export class LineItemService {

  constructor(private http: HttpClient) {}

  list(): Observable<LineItem[]> {
    return this.http.get(URL + '/') as Observable<LineItem[]>;
  }

  getById(id: number): Observable<LineItem> {
    return this.http.get(URL + '/' + id) as Observable<LineItem>;
  }

  getLinesForRequest(requestId: number): Observable<LineItem[]> {
    return this.http.get(`${URL}/lines-for-req/${requestId}`) as Observable<LineItem[]>;
  }
  

  add(lineItem: LineItem): Observable<LineItem> {
    console.log('Adding line item:', lineItem); // Debugging line
    return this.http.post(URL, lineItem) as Observable<LineItem>;
  }
  
  update(lineItem: LineItem): Observable<LineItem> {
    return this.http.put(`${URL}/${lineItem.id}`, lineItem) as Observable<LineItem>;
  }

  delete(id: number): Observable<any> {
    return this.http.delete(URL + '/' + id);
  }

 
}
