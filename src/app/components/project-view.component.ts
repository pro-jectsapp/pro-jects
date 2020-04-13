import { Component, OnInit, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { ProjectService } from '../core/services/project.service';
import { GithubService } from '../core/services/github.service';

// @ts-ignore
Array.prototype.move = function (from, to) {
  this.splice(to, 0, this.splice(from, 1)[0]);
};

enum ViewMode {
  Switch,
  Columns,
}

@Component({
  selector: 'app-project-view',
  templateUrl: '../views/project-view/project-view.component.html',
  styleUrls: ['../views/project-view/project-view.component.styl'],
  encapsulation: ViewEncapsulation.None,
})
export class ProjectViewComponent implements OnInit {
  selectedColumn: number;
  @Output() columnSelected = new EventEmitter();
  viewMode: ViewMode = ViewMode.Switch;

  constructor(public projectService: ProjectService, private githubService: GithubService) {}

  ngOnInit(): void {}

  onColumnClicked(column): void {
    if (!this.selectedColumn) {
      this.columnSelected.emit();
    }
    this.selectedColumn = column;
  }

  moveCard(card, pos, oldPos): void {
    const currentColumn = this.projectService.currentProject.columns[this.selectedColumn];
    if (pos >= 0 && pos < currentColumn.cards.length) {
      let positionFormatted;
      switch (true) {
        case pos === 0:
          positionFormatted = 'top';
          break;
        case pos === currentColumn.cards.length - 1:
          positionFormatted = 'bottom';
          break;
        default:
          if (currentColumn.cards[pos - 1].id === card.id) {
            positionFormatted = `after:${currentColumn.cards[pos].id}`;
          } else {
            positionFormatted = `after:${currentColumn.cards[pos - 1].id}`;
          }
      }

      this.githubService.moveCard(card.id, positionFormatted);
      this.projectService.currentProject.columns[this.selectedColumn].cards.move(oldPos, pos);
    }
  }
}
