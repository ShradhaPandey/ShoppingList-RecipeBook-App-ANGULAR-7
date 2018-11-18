import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';


@Injectable()
export class RecipeService {
recipesModified = new Subject<Recipe[]>();   // issue fixed

    private recipes: Recipe[] = [
        new Recipe('Thai curry',
        'This area contains description of the recipe 0',
        'https://upload.wikimedia.org/wikipedia/commons/e/e5/Thai_green_chicken_curry_and_roti.jpg',
        [
           new Ingredient('Egg', 1),
           new Ingredient('coconut milk', 2),
        ]),
        new Recipe('Popcorn',
        'This area contains description of the recipe 1',
        'https://upload.wikimedia.org/wikipedia/commons/d/d2/Popcorn_up_close_salted_and_air_popped.jpg',
        [
            new Ingredient('oil', 5),
            new Ingredient('salt', 2),
        ])
      ];


setRecipes(recipes: Recipe[]){
this.recipes = recipes;
this.recipesModified.next(this.recipes.slice());
}

      getRecipes(){
          return this.recipes.slice();  //using slice will give us a copy of recipe array
      }
getRecipeByIndex(index : number){
    return this.recipes[index];
}

    constructor(private shoppingListService: ShoppingListService ){}

      sendIngredientsToShoppingList(ingredients: Ingredient[]){
       this.shoppingListService.addIngredientsFromRecipe(ingredients);
        }

addRecipe(recipe: Recipe){
this.recipes.push(recipe);
this.recipesModified.next(this.recipes.slice());  // issue fixed, passing modified copy of recipes
}

updateRecipe(index: number, newRecipe: Recipe){
this.recipes[index] = newRecipe;
this.recipesModified.next(this.recipes.slice());  
}
deleteRecipe(index: number){
    this.recipes.splice(index,1);
    this.recipesModified.next(this.recipes.slice());  
}
}
