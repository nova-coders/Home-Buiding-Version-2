import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpResponse, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { IProperty, Property } from 'app/shared/model/property.model';
import { PropertyService } from './property.service';
import { ISale, Sale } from 'app/shared/model/sale.model';
import { SaleService } from 'app/entities/sale/sale.service';
import { IUserAccount, UserAccount } from 'app/shared/model/user-account.model';
import { UserAccountService } from 'app/entities/user-account/user-account.service';
import { IMoneyType } from 'app/shared/model/money-type.model';
import { MoneyTypeService } from 'app/entities/money-type/money-type.service';
import { ICanton } from 'app/shared/model/canton.model';
import { CantonService } from 'app/entities/canton/canton.service';
import { IPropertyCategory } from 'app/shared/model/property-category.model';
import { PropertyCategoryService } from 'app/entities/property-category/property-category.service';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { ProvinceService } from '../province/province.service';
import { IProvince, Province } from '../../shared/model/province.model';
import { ImageService } from '../../global-services/image.service';
import { IImageCategory, ImageCategory } from '../../shared/model/image-category.model';
import { ImageCategoryService } from '../image-category/image-category.service';
import { ServicePaymentService } from '../../service-payment/service-payment.service';
import { IPropertyImage, PropertyImage } from '../../shared/model/property-image.model';
import { SeeAuctionService } from 'app/see-auction/see-auction.service';
type SelectableEntity = ISale | IUserAccount | IMoneyType | ICanton | IPropertyCategory;

@Component({
  selector: 'jhi-property-update',
  templateUrl: './property-update.component.html',
  styleUrls: ['./property.scss'],
})
export class PropertyUpdateComponent implements OnInit {
  isUpdate = false;
  myProperty!: Property;
  step: any = 1;
  isSaving = false;
  isSelected = false;
  isValidDate = false;
  sales: ISale[] = [];
  lstUserAccounts: IUserAccount[] = [];
  lstMoneytypes: IMoneyType[] = [];
  lstCantons: ICanton[] = [];
  lstProvinces: IProvince[] = [];
  lstPropertyCategories: IPropertyCategory[] = [];
  lstImageCategory: IImageCategory[] = [];
  lstPropertyImages: IPropertyImage[] = [];
  cantonIndex!: number;
  catastralPlan!: any;
  registryStudy!: any;
  zoom = 8;
  lat = 9.9280694;
  lng = -84.0907246;
  address!: string;
  errorImage = false;
  errorFiles = false;
  saleExist = false;
  private geoCoder = new google.maps.Geocoder();
  @ViewChild('placesRef', { static: false }) placesRef!: GooglePlaceDirective;
  options: any = {
    types: [],
    componentRestrictions: { country: 'CR' },
  };
  files: File[];
  fileUrl: string;
  error = false;
  public userAccount = new UserAccount();
  trustedDashboardUrl!: SafeUrl;
  propertyForm = this.fb.group({
    id: [],
    title: ['', [Validators.required]],
    description: ['', [Validators.required]],
    price: ['', [Validators.required]],
    discount: [''],
    finalDate: ['', [Validators.required]],
    landSquareMeters: ['', [Validators.required]],
    areaSquareMeters: ['', [Validators.required]],
    addressText: ['', [Validators.required]],
    moneyType: ['', [Validators.required]],
    canton: ['', [Validators.required]],
    propertyCategory: ['', [Validators.required]],
    propertyId: ['', [Validators.required]],
    cadastralPlan: ['', [Validators.required]],
    registryStudy: ['', [Validators.required]],
    imageCategory: ['', [Validators.required]],
    province: ['', [Validators.required]],
  });

  constructor(
    protected propertyService: PropertyService,
    protected saleService: SaleService,
    protected userAccountService: UserAccountService,
    protected moneyTypeService: MoneyTypeService,
    protected cantonService: CantonService,
    protected provinceService: ProvinceService,
    protected imageCategoryService: ImageCategoryService,
    protected propertyCategoryService: PropertyCategoryService,
    protected servicePaymentService: ServicePaymentService,
    protected activatedRoute: ActivatedRoute,
    protected propertiesImages: SeeAuctionService,
    private fb: FormBuilder,
    private imageService: ImageService,
    private router: Router,
    private el: ElementRef,
    private domSanitizer: DomSanitizer,
    private http: HttpClient
  ) {
    this.files = [];
    this.fileUrl = '';
    this.userAccount.publishingPackage = {} as UserAccount;
    this.myProperty = new Property();
  }

