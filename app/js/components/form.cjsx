TextInput = React.createClass
    render : ->
        <div className="form-group">
            <label htmlFor={@props.id}>
                {@props.placeholder}
            </label>
            <input
             onChange={((e) ->
               @props.onChange e.target.value).bind @}
             value={@props.text}
             type="text"
             className="form-control"
             id={@props.id}
             placeholder={@props.placeholder}
             required={@props.required} />
        </div>

Member = React.createClass
        render : ->
                <div className="row">
                        <div className="col-md-11">
                                <input
                                 onChange={((e)->
                                   ModalActions.handleMember(@props.id, e.target.value)).bind @}
                                 value={@props.name}
                                 type="text"
                                 className="form-control"
                                 placeholder="Nom"/>
                        </div>
                        <div className="col-md-1">
                                <i
                                 className="material-icons"
                                 onClick={ModalActions.deleteMember.bind null, @props.id}>
                                    delete
                                </i>
                        </div>
                </div>

MembersInput = React.createClass
        render: ->
                memberViews = []
                for k,v of @props.members
                        memberViews.push <Member
                                          name={v}
                                          id={k}
                                          key={k} />
                <div className="form-group">
                                <label>Collaborateurs</label>
                                {memberViews}
                                <i className="material-icons" onClick={ModalActions.addMember}>
                                  add
                                </i>
                </div>

Modal = React.createClass
    mixins: [Reflux.connect(ModalStore, 'project')]
    render : ->
        project = @state.project
        <form onSubmit={(e) ->
                            #e.preventDefault() #pour éviter de recharger la page
                            ModalActions.submit e}>
            <TextInput onChange={ModalActions.handleName} text={project.name} id="inputName" placeholder="Nom" required="required"/>
            <TextInput onChange={ModalActions.handleDescription} text={project.description} id="inputDescription" placeholder="Description"/>
            <TextInput onChange={ModalActions.handleRepo} text={project.git_repo} id="inputRepo" placeholder="Dépot git"/>
            <MembersInput members={project.members} onChange={ModalActions.handleMember}/>
            <button type="button" className="btn btn-default" data-dismiss="modal">Fermer</button>
            <button type="submit" className="btn btn-primary">Appliquer</button>
        </form>

React.render <Modal/>, document.getElementById('modal')

SprintModal = React.createClass
    mixins: [Reflux.connect(ModalStore, 'sprint')]
    render : ->
        <div className="modal fade" id="sprintModal">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button"
                         className="close"
                         data-dismiss="modal"
                         aria-label="Close">
                            <span aria-hidden="true">
                                &times;
                            </span>
                        </button>
                        <h4 className="modal-title">
                            Ajouter un sprint
                        </h4>
                    </div>
                    <div className="modal-body">
                    <form onSubmit={(e) ->
                                        #e.preventDefault() #pour éviter de recharger la page
                                        ModalActions.submit e}>
                        <TextInput onChange={SprintActions.handleName} text={@state.sprint.id} id="inputName" placeholder="Nom" required="required"/>
                        <TextInput onChange={ModalActions.handleDate} text={@state.sprint.start} id="inputDate" placeholder="Date de début"/>

                        <button
                         type="button"
                         className="btn btn-default"
                         data-dismiss="modal">
                            Annuler
                        </button>
                        <button
                         type="submit"
                         className="btn btn-primary"
                         onClick={@props.handle}>
                            Appliquer
                        </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
