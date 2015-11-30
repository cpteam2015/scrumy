class ScrumyAPI < Sinatra::Base
	put '/project/:id' do
	    model = settings.model 
  		p = JSON.parse request.body.read
	    halt 200, model.updateProject(params[:id],p).to_json
  	end
  	put '/project/bl/:id' do
  		model = settings.model 
  		us = JSON.parse request.body.read
	    halt 200, model.updateUS(params['_id'],us).to_json
  	end
  	
  	put '/project/us/task/:us_id' do
  		model = settings.model 
  		task = JSON.parse request.body.read
	    halt 200, model.updateTask(params[:us_id],task).to_json
  	end
end
