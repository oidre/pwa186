import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'category',
        children: [
          {
            path: '',
            loadChildren: '../category/category.module#CategoryPageModule'
          }
        ]
      },
      {
        path: 'variant',
        children: [
          {
            path: '',
            loadChildren: '../variant/variant.module#VariantPageModule'
          }
        ]
      },
      {
        path: 'variant',
        children: [
          {
            path: '',
            loadChildren: '../variant/variant.module#VariantPageModule'
          }
        ]
      },
      {
        path: 'product',
        children: [
          {
            path: '',
            loadChildren: '../product/product.module#ProductPageModule'
          }
        ]
      },
      {
        path: 'tab1',
        children: [
          {
            path: '',
            loadChildren: '../tab1/tab1.module#Tab1PageModule'
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/category',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/category',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
