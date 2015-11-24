class ScrumyAPI < Sinatra::Base
	get '/projects' do
	    content_type :json
	    model = settings.model
	    model.getAllProjects.to_json
	end
	get '/project/bl' do
	    content_type :json
	    model = settings.model
	    model.getProject(params['_id']).to_json
	end
	get '/project/sp' do
	    content_type :json
	    model = settings.model
	    model.getProjectSp(params['_id']).to_json
	end
	get '/project/sp/task' do
		content_type :json
	    model = settings.model
	    halt 200,model.getTasks(params['_id'],params['id']).to_json
	end
	get '/project/sp/task/pert' do
		content_type :json
	    model = settings.model
	    halt 200,model.getPert(params['_id'],params['id']).to_json
	end

	# ========================
	get '/mockups/p' do
	    pp 'get mockups'
	    r = JSON.parse File.read('api/mockups/projects.json')
	    halt 200, r.to_json
	end
  	get '/mockups/backlog' do
	    pp "backlog #{params}"
	    r = JSON.parse File.read('api/mockups/bl.json')
	    halt 200, r.to_json
  	end

  	get '/user_stories/:id' do
	    content_type :json
	    connector = settings.us_connector
	    halt 200, connector.find(params[:id]).to_json
  	end


end