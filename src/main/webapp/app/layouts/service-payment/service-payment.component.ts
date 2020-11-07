import { Component, OnInit, OnDestroy } from '@angular/core';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import { IPublishingPackage } from 'app/shared/model/publishing-package.model';
import { Subscription } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { PublishingPackageService } from '../../entities/publishing-package/publishing-package.service';
import { Account } from 'app/core/user/account.model';
import { JhiEventManager } from 'ng-jhipster';
@Component({
  selector: 'jhi-service-payment',
  templateUrl: './service-payment.component.html',
  styleUrls: ['./service-payment.component.scss'],
})
export class ServicePaymentComponent implements OnInit, OnDestroy {
  public payPalConfig?: IPayPalConfig;
  public showSuccess = true;
  public order: any;
  public account: Account | null = null;
  public eventSubscriber?: Subscription;
  public publishingPackages: IPublishingPackage[] | [] = [];
  public publishingPackageSelected?: IPublishingPackage;
  constructor(protected publishingPackageService: PublishingPackageService, protected eventManager: JhiEventManager) {
    this.publishingPackageSelected = {} as IPublishingPackage;
  }
  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInPublishingPackages();
  }
  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }
  loadAll(): void {
    this.publishingPackageService.query().subscribe((res: HttpResponse<IPublishingPackage[]>) => {
      this.publishingPackages = res.body || [];
      for (let i = 0; 4 < this.publishingPackages.length || i < this.publishingPackages.length; i++) {
        this.publishingPackages.pop();
      }
    });
  }
  registerChangeInPublishingPackages(): void {
    this.eventSubscriber = this.eventManager.subscribe('publishingPackageListModification', () => this.loadAll());
  }
  trackId(index: number, item: IPublishingPackage): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }
  setServiceIndex(index: number): void {
    this.publishingPackageSelected = this.publishingPackages[index];
    this.initConfig();
  }
  public initConfig(): void {
    this.payPalConfig = {
      clientId: 'AUhE1PVR_p5RwD-Rdvd9uD0zV_cSrJ6c933Hlmr3Dnls7KhpbS0Cfsn8uunzo_UIySZ5nv_HBCgbJqW2',
      createOrderOnClient: (data: any): any => {
        this.order = {
          intent: 'CAPTURE',
          purchase_units: [
            {
              description: 'Paquete publicitario para subastas y promoción de alquiler',
              amount: {
                currency_code: 'USD',
                value: '4.00',
                breakdown: {
                  item_total: {
                    currency_code: 'USD',
                    value: '4.00 ',
                  },
                },
              },
              items: [
                {
                  name: 'Con este paquete publicitario puede publicar propiedades durante ' + this.publishingPackageSelected?.cantDays,
                  quantity: '1',
                  category: 'DIGITAL_GOODS',
                  unit_amount: {
                    currency_code: 'USD',
                    value: '4.00',
                  },
                },
              ],
            },
          ],
        } as ICreateOrderRequest;
        return this.order;
      },
      advanced: {
        commit: 'true',
      },
      style: {
        label: 'paypal',
        layout: 'vertical',
      },
      onApprove: (data: any, actions: any): void => {
        this.showSuccess = true;
        actions.order.get().then((details: any) => {});
      },
      onClientAuthorization: (data: any): void => {
        this.showSuccess = true;
      },
      onCancel: (data: any, actions: any): void => {
        this.showSuccess = false;
      },
      onError: (err): void => {
        this.showSuccess = false;
      },
      onClick: (data: any, actions: any): void => {
        this.showSuccess = true;
      },
    };
  }
}
