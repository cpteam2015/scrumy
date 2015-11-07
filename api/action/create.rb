class ScrumyAPI < Sinatra::Base
  	post '/project/us/:p_id' do 
	    model = settings.model 
  		p = JSON.parse request.body.read
	    halt 200, model.createUS(params[:p_id],p).to_json
  	end
  	post '/project' do #Tested
  		model = settings.model
  		p = JSON.parse request.body.read
	    halt 200, model.createEmptyProject(p).to_json
  	end
  	post 'projet/us/task/:us_id'
		model = settings.model
		task = JSON.parse request.body.read
		halt 200, model.createTask(params[:us_id], task).to_json
  	end
end
