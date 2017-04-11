import { Component, OnInit } from '@angular/core';
import { AddproductService } from 'app/addproduct.service';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';



@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
    authuser: any;
    purchases: FirebaseListObservable<any[]>;

    result: FirebaseListObservable<any[]>;
    date: any;
    num: any;

    constructor(public productService: AddproductService, public af: AngularFire) {
        this.af.auth.subscribe(auth => {
            if (auth) {
                this.productService.enableBuyButton = true;
                this.authuser = auth.uid;
            } else {
                this.productService.enableBuyButton = false;
            }
        });
        console.log(this.authuser);
    }

    addtocart(e: any) {
        this.productService.addProduct(e);
    }

    ngOnInit() { }

    unlistProduct(index: number): void {
        this.productService.unlistproduct(index);
    }
    submitPurchase(): void {

        /*
        * get today's date to register the purchase in correct date, it helps us
        * to organize puchases by date to each user into Firebase Database
        */
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1;
        var yyyy = today.getFullYear();
        this.date = dd + "-" + mm + "-" + yyyy;

        var productsCantBuy = [];
        var realQuantities: any[] = [];

        this.purchases = this.af.database.list(`user/${this.authuser}/purchases/${this.date}`);

        this.productService.list_added_products.forEach(cartItem => {
            this.productService.products.forEach(observableItem => {
                observableItem.forEach(p => {
                    if (cartItem.$key == p.$key) {
                        if (cartItem.UserproductCant > p.productCant) {
                            productsCantBuy.push({
                                'product': cartItem.productName,
                                'realQuant': p.productCant
                            })
                        }
                    }
                })
            })
        })

        if (productsCantBuy.length == 0) {

            this.purchases.push(this.productService.list_added_products).then(
                (data) => {
                    for (var i = 0; i < this.productService.list_added_products.length; i++) {
                        this.af.database.list('/products').update(
                            this.productService.list_added_products[i].$key,
                            { productCant: (this.productService.list_added_products[i].productCant - this.productService.list_added_products[i].UserproductCant) }
                        ).then(
                            (res) => {
                                this.productService.list_added_products = [];
                                this.productService.calculateNumberOfitemsIncart();
                            }).catch(
                            (err) => {
                                console.log(err);
                            })
                    }
                }).catch(
                (err) => {
                    console.log(err);
                });

        } else {
            for (let i = 0; i < productsCantBuy.length; i++) {
                alert(productsCantBuy[i].product + " doesn't have enough stock, please make sure abount" +
                    "amount to buy, please buy less than or equal to" + productsCantBuy[i].realQuant);
            }
        }

    }

}
