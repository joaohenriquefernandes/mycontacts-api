const { v4 } = require("uuid");

let contacts = [
  {
    id: v4(),
    name: "Joao",
    email: "Joao@mail.com",
    phone: "456456456827",
    category_id: v4(),
  },
  {
    id: v4(),
    name: "Maria",
    email: "maria@mail.com",
    phone: "456456456827",
    category_id: v4(),
  },
];

class ContactsRepository {
  findAll() {
    return new Promise((resolve) => {
      resolve(contacts);
    });
  }

  findById(id) {
    const user = contacts.find((contact) => contact.id === id);

    return new Promise((resolve) => {
      resolve(user);
    });
  }

  remove(id) {
    contacts = contacts.filter((contact) => contact.id !== id);

    return new Promise((resolve) => {
      resolve(contacts);
    });
  }
}

module.exports = new ContactsRepository();
