import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Recipe } from './recipe.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  @Input() recipe: Recipe;

  // constructor(private route: ActivatedRoute) { }
  constructor() { }

  ngOnInit() {
    // this.route.data.subscribe((data) => {
    //   this.recipe = data['recipe'];
    // });
  }
}

