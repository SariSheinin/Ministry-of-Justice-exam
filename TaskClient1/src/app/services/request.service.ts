import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// Update the import path to the correct file where Request is exported
import { Request } from '../request/request.module';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  private apiUrl = 'https://localhost:7085/api/request';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Request[]> {
    return this.http.get<Request[]>(this.apiUrl);
  }

  getById(id: number): Observable<Request> {
    return this.http.get<Request>(`${this.apiUrl}/${id}`);
  }

  add(request: Request): Observable<Request> {
    return this.http.post<Request>(this.apiUrl, request);
  }

  update(request: Request): Observable<Request> {
    return this.http.put<Request>(`${this.apiUrl}/${request.id}`, request);
  }

  delete(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }
}
