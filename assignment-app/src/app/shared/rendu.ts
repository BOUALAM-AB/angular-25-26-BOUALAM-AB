import { Directive, ElementRef, Input, OnChanges } from '@angular/core';

@Directive({
  selector: '[appRendu]',
  standalone: true
})
export class Rendu implements OnChanges {
  @Input() appRendu!: boolean;
  constructor(private el: ElementRef<HTMLElement>) {}
  ngOnChanges() {
    this.el.nativeElement.style.color = this.appRendu ? 'green' : 'red';
    this.el.nativeElement.style.fontWeight = this.appRendu ? '600' : '400';
  }

}




