%w(create read update delete helper).each do |action|
    require_relative "action/#{action}"
end


module Scrumy
	class Model
	end
end
