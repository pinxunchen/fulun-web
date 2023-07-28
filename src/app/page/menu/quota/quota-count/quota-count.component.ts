import { Component } from '@angular/core';


@Component({
  selector: 'app-quota-count',
  templateUrl: './quota-count.component.html',
  styleUrls: ['./quota-count.component.css']
})
export class QuotaCountComponent {
  multiplier:any;
  numberInput: any;
  selectedCategory: any;
  selectedFloor: any;


  selectCategory(category: string): void {
    this.selectedCategory = category;
  }

  selectFloor(floor: string): void {
    this.selectedFloor = floor;
  }

  calculateAmount(): any {
    let baseAmount: number;
    switch (this.selectedCategory) {
      case '一般戶':
        baseAmount = 0.7;
        break;
      case '中低收入':
        baseAmount = 0.9;
        break;
      case '低收入':
        baseAmount = 1;
        break;
      default:
        baseAmount = 0;
        break;
    }

    let multiplier: number;
    switch (this.selectedFloor) {
      case '一二樓':
        multiplier = 700;
        break;
      case '三樓':
        multiplier = 800;
        break;
      case '四五樓':
        multiplier = 900;
        break;
      case '六樓':
        multiplier = 1000;
        break;
      default:
        multiplier = 0;
        break;
    }

    return (multiplier - this.numberInput * baseAmount).toFixed(2);
  }




  validateNumber(): void {
    if (this.numberInput < 0) {
      this.numberInput = 0;
    } else if (this.numberInput > 700) {
      this.numberInput = 700;
    }
  }


  clearInputs(): void {
    this.numberInput = null;
    this.selectedCategory = null;
    this.selectedFloor = null;
  }
}
