Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get 'monitoring/all'
    end
  end

  devise_for :users, controllers: {
    registrations: "users/registrations"
  }
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  # Api definition
  namespace :api do
    namespace :v1 do
      resources :monitoring
    end
  end

  root to: 'static#index'

  resources :monitoring, only: [:index, :create]
  resources :devices

  get "/serial_check/:serial", to: "devices#serial_check", as: "serial_check"
  get "/available_check/:serial", to: "devices#available_check", as: "available_check"
  get "/new_registration", to: "devices#new_registration", as: "new_registration"
  post "/registration_process", to: "devices#registration_process", as: "registration_process"
  get "/unregister/:id", to: "devices#unregister", as: "unregister"

  get "/render_current_level/:device_id", to: "monitoring#render_current_level", as: "render_current_level"
  get "/render_all_current_levels", to: "monitoring#render_all_current_levels", as: "render_all_current_levels"
  get "/get_all_dimensions", to: "monitoring#get_all_dimensions", as: "get_all_dimensions"

  get "/get_graph/:id", to: "graphs#get_graph", as: "get_graph"
  get "/get_all_graphs", to: "graphs#get_all_graphs", as: "get_all_graphs"

  get "/get_device_levels/:id", to: "graphs#get_device_levels", as: "get_device_levels"
  get "/get_devices_levels", to: "graphs#get_devices_levels", as: "get_devices_levels"

end
