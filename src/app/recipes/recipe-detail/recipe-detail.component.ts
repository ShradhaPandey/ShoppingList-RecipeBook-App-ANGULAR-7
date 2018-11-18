import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService} from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
recipeToDisplayOnSelect:Recipe;
id: number;

  constructor(private recipeService: RecipeService,
            private route: ActivatedRoute,
            private router: Router) { }

  ngOnInit() {
// subscribing, so that this methd is executed whenever the param changes.

this.route.params.subscribe(
  (params: Params) => {
this.id= +params['id'];   // + sign to make it a number from string
this.recipeToDisplayOnSelect= this.recipeService.getRecipeByIndex(this.id);

  }
);
  }

  sendIngredientsToSL(){
this.recipeService.sendIngredientsToShoppingList(this.recipeToDisplayOnSelect.ingredients);
  }

  editRecipe(){
this.router.navigate(['edit'], {relativeTo: this.route});
// this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});

  }
  onDeleteRecipe(){
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }

}
