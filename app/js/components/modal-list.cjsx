ProjectModal = require '../components/project-modal'
SprintModal = require '../components/sprint-modal'

ModalList = React.createClass
    render : ->
        <div>
          <ProjectModal/>
          <SprintModal/>
        </div>

module.exports = ModalList