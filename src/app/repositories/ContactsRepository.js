const { uuid } = require("uuidv4");

const contacts = [
  {
    id: uuid(),
    name: "To delete",
    email: "delete@mail.com",
    phone: "456456456827",
    category_id: uuid(),
  },
];

class ContactsRepository {
  findAll() {
    return new Promise((resolve) => {
      resolve(contacts);
    });
  }
}

module.exports = new ContactsRepository();
