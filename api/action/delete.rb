class ScrumyAPI < Sinatra::Base
	delete '/project/bl/:id' do
	    model = settings.model 
  		us_id = JSON.parse request.body.read
  		us_id = us_id['id']
	    halt 200, model.deleteUS(params['_id'],us_id).to_json
  	end
  	delete '/project/sp/task/:task' do
  		model = settings.model 
  		task = JSON.parse request.body.read
      task = task['id']
	    halt 200, model.deleteTask(params['sp_id'],params['p_id'],task)
  	end

end