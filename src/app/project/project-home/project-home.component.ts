import { Component, OnInit, Input, HostBinding, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material';
import { NewProjectComponent } from '../new-project/new-project.component';
import { ThemeService } from '../../shared/theme.service';
import { InviteComponent } from '../invite/invite.component';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { slideToRight } from '../../animate/router.animate';
import { listAnimate } from '../../animate/list.animate';
import { ProjectService } from '../../service/project.service';

@Component({
  selector: 'app-project-home',
  templateUrl: './project-home.component.html',
  styleUrls: ['./project-home.component.scss'],
  animations: [
    slideToRight, listAnimate
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectHomeComponent implements OnInit {
  @HostBinding('@router') state;
  projects;
  constructor(private dialog: MatDialog, private cd: ChangeDetectorRef, private service$: ProjectService) { }

  ngOnInit() {
    this.service$.get('0').subscribe(projects => {
      // 删除第一项 mongodb 数据库 第一项是用来统计的 自增id
      projects.shift();
      this.projects = projects;
      this.cd.markForCheck();
    });
  }

  openNewProjectDialog() {
    // this.dialog.open(NewProjectComponent,{width:'100px',height:'100px'});
    // this.dialog.open(NewProjectComponent,{position:{left:'0',top:'0'}});
    // this.dialog.open(NewProjectComponent, { data: 'this is my input data' });
    const dialogRef = this.dialog.open(NewProjectComponent, { data: { title: '新建项目' } });
    dialogRef.afterClosed().subscribe(res => {
      console.log(res);
      this.projects = [...this.projects, { id: 3, name: '33333', desc: '这是一个新项目', coverImg: 'assets/img/covers/0.jpg' }];
      this.cd.markForCheck();
    });
  }
  launchEditDialog() {
    const dialogRef = this.dialog.open(NewProjectComponent, { data: { title: '编辑项目' } });
  }
  launchInviteDialog() {
    const dialogRef = this.dialog.open(InviteComponent);
  }
  launchDelDialog(project) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, { data: { title: '删除项目', content: '您确认删除该项目吗？' } });
    dialogRef.afterClosed().subscribe(res => {
      // this.service$.del('0');
      this.projects = this.projects.filter(p => p.id !== project.id);
      this.cd.markForCheck();
    });
  }
}
