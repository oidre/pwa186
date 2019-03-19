import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Category } from '../../model/category';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-edit-categories',
  templateUrl: './edit-categories.page.html',
  styleUrls: ['./edit-categories.page.scss'],
})
export class EditCategoriesPage implements OnInit {

  @Input() category: Category;
  @Input() onCategorySubmit: Function;

  constructor(
    private modalController: ModalController,
    private categorySrv: CategoryService
  ) { }

  ngOnInit() {
  }

  onClose() {
    this.modalController.dismiss();
  }

  onSave() {
    this.onCategorySubmit();
  }

}
