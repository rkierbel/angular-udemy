import {Directive, ElementRef, HostBinding, HostListener} from "@angular/core";
import {Router} from "@angular/router";

@Directive({
  selector: '[returnToRecipes]',
})
export class ReturnToRecipesDirective {


  constructor(private elementRef: ElementRef,
              private router: Router) {
  }

  @HostListener('document:click', ['$event']) hideRecipeDetails(event: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(event.target))
      this.router.navigate(['../']);
  }
}
