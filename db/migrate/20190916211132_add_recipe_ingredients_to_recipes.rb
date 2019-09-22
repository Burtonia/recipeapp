class AddRecipeIngredientsToRecipes < ActiveRecord::Migration[5.1]
  def change
    add_column :recipes, :recipe_ingredients, :text
  end
end
