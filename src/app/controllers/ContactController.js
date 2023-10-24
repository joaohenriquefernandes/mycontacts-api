const ContactsRepository = require("../repositories/ContactsRepository");

class ContactController {
  async index(request, response) {
    const contacts = await ContactsRepository.findAll();
    await response.json(contacts);
  }

  async show(request, response) {
    const { id } = request.params;

    const contact = await ContactsRepository.findById(id);

    if (!contact) {
      return response.status(404).json({ error: "User not found" });
    }
    response.json(contact);
  }

  async store(request, response) {
    const { name, email, phone, category_id } = request.body;

    if (!name) {
      return response.status(400).json({ error: "Name is required" });
    }

    const isContactExists = await ContactsRepository.findByEmail(email);

    if (isContactExists) {
      return response.status(400).json({ error: "Email is already in use" });
    }

    await ContactsRepository.create({
      name,
      email,
      phone,
      category_id,
    });

    response.status(201).send();
  }

  update() {
    // Editar um registro
  }

  async delete(request, response) {
    const { id } = request.params;

    const contact = await ContactsRepository.findById(id);

    if (!contact) {
      return response.status(404).json({ error: "User not found" });
    }

    await ContactsRepository.remove(id);

    response.status(204).send();
  }
}

module.exports = new ContactController();
