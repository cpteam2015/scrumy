%w(create read update delete helper).each do |action|
    require_relative "action/#{action}"
end

require "sinatra"
require "pp"
require "json"

module Scrumy
	class APP < Sinatra::Base
	end
end
