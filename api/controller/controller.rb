require "sinatra/base"
require "pp"
require "json"


%w(create read update delete).each do |action|
    require_relative "action/#{action}"
end

class APP < Sinatra::Base
	run!
end

