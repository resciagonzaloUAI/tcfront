import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  ChangeDetectorRef,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SharedModule } from '../../shared.module';

@Component({
  selector: 'app-table',
  templateUrl: `./table.component.html`,
  styleUrls: [`./table.component.scss`],
})
export class TableComponent implements OnInit {
  @Input() headers: string[] = [];
  @Input() filteredData: any[] = [];
  @Input() actions: { name: string; label: string }[] = [];
  @Output() action = new EventEmitter<{ name: string; row: any }>();
  @Input() data: any[] = [];
  searchTerm: any;
  name: any;
  searchControl = new FormControl();
  authService: any;
  estado: any[] = [];

  constructor(private readonly cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.filteredData = this.data;
  }

  ngOnChanges(): void {
    this.filteredData = this.data;
  }

  get displayedColumns() {
    const displayedColumns = [...this.headers];
    if (this.actions.length > 0) displayedColumns.push('actions');
    return displayedColumns;
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
      console.log('Search Term:', this.searchTerm);

      this.filteredData = this.data.filter((item) =>
        this.isItemMatchingSearchTerm(item, this.searchTerm)
      );
      console.log(this.filteredData);
      this.cd.detectChanges();
    } else {
      // If search term is empty, display all data
      this.filteredData = this.data;
    }
  }

  isItemMatchingSearchTerm(item: any, searchTerm: string): boolean {
    this.filteredData = [];
    // Iterate through all properties of the item
    for (const property in item) {
      if (item.hasOwnProperty(property)) {
        const propertyValue = item[property];
        if (
          propertyValue &&
          String(propertyValue).toLowerCase().includes(searchTerm.toLowerCase())
        ) {
          return true;
        }
      }
    }
    return false;
  }

  /*
  search(): void {
    this.searchTerm = this.searchControl.value;

    if (this.searchTerm) {
      console.log('va searchTerm', this.searchTerm);

      this.filteredData = this.data.filter(
        (item) =>
          // Replace 'property' with the actual property name you want to use for filtering
          // Example: item.name.toLowerCase().includes(this.searchTerm.toLowerCase())
          item.estado &&
          item.estado.toLowerCase().includes(this.searchTerm.toLowerCase())
        // item.property.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      console.log('Vacio');

      // If search term is empty, display all data
      this.data;
    }
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
  }*/
}
