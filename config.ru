$:.push File.dirname(__FILE__)

require 'tilt/erb'

require 'app'

run Sinatra::Application
