// src/app/services/user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

// Interfaz del usuario
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
  foto?: string;       // Opcional: por si manejas imagen de perfil
  _id?: string;
  createdAt?: Date;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3001/api/users';
  private userKey = 'usuario_actual';  // clave para localStorage
  private user: User | null = null;

  constructor(private http: HttpClient) {
    // Al cargar el servicio, intenta recuperar el usuario desde localStorage
    const userData = localStorage.getItem(this.userKey);
    if (userData) {
      this.user = JSON.parse(userData);
    }
  }

  // Crear nuevo usuario
  createUser(userData: User): Observable<User> {
    console.log('Enviando datos de usuario al backend:', userData);
    return this.http.post<User>(this.apiUrl, userData);
  }

  // Obtener usuario desde memoria
  getUser(): User | null {
    return this.user;
  }

  // Guardar usuario en memoria y localStorage
  setUser(user: User): void {
    this.user = { ...user };
    localStorage.setItem(this.userKey, JSON.stringify(this.user));
  }

  // Actualizar usuario en el backend
  updateUser(user: User): Observable<User> {
    // Verificamos que el usuario tenga _id para poder actualizarlo
    if (!user._id) {
      throw new Error('El usuario no tiene ID, no se puede actualizar');
    }
    const url = `${this.apiUrl}/${user._id}`;
    return this.http.put<User>(url, user);
  }

  // Eliminar usuario del servicio (ej: al cerrar sesión)
  clearUser(): void {
    this.user = null;
    localStorage.removeItem(this.userKey);
  }
}
