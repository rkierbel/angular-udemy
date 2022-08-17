import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Recipe} from "../../models/recipe";
import {RecipeService} from "../recipe.service";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  recipeToEdit!: Recipe;
  editMode: boolean = false;
  recipeForm: FormGroup | undefined;
  id: number | undefined;

  constructor(private activatedRoute: ActivatedRoute,
              private recipeService: RecipeService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (param: Params) => {
        this.id = +param['id'];
        this.recipeToEdit = this.recipeService.getRecipe(this.id);
        this.editMode = param['id'] != null;
        this.initForm();
      }
    );
  }

  onSubmit() {
    const newRecipe = new Recipe(
      this.recipeService.getRecipes().length,
      this.recipeForm?.value['name'],
      this.recipeForm?.value['description'],
      this.recipeForm?.value['imagePath'],
      this.recipeForm?.value['ingredients']);
    if (this.editMode && this.id !== undefined) {
      this.recipeService.updateRecipe(this.id, newRecipe)
    } else this.recipeService.addRecipe(newRecipe);
    this.router.navigate(['../'], {relativeTo: this.activatedRoute});
  }

  private initForm() {
    let recipeName = '';
    let imagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);

    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      imagePath = recipe.imagePath;
      recipeDescription = recipe.description;
      if (recipe['ingredients']) {
        for (let ingredient of recipe.ingredients)
          { // @ts-ignore
            recipeIngredients.push(new FormGroup({
                        'name': new FormControl(ingredient.name, Validators.required),
                        'amount': new FormControl(ingredient.amount, [
                          Validators.required,
                          Validators.pattern(/^[1-9]+[0-9]*$/)
                        ])
                      }));
          }
      }
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(imagePath, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredients': recipeIngredients
    })
  }

  get controls() {
    return (<FormArray>this.recipeForm?.get('ingredients')).controls;
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm?.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[1-9]*$/)
        ])
      })
    );
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.activatedRoute});
  }

  onDeleteIngredient(i: number) {
    (<FormArray>this.recipeForm?.get(['ingredients'])).removeAt(i);
  }
}
