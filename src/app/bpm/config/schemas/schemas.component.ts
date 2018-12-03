import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material'
import {FormControl} from '@angular/forms'
import {debounceTime} from 'rxjs/operators'
import {select, Store} from '@ngrx/store'
import {SchemaBackendService} from '@app/bpm//shared/services/schema-backend.service'
import {SchemaSummary} from '@app/bpm//shared/services/model'
import * as fromSchema from '@app/bpm/shared/services/schema.reducer'
import {DeleteSchema, FindSchemas} from '@app/bpm/shared/services/schema.actions'


@Component({
  selector: 'axon-schemas',
  templateUrl: './schemas.component.html',
  styleUrls: ['./schemas.component.css']
})
export class SchemasComponent implements OnInit, OnDestroy {

  filter
  filterControl = new FormControl();
  private filterCtrlSub: any

  displayedColumns: string[] = ['id', 'name', 'description', 'notation', 'actions'];
  schemaDataSource = new MatTableDataSource<SchemaSummary>([])

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  loadingFailure: any

  constructor(private schemaBackend: SchemaBackendService,
              private store: Store<any>) {
  }

  ngOnInit() {
    this.schemaDataSource.paginator = this.paginator;
    this.schemaDataSource.sort = this.sort;

    this.store.pipe(select(fromSchema.selectFilter))
        .subscribe(
            res => {
              // console.log(`Filter pipe: ${res}`)
              this.filter = res
            }
        )
    this.store
        .pipe(select(fromSchema.selectLoadingFailure))
        .subscribe(
            loadingFailure => {
              console.log(`loadingFailure: `)
              console.log(loadingFailure)
              this.loadingFailure = loadingFailure
            }
        )
    this.store
        .pipe(select(fromSchema.selectAll))
        .subscribe(
            res => {
              // console.log('Schemas pipe:')
              // console.log(res)
              this.schemaDataSource = new MatTableDataSource<SchemaSummary>(res)
              this.schemaDataSource.paginator = this.paginator;
              this.schemaDataSource.sort = this.sort;
            }
        )

    this.filterCtrlSub = this.filterControl.valueChanges
        .pipe(debounceTime(500))
        .subscribe(newFilter => this.find(newFilter))
  }

  ngOnDestroy() {
    this.filterCtrlSub.unsubscribe();
  }


  private find(newFilter: string) {
    //console.log(`new filter: ${newFilter}`)
    this.store.dispatch(new FindSchemas({filter: newFilter}));
    if (this.schemaDataSource.paginator) {
      this.schemaDataSource.paginator.firstPage();
    }
  }


  delete(id: string) {
    this.store.dispatch(new DeleteSchema({id: id}));
  }

  clearFilter() {
    this.find("")
  }

  refresh() {
    this.find(this.filter)
  }
}
