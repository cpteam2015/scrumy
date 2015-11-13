ProjectList = require './components/project-list'
Project = require './components/project'

Main = React.createClass
        render : ->
            <div>
                <ProjectList/>
                <Project/>
            </div>

React.render <Main/>, document.getElementById('content')
