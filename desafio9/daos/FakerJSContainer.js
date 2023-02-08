import {faker} from '@faker-js/faker'

export default class FakerContainer{
    createOne() {
        return {
            name : faker.commerce.productName(),
            price : faker.commerce.price(1000,10000),
            src : faker.image.imageUrl()
        }
    }
    createMany(n) {
       return Array.from({length : n}, () => this.createOne())
    }
}