import { Component, OnInit, ViewChild } from '@angular/core';
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
import { IUserAccount } from 'app/shared/model/user-account.model';
import { UserAccountService } from 'app/entities/user-account/user-account.service';
import { IMoneyType } from 'app/shared/model/money-type.model';
import { MoneyTypeService } from 'app/entities/money-type/money-type.service';
import { ICanton } from 'app/shared/model/canton.model';
import { CantonService } from 'app/entities/canton/canton.service';
import { IPropertyCategory } from 'app/shared/model/property-category.model';
import { PropertyCategoryService } from 'app/entities/property-category/property-category.service';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { ProvinceService } from '../province/province.service';
import { IProvince } from '../../shared/model/province.model';
import { ImageService } from '../../global-services/image.service';
type SelectableEntity = ISale | IUserAccount | IMoneyType | ICanton | IPropertyCategory;

@Component({
  selector: 'jhi-property-update',
  templateUrl: './property-update.component.html',
})
export class PropertyUpdateComponent implements OnInit {
  step: any = 1;
  isSaving = false;
  isSelected = false;
  sales: ISale[] = [];
  lstUserAccounts: IUserAccount[] = [];
  lstMoneytypes: IMoneyType[] = [];
  lstCantons: ICanton[] = [];
  lstProvinces: IProvince[] = [];
  lstPropertyCategories: IPropertyCategory[] = [];
  provinceIndex!: number;
  cantonIndex!: number;
  zoom = 8;
  lat: any;
  lng: any;
  address!: string;
  private geoCoder: any;
  @ViewChild('placesRef', { static: false }) placesRef!: GooglePlaceDirective;
  options: any = {
    types: [],
    componentRestrictions: { country: 'CR' },
  };
  files: File[];
  fileUrl!: string;
  error = false;

  propertyForm = this.fb.group({
    id: [],
    title: ['', [Validators.required]],
    description: ['', [Validators.required]],
    price: ['', [Validators.required]],
    discount: ['', [Validators.required]],
    finalDate: ['', [Validators.required]],
    landSquareMeters: ['', [Validators.required]],
    areaSquareMeters: ['', [Validators.required]],
    latitude: ['', [Validators.required]],
    longitude: ['', [Validators.required]],
    zoom: ['', [Validators.required]],
    addressText: ['', [Validators.required]],
    creationDate: ['', [Validators.required]],
    state: ['', [Validators.required]],
    sale: ['', [Validators.required]],
    userAccount: ['', [Validators.required]],
    moneyType: ['', [Validators.required]],
    canton: ['', [Validators.required]],
    propertyCategory: ['', [Validators.required]],
  });

