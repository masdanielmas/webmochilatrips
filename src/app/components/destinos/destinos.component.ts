import { Component, OnInit } from '@angular/core';
import { DestinosService, Destino } from '../../services/destinos.service';
import { CommonModule } from '@angular/common';

@Component({
  imports: [CommonModule],
  selector: 'app-destinos',
  templateUrl: './destinos.component.html',
  styleUrls: ['./destinos.component.css']
})
export class DestinosComponent implements OnInit {
  destinos: Destino[] = [];

  constructor(private destinosService: DestinosService) { }

  ngOnInit(): void {
    this.destinosService.getDestinos().subscribe((data: Destino[]) => {
      this.destinos = data;
    });
  }
}