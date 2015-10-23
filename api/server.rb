require 'sinatra/base'
require 'json'

require_relative 'db/connector'

# Application pour l'API de Scrumy
class ScrumyAPI < Sinatra::Base
  configure do
    # Connecteur pour la collection de projets
    args = {
      url: 'ds043324.mongolab.com:43324',
      db_name: 'scrumy',
      coll: 'projects',
      user: 'scrumy',
      pwd: 'scrumy'
    }
    set :project_connector, Connector.new(args)

    # Connecteur pour la collection de US
    args[:coll] = 'user_stories'
    set :us_connector, Connector.new(args)
  end

  get '/projects' do
    content_type :json
    connector = settings.project_connector
    halt 200, connector.find_all.to_json
  end

  get '/user_stories/:id' do
    content_type :json
    connector = settings.us_connector
    halt 200, connector.find(params[:id]).to_json
  end

  post '/user_stories/' do
    content_type :json
    connector = settings.us_connector
    halt 200, connector.insert(request.body.read).to_json
  end

  put '/user_stories/:id' do
    content_type :json
    connector = settings.us_connector
    halt 200, connector.replace(request.body.read).to_json
  end

  delete '/user_stories/:id' do
    content_type :json
    connector = settings.us_connector
    halt 200, connector.delete(params[:id]).to_json
  end

  put '/projects' do
    content_type :json
    connector = settings.project_connector
    doc = JSON.parse(request.body.read)
    halt 200, connector.replace(doc).to_json
  end
end
