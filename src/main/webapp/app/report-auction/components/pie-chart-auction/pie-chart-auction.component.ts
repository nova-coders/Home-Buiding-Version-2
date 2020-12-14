import { Component, OnInit } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { PropertyService } from 'app/entities/property/property.service';
import { Property } from 'app/shared/model/property.model';

@Component({
  selector: 'jhi-pie-chart-auction',
  templateUrl: './pie-chart-auction.component.html',
  styleUrls: ['./pie-chart-auction.component.scss'],
})
export class PieChartAuctionComponent implements OnInit {
  // Pie
  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
    },
    plugins: {
      datalabels: {
        formatter: (value: any, ctx: any) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    },
  };
  public pieChartLabels: Label[] = [];
  public pieChartData: number[] = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [ChartDataLabels];
  public pieChartColors = [
    {
      backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)'],
    },
  ];
  public propertyList: Property[];
  constructor(private propertyService: PropertyService) {
    this.propertyList = [];
  }

  ngOnInit(): void {
    this.propertyService.getProperties().subscribe((reponse: any) => {
      const grouped = this.groupBy(reponse.body, (property: Property) => property.canton?.province?.name);
      console.log(grouped);
      grouped.forEach((propertys: Property[], key: string) => {
        let cant = 0;
        propertys.forEach((property: Property) => {
          let status = property.state === 1;
          if (status) {
            cant++;
          }
        });
        this.pieChartLabels.push(key);
        this.pieChartData.push(cant);
      });
    });
  }
  groupBy(list: any, keyGetter: any) {
    const map = new Map();
    list.forEach((item: any) => {
      const key = keyGetter(item);
      const collection = map.get(key);
      if (!collection) {
        map.set(key, [item]);
      } else {
        collection.push(item);
      }
    });
    return map;
  }

  // events
  public chartClicked({ event, active }: { event: MouseEvent; active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent; active: {}[] }): void {
    console.log(event, active);
  }

  changeLegendPosition(): void {
    this.pieChartOptions!.legend!.position = this.pieChartOptions?.legend?.position === 'left' ? 'top' : 'left';
  }
}
