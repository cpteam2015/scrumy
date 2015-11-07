class ScrumyAPI < Sinatra::Base
	put '/project/:id' do
	    model = settings.model 
  		p = JSON.parse request.body.read
	    halt 200, model.updateProject(params[:id],p).to_json
  	end
  	put '/project/us/:p_id' do
  		model = settings.model 
  		us = JSON.parse request.body.read
	    halt 200, model.updateUS(params[:p_id],us).to_json
  	end
end