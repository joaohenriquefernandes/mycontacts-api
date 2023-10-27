const ContactsRepository = require("../repositories/ContactsRepository");

class ContactController {
  async index(request, response) {
    const { orderBy } = request.query;

    const contacts = await ContactsRepository.findAll(orderBy);
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

  async update(request, response) {
    const { id } = request.params;

    const { name, email, phone, category_id } = request.body;

    const isContactExists = await ContactsRepository.findById(id);

    if (!isContactExists) {
      return response.status(404).json({ error: "User not found" });
    }

    if (!name) {
      return response.status(400).json({ error: "Name is required" });
    }

    const isEmailContactExists = await ContactsRepository.findByEmail(email);

    if (isEmailContactExists && isEmailContactExists.id !== id) {
      return response.status(400).json({ error: "Email is already in use" });
    }

    const contact = await ContactsRepository.update(id, {
      name,
      email,
      phone,
      category_id,
    });

    response.json(contact);
  }

  async delete(request, response) {
    const { id } = request.params;

    await ContactsRepository.remove(id);

    response.status(204).send();
  }
}

module.exports = new ContactController();
