import { Ingredient } from '../shared/ingredient.model';

export class Recipe{
public recipeName: string;
public recipePicture: string;
public recipeDesc: string;
public ingredients: Ingredient[];
constructor(recipeName: string,
            recipeDesc: string,
            recipePicture: string,
            ingredients: Ingredient[]){
                this.recipeName=recipeName;
                this.recipeDesc=recipeDesc;
                this.recipePicture=recipePicture;
                this.ingredients= ingredients;
     }

}