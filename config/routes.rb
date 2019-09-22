Rails.application.routes.draw do
  resources :recipes
  devise_for :users, controllers: {
    # confirmations: 'users/',
    # passwords: 'users/passwords',
    registrations: 'users/registrations',
    # sessions: 'users/sessions',
    # unlocks: 'users/unlocks'
  }

  # Define Web App Root
  root to: 'pages#home'


end
