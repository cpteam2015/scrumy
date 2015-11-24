Store = require '../stores/sprint-modal'
Actions = require '../actions/sprint-modal'

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

SprintForm = React.createClass
    mixins: [Reflux.connect(Store, 'sprint')]
    render : ->
                    <form onSubmit={(e) ->
                                        #e.preventDefault() #pour éviter de recharger la page
                                        Actions.submit e}>
                        <TextInput onChange={Actions.handleName} text={@state.sprint.id} id="inputName" placeholder="Nom" required="required"/>
                        <TextInput onChange={Actions.handleDate} text={@state.sprint.start} id="inputDate" placeholder="Date de début"/>
                        <div className="form-group"><a onClick={Actions.createKanban}>Intégrer Kanban Trello</a></div>
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


SprintModal = React.createClass
    render : ->
        <Modal title='Ajouter Sprint' id='addSprint'>
          <SprintForm/>
        </Modal>


module.exports = SprintModal