import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';


@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  @ViewChild('f') shoppingListForm: NgForm;
subscription: Subscription;
editMode = false;
editedItemIndex:number;
editedItem:Ingredient;
  constructor(private shoppingListService: ShoppingListService) { }

ngOnInit() {
 this.subscription =  this.shoppingListService
                          .startedEditingShoppingList
                          .subscribe( 

                  (index: number) => {
                    this.editedItemIndex= index;
                   this.editMode = true;
                   this.editedItem = this.shoppingListService.getIngredientsByIndex(index);
                   this.shoppingListForm.setValue({
                    ingredientName: this.editedItem.ingName,
                    ingredientAmount: this.editedItem.ingAmount
                   })
                  }

                          );
  }
  
  onAddOrEdit(form: NgForm){
const value = form.value;
const newIngredient = new Ingredient(value.ingredientName, value.ingredientAmount);
if(this.editMode){
  this.shoppingListService.editIngredient(this.editedItemIndex  ,newIngredient );
}
else{
  this.shoppingListService.onIngredientAdded(newIngredient);
}
this.editMode= false;
form.reset();   // so that the fields become empty once add/edit is performed
}

onClear(){
  this.shoppingListForm.reset();
  this.editMode=false;
}
onDelete(){

this.shoppingListService.deleteIngredient(this.editedItemIndex);
this.onClear();

}
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
