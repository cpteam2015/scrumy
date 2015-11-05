class ScrumyAPI < Sinatra::Base
	delete '/project/us/:id' do
	    model = settings.model 
  		us_id = JSON.parse request.body.read
  		us_id = us_id['id']
	    halt 200, model.deleteUS(params[:id],us_id).to_json
  	end
end