Actions = require '../actions/project-list'
Store = require '../stores/project-list'
ModalActions = require '../actions/modal'

AddProject = React.createClass
        render : ->
                <a
                 onClick={ModalActions.setType.bind null, event, 'post'}
                 data-toggle="modal"
                 data-target="#addModal"
                 className="material-icons">
                  add
                </a>

DeleteConfirm = React.createClass
        render : ->
                <div className="modal fade" id="confirmModal">
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
                                                    Etes-vous sur de vouloir supprimer le projet?
                                                </h4>
                                        </div>
                                        <div className="modal-body">
                                                <button
                                                 type="button"
                                                 className="btn btn-default"
                                                 data-dismiss="modal">
                                                    Non
                                                </button>
                                                <button
                                                 type="submit"
                                                 className="btn btn-primary"
                                                 onClick={@props.handle}>
                                                    Oui
                                                </button>
                                        </div>
                                </div>
                        </div>
                </div>

DeleteProject = React.createClass
        render : ->
                <span>
                  <button type="button" className="btn btn-default">
                    <a
                     data-toggle="modal"
                     data-target="#confirmModal"
                     className="material-icons">
                        delete
                    </a>
                  </button>
                  <DeleteConfirm handle={Actions.delete}/>
                </span>

EditProject = React.createClass
        render : ->
                <a
                 onClick={ModalActions.setType.bind null, event,'put'}
                 data-toggle="modal"
                 data-target="#addModal"
                 className="material-icons">
                    edit
                </a>

Project = React.createClass
                        render: ->
                                <li
                                 onClick={@props.onClick.bind null,@props.id}
                                 className=""
                                 aria-labelledby="dropdownMenu">
                                    <a>{@props.name}</a>
                                </li>

ProjectList = React.createClass
                        mixins: [Reflux.connect(Store, 'data')]
                        render: ->
                                current = @state.data.current
                                projects = @state.data.projects
                                list = []
                                for k,project of projects
                                        list.push <Project
                                                   id={k}
                                                   key={k}
                                                   name={project.name}
                                                   onClick={Actions.changeCurrent} />

                                <div className="btn-group" role="group" aria-label="...">
                                <div className="dropdown">
                                        <button
                                         type="button"
                                         className="btn btn-default dropdown-toggle"
                                         id="dropdownMenu"
                                         data-toggle="dropdown"
                                         aria-haspopup="true"
                                         aria-expanded="true">
                                            <p>
                                                {projects[current].name if projects.length isnt 0}
                                                <span className="caret"></span>
                                            </p>
                                        </button>
                                        <button type="button" className="btn btn-default">
                                            <EditProject project={projects[current]}/>
                                        </button>
                                        <DeleteProject/>
                                        <button type="button" className="btn btn-default">
                                            <AddProject/>
                                        </button>
                                        <ul className="dropdown-menu">
                                                {list}
                                        </ul>
                                </div>
                                </div>


module.exports = ProjectList
