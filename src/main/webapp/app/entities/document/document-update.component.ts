import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiDataUtils, JhiFileLoadError, JhiEventManager, JhiEventWithContent } from 'ng-jhipster';

import { IDocument, Document } from 'app/shared/model/document.model';
import { DocumentService } from './document.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { IUserAccount } from 'app/shared/model/user-account.model';
import { UserAccountService } from 'app/entities/user-account/user-account.service';
import { IProperty } from 'app/shared/model/property.model';
import { PropertyService } from 'app/entities/property/property.service';

type SelectableEntity = IUserAccount | IProperty;

@Component({
  selector: 'jhi-document-update',
  templateUrl: './document-update.component.html',
})
export class DocumentUpdateComponent implements OnInit {
  isSaving = false;
  useraccounts: IUserAccount[] = [];
  properties: IProperty[] = [];

  editForm = this.fb.group({
    id: [],
    base64Code: [],
    state: [],
    creationDate: [],
    seller: [],
    buyer: [],
    property: [],
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected documentService: DocumentService,
    protected userAccountService: UserAccountService,
    protected propertyService: PropertyService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ document }) => {
      if (!document.id) {
        const today = moment().startOf('day');
        document.creationDate = today;
      }

      this.updateForm(document);

      this.userAccountService.query().subscribe((res: HttpResponse<IUserAccount[]>) => (this.useraccounts = res.body || []));

      this.propertyService.query().subscribe((res: HttpResponse<IProperty[]>) => (this.properties = res.body || []));
    });
  }

  updateForm(document: IDocument): void {
    this.editForm.patchValue({
      id: document.id,
      base64Code: document.base64Code,
      state: document.state,
      creationDate: document.creationDate ? document.creationDate.format(DATE_TIME_FORMAT) : null,
      seller: document.seller,
      buyer: document.buyer,
      property: document.property,
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType: string, base64String: string): void {
    this.dataUtils.openFile(contentType, base64String);
  }

  setFileData(event: any, field: string, isImage: boolean): void {
    this.dataUtils.loadFileToForm(event, this.editForm, field, isImage).subscribe(null, (err: JhiFileLoadError) => {
      this.eventManager.broadcast(
        new JhiEventWithContent<AlertError>('homeBuildingApp.error', { ...err, key: 'error.file.' + err.key })
      );
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const document = this.createFromForm();
    if (document.id !== undefined) {
      this.subscribeToSaveResponse(this.documentService.update(document));
    } else {
      this.subscribeToSaveResponse(this.documentService.create(document));
    }
  }

  private createFromForm(): IDocument {
    return {
      ...new Document(),
      id: this.editForm.get(['id'])!.value,
      base64Code: this.editForm.get(['base64Code'])!.value,
      state: this.editForm.get(['state'])!.value,
      creationDate: this.editForm.get(['creationDate'])!.value
        ? moment(this.editForm.get(['creationDate'])!.value, DATE_TIME_FORMAT)
        : undefined,
      seller: this.editForm.get(['seller'])!.value,
      buyer: this.editForm.get(['buyer'])!.value,
      property: this.editForm.get(['property'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDocument>>): void {
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
