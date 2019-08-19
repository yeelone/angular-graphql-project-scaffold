import { Component, AfterViewInit , OnDestroy,ViewChild,Inject, Output,EventEmitter } from '@angular/core';
import { MatPaginator, MatSort,MatTableDataSource }  from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { Apollo } from 'apollo-angular';
import { merge, Subscription, of as observableOf } from 'rxjs';
import { ServiceGQl } from '../../../service/graphql';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { catchError } from 'rxjs/operators';
import { Author } from 'src/app/model/book';
import { AuthorFormComponent } from '../../forms/author-form/author-form.component';

export interface DialogData {
  name: string;
  authors: Author[];
}

@Component({
  selector: 'app-author-selector',
  templateUrl: './author-selector.component.html',
  styleUrls: ['./author-selector.component.scss']
})
export class AuthorSelectorComponent implements  AfterViewInit , OnDestroy {
  private authorSubscription: Subscription;
  private checkSubscription: Subscription;
  source: DialogData;
  authors: Author[] = [];
  returnMsg:string = "";
  displayedColumns: string[] = ['select','ID','name'];
  dataSource: MatTableDataSource<Author> ;
  loading = true;
  deleteLoading = false;
  error: any;
  disableBtn = true ; //禁用删除按钮
  resultsLength = 0;
  isLoadingResults = true;
  defaultTake = 10 ;
  skip:number = 0 ;
  take:number = this.defaultTake ;
  filter:Map<string,string> ;
  selectedSearchType:string  = "name";
  searchTypes = [
    {value: 'name', viewValue: 'name'},
  ];
  selection = new SelectionModel<Author>(true, []);
  
  @Output()
  onSubmit:EventEmitter<Author[]> = new EventEmitter<Author[]>();

  @ViewChild(MatPaginator,{static:false}) paginator: MatPaginator;
  @ViewChild(MatSort,{static:false}) sort: MatSort;

  constructor( public dialogRef: MatDialogRef<AuthorSelectorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, public dialog: MatDialog,private apollo: Apollo) { 
      this.source = data ; 
    }

  ngAfterViewInit() {
    this.queryAuthors(null);
    
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        catchError(() => {
          this.isLoadingResults = false;
          return observableOf([]);
        })
      ).subscribe(data => {

        if ( data['pageSize'] != this.take ) {
          this.take = data['pageSize'] ;
          this.skip =  0 ;
        }else{
          this.skip = this.take * data['pageIndex'];
        }
        this.queryAuthors(null);
      });
  }

  getAuthors():void {
     this.loading = true ; 
  }

  queryAuthors(filter:Map<string,string>):void{
    let name = "";
    if ( filter != null ){
       name = filter.get("name");
    }
    this.isLoadingResults = true  ;
    this.authorSubscription = this.apollo.watchQuery({
      query: ServiceGQl.queryAuthorsGQL,
      variables: {
        skip: this.skip,
        take: this.take,
        name,
      },
      fetchPolicy:"no-cache",
      })
    .valueChanges
    .subscribe((result) => { 
        this.isLoadingResults = false  ;
        console.log("result",result);
        if ( result ){
          this.resultsLength = result.data['authors']['totalCount'];
          this.authors = result.data['authors']['rows'] ;
          this.dataSource = new MatTableDataSource(this.authors);
        }
     
    },(error)=>{
      this.isLoadingResults = false  ;
      alert("error:"+error);
    });
  }
  
  ngOnDestroy() {
    this.authorSubscription.unsubscribe();

    if ( this.checkSubscription ) {
      this.checkSubscription.unsubscribe();
    }
    
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  submit():void{
    let authors: Author[] = [];
    for (let i= 0;i< this.selection.selected.length;i++){
      authors.push(this.selection.selected[i]);
    }
    console.log(authors);
    this.onSubmit.emit(authors);
    this.dialogRef.close();
    
  }
  
  isAllSelected():boolean{
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle():void{
    this.disableBtn = !this.disableBtn;
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  singleChange(row:Author):void{
    this.selection.toggle(row);
    if (this.selection.selected.length == 0 ){
      this.disableBtn = true ;
    }else{
      this.disableBtn = false;
    }
  }

  applyFilter(filterValue: string) {
    let filter = new Map<string,string>();
    if (this.selectedSearchType == ""){
      this.selectedSearchType = "name";
    }
    filter.set(this.selectedSearchType, filterValue);
    this.queryAuthors(filter);
  }

  create():void{
    const dialogRef = this.dialog.open(AuthorFormComponent, {
      width: '800px',
      maxHeight:'600px',
      // disableClose:true,
      data: {name: ""}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.queryAuthors(null);
    });
  }

  update(author:Author):void{
    const dialogRef = this.dialog.open(AuthorFormComponent, {
      width: '800px',
      maxHeight:'600px',
      // disableClose:true,
      data: {name: author.name}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.queryAuthors(null);
    });
  }


}
