require 'test_helper'

class RecipesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @recipe = recipes(:one)
  end

  test "should get index" do
    get recipes_url
    assert_response :success
  end

  test "should get new" do
    get new_recipe_url
    assert_response :success
  end

  test "should create recipe" do
    assert_difference('Recipe.count') do
      post recipes_url, params: { recipe: { calories: @recipe.calories, cook_time: @recipe.cook_time, directions: @recipe.directions, nutrition_notes: @recipe.nutrition_notes, prep_time: @recipe.prep_time, serving_size: @recipe.serving_size, servings: @recipe.servings, title: @recipe.title, total_carb: @recipe.total_carb, total_fat: @recipe.total_fat, total_fiber: @recipe.total_fiber, total_protein: @recipe.total_protein, total_sugar: @recipe.total_sugar, user_id: @recipe.user_id } }
    end

    assert_redirected_to recipe_url(Recipe.last)
  end

  test "should show recipe" do
    get recipe_url(@recipe)
    assert_response :success
  end

  test "should get edit" do
    get edit_recipe_url(@recipe)
    assert_response :success
  end

  test "should update recipe" do
    patch recipe_url(@recipe), params: { recipe: { calories: @recipe.calories, cook_time: @recipe.cook_time, directions: @recipe.directions, nutrition_notes: @recipe.nutrition_notes, prep_time: @recipe.prep_time, serving_size: @recipe.serving_size, servings: @recipe.servings, title: @recipe.title, total_carb: @recipe.total_carb, total_fat: @recipe.total_fat, total_fiber: @recipe.total_fiber, total_protein: @recipe.total_protein, total_sugar: @recipe.total_sugar, user_id: @recipe.user_id } }
    assert_redirected_to recipe_url(@recipe)
  end

  test "should destroy recipe" do
    assert_difference('Recipe.count', -1) do
      delete recipe_url(@recipe)
    end

    assert_redirected_to recipes_url
  end
end
