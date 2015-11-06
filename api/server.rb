require 'sinatra'
require 'sinatra/base'
require 'json'
require 'pp'

require_relative 'db/connector'
require_relative 'model/model'

%w(create read update delete).each do |action|
    require_relative "action/#{action}"
end

# Application pour l'API de Scrumy
class ScrumyAPI < Sinatra::Base
  before do
    content_type 'application/json'
  end
  configure do
    set :model, Scrumy::Model.new
  end
end