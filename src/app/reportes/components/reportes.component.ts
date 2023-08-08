import { Component, OnInit } from '@angular/core';
import { ReportesService } from '../services/reportes.service';
import {
  Chart,
  LinearScale,
  BarController,
  CategoryScale,
  BarElement,
  ChartTypeRegistry,
  PieController,
  ArcElement,
  TimeScale,
  LineController,
  LineElement,
  PointElement,
} from 'chart.js';
import { MatTabChangeEvent } from '@angular/material/tabs';
import * as moment from 'moment';
import 'chartjs-adapter-moment';
import { DatePipe } from '@angular/common';

Chart.register(
  LinearScale,
  BarController,
  CategoryScale,
  BarElement,
  PieController,
  ArcElement,
  TimeScale,
  LineController,
  LineElement,
  PointElement
);

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.scss'],
})
export class ReportesComponent implements OnInit {
  mostSoldProductsChart: Chart | null = null;
  mostSoldClientsChart: Chart<
    keyof ChartTypeRegistry,
    number[],
    unknown
  > | null = null;
  mostBuyProvidersChart: Chart<
    keyof ChartTypeRegistry,
    number[],
    unknown
  > | null = null;
  mostSoldSalesChart: Chart | null = null;
  clientsInfo: { id: string; value: number; color: string }[] = [];
  providersInfo: { id: string; value: number; color: string }[] = [];

  constructor(
    private readonly reportesService: ReportesService,
    private readonly datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.loadProductsChart();
  }

