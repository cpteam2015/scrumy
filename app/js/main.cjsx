ProjectList = require './components/project-list'
Project = require './components/project'
ModalList = require './components/modal-list'

Main = React.createClass
        render : ->
            <div>
                <ProjectList/>
                <Project/>
                <ModalList/>
            </div>

React.render <Main/>, document.getElementById('content')