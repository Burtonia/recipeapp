class CreateRecipes < ActiveRecord::Migration[5.1]
  def change
    create_table :recipes do |t|
      t.string :user_id
      t.string :title
      t.decimal :servings
      t.decimal :prep_time
      t.decimal :cook_time
      t.text :directions
      t.string :serving_size
      t.decimal :calories
      t.decimal :total_fat
      t.decimal :total_carb
      t.decimal :total_fiber
      t.decimal :total_sugar
      t.decimal :total_protein
      t.text :nutrition_notes

      t.timestamps
    end
    add_index :recipes, :user_id
  end
end
