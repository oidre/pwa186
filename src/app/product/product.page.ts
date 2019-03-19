import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {

  products = [];

  constructor(
    private productSrv: ProductService
  ) { }

  ngOnInit() {
    this.productSrv.get()
        .subscribe((data: any) => {
          this.products = data;
          // console.log(data);
        }, (err) => {
          console.log(err);
        }, () => {
          console.log('Products Loaded');
        }) 
  }

}
