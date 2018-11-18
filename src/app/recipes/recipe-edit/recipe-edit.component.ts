import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Params, Router } from '@angular/router';
import { FormGroup,FormControl, FormArray, Validators } from '@angular/forms';
import { RecipeService} from '../recipe.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
id: number;
editingMode =false;
recipeForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private recipeService: RecipeService,
              private router:Router) { }

  /* + sign to make it a number from string
        an id for the recipe item present in param: edit mode
        an id for the recipe item not present(null) in param: new  */

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
      this.id= +params['id'];  
      this.editingMode = params['id'] != null;
      this.initForm();
        }
  );
    }

onSubmit(){
  //  const newRecipe= new Recipe(
  //  this.recipeForm.value['name'], 
  //  this.recipeForm.value['description'], 
  //  this.recipeForm.value['imagePath'], 
  //  this.recipeForm.value['ingredients']);
   if(this.editingMode){
     this.recipeService.updateRecipe(this.id, this.recipeForm.value);
   }else{
     this.recipeService.addRecipe(this.recipeForm.value);
   }
this.onCancel();
    }

    

private initForm(){
let recipeName='';
let recipeImgPath= '';
let recipeDescription= '';
let recipeIngredients=new FormArray([]);

if(this.editingMode){
  const recipe = this.recipeService.getRecipeByIndex(this.id);

  recipeName =recipe.recipeName;
  recipeImgPath =recipe.recipePicture;
  recipeDescription =recipe.recipeDesc; 
 if(recipe['ingredients']){
  for(let ingredient of recipe.ingredients){
    recipeIngredients.push(
    new FormGroup({
      'ingName': new FormControl(ingredient.ingName,  Validators.required),
      'ingAmount':new FormControl(ingredient.ingAmount,  [
        Validators.required,
        Validators.pattern(/^[1-9]+[0-9]*$/)    
      ])
    })
    );
  }
}
}

this.recipeForm= new FormGroup({
  'recipeName': new FormControl(recipeName, Validators.required),
  'recipePicture': new FormControl(recipeImgPath,Validators.required),
  'recipeDesc': new FormControl(recipeDescription, Validators.required),
  'ingredients': recipeIngredients
});

}

onAddIngredient(){
  (<FormArray>this.recipeForm.get('ingredients')).push(
    new FormGroup({
      'ingName': new FormControl(null, Validators.required),
      'ingAmount': new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[1-9]+[0-9]*$/)    
      ])
    })
  )
}

onCancel(){
this.router.navigate(['../'], {relativeTo: this.route}); 

// 1 level up :if editing--> take back to detail page, if adding new--> take back gto recipe page
}

onDeleteIngredient(index: number){
  (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
}
}
/*
    when we subscribe our own created observables,
    then we will have to clean it too.
    since here we are using Angular's observable, no need to clean explicitly
    because Angular does the cleanup work.
     */
