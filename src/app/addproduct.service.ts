import { Injectable } from '@angular/core';

import { AngularFire } from 'angularfire2';
import { Router } from '@angular/router';

@Injectable()
export class AddproductService {
  list_added_products = [];
  enableBuyButton = false;
  
  constructor() { }

  addProduct(new_product: any): void {

    var existProd = false;
  
    new_product['UserproductCant'] = 1;
    if (this.list_added_products.length != 0){
      for(var i = 0; i < this.list_added_products.length; i++ ){
        if(this.list_added_products[i].id == new_product.id){
          existProd = true;
          break;
        } 
      }
      if(!existProd){
        this.list_added_products.push(new_product);
      } else {
        if(this.list_added_products[i].productCant > this.list_added_products[i].UserproductCant){
          this.list_added_products[i].UserproductCant = this.list_added_products[i].UserproductCant + 1;
        }
        
      }
    } else {
      this.list_added_products.push(new_product);
    }


    console.log(this.list_added_products);
  
  }

  // This method allow us to delete from list a selected product
  unlistproduct(index: number): void {
    this.list_added_products.splice((index), 1);
  }


}
