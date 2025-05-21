import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import Chart from 'chart.js/auto';

interface Destino {
  nombre: string;
  categoria: string;
  imagen: string;
  puntuacion: number; // De 1 a 5
}

@Component({
  selector: 'app-destinos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './destinos.component.html',
  styleUrls: ['./destinos.component.css']
})
export class DestinosComponent implements AfterViewInit {

  constructor(private router: Router) { }

  destinos: Destino[] = [
    { nombre: 'Playa Tropical', categoria: 'playa', imagen: 'assets/playa.jpg', puntuacion: 5 },
    { nombre: 'Montañas en Perú', categoria: 'montaña', imagen: 'assets/montana.jpg', puntuacion: 4 },
    { nombre: 'Ciudad Moderna', categoria: 'ciudad', imagen: 'assets/ciudad.jpg', puntuacion: 3 }
  ];

  filtroTexto: string = '';
  filtroCategoria: string = 'todos';
  destino1: string = '';
  destino2: string = '';
  resultadoComparacion: string = '';
  comparacion: Destino[] = [];

  private chart: Chart | null = null;

  ngAfterViewInit() {
    // El gráfico se genera luego de seleccionar destinos
  }

  destinosFiltrados(): Destino[] {
    return this.destinos.filter(destino =>
      (this.filtroCategoria === 'todos' || destino.categoria === this.filtroCategoria) &&
      destino.nombre.toLowerCase().includes(this.filtroTexto.toLowerCase())
    );
  }

  getEstrellas(puntuacion: number): string {
    const total = 5;
    const llenas = Math.floor(puntuacion);
    const media = (puntuacion % 1) >= 0.5 ? 1 : 0;
    const vacías = total - llenas - media;
    return '★'.repeat(llenas) + (media ? '½' : '') + '☆'.repeat(vacías);
  }

  compararDestinos(): void {
    if (!this.destino1 || !this.destino2) {
      this.resultadoComparacion = 'Por favor selecciona dos destinos.';
      return;
    }

    if (this.destino1 === this.destino2) {
      this.resultadoComparacion = 'Selecciona dos destinos diferentes para comparar.';
      return;
    }

    const d1 = this.destinos.find(d => d.nombre === this.destino1);
    const d2 = this.destinos.find(d => d.nombre === this.destino2);

    if (d1 && d2) {
      this.comparacion = [d1, d2];

      if (d1.puntuacion > d2.puntuacion) {
        this.resultadoComparacion = `${d1.nombre} está mejor puntuado que ${d2.nombre}.`;
      } else if (d2.puntuacion > d1.puntuacion) {
        this.resultadoComparacion = `${d2.nombre} está mejor puntuado que ${d1.nombre}.`;
      } else {
        this.resultadoComparacion = `${d1.nombre} y ${d2.nombre} tienen la misma puntuación.`;
      }

      setTimeout(() => this.generarGrafico(), 0);
    }
  }

  generarGrafico(): void {
    if (this.chart) {
      this.chart.destroy();
    }

    const canvas = document.getElementById('graficoComparacion') as HTMLCanvasElement;
    const ctx = canvas?.getContext('2d');
    if (!ctx) return;

    const gradient1 = ctx.createLinearGradient(0, 0, 0, 200);
    gradient1.addColorStop(0, '#ff9a9e');
    gradient1.addColorStop(1, '#fad0c4');

    const gradient2 = ctx.createLinearGradient(0, 0, 0, 200);
    gradient2.addColorStop(0, '#a18cd1');
    gradient2.addColorStop(1, '#fbc2eb');

    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.comparacion.map(d => d.nombre),
        datasets: [{
          label: 'Calificación de 1 a 5',
          data: this.comparacion.map(d => d.puntuacion),
          backgroundColor: [gradient1, gradient2],
          borderRadius: 10,
          borderSkipped: false,
          barThickness: 50
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            labels: {
              color: '#333',
              font: {
                size: 20,
                family: "'Segoe UI', sans-serif"
              }
            }
          },
          tooltip: {
            backgroundColor: '#333',
            titleColor: '#fff',
            bodyColor: '#fff',
            callbacks: {
              label: context => `⭐ ${context.raw} estrellas`
            }
          },
          title: {
            display: true,
            text: 'Comparación de Puntuación',
            font: {
              size: 18,
              weight: 'bold'
            },
            color: '#444'
          }
        },
        scales: {
          y: {
            min: 1,
            max: 5,
            ticks: {
              stepSize: 1,
              callback: value => `${value}⭐`,
              color: '#555'
            },
            title: {
              display: true,
              text: 'Estrellas',
              font: {
                size: 14
              }
            },
            grid: {
              color: '#e0e0e0 '
            }
          },
          x: {
            ticks: {
              color: '#444',
              font: {
                size: 14
              }
            },
            grid: {
              display: false
            }
          }
        }
      }
    });
  }

  buscar(): void {
    this.router.navigate(['/buscar'], {
      queryParams: { q: this.filtroTexto }
    });
  }
}
