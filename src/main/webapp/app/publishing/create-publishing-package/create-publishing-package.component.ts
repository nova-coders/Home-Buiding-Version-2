import { Component, OnInit } from '@angular/core';
import { IPublishingPackage, PublishingPackage } from '../../shared/model/publishing-package.model';
import * as moment from 'moment';
import { UserAccount } from '../../shared/model/user-account.model';
import { PublishingPackageService } from '../../entities/publishing-package/publishing-package.service';
import { HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'jhi-create-publishing-package',
  templateUrl: './create-publishing-package.component.html',
  styleUrls: ['./create-publishing-package.component.scss'],
})
export class CreatePublishingPackageComponent implements OnInit {
  public validate = [
    {
      name: 'name',
      id: 'name',
      valid: true,
    },
    {
      name: 'price',
      id: 'price',
      valid: true,
    },
    {
      name: 'cantPropertySale',
      id: 'cantPropertySale',
      valid: true,
    },
    {
      name: 'cantDays',
      id: 'cantDays',
      valid: true,
    },
    {
      name: 'type',
      id: 'type',
      valid: true,
    },
  ];
  public isValid = false;
  public publishingPackage: PublishingPackage;
  public userAccount: UserAccount;
  public cantPackage = 0;
  public errorFree = false;
  public successSave = false;
  public errorLength = false;
  constructor(private publishingPackageService: PublishingPackageService, private router: Router) {
    this.publishingPackage = new PublishingPackage();
    this.userAccount = new UserAccount();
  }

  ngOnInit(): void {
    window.scroll(0, 0);
    this.publishingPackage.name = '';
    this.publishingPackage.price = 0;
    this.publishingPackage.state = true;
    this.publishingPackage.type = 0;
    this.publishingPackage.cantPropertyRent = 0;
    this.publishingPackage.cantPropertySale = 0;
    this.publishingPackage.professional = false;
    this.publishingPackage.cantDays = 0;
    this.publishingPackage.userAccounts = [];
    this.loadAll();
  }
  public loadAll(): void {
    this.publishingPackageService.query().subscribe((res: HttpResponse<IPublishingPackage[]>) => {
      let packages = res.body || [];
      for (let i = 0; i < packages.length; i++) {
        if (packages[i].state) {
          this.cantPackage++;
        }
      }
    });
  }
  public validateFunction(index: any): void {
    let data = this.publishingPackage[this.validate[index].name];
    if (this.validate[index].name === 'name') {
      data = data?.replace(/ /g, '');
      if (data === '' || data!.length < 5) {
        this.validate[index].valid = false;
        this.isValid = false;
      } else {
        this.validate[index].valid = true;
      }
    } else if (index === 4) {
      let price = this.publishingPackage.price || 0;
      if (price > 0 && this.publishingPackage.type === 0) {
        this.errorFree = true;
        this.validate[index].valid = false;
        this.isValid = false;
      } else {
        if (price < 1 && this.publishingPackage.type != 0) {
          this.validate[1].valid = false;
          this.isValid = false;
        } else {
          if (price < 0 && this.publishingPackage.type === 0) {
            this.validate[1].valid = false;
            this.isValid = false;
          } else {
            this.validate[1].valid = true;
          }
        }
        this.errorFree = false;
      }
    } else {
      if (data < 1) {
        this.validate[index].valid = false;
        this.isValid = false;
      } else {
        this.validate[index].valid = true;
      }
    }
  }
  public setSuccessSave() {
    this.router.navigate(['listPublishingPackage']);
  }
  public savePackage(): void {
    console.log(this.cantPackage);
    if (this.cantPackage > 3) {
      this.errorLength = true;
      return;
    }
    this.validator();
    if (this.isValid) {
      this.publishingPackage.creationDate = moment();
      this.cantPackage++;
      this.publishingPackageService.create(this.publishingPackage).subscribe(response => {
        this.successSave = true;
      });
    }
  }
  public validator(): void {
    this.isValid = true;
    for (let i = 0; i < this.validate.length; i++) {
      let data = this.publishingPackage[this.validate[i].name];
      if (this.validate[i].name === 'name') {
        data = data.replace(/ /g, '');
        if (data === '' || data.length < 6) {
          this.validate[i].valid = false;
          this.isValid = false;
        } else {
          this.validate[i].valid = true;
        }
      } else if (i === 4 || i == 1) {
        let price = this.publishingPackage.price || 0;
        if (price > 0 && this.publishingPackage.type === 0) {
          this.errorFree = true;
          this.validate[4].valid = false;
          this.isValid = false;
        } else {
          if (price < 1 && this.publishingPackage.type != 0) {
            this.validate[1].valid = false;
            this.isValid = false;
          } else {
            this.validate[1].valid = true;
          }
          this.errorFree = false;
        }
      } else {
        if (data < 1) {
          this.validate[i].valid = false;
          this.isValid = false;
        } else {
          this.validate[i].valid = true;
        }
      }
    }
  }
}
