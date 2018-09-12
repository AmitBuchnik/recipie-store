import { Component, OnInit } from '@angular/core';
// import { HttpResponse, HttpEvent, HttpEventType } from '@angular/common/http';

import { DataStorageService } from '../../shared/data-storage.service';
import { AuthService } from '../../auth/auth.service';
import { Recipe } from '../../recipes/recipe.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(private dataStorageService: DataStorageService,
    public authService: AuthService) {
  }

  ngOnInit() {
  }

  // onSaveData() {
  //   this.dataStorageService.storeRecipes()
  //     .subscribe((response: HttpEvent<Recipe[]>) => {
  //       console.log(response.type === HttpEventType.Sent);
  //     });
  // }

  // onSaveData() {
  //   this.dataStorageService.storeRecipes()
  //     .subscribe((recipes: Recipe[]) => {
  //       console.log(recipes);
  //     });
  // }

  onSaveData() {
    this.dataStorageService.storeRecipes()
      .subscribe(Response => {
        console.log(Response);
      });
  }

  onFetchData() {
    this.dataStorageService.getRecipes();
  }

  logout() {
    this.authService.logout();
  }
}
