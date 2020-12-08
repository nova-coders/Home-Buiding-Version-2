import { Component, Input, OnInit } from '@angular/core';
import { DeleteAuctionService } from 'app/see-auction/components/delete-auction/delete-auction.service';

@Component({
  selector: 'jhi-delete-auction',
  templateUrl: './delete-auction.component.html',
  styleUrls: ['./delete-auction.component.scss'],
})
export class DeleteAuctionComponent implements OnInit {
  @Input() idProperty: number = -1;
  public isDelete = false;
  constructor(private deleteAuctionService: DeleteAuctionService) {}

  ngOnInit(): void {}
  public deleteAuction(): void {
    this.deleteAuctionService.auctionToDeleteState(this.idProperty).subscribe(response => {
      const status = response;
      if (status === 1) {
        this.isDelete = true;
        setTimeout(() => {
          window.location.href = '/mySales';
        }, 3000);
      } else {
        this.isDelete = false;
      }
    });
  }
}
