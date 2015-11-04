class ScrumyAPI < Sinatra::Base
	post '/tasks/:id' do
	    content_type :json
	    connector = settings.us_connector
	    us = connector.find(params[:id])
	    us['tasks'] = JSON.parse request.body.read
	    halt 200, connector.replace(us)
  	end
  	post '/user_stories/' do
	    content_type :json
	    connector = settings.us_connector
	    halt 200, connector.insert(request.body.read).to_json
  	end
  	post '/project' do
  		
  	end
end