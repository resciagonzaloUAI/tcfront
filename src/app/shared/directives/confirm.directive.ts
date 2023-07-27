import {
  Directive,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../components/confirm/confirm-dialog.component';

@Directive({
  selector: '[appConfirm]',
})
export class ConfirmDirective {
  @Input() appConfirm = '';
  @Input() confirmMessage = 'Are you sure?';
  @Output() confirm = new EventEmitter();

  constructor(private modalService: MatDialog) {}

  @HostListener('click')
  confirmClick() {
    if (this.appConfirm === 'delete') {
      const dialogRef = this.modalService.open(ConfirmDialogComponent, {
        data: {
          message: this.confirmMessage,
        },
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.confirm.emit();
        }
      });
    } else {
      this.confirm.emit();
    }
  }
}
