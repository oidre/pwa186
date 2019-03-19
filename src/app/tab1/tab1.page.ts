import { Component } from '@angular/core';
import { CategoriesService } from '../api/categories.service';
import { Observable } from 'rxjs';
import { ModalController } from '@ionic/angular';
import { InputCategoriesPage } from '../modal/input-categories/input-categories.page';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  categories: Observable<any>;

  constructor(private categoriesService: CategoriesService, public modalController: ModalController) {}

  ngOnInit(): void {
    this.categoriesService.getCategories()
        .subscribe(categories => this.categories = categories);
    
  }

  async presentInputModal() {
    const modal = await this.modalController.create({
      component: InputCategoriesPage,
      componentProps: { value: 123 }
    });
    const dismiss = await modal.onDidDismiss();
    return await modal.present();
  }
}
