import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { Ingredient } from '../shared/ingredient.model';
import * as ShoppingListActions from './ngrx-store/shopping-list.actions';
import * as fromApp from '../ngrx-store/app.reducers';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {
  // @ViewChild('nameInput') nameInputRef: ElementRef;
  // @ViewChild('amountInput') amountInputRef: ElementRef;
  @ViewChild('form') shoppingListForm: NgForm;
    
  editingSubscription: Subscription;
  editMode = false;
  editedItem: Ingredient;

  constructor(private store: Store<fromApp.IAppState>) {
  }

  ngOnInit() {
    this.editingSubscription = this.store.select('shoppingList')
      .subscribe(data => {
        if (data.editedIngredientIndex > -1) {
          this.editedItem = data.editedIngredient;
          this.editMode = true;
          this.shoppingListForm.setValue({
            item: {
              name: this.editedItem.name,
              amount: this.editedItem.amount,
            }
          });
        } else {
          this.editMode = false;
        }
      });
  }

  ngOnDestroy(): void {
    // this.store.dispatch(new ShoppingListActions.StopEdit());
    this.editingSubscription.unsubscribe();
  }

  onSubmit(form: NgForm) {
    // const ingredientName = this.nameInputRef.nativeElement.value;
    // const ingredientAmount = this.amountInputRef.nativeElement.value;

    const value = form.value;
    const ingredient = new Ingredient(value.item.name, value.item.amount);

    if (this.editMode) {
      this.store.dispatch(new ShoppingListActions.UpdateIngredient(ingredient));
    } else {
      this.store.dispatch(new ShoppingListActions.AddIngredient(ingredient));
    }

    this.editMode = false;
    form.reset();
  }

  onDelete() {
    this.store.dispatch(new ShoppingListActions.DeleteIngredient());
    this.onClear();
  }

  onClear() {
    this.shoppingListForm.reset();
    this.editMode = false;
  }
}
