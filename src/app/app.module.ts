import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';

import { AppRoutingModule } from './app-routing.module';
import { ShoppingListModule } from './shopping/shopping-list.module';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

import { AppComponent } from './app.component';
import { shoppingListReducer } from './shopping/ngrx-store/shopping-list.reducers';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CoreModule,
    SharedModule,
    AuthModule,
    ShoppingListModule,
    StoreModule.forRoot({ shoppingList: shoppingListReducer })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
