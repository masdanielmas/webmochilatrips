import { Component, OnInit } from '@angular/core';
import { UserService, User } from '../../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  usuario: User | null = null;
  editando: boolean = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.usuario = this.userService.getUser();
  }

  toggleEditar(): void {
    this.editando = !this.editando;

    // Si cancela edición, recargar datos para descartar cambios
    if (!this.editando) {
      this.usuario = this.userService.getUser();
    }
  }

  guardar(): void {
    if (this.usuario) {
      this.userService.setUser(this.usuario);
      this.editando = false;
      alert('Perfil actualizado correctamente.');
    }
  }
}
