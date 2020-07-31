import { Company } from './company.model';
import { CategoryType } from './category-type.enum';
import { Customer } from './customer.model';
export class Coupon {
    constructor(
        public couponId:number,
        public company:Company,
        public category:CategoryType,
        public title:string,
        public description:string,
        public startDate:Date,
        public endDate:Date,
        public amount:number,
        public price:number,
        public image:string,
        public purchasedBy:Customer[],

    ){}
}