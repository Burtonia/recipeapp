class RecipesController < ApplicationController
  before_action :set_recipe, only: [:show, :edit, :update, :destroy]

  require 'json'

  # GET /recipes
  # GET /recipes.json
  def index

      @recipes = Recipe.all.where(user_id: current_user.id)

  end

  # GET /recipes/1
  # GET /recipes/1.json
  def show
  end

  # GET /recipes/new
  def new
    @recipe = Recipe.new
  end

  def jsonify(hash_data)
    hash_data.to_json
  end

  # GET /recipes/1/edit
  def edit

    # ~~~ USDA API with Net::HTTP ~~~ #
    # /report/{id} result usda_result['report']['food']['nutrients']
    usda_api_url = 'https://api.nal.usda.gov/ndb/'
    usda_api_lib = 'search'; # reports, search,
    usda_api_endpoint = URI(usda_api_url + usda_api_lib)
    usda_api_key = 'rRdvmGn8kjLwJrX3k3fFe3nNWLT2ACCfEQNew7Ib'

    request_uri = URI(usda_api_endpoint)
    uri_params = { :api_key => usda_api_key, :q => params['q'], :format => 'json' } # :ndbno => '01009'
    request_uri.query = URI.encode_www_form(uri_params)
    response = Net::HTTP.get(request_uri)
    # @usda_result = JSON.parse(response)
    usda_result = JSON.parse(response)
    # https://stackoverflow.com/questions/288715/checking-if-a-variable-is-defined
    if !(defined?(usda_result['list']['item'])).nil?
      @usda_search_results = usda_result['list']['item']
      @usda_json_results = jsonify(@usda_json_results)
    end

  end

  # POST /recipes
  # POST /recipes.json
  def create
    @recipe = Recipe.new(recipe_params)

    respond_to do |format|
      if @recipe.save
        format.html { redirect_to @recipe, notice: 'Recipe was successfully created.' }
        format.json { render :show, status: :created, location: @recipe }
      else
        format.html { render :new }
        format.json { render json: @recipe.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /recipes/1
  # PATCH/PUT /recipes/1.json
  def update
    respond_to do |format|
      if @recipe.update(recipe_params)
        format.html { redirect_to @recipe, notice: 'Recipe was successfully updated.' }
        format.json { render :show, status: :ok, location: @recipe }
      else
        format.html { render :edit }
        format.json { render json: @recipe.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /recipes/1
  # DELETE /recipes/1.json
  def destroy
    @recipe.destroy
    respond_to do |format|
      format.html { redirect_to recipes_url, notice: 'Recipe was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_recipe
      @recipe = Recipe.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def recipe_params
      params.require(:recipe).permit(:user_id, :title, :servings, :prep_time, :cook_time, :recipe_ingredients, :directions, :serving_size, :calories, :total_fat, :total_carb, :total_fiber, :total_sugar, :total_protein, :nutrition_notes)
    end
end
