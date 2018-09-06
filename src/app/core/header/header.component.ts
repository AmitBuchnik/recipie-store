import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';

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

  onSaveData() {
    this.dataStorageService.storeRecipes()
      .subscribe((recipes: Recipe[]) => {
        console.log(recipes);
      });
  }

  onFetchData() {
    this.dataStorageService.getRecipes();
  }

  logout() {
    this.authService.logout();
  }
}
