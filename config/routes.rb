Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  get 'api/1/movies/:id', to: 'movies#show'
  delete 'api/1/movies/:id', to: 'movies#destroy'
  post 'api/1/movies', to: 'movies#create'
  root 'pages#index'
end
