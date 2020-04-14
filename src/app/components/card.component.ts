import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { GithubService } from '../core/services/github.service';
import { ProjectService } from '../core/services/project.service';

enum Direction {
  Up,
  Down,
}

@Component({
  selector: 'app-card',
  templateUrl: '../views/card/card.component.html',
  styleUrls: ['../views/card/card.component.styl'],
  encapsulation: ViewEncapsulation.None,
})
export class CardComponent {
  @Input() card: any;
  @Input() column: any;
  @Output() moveUp = new EventEmitter();
  @Output() moveDown = new EventEmitter();
  @Output() delete = new EventEmitter();
  isEditing = false;
  isBusy = false;

  editorOptions = { theme: 'vs-dark', language: 'markdown', automaticLayout: true };
  editorContent = '';

  constructor(private githubService: GithubService, private projectService: ProjectService) {}

  onMove(direction: Direction) {
    if (direction === Direction.Up) {
      this.moveUp.emit();
    } else if (direction === Direction.Down) {
      this.moveDown.emit();
    }
  }

  startEditing() {
    this.isEditing = true;
    this.editorContent = this.card.note;
  }

  async saveCard(): Promise<void> {
    this.isBusy = true;
    await this.githubService.saveCard(this.card.id, this.editorContent);
    this.isBusy = false;
  }

  async closeEditor() {
    this.isBusy = true;
    await this.projectService.refreshColumnCards(this.column);
    this.editorContent = '';
    this.isEditing = false;
    this.isBusy = false;
  }

  async saveCardAndCloseEditor() {
    this.isBusy = true;
    await this.githubService.saveCard(this.card.id, this.editorContent);
    await this.projectService.refreshColumnCards(this.column);
    this.editorContent = '';
    this.isEditing = false;
    this.isBusy = false;
  }

  onDelete() {
    this.delete.emit();
  }
}
