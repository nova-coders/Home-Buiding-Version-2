import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { Property } from 'app/shared/model/property.model';
import { PropertyService } from 'app/entities/property/property.service';
import { SeeAuctionService } from 'app/see-auction/see-auction.service';

@Component({
  selector: 'jhi-bar-chart-auction',
  templateUrl: './bar-chart-auction.component.html',
  styleUrls: ['./bar-chart-auction.component.scss'],
})
export class BarChartAuctionComponent implements OnInit {
  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
  };
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;

  public barChartData: ChartDataSets[] = [{ data: [], label: 'Ofertas' }];
  public propertyList: Property[];
  public cantOferrs = 0;
  constructor(private propertyService: PropertyService, private seeAuctionService: SeeAuctionService) {
    this.propertyList = [];
  }

  ngOnInit(): void {
    this.propertyService.getProperties().subscribe((reponse: any) => {
      const grouped = this.groupBy(reponse.body, (property: Property) => property.canton?.province?.name);
      console.log(grouped);
      let data: any = [];
      grouped.forEach((propertys: Property[], key: string) => {
        this.cantOferrs = 0;
        let propertysLength = propertys.length;
        let cantOferrs = 0;
        propertys.forEach((property: Property) => {
          let offers: any = [];
          if (property.sale != null) {
            this.seeAuctionService.geByOffersBySale(property.sale.id as number).subscribe(response => {
              console.log(key);
              offers = response;
              if (offers.length > 0) {
                cantOferrs += offers.length;
                propertysLength--;
                if (propertysLength === 0) {
                  if (this.barChartData[0] != null) {
                    if (this.barChartData[0].data != null) {
                      this.barChartLabels.push(key);
                      this.barChartData[0].data.push(cantOferrs);
                      cantOferrs = 0;
                    }
                  }
                }
              }
            });
          }
        });
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
  public chartClicked({ event, active }: { event?: MouseEvent; active?: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent; active: {}[] }): void {
    console.log(event, active);
  }

  public randomize(): void {
    this.barChartType = this.barChartType === 'bar' ? 'line' : 'bar';
  }
}
