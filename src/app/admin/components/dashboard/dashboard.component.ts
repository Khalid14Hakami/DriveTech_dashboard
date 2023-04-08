import { Component, ViewChild, OnInit } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

export interface PeriodicElement {
  name: string;
  location: string;
  stored: number;
  available: number;
}

const ELEMENT_DATA1: PeriodicElement[] = [
  { location: 'Ahmedabad', name: 'Hydrogen', stored: 65, available: 10 },
  { location: 'Surt', name: 'Helium', stored: 70, available: 15 },
  { location: 'Vadodra', name: 'Lithium', stored: 80, available: 20 },
  { location: 'Rajkot', name: 'Beryllium', stored: 85, available: 25 },
  { location: 'Gandhinagar', name: 'Boron', stored: 90, available: 30 },
];

export interface PeriodicElement1 {
  storage: string;
  tasks: number;
  done: number;
  progress: any;
}

const ELEMENT_DATA: PeriodicElement1[] = [
  { tasks: 7, storage: 'Ahmedabad Warehouse', done: 7, progress: '100%' },
  { tasks: 19, storage: 'Surt Warehouse', done: 3, progress: '15%' },
  { tasks: 21, storage: 'Vadodra Warehouse', done: 18, progress: '85%' },
  { tasks: 33, storage: 'Rajkot Warehouse', done: 15, progress: '45%' },
  { tasks: 40, storage: 'Gandhinagar Warehouse', done: 20, progress: '55%' },
];

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor() {}

  displayedColumns: string[] = ['location', 'name', 'stored', 'available'];
  dataSource = [...ELEMENT_DATA1];
  displayedColumns1: string[] = ['storage', 'tasks', 'done', 'progress'];
  newDataSource = [...ELEMENT_DATA];

  ngOnInit(): void {}

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  public barChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.4,
      },
    },
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {
        min: 0,
      },
    },
    plugins: {
      legend: { display: true, position: 'bottom' },
    },
  };
  public barChartLabels: string[] = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  public barChartType: ChartType = 'bar';

  public barChartData: ChartData<'bar'> = {
    labels: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
    datasets: [
      {
        data: [5, 2, 4, 7, 6, 2, 8],
        label: 'Storage Capacity',
        backgroundColor: '#67D9C0',
      },
    ],
  };

  // events
  // public chartClicked({
  //   event,
  //   active,
  // }: {
  //   event?: ChartEvent;
  //   active?: {}[];
  // }): void {
  //   console.log(event, active);
  // }

  // public chartHovered({
  //   event,
  //   active,
  // }: {
  //   event?: ChartEvent;
  //   active?: {}[];
  // }): void {
  //   console.log(event, active);
  // }

  public randomize(): void {
    this.barChartType = this.barChartType === 'bar' ? 'line' : 'bar';
  }

  // pie char start

  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
      },
      // datalabels: {
      //   formatter: (value, ctx) => {
      //     if (ctx.chart.data.labels) {
      //       return ctx.chart.data.labels[ctx.dataIndex];
      //     }
      //   },
      // },
    },
  };
  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: [['Maintanance Progress'], ['Sale'], 'Store'],
    datasets: [
      {
        data: [100, 50, 20],
      },
    ],
  };
  public pieChartType: ChartType = 'pie';
  // public pieChartPlugins = [DatalabelsPlugin];

  // events
  public chartClicked({
    event,
    active,
  }: {
    event: ChartEvent;
    active: {}[];
  }): void {
    console.log(event, active);
  }

  public chartHovered({
    event,
    active,
  }: {
    event: ChartEvent;
    active: {}[];
  }): void {
    console.log(event, active);
  }
}
