import { Component, OnInit, Input } from '@angular/core';
import { Components } from '@ionic/core';
import { Category } from '../../model/category';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-input-categories',
  templateUrl: './input-categories.page.html',
  styleUrls: ['./input-categories.page.scss'],
})
export class InputCategoriesPage implements OnInit {

  @Input() modal: Components.IonModal;
  @Input() category: Category;

  constructor(private categorySrv: CategoryService) { }

  ngOnInit() {
  }

  onCancel = () => this.modal.dismiss('cancel');

  onSave() {
    this.categorySrv.create(this.category)
      .subscribe((data: any) => {
        this.modal.dismiss('cancel');
      }, (err) => {
        console.log(err)
      })
  }

}
