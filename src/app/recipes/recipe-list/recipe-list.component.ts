import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {

recipes: Recipe[];
subscription: Subscription;
  constructor(private recipeService: RecipeService,
              private router: Router,
              private route: ActivatedRoute ) { }

  ngOnInit() {
    // issue fixed
    // to recieve a new copy of recipe list if the recipe list has been modifed

   this.subscription =  this.recipeService.recipesModified.subscribe(
        (recipes: Recipe[]) => {
          this.recipes = recipes;
        }
    );
    this.recipes = this.recipeService.getRecipes();
  }
/*
since we are already in recipe, we need relative path, i.e "new" 
should be appended in existing url
ActivatedRoute: tells angular about current route
*/
  addNewRecipe(){
    this.router.navigate(['new'],{relativeTo: this.route})
  }

  ngOnDestroy(){
this.subscription.unsubscribe();
  }
}
