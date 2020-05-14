import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewEncapsulation,
  ViewChild,
} from '@angular/core';
import devpun from 'devpun';
import { ProjectService } from '../core/services/project.service';
import { GithubService } from '../core/services/github.service';
import { CardComponent } from './card.component';

// @ts-ignore
Array.prototype.move = function (from, to) {
  this.splice(to, 0, this.splice(from, 1)[0]);
};

@Component({
  selector: 'app-project-view',
  templateUrl: '../views/project-view/project-view.component.html',
  styleUrls: ['../views/project-view/project-view.component.styl'],
  encapsulation: ViewEncapsulation.None,
})
export class ProjectViewComponent implements OnInit {
  @Output() columnSelected = new EventEmitter();
  selectedColumn: number;

  @ViewChild(CardComponent) firstCard: CardComponent;

  constructor(public projectService: ProjectService, private githubService: GithubService) {}

  ngOnInit(): void {
    this.projectService.projectChanged.subscribe(() => {
      this.selectedColumn = undefined;
    });
  }

  onColumnClicked(column): void {
    if (this.selectedColumn === undefined) {
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

  deleteCard(card, pos): void {
    if (confirm('Are you sure to delete this card?')) {
      this.projectService.currentProject.columns[this.selectedColumn].cards.splice(pos, 1);
      this.githubService.deleteCard(card.id);
    }
  }

  addColumn() {
    const name = prompt('Give title for the column');
    if (name && name !== '') {
      this.githubService
        .createColumn(this.projectService.currentProject.id, name)
        .then(({ data }) => {
          this.projectService.refreshProjectColumns().then(() => {
            const index = this.projectService.currentProject.columns.findIndex(
              col => col.id === data.id,
            );
            this.onColumnClicked(index);
          });
        });
    }
  }

  addCard() {
    const joke = devpun.random();
    this.githubService
      .createCard(this.projectService.currentProject.columns[this.selectedColumn].id, joke)
      .then(() => {
        this.projectService.refreshColumnCards(this.selectedColumn).then(() => {
          document.querySelector('.cards-view').scroll({ top: 0, behavior: 'smooth' });

          // Ridiculous monkey patch. Don't do this at home, kids
          setTimeout(() => {
            this.firstCard.startEditing();
          }, 0);
        });
      });
  }

  deleteColumn(column, pos) {
    if (confirm('Are you sure to delete this column?')) {
      this.projectService.currentProject.columns.splice(pos, 1);
      this.githubService.deleteColumn(column.id);
    }
  }
}
