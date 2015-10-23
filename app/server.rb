require 'sinatra/base'

# Application front-end pour Scrumy
class ScrumyApp < Sinatra::Base
  get '/' do
    erb :index
  end
end
