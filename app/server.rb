require 'sinatra/base'

# Application front-end pour Scrumy
class ScrumyApp < Sinatra::Base
  get '/' do
    erb :index
  end
  get '/addP.php' do
    send_file 'views/addP.php'
  end
end
