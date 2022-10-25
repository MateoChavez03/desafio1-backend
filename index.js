class User {
    constructor(firstName, surname, books = [], pets = []) {
        this.firstName = firstName;
        this.surname = surname;
        this.books = books;
        this.pets = pets;
    }

    getFullName() {;
        return `${this.firstName} ${this.surname}`;
    }

    addPet(pet) {
        this.pets.push(pet);
    }

    countPets() {
        return parseInt(this.pets.length);
    }

    addBook(bookName, bookAuthor) {
        this.books.push({bookName, bookAuthor});
    }

    getBookNames() {
        const bookNames = [];
        this.books.forEach(book => {
            bookNames.push(book.bookName);
        });
        return bookNames;
    }
}

const user = new User('Mateo', 'Chavez', [{bookName: 'Anne of Green Gables', bookAuthor: 'Lucy Maud Montgomery'}], ['hamster']);
user.getFullName();
user.addPet("Dog");
user.addPet("Cat");
user.countPets();
user.addBook("Sherlock Holmes", "Arthur Conan Doyle");
user.addBook("Harry Potter", "J.K. Rowling");
user.getBookNames();

console.log(user);