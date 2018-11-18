import { Component,OnInit, Input } from '@angular/core';
import { Recipe } from '../../recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  /* @Input() decorator allows us to bind the component property "item" 
  from the outside of the component */
  @Input() recipe: Recipe;
  @Input() index: number;
  ngOnInit() {
  }



}
