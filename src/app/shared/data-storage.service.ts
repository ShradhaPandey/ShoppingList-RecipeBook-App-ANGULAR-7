import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { map } from 'rxjs/operators';
import 'Rxjs/Rx';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';

@Injectable()
export class DataStorageService{
constructor(private http: Http, private recipeService: RecipeService){}

storeRecipes(){
   return this.http.put('https://recipe-shopping-ng-app.firebaseio.com/recipes.json',
    this.recipeService.getRecipes());
}

getRecipes(){
    this.http.get('https://recipe-shopping-ng-app.firebaseio.com/recipes.json')
    .pipe(map(
        (response: Response) => {
            const recipes: Recipe[] = response.json();   //fixing issue : to ensure ingredient is present in backend
            for(let recipe of recipes) {
             if(!recipe['ingredients']){
                 console.log(recipes);
                recipe['ingredients']=[];
             }
            }  
            return recipes;  
        }
    ))
    .subscribe(
(recipes: Recipe[]) => {
this.recipeService.setRecipes(recipes);
}
    );
}

}