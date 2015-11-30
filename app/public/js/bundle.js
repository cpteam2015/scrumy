(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var ProjectListActions;

ProjectListActions = Reflux.createActions(['fetchList', 'delete', 'changeCurrent']);

module.exports = ProjectListActions;


},{}],2:[function(require,module,exports){
var ModalActions;

ModalActions = Reflux.createActions(['submit', 'setCurrentProject', 'setType', 'handleName', 'handleDescription', 'handleRepo', 'handleMember', 'addMember', 'deleteMember']);

module.exports = ModalActions;


},{}],3:[function(require,module,exports){
var ProjectActions;

ProjectActions = Reflux.createActions(['selectBacklog', 'setCurrentProject', 'selectSprints']);

module.exports = ProjectActions;


},{}],4:[function(require,module,exports){
var SprintListActions;

SprintListActions = Reflux.createActions(['handleName', 'handleDescription', 'add', 'setList']);

module.exports = SprintListActions;


},{}],5:[function(require,module,exports){
var ModalActions;

ModalActions = Reflux.createActions(['submit', 'setCurrentSprint', 'setType', 'handleName', 'handleDate', 'createKanban']);

module.exports = ModalActions;


},{}],6:[function(require,module,exports){
var ModalList, ProjectModal, SprintModal;

ProjectModal = require('../components/project-modal');

SprintModal = require('../components/sprint-modal');

ModalList = React.createClass({displayName: "ModalList",
  render: function() {
    return React.createElement("div", null, React.createElement(ProjectModal, null), React.createElement(SprintModal, null));
  }
});

module.exports = ModalList;


},{"../components/project-modal":9,"../components/sprint-modal":12}],7:[function(require,module,exports){
var Modal;

Modal = React.createClass({displayName: "Modal",
  render: function() {
    return React.createElement("div", {
      "className": "modal fade",
      "id": this.props.id,
      "role": "dialog",
      "aria-labelledby": "modalLabel"
    }, React.createElement("div", {
      "className": "modal-dialog",
      "role": "document"
    }, React.createElement("div", {
      "className": "modal-content"
    }, React.createElement("div", {
      "className": "modal-header"
    }, React.createElement("button", {
      "type": "button",
      "className": "close",
      "data-dismiss": "modal",
      "aria-label": "Close"
    }, React.createElement("span", {
      "aria-hidden": "true"
    }, "×")), React.createElement("h4", {
      "className": "modal-title",
      "id": 'modalLabel'
    }, this.props.title)), React.createElement("div", {
      "className": "modal-body"
    }, this.props.children))));
  }
});

module.exports = Modal;


},{}],8:[function(require,module,exports){
var Actions, AddProject, DeleteConfirm, DeleteProject, EditProject, ModalActions, Project, ProjectList, Store;

Actions = require('../actions/project-list');

Store = require('../stores/project-list');

ModalActions = require('../actions/project-modal');

AddProject = React.createClass({displayName: "AddProject",
  render: function() {
    return React.createElement("a", {
      "onClick": ModalActions.setType.bind(null, event, 'post'),
      "data-toggle": "modal",
      "data-target": "#addProject",
      "className": "material-icons"
    }, "add");
  }
});

DeleteConfirm = React.createClass({displayName: "DeleteConfirm",
  render: function() {
    return React.createElement("div", {
      "className": "modal fade",
      "id": "confirmModal"
    }, React.createElement("div", {
      "className": "modal-dialog"
    }, React.createElement("div", {
      "className": "modal-content"
    }, React.createElement("div", {
      "className": "modal-header"
    }, React.createElement("button", {
      "type": "button",
      "className": "close",
      "data-dismiss": "modal",
      "aria-label": "Close"
    }, React.createElement("span", {
      "aria-hidden": "true"
    }, "×")), React.createElement("h4", {
      "className": "modal-title"
    }, "Etes-vous sur de vouloir supprimer le projet?")), React.createElement("div", {
      "className": "modal-body"
    }, React.createElement("button", {
      "type": "button",
      "className": "btn btn-default",
      "data-dismiss": "modal"
    }, "Non"), React.createElement("button", {
      "type": "submit",
      "className": "btn btn-primary",
      "onClick": this.props.handle
    }, "Oui")))));
  }
});

DeleteProject = React.createClass({displayName: "DeleteProject",
  render: function() {
    return React.createElement("span", null, React.createElement("button", {
      "type": "button",
      "className": "btn btn-default"
    }, React.createElement("a", {
      "data-toggle": "modal",
      "data-target": "#confirmModal",
      "className": "material-icons"
    }, "delete")), React.createElement(DeleteConfirm, {
      "handle": Actions["delete"]
    }));
  }
});

EditProject = React.createClass({displayName: "EditProject",
  render: function() {
    return React.createElement("a", {
      "onClick": ModalActions.setType.bind(null, event, 'put'),
      "data-toggle": "modal",
      "data-target": "#addProject",
      "className": "material-icons"
    }, "edit");
  }
});

Project = React.createClass({displayName: "Project",
  render: function() {
    return React.createElement("li", {
      "onClick": this.props.onClick.bind(null, this.props.id),
      "className": "",
      "aria-labelledby": "dropdownMenu"
    }, React.createElement("a", null, this.props.name));
  }
});

ProjectList = React.createClass({displayName: "ProjectList",
  mixins: [Reflux.connect(Store, 'data')],
  render: function() {
    var current, k, list, project, projects;
    current = this.state.data.current;
    projects = this.state.data.projects;
    list = [];
    for (k in projects) {
      project = projects[k];
      list.push(React.createElement(Project, {
        "id": k,
        "key": k,
        "name": project.name,
        "onClick": Actions.changeCurrent
      }));
    }
    return React.createElement("div", {
      "className": "btn-group",
      "role": "group",
      "aria-label": "..."
    }, React.createElement("div", {
      "className": "dropdown"
    }, React.createElement("button", {
      "type": "button",
      "className": "btn btn-default dropdown-toggle",
      "id": "dropdownMenu",
      "data-toggle": "dropdown",
      "aria-haspopup": "true",
      "aria-expanded": "true"
    }, React.createElement("p", null, (projects.length !== 0 ? projects[current].name : void 0), React.createElement("span", {
      "className": "caret"
    }))), React.createElement("button", {
      "type": "button",
      "className": "btn btn-default"
    }, React.createElement(EditProject, {
      "project": projects[current]
    })), React.createElement(DeleteProject, null), React.createElement("button", {
      "type": "button",
      "className": "btn btn-default"
    }, React.createElement(AddProject, null)), React.createElement("ul", {
      "className": "dropdown-menu"
    }, list)));
  }
});

module.exports = ProjectList;


},{"../actions/project-list":1,"../actions/project-modal":2,"../stores/project-list":14}],9:[function(require,module,exports){
var Actions, Form, Member, MembersInput, Modal, ProjectModal, Store, TextInput;

Actions = require('../actions/project-modal');

Store = require('../stores/project-modal');

Modal = require('./modal');

TextInput = React.createClass({displayName: "TextInput",
  render: function() {
    return React.createElement("div", {
      "className": "form-group"
    }, React.createElement("label", {
      "htmlFor": this.props.id
    }, this.props.placeholder), React.createElement("input", {
      "onChange": (function(e) {
        return this.props.onChange(e.target.value);
      }).bind(this),
      "value": this.props.text,
      "type": "text",
      "className": "form-control",
      "id": this.props.id,
      "placeholder": this.props.placeholder,
      "required": this.props.required
    }));
  }
});

Member = React.createClass({displayName: "Member",
  render: function() {
    return React.createElement("div", {
      "className": "row"
    }, React.createElement("div", {
      "className": "col-md-11"
    }, React.createElement("input", {
      "onChange": (function(e) {
        return Actions.handleMember(this.props.id, e.target.value);
      }).bind(this),
      "value": this.props.name,
      "type": "text",
      "className": "form-control",
      "placeholder": "Nom"
    })), React.createElement("div", {
      "className": "col-md-1"
    }, React.createElement("i", {
      "className": "material-icons",
      "onClick": ModalActions.deleteMember.bind(null, this.props.id)
    }, "delete")));
  }
});

MembersInput = React.createClass({displayName: "MembersInput",
  render: function() {
    var k, memberViews, ref, v;
    memberViews = [];
    ref = this.props.members;
    for (k in ref) {
      v = ref[k];
      memberViews.push(React.createElement(Member, {
        "name": v,
        "id": k,
        "key": k
      }));
    }
    return React.createElement("div", {
      "className": "form-group"
    }, React.createElement("label", null, "Collaborateurs"), memberViews, React.createElement("i", {
      "className": "material-icons",
      "onClick": Actions.addMember
    }, "add"));
  }
});

Form = React.createClass({displayName: "Form",
  mixins: [Reflux.connect(Store, 'project')],
  render: function() {
    var project;
    project = this.state.project;
    return React.createElement("form", {
      "onSubmit": (function(e) {
        e.preventDefault();
        return Actions.submit(e);
      })
    }, React.createElement(TextInput, {
      "onChange": Actions.handleName,
      "text": project.name,
      "id": "inputName",
      "placeholder": "Nom",
      "required": "required"
    }), React.createElement(TextInput, {
      "onChange": Actions.handleDescription,
      "text": project.description,
      "id": "inputDescription",
      "placeholder": "Description"
    }), React.createElement(TextInput, {
      "onChange": Actions.handleRepo,
      "text": project.git_repo,
      "id": "inputRepo",
      "placeholder": "Dépot git"
    }), React.createElement(MembersInput, {
      "members": project.members
    }), React.createElement("button", {
      "type": "button",
      "className": "btn btn-default",
      "data-dismiss": "modal"
    }, "Fermer"), React.createElement("button", {
      "type": "submit",
      "className": "btn btn-primary"
    }, "Appliquer"));
  }
});

ProjectModal = React.createClass({displayName: "ProjectModal",
  render: function() {
    return React.createElement(Modal, {
      "title": 'Ajouter projet',
      "id": 'addProject'
    }, React.createElement(Form, null));
  }
});

module.exports = ProjectModal;


},{"../actions/project-modal":2,"../stores/project-modal":15,"./modal":7}],10:[function(require,module,exports){
var Actions, Project, SprintList, Store, TabContent, TabNav;

Actions = require('../actions/project');

Store = require('../stores/project');

SprintList = require('./sprint-list');

TabNav = React.createClass({displayName: "TabNav",
  render: function() {
    return React.createElement("nav", {
      "role": "navigation"
    }, React.createElement("ul", {
      "className": "nav nav-tabs"
    }, React.createElement("li", {
      "onClick": Actions.selectBacklog,
      "role": "presentation",
      "className": (this.props.backlog ? 'active' : void 0)
    }, React.createElement("a", null, "Backlog")), React.createElement("li", {
      "onClick": Actions.selectSprints,
      "role": "presentation",
      "className": (!this.props.backlog ? 'active' : void 0)
    }, React.createElement("a", null, "Sprints"))));
  }
});

TabContent = React.createClass({displayName: "TabContent",
  render: function() {
    return React.createElement("div", null, (!this.props.backlog ? React.createElement(SprintList, null) : void 0));
  }
});

Project = React.createClass({displayName: "Project",
  mixins: [Reflux.connect(Store, 'data')],
  render: function() {
    var backlog;
    backlog = this.state.data.backlog;
    return React.createElement("div", null, React.createElement(TabNav, {
      "backlog": backlog
    }), React.createElement(TabContent, {
      "backlog": backlog
    }));
  }
});

module.exports = Project;


},{"../actions/project":3,"../stores/project":16,"./sprint-list":11}],11:[function(require,module,exports){
var Actions, Sprint, SprintList, Store;

Store = require('../stores/sprint-list');

Actions = require('../actions/sprint-list');

Sprint = React.createClass({displayName: "Sprint",
  render: function() {
    return React.createElement("div", {
      "className": "panel panel-primary"
    }, React.createElement("div", {
      "className": "panel-heading"
    }, this.props.id), React.createElement("div", {
      "className": "panel-body"
    }, this.props.start));
  }
});

SprintList = React.createClass({displayName: "SprintList",
  mixins: [Reflux.connect(Store, 'list')],
  render: function() {
    var items;
    console.log(this.state.list);
    items = this.state.list.map(function(i) {
      return React.createElement(Sprint, {
        "key": i.id,
        "id": i.id,
        "start": i.start
      });
    });
    return React.createElement("div", {
      "className": "list-group"
    }, React.createElement("button", {
      "type": "button",
      "className": "btn btn-default"
    }, React.createElement("a", {
      "onClick": Actions.add,
      "data-toggle": "modal",
      "data-target": "#addSprint",
      "className": "material-icons"
    }, "add")), items);
  }
});

module.exports = SprintList;


},{"../actions/sprint-list":4,"../stores/sprint-list":17}],12:[function(require,module,exports){
var Actions, Modal, SprintForm, SprintModal, Store, TextInput;

Store = require('../stores/sprint-modal');

Actions = require('../actions/sprint-modal');

Modal = require('./modal');

TextInput = React.createClass({displayName: "TextInput",
  render: function() {
    return React.createElement("div", {
      "className": "form-group"
    }, React.createElement("label", {
      "htmlFor": this.props.id
    }, this.props.placeholder), React.createElement("input", {
      "onChange": (function(e) {
        return this.props.onChange(e.target.value);
      }).bind(this),
      "value": this.props.text,
      "type": "text",
      "className": "form-control",
      "id": this.props.id,
      "placeholder": this.props.placeholder,
      "required": this.props.required
    }));
  }
});

SprintForm = React.createClass({displayName: "SprintForm",
  mixins: [Reflux.connect(Store, 'sprint')],
  render: function() {
    return React.createElement("form", {
      "onSubmit": (function(e) {
        return Actions.submit(e);
      })
    }, React.createElement(TextInput, {
      "onChange": Actions.handleName,
      "text": this.state.sprint.id,
      "id": "inputName",
      "placeholder": "Nom",
      "required": "required"
    }), React.createElement(TextInput, {
      "onChange": Actions.handleDate,
      "text": this.state.sprint.start,
      "id": "inputDate",
      "placeholder": "Date de début"
    }), React.createElement("div", {
      "className": "form-group"
    }, React.createElement("a", {
      "onClick": Actions.createKanban
    }, "Intégrer Kanban Trello")), React.createElement("button", {
      "type": "button",
      "className": "btn btn-default",
      "data-dismiss": "modal"
    }, "Annuler"), React.createElement("button", {
      "type": "submit",
      "className": "btn btn-primary",
      "onClick": this.props.handle
    }, "Appliquer"));
  }
});

SprintModal = React.createClass({displayName: "SprintModal",
  render: function() {
    return React.createElement(Modal, {
      "title": 'Ajouter Sprint',
      "id": 'addSprint'
    }, React.createElement(SprintForm, null));
  }
});

module.exports = SprintModal;


},{"../actions/sprint-modal":5,"../stores/sprint-modal":18,"./modal":7}],13:[function(require,module,exports){
var Main, ModalList, Project, ProjectList;

ProjectList = require('./components/project-list');

Project = require('./components/project');

ModalList = require('./components/modal-list');

Main = React.createClass({displayName: "Main",
  render: function() {
    return React.createElement("div", null, React.createElement(ProjectList, null), React.createElement(Project, null), React.createElement(ModalList, null));
  }
});

React.render(React.createElement(Main, null), document.getElementById('content'));


},{"./components/modal-list":6,"./components/project":10,"./components/project-list":8}],14:[function(require,module,exports){
var Actions, ProjectActions, ProjectList;

Actions = require('../actions/project-list');

ProjectActions = require('../actions/project');

ProjectList = Reflux.createStore({
  getInitialState: function() {
    return this.data;
  },
  changeCurrent: function(id) {
    this.data.current = id;
    this.trigger(this.data);
    return ProjectActions.setCurrentProject(this.data.projects[this.data.current]);
  },
  data: {
    projects: [],
    current: 0
  },
  listenables: [Actions],
  srcUrl: '/ws/api/v1/projects',
  init: function() {
    return this.fetchList();
  },
  "delete": function() {
    var id, request;
    id = this.data.projects[this.data.current]._id;
    request = superagent;
    return request["delete"](this.srcUrl + '/' + id).end((function(err, res) {
      if (res.ok) {
        delete this.data.projects[this.data.current];
        return this.changeCurrent(0);
      }
    }).bind(this));
  },
  fetchList: function() {
    var request;
    request = superagent;
    return request.get(this.srcUrl).accept('application/json').end((function(err, res) {
      if (res.ok) {
        this.data.projects = res.body;
        return this.changeCurrent(0);
      }
    }).bind(this));
  }
});

module.exports = ProjectList;


},{"../actions/project":3,"../actions/project-list":1}],15:[function(require,module,exports){
var Actions, ModalStore;

Actions = require('../actions/project-modal');

ModalStore = Reflux.createStore({
  listenables: [Actions],
  type: '',
  newProject: {
    name: '',
    description: '',
    git_repo: '',
    members: [],
    backlog: [],
    sprints: []
  },
  currentProject: {},
  showedProject: {},
  getInitialState: function() {
    return this.newProject;
  },
  setType: function(e, type) {
    if (type === 'put') {
      this.showedProject = this.currentProject;
    } else {
      this.showedProject = this.newProject;
    }
    this.type = type;
    return this.trigger(this.showedProject);
  },
  setCurrentProject: function(p) {
    if (p != null) {
      return this.currentProject = p;
    }
  },
  submit: function(e) {
    switch (this.type) {
      case 'post':
        return this.send(e);
      case 'put':
        return this.update(e);
      default:
        return console.log('wrong request type');
    }
  },
  update: function(e) {
    var request;
    request = superagent;
    request.put('/ws/api/v1/project/' + this.currentProject._id).type('json').send(this.currentProject).end((function(err, res) {
      if (res.ok) {
        return console.log('data updated');
      }
    }).bind(this));
    return $("#addModal").modal('hide');
  },
  send: function(e) {
    var request;
    request = superagent;
    request.post('/ws/api/v1/project').type('json').send(this.newProject).end((function(err, res) {
      if (res.ok) {
        return console.log('data sent');
      }
    }).bind(this));
    return $("#addModal").modal('hide');
  },
  handleName: function(value) {
    this.showedProject.name = value;
    return this.trigger(this.showedProject);
  },
  handleDescription: function(value) {
    this.showedProject.description = value;
    return this.trigger(this.showedProject);
  },
  handleRepo: function(value) {
    this.showedProject.git_repo = value;
    return this.trigger(this.showedProject);
  },
  handleMember: function(index, value) {
    this.showedProject.members[index] = value;
    return this.trigger(this.showedProject);
  },
  addMember: function() {
    this.showedProject.members.push('');
    return this.trigger(this.showedProject);
  },
  deleteMember: function(index) {
    delete this.showedProject.members[index];
    return this.trigger(this.showedProject);
  }
});

module.exports = ModalStore;


},{"../actions/project-modal":2}],16:[function(require,module,exports){
var Actions, ModalActions, ProjectStore, SprintListActions;

Actions = require('../actions/project');

ModalActions = require('../actions/project-modal');

SprintListActions = require('../actions/sprint-list');

ProjectStore = Reflux.createStore({
  listenables: [Actions],
  data: {
    project: {},
    backlog: true
  },
  getInitialState: function() {
    return this.data;
  },
  init: function() {
    return this.trigger(this.data);
  },
  selectBacklog: function() {
    this.data.backlog = true;
    return this.trigger(this.data);
  },
  selectSprints: function() {
    this.data.backlog = false;
    return this.trigger(this.data);
  },
  setCurrentProject: function(p) {
    this.data.project = p;
    this.trigger(this.data);
    SprintListActions.setList(this.data.project.sprints);
    return ModalActions.setCurrentProject(this.data.project);
  }
});

module.exports = ProjectStore;


},{"../actions/project":3,"../actions/project-modal":2,"../actions/sprint-list":4}],17:[function(require,module,exports){
var Actions, SprintListStore;

Actions = require('../actions/sprint-list');

SprintListStore = Reflux.createStore({
  listenables: [Actions],
  list: [],
  init: function() {
    return this.fetch();
  },
  getInitialState: function() {
    return this.list;
  },
  setList: function(l) {
    this.list = l;
    return this.fetch();
  },
  fetch: function() {
    return this.trigger(this.list);
  }
});

module.exports = SprintListStore;


},{"../actions/sprint-list":4}],18:[function(require,module,exports){
var Actions, SprintStore;

Actions = require('../actions/sprint-modal');

SprintStore = Reflux.createStore({
  listenables: [Actions],
  newSprint: {
    id: 0,
    start: "",
    tasks: []
  },
  type: '',
  currentSprint: {},
  showedSprint: {},
  getInitialState: function() {
    return this.newSprint;
  },
  setType: function(e, type) {
    if (type === 'put') {
      this.showedSprint = this.currentSprint;
    } else {
      this.showedSprint = this.newSprint;
      this.type = type;
    }
    return this.trigger(this.showedSprint);
  },
  setCurrentSprint: function(s) {
    return this.currentSprint = s;
  },
  submit: function(e) {
    switch (this.type) {
      case 'post':
        return this.send(e);
      case 'put':
        return this.update(e);
      default:
        return console.log('wrong request type');
    }
  },
  update: function(e) {
    var request;
    request = superagent;
    request.put('/ws/api/v1/sprint/' + this.currentSprint._id).type('json').send(this.currentSprint).end((function(err, res) {
      if (res.ok) {
        return console.log('data updated');
      }
    }).bind(this));
    return $("#addModal").modal('hide');
  },
  send: function(e) {
    var request;
    request = superagent;
    request.post('/ws/api/v1/project').type('json').send(this.newSprint).end((function(err, res) {
      if (res.ok) {
        return console.log('data sent');
      }
    }).bind(this));
    return $("#addModal").modal('hide');
  },
  handleDate: function(value) {
    this.showedSprint.date = value;
    return this.trigger(this.showedSprint);
  },
  handleName: function(value) {
    this.showedSprint.id = value;
    return this.trigger(this.showedSprint);
  },
  onKanban: function() {
    console.log(this.showedSprint.id + this.showedSprint.start);
    return Trello.post("/bords", {
      name: this.showedSprint.id + this.showedSprint.start
    });
  },
  onKanbanFail: function() {
    return alert('connection to Trello failed');
  },
  createKanban: function() {
    console.log('success');
    return Trello.authorize({
      type: "popup",
      name: "Scrumy Application",
      scope: {
        read: true,
        write: true
      },
      expiration: "never",
      success: this.onKanban,
      error: this.onKanbanFail
    });
  }
});

module.exports = SprintStore;


},{"../actions/sprint-modal":5}]},{},[13])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvaG9tZS9udXJleW5pc293L0NQL3NjcnVteS9hcHAvanMvYWN0aW9ucy9wcm9qZWN0LWxpc3QuY2pzeCIsIi9ob21lL251cmV5bmlzb3cvQ1Avc2NydW15L2FwcC9qcy9hY3Rpb25zL3Byb2plY3QtbW9kYWwuY2pzeCIsIi9ob21lL251cmV5bmlzb3cvQ1Avc2NydW15L2FwcC9qcy9hY3Rpb25zL3Byb2plY3QuY2pzeCIsIi9ob21lL251cmV5bmlzb3cvQ1Avc2NydW15L2FwcC9qcy9hY3Rpb25zL3NwcmludC1saXN0LmNqc3giLCIvaG9tZS9udXJleW5pc293L0NQL3NjcnVteS9hcHAvanMvYWN0aW9ucy9zcHJpbnQtbW9kYWwuY2pzeCIsIi9ob21lL251cmV5bmlzb3cvQ1Avc2NydW15L2FwcC9qcy9jb21wb25lbnRzL21vZGFsLWxpc3QuY2pzeCIsIi9ob21lL251cmV5bmlzb3cvQ1Avc2NydW15L2FwcC9qcy9jb21wb25lbnRzL21vZGFsLmNqc3giLCIvaG9tZS9udXJleW5pc293L0NQL3NjcnVteS9hcHAvanMvY29tcG9uZW50cy9wcm9qZWN0LWxpc3QuY2pzeCIsIi9ob21lL251cmV5bmlzb3cvQ1Avc2NydW15L2FwcC9qcy9jb21wb25lbnRzL3Byb2plY3QtbW9kYWwuY2pzeCIsIi9ob21lL251cmV5bmlzb3cvQ1Avc2NydW15L2FwcC9qcy9jb21wb25lbnRzL3Byb2plY3QuY2pzeCIsIi9ob21lL251cmV5bmlzb3cvQ1Avc2NydW15L2FwcC9qcy9jb21wb25lbnRzL3NwcmludC1saXN0LmNqc3giLCIvaG9tZS9udXJleW5pc293L0NQL3NjcnVteS9hcHAvanMvY29tcG9uZW50cy9zcHJpbnQtbW9kYWwuY2pzeCIsIi9ob21lL251cmV5bmlzb3cvQ1Avc2NydW15L2FwcC9qcy9tYWluLmNqc3giLCIvaG9tZS9udXJleW5pc293L0NQL3NjcnVteS9hcHAvanMvc3RvcmVzL3Byb2plY3QtbGlzdC5janN4IiwiL2hvbWUvbnVyZXluaXNvdy9DUC9zY3J1bXkvYXBwL2pzL3N0b3Jlcy9wcm9qZWN0LW1vZGFsLmNqc3giLCIvaG9tZS9udXJleW5pc293L0NQL3NjcnVteS9hcHAvanMvc3RvcmVzL3Byb2plY3QuY2pzeCIsIi9ob21lL251cmV5bmlzb3cvQ1Avc2NydW15L2FwcC9qcy9zdG9yZXMvc3ByaW50LWxpc3QuY2pzeCIsIi9ob21lL251cmV5bmlzb3cvQ1Avc2NydW15L2FwcC9qcy9zdG9yZXMvc3ByaW50LW1vZGFsLmNqc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQSxJQUFBOztBQUFBLGtCQUFBLEdBQXFCLE1BQU0sQ0FBQyxhQUFQLENBQXFCLENBQ3RDLFdBRHNDLEVBRXRDLFFBRnNDLEVBR3RDLGVBSHNDLENBQXJCOztBQU1yQixNQUFNLENBQUMsT0FBUCxHQUFpQjs7OztBQ05qQixJQUFBOztBQUFBLFlBQUEsR0FBZSxNQUFNLENBQUMsYUFBUCxDQUFxQixDQUNoQyxRQURnQyxFQUVoQyxtQkFGZ0MsRUFHaEMsU0FIZ0MsRUFJaEMsWUFKZ0MsRUFLaEMsbUJBTGdDLEVBTWhDLFlBTmdDLEVBT2hDLGNBUGdDLEVBUWhDLFdBUmdDLEVBU2hDLGNBVGdDLENBQXJCOztBQVlmLE1BQU0sQ0FBQyxPQUFQLEdBQWlCOzs7O0FDWmpCLElBQUE7O0FBQUEsY0FBQSxHQUFpQixNQUFNLENBQUMsYUFBUCxDQUFxQixDQUNsQyxlQURrQyxFQUVsQyxtQkFGa0MsRUFHbEMsZUFIa0MsQ0FBckI7O0FBTWpCLE1BQU0sQ0FBQyxPQUFQLEdBQWlCOzs7O0FDTmpCLElBQUE7O0FBQUEsaUJBQUEsR0FBb0IsTUFBTSxDQUFDLGFBQVAsQ0FBcUIsQ0FDckMsWUFEcUMsRUFFckMsbUJBRnFDLEVBR3JDLEtBSHFDLEVBSXJDLFNBSnFDLENBQXJCOztBQU9wQixNQUFNLENBQUMsT0FBUCxHQUFpQjs7OztBQ1BqQixJQUFBOztBQUFBLFlBQUEsR0FBZSxNQUFNLENBQUMsYUFB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LENBQUEsWUFBWSxDQUFDLEtBQXRDO0tBQXRCO0VBRk0sQ0FuRFY7RUFzREEsWUFBQSxFQUFjLFNBQUE7V0FDVixLQUFBLENBQU0sNkJBQU47RUFEVSxDQXREZDtFQXdEQSxZQUFBLEVBQWMsU0FBQTtJQUNWLE9BQU8sQ0FBQyxHQUFSLENBQVksU0FBWjtXQUNBLE1BQU0sQ0FBQyxTQUFQLENBQ007TUFBQSxJQUFBLEVBQU0sT0FBTjtNQUNBLElBQUEsRUFBTSxvQkFETjtNQUVBLEtBQUEsRUFBTztRQUNMLElBQUEsRUFBTSxJQUREO1FBRUwsS0FBQSxFQUFPLElBRkY7T0FGUDtNQUtBLFVBQUEsRUFBWSxPQUxaO01BTUEsT0FBQSxFQUFTLElBQUMsQ0FBQSxRQU5WO01BT0EsS0FBQSxFQUFPLElBQUMsQ0FBQSxZQVBSO0tBRE47RUFGVSxDQXhEZDtDQURVOztBQXNFZCxNQUFNLENBQUMsT0FBUCxHQUFpQiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJQcm9qZWN0TGlzdEFjdGlvbnMgPSBSZWZsdXguY3JlYXRlQWN0aW9ucyBbXG4gICAgJ2ZldGNoTGlzdCcsXG4gICAgJ2RlbGV0ZScsXG4gICAgJ2NoYW5nZUN1cnJlbnQnXG5dXG5cbm1vZHVsZS5leHBvcnRzID0gUHJvamVjdExpc3RBY3Rpb25zXG4iLCJNb2RhbEFjdGlvbnMgPSBSZWZsdXguY3JlYXRlQWN0aW9ucyBbXG4gICAgJ3N1Ym1pdCcsXG4gICAgJ3NldEN1cnJlbnRQcm9qZWN0JyxcbiAgICAnc2V0VHlwZScsXG4gICAgJ2hhbmRsZU5hbWUnLFxuICAgICdoYW5kbGVEZXNjcmlwdGlvbicsXG4gICAgJ2hhbmRsZVJlcG8nLFxuICAgICdoYW5kbGVNZW1iZXInLFxuICAgICdhZGRNZW1iZXInLFxuICAgICdkZWxldGVNZW1iZXInXG5dXG5cbm1vZHVsZS5leHBvcnRzID0gTW9kYWxBY3Rpb25zXG4iLCJQcm9qZWN0QWN0aW9ucyA9IFJlZmx1eC5jcmVhdGVBY3Rpb25zIFtcbiAgICAnc2VsZWN0QmFja2xvZycsXG4gICAgJ3NldEN1cnJlbnRQcm9qZWN0JyxcbiAgICAnc2VsZWN0U3ByaW50cydcbl1cblxubW9kdWxlLmV4cG9ydHMgPSBQcm9qZWN0QWN0aW9uc1xuIiwiU3ByaW50TGlzdEFjdGlvbnMgPSBSZWZsdXguY3JlYXRlQWN0aW9ucyBbXG4gICAgJ2hhbmRsZU5hbWUnLFxuICAgICdoYW5kbGVEZXNjcmlwdGlvbicsXG4gICAgJ2FkZCcsXG4gICAgJ3NldExpc3QnXG5dXG5cbm1vZHVsZS5leHBvcnRzID0gU3ByaW50TGlzdEFjdGlvbnNcbiIsIk1vZGFsQWN0aW9ucyA9IFJlZmx1eC5jcmVhdGVBY3Rpb25zIFtcbiAgICAnc3VibWl0JyxcbiAgICAnc2V0Q3VycmVudFNwcmludCcsXG4gICAgJ3NldFR5cGUnLFxuICAgICdoYW5kbGVOYW1lJyxcbiAgICAnaGFuZGxlRGF0ZScsXG4gICAgJ2NyZWF0ZUthbmJhbidcbl1cblxubW9kdWxlLmV4cG9ydHMgPSBNb2RhbEFjdGlvbnNcbiIsIlByb2plY3RNb2RhbCA9IHJlcXVpcmUgJy4uL2NvbXBvbmVudHMvcHJvamVjdC1tb2RhbCdcblNwcmludE1vZGFsID0gcmVxdWlyZSAnLi4vY29tcG9uZW50cy9zcHJpbnQtbW9kYWwnXG5cbk1vZGFsTGlzdCA9IFJlYWN0LmNyZWF0ZUNsYXNzXG4gICAgcmVuZGVyIDogLT5cbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCBudWxsLFxuICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoUHJvamVjdE1vZGFsLCBudWxsKSxcbiAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFNwcmludE1vZGFsLCBudWxsKVxuICAgICAgICApXG5cbm1vZHVsZS5leHBvcnRzID0gTW9kYWxMaXN0IiwiTW9kYWwgPSBSZWFjdC5jcmVhdGVDbGFzc1xuICAgIHJlbmRlciA6IC0+XG4gICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtcImNsYXNzTmFtZVwiOiBcIm1vZGFsIGZhZGVcIiwgXCJpZFwiOiAoQHByb3BzLmlkKSwgXCJyb2xlXCI6IFwiZGlhbG9nXCIsIFwiYXJpYS1sYWJlbGxlZGJ5XCI6IFwibW9kYWxMYWJlbFwifSxcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7XCJjbGFzc05hbWVcIjogXCJtb2RhbC1kaWFsb2dcIiwgXCJyb2xlXCI6IFwiZG9jdW1lbnRcIn0sXG4gICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7XCJjbGFzc05hbWVcIjogXCJtb2RhbC1jb250ZW50XCJ9LFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7XCJjbGFzc05hbWVcIjogXCJtb2RhbC1oZWFkZXJcIn0sXG4gICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIiwge1widHlwZVwiOiBcImJ1dHRvblwiLCBcImNsYXNzTmFtZVwiOiBcImNsb3NlXCIsIFwiZGF0YS1kaXNtaXNzXCI6IFwibW9kYWxcIiwgXCJhcmlhLWxhYmVsXCI6IFwiQ2xvc2VcIn0sXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInNwYW5cIiwge1wiYXJpYS1oaWRkZW5cIjogXCJ0cnVlXCJ9LCBcIsOXXCIpXG4gICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJoNFwiLCB7XCJjbGFzc05hbWVcIjogXCJtb2RhbC10aXRsZVwiLCBcImlkXCI6ICdtb2RhbExhYmVsJ30sIChAcHJvcHMudGl0bGUpKVxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge1wiY2xhc3NOYW1lXCI6IFwibW9kYWwtYm9keVwifSxcbiAgICAgICAgICAgICAgKEBwcm9wcy5jaGlsZHJlbilcbiAgICAgICAgICAgIClcbiAgICAgICAgICApXG4gICAgICAgIClcbiAgICAgIClcblxubW9kdWxlLmV4cG9ydHMgPSBNb2RhbCIsIkFjdGlvbnMgPSByZXF1aXJlICcuLi9hY3Rpb25zL3Byb2plY3QtbGlzdCdcblN0b3JlID0gcmVxdWlyZSAnLi4vc3RvcmVzL3Byb2plY3QtbGlzdCdcblxuTW9kYWxBY3Rpb25zID0gcmVxdWlyZSAnLi4vYWN0aW9ucy9wcm9qZWN0LW1vZGFsJ1xuXG5BZGRQcm9qZWN0ID0gUmVhY3QuY3JlYXRlQ2xhc3NcbiAgICAgICAgcmVuZGVyIDogLT5cbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiYVwiLCB7IFxcXG4gICAgICAgICAgICAgICAgIFwib25DbGlja1wiOiAoTW9kYWxBY3Rpb25zLnNldFR5cGUuYmluZCBudWxsLCBldmVudCwgJ3Bvc3QnKSwgIFxcXG4gICAgICAgICAgICAgICAgIFwiZGF0YS10b2dnbGVcIjogXCJtb2RhbFwiLCAgXFxcbiAgICAgICAgICAgICAgICAgXCJkYXRhLXRhcmdldFwiOiBcIiNhZGRQcm9qZWN0XCIsICBcXFxuICAgICAgICAgICAgICAgICBcImNsYXNzTmFtZVwiOiBcIm1hdGVyaWFsLWljb25zXCJ9LCBcIlwiXCJcbiAgICAgICAgICAgICAgICAgIGFkZFxuXCJcIlwiKVxuXG5EZWxldGVDb25maXJtID0gUmVhY3QuY3JlYXRlQ2xhc3NcbiAgICAgICAgcmVuZGVyIDogLT5cbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtcImNsYXNzTmFtZVwiOiBcIm1vZGFsIGZhZGVcIiwgXCJpZFwiOiBcImNvbmZpcm1Nb2RhbFwifSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge1wiY2xhc3NOYW1lXCI6IFwibW9kYWwtZGlhbG9nXCJ9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtcImNsYXNzTmFtZVwiOiBcIm1vZGFsLWNvbnRlbnRcIn0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7XCJjbGFzc05hbWVcIjogXCJtb2RhbC1oZWFkZXJcIn0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIsIHtcInR5cGVcIjogXCJidXR0b25cIiwgIFxcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjbGFzc05hbWVcIjogXCJjbG9zZVwiLCAgXFxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImRhdGEtZGlzbWlzc1wiOiBcIm1vZGFsXCIsICBcXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYXJpYS1sYWJlbFwiOiBcIkNsb3NlXCJ9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIHtcImFyaWEtaGlkZGVuXCI6IFwidHJ1ZVwifSwgXCJcIlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIMOXXG5cIlwiXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImg0XCIsIHtcImNsYXNzTmFtZVwiOiBcIm1vZGFsLXRpdGxlXCJ9LCBcIlwiXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBFdGVzLXZvdXMgc3VyIGRlIHZvdWxvaXIgc3VwcHJpbWVyIGxlIHByb2pldD9cblwiXCJcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge1wiY2xhc3NOYW1lXCI6IFwibW9kYWwtYm9keVwifSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIiwgeyBcXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImJ1dHRvblwiLCAgXFxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNsYXNzTmFtZVwiOiBcImJ0biBidG4tZGVmYXVsdFwiLCAgXFxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImRhdGEtZGlzbWlzc1wiOiBcIm1vZGFsXCJ9LCBcIlwiXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBOb25cblwiXCJcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIsIHsgXFxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJzdWJtaXRcIiwgIFxcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjbGFzc05hbWVcIjogXCJidG4gYnRuLXByaW1hcnlcIiwgIFxcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJvbkNsaWNrXCI6IChAcHJvcHMuaGFuZGxlKX0sIFwiXCJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE91aVxuXCJcIlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIClcblxuRGVsZXRlUHJvamVjdCA9IFJlYWN0LmNyZWF0ZUNsYXNzXG4gICAgICAgIHJlbmRlciA6IC0+XG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInNwYW5cIiwgbnVsbCxcbiAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIiwge1widHlwZVwiOiBcImJ1dHRvblwiLCBcImNsYXNzTmFtZVwiOiBcImJ0biBidG4tZGVmYXVsdFwifSxcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImFcIiwgeyBcXFxuICAgICAgICAgICAgICAgICAgICAgXCJkYXRhLXRvZ2dsZVwiOiBcIm1vZGFsXCIsICBcXFxuICAgICAgICAgICAgICAgICAgICAgXCJkYXRhLXRhcmdldFwiOiBcIiNjb25maXJtTW9kYWxcIiwgIFxcXG4gICAgICAgICAgICAgICAgICAgICBcImNsYXNzTmFtZVwiOiBcIm1hdGVyaWFsLWljb25zXCJ9LCBcIlwiXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZVxuXCJcIlwiKVxuICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoRGVsZXRlQ29uZmlybSwge1wiaGFuZGxlXCI6IChBY3Rpb25zLmRlbGV0ZSl9KVxuICAgICAgICAgICAgICAgIClcblxuRWRpdFByb2plY3QgPSBSZWFjdC5jcmVhdGVDbGFzc1xuICAgICAgICByZW5kZXIgOiAtPlxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJhXCIsIHsgXFxcbiAgICAgICAgICAgICAgICAgXCJvbkNsaWNrXCI6IChNb2RhbEFjdGlvbnMuc2V0VHlwZS5iaW5kIG51bGwsIGV2ZW50LCdwdXQnKSwgIFxcXG4gICAgICAgICAgICAgICAgIFwiZGF0YS10b2dnbGVcIjogXCJtb2RhbFwiLCAgXFxcbiAgICAgICAgICAgICAgICAgXCJkYXRhLXRhcmdldFwiOiBcIiNhZGRQcm9qZWN0XCIsICBcXFxuICAgICAgICAgICAgICAgICBcImNsYXNzTmFtZVwiOiBcIm1hdGVyaWFsLWljb25zXCJ9LCBcIlwiXCJcbiAgICAgICAgICAgICAgICAgICAgZWRpdFxuXCJcIlwiKVxuXG5Qcm9qZWN0ID0gUmVhY3QuY3JlYXRlQ2xhc3NcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlbmRlcjogLT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImxpXCIsIHsgXFxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwib25DbGlja1wiOiAoQHByb3BzLm9uQ2xpY2suYmluZCBudWxsLEBwcm9wcy5pZCksICBcXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjbGFzc05hbWVcIjogXCJcIiwgIFxcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImFyaWEtbGFiZWxsZWRieVwiOiBcImRyb3Bkb3duTWVudVwifSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJhXCIsIG51bGwsIChAcHJvcHMubmFtZSkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcblxuUHJvamVjdExpc3QgPSBSZWFjdC5jcmVhdGVDbGFzc1xuICAgICAgICAgICAgICAgICAgICAgICAgbWl4aW5zOiBbUmVmbHV4LmNvbm5lY3QoU3RvcmUsICdkYXRhJyldXG4gICAgICAgICAgICAgICAgICAgICAgICByZW5kZXI6IC0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnQgPSBAc3RhdGUuZGF0YS5jdXJyZW50XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2plY3RzID0gQHN0YXRlLmRhdGEucHJvamVjdHNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGlzdCA9IFtdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciBrLHByb2plY3Qgb2YgcHJvamVjdHNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaXN0LnB1c2ggUmVhY3QuY3JlYXRlRWxlbWVudChQcm9qZWN0LCB7IFxcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImlkXCI6IChrKSwgIFxcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImtleVwiOiAoayksICBcXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJuYW1lXCI6IChwcm9qZWN0Lm5hbWUpLCAgXFxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwib25DbGlja1wiOiAoQWN0aW9ucy5jaGFuZ2VDdXJyZW50KX0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge1wiY2xhc3NOYW1lXCI6IFwiYnRuLWdyb3VwXCIsIFwicm9sZVwiOiBcImdyb3VwXCIsIFwiYXJpYS1sYWJlbFwiOiBcIi4uLlwifSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge1wiY2xhc3NOYW1lXCI6IFwiZHJvcGRvd25cIn0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiLCB7IFxcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImJ1dHRvblwiLCAgXFxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjbGFzc05hbWVcIjogXCJidG4gYnRuLWRlZmF1bHQgZHJvcGRvd24tdG9nZ2xlXCIsICBcXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImlkXCI6IFwiZHJvcGRvd25NZW51XCIsICBcXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImRhdGEtdG9nZ2xlXCI6IFwiZHJvcGRvd25cIiwgIFxcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYXJpYS1oYXNwb3B1cFwiOiBcInRydWVcIiwgIFxcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYXJpYS1leHBhbmRlZFwiOiBcInRydWVcIn0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJwXCIsIG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAocHJvamVjdHNbY3VycmVudF0ubmFtZSBpZiBwcm9qZWN0cy5sZW5ndGggaXNudCAwKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIHtcImNsYXNzTmFtZVwiOiBcImNhcmV0XCJ9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIsIHtcInR5cGVcIjogXCJidXR0b25cIiwgXCJjbGFzc05hbWVcIjogXCJidG4gYnRuLWRlZmF1bHRcIn0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoRWRpdFByb2plY3QsIHtcInByb2plY3RcIjogKHByb2plY3RzW2N1cnJlbnRdKX0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KERlbGV0ZVByb2plY3QsIG51bGwpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIiwge1widHlwZVwiOiBcImJ1dHRvblwiLCBcImNsYXNzTmFtZVwiOiBcImJ0biBidG4tZGVmYXVsdFwifSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChBZGRQcm9qZWN0LCBudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInVsXCIsIHtcImNsYXNzTmFtZVwiOiBcImRyb3Bkb3duLW1lbnVcIn0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAobGlzdClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcblxuXG5tb2R1bGUuZXhwb3J0cyA9IFByb2plY3RMaXN0XG4iLCJBY3Rpb25zID0gcmVxdWlyZSAnLi4vYWN0aW9ucy9wcm9qZWN0LW1vZGFsJ1xuU3RvcmUgPSByZXF1aXJlICcuLi9zdG9yZXMvcHJvamVjdC1tb2RhbCdcblxuTW9kYWwgPSByZXF1aXJlICcuL21vZGFsJ1xuXG5UZXh0SW5wdXQgPSBSZWFjdC5jcmVhdGVDbGFzc1xuICAgIHJlbmRlciA6IC0+XG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge1wiY2xhc3NOYW1lXCI6IFwiZm9ybS1ncm91cFwifSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJsYWJlbFwiLCB7XCJodG1sRm9yXCI6IChAcHJvcHMuaWQpfSxcbiAgICAgICAgICAgICAgICAoQHByb3BzLnBsYWNlaG9sZGVyKVxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiLCB7IFxcXG4gICAgICAgICAgICAgXCJvbkNoYW5nZVwiOiAoKChlKSAtPlxuICAgICAgICAgICAgICAgQHByb3BzLm9uQ2hhbmdlIGUudGFyZ2V0LnZhbHVlKS5iaW5kIEApLCAgXFxcbiAgICAgICAgICAgICBcInZhbHVlXCI6IChAcHJvcHMudGV4dCksICBcXFxuICAgICAgICAgICAgIFwidHlwZVwiOiBcInRleHRcIiwgIFxcXG4gICAgICAgICAgICAgXCJjbGFzc05hbWVcIjogXCJmb3JtLWNvbnRyb2xcIiwgIFxcXG4gICAgICAgICAgICAgXCJpZFwiOiAoQHByb3BzLmlkKSwgIFxcXG4gICAgICAgICAgICAgXCJwbGFjZWhvbGRlclwiOiAoQHByb3BzLnBsYWNlaG9sZGVyKSwgIFxcXG4gICAgICAgICAgICAgXCJyZXF1aXJlZFwiOiAoQHByb3BzLnJlcXVpcmVkKX0pXG4gICAgICAgIClcblxuTWVtYmVyID0gUmVhY3QuY3JlYXRlQ2xhc3NcbiAgICAgICAgcmVuZGVyIDogLT5cbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtcImNsYXNzTmFtZVwiOiBcInJvd1wifSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge1wiY2xhc3NOYW1lXCI6IFwiY29sLW1kLTExXCJ9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIiwgeyBcXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJvbkNoYW5nZVwiOiAoKChlKS0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFjdGlvbnMuaGFuZGxlTWVtYmVyKEBwcm9wcy5pZCwgZS50YXJnZXQudmFsdWUpKS5iaW5kIEApLCAgXFxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogKEBwcm9wcy5uYW1lKSwgIFxcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJ0ZXh0XCIsICBcXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjbGFzc05hbWVcIjogXCJmb3JtLWNvbnRyb2xcIiwgIFxcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInBsYWNlaG9sZGVyXCI6IFwiTm9tXCJ9KVxuICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge1wiY2xhc3NOYW1lXCI6IFwiY29sLW1kLTFcIn0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJpXCIsIHsgXFxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY2xhc3NOYW1lXCI6IFwibWF0ZXJpYWwtaWNvbnNcIiwgIFxcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIm9uQ2xpY2tcIjogKE1vZGFsQWN0aW9ucy5kZWxldGVNZW1iZXIuYmluZCBudWxsLCBAcHJvcHMuaWQpfSwgXCJcIlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWxldGVcblwiXCJcIilcbiAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICApXG5cbk1lbWJlcnNJbnB1dCA9IFJlYWN0LmNyZWF0ZUNsYXNzXG4gICAgICAgIHJlbmRlcjogLT5cbiAgICAgICAgICAgICAgICBtZW1iZXJWaWV3cyA9IFtdXG4gICAgICAgICAgICAgICAgZm9yIGssdiBvZiBAcHJvcHMubWVtYmVyc1xuICAgICAgICAgICAgICAgICAgICAgICAgbWVtYmVyVmlld3MucHVzaCBSZWFjdC5jcmVhdGVFbGVtZW50KE1lbWJlciwgeyBcXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJuYW1lXCI6ICh2KSwgIFxcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImlkXCI6IChrKSwgIFxcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImtleVwiOiAoayl9KVxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge1wiY2xhc3NOYW1lXCI6IFwiZm9ybS1ncm91cFwifSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImxhYmVsXCIsIG51bGwsIFwiQ29sbGFib3JhdGV1cnNcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChtZW1iZXJWaWV3cyksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJpXCIsIHtcImNsYXNzTmFtZVwiOiBcIm1hdGVyaWFsLWljb25zXCIsIFwib25DbGlja1wiOiAoQWN0aW9ucy5hZGRNZW1iZXIpfSwgXCJcIlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWRkXG5cIlwiXCIpXG4gICAgICAgICAgICAgICAgKVxuXG5cbkZvcm0gPSBSZWFjdC5jcmVhdGVDbGFzc1xuICAgIG1peGluczogW1JlZmx1eC5jb25uZWN0KFN0b3JlLCAncHJvamVjdCcpXVxuICAgIHJlbmRlciA6IC0+XG4gICAgICAgIHByb2plY3QgPSBAc3RhdGUucHJvamVjdFxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZm9ybVwiLCB7XCJvblN1Ym1pdFwiOiAoKGUpIC0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpICNwb3VyIMOpdml0ZXIgZGUgcmVjaGFyZ2VyIGxhIHBhZ2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBBY3Rpb25zLnN1Ym1pdCBlKX0sXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRleHRJbnB1dCwge1wib25DaGFuZ2VcIjogKEFjdGlvbnMuaGFuZGxlTmFtZSksIFwidGV4dFwiOiAocHJvamVjdC5uYW1lKSwgXCJpZFwiOiBcImlucHV0TmFtZVwiLCBcInBsYWNlaG9sZGVyXCI6IFwiTm9tXCIsIFwicmVxdWlyZWRcIjogXCJyZXF1aXJlZFwifSksXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRleHRJbnB1dCwge1wib25DaGFuZ2VcIjogKEFjdGlvbnMuaGFuZGxlRGVzY3JpcHRpb24pLCBcInRleHRcIjogKHByb2plY3QuZGVzY3JpcHRpb24pLCBcImlkXCI6IFwiaW5wdXREZXNjcmlwdGlvblwiLCBcInBsYWNlaG9sZGVyXCI6IFwiRGVzY3JpcHRpb25cIn0pLFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUZXh0SW5wdXQsIHtcIm9uQ2hhbmdlXCI6IChBY3Rpb25zLmhhbmRsZVJlcG8pLCBcInRleHRcIjogKHByb2plY3QuZ2l0X3JlcG8pLCBcImlkXCI6IFwiaW5wdXRSZXBvXCIsIFwicGxhY2Vob2xkZXJcIjogXCJEw6lwb3QgZ2l0XCJ9KSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoTWVtYmVyc0lucHV0LCB7XCJtZW1iZXJzXCI6IChwcm9qZWN0Lm1lbWJlcnMpfSksXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIsIHtcInR5cGVcIjogXCJidXR0b25cIiwgXCJjbGFzc05hbWVcIjogXCJidG4gYnRuLWRlZmF1bHRcIiwgXCJkYXRhLWRpc21pc3NcIjogXCJtb2RhbFwifSwgXCJGZXJtZXJcIiksXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIsIHtcInR5cGVcIjogXCJzdWJtaXRcIiwgXCJjbGFzc05hbWVcIjogXCJidG4gYnRuLXByaW1hcnlcIn0sIFwiQXBwbGlxdWVyXCIpXG4gICAgICAgIClcblxuUHJvamVjdE1vZGFsID0gUmVhY3QuY3JlYXRlQ2xhc3NcbiAgICByZW5kZXIgOiAtPlxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KE1vZGFsLCB7XCJ0aXRsZVwiOiAnQWpvdXRlciBwcm9qZXQnLCBcImlkXCI6ICdhZGRQcm9qZWN0J30sXG4gICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChGb3JtLCBudWxsKVxuICAgICAgICApXG5cbm1vZHVsZS5leHBvcnRzID0gUHJvamVjdE1vZGFsIiwiQWN0aW9ucyA9IHJlcXVpcmUgJy4uL2FjdGlvbnMvcHJvamVjdCdcblN0b3JlID0gcmVxdWlyZSAnLi4vc3RvcmVzL3Byb2plY3QnXG5cblNwcmludExpc3QgPSByZXF1aXJlICcuL3NwcmludC1saXN0J1xuXG5UYWJOYXYgPSBSZWFjdC5jcmVhdGVDbGFzc1xuICAgIHJlbmRlcjogLT5cbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcIm5hdlwiLCB7XCJyb2xlXCI6IFwibmF2aWdhdGlvblwifSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJ1bFwiLCB7XCJjbGFzc05hbWVcIjogXCJuYXYgbmF2LXRhYnNcIn0sXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImxpXCIsIHsgXFxcbiAgICAgICAgICAgICAgICAgXCJvbkNsaWNrXCI6IChBY3Rpb25zLnNlbGVjdEJhY2tsb2cpLCAgXFxcbiAgICAgICAgICAgICAgICAgXCJyb2xlXCI6IFwicHJlc2VudGF0aW9uXCIsICBcXFxuICAgICAgICAgICAgICAgICBcImNsYXNzTmFtZVwiOiAoJ2FjdGl2ZScgaWYgQHByb3BzLmJhY2tsb2cpfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJhXCIsIG51bGwsIFwiQmFja2xvZ1wiKVxuICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImxpXCIsIHsgXFxcbiAgICAgICAgICAgICAgICAgXCJvbkNsaWNrXCI6IChBY3Rpb25zLnNlbGVjdFNwcmludHMpLCAgXFxcbiAgICAgICAgICAgICAgICAgXCJyb2xlXCI6IFwicHJlc2VudGF0aW9uXCIsICBcXFxuICAgICAgICAgICAgICAgICBcImNsYXNzTmFtZVwiOiAoJ2FjdGl2ZScgaWYgbm90IEBwcm9wcy5iYWNrbG9nKX0sXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiYVwiLCBudWxsLCBcIlNwcmludHNcIilcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICApXG4gICAgICAgIClcblxuVGFiQ29udGVudCA9IFJlYWN0LmNyZWF0ZUNsYXNzXG4gICAgcmVuZGVyOiAtPlxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIG51bGwsXG4gICAgICAgICAgICAoUmVhY3QuY3JlYXRlRWxlbWVudChTcHJpbnRMaXN0LCBudWxsKSBpZiBub3QgQHByb3BzLmJhY2tsb2cpXG4gICAgICAgIClcblxuUHJvamVjdCA9IFJlYWN0LmNyZWF0ZUNsYXNzXG4gICAgbWl4aW5zOiBbUmVmbHV4LmNvbm5lY3QoU3RvcmUsICdkYXRhJyldXG4gICAgcmVuZGVyOiAtPlxuICAgICAgICBiYWNrbG9nID0gQHN0YXRlLmRhdGEuYmFja2xvZ1xuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIG51bGwsXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRhYk5hdiwge1wiYmFja2xvZ1wiOiAoYmFja2xvZyl9KSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGFiQ29udGVudCwge1wiYmFja2xvZ1wiOiAoYmFja2xvZyl9KVxuICAgICAgICApXG5cbm1vZHVsZS5leHBvcnRzID0gUHJvamVjdFxuIiwiU3RvcmUgPSByZXF1aXJlICcuLi9zdG9yZXMvc3ByaW50LWxpc3QnXG5BY3Rpb25zID0gcmVxdWlyZSAnLi4vYWN0aW9ucy9zcHJpbnQtbGlzdCdcblxuU3ByaW50ID0gUmVhY3QuY3JlYXRlQ2xhc3NcbiAgICByZW5kZXI6IC0+XG4gICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtcImNsYXNzTmFtZVwiOiBcInBhbmVsIHBhbmVsLXByaW1hcnlcIn0sXG4gICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7XCJjbGFzc05hbWVcIjogXCJwYW5lbC1oZWFkaW5nXCJ9LFxuICAgICAgICAgICAgICAoQHByb3BzLmlkKVxuICAgICAgICAgICksXG4gICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7XCJjbGFzc05hbWVcIjogXCJwYW5lbC1ib2R5XCJ9LFxuICAgICAgICAgICAgICAoQHByb3BzLnN0YXJ0KVxuICAgICAgICAgIClcbiAgICAgIClcblxuU3ByaW50TGlzdCA9IFJlYWN0LmNyZWF0ZUNsYXNzXG4gICAgbWl4aW5zOiBbUmVmbHV4LmNvbm5lY3QoU3RvcmUsICdsaXN0JyldXG4gICAgcmVuZGVyOiAtPlxuICAgICAgICBjb25zb2xlLmxvZyBAc3RhdGUubGlzdFxuICAgICAgICBpdGVtcyA9IEBzdGF0ZS5saXN0Lm1hcCAoaSkgLT4gUmVhY3QuY3JlYXRlRWxlbWVudChTcHJpbnQsIHtcImtleVwiOiAoaS5pZCksIFwiaWRcIjogKGkuaWQpLCBcInN0YXJ0XCI6IChpLnN0YXJ0KX0pXG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge1wiY2xhc3NOYW1lXCI6IFwibGlzdC1ncm91cFwifSxcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiLCB7XCJ0eXBlXCI6IFwiYnV0dG9uXCIsIFwiY2xhc3NOYW1lXCI6IFwiYnRuIGJ0bi1kZWZhdWx0XCJ9LFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImFcIiwgeyBcXFxuICAgICAgICAgICAgIFwib25DbGlja1wiOiAoQWN0aW9ucy5hZGQpLCAgXFxcbiAgICAgICAgICAgICBcImRhdGEtdG9nZ2xlXCI6IFwibW9kYWxcIiwgIFxcXG4gICAgICAgICAgICAgXCJkYXRhLXRhcmdldFwiOiBcIiNhZGRTcHJpbnRcIiwgIFxcXG4gICAgICAgICAgICAgXCJjbGFzc05hbWVcIjogXCJtYXRlcmlhbC1pY29uc1wifSwgXCJcIlwiXG4gICAgICAgICAgICAgICAgYWRkXG5cIlwiXCIpXG4gICAgICAgICksXG5cbiAgICAgICAgICAgIChpdGVtcylcbiAgICAgICAgKVxuXG5tb2R1bGUuZXhwb3J0cyA9IFNwcmludExpc3RcbiIsIlN0b3JlID0gcmVxdWlyZSAnLi4vc3RvcmVzL3NwcmludC1tb2RhbCdcbkFjdGlvbnMgPSByZXF1aXJlICcuLi9hY3Rpb25zL3NwcmludC1tb2RhbCdcblxuTW9kYWwgPSByZXF1aXJlICcuL21vZGFsJ1xuXG5UZXh0SW5wdXQgPSBSZWFjdC5jcmVhdGVDbGFzc1xuICAgIHJlbmRlciA6IC0+XG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge1wiY2xhc3NOYW1lXCI6IFwiZm9ybS1ncm91cFwifSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJsYWJlbFwiLCB7XCJodG1sRm9yXCI6IChAcHJvcHMuaWQpfSxcbiAgICAgICAgICAgICAgICAoQHByb3BzLnBsYWNlaG9sZGVyKVxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiLCB7IFxcXG4gICAgICAgICAgICAgXCJvbkNoYW5nZVwiOiAoKChlKSAtPlxuICAgICAgICAgICAgICAgQHByb3BzLm9uQ2hhbmdlIGUudGFyZ2V0LnZhbHVlKS5iaW5kIEApLCAgXFxcbiAgICAgICAgICAgICBcInZhbHVlXCI6IChAcHJvcHMudGV4dCksICBcXFxuICAgICAgICAgICAgIFwidHlwZVwiOiBcInRleHRcIiwgIFxcXG4gICAgICAgICAgICAgXCJjbGFzc05hbWVcIjogXCJmb3JtLWNvbnRyb2xcIiwgIFxcXG4gICAgICAgICAgICAgXCJpZFwiOiAoQHByb3BzLmlkKSwgIFxcXG4gICAgICAgICAgICAgXCJwbGFjZWhvbGRlclwiOiAoQHByb3BzLnBsYWNlaG9sZGVyKSwgIFxcXG4gICAgICAgICAgICAgXCJyZXF1aXJlZFwiOiAoQHByb3BzLnJlcXVpcmVkKX0pXG4gICAgICAgIClcblxuU3ByaW50Rm9ybSA9IFJlYWN0LmNyZWF0ZUNsYXNzXG4gICAgbWl4aW5zOiBbUmVmbHV4LmNvbm5lY3QoU3RvcmUsICdzcHJpbnQnKV1cbiAgICByZW5kZXIgOiAtPlxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZm9ybVwiLCB7XCJvblN1Ym1pdFwiOiAoKGUpIC0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgI2UucHJldmVudERlZmF1bHQoKSAjcG91ciDDqXZpdGVyIGRlIHJlY2hhcmdlciBsYSBwYWdlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQWN0aW9ucy5zdWJtaXQgZSl9LFxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUZXh0SW5wdXQsIHtcIm9uQ2hhbmdlXCI6IChBY3Rpb25zLmhhbmRsZU5hbWUpLCBcInRleHRcIjogKEBzdGF0ZS5zcHJpbnQuaWQpLCBcImlkXCI6IFwiaW5wdXROYW1lXCIsIFwicGxhY2Vob2xkZXJcIjogXCJOb21cIiwgXCJyZXF1aXJlZFwiOiBcInJlcXVpcmVkXCJ9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGV4dElucHV0LCB7XCJvbkNoYW5nZVwiOiAoQWN0aW9ucy5oYW5kbGVEYXRlKSwgXCJ0ZXh0XCI6IChAc3RhdGUuc3ByaW50LnN0YXJ0KSwgXCJpZFwiOiBcImlucHV0RGF0ZVwiLCBcInBsYWNlaG9sZGVyXCI6IFwiRGF0ZSBkZSBkw6lidXRcIn0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7XCJjbGFzc05hbWVcIjogXCJmb3JtLWdyb3VwXCJ9LCBSZWFjdC5jcmVhdGVFbGVtZW50KFwiYVwiLCB7XCJvbkNsaWNrXCI6IChBY3Rpb25zLmNyZWF0ZUthbmJhbil9LCBcIkludMOpZ3JlciBLYW5iYW4gVHJlbGxvXCIpKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIiwgeyBcXFxuICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImJ1dHRvblwiLCAgXFxcbiAgICAgICAgICAgICAgICAgICAgICAgICBcImNsYXNzTmFtZVwiOiBcImJ0biBidG4tZGVmYXVsdFwiLCAgXFxcbiAgICAgICAgICAgICAgICAgICAgICAgICBcImRhdGEtZGlzbWlzc1wiOiBcIm1vZGFsXCJ9LCBcIlwiXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBBbm51bGVyXG5cIlwiXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiLCB7IFxcXG4gICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwic3VibWl0XCIsICBcXFxuICAgICAgICAgICAgICAgICAgICAgICAgIFwiY2xhc3NOYW1lXCI6IFwiYnRuIGJ0bi1wcmltYXJ5XCIsICBcXFxuICAgICAgICAgICAgICAgICAgICAgICAgIFwib25DbGlja1wiOiAoQHByb3BzLmhhbmRsZSl9LCBcIlwiXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBBcHBsaXF1ZXJcblwiXCJcIilcbiAgICAgICAgICAgICAgICAgICAgKVxuXG5cblNwcmludE1vZGFsID0gUmVhY3QuY3JlYXRlQ2xhc3NcbiAgICByZW5kZXIgOiAtPlxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KE1vZGFsLCB7XCJ0aXRsZVwiOiAnQWpvdXRlciBTcHJpbnQnLCBcImlkXCI6ICdhZGRTcHJpbnQnfSxcbiAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFNwcmludEZvcm0sIG51bGwpXG4gICAgICAgIClcblxuXG5tb2R1bGUuZXhwb3J0cyA9IFNwcmludE1vZGFsIiwiUHJvamVjdExpc3QgPSByZXF1aXJlICcuL2NvbXBvbmVudHMvcHJvamVjdC1saXN0J1xuUHJvamVjdCA9IHJlcXVpcmUgJy4vY29tcG9uZW50cy9wcm9qZWN0J1xuTW9kYWxMaXN0ID0gcmVxdWlyZSAnLi9jb21wb25lbnRzL21vZGFsLWxpc3QnXG5cbk1haW4gPSBSZWFjdC5jcmVhdGVDbGFzc1xuICAgICAgICByZW5kZXIgOiAtPlxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCBudWxsLFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoUHJvamVjdExpc3QsIG51bGwpLFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoUHJvamVjdCwgbnVsbCksXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChNb2RhbExpc3QsIG51bGwpXG4gICAgICAgICAgICApXG5cblJlYWN0LnJlbmRlciBSZWFjdC5jcmVhdGVFbGVtZW50KE1haW4sIG51bGwpLCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udGVudCcpIiwiQWN0aW9ucyA9IHJlcXVpcmUgJy4uL2FjdGlvbnMvcHJvamVjdC1saXN0J1xuUHJvamVjdEFjdGlvbnMgPSByZXF1aXJlICcuLi9hY3Rpb25zL3Byb2plY3QnXG5cblByb2plY3RMaXN0ID0gUmVmbHV4LmNyZWF0ZVN0b3JlXG4gICAgICAgIGdldEluaXRpYWxTdGF0ZTogLT5cbiAgICAgICAgICAgICAgICBAZGF0YVxuICAgICAgICBjaGFuZ2VDdXJyZW50OiAoaWQpIC0+XG4gICAgICAgICAgICAgICAgQGRhdGEuY3VycmVudCA9IGlkXG4gICAgICAgICAgICAgICAgQHRyaWdnZXIgQGRhdGFcbiAgICAgICAgICAgICAgICBQcm9qZWN0QWN0aW9ucy5zZXRDdXJyZW50UHJvamVjdCBAZGF0YS5wcm9qZWN0c1tAZGF0YS5jdXJyZW50XVxuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgcHJvamVjdHM6IFtdLFxuICAgICAgICAgICAgICAgIGN1cnJlbnQ6IDBcbiAgICAgICAgfSxcbiAgICAgICAgbGlzdGVuYWJsZXM6IFtBY3Rpb25zXSxcbiAgICAgICAgc3JjVXJsOiAnL3dzL2FwaS92MS9wcm9qZWN0cycsXG4gICAgICAgIGluaXQ6IC0+XG4gICAgICAgICAgICAgICAgQGZldGNoTGlzdCgpXG4gICAgICAgIGRlbGV0ZTogLT5cbiAgICAgICAgICAgIGlkID0gQGRhdGEucHJvamVjdHNbQGRhdGEuY3VycmVudF0uX2lkXG4gICAgICAgICAgICByZXF1ZXN0ID0gc3VwZXJhZ2VudFxuICAgICAgICAgICAgcmVxdWVzdFxuICAgICAgICAgICAgICAgICAgICAuZGVsZXRlIEBzcmNVcmwgKyAnLycgKyBpZFxuICAgICAgICAgICAgICAgICAgICAuZW5kICgoZXJyLHJlcykgLT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiByZXMub2tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlIEBkYXRhLnByb2plY3RzW0BkYXRhLmN1cnJlbnRdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEBjaGFuZ2VDdXJyZW50IDBcbiAgICAgICAgICAgICAgICAgICAgKS5iaW5kIEBcblxuICAgICAgICBmZXRjaExpc3Q6IC0+XG4gICAgICAgICAgICAgICAgcmVxdWVzdCA9IHN1cGVyYWdlbnRcbiAgICAgICAgICAgICAgICByZXF1ZXN0XG4gICAgICAgICAgICAgICAgICAgICAgICAuZ2V0IEBzcmNVcmxcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hY2NlcHQgJ2FwcGxpY2F0aW9uL2pzb24nXG4gICAgICAgICAgICAgICAgICAgICAgICAuZW5kICgoZXJyLHJlcykgLT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgcmVzLm9rXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQGRhdGEucHJvamVjdHMgPSByZXMuYm9keVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEBjaGFuZ2VDdXJyZW50IDBcbiAgICAgICAgICAgICAgICAgICAgICAgICkuYmluZCBAXG5cbm1vZHVsZS5leHBvcnRzID0gUHJvamVjdExpc3RcbiIsIkFjdGlvbnMgPSByZXF1aXJlICcuLi9hY3Rpb25zL3Byb2plY3QtbW9kYWwnXG5cbk1vZGFsU3RvcmUgPSBSZWZsdXguY3JlYXRlU3RvcmVcbiAgICAgICAgbGlzdGVuYWJsZXM6IFtBY3Rpb25zXVxuICAgICAgICB0eXBlOiAnJ1xuICAgICAgICBuZXdQcm9qZWN0OiB7XG4gICAgICAgICAgICAgICAgbmFtZTogJycsXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246ICcnLFxuICAgICAgICAgICAgICAgIGdpdF9yZXBvOiAnJyxcbiAgICAgICAgICAgICAgICBtZW1iZXJzOiBbXSxcbiAgICAgICAgICAgICAgICBiYWNrbG9nOiBbXSxcbiAgICAgICAgICAgICAgICBzcHJpbnRzOiBbXVxuICAgICAgICB9XG4gICAgICAgIGN1cnJlbnRQcm9qZWN0OiB7fVxuICAgICAgICBzaG93ZWRQcm9qZWN0OiB7fVxuICAgICAgICBnZXRJbml0aWFsU3RhdGU6IC0+XG4gICAgICAgICAgICAgICAgQG5ld1Byb2plY3RcbiAgICAgICAgc2V0VHlwZTogKGUsdHlwZSkgLT5cbiAgICAgICAgICAgICAgICBpZiB0eXBlID09ICdwdXQnXG4gICAgICAgICAgICAgICAgICBAc2hvd2VkUHJvamVjdCA9IEBjdXJyZW50UHJvamVjdFxuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgIEBzaG93ZWRQcm9qZWN0ID0gQG5ld1Byb2plY3RcbiAgICAgICAgICAgICAgICBAdHlwZSA9IHR5cGVcbiAgICAgICAgICAgICAgICBAdHJpZ2dlciBAc2hvd2VkUHJvamVjdFxuICAgICAgICBzZXRDdXJyZW50UHJvamVjdDogKHApIC0+XG4gICAgICAgICAgICAgICAgQGN1cnJlbnRQcm9qZWN0ID0gcCBpZiBwP1xuICAgICAgICBzdWJtaXQ6IChlKSAtPlxuICAgICAgICAgICAgICAgIHN3aXRjaCBAdHlwZVxuICAgICAgICAgICAgICAgICAgd2hlbiAncG9zdCcgdGhlbiBAc2VuZCBlXG4gICAgICAgICAgICAgICAgICB3aGVuICdwdXQnIHRoZW4gQHVwZGF0ZSBlXG4gICAgICAgICAgICAgICAgICBlbHNlIGNvbnNvbGUubG9nICd3cm9uZyByZXF1ZXN0IHR5cGUnXG4gICAgICAgIHVwZGF0ZTogKGUpIC0+XG4gICAgICAgICAgICAgICAgcmVxdWVzdCA9IHN1cGVyYWdlbnRcbiAgICAgICAgICAgICAgICByZXF1ZXN0XG4gICAgICAgICAgICAgICAgICAgICAgICAucHV0ICcvd3MvYXBpL3YxL3Byb2plY3QvJyArIEBjdXJyZW50UHJvamVjdC5faWRcbiAgICAgICAgICAgICAgICAgICAgICAgIC50eXBlICdqc29uJ1xuICAgICAgICAgICAgICAgICAgICAgICAgLnNlbmQgQGN1cnJlbnRQcm9qZWN0XG4gICAgICAgICAgICAgICAgICAgICAgICAuZW5kICgoZXJyLHJlcykgLT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cgJ2RhdGEgdXBkYXRlZCcgaWYgcmVzLm9rXG4gICAgICAgICAgICAgICAgICAgICAgICApLmJpbmQgQFxuICAgICAgICAgICAgICAgICQoXCIjYWRkTW9kYWxcIikubW9kYWwgJ2hpZGUnXG4gICAgICAgIHNlbmQ6IChlKSAtPlxuICAgICAgICAgICAgICAgIHJlcXVlc3QgPSBzdXBlcmFnZW50XG4gICAgICAgICAgICAgICAgcmVxdWVzdFxuICAgICAgICAgICAgICAgICAgICAgICAgLnBvc3QgJy93cy9hcGkvdjEvcHJvamVjdCdcbiAgICAgICAgICAgICAgICAgICAgICAgIC50eXBlICdqc29uJ1xuICAgICAgICAgICAgICAgICAgICAgICAgLnNlbmQgQG5ld1Byb2plY3RcbiAgICAgICAgICAgICAgICAgICAgICAgIC5lbmQgKChlcnIscmVzKSAtPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyAnZGF0YSBzZW50JyBpZiByZXMub2tcbiAgICAgICAgICAgICAgICAgICAgICAgICkuYmluZCBAXG4gICAgICAgICAgICAgICAgJChcIiNhZGRNb2RhbFwiKS5tb2RhbCAnaGlkZSdcbiAgICAgICAgaGFuZGxlTmFtZTogKHZhbHVlKSAtPlxuICAgICAgICAgICAgICAgIEBzaG93ZWRQcm9qZWN0Lm5hbWUgPSB2YWx1ZVxuICAgICAgICAgICAgICAgIEB0cmlnZ2VyIEBzaG93ZWRQcm9qZWN0XG4gICAgICAgIGhhbmRsZURlc2NyaXB0aW9uOiAodmFsdWUpIC0+XG4gICAgICAgICAgICAgICAgQHNob3dlZFByb2plY3QuZGVzY3JpcHRpb24gPSB2YWx1ZVxuICAgICAgICAgICAgICAgIEB0cmlnZ2VyIEBzaG93ZWRQcm9qZWN0XG4gICAgICAgIGhhbmRsZVJlcG86ICh2YWx1ZSkgLT5cbiAgICAgICAgICAgICAgICBAc2hvd2VkUHJvamVjdC5naXRfcmVwbyA9IHZhbHVlXG4gICAgICAgICAgICAgICAgQHRyaWdnZXIgQHNob3dlZFByb2plY3RcbiAgICAgICAgaGFuZGxlTWVtYmVyOiAoaW5kZXgsIHZhbHVlKSAtPlxuICAgICAgICAgICAgICAgIEBzaG93ZWRQcm9qZWN0Lm1lbWJlcnNbaW5kZXhdID0gdmFsdWVcbiAgICAgICAgICAgICAgICBAdHJpZ2dlciBAc2hvd2VkUHJvamVjdFxuICAgICAgICBhZGRNZW1iZXI6IC0+XG4gICAgICAgICAgICAgICAgQHNob3dlZFByb2plY3QubWVtYmVycy5wdXNoICcnXG4gICAgICAgICAgICAgICAgQHRyaWdnZXIgQHNob3dlZFByb2plY3RcbiAgICAgICAgZGVsZXRlTWVtYmVyOiAoaW5kZXgpIC0+XG4gICAgICAgICAgICAgICAgZGVsZXRlIEBzaG93ZWRQcm9qZWN0Lm1lbWJlcnNbaW5kZXhdXG4gICAgICAgICAgICAgICAgQHRyaWdnZXIgQHNob3dlZFByb2plY3RcblxubW9kdWxlLmV4cG9ydHMgPSBNb2RhbFN0b3JlIiwiQWN0aW9ucyA9IHJlcXVpcmUgJy4uL2FjdGlvbnMvcHJvamVjdCdcblxuTW9kYWxBY3Rpb25zID0gcmVxdWlyZSAnLi4vYWN0aW9ucy9wcm9qZWN0LW1vZGFsJ1xuU3ByaW50TGlzdEFjdGlvbnMgPSByZXF1aXJlICcuLi9hY3Rpb25zL3NwcmludC1saXN0J1xuXG5Qcm9qZWN0U3RvcmUgPSBSZWZsdXguY3JlYXRlU3RvcmVcbiAgICBsaXN0ZW5hYmxlczogW0FjdGlvbnNdXG4gICAgZGF0YTogeyBwcm9qZWN0OiB7fSwgYmFja2xvZzogdHJ1ZSB9XG4gICAgZ2V0SW5pdGlhbFN0YXRlOiAtPlxuICAgICAgICBAZGF0YVxuICAgIGluaXQ6IC0+XG4gICAgICAgIEB0cmlnZ2VyIEBkYXRhXG4gICAgc2VsZWN0QmFja2xvZzogLT5cbiAgICAgICAgQGRhdGEuYmFja2xvZyA9IHRydWVcbiAgICAgICAgQHRyaWdnZXIgQGRhdGFcbiAgICBzZWxlY3RTcHJpbnRzOiAtPlxuICAgICAgICBAZGF0YS5iYWNrbG9nID0gZmFsc2VcbiAgICAgICAgQHRyaWdnZXIgQGRhdGFcbiAgICBzZXRDdXJyZW50UHJvamVjdDogKHApIC0+XG4gICAgICAgIEBkYXRhLnByb2plY3QgPSBwXG4gICAgICAgIEB0cmlnZ2VyIEBkYXRhXG4gICAgICAgIFNwcmludExpc3RBY3Rpb25zLnNldExpc3QgQGRhdGEucHJvamVjdC5zcHJpbnRzXG4gICAgICAgIE1vZGFsQWN0aW9ucy5zZXRDdXJyZW50UHJvamVjdCBAZGF0YS5wcm9qZWN0XG5cbm1vZHVsZS5leHBvcnRzID0gUHJvamVjdFN0b3JlXG4iLCJBY3Rpb25zID0gcmVxdWlyZSAnLi4vYWN0aW9ucy9zcHJpbnQtbGlzdCdcblxuU3ByaW50TGlzdFN0b3JlID0gUmVmbHV4LmNyZWF0ZVN0b3JlXG4gICAgbGlzdGVuYWJsZXM6IFtBY3Rpb25zXVxuICAgIGxpc3Q6IFtdXG4gICAgaW5pdDogLT5cbiAgICAgICAgQGZldGNoKClcbiAgICBnZXRJbml0aWFsU3RhdGU6IC0+XG4gICAgICAgIEBsaXN0XG4gICAgc2V0TGlzdDogKGwpIC0+XG4gICAgICAgIEBsaXN0ID0gbFxuICAgICAgICBAZmV0Y2goKVxuICAgIGZldGNoOiAtPlxuICAgICAgICBAdHJpZ2dlciBAbGlzdFxuXG5tb2R1bGUuZXhwb3J0cyA9IFNwcmludExpc3RTdG9yZVxuIiwiQWN0aW9ucyA9IHJlcXVpcmUgJy4uL2FjdGlvbnMvc3ByaW50LW1vZGFsJ1xuXG5TcHJpbnRTdG9yZSA9IFJlZmx1eC5jcmVhdGVTdG9yZVxuICAgIGxpc3RlbmFibGVzOiBbQWN0aW9uc11cbiAgICBuZXdTcHJpbnQ6IHtcbiAgICAgICAgaWQ6MCxcbiAgICAgICAgc3RhcnQ6IFwiXCIsXG4gICAgICAgIHRhc2tzOiBbXVxuICAgIH1cbiAgICB0eXBlOiAnJ1xuICAgIGN1cnJlbnRTcHJpbnQ6IHt9XG4gICAgc2hvd2VkU3ByaW50OiB7fVxuICAgIGdldEluaXRpYWxTdGF0ZTogLT5cbiAgICAgICAgQG5ld1NwcmludFxuICAgIHNldFR5cGU6IChlLHR5cGUpIC0+XG4gICAgICAgIGlmIHR5cGUgPT0gJ3B1dCdcbiAgICAgICAgICAgIEBzaG93ZWRTcHJpbnQgPSBAY3VycmVudFNwcmludFxuICAgICAgICBlbHNlXG4gICAgICAgICAgICBAc2hvd2VkU3ByaW50ID0gQG5ld1NwcmludFxuICAgICAgICAgICAgQHR5cGUgPSB0eXBlXG4gICAgICAgIEB0cmlnZ2VyIEBzaG93ZWRTcHJpbnRcbiAgICBzZXRDdXJyZW50U3ByaW50OiAocykgLT5cbiAgICAgICAgQGN1cnJlbnRTcHJpbnQgPSBzXG4gICAgc3VibWl0OiAoZSkgLT5cbiAgICAgICAgc3dpdGNoIEB0eXBlXG4gICAgICAgICAgICB3aGVuICdwb3N0JyB0aGVuIEBzZW5kIGVcbiAgICAgICAgICAgIHdoZW4gJ3B1dCcgdGhlbiBAdXBkYXRlIGVcbiAgICAgICAgICAgIGVsc2UgY29uc29sZS5sb2cgJ3dyb25nIHJlcXVlc3QgdHlwZSdcbiAgICB1cGRhdGU6IChlKSAtPlxuICAgICAgICByZXF1ZXN0ID0gc3VwZXJhZ2VudFxuICAgICAgICByZXF1ZXN0XG4gICAgICAgICAgICAucHV0ICcvd3MvYXBpL3YxL3NwcmludC8nICsgQGN1cnJlbnRTcHJpbnQuX2lkXG4gICAgICAgICAgICAudHlwZSAnanNvbidcbiAgICAgICAgICAgIC5zZW5kIEBjdXJyZW50U3ByaW50XG4gICAgICAgICAgICAuZW5kICgoZXJyLHJlcykgLT5cbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyAnZGF0YSB1cGRhdGVkJyBpZiByZXMub2tcbiAgICAgICAgICAgICkuYmluZCBAXG4gICAgICAgICQoXCIjYWRkTW9kYWxcIikubW9kYWwgJ2hpZGUnXG4gICAgc2VuZDogKGUpIC0+XG4gICAgICAgIHJlcXVlc3QgPSBzdXBlcmFnZW50XG4gICAgICAgIHJlcXVlc3RcbiAgICAgICAgICAgIC5wb3N0ICcvd3MvYXBpL3YxL3Byb2plY3QnXG4gICAgICAgICAgICAudHlwZSAnanNvbidcbiAgICAgICAgICAgIC5zZW5kIEBuZXdTcHJpbnRcbiAgICAgICAgICAgIC5lbmQgKChlcnIscmVzKSAtPlxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nICdkYXRhIHNlbnQnIGlmIHJlcy5va1xuICAgICAgICAgICAgKS5iaW5kIEBcbiAgICAgICAgJChcIiNhZGRNb2RhbFwiKS5tb2RhbCAnaGlkZSdcbiAgICBoYW5kbGVEYXRlOiAodmFsdWUpIC0+XG4gICAgICAgIEBzaG93ZWRTcHJpbnQuZGF0ZSA9IHZhbHVlXG4gICAgICAgIEB0cmlnZ2VyIEBzaG93ZWRTcHJpbnRcbiAgICBoYW5kbGVOYW1lOiAodmFsdWUpIC0+XG4gICAgICAgIEBzaG93ZWRTcHJpbnQuaWQgPSB2YWx1ZVxuICAgICAgICBAdHJpZ2dlciBAc2hvd2VkU3ByaW50XG4gICAgb25LYW5iYW46IC0+XG4gICAgICAgIGNvbnNvbGUubG9nIEBzaG93ZWRTcHJpbnQuaWQrQHNob3dlZFNwcmludC5zdGFydFxuICAgICAgICBUcmVsbG8ucG9zdChcIi9ib3Jkc1wiLCB7bmFtZTogQHNob3dlZFNwcmludC5pZCtAc2hvd2VkU3ByaW50LnN0YXJ0fSlcbiAgICBvbkthbmJhbkZhaWw6IC0+XG4gICAgICAgIGFsZXJ0ICdjb25uZWN0aW9uIHRvIFRyZWxsbyBmYWlsZWQnXG4gICAgY3JlYXRlS2FuYmFuOiAtPlxuICAgICAgICBjb25zb2xlLmxvZyAnc3VjY2VzcydcbiAgICAgICAgVHJlbGxvLmF1dGhvcml6ZVxuICAgICAgICAgICAgICB0eXBlOiBcInBvcHVwXCIsXG4gICAgICAgICAgICAgIG5hbWU6IFwiU2NydW15IEFwcGxpY2F0aW9uXCIsXG4gICAgICAgICAgICAgIHNjb3BlOiB7XG4gICAgICAgICAgICAgICAgcmVhZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICB3cml0ZTogdHJ1ZSB9LFxuICAgICAgICAgICAgICBleHBpcmF0aW9uOiBcIm5ldmVyXCIsXG4gICAgICAgICAgICAgIHN1Y2Nlc3M6IEBvbkthbmJhbixcbiAgICAgICAgICAgICAgZXJyb3I6IEBvbkthbmJhbkZhaWxcblxuXG5tb2R1bGUuZXhwb3J0cyA9IFNwcmludFN0b3JlIl19
