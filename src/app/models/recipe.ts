import {Ingredient} from "./ingredient";

export class Recipe {

  constructor(public id: number | undefined, public name: string, public description: string,
              public imagePath: string, public ingredients: Ingredient[]) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.imagePath = imagePath;
    this.ingredients = ingredients;
  }
}
