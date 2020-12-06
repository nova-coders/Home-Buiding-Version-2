import { Component, OnInit, OnDestroy } from '@angular/core';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import { IPublishingPackage, PublishingPackage } from 'app/shared/model/publishing-package.model';
import { Subscription } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { PublishingPackageService } from '../entities/publishing-package/publishing-package.service';
import { Account } from 'app/core/user/account.model';
import { JhiEventManager } from 'ng-jhipster';
import { ServicePaymentService } from 'app/service-payment/service-payment.service';
import { UserAccount } from 'app/shared/model/user-account.model';

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
  public packages: PublishingPackage[];
  public publishingPackageSelected?: IPublishingPackage | PublishingPackage = new PublishingPackage();
  public userAccount = new UserAccount();
  public isPayment = true;
  public loading = false;
  public payment = false;
  public paymentError = false;
  public successPayment = false;
  constructor(
    private servicePaymentService: ServicePaymentService,
    protected publishingPackageService: PublishingPackageService,
    protected eventManager: JhiEventManager
  ) {
    this.publishingPackageSelected = {} as IPublishingPackage;
    this.userAccount.publishingPackage = {} as UserAccount;
    this.packages = [];
  }
  ngOnInit(): void {
    window.scroll(0, 0);
    this.loadAll();
    this.servicePaymentService.getUserAccount().subscribe(userAccount => {
      this.userAccount = userAccount.body;
    });
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
        if (this.publishingPackages[i].state) {
          this.packages.push(this.publishingPackages[i]);
        }
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
    this.isPayment = false;
    this.loading = true;
    this.setPaymentLanding();
  }
  public setPaymentLanding(): void {
    window.scroll(0, 0);
    window.setTimeout(() => {
      this.loading = false;
      this.payment = true;
    }, 2000);
  }
  getUser() {}
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
                value: '' + this.publishingPackageSelected?.price,
                breakdown: {
                  item_total: {
                    currency_code: 'USD',
                    value: '' + this.publishingPackageSelected?.price,
                  },
                },
              },
              items: [
                {
                  name: 'Paquete publicitario ' + this.publishingPackageSelected?.name,
                  quantity: '1',
                  category: 'DIGITAL_GOODS',
                  unit_amount: {
                    currency_code: 'USD',
                    value: '' + this.publishingPackageSelected?.price,
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
        actions.order.get().then((details: any) => {
          if (details.status === 'APPROVED') {
            this.userAccount.publishingPackage = this.publishingPackageSelected;
            if (this.userAccount.publishingPackage?.id != null && this.userAccount.id != null) {
              this.payment = false;
              this.loading = true;
              window.scroll(0, 0);
              this.servicePaymentService
                .assignPackageToUser(this.userAccount.publishingPackage.id, this.userAccount.id)
                .subscribe((response: any) => {
                  this.successPayment = true;
                  window.setTimeout(() => {
                    window.location.href = '/';
                  }, 5000);
                });
            }
          }
        });
      },
      onClientAuthorization: (data: any): void => {
        this.loading = true;
        this.showSuccess = true;
      },
      onCancel: (data: any, actions: any): void => {
        this.isPayment = true;
        this.loading = false;
        this.payment = false;
        this.successPayment = false;
      },
      onError: (err): void => {
        this.paymentError = true;
        this.isPayment = true;
        this.loading = false;
        this.payment = false;
        this.successPayment = false;
      },
      onClick: (data: any, actions: any): void => {
        this.showSuccess = false;
      },
    };
  }
  public cancel(): void {
    this.isPayment = true;
    this.loading = false;
    this.payment = false;
    this.successPayment = false;
  }
}
