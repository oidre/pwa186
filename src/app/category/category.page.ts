import { Component, OnInit, ViewChild } from "@angular/core";
import { CategoryService } from "../services/category.service";
import { ModalController, AlertController } from "@ionic/angular";
import { InputCategoriesPage } from "../modal/input-categories/input-categories.page";
import { EditCategoriesPage } from "../modal/edit-categories/edit-categories.page";
import { isArray } from "util";
import { ToastController } from '@ionic/angular';

import { Category } from '../model/category';

@Component({
  selector: "app-category",
  templateUrl: "./category.page.html",
  styleUrls: ["./category.page.scss"]
})
export class CategoryPage implements OnInit {
  categories: Category[] = []
  category: Category = new Category();

  mainToolbar = true;
  showSearchBar = false;
  @ViewChild("search") search: any;
  inputSearch = "";
  categoriesNotFound = "";

  constructor(
    private categorySrv: CategoryService,
    public modalController: ModalController,
    private alertCtrl: AlertController,
    public toastController: ToastController
  ) { }

  ngOnInit() {
    this.categorySrv.get().subscribe(
      (data: Category[]) => {
        this.categories = [];
        this.categories = data;
      },
      err => {
        console.log(err);
      },
      () => {
        console.log("Categories Loaded");
      }
    );
  }

  searchBarToggle() {
    this.mainToolbar = !this.mainToolbar;
    this.showSearchBar = !this.showSearchBar;
    setTimeout(() => {
      this.search.setFocus();
    }, 1);
  }

  onCancel(event) {
    this.mainToolbar = !this.mainToolbar;
    this.showSearchBar = !this.showSearchBar;
  }

  async presentInputModal() {
    const modal = await this.modalController.create({
      component: InputCategoriesPage,
      componentProps: {
        category: this.category
      }
    });
    modal.onDidDismiss().then(() => {
      this.ngOnInit();
      this.category = { id: 0, initial: '', name: '', active: true };
      this.presentToastWithOptions('New Category has been saved');
    });
    return await modal.present();
  }

  onSearchInput() {
    this.categorySrv.find(this.inputSearch).subscribe(
      (data: Category[]) => {
        if (isArray(data)) {
          this.categories = [];
          this.categories = data;
          this.categoriesNotFound = "";
        } else {
          this.categories = [];
          this.categoriesNotFound = data;
        }
      },
      err => {
        console.log(err);
      },
      () => console.log("Searching Finished")
    );
  }

  onEdit(id: number) {
    this.categorySrv.getById(id)
      .then((data: Category) => {
        this.category = data;
        this.editModal(this.category);
      }, (err) => {
        console.log(err);
      })
  }

  async editModal(category: Category) {
    const modal = await this.modalController.create({
      component: EditCategoriesPage,
      componentProps: {
        category: category,
        onCategorySubmit: this.onSubmit,
      }
    });

    modal.onDidDismiss().then(() => {
      this.ngOnInit();
      this.category = { id: 0, initial: '', name: '', active: true };
    });

    return await modal.present();
  }

  onSubmit() {
    this.categorySrv.update(this.category)
      .subscribe((data: Category) => {
        this.modalController.dismiss();
      }, (err) => {
        console.log(err);
      })
  }

  async confirmDelete(id) {
    const alert = await this.alertCtrl.create({
      header: "Are you sure?",
      message:
        '<ion-icon name="warning"></ion-icon> This action can\'t be undone.',
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          cssClass: "secondary",
          handler: blah => {
            console.log("Confirm Cancel: blah");
          }
        },
        {
          text: "Delete",
          handler: () => {
            this.categorySrv.delete(id)
              .subscribe((data: any) => {
                this.ngOnInit();
                this.presentToastWithOptions('Category has been deleted');
              }, (err) => {
                console.log(err)
              })
          }
        }
      ]
    });

    await alert.present();
  }

  async showEditForm(id: number) {
    let category = await this.categorySrv.getById(id).then(
      (data: any) => {
        return data;
      },
      err => {
        console.log(err);
      }
    );
    const alert = await this.alertCtrl.create({
      header: "Edit",
      inputs: [
        {
          name: "initial",
          type: "text",
          value: category.initial
        },
        {
          name: "name",
          type: "text",
          value: category.name
        }
      ],
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          cssClass: "secondary",
          handler: () => {
            console.log("Confirm Cancel");
          }
        },
        {
          text: "Save",
          handler: data => {
            this.categorySrv.update(data).subscribe(
              (data: any) => {
                this.categorySrv.get()
                  .subscribe((data: any) => {
                    this.categories = data;
                    this.presentToastWithOptions('Category has been updated');
                  }, (err) => {
                    console.log(err)
                  })
              },
              err => {
                console.log(err);
              }
            );
          }
        }
      ]
    });

    await alert.present();
  }

  async presentToastWithOptions(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      showCloseButton: true,
      position: 'bottom',
      closeButtonText: 'Done',
      duration: 2000
    });
    toast.present();
  }

  doRefresh(event) {
    this.categorySrv.get().subscribe(
      (data: Category[]) => {
        this.categories = data;
        event.target.complete();
      },
      err => {
        console.log(err);
      },
      () => {
        console.log("Categories Loaded");
      }
    );
  }
}
