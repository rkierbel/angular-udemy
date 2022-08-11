import {Directive, ElementRef, HostBinding, HostListener} from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  @HostBinding('class.open') opened = false;

  constructor(private elementRef: ElementRef) {
  }

  @HostListener('document:click', ['$event']) toggleMenu(event: Event) {
    this.opened = this.elementRef.nativeElement.contains(event.target) ? !this.opened : false;
  }
}
