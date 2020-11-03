import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IProperty, Property } from 'app/shared/model/property.model';
import { PropertyService } from './property.service';
import { ISale } from 'app/shared/model/sale.model';
import { SaleService } from 'app/entities/sale/sale.service';
import { IRent } from 'app/shared/model/rent.model';
import { RentService } from 'app/entities/rent/rent.service';
import { IUserAccount } from 'app/shared/model/user-account.model';
import { UserAccountService } from 'app/entities/user-account/user-account.service';
import { IMoneyType } from 'app/shared/model/money-type.model';
import { MoneyTypeService } from 'app/entities/money-type/money-type.service';
import { ICanton } from 'app/shared/model/canton.model';
import { CantonService } from 'app/entities/canton/canton.service';
import { IPropertyCategory } from 'app/shared/model/property-category.model';
import { PropertyCategoryService } from 'app/entities/property-category/property-category.service';

type SelectableEntity = ISale | IRent | IUserAccount | IMoneyType | ICanton | IPropertyCategory;

@Component({
  selector: 'jhi-property-update',
  templateUrl: './property-update.component.html',
})
export class PropertyUpdateComponent implements OnInit {
  isSaving = false;
  sales: ISale[] = [];
  rents: IRent[] = [];
  useraccounts: IUserAccount[] = [];
  moneytypes: IMoneyType[] = [];
  cantons: ICanton[] = [];
  propertycategories: IPropertyCategory[] = [];

  editForm = this.fb.group({
    id: [],
    title: [],
    description: [],
    price: [],
    discount: [],
    landSquareMeters: [],
    areaSquareMeters: [],
    latitude: [],
    longitude: [],
    zoom: [],
    addressText: [],
    creationDate: [],
    state: [],
    sale: [],
    rent: [],
    userAccount: [],
    moneyType: [],
    canton: [],
    propertyCategory: [],
  });

  constructor(
    protected propertyService: PropertyService,
    protected saleService: SaleService,
    protected rentService: RentService,
    protected userAccountService: UserAccountService,
    protected moneyTypeService: MoneyTypeService,
    protected cantonService: CantonService,
    protected propertyCategoryService: PropertyCategoryService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ property }) => {
      if (!property.id) {
        const today = moment().startOf('day');
        property.creationDate = today;
      }

      this.updateForm(property);

      this.saleService
        .query({ filter: 'property-is-null' })
        .pipe(
          map((res: HttpResponse<ISale[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: ISale[]) => {
          if (!property.sale || !property.sale.id) {
            this.sales = resBody;
          } else {
            this.saleService
              .find(property.sale.id)
              .pipe(
                map((subRes: HttpResponse<ISale>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: ISale[]) => (this.sales = concatRes));
          }
        });

      this.rentService
        .query({ filter: 'property-is-null' })
        .pipe(
          map((res: HttpResponse<IRent[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IRent[]) => {
          if (!property.rent || !property.rent.id) {
            this.rents = resBody;
          } else {
            this.rentService
              .find(property.rent.id)
              .pipe(
                map((subRes: HttpResponse<IRent>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IRent[]) => (this.rents = concatRes));
          }
        });

      this.userAccountService.query().subscribe((res: HttpResponse<IUserAccount[]>) => (this.useraccounts = res.body || []));

      this.moneyTypeService.query().subscribe((res: HttpResponse<IMoneyType[]>) => (this.moneytypes = res.body || []));

      this.cantonService.query().subscribe((res: HttpResponse<ICanton[]>) => (this.cantons = res.body || []));

      this.propertyCategoryService
        .query()
        .subscribe((res: HttpResponse<IPropertyCategory[]>) => (this.propertycategories = res.body || []));
    });
  }

  updateForm(property: IProperty): void {
    this.editForm.patchValue({
      id: property.id,
      title: property.title,
      description: property.description,
      price: property.price,
      discount: property.discount,
      landSquareMeters: property.landSquareMeters,
      areaSquareMeters: property.areaSquareMeters,
      latitude: property.latitude,
      longitude: property.longitude,
      zoom: property.zoom,
      addressText: property.addressText,
      creationDate: property.creationDate ? property.creationDate.format(DATE_TIME_FORMAT) : null,
      state: property.state,
      sale: property.sale,
      rent: property.rent,
      userAccount: property.userAccount,
      moneyType: property.moneyType,
      canton: property.canton,
      propertyCategory: property.propertyCategory,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const property = this.createFromForm();
    if (property.id !== undefined) {
      this.subscribeToSaveResponse(this.propertyService.update(property));
    } else {
      this.subscribeToSaveResponse(this.propertyService.create(property));
    }
  }

  private createFromForm(): IProperty {
    return {
      ...new Property(),
      id: this.editForm.get(['id'])!.value,
      title: this.editForm.get(['title'])!.value,
      description: this.editForm.get(['description'])!.value,
      price: this.editForm.get(['price'])!.value,
      discount: this.editForm.get(['discount'])!.value,
      landSquareMeters: this.editForm.get(['landSquareMeters'])!.value,
      areaSquareMeters: this.editForm.get(['areaSquareMeters'])!.value,
      latitude: this.editForm.get(['latitude'])!.value,
      longitude: this.editForm.get(['longitude'])!.value,
      zoom: this.editForm.get(['zoom'])!.value,
      addressText: this.editForm.get(['addressText'])!.value,
      creationDate: this.editForm.get(['creationDate'])!.value
        ? moment(this.editForm.get(['creationDate'])!.value, DATE_TIME_FORMAT)
        : undefined,
      state: this.editForm.get(['state'])!.value,
      sale: this.editForm.get(['sale'])!.value,
      rent: this.editForm.get(['rent'])!.value,
      userAccount: this.editForm.get(['userAccount'])!.value,
      moneyType: this.editForm.get(['moneyType'])!.value,
      canton: this.editForm.get(['canton'])!.value,
      propertyCategory: this.editForm.get(['propertyCategory'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProperty>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}
