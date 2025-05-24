// src/app/services/user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// ¡ASEGÚRATE DE QUE ESTA INTERFAZ ESTÉ DEFINIDA EN TU user.service.ts!
export interface User {
  usuario: string;
  correo: string;
  clave: string;
  nombre: string;
  telefono: string;
  direccion: string;
  ciudad: string;
  preferencias_de_viaje: string;
  rol: string;
  _id?: string; // Opcional: si tu backend devuelve un ID
  createdAt?: Date; // Opcional: si tu backend devuelve una fecha de creación
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3001/api/users'; // <-- ¡Ajusta esta URL a tu backend!

  constructor(private http: HttpClient) { }

  createUser(userData: User): Observable<User> {
    console.log('Enviando datos de usuario al backend:', userData);
    return this.http.post<User>(this.apiUrl, userData);
  }
}