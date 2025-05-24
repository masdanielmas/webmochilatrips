import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Destino {
  pais: string;
  ciudad: string;
  fecha_inicio?: string;
  fecha_final?: string;
  precio: string;
  descripcion?: string;
  duracion?: string;
  imagen1?: string;
  imagen2?: string;
  imagen3?: string;
  imagen4?: string;
}

@Injectable({
  providedIn: 'root'
})
export class DestinosService {
  private apiUrl = 'http://localhost:3001/api/destinos'; // Ajusta esto a tu API real

  constructor(private http: HttpClient) { }

  getDestinos(): Observable<Destino[]> {
    return this.http.get<Destino[]>(this.apiUrl);
  }
}