  constructor(
    protected propertyService: PropertyService,
    protected saleService: SaleService,
    protected userAccountService: UserAccountService,
    protected moneyTypeService: MoneyTypeService,
    protected cantonService: CantonService,
    protected provinceService: ProvinceService,
    protected propertyCategoryService: PropertyCategoryService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private imageService: ImageService
  ) {
    this.files = [];
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ property }) => {
      if (!property.id) {
        property.creationDate = moment().startOf('day');
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
      this.provinceService.query().subscribe((res: HttpResponse<IProvince[]>) => (this.lstProvinces = res.body || []));
      this.userAccountService.query().subscribe((res: HttpResponse<IUserAccount[]>) => (this.lstUserAccounts = res.body || []));

      this.moneyTypeService.query().subscribe((res: HttpResponse<IMoneyType[]>) => (this.lstMoneytypes = res.body || []));

      this.propertyCategoryService
        .query()
        .subscribe((res: HttpResponse<IPropertyCategory[]>) => (this.lstPropertyCategories = res.body || []));
    });
    this.setCurrentLocation();
  }

  public handleAddressChange(address: any): void {
    this.lat = address.geometry.location.lat();
    this.lng = address.geometry.location.lng();
  }
  public setCurrentLocation(): void {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.zoom = 15;
      });
    }
  }
  markerDragEnd($event: google.maps.MouseEvent): void {
    this.lat = $event.latLng.lat;
    this.lng = $event.latLng.lng;
    this.getAddress();
  }

  getAddress(): void {
    this.geoCoder.geocode({ location: { lat: this.lat, lng: this.lng } }, (results: any, status: any) => {
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
          this.address = results[0].formatted_address;
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
    });
  }
  updateForm(property: IProperty): void {
    this.propertyForm.patchValue({
      id: property.id,
      title: property.title,
      description: property.description,
      price: property.price,
      discount: property.discount,
      landSquareMeters: property.landSquareMeters,
      areaSquareMeters: property.areaSquareMeters,
      latitude: this.lat,
      longitude: this.lng,
      zoom: this.zoom,
      addressText: property.addressText,
      finalDate: property.finalDate ? property.finalDate.format(DATE_TIME_FORMAT) : null,
      state: property.state,
      sale: property.sale,
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
    this.step = this.step + 1;
    this.isSaving = true;
    const property = this.createFromForm();
    if (property.id !== undefined) {
      this.subscribeToSaveResponse(this.propertyService.update(property));
    } else {
      this.subscribeToSaveResponse(this.propertyService.create(property));
    }
  }

  previous(): void {
    this.step = this.step - 1;
  }

  next(): void {
    this.step = this.step + 1;
  }

  private createFromForm(): IProperty {
    return {
      ...new Property(),
      id: this.propertyForm.get(['id'])!.value,
      title: this.propertyForm.get(['title'])!.value,
      description: this.propertyForm.get(['description'])!.value,
      price: this.propertyForm.get(['price'])!.value,
      discount: this.propertyForm.get(['discount'])!.value,
      landSquareMeters: this.propertyForm.get(['landSquareMeters'])!.value,
      areaSquareMeters: this.propertyForm.get(['areaSquareMeters'])!.value,
      latitude: this.propertyForm.get(['latitude'])!.value,
      longitude: this.propertyForm.get(['longitude'])!.value,
      zoom: this.propertyForm.get(['zoom'])!.value,
      addressText: this.propertyForm.get(['addressText'])!.value,
      finalDate: this.propertyForm.get(['finalDate'])!.value
        ? moment(this.propertyForm.get(['finalDate'])!.value, DATE_TIME_FORMAT)
        : undefined,
      state: this.propertyForm.get(['state'])!.value,
      sale: this.propertyForm.get(['sale'])!.value,
      userAccount: this.propertyForm.get(['userAccount'])!.value,
      moneyType: this.propertyForm.get(['moneyType'])!.value,
      canton: this.propertyForm.get(['canton'])!.value,
      propertyCategory: this.propertyForm.get(['propertyCategory'])!.value,
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

  public setCantonsList(event: any): void {
    this.cantonService
      .findByProvince(event.target.data.id)
      .subscribe((response: HttpResponse<ICanton[]>) => (this.lstCantons = response.body || []));
    this.isSelected = true;
  }

  public onSelectImage(event: any): void {
    if (this.files && this.files.length >= 1) {
      this.onRemoveImage(this.files[0]);
    }

    this.files.push(...event.addedFiles);
  }

  public onRemoveImage(event: any): void {
    this.files.splice(this.files.indexOf(event), 1);
  }

  public uploadFile(): void {
    this.files.push();
    const fileData = this.files[0];
    this.imageService.uploadFile(fileData).subscribe(
      response => {
        this.fileUrl = response.url;
      },
      () => {
        this.error = true;
      }
    );
  }
  public onFileSelected(event: any, opc: number): void {
    this.getBase64(event.target.files[0]).then((base64: string) => {
      if (opc === 1) {
        const file = document.getElementById('urlfile');
        file?.setAttribute('src', base64);
      } else {
        const file2 = document.getElementById('urlfile');
        file2?.setAttribute('src', base64);
      }
    });
  }

  public getBase64(file: any): any {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }
}
