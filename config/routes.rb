Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  # resources :proxies, only: [ :show, :create ] do
  #   resources :temp_links, only: [ :create ]
  # end
  #
  # resources :temp_links, only: [ :show ], param: :slug
  # resources :temp_links, only: [ :destroy ]

  namespace :api, defaults: { format: :json } do
    resources :proxies, only: [ :show, :create ] do
      resources :temp_links, only: [ :index, :create ]
    end

    resources :temp_links, only: [ :destroy ]
  end

  resources :temp_links, only: [ :show ], param: :slug

  root to: 'static_pages#root'
end
