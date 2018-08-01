import { Component, OnInit, Inject, ChangeDetectionStrategy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
// @ import { OverlayContainer } from '@angular/cdk/overlay';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class NewProjectComponent implements OnInit {
  title: '';
  constructor( @Inject(MAT_DIALOG_DATA) private data,
    private dialogRef: MatDialogRef<NewProjectComponent>
  ) { }

  // @ constructor( @Inject(MAT_DIALOG_DATA) private data,
  //   private dialogRef: MatDialogRef<NewProjectComponent>,
  //   private oc: OverlayContainer
  // ) { }
  ngOnInit() {
    this.title = this.data.title;
    // @ this.oc.getContainerElement().className = this.data.dark ? 'myapp-dark-theme cdk-overlay-container' : 'cdk-overlay-container';
  }
  onClick() {
    this.dialogRef.close('i recieved your msg');
  }
}
