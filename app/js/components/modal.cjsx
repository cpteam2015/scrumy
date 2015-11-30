Modal = React.createClass
    render : ->
      <div className="modal fade" id={@props.id} role="dialog" aria-labelledby="modalLabel">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
              <h4 className="modal-title" id='modalLabel'>{@props.title}</h4>
            </div>
            <div className="modal-body">
              {@props.children}
            </div>
          </div>
        </div>
      </div>

module.exports = Modal