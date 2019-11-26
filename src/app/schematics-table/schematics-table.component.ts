import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTable } from '@angular/material';
import { SchematicsTableDataSource, SchematicsTableItem } from './schematics-table-datasource';
import { LoginService } from '../services/login.service';
import { Customer } from '../model/customer.model';

@Component({
  selector: 'app-schematics-table',
  templateUrl: './schematics-table.component.html',
  styleUrls: ['./schematics-table.component.css']
})
export class SchematicsTableComponent implements OnInit {
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatTable, {static: false}) table: MatTable<SchematicsTableItem>;
  dataSource: SchematicsTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'firstName', 'lastName', 'email', 'phone'];
  dataToShow: Customer[];

  constructor( private apiService: LoginService) {
  }

  ngOnInit() {
    this.apiService.getCustomers().subscribe(data => {
      this.dataToShow = data;
      this.dataSource = new SchematicsTableDataSource(this.dataToShow);

      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.table.dataSource = this.dataSource;
    });
  }
}
