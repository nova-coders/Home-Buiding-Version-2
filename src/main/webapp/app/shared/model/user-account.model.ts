import { Moment } from 'moment';
import { IUser } from 'app/core/user/user.model';
import { IProfessionalProfileUser } from 'app/shared/model/professional-profile-user.model';
import { IProperty } from 'app/shared/model/property.model';
import { IOffer } from 'app/shared/model/offer.model';
import { IScore } from 'app/shared/model/score.model';
import { ISupportTicket } from 'app/shared/model/support-ticket.model';
import { IDocument } from 'app/shared/model/document.model';
import { IPublishingPackage } from 'app/shared/model/publishing-package.model';
import { IRole } from 'app/shared/model/role.model';

export interface IUserAccount {
  id?: number;
  identification?: string;
  birthdate?: Moment;
  profilePicture?: string;
  signaturePicture?: string;
  signatureCode?: string;
  state?: boolean;
  creationDate?: Moment;
  user?: IUser;
  professionalProfileUser?: IProfessionalProfileUser;
  properties?: IProperty[];
  offers?: IOffer[];
  scores?: IScore[];
  ownedTickets?: ISupportTicket[];
  clientTickets?: ISupportTicket[];
  ownedDocuments?: IDocument[];
  purchasedDocuments?: IDocument[];
  publishingPackage?: IPublishingPackage;
  role?: IRole;
}

export class UserAccount implements IUserAccount {
  constructor(
    public id?: number,
    public identification?: string,
    public birthdate?: Moment,
    public profilePicture?: string,
    public signaturePicture?: string,
    public signatureCode?: string,
    public state?: boolean,
    public creationDate?: Moment,
    public user?: IUser,
    public professionalProfileUser?: IProfessionalProfileUser,
    public properties?: IProperty[],
    public offers?: IOffer[],
    public scores?: IScore[],
    public ownedTickets?: ISupportTicket[],
    public clientTickets?: ISupportTicket[],
    public ownedDocuments?: IDocument[],
    public purchasedDocuments?: IDocument[],
    public publishingPackage?: IPublishingPackage,
    public role?: IRole
  ) {
    this.state = this.state || false;
  }
}
