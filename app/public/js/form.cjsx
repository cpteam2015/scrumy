TextInput = React.createClass
        render : ->
                <div className="form-group">
                                <label htmlFor={@props.id}>{@props.placeholder}</label>
                                <input onChange={@props.handle} value={@props.text} type="text" className="form-control" id={@props.id} placeholder={@props.placeholder} required={@props.required}/>
                </div>

Member = React.createClass
        render : ->
                <div className="row">
                        <div className="col-md-11">
                                <input onChange={@props.handle} type="text" className="form-control" placeholder="Nom"/>
                        </div>
                        <div className="col-md-1">
                                <i className="material-icons" onClick={@props.del}>delete</i>
                        </div>
                </div>
                        
MembersInput = React.createClass
        render: ->
                memberViews = []
                for k,v of @props.members
                        memberViews.push <Member handle={((e)-> @props.handle(e, k)).bind @} del={@props.del.bind null, k} key={k}/>
                <div className="form-group">
                                <label>Collaborateurs</label>
                                {memberViews}
                                <i className="material-icons" onClick={@props.add}>add</i>
                </div>
                        
Modal = React.createClass
        send: (e) ->
                e.preventDefault()
                request = superagent
                request
                        .post '/api/v1/projects'
                        .type 'json'
                        .send @state.project
                        .end ((err,res) ->
                                console.log 'data sent' if res.ok
                        ).bind @
                $("#addModal").modal 'hide'
        handleName: (event) ->
                @state.project.name = event.target.value
                @setState project: @state.project
        handleDescription: (event) ->
                @state.project.description = event.target.value
                @setState project: @state.project
        handleRepo: (event) ->
                @state.project.git_repo = event.target.value
                @setState project: @state.project
        handleMember: (event, index) ->
                @state.project.members[index] = event.target.value
                @setState project: @state.project
        addMember: ->
                @state.project.members.push ''
                @setState project: @state.project
        deleteMember: (index) ->
                delete @state.project.members[index]
                @setState project: @state.project
        getInitialState: ->
                project: {name:'', description:'', git_repo:'', members:[], backlog:[], sprints:[]}
        render : ->
                project = @state.project
                <form onSubmit={@send}>
                        <TextInput handle={@handleName} text={project.name} id="inputName" placeholder="Nom" required="required"/>
                        <TextInput handle={@handleDescription} text={project.description} id="inputDescription" placeholder="Description"/>
                        <TextInput handle={@handleRepo} text={project.git_repo} id="inputRepo" placeholder="Dépot git"/>
                        <MembersInput del={@deleteMember} add={@addMember} members={project.members} handle={@handleMember}/>
                        <button type="button" className="btn btn-default" data-dismiss="modal">Fermer</button>
                        <button type="submit" className="btn btn-primary">Appliquer</button> 
                </form>

                        
React.render <Modal/>, document.getElementById('modal')

DeleteConfirm = React.createClass
        render : ->
                <div className="modal fade" id="confirmModal">
                        <div className="modal-dialog">
                                <div className="modal-content">
                                        <div className="modal-header">
                                                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                                <h4 className="modal-title">Etes-vous sur de vouloir supprimer le projet?</h4>
                                        </div>
                                        <div className="modal-body">
                                                <button type="button" className="btn btn-default" data-dismiss="modal">Non</button>
                                                <button type="submit" className="btn btn-primary" onClick={@props.handle}>Oui</button> 
                                        </div>
                                </div>
                        </div>
                </div>


