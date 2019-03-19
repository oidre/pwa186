import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'input-categories', loadChildren: './modal/input-categories/input-categories.module#InputCategoriesPageModule' },
  { path: 'category', loadChildren: './category/category.module#CategoryPageModule' },
  { path: 'variant', loadChildren: './variant/variant.module#VariantPageModule' },
  { path: 'product', loadChildren: './product/product.module#ProductPageModule' },
  { path: 'edit-categories', loadChildren: './modal/edit-categories/edit-categories.module#EditCategoriesPageModule' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
