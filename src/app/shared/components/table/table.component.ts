import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-table',
  templateUrl: `./table.component.html`,
  styleUrls: [`./table.component.scss`],
})
export class TableComponent implements OnInit {
  @Input() headers: string[] = [];
  @Input() data: any[] = [];
  @Input() actions: { name: string; label: string }[] = [];
  @Output() action = new EventEmitter<{ name: string; row: any }>();
  originalData: any[] = [];
  searchTerm: any;
  name: any;
  searchControl = new FormControl();
  authService: any;

  ngOnInit(): void {
    console.log(this.data);
  }

  ngOnChanges(): void {}

  get displayedColumns() {
    return [...this.headers, 'actions'];
  }
  get isLogguedIn() {
    return this.authService.isLoggedIn();
  }

  actionClicked(name: string, row: any) {
    this.action.emit({ name, row });
  }

  search(): void {
    this.searchTerm = this.searchControl.value;
    if (this.searchTerm) {
      this.data = this.originalData.filter((item) =>
        // Replace 'property' with the name of the property you want to search by
        item.property.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      console.log('Vacio');
      // If search term is empty, display all data
    }
  }
}
