import { Pipe, PipeTransform } from '@angular/core';
import marked from 'marked';

@Pipe({
  name: 'markdownParse',
})
export class MarkdownParsePipe implements PipeTransform {
  transform(value: string, ...args: any[]): string {
    return marked(value);
  }
}