  loadProductsChart(): void {
    this.reportesService.getMostSoldProducts().subscribe((data: any) => {
      if (this.mostSoldProductsChart) {
        this.mostSoldProductsChart.destroy();
        this.mostSoldProductsChart = null;
      }

      const products = data.map(
        (p: { nombreArticulo: string }) => p.nombreArticulo
      );
      const quantities = data.map(
        (p: { totalQuantity: any }) => p.totalQuantity
      );

      this.mostSoldProductsChart = new Chart('mostSoldProductsCanvas', {
        type: 'bar',
        data: {
          labels: products,
          datasets: [
            {
              data: quantities,
              label: 'Productos más vendidos',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Cantidad',
              },
            },
            x: {
              title: {
                display: true,
                text: 'Producto',
              },
            },
          },
        },
      });
    });
  }

  onTabChanged(event: MatTabChangeEvent): void {
    switch (event.index) {
      case 0:
        this.loadProductsChart();
        break;
      case 1:
        this.loadClientsChart();
        break;
      case 2:
        this.loadSalesChart();
        break;
      case 3:
        this.loadProvidersChart();
        break;
      default:
        break;
    }
  }

  loadSalesChart(): void {
    this.reportesService.getSales().subscribe((data: any) => {
      if (this.mostSoldSalesChart) {
        this.mostSoldSalesChart.destroy();
        this.mostSoldSalesChart = null;
      }
      // Extract dates and total amounts from the data
      const dates = data.map((sale: { date: string }) =>
        this.datePipe.transform(sale.date, 'dd-MM')
      );
      const totalAmounts = data.map(
        (sale: { totalAmount: number }) => sale.totalAmount
      );

      // Create a line chart
      this.mostSoldSalesChart = new Chart('mostSoldSalesCanvas', {
        type: 'line',
        data: {
          labels: dates,
          datasets: [
            {
              data: totalAmounts,
              label: 'Ventas',
              borderColor: 'rgba(75, 192, 192, 1)',
              fill: false,
            },
          ],
        },
        options: {
          scales: {
            x: {
              // Remove the parser line; the Moment adapter will handle parsing
              title: {
                display: true,
                text: 'Fecha',
              },
            },
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Monto ($)',
              },
            },
          },
        },
      });
    });
  }

  loadClientsChart(): void {
    this.reportesService.getMostSoldClients().subscribe((data: any) => {
      if (this.mostSoldClientsChart) {
        this.mostSoldClientsChart.destroy();
        this.mostSoldClientsChart = null;
      }

      const clients = data.map(
        (client: {
          idcliente: any;
          totalAmount: any;
          nombreCliente: string;
        }) => ({
          label: client.nombreCliente,
          value: client.totalAmount,
        })
      );
      const labels = clients.map((client: { label: any }) => client.label);
      const values = clients.map((client: { value: any }) => client.value);

      const clientIds = data.map(
        (client: { nombreCliente: string; idcliente: any }) =>
          client.nombreCliente
      );
      const clientAmounts = data.map(
        (client: { totalAmount: any }) => +client.totalAmount
      );

      const backgroundColors = clientIds.map(
        () =>
          'rgba(' +
          [
            Math.floor(Math.random() * 256),
            Math.floor(Math.random() * 256),
            Math.floor(Math.random() * 256),
            '0.2',
          ].join(',') +
          ')'
      );
      const borderColors = backgroundColors.map((color: any) =>
        color.replace('0.2', '1')
      );

      this.clientsInfo = clientIds.map((id: any, index: string | number) => {
        return {
          id,
          value: clientAmounts[index],
          color: backgroundColors[index],
        };
      });

      this.mostSoldClientsChart = new Chart<
        keyof ChartTypeRegistry,
        number[],
        unknown
      >('mostSoldClientsCanvas', {
        type: 'pie',
        data: {
          labels: labels,
          datasets: [
            {
              data: values,
              backgroundColor: Array.from(
                { length: clients.length },
                () =>
                  `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
                    Math.random() * 255
                  )}, ${Math.floor(Math.random() * 255)}, 0.2)`
              ),
              borderColor: Array.from(
                { length: clients.length },
                () =>
                  `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
                    Math.random() * 255
                  )}, ${Math.floor(Math.random() * 255)}, 1)`
              ),
              borderWidth: 1,
            },
          ],
        },
        options: {
          plugins: {
            tooltip: {
              enabled: true,
              callbacks: {
                title: (tooltipItem) => {
                  return labels[tooltipItem[0].dataIndex];
                },
              },
              titleColor: 'black',
              bodyColor: 'black',
            },
            legend: {
              labels: {
                color: 'black',
              },
            },
          },
        },
      });
    });
  }

  loadProvidersChart(): void {
    this.reportesService.getMostBuyProviders().subscribe((data: any) => {
      console.log('aca', data);

      if (this.mostBuyProvidersChart) {
        this.mostBuyProvidersChart.destroy();
        this.mostBuyProvidersChart = null;
      }

      const providers = data.map(
        (proveedor: {
          idProveedor: any;
          totalCompras: any;
          nombreProveedor: string;
        }) => ({
          label: proveedor.nombreProveedor,
          value: proveedor.totalCompras,
        })
      );
      const labels = providers.map(
        (proveedor: { label: any }) => proveedor.label
      );
      const values = providers.map(
        (proveedor: { value: any }) => proveedor.value
      );

      const providerIds = data.map(
        (proveedor: { nombreProveedor: string; idProveedor: any }) =>
          proveedor.nombreProveedor
      );
      const providerAmounts = data.map(
        (provider: { totalCompras: any }) => +provider.totalCompras
      );

      const backgroundColors = providerIds.map(
        () =>
          'rgba(' +
          [
            Math.floor(Math.random() * 256),
            Math.floor(Math.random() * 256),
            Math.floor(Math.random() * 256),
            '0.2',
          ].join(',') +
          ')'
      );
      const borderColors = backgroundColors.map((color: any) =>
        color.replace('0.2', '1')
      );

      this.providersInfo = providerIds.map(
        (id: any, index: string | number) => {
          return {
            id,
            value: providerAmounts[index],
            color: backgroundColors[index],
          };
        }
      );

      this.mostBuyProvidersChart = new Chart<
        keyof ChartTypeRegistry,
        number[],
        unknown
      >('mostBuyProvidersCanvas', {
        type: 'pie',
        data: {
          labels: labels,
          datasets: [
            {
              data: values,
              backgroundColor: Array.from(
                { length: providers.length },
                () =>
                  `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
                    Math.random() * 255
                  )}, ${Math.floor(Math.random() * 255)}, 0.2)`
              ),
              borderColor: Array.from(
                { length: providers.length },
                () =>
                  `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
                    Math.random() * 255
                  )}, ${Math.floor(Math.random() * 255)}, 1)`
              ),
              borderWidth: 1,
            },
          ],
        },
        options: {
          plugins: {
            tooltip: {
              enabled: true,
              callbacks: {
                title: (tooltipItem) => {
                  return labels[tooltipItem[0].dataIndex];
                },
              },
              titleColor: 'black',
              bodyColor: 'black',
            },
            legend: {
              labels: {
                color: 'black',
              },
            },
          },
        },
      });
    });
  }
}
