class ScrumyAPI < Sinatra::Base
	post '/tasks/:id' do
	    content_type :json
	    connector = settings.us_connector
	    us = connector.find(params[:id])
	    us['tasks'] = JSON.parse request.body.read
	    halt 200, connector.replace(us)
  	end
  	post '/us/:p_id' do 
	    model = settings.model 
  		p = JSON.parse request.body.read
	    halt 200, model.createUS(params[:p_id],p).to_json
  	end
  	post '/project' do #Tested
  		model = settings.model
  		p = JSON.parse request.body.read
	    halt 200, model.createEmptyProject(p).to_json
  	end
end