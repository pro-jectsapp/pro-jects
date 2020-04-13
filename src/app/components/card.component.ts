import {Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';

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
  @Output() moveUp = new EventEmitter();
  @Output() moveDown = new EventEmitter();
  isEditing = false;

  editorOptions = { theme: 'vs-dark', language: 'markdown', automaticLayout: true };
  editorContent = '';

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
    console.log(this.editorContent);
  }

  closeEditor() {
    this.editorContent = '';
    this.isEditing = false;
  }

  saveCardAndCloseEditor() {
    this.saveCard().then(() => {
      this.closeEditor();
    });
  }
}
