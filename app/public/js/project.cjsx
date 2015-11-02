Project = React.createClass
        render: ->
                <li onClick={@props.onClick.bind null,@props.id} className="" aria-labelledby="dropdownMenu"><a>{@props.name}</a></li>

ProjectList = React.createClass
        getInitialState: ->
                data: {projects:[], current:0}, backlog: true
        selectBacklog: ->
                @setState backlog: true
        selectSprints: ->
                @setState backlog: false       
        delete: ->
                current = @state.data.current
                projects = @state.data.projects
                delete projects[current]
                @setState data: @state.data
        changeCurrent: (id) ->
                @state.data.current = id
                @setState data: @state.data
        mixins: [Reflux.connect(ProjectStore, 'data')]
        render: ->
                current = @state.data.current
                projects = @state.data.projects
                list = []
                for k,project of projects
                        list.push <Project id={k} key={k} name={project.name} onClick={@changeCurrent}/>
                <div>
                <div className="btn-group" role="group" aria-label="...">        
                <div className="dropdown">
                        <button type="button" className="btn btn-default dropdown-toggle" id="dropdownMenu" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                                <p>
                                {projects[current].name if projects.length isnt 0}
                                <span className="caret"></span>
                                </p>
                        </button>
                        <button type="button" className="btn btn-default"><EditProject project={projects[current]}/></button>
                        <DeleteProject handle={@delete}/>
                        <button type="button" className="btn btn-default"><AddProject/></button>
                        <ul className="dropdown-menu">
                                {list}
                        </ul>
                </div>
                </div>
                <nav role="navigation">
                        <ul className="nav nav-tabs">
                                <li onClick={@selectBacklog} role="presentation" className={'active' if @state.backlog}><a>Backlog</a></li>
                                <li onClick={@selectSprints} role="presentation" className={'active' if not @state.backlog}><a>Sprints</a></li>
                        </ul>
                </nav>
                </div>
                        
AddProject = React.createClass
        render : ->
                <a data-toggle="modal" data-target="#addModal" className="material-icons">add</a>

DeleteProject = React.createClass
        render : ->
                <span><button type="button" className="btn btn-default"><a data-toggle="modal" data-target="#confirmModal" className="material-icons">delete</a></button><DeleteConfirm handle={@props.handle}/></span>
                        
EditProject = React.createClass
        render : ->
                <a data-toggle="modal" data-target="#addModal" className="material-icons">edit</a>

React.render <ProjectList/>, document.getElementById('content')

                        
