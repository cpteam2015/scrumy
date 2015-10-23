$LOAD_PATH.push File.dirname(__FILE__)

require 'tilt/erb'

require 'api/server'
require 'app/server'

run Rack::URLMap.new('/' => ScrumyApp.new,
                     '/api/v1' => ScrumyAPI.new)
