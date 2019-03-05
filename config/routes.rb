Rails.application.routes.draw do
  get 'users/edit'

  get 'users/update'

  devise_for :users
  resources :groups do
  end
end
