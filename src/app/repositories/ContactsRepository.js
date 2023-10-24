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

  findByEmail(email) {
    const user = contacts.find((contact) => contact.email === email);

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

  create({ name, email, phone, category_id }) {
    return new Promise((resolve) => {
      const newContact = {
        id: v4(),
        name,
        email,
        phone,
        category_id,
      };

      contacts.push(newContact);

      resolve(newContact);
    });
  }

  update(id, { name, email, phone, category_id }) {
    return new Promise((resolve) => {
      const updateContact = {
        id,
        name,
        email,
        phone,
        category_id,
      };

      contacts = contacts.map((contact) =>
        contact.id === id ? updateContact : contact
      );

      resolve(updateContact);
    });
  }
}

module.exports = new ContactsRepository();
