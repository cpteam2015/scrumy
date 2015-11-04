class ScrumyAPI < Sinatra::Base
	delete '/user_stories/:id' do
	    content_type :json
	    connector = settings.us_connector
	    halt 200, connector.delete(params[:id]).to_json
  	end
end