Actions = require '../actions/project-modal'
Store = require '../stores/project-modal'

Modal = require './modal'

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
                                   Actions.handleMember(@props.id, e.target.value)).bind @}
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
                                <i className="material-icons" onClick={Actions.addMember}>
                                  add
                                </i>
                </div>


Form = React.createClass
    mixins: [Reflux.connect(Store, 'project')]
    render : ->
        project = @state.project
        <form onSubmit={(e) ->
                            #e.preventDefault() #pour éviter de recharger la page
                            Actions.submit e}>
            <TextInput onChange={Actions.handleName} text={project.name} id="inputName" placeholder="Nom" required="required"/>
            <TextInput onChange={Actions.handleDescription} text={project.description} id="inputDescription" placeholder="Description"/>
            <TextInput onChange={Actions.handleRepo} text={project.git_repo} id="inputRepo" placeholder="Dépot git"/>
            <MembersInput members={project.members}/>
            <button type="button" className="btn btn-default" data-dismiss="modal">Fermer</button>
            <button type="submit" className="btn btn-primary">Appliquer</button>
        </form>

ProjectModal = React.createClass
    render : ->
        <Modal title='Ajouter projet' id='addProject'>
          <Form/>
        </Modal>

module.exports = ProjectModal