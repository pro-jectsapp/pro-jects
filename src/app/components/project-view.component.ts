import { Component, OnInit, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { ProjectService } from '../core/services/project.service';

@Component({
  selector: 'app-project-view',
  templateUrl: '../views/project-view/project-view.component.html',
  styleUrls: ['../views/project-view/project-view.component.styl'],
  encapsulation: ViewEncapsulation.None,
})
export class ProjectViewComponent implements OnInit {
  selectedColumn: any;
  @Output() columnSelected = new EventEmitter();

  constructor(public projectService: ProjectService) {}

  ngOnInit(): void {
    this.projectService.projectChanged.subscribe(() => {
      this.selectedColumn = undefined;
    });
  }

  onColumnClicked(column): void {
    if (!this.selectedColumn) {
      this.columnSelected.emit();
    }
    this.selectedColumn = column;
  }

  moveCard(card, pos): void {
    if (pos >= 0 && pos < this.selectedColumn.cards.length) {
      console.log(card, pos);
    }
  }
}
