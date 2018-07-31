import { Directive, ElementRef, Renderer2, HostListener, HostBinding } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  @HostBinding('class.open') isopen = false;

  constructor() {
  }

  @HostListener('click', ['$event.target'])
  toggleOpen() {
    this.isopen = !this.isopen;
  }
}
