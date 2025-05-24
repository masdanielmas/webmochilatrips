// src/app/user/user.component.ts
import { Component } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms'; // Importa FormsModule y NgForm directamente aquí
import { CommonModule } from '@angular/common'; // Necesario para directivas como *ngIf

// ¡CORRECCIÓN AQUÍ! Asegúrate de importar la interfaz 'User' junto con 'UserService'.
// Ajusta la ruta si tu UserService no está en '../../services/user.service'.
import { UserService, User } from '../../services/user.service';

@Component({
  selector: 'app-user',
  standalone: true, // Esto indica que es un componente independiente
  imports: [
    CommonModule, // Necesario para directivas como *ngIf
    FormsModule   // Importa FormsModule aquí directamente para NgModel y NgForm
  ],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  // Objeto que se vinculará a los campos del formulario.
  // Se tipifica con la interfaz 'User'.
  newUser: User = {
    usuario: '',
    correo: '',
    clave: '', // En una aplicación real, no envías la clave en texto plano; el backend la hashea
    nombre: '',
    telefono: '',
    direccion: '',
    ciudad: '',
    preferencias_de_viaje: '',
    rol: 'Usuario' // Puedes establecer un valor predeterminado si es un rol común
  };

  message: string | null = null; // Para mostrar mensajes de retroalimentación al usuario
  isError: boolean = false; // Para cambiar el estilo del mensaje (éxito/error)

  constructor(private userService: UserService) { } // Inyecta el UserService

  /**
   * Se ejecuta cuando el formulario es enviado.
   * @param form La instancia NgForm que representa el formulario.
   */
  onSubmit(form: NgForm): void {
    this.message = null; // Limpiar mensajes anteriores
    this.isError = false;

    if (form.valid) {
      this.message = 'Enviando datos de registro...';
      this.isError = false;

      // Llama al método createUser de tu servicio
      this.userService.createUser(this.newUser).subscribe({
        next: (response) => {
          // 'next' se ejecuta cuando la petición HTTP es exitosa
          console.log('Usuario creado exitosamente:', response);
          this.message = '¡Usuario registrado exitosamente!';
          this.isError = false;
          form.resetForm(); // Limpia todos los campos del formulario
          // Opcional: restablecer 'newUser' a su estado inicial si form.resetForm() no es suficiente para tu caso
          this.newUser = {
            usuario: '',
            correo: '',
            clave: '',
            nombre: '',
            telefono: '',
            direccion: '',
            ciudad: '',
            preferencias_de_viaje: '',
            rol: 'Usuario'
          };
        },
        error: (error) => {
          // 'error' se ejecuta si hay un problema con la petición HTTP
          console.error('Error al registrar usuario:', error);
          // Intenta obtener un mensaje de error más específico del backend
          this.message = `Error al registrar usuario: ${error.error?.message || error.message || 'Por favor, inténtalo de nuevo.'}`;
          this.isError = true;
        }
      });
    } else {
      // El formulario no es válido (campos requeridos no llenos, etc.)
      this.message = 'Por favor, completa todos los campos requeridos y corrige los errores.';
      this.isError = true;
      // Marcar todos los campos como "tocados" para que los mensajes de validación se muestren
      Object.values(form.controls).forEach(control => {
        control.markAsTouched();
      });
    }
  }
}