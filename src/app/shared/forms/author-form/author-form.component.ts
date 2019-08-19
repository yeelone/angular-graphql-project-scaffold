import { Component, OnInit,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {  FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiceGQl } from '../../../service/graphql';
import { Apollo } from 'apollo-angular';
import { Author } from 'src/app/model/book';

export interface DialogData {
  name: string;
}

@Component({
  selector: 'app-author-form',
  templateUrl: './author-form.component.html',
  styleUrls: ['./author-form.component.scss']
})
export class AuthorFormComponent implements OnInit {

  changeForm: FormGroup;
  submitted = false;
  isLoadingResults = false;
  source:DialogData;

  constructor(
    public dialogRef: MatDialogRef<AuthorFormComponent>,private formBuilder: FormBuilder,private apollo: Apollo,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
      this.source = data ; 
    }
  
    ngOnInit() {
      this.changeForm = this.formBuilder.group({
        name: ['', [Validators.required]],
    });

  }
  // convenience getter for easy access to form fields
  get f() { return this.changeForm.controls; }
  
  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.changeForm.invalid) {
        return;
    }

    this.isLoadingResults = true  ;
    this.apollo.mutate({
      mutation: ServiceGQl.createAuthorGQL,
      variables: {
        name: this.changeForm.controls['name'].value
      },
    }).subscribe((data) => {
      this.isLoadingResults = false;
      this.onNoClick();
      alert('成功!! :-)\n\n' );
    },(error) => {
      this.isLoadingResults = false;
      alert('失败... \n\n' + error );
    });

  }

}