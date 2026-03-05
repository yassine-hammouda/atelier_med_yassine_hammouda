import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Atelier } from '../models/atelier';

@Injectable({
  providedIn: 'root'
})
export class AtelierService {
  private apiUrl = 'http://localhost:3000/api/users'; 

  constructor(private http: HttpClient) { }

  getAteliers(): Observable<Atelier[]> {
    return this.http.get<Atelier[]>(this.apiUrl);
  }

  createAtelier(atelier: Atelier): Observable<Atelier> {
    return this.http.post<Atelier>(this.apiUrl, atelier);
  }

  updateAtelier(id: string, atelier: Atelier): Observable<Atelier> {
    return this.http.put<Atelier>(`${this.apiUrl}/${id}`, atelier);
  }

  deleteAtelier(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}