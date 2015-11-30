%w(create read update delete helpers).each do |action|
    require_relative "action/#{action}"
end
require 'pp'
require_relative '../db/connector'

module Scrumy
	class Model
	args = {
      url: 'ds043324.mongolab.com:43324',
      db_name: 'scrumy',
      coll: 'projects',
      user: 'scrumy',
      pwd: 'scrumy'
    }
    @@project_connector = Connector.new(args)

    # Connecteur pour la collection de US
    args[:coll] = 'user_stories'
    @@us_connector = Connector.new(args)
	end
end
