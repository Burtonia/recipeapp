json.extract! recipe, :id, :user_id, :title, :servings, :prep_time, :cook_time, :directions, :serving_size, :calories, :total_fat, :total_carb, :total_fiber, :total_sugar, :total_protein, :nutrition_notes, :created_at, :updated_at
json.url recipe_url(recipe, format: :json)
