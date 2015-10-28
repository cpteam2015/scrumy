require 'sinatra'
require 'sinatra/base'
require 'json'
require 'pp'

require_relative 'db/connector'

# Application pour l'API de Scrumy
class ScrumyAPI < Sinatra::Base
  before do
    content_type 'application/json'
  end
  # configure do
  #   # Connecteur pour la collection de projets
  #   args = {
  #     url: 'ds043324.mongolab.com:43324',
  #     db_name: 'scrumy',
  #     coll: 'projects',
  #     user: 'scrumy',
  #     pwd: 'scrumy'
  #   }
  #   set :project_connector, Connector.new(args)

  #   # Connecteur pour la collection de US
  #   args[:coll] = 'user_stories'
  #   set :us_connector, Connector.new(args)
  # end

  get '/projects' do
    content_type :json
    connector = settings.project_connector
    halt 200, connector.find_all.to_json
  end
  get '/mockups/p' do
    pp 'get mockups'
    r = JSON.parse File.read('api/mockups/projects.json')
    halt 200, r.to_json
  end
  get '/mockups/bl' do
    pp 'get bl'
    r = JSON.parse File.read('api/mockups/bl.json')
    halt 200, r.to_json
  end


  get '/user_stories/:id' do
    content_type :json
    connector = settings.us_connector
    halt 200, connector.find(params[:id]).to_json
  end
end
