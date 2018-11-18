import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

export class ShoppingListService {
    
    ingredientsListModified = new Subject<Ingredient[]>();
    startedEditingShoppingList = new Subject<number>();

   private ingredients: Ingredient[] = [
        new Ingredient('Cheese', 10),
        new Ingredient('Bell pepper', 5)
      ];

      getIngredients(){
          return this.ingredients.slice();
      }
      getIngredientsByIndex(index: number){
         return this.ingredients[index];
      }

      onIngredientAdded(ingredient:Ingredient){
        this.ingredients.push(ingredient);
        this.ingredientsListModified.next(this.ingredients.slice());   // issue fixed 
    }
        // issue: since we work only on a copy of ingredients list and not on the original,
        // thus, when the ingredients list is modified, we need to modify the original list an dmake Angular know
        // that this list has been changed. 
      
      addIngredientsFromRecipe(ingredients:Ingredient[]){
        // for (let ingredient of ingredients){
        //     this.onIngredientAdded(ingredient);
        // }
    // using spread operator for better code
    this.ingredients.push(...ingredients);  
    this.ingredientsListModified.next(this.ingredients.slice());  
    } 

editIngredient(index: number, updatedIngredient: Ingredient){
this.ingredients[index] = updatedIngredient;
this.ingredientsListModified.next(this.ingredients.slice());
}
deleteIngredient(index: number){
    this.ingredients.splice(index, 1);
    this.ingredientsListModified.next(this.ingredients.slice());
}

}