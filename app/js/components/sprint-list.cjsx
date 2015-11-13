Store = require '../stores/sprint-list'
Actions = require '../actions/sprint-list'

Sprint = React.createClass
    render: ->
      <div className="panel panel-primary">
          <div className="panel-heading">
              {@props.id}
          </div>
          <div className="panel-body">
              {@props.start}
          </div>
      </div>

SprintList = React.createClass
    mixins: [Reflux.connect(Store, 'list')]
    render: ->
        console.log @state.list
        items = @state.list.map (i) -> <Sprint key={i.id} id={i.id} start={i.start}/>
        <div className="list-group">
        <button type="button" className="btn btn-default">
            <a
             onClick={Actions.add}
             data-toggle="modal"
             data-target="#sprintModal"
             className="material-icons" >
                add
            </a>
        </button>

            {items}
        </div>

module.exports = SprintList
