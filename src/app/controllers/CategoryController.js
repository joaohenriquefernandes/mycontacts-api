const CategoriesRepository = require("../repositories/CategoriesRepository");

class CategoryController {
  async index(request, response) {
    const categories = await CategoriesRepository.findAll();
    return response.json(categories).send();
  }

  async show(request, response) {
    const { id } = request.params;

    const category = await CategoriesRepository.findById({ id });

    return response.send(category);
  }

  async store(request, response) {
    const { name } = request.body;

    if (!name) {
      return response.status(400).json({ error: "Name is required" });
    }

    const isNameExists = await CategoriesRepository.findByName({ name });

    if (isNameExists) {
      return response.status(400).json({ error: "Name already exists" });
    }

    await CategoriesRepository.create({ name });

    return response.status(201).send();
  }

  async update(request, response) {
    const { id } = request.params;

    const { name } = request.body;

    if (!name) {
      return response.status(400).json({ error: "Name is required" });
    }

    const category = await CategoriesRepository.findById({ id });

    if (!category) {
      return response.status(404).json({ error: "Category not found" });
    }

    const isCategoryExists = await CategoriesRepository.findByName({ name });

    if (isCategoryExists && isCategoryExists.id !== id) {
      return response.status(400).json({ error: "Category is already exists" });
    }

    const updateCategory = await CategoriesRepository.update(id, { name });

    return response.send(updateCategory);
  }

  async delete(request, response) {
    const { id } = request.params;

    await CategoriesRepository.remove({ id });

    return response.status(204).send();
  }
}
module.exports = new CategoryController();