  ngOnInit(): void {
    window.scroll(0, 0);
    this.activatedRoute.data.subscribe(({ property }) => {
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
      this.imageCategoryService.query().subscribe((res: HttpResponse<IImageCategory[]>) => (this.lstImageCategory = res.body || []));
      this.provinceService.query().subscribe((res: HttpResponse<IProvince[]>) => (this.lstProvinces = res.body || []));
      this.userAccountService.query().subscribe((res: HttpResponse<IUserAccount[]>) => (this.lstUserAccounts = res.body || []));
      this.moneyTypeService.query().subscribe((res: HttpResponse<IMoneyType[]>) => (this.lstMoneytypes = res.body || []));
      this.saleService.query().subscribe((response: HttpResponse<ISale[]>) => (this.sales = response.body || []));
      this.propertyCategoryService
        .query()
        .subscribe((res: HttpResponse<IPropertyCategory[]>) => (this.lstPropertyCategories = res.body || []));
      this.servicePaymentService.getUserAccount().subscribe(userAccount => {
        this.userAccount = userAccount.body;
      });
      this.myProperty = property;
      if (!!this.myProperty.id) {
        this.myProperty = property;
        this.setData();
        this.updateForm(property);
      } else {
        this.setCurrentLocation();
      }
    });
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
  public markerDragEnd(coords: any): void {
    this.lat = Number(coords.lat);
    this.lng = Number(coords.lng);
    this.geoCoder == new google.maps.Geocoder();

    this.getAddress();
  }

  public getAddress(): void {
    this.geoCoder?.geocode({ location: { lat: this.lat, lng: this.lng } }, (results: any, status: any) => {
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
          this.address = results[0].formatted_address;
        } else {
          //window.alert('No results found');
        }
      } else {
        // window.alert('Geocoder failed due to: ' + status);
      }
    });
  }
  updateForm(property: IProperty): void {
    this.propertyForm.patchValue({
      id: this.myProperty.id,
      title: this.myProperty.title,
      description: this.myProperty.description,
      price: this.myProperty.price,
      discount: this.myProperty.discount,
      finalDate: moment(this.myProperty.sale?.finalDate).format(DATE_TIME_FORMAT),
      landSquareMeters: this.myProperty.landSquareMeters,
      areaSquareMeters: this.myProperty.areaSquareMeters,
      addressText: this.myProperty.addressText,
      canton: this.myProperty.canton,
      moneyType: this.myProperty.moneyType,
      propertyId: this.myProperty.sale?.propertyId,
      propertyCategory: this.myProperty.propertyCategory,
      cadastralPlan: String(this.myProperty.sale?.cadastralPlan),
      registryStudy: String(this.myProperty.sale?.registryStudy),
      imageCategory: this.obtainIdImage(),
      province: this.myProperty.canton?.province?.id,
      latitude: this.lat,
      longitude: this.lng,
      zoom: this.zoom,
      sale: this.myProperty.sale,
      userAccount: this.myProperty.userAccount,
    });
  }
  public obtainIdImage(): IImageCategory | undefined {
    let imageCategory: IImageCategory | undefined;
    if (this.myProperty.propertyImages) {
      imageCategory = this.myProperty.propertyImages[0].imageCategory;
    }
    return imageCategory;
  }
  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const property = this.createFromForm();
    if (property.id !== undefined) {
      this.processUpdate(property);
    } else {
      this.processSave(property);
    }
  }

  previous(): void {
    this.step = this.step - 1;
  }

  next(): void {
    console.log(this.propertyForm);
    if (!this.isUpdate) {
      this.validatePropertyId();
      this.validateForm();
    }
    if (!this.isFinalDate() && !this.saleExist) {
      this.step = this.step + 1;
      window.scrollTo(0, 0);
    }
  }

  private isFinalDate(): boolean {
    let date1 = moment(this.propertyForm.get(['finalDate'])!.value, DATE_TIME_FORMAT);
    let difference = date1.diff(new Date(), 'days');
    let days = this.userAccount!.publishingPackage!.cantDays;
    // @ts-ignore
    return (this.isValidDate = !(difference <= days && difference >= 0));
  }

  private createFromForm(): IProperty {
    let mySale = new Sale();
    mySale.cadastralPlan = this.catastralPlan;
    mySale.registryStudy = this.registryStudy;
    mySale.propertyId = this.propertyForm.get(['propertyId'])!.value;
    mySale.finalDate = moment(this.propertyForm.get(['finalDate'])!.value, DATE_TIME_FORMAT);
    return {
      ...new Property(),
      id: this.propertyForm.get(['id'])!.value,
      title: this.propertyForm.get(['title'])!.value,
      description: this.propertyForm.get(['description'])!.value,
      price: this.propertyForm.get(['price'])!.value,
      discount: this.propertyForm.get(['discount'])!.value,
      landSquareMeters: this.propertyForm.get(['landSquareMeters'])!.value,
      areaSquareMeters: this.propertyForm.get(['areaSquareMeters'])!.value,
      latitude: String(this.lat),
      longitude: String(this.lng),
      zoom: this.zoom,
      addressText: this.propertyForm.get(['addressText'])!.value,
      sale: mySale,
      state: 1,
      userAccount: this.userAccount,
      moneyType: this.propertyForm.get(['moneyType'])!.value,
      canton: this.propertyForm.get(['canton'])!.value,
      propertyCategory: this.propertyForm.get(['propertyCategory'])!.value,
      propertyImages: this.lstPropertyImages,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProperty>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }
  public validatePropertyId(): void {
    let count = 0;
    for (let i = 0; i < this.sales.length; i++) {
      if (this.sales[i].propertyId === this.propertyForm.get(['propertyId'])!.value) {
        count++;
      }
    }
    this.saleExist = count > 0;
  }
  public validateForm(): void {
    const invalidControl = this.el.nativeElement.querySelector('.ng-invalid');
    console.log('estoy validando');

    if (invalidControl) {
      invalidControl.style.borderColor = 'crimson';
      invalidControl.focus();
    }
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.router.navigate(['sales/list']);
    //this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
    this.error = true;
  }

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }

  public setCantonsList(provinceIndex: any): void {
    let mypro: Province;
    mypro = this.lstProvinces[provinceIndex - 1];
    if (mypro != null) {
      this.lat = Number(mypro.latitude);
      this.lng = Number(mypro.longitude);
      this.getAddress();
      this.cantonService
        .findByProvince(provinceIndex)
        .subscribe((response: HttpResponse<ICanton[]>) => (this.lstCantons = response.body || []));
      this.isSelected = true;
    } else {
      this.cantonService
        .findByProvince(provinceIndex)
        .subscribe((response: HttpResponse<ICanton[]>) => (this.lstCantons = response.body || []));
      this.isSelected = true;
    }
  }

  public onSelectImage(event: any): void {
    if (this.files && this.files.length >= 5) {
      this.onRemoveImage(this.files[0]);
    }
    console.log(event);
    this.files.push(...event.addedFiles);
    this.propertyForm.patchValue({
      propertyImages: 'true',
    });
  }

  public onRemoveImage(event: any): void {
    this.files.splice(this.files.indexOf(event), 1);
    this.errorImage = this.files.length === 0;
  }

  public processSave(property: Property): void {
    const fileData = this.files;
    for (let index = 0; index < this.files.length; index++) {
      this.imageService.uploadImage(fileData[index]).subscribe(
        response => {
          this.fileUrl = response.url;
          let myproperty = new PropertyImage();
          myproperty.imageCategory = this.propertyForm.get(['imageCategory'])!.value;
          myproperty.url = this.fileUrl;
          this.lstPropertyImages.push(myproperty);
          if (this.lstPropertyImages.length === this.files.length) {
            console.log(this.files.length, this.lstPropertyImages.length);
            property.propertyImages = this.lstPropertyImages;
            this.subscribeToSaveResponse(this.propertyService.create(property));
          }
        },
        () => {
          this.error = true;
        }
      );
    }
  }

  public processUpdate(property: Property): void {
    const fileData = this.files;
    for (let index = 0; index < this.files.length; index++) {
      this.imageService.uploadImage(fileData[index]).subscribe(
        response => {
          this.fileUrl = response.url;
          let myproperty = new PropertyImage();
          myproperty.imageCategory = this.propertyForm.get(['imageCategory'])!.value;
          myproperty.url = this.fileUrl;
          this.lstPropertyImages.push(myproperty);
          if (this.lstPropertyImages.length === this.files.length) {
            console.log(this.files.length, this.lstPropertyImages.length);
            property.propertyImages = this.lstPropertyImages;
            this.subscribeToSaveResponse(this.propertyService.update(property));
          }
        },
        () => {
          this.error = true;
        }
      );
    }
  }

  public setFiles() {
    const file = document.getElementById('urlCadastralPlan');
    file?.setAttribute('src', this.catastralPlan);
    const file2 = document.getElementById('urlRegistryStudy');
    file2?.setAttribute('src', this.registryStudy);
  }

  public onFileSelected(event: any, opc: number, labelregistryStudy: HTMLLabelElement): void {
    if (event.target.files[0].type != 'application/pdf') {
      alert('solo se permiten archivo PDF');
      return;
    }
    labelregistryStudy.innerHTML = event.target.files.length > 0 ? event.target.files[0].name : 'Suba su archivo';
    this.getBase64(event.target.files[0]).then((base64: any) => {
      if (opc === 1) {
        this.catastralPlan = base64;
        const file = document.getElementById('urlCadastralPlan');
        file?.setAttribute('src', String(base64));
      } else {
        this.registryStudy = base64;
        const file2 = document.getElementById('urlRegistryStudy');
        file2?.setAttribute('src', String(base64));
      }
    });
  }

  public getBase64(file: any): any {
    return new Promise((resolve: any, reject: any) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  public setImages(): void {
    let mypropertyImages = this.myProperty.propertyImages;
    if (this.myProperty.propertyImages) {
      mypropertyImages?.forEach(item => {
        let f: File;
        f = new File([''], String(item.url));
        this.http.get(String(item.url), { responseType: 'blob' }).subscribe(res => {
          console.log(res);
          let file = new File([res], 'name', { type: res.type });
          this.files.push(file);
        });
      });
    }
  }

  private setData() {
    console.log(this.myProperty);
    this.lat = Number(this.myProperty.latitude);
    this.lng = Number(this.myProperty.longitude);
    this.catastralPlan = this.myProperty?.sale?.cadastralPlan;
    this.registryStudy = this.myProperty?.sale?.registryStudy;
    this.isUpdate = true;
    this.setCantonsList(this.myProperty?.canton?.province?.id);
    document.getElementById('field_propertyId')?.setAttribute('readonly', 'true');
    this.setImages();
    this.setFiles();
  }
}
