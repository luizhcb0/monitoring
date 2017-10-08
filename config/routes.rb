Rails.application.routes.draw do
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'static#index'
  
  resources :monitoring, only: [:index]
  get "/render_current_level/:device_id", to: "monitoring#render_current_level", as: "render_current_level"
  get "/render_all_current_levels", to: "monitoring#render_all_current_levels", as: "render_all_current_levels"
  
end
