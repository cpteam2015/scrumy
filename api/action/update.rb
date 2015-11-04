class ScrumyAPI < Sinatra::Base
	put '/user_stories/:id' do
	    content_type :json
	    connector = settings.us_connector
	    halt 200, connector.replace(request.body.read).to_json
  	end
end