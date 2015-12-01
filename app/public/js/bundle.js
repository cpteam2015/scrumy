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

ModalActions = Reflux.createActions(['submit', 'setCurrentSprint', 'handleName', 'handleDate', 'handleKanban', 'createKanban', 'add', 'edit']);

module.exports = ModalActions;


},{}],6:[function(require,module,exports){
var Modal, ModalList, ProjectModal, SprintModal;

ProjectModal = require('../components/project-modal');

SprintModal = require('../components/sprint-modal');

Modal = require('../components/modal');

ModalList = React.createClass({displayName: "ModalList",
  render: function() {
    return React.createElement("div", null, React.createElement(Modal, null, React.createElement(ProjectModal, null)), React.createElement(Modal, null, React.createElement(SprintModal, null)));
  }
});

module.exports = ModalList;


},{"../components/modal":7,"../components/project-modal":9,"../components/sprint-modal":12}],7:[function(require,module,exports){
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
    return React.createElement(Form, null);
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
var Actions, ModalActions, Sprint, SprintList, Store;

Store = require('../stores/sprint-list');

Actions = require('../actions/sprint-list');

ModalActions = require('../actions/sprint-modal');

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
      "onClick": (function(e) {
        e.preventDefault();
        return ModalActions.add;
      }),
      "data-toggle": "modal",
      "data-target": "#addSprint",
      "className": "material-icons"
    }, "add")), items);
  }
});

module.exports = SprintList;


},{"../actions/sprint-list":4,"../actions/sprint-modal":5,"../stores/sprint-list":17}],12:[function(require,module,exports){
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
        e.preventDefault();
        return Actions.submit(e);
      })
    }, React.createElement(TextInput, {
      "onChange": Actions.handleName,
      "text": this.state.sprint.id,
      "id": "inputName",
      "placeholder": "Nom",
      "required": "required"
    }), React.createElement("div", {
      "className": "form-group"
    }, React.createElement("label", {
      "htmlFor": "inputDate"
    }, "Date de début"), React.createElement("input", {
      "onChange": (function(e) {
        return Actions.handleDate(e.target.value);
      }).bind(this),
      "value": this.state.sprint.start,
      "type": "date",
      "className": "form-control",
      "id": "inputDate",
      "required": "required"
    })), React.createElement("button", {
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
    return React.createElement(SprintForm, null);
  }
});

module.exports = SprintModal;


},{"../actions/sprint-modal":5,"../stores/sprint-modal":18,"./modal":7}],13:[function(require,module,exports){
var Index, Link, Main, ModalList, Panel, Project, ProjectList, ProjectModal, Route, Router, Sprint;

ProjectList = require('./components/project-list');

Project = require('./components/project');

ModalList = require('./components/modal-list');

ProjectModal = require('./components/project-modal');

Sprint = require('./components/sprint-modal');

Router = ReactRouter.Router;

Route = ReactRouter.Route;

Link = ReactRouter.Link;

Panel = React.createClass({displayName: "Panel",
  render: function() {
    return React.createElement("div", null, this.props.children);
  }
});

Index = React.createClass({displayName: "Index",
  render: function() {
    return React.createElement("div", null, React.createElement(ProjectList, null), React.createElement(Project, null), React.createElement(ModalList, null));
  }
});

Main = React.createClass({displayName: "Main",
  render: function() {
    return React.createElement(Router, null, React.createElement(Route, {
      "path": "/",
      "component": Panel
    }, React.createElement(Route, {
      "path": "index",
      "component": Index
    }), React.createElement(Route, {
      "path": "addProject",
      "component": ProjectModal
    }), React.createElement(Route, {
      "path": "addSprint",
      "component": Sprint
    })));
  }
});

React.render(React.createElement(Main, null), document.getElementById('content'));


},{"./components/modal-list":6,"./components/project":10,"./components/project-list":8,"./components/project-modal":9,"./components/sprint-modal":12}],14:[function(require,module,exports){
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
  type: 'post',
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
    request.post('/api/v1/project').type('json').send(this.newProject).end((function(err, res) {
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
    console.log(p);
    this.data.project = p;
    return this.trigger(this.data);
  }
});

module.exports = ProjectStore;


},{"../actions/project":3,"../actions/project-modal":2,"../actions/sprint-list":4}],17:[function(require,module,exports){
var Actions, ModalActions, SprintListStore;

Actions = require('../actions/sprint-list');

ModalActions = require('../actions/sprint-modal');

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
  add: function(e) {
    return ModalActions.setType(e, 'post');
  },
  fetch: function() {
    return this.trigger(this.list);
  }
});

module.exports = SprintListStore;


},{"../actions/sprint-list":4,"../actions/sprint-modal":5}],18:[function(require,module,exports){
var Actions, SprintStore;

Actions = require('../actions/sprint-modal');

SprintStore = Reflux.createStore({
  listenables: [Actions],
  newSprint: {
    id: 0,
    start: "",
    tasks: [],
    kanban: {
      id: 0,
      url: ""
    }
  },
  request: 'post',
  currentSprint: {},
  showedSprint: {},
  getInitialState: function() {
    return this.newSprint;
  },
  add: function(e) {
    this.request = 'post';
    this.showedSprint = this.newSprint;
    return this.trigger(this.showedSprint);
  },
  edit: function(e) {
    this.request = 'put';
    this.showedSprint = this.currentSprint;
    return this.trigger(this.showedSprint);
  },
  setCurrentSprint: function(s) {
    return this.currentSprint = s;
  },
  submit: function(e) {
    switch (this.request) {
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
    request.post('/api/v1/project/sp/' + location.hash.split('id=')[1].split('&')[0]).type('json').send(this.newSprint).end((function(err, res) {
      if (res.ok) {
        return console.log('data sent');
      }
    }).bind(this));
    return $("#addModal").modal('hide');
  },
  handleDate: function(value) {
    this.showedSprint.start = value;
    return this.trigger(this.showedSprint);
  },
  handleName: function(value) {
    this.showedSprint.id = value;
    return this.trigger(this.showedSprint);
  },
  handleKanban: function(value) {
    this.showedSprint.kanban = value;
    return this.trigger(this.showedSprint);
  },
  trelloLogIn: function(onSuccess) {
    var onError;
    onError = function() {
      return alert('connection to Trello failed');
    };
    return Trello.authorize({
      type: "popup",
      name: "Scrumy Application",
      scope: {
        read: true,
        write: true
      },
      expiration: "never",
      success: onSuccess,
      error: onError
    });
  },
  createKanban: function() {
    var kanban, onSuccess;
    kanban = this.showedSprint.kanban;
    onSuccess = (function() {
      var setBoardId, setListId;
      setBoardId = (function(data) {
        return this.board = data.id;
      }).bind(this);
      console.log(this.board);
      setListId = (function(data) {
        kanban.id = data.id;
        return kanban.url = data.url;
      }).bind(this);
      Trello.post('/boards', {
        name: this.showedSprint.id + " - " + this.showedSprint.start
      }, setBoardId);
      Trello.post('/lists', {
        name: "Todo",
        idBoard: this.board
      }, setListId);
      Trello.post('/lists', {
        name: "Ongoing",
        idBoard: this.board
      });
      return Trello.post('/lists', {
        name: "Done",
        idBoard: this.board
      });
    }).bind(this);
    return this.trelloLogIn(onSuccess);
  },
  createCard: function(name) {
    var onSuccess;
    onSuccess = (function() {
      return Trello.post('/cards', {
        name: name,
        idList: this.showedSprint.kanban.id,
        due: null,
        pos: "top"
      });
    }).bind(this);
    return this.trelloLogIn(onSuccess);
  }
});

module.exports = SprintStore;


},{"../actions/sprint-modal":5}]},{},[13])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvaG9tZS94aGl0ZWRldi9jcmVtaS9jcC9zY3J1bXkvYXBwL2pzL2FjdGlvbnMvcHJvamVjdC1saXN0LmNqc3giLCIvaG9tZS94aGl0ZWRldi9jcmVtaS9jcC9zY3J1bXkvYXBwL2pzL2FjdGlvbnMvcHJvamVjdC1tb2RhbC5janN4IiwiL2hvbWUveGhpdGVkZXYvY3JlbWkvY3Avc2NydW15L2FwcC9qcy9hY3Rpb25zL3Byb2plY3QuY2pzeCIsIi9ob21lL3hoaXRlZGV2L2NyZW1pL2NwL3NjcnVteS9hcHAvanMvYWN0aW9ucy9zcHJpbnQtbGlzdC5janN4IiwiL2hvbWUveGhpdGVkZXYvY3JlbWkvY3Avc2NydW15L2FwcC9qcy9hY3Rpb25zL3NwcmludC1tb2RhbC5janN4IiwiL2hvbWUveGhpdGVkZXYvY3JlbWkvY3Avc2NydW15L2FwcC9qcy9jb21wb25lbnRzL21vZGFsLWxpc3QuY2pzeCIsIi9ob21lL3hoaXRlZGV2L2NyZW1pL2NwL3NjcnVteS9hcHAvanMvY29tcG9uZW50cy9tb2RhbC5janN4IiwiL2hvbWUveGhpdGVkZXYvY3JlbWkvY3Avc2NydW15L2FwcC9qcy9jb21wb25lbnRzL3Byb2plY3QtbGlzdC5janN4IiwiL2hvbWUveGhpdGVkZXYvY3JlbWkvY3Avc2NydW15L2FwcC9qcy9jb21wb25lbnRzL3Byb2plY3QtbW9kYWwuY2pzeCIsIi9ob21lL3hoaXRlZGV2L2NyZW1pL2NwL3NjcnVteS9hcHAvanMvY29tcG9uZW50cy9wcm9qZWN0LmNqc3giLCIvaG9tZS94aGl0ZWRldi9jcmVtaS9jcC9zY3J1bXkvYXBwL2pzL2NvbXBvbmVudHMvc3ByaW50LWxpc3QuY2pzeCIsIi9ob21lL3hoaXRlZGV2L2NyZW1pL2NwL3NjcnVteS9hcHAvanMvY29tcG9uZW50cy9zcHJpbnQtbW9kYWwuY2pzeCIsIi9ob21lL3hoaXRlZGV2L2NyZW1pL2NwL3NjcnVteS9hcHAvanMvbWFpbi5janN4IiwiL2hvbWUveGhpdGVkZXYvY3JlbWkvY3Avc2NydW15L2FwcC9qcy9zdG9yZXMvcHJvamVjdC1saXN0LmNqc3giLCIvaG9tZS94aGl0ZWRldi9jcmVtaS9jcC9zY3J1bXkvYXBwL2pzL3N0b3Jlcy9wcm9qZWN0LW1vZGFsLmNqc3giLCIvaG9tZS94aGl0ZWRldi9jcmVtaS9jcC9zY3J1bXkvYXBwL2pzL3N0b3Jlcy9wcm9qZWN0LmNqc3giLCIvaG9tZS94aGl0ZWRldi9jcmVtaS9jcC9zY3J1bXkvYXBwL2pzL3N0b3Jlcy9zcHJpbnQtbGlzdC5janN4IiwiL2hvbWUveGhpdGVkZXYvY3JlbWkvY3Avc2NydW15L2FwcC9qcy9zdG9yZXMvc3ByaW50LW1vZGFsLmNqc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQSxJQUFBOztBQUFBLGtCQUFBLEdBQXFCLE1BQU0sQ0FBQyxhQUFQLENBQXFCLENBQ3RDLFdBRHNDLEVBRXRDLFFBRnNDLEVBR3RDLGVBSHNDLENBQXJCOztBQU1yQixNQUFNLENBQUMsT0FBUCxHQUFpQjs7OztBQ05qQixJQUFBOztBQUFBLFlBQUEsR0FBZSxNQUFNLENBQUMsYUFBUCxDQUFxQixDQUNoQyxRQURnQyxFQUVoQyxtQkFGZ0MsRUFHaEMsU0FIZ0MsRUFJaEMsWUFKZ0MsRUFLaEMsbUJBTGdDLEVBTWhDLFlBTmdDLEVBT2hDLGNBUGdDLEVBUWhDLFdBUmdDLEVBU2hDLGNBVGdDLENBQXJCOztBQVlmLE1BQU0sQ0FBQyxPQUFQLEdBQWlCOzs7O0FDWmpCLElBQUE7O0FBQUEsY0FBQSxHQUFpQixNQUFNLENBQUMsYUFBUCxDQUFxQixDQUNsQyxlQURrQyxFQUVsQyxtQkFGa0MsRUFHbEMsZUFIa0MsQ0FBckI7O0FBTWpCLE1BQU0sQ0FBQyxPQUFQLEdBQWlCOzs7O0FDTmpCLElBQUE7O0FBQUEsaUJBQUEsR0FBb0IsTUFBTSxDQUFDLGFBQVAsQ0FBcUIsQ0FDckMsWUFEcUMsRUFFckMsbUJBRnFDLEVBR3JDLEtBSHFDLEVBSXJDLFNBSnFDLENBQXJC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Q0FBQyxPQUFQLEdBQWlCIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIlByb2plY3RMaXN0QWN0aW9ucyA9IFJlZmx1eC5jcmVhdGVBY3Rpb25zIFtcbiAgICAnZmV0Y2hMaXN0JyxcbiAgICAnZGVsZXRlJyxcbiAgICAnY2hhbmdlQ3VycmVudCdcbl1cblxubW9kdWxlLmV4cG9ydHMgPSBQcm9qZWN0TGlzdEFjdGlvbnNcbiIsIk1vZGFsQWN0aW9ucyA9IFJlZmx1eC5jcmVhdGVBY3Rpb25zIFtcbiAgICAnc3VibWl0JyxcbiAgICAnc2V0Q3VycmVudFByb2plY3QnLFxuICAgICdzZXRUeXBlJyxcbiAgICAnaGFuZGxlTmFtZScsXG4gICAgJ2hhbmRsZURlc2NyaXB0aW9uJyxcbiAgICAnaGFuZGxlUmVwbycsXG4gICAgJ2hhbmRsZU1lbWJlcicsXG4gICAgJ2FkZE1lbWJlcicsXG4gICAgJ2RlbGV0ZU1lbWJlcidcbl1cblxubW9kdWxlLmV4cG9ydHMgPSBNb2RhbEFjdGlvbnNcbiIsIlByb2plY3RBY3Rpb25zID0gUmVmbHV4LmNyZWF0ZUFjdGlvbnMgW1xuICAgICdzZWxlY3RCYWNrbG9nJyxcbiAgICAnc2V0Q3VycmVudFByb2plY3QnLFxuICAgICdzZWxlY3RTcHJpbnRzJ1xuXVxuXG5tb2R1bGUuZXhwb3J0cyA9IFByb2plY3RBY3Rpb25zXG4iLCJTcHJpbnRMaXN0QWN0aW9ucyA9IFJlZmx1eC5jcmVhdGVBY3Rpb25zIFtcbiAgICAnaGFuZGxlTmFtZScsXG4gICAgJ2hhbmRsZURlc2NyaXB0aW9uJyxcbiAgICAnYWRkJyxcbiAgICAnc2V0TGlzdCdcbl1cblxubW9kdWxlLmV4cG9ydHMgPSBTcHJpbnRMaXN0QWN0aW9uc1xuIiwiTW9kYWxBY3Rpb25zID0gUmVmbHV4LmNyZWF0ZUFjdGlvbnMgW1xuICAgICdzdWJtaXQnLFxuICAgICdzZXRDdXJyZW50U3ByaW50JyxcbiAgICAnaGFuZGxlTmFtZScsXG4gICAgJ2hhbmRsZURhdGUnLFxuICAgICdoYW5kbGVLYW5iYW4nLFxuICAgICdjcmVhdGVLYW5iYW4nLFxuICAgICdhZGQnLFxuICAgICdlZGl0J1xuXVxuXG5tb2R1bGUuZXhwb3J0cyA9IE1vZGFsQWN0aW9uc1xuIiwiUHJvamVjdE1vZGFsID0gcmVxdWlyZSAnLi4vY29tcG9uZW50cy9wcm9qZWN0LW1vZGFsJ1xuU3ByaW50TW9kYWwgPSByZXF1aXJlICcuLi9jb21wb25lbnRzL3NwcmludC1tb2RhbCdcbk1vZGFsID0gcmVxdWlyZSAnLi4vY29tcG9uZW50cy9tb2RhbCdcblxuTW9kYWxMaXN0ID0gUmVhY3QuY3JlYXRlQ2xhc3NcbiAgICByZW5kZXIgOiAtPlxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIG51bGwsXG4gICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChNb2RhbCwgbnVsbCxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoUHJvamVjdE1vZGFsLCBudWxsKVxuICAgICAgICAgICksXG4gICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChNb2RhbCwgbnVsbCxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoU3ByaW50TW9kYWwsIG51bGwpXG4gICAgICAgICAgKVxuICAgICAgICApXG5cbm1vZHVsZS5leHBvcnRzID0gTW9kYWxMaXN0IiwiTW9kYWwgPSBSZWFjdC5jcmVhdGVDbGFzc1xuICAgIHJlbmRlciA6IC0+XG4gICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtcImNsYXNzTmFtZVwiOiBcIm1vZGFsIGZhZGVcIiwgXCJpZFwiOiAoQHByb3BzLmlkKSwgXCJyb2xlXCI6IFwiZGlhbG9nXCIsIFwiYXJpYS1sYWJlbGxlZGJ5XCI6IFwibW9kYWxMYWJlbFwifSxcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7XCJjbGFzc05hbWVcIjogXCJtb2RhbC1kaWFsb2dcIiwgXCJyb2xlXCI6IFwiZG9jdW1lbnRcIn0sXG4gICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7XCJjbGFzc05hbWVcIjogXCJtb2RhbC1jb250ZW50XCJ9LFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7XCJjbGFzc05hbWVcIjogXCJtb2RhbC1oZWFkZXJcIn0sXG4gICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIiwge1widHlwZVwiOiBcImJ1dHRvblwiLCBcImNsYXNzTmFtZVwiOiBcImNsb3NlXCIsIFwiZGF0YS1kaXNtaXNzXCI6IFwibW9kYWxcIiwgXCJhcmlhLWxhYmVsXCI6IFwiQ2xvc2VcIn0sXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInNwYW5cIiwge1wiYXJpYS1oaWRkZW5cIjogXCJ0cnVlXCJ9LCBcIsOXXCIpXG4gICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJoNFwiLCB7XCJjbGFzc05hbWVcIjogXCJtb2RhbC10aXRsZVwiLCBcImlkXCI6ICdtb2RhbExhYmVsJ30sIChAcHJvcHMudGl0bGUpKVxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge1wiY2xhc3NOYW1lXCI6IFwibW9kYWwtYm9keVwifSxcbiAgICAgICAgICAgICAgKEBwcm9wcy5jaGlsZHJlbilcbiAgICAgICAgICAgIClcbiAgICAgICAgICApXG4gICAgICAgIClcbiAgICAgIClcblxubW9kdWxlLmV4cG9ydHMgPSBNb2RhbCIsIkFjdGlvbnMgPSByZXF1aXJlICcuLi9hY3Rpb25zL3Byb2plY3QtbGlzdCdcblN0b3JlID0gcmVxdWlyZSAnLi4vc3RvcmVzL3Byb2plY3QtbGlzdCdcblxuTW9kYWxBY3Rpb25zID0gcmVxdWlyZSAnLi4vYWN0aW9ucy9wcm9qZWN0LW1vZGFsJ1xuXG5BZGRQcm9qZWN0ID0gUmVhY3QuY3JlYXRlQ2xhc3NcbiAgICAgICAgcmVuZGVyIDogLT5cbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiYVwiLCB7IFxcXG4gICAgICAgICAgICAgICAgIFwib25DbGlja1wiOiAoTW9kYWxBY3Rpb25zLnNldFR5cGUuYmluZCBudWxsLCBldmVudCwgJ3Bvc3QnKSwgIFxcXG4gICAgICAgICAgICAgICAgIFwiZGF0YS10b2dnbGVcIjogXCJtb2RhbFwiLCAgXFxcbiAgICAgICAgICAgICAgICAgXCJkYXRhLXRhcmdldFwiOiBcIiNhZGRQcm9qZWN0XCIsICBcXFxuICAgICAgICAgICAgICAgICBcImNsYXNzTmFtZVwiOiBcIm1hdGVyaWFsLWljb25zXCJ9LCBcIlwiXCJcbiAgICAgICAgICAgICAgICAgIGFkZFxuXCJcIlwiKVxuXG5EZWxldGVDb25maXJtID0gUmVhY3QuY3JlYXRlQ2xhc3NcbiAgICAgICAgcmVuZGVyIDogLT5cbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtcImNsYXNzTmFtZVwiOiBcIm1vZGFsIGZhZGVcIiwgXCJpZFwiOiBcImNvbmZpcm1Nb2RhbFwifSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge1wiY2xhc3NOYW1lXCI6IFwibW9kYWwtZGlhbG9nXCJ9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtcImNsYXNzTmFtZVwiOiBcIm1vZGFsLWNvbnRlbnRcIn0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7XCJjbGFzc05hbWVcIjogXCJtb2RhbC1oZWFkZXJcIn0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIsIHtcInR5cGVcIjogXCJidXR0b25cIiwgIFxcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjbGFzc05hbWVcIjogXCJjbG9zZVwiLCAgXFxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImRhdGEtZGlzbWlzc1wiOiBcIm1vZGFsXCIsICBcXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYXJpYS1sYWJlbFwiOiBcIkNsb3NlXCJ9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIHtcImFyaWEtaGlkZGVuXCI6IFwidHJ1ZVwifSwgXCJcIlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIMOXXG5cIlwiXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImg0XCIsIHtcImNsYXNzTmFtZVwiOiBcIm1vZGFsLXRpdGxlXCJ9LCBcIlwiXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBFdGVzLXZvdXMgc3VyIGRlIHZvdWxvaXIgc3VwcHJpbWVyIGxlIHByb2pldD9cblwiXCJcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge1wiY2xhc3NOYW1lXCI6IFwibW9kYWwtYm9keVwifSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIiwgeyBcXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImJ1dHRvblwiLCAgXFxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNsYXNzTmFtZVwiOiBcImJ0biBidG4tZGVmYXVsdFwiLCAgXFxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImRhdGEtZGlzbWlzc1wiOiBcIm1vZGFsXCJ9LCBcIlwiXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBOb25cblwiXCJcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIsIHsgXFxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJzdWJtaXRcIiwgIFxcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjbGFzc05hbWVcIjogXCJidG4gYnRuLXByaW1hcnlcIiwgIFxcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJvbkNsaWNrXCI6IChAcHJvcHMuaGFuZGxlKX0sIFwiXCJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE91aVxuXCJcIlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIClcblxuRGVsZXRlUHJvamVjdCA9IFJlYWN0LmNyZWF0ZUNsYXNzXG4gICAgICAgIHJlbmRlciA6IC0+XG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInNwYW5cIiwgbnVsbCxcbiAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIiwge1widHlwZVwiOiBcImJ1dHRvblwiLCBcImNsYXNzTmFtZVwiOiBcImJ0biBidG4tZGVmYXVsdFwifSxcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImFcIiwgeyBcXFxuICAgICAgICAgICAgICAgICAgICAgXCJkYXRhLXRvZ2dsZVwiOiBcIm1vZGFsXCIsICBcXFxuICAgICAgICAgICAgICAgICAgICAgXCJkYXRhLXRhcmdldFwiOiBcIiNjb25maXJtTW9kYWxcIiwgIFxcXG4gICAgICAgICAgICAgICAgICAgICBcImNsYXNzTmFtZVwiOiBcIm1hdGVyaWFsLWljb25zXCJ9LCBcIlwiXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZVxuXCJcIlwiKVxuICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoRGVsZXRlQ29uZmlybSwge1wiaGFuZGxlXCI6IChBY3Rpb25zLmRlbGV0ZSl9KVxuICAgICAgICAgICAgICAgIClcblxuRWRpdFByb2plY3QgPSBSZWFjdC5jcmVhdGVDbGFzc1xuICAgICAgICByZW5kZXIgOiAtPlxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJhXCIsIHsgXFxcbiAgICAgICAgICAgICAgICAgXCJvbkNsaWNrXCI6IChNb2RhbEFjdGlvbnMuc2V0VHlwZS5iaW5kIG51bGwsIGV2ZW50LCdwdXQnKSwgIFxcXG4gICAgICAgICAgICAgICAgIFwiZGF0YS10b2dnbGVcIjogXCJtb2RhbFwiLCAgXFxcbiAgICAgICAgICAgICAgICAgXCJkYXRhLXRhcmdldFwiOiBcIiNhZGRQcm9qZWN0XCIsICBcXFxuICAgICAgICAgICAgICAgICBcImNsYXNzTmFtZVwiOiBcIm1hdGVyaWFsLWljb25zXCJ9LCBcIlwiXCJcbiAgICAgICAgICAgICAgICAgICAgZWRpdFxuXCJcIlwiKVxuXG5Qcm9qZWN0ID0gUmVhY3QuY3JlYXRlQ2xhc3NcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlbmRlcjogLT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImxpXCIsIHsgXFxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwib25DbGlja1wiOiAoQHByb3BzLm9uQ2xpY2suYmluZCBudWxsLEBwcm9wcy5pZCksICBcXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjbGFzc05hbWVcIjogXCJcIiwgIFxcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImFyaWEtbGFiZWxsZWRieVwiOiBcImRyb3Bkb3duTWVudVwifSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJhXCIsIG51bGwsIChAcHJvcHMubmFtZSkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcblxuUHJvamVjdExpc3QgPSBSZWFjdC5jcmVhdGVDbGFzc1xuICAgICAgICAgICAgICAgICAgICAgICAgbWl4aW5zOiBbUmVmbHV4LmNvbm5lY3QoU3RvcmUsICdkYXRhJyldXG4gICAgICAgICAgICAgICAgICAgICAgICByZW5kZXI6IC0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnQgPSBAc3RhdGUuZGF0YS5jdXJyZW50XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2plY3RzID0gQHN0YXRlLmRhdGEucHJvamVjdHNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGlzdCA9IFtdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciBrLHByb2plY3Qgb2YgcHJvamVjdHNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaXN0LnB1c2ggUmVhY3QuY3JlYXRlRWxlbWVudChQcm9qZWN0LCB7IFxcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImlkXCI6IChrKSwgIFxcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImtleVwiOiAoayksICBcXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJuYW1lXCI6IChwcm9qZWN0Lm5hbWUpLCAgXFxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwib25DbGlja1wiOiAoQWN0aW9ucy5jaGFuZ2VDdXJyZW50KX0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge1wiY2xhc3NOYW1lXCI6IFwiYnRuLWdyb3VwXCIsIFwicm9sZVwiOiBcImdyb3VwXCIsIFwiYXJpYS1sYWJlbFwiOiBcIi4uLlwifSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge1wiY2xhc3NOYW1lXCI6IFwiZHJvcGRvd25cIn0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiLCB7IFxcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImJ1dHRvblwiLCAgXFxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjbGFzc05hbWVcIjogXCJidG4gYnRuLWRlZmF1bHQgZHJvcGRvd24tdG9nZ2xlXCIsICBcXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImlkXCI6IFwiZHJvcGRvd25NZW51XCIsICBcXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImRhdGEtdG9nZ2xlXCI6IFwiZHJvcGRvd25cIiwgIFxcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYXJpYS1oYXNwb3B1cFwiOiBcInRydWVcIiwgIFxcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYXJpYS1leHBhbmRlZFwiOiBcInRydWVcIn0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJwXCIsIG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAocHJvamVjdHNbY3VycmVudF0ubmFtZSBpZiBwcm9qZWN0cy5sZW5ndGggaXNudCAwKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIHtcImNsYXNzTmFtZVwiOiBcImNhcmV0XCJ9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIsIHtcInR5cGVcIjogXCJidXR0b25cIiwgXCJjbGFzc05hbWVcIjogXCJidG4gYnRuLWRlZmF1bHRcIn0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoRWRpdFByb2plY3QsIHtcInByb2plY3RcIjogKHByb2plY3RzW2N1cnJlbnRdKX0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KERlbGV0ZVByb2plY3QsIG51bGwpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIiwge1widHlwZVwiOiBcImJ1dHRvblwiLCBcImNsYXNzTmFtZVwiOiBcImJ0biBidG4tZGVmYXVsdFwifSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChBZGRQcm9qZWN0LCBudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInVsXCIsIHtcImNsYXNzTmFtZVwiOiBcImRyb3Bkb3duLW1lbnVcIn0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAobGlzdClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcblxuXG5tb2R1bGUuZXhwb3J0cyA9IFByb2plY3RMaXN0XG4iLCJBY3Rpb25zID0gcmVxdWlyZSAnLi4vYWN0aW9ucy9wcm9qZWN0LW1vZGFsJ1xuU3RvcmUgPSByZXF1aXJlICcuLi9zdG9yZXMvcHJvamVjdC1tb2RhbCdcblxuTW9kYWwgPSByZXF1aXJlICcuL21vZGFsJ1xuXG5UZXh0SW5wdXQgPSBSZWFjdC5jcmVhdGVDbGFzc1xuICAgIHJlbmRlciA6IC0+XG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge1wiY2xhc3NOYW1lXCI6IFwiZm9ybS1ncm91cFwifSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJsYWJlbFwiLCB7XCJodG1sRm9yXCI6IChAcHJvcHMuaWQpfSxcbiAgICAgICAgICAgICAgICAoQHByb3BzLnBsYWNlaG9sZGVyKVxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiLCB7IFxcXG4gICAgICAgICAgICAgXCJvbkNoYW5nZVwiOiAoKChlKSAtPlxuICAgICAgICAgICAgICAgQHByb3BzLm9uQ2hhbmdlIGUudGFyZ2V0LnZhbHVlKS5iaW5kIEApLCAgXFxcbiAgICAgICAgICAgICBcInZhbHVlXCI6IChAcHJvcHMudGV4dCksICBcXFxuICAgICAgICAgICAgIFwidHlwZVwiOiBcInRleHRcIiwgIFxcXG4gICAgICAgICAgICAgXCJjbGFzc05hbWVcIjogXCJmb3JtLWNvbnRyb2xcIiwgIFxcXG4gICAgICAgICAgICAgXCJpZFwiOiAoQHByb3BzLmlkKSwgIFxcXG4gICAgICAgICAgICAgXCJwbGFjZWhvbGRlclwiOiAoQHByb3BzLnBsYWNlaG9sZGVyKSwgIFxcXG4gICAgICAgICAgICAgXCJyZXF1aXJlZFwiOiAoQHByb3BzLnJlcXVpcmVkKX0pXG4gICAgICAgIClcblxuTWVtYmVyID0gUmVhY3QuY3JlYXRlQ2xhc3NcbiAgICAgICAgcmVuZGVyIDogLT5cbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtcImNsYXNzTmFtZVwiOiBcInJvd1wifSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge1wiY2xhc3NOYW1lXCI6IFwiY29sLW1kLTExXCJ9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIiwgeyBcXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJvbkNoYW5nZVwiOiAoKChlKS0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFjdGlvbnMuaGFuZGxlTWVtYmVyKEBwcm9wcy5pZCwgZS50YXJnZXQudmFsdWUpKS5iaW5kIEApLCAgXFxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogKEBwcm9wcy5uYW1lKSwgIFxcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJ0ZXh0XCIsICBcXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjbGFzc05hbWVcIjogXCJmb3JtLWNvbnRyb2xcIiwgIFxcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInBsYWNlaG9sZGVyXCI6IFwiTm9tXCJ9KVxuICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge1wiY2xhc3NOYW1lXCI6IFwiY29sLW1kLTFcIn0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJpXCIsIHsgXFxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY2xhc3NOYW1lXCI6IFwibWF0ZXJpYWwtaWNvbnNcIiwgIFxcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIm9uQ2xpY2tcIjogKE1vZGFsQWN0aW9ucy5kZWxldGVNZW1iZXIuYmluZCBudWxsLCBAcHJvcHMuaWQpfSwgXCJcIlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWxldGVcblwiXCJcIilcbiAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICApXG5cbk1lbWJlcnNJbnB1dCA9IFJlYWN0LmNyZWF0ZUNsYXNzXG4gICAgICAgIHJlbmRlcjogLT5cbiAgICAgICAgICAgICAgICBtZW1iZXJWaWV3cyA9IFtdXG4gICAgICAgICAgICAgICAgZm9yIGssdiBvZiBAcHJvcHMubWVtYmVyc1xuICAgICAgICAgICAgICAgICAgICAgICAgbWVtYmVyVmlld3MucHVzaCBSZWFjdC5jcmVhdGVFbGVtZW50KE1lbWJlciwgeyBcXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJuYW1lXCI6ICh2KSwgIFxcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImlkXCI6IChrKSwgIFxcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImtleVwiOiAoayl9KVxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge1wiY2xhc3NOYW1lXCI6IFwiZm9ybS1ncm91cFwifSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImxhYmVsXCIsIG51bGwsIFwiQ29sbGFib3JhdGV1cnNcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChtZW1iZXJWaWV3cyksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJpXCIsIHtcImNsYXNzTmFtZVwiOiBcIm1hdGVyaWFsLWljb25zXCIsIFwib25DbGlja1wiOiAoQWN0aW9ucy5hZGRNZW1iZXIpfSwgXCJcIlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWRkXG5cIlwiXCIpXG4gICAgICAgICAgICAgICAgKVxuXG5cbkZvcm0gPSBSZWFjdC5jcmVhdGVDbGFzc1xuICAgIG1peGluczogW1JlZmx1eC5jb25uZWN0KFN0b3JlLCAncHJvamVjdCcpXVxuICAgIHJlbmRlciA6IC0+XG4gICAgICAgIHByb2plY3QgPSBAc3RhdGUucHJvamVjdFxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZm9ybVwiLCB7XCJvblN1Ym1pdFwiOiAoKGUpIC0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpICNwb3VyIMOpdml0ZXIgZGUgcmVjaGFyZ2VyIGxhIHBhZ2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBBY3Rpb25zLnN1Ym1pdCBlKX0sXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRleHRJbnB1dCwge1wib25DaGFuZ2VcIjogKEFjdGlvbnMuaGFuZGxlTmFtZSksIFwidGV4dFwiOiAocHJvamVjdC5uYW1lKSwgXCJpZFwiOiBcImlucHV0TmFtZVwiLCBcInBsYWNlaG9sZGVyXCI6IFwiTm9tXCIsIFwicmVxdWlyZWRcIjogXCJyZXF1aXJlZFwifSksXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRleHRJbnB1dCwge1wib25DaGFuZ2VcIjogKEFjdGlvbnMuaGFuZGxlRGVzY3JpcHRpb24pLCBcInRleHRcIjogKHByb2plY3QuZGVzY3JpcHRpb24pLCBcImlkXCI6IFwiaW5wdXREZXNjcmlwdGlvblwiLCBcInBsYWNlaG9sZGVyXCI6IFwiRGVzY3JpcHRpb25cIn0pLFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUZXh0SW5wdXQsIHtcIm9uQ2hhbmdlXCI6IChBY3Rpb25zLmhhbmRsZVJlcG8pLCBcInRleHRcIjogKHByb2plY3QuZ2l0X3JlcG8pLCBcImlkXCI6IFwiaW5wdXRSZXBvXCIsIFwicGxhY2Vob2xkZXJcIjogXCJEw6lwb3QgZ2l0XCJ9KSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoTWVtYmVyc0lucHV0LCB7XCJtZW1iZXJzXCI6IChwcm9qZWN0Lm1lbWJlcnMpfSksXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIsIHtcInR5cGVcIjogXCJidXR0b25cIiwgXCJjbGFzc05hbWVcIjogXCJidG4gYnRuLWRlZmF1bHRcIiwgXCJkYXRhLWRpc21pc3NcIjogXCJtb2RhbFwifSwgXCJGZXJtZXJcIiksXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIsIHtcInR5cGVcIjogXCJzdWJtaXRcIiwgXCJjbGFzc05hbWVcIjogXCJidG4gYnRuLXByaW1hcnlcIn0sIFwiQXBwbGlxdWVyXCIpXG4gICAgICAgIClcblxuUHJvamVjdE1vZGFsID0gUmVhY3QuY3JlYXRlQ2xhc3NcbiAgICByZW5kZXIgOiAtPlxuICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoRm9ybSwgbnVsbClcblxubW9kdWxlLmV4cG9ydHMgPSBQcm9qZWN0TW9kYWwiLCJBY3Rpb25zID0gcmVxdWlyZSAnLi4vYWN0aW9ucy9wcm9qZWN0J1xuU3RvcmUgPSByZXF1aXJlICcuLi9zdG9yZXMvcHJvamVjdCdcblxuU3ByaW50TGlzdCA9IHJlcXVpcmUgJy4vc3ByaW50LWxpc3QnXG5cblRhYk5hdiA9IFJlYWN0LmNyZWF0ZUNsYXNzXG4gICAgcmVuZGVyOiAtPlxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwibmF2XCIsIHtcInJvbGVcIjogXCJuYXZpZ2F0aW9uXCJ9LFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInVsXCIsIHtcImNsYXNzTmFtZVwiOiBcIm5hdiBuYXYtdGFic1wifSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwibGlcIiwgeyBcXFxuICAgICAgICAgICAgICAgICBcIm9uQ2xpY2tcIjogKEFjdGlvbnMuc2VsZWN0QmFja2xvZyksICBcXFxuICAgICAgICAgICAgICAgICBcInJvbGVcIjogXCJwcmVzZW50YXRpb25cIiwgIFxcXG4gICAgICAgICAgICAgICAgIFwiY2xhc3NOYW1lXCI6ICgnYWN0aXZlJyBpZiBAcHJvcHMuYmFja2xvZyl9LFxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImFcIiwgbnVsbCwgXCJCYWNrbG9nXCIpXG4gICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwibGlcIiwgeyBcXFxuICAgICAgICAgICAgICAgICBcIm9uQ2xpY2tcIjogKEFjdGlvbnMuc2VsZWN0U3ByaW50cyksICBcXFxuICAgICAgICAgICAgICAgICBcInJvbGVcIjogXCJwcmVzZW50YXRpb25cIiwgIFxcXG4gICAgICAgICAgICAgICAgIFwiY2xhc3NOYW1lXCI6ICgnYWN0aXZlJyBpZiBub3QgQHByb3BzLmJhY2tsb2cpfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJhXCIsIG51bGwsIFwiU3ByaW50c1wiKVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgIClcbiAgICAgICAgKVxuXG5UYWJDb250ZW50ID0gUmVhY3QuY3JlYXRlQ2xhc3NcbiAgICByZW5kZXI6IC0+XG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgbnVsbCxcbiAgICAgICAgICAgIChSZWFjdC5jcmVhdGVFbGVtZW50KFNwcmludExpc3QsIG51bGwpIGlmIG5vdCBAcHJvcHMuYmFja2xvZylcbiAgICAgICAgKVxuXG5Qcm9qZWN0ID0gUmVhY3QuY3JlYXRlQ2xhc3NcbiAgICBtaXhpbnM6IFtSZWZsdXguY29ubmVjdChTdG9yZSwgJ2RhdGEnKV1cbiAgICByZW5kZXI6IC0+XG4gICAgICAgIGJhY2tsb2cgPSBAc3RhdGUuZGF0YS5iYWNrbG9nXG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgbnVsbCxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGFiTmF2LCB7XCJiYWNrbG9nXCI6IChiYWNrbG9nKX0pLFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUYWJDb250ZW50LCB7XCJiYWNrbG9nXCI6IChiYWNrbG9nKX0pXG4gICAgICAgIClcblxubW9kdWxlLmV4cG9ydHMgPSBQcm9qZWN0XG4iLCJTdG9yZSA9IHJlcXVpcmUgJy4uL3N0b3Jlcy9zcHJpbnQtbGlzdCdcbkFjdGlvbnMgPSByZXF1aXJlICcuLi9hY3Rpb25zL3NwcmludC1saXN0J1xuXG5Nb2RhbEFjdGlvbnMgPSByZXF1aXJlICcuLi9hY3Rpb25zL3NwcmludC1tb2RhbCdcblxuU3ByaW50ID0gUmVhY3QuY3JlYXRlQ2xhc3NcbiAgICByZW5kZXI6IC0+XG4gICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtcImNsYXNzTmFtZVwiOiBcInBhbmVsIHBhbmVsLXByaW1hcnlcIn0sXG4gICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7XCJjbGFzc05hbWVcIjogXCJwYW5lbC1oZWFkaW5nXCJ9LFxuICAgICAgICAgICAgICAoQHByb3BzLmlkKVxuICAgICAgICAgICksXG4gICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7XCJjbGFzc05hbWVcIjogXCJwYW5lbC1ib2R5XCJ9LFxuICAgICAgICAgICAgICAoQHByb3BzLnN0YXJ0KVxuICAgICAgICAgIClcbiAgICAgIClcblxuU3ByaW50TGlzdCA9IFJlYWN0LmNyZWF0ZUNsYXNzXG4gICAgbWl4aW5zOiBbUmVmbHV4LmNvbm5lY3QoU3RvcmUsICdsaXN0JyldXG4gICAgcmVuZGVyOiAtPlxuICAgICAgICBjb25zb2xlLmxvZyBAc3RhdGUubGlzdFxuICAgICAgICBpdGVtcyA9IEBzdGF0ZS5saXN0Lm1hcCAoaSkgLT4gUmVhY3QuY3JlYXRlRWxlbWVudChTcHJpbnQsIHtcImtleVwiOiAoaS5pZCksIFwiaWRcIjogKGkuaWQpLCBcInN0YXJ0XCI6IChpLnN0YXJ0KX0pXG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge1wiY2xhc3NOYW1lXCI6IFwibGlzdC1ncm91cFwifSxcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiLCB7XCJ0eXBlXCI6IFwiYnV0dG9uXCIsIFwiY2xhc3NOYW1lXCI6IFwiYnRuIGJ0bi1kZWZhdWx0XCJ9LFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImFcIiwgeyBcXFxuICAgICAgICAgICAgIFwib25DbGlja1wiOiAoKGUpLT4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgIE1vZGFsQWN0aW9ucy5hZGQpKSwgIFxcXG4gICAgICAgICAgICAgXCJkYXRhLXRvZ2dsZVwiOiBcIm1vZGFsXCIsICBcXFxuICAgICAgICAgICAgIFwiZGF0YS10YXJnZXRcIjogXCIjYWRkU3ByaW50XCIsICBcXFxuICAgICAgICAgICAgIFwiY2xhc3NOYW1lXCI6IFwibWF0ZXJpYWwtaWNvbnNcIn0sIFwiXCJcIlxuICAgICAgICAgICAgICAgIGFkZFxuXCJcIlwiKVxuICAgICAgICApLFxuXG4gICAgICAgICAgICAoaXRlbXMpXG4gICAgICAgIClcblxubW9kdWxlLmV4cG9ydHMgPSBTcHJpbnRMaXN0XG4iLCJTdG9yZSA9IHJlcXVpcmUgJy4uL3N0b3Jlcy9zcHJpbnQtbW9kYWwnXG5BY3Rpb25zID0gcmVxdWlyZSAnLi4vYWN0aW9ucy9zcHJpbnQtbW9kYWwnXG5cbk1vZGFsID0gcmVxdWlyZSAnLi9tb2RhbCdcblxuVGV4dElucHV0ID0gUmVhY3QuY3JlYXRlQ2xhc3NcbiAgICByZW5kZXIgOiAtPlxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtcImNsYXNzTmFtZVwiOiBcImZvcm0tZ3JvdXBcIn0sXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwibGFiZWxcIiwge1wiaHRtbEZvclwiOiAoQHByb3BzLmlkKX0sXG4gICAgICAgICAgICAgICAgKEBwcm9wcy5wbGFjZWhvbGRlcilcbiAgICAgICAgICAgICksXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIiwgeyBcXFxuICAgICAgICAgICAgIFwib25DaGFuZ2VcIjogKCgoZSkgLT5cbiAgICAgICAgICAgICAgIEBwcm9wcy5vbkNoYW5nZSBlLnRhcmdldC52YWx1ZSkuYmluZCBAKSwgIFxcXG4gICAgICAgICAgICAgXCJ2YWx1ZVwiOiAoQHByb3BzLnRleHQpLCAgXFxcbiAgICAgICAgICAgICBcInR5cGVcIjogXCJ0ZXh0XCIsICBcXFxuICAgICAgICAgICAgIFwiY2xhc3NOYW1lXCI6IFwiZm9ybS1jb250cm9sXCIsICBcXFxuICAgICAgICAgICAgIFwiaWRcIjogKEBwcm9wcy5pZCksICBcXFxuICAgICAgICAgICAgIFwicGxhY2Vob2xkZXJcIjogKEBwcm9wcy5wbGFjZWhvbGRlciksICBcXFxuICAgICAgICAgICAgIFwicmVxdWlyZWRcIjogKEBwcm9wcy5yZXF1aXJlZCl9KVxuICAgICAgICApXG5cblNwcmludEZvcm0gPSBSZWFjdC5jcmVhdGVDbGFzc1xuICAgIG1peGluczogW1JlZmx1eC5jb25uZWN0KFN0b3JlLCAnc3ByaW50JyldXG4gICAgcmVuZGVyIDogLT5cbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImZvcm1cIiwge1wib25TdWJtaXRcIjogKChlKSAtPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKSAjcG91ciDDqXZpdGVyIGRlIHJlY2hhcmdlciBsYSBwYWdlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQWN0aW9ucy5zdWJtaXQgZSl9LFxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUZXh0SW5wdXQsIHtcIm9uQ2hhbmdlXCI6IChBY3Rpb25zLmhhbmRsZU5hbWUpLCBcInRleHRcIjogKEBzdGF0ZS5zcHJpbnQuaWQpLCBcImlkXCI6IFwiaW5wdXROYW1lXCIsIFwicGxhY2Vob2xkZXJcIjogXCJOb21cIiwgXCJyZXF1aXJlZFwiOiBcInJlcXVpcmVkXCJ9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge1wiY2xhc3NOYW1lXCI6IFwiZm9ybS1ncm91cFwifSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJsYWJlbFwiLCB7XCJodG1sRm9yXCI6IFwiaW5wdXREYXRlXCJ9LCBcIlwiXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBEYXRlIGRlIGTDqWJ1dFxuXCJcIlwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiLCB7IFxcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJvbkNoYW5nZVwiOiAoKChlKSAtPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQWN0aW9ucy5oYW5kbGVEYXRlIGUudGFyZ2V0LnZhbHVlKS5iaW5kIEApLCAgXFxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IChAc3RhdGUuc3ByaW50LnN0YXJ0KSwgIFxcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiZGF0ZVwiLCAgXFxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNsYXNzTmFtZVwiOiBcImZvcm0tY29udHJvbFwiLCAgXFxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImlkXCI6IFwiaW5wdXREYXRlXCIsICBcXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicmVxdWlyZWRcIjogXCJyZXF1aXJlZFwifSlcbiAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIsIHsgXFxcbiAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJidXR0b25cIiwgIFxcXG4gICAgICAgICAgICAgICAgICAgICAgICAgXCJjbGFzc05hbWVcIjogXCJidG4gYnRuLWRlZmF1bHRcIiwgIFxcXG4gICAgICAgICAgICAgICAgICAgICAgICAgXCJkYXRhLWRpc21pc3NcIjogXCJtb2RhbFwifSwgXCJcIlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgQW5udWxlclxuXCJcIlwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIiwgeyBcXFxuICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInN1Ym1pdFwiLCAgXFxcbiAgICAgICAgICAgICAgICAgICAgICAgICBcImNsYXNzTmFtZVwiOiBcImJ0biBidG4tcHJpbWFyeVwiLCAgXFxcbiAgICAgICAgICAgICAgICAgICAgICAgICBcIm9uQ2xpY2tcIjogKEBwcm9wcy5oYW5kbGUpfSwgXCJcIlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgQXBwbGlxdWVyXG5cIlwiXCIpXG4gICAgICAgICAgICAgICAgICAgIClcblxuXG5TcHJpbnRNb2RhbCA9IFJlYWN0LmNyZWF0ZUNsYXNzXG4gICAgcmVuZGVyIDogLT5cbiAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFNwcmludEZvcm0sIG51bGwpXG5cblxubW9kdWxlLmV4cG9ydHMgPSBTcHJpbnRNb2RhbCIsIlByb2plY3RMaXN0ID0gcmVxdWlyZSAnLi9jb21wb25lbnRzL3Byb2plY3QtbGlzdCdcblByb2plY3QgPSByZXF1aXJlICcuL2NvbXBvbmVudHMvcHJvamVjdCdcbk1vZGFsTGlzdCA9IHJlcXVpcmUgJy4vY29tcG9uZW50cy9tb2RhbC1saXN0J1xuUHJvamVjdE1vZGFsID0gcmVxdWlyZSAnLi9jb21wb25lbnRzL3Byb2plY3QtbW9kYWwnXG5TcHJpbnQgPSByZXF1aXJlICcuL2NvbXBvbmVudHMvc3ByaW50LW1vZGFsJ1xuUm91dGVyID0gUmVhY3RSb3V0ZXIuUm91dGVyXG5Sb3V0ZSA9IFJlYWN0Um91dGVyLlJvdXRlXG5MaW5rID0gUmVhY3RSb3V0ZXIuTGlua1xuXG5QYW5lbCA9IFJlYWN0LmNyZWF0ZUNsYXNzXG4gIHJlbmRlcjogLT5cbiAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIG51bGwsXG4gICAgICAodGhpcy5wcm9wcy5jaGlsZHJlbilcbiAgICApXG5cbkluZGV4ID0gUmVhY3QuY3JlYXRlQ2xhc3NcbiAgcmVuZGVyOiAtPlxuICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIG51bGwsXG4gICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFByb2plY3RMaXN0LCBudWxsKSxcbiAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoUHJvamVjdCwgbnVsbCksXG4gICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KE1vZGFsTGlzdCwgbnVsbClcbiAgICAgICAgICAgICAgKVxuXG5NYWluID0gUmVhY3QuY3JlYXRlQ2xhc3NcbiAgICAgICAgcmVuZGVyIDogLT5cbiAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChSb3V0ZXIsIG51bGwsXG4gICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChSb3V0ZSwge1wicGF0aFwiOiBcIi9cIiwgXCJjb21wb25lbnRcIjogKFBhbmVsKX0sXG4gICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFJvdXRlLCB7XCJwYXRoXCI6IFwiaW5kZXhcIiwgXCJjb21wb25lbnRcIjogKEluZGV4KX0pLFxuICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChSb3V0ZSwge1wicGF0aFwiOiBcImFkZFByb2plY3RcIiwgXCJjb21wb25lbnRcIjogKFByb2plY3RNb2RhbCl9KSxcbiAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoUm91dGUsIHtcInBhdGhcIjogXCJhZGRTcHJpbnRcIiwgXCJjb21wb25lbnRcIjogKFNwcmludCl9KVxuICAgICAgICAgICAgIClcbiAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAjPFJvdXRlcj5cblxuICAgICAgICAgICAgIyAgPFJvdXRlIHBhdGg9XCIvXCIgY29tcG9uZW50PXtQYW5lbH0+XG4gICAgICAgICAgICAjICAgIDxSb3V0ZSBwYXRoPVwicHJvamVjdHNcIiBjb21wb25lbnQ9e1Byb2plY3RMaXN0fS8+XG4gICAgICAgICAgICAjICAgIDxSb3V0ZSBwYXRoPVwicHJvamVjdFwiIGNvbXBvbmVudD17UHJvamVjdH0vPlxuICAgICAgICAgICAgIyAgICA8Um91dGUgcGF0aD1cImFkZFwiIGNvbXBvbmVudD17UHJvamVjdE1vZGFsfS8+XG4gICAgICAgICAgICAjICA8L1JvdXRlPlxuICAgICAgICAgICAgIzwvUm91dGVyPlxuXG5SZWFjdC5yZW5kZXIgUmVhY3QuY3JlYXRlRWxlbWVudChNYWluLCBudWxsKSwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRlbnQnKSIsIkFjdGlvbnMgPSByZXF1aXJlICcuLi9hY3Rpb25zL3Byb2plY3QtbGlzdCdcblByb2plY3RBY3Rpb25zID0gcmVxdWlyZSAnLi4vYWN0aW9ucy9wcm9qZWN0J1xuXG5Qcm9qZWN0TGlzdCA9IFJlZmx1eC5jcmVhdGVTdG9yZVxuICAgICAgICBnZXRJbml0aWFsU3RhdGU6IC0+XG4gICAgICAgICAgICAgICAgQGRhdGFcbiAgICAgICAgY2hhbmdlQ3VycmVudDogKGlkKSAtPlxuICAgICAgICAgICAgICAgIEBkYXRhLmN1cnJlbnQgPSBpZFxuICAgICAgICAgICAgICAgIEB0cmlnZ2VyIEBkYXRhXG4gICAgICAgICAgICAgICAgUHJvamVjdEFjdGlvbnMuc2V0Q3VycmVudFByb2plY3QgQGRhdGEucHJvamVjdHNbQGRhdGEuY3VycmVudF1cbiAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgIHByb2plY3RzOiBbXSxcbiAgICAgICAgICAgICAgICBjdXJyZW50OiAwXG4gICAgICAgIH0sXG4gICAgICAgIGxpc3RlbmFibGVzOiBbQWN0aW9uc10sXG4gICAgICAgIHNyY1VybDogJy93cy9hcGkvdjEvcHJvamVjdHMnLFxuICAgICAgICBpbml0OiAtPlxuICAgICAgICAgICAgICAgIEBmZXRjaExpc3QoKVxuICAgICAgICBkZWxldGU6IC0+XG4gICAgICAgICAgICBpZCA9IEBkYXRhLnByb2plY3RzW0BkYXRhLmN1cnJlbnRdLl9pZFxuICAgICAgICAgICAgcmVxdWVzdCA9IHN1cGVyYWdlbnRcbiAgICAgICAgICAgIHJlcXVlc3RcbiAgICAgICAgICAgICAgICAgICAgLmRlbGV0ZSBAc3JjVXJsICsgJy8nICsgaWRcbiAgICAgICAgICAgICAgICAgICAgLmVuZCAoKGVycixyZXMpIC0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgcmVzLm9rXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBAZGF0YS5wcm9qZWN0c1tAZGF0YS5jdXJyZW50XVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBAY2hhbmdlQ3VycmVudCAwXG4gICAgICAgICAgICAgICAgICAgICkuYmluZCBAXG5cbiAgICAgICAgZmV0Y2hMaXN0OiAtPlxuICAgICAgICAgICAgICAgIHJlcXVlc3QgPSBzdXBlcmFnZW50XG4gICAgICAgICAgICAgICAgcmVxdWVzdFxuICAgICAgICAgICAgICAgICAgICAgICAgLmdldCBAc3JjVXJsXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWNjZXB0ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgICAgICAgICAgICAgICAgICAgLmVuZCAoKGVycixyZXMpIC0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIHJlcy5va1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEBkYXRhLnByb2plY3RzID0gcmVzLmJvZHlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBAY2hhbmdlQ3VycmVudCAwXG4gICAgICAgICAgICAgICAgICAgICAgICApLmJpbmQgQFxuXG5tb2R1bGUuZXhwb3J0cyA9IFByb2plY3RMaXN0XG4iLCJBY3Rpb25zID0gcmVxdWlyZSAnLi4vYWN0aW9ucy9wcm9qZWN0LW1vZGFsJ1xuXG5Nb2RhbFN0b3JlID0gUmVmbHV4LmNyZWF0ZVN0b3JlXG4gICAgICAgIGxpc3RlbmFibGVzOiBbQWN0aW9uc11cbiAgICAgICAgdHlwZTogJ3Bvc3QnXG4gICAgICAgIG5ld1Byb2plY3Q6IHtcbiAgICAgICAgICAgICAgICBuYW1lOiAnJyxcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogJycsXG4gICAgICAgICAgICAgICAgZ2l0X3JlcG86ICcnLFxuICAgICAgICAgICAgICAgIG1lbWJlcnM6IFtdLFxuICAgICAgICAgICAgICAgIGJhY2tsb2c6IFtdLFxuICAgICAgICAgICAgICAgIHNwcmludHM6IFtdXG4gICAgICAgIH1cbiAgICAgICAgY3VycmVudFByb2plY3Q6IHt9XG4gICAgICAgIHNob3dlZFByb2plY3Q6IHt9XG4gICAgICAgIGdldEluaXRpYWxTdGF0ZTogLT5cbiAgICAgICAgICAgICAgICBAbmV3UHJvamVjdFxuICAgICAgICBzZXRUeXBlOiAoZSx0eXBlKSAtPlxuICAgICAgICAgICAgICAgIGlmIHR5cGUgPT0gJ3B1dCdcbiAgICAgICAgICAgICAgICAgIEBzaG93ZWRQcm9qZWN0ID0gQGN1cnJlbnRQcm9qZWN0XG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgQHNob3dlZFByb2plY3QgPSBAbmV3UHJvamVjdFxuICAgICAgICAgICAgICAgIEB0eXBlID0gdHlwZVxuICAgICAgICAgICAgICAgIEB0cmlnZ2VyIEBzaG93ZWRQcm9qZWN0XG4gICAgICAgIHNldEN1cnJlbnRQcm9qZWN0OiAocCkgLT5cbiAgICAgICAgICAgICAgICBAY3VycmVudFByb2plY3QgPSBwIGlmIHA/XG4gICAgICAgIHN1Ym1pdDogKGUpIC0+XG4gICAgICAgICAgICAgICAgc3dpdGNoIEB0eXBlXG4gICAgICAgICAgICAgICAgICB3aGVuICdwb3N0JyB0aGVuIEBzZW5kIGVcbiAgICAgICAgICAgICAgICAgIHdoZW4gJ3B1dCcgdGhlbiBAdXBkYXRlIGVcbiAgICAgICAgICAgICAgICAgIGVsc2UgY29uc29sZS5sb2cgJ3dyb25nIHJlcXVlc3QgdHlwZSdcbiAgICAgICAgdXBkYXRlOiAoZSkgLT5cbiAgICAgICAgICAgICAgICByZXF1ZXN0ID0gc3VwZXJhZ2VudFxuICAgICAgICAgICAgICAgIHJlcXVlc3RcbiAgICAgICAgICAgICAgICAgICAgICAgIC5wdXQgJy93cy9hcGkvdjEvcHJvamVjdC8nICsgQGN1cnJlbnRQcm9qZWN0Ll9pZFxuICAgICAgICAgICAgICAgICAgICAgICAgLnR5cGUgJ2pzb24nXG4gICAgICAgICAgICAgICAgICAgICAgICAuc2VuZCBAY3VycmVudFByb2plY3RcbiAgICAgICAgICAgICAgICAgICAgICAgIC5lbmQgKChlcnIscmVzKSAtPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyAnZGF0YSB1cGRhdGVkJyBpZiByZXMub2tcbiAgICAgICAgICAgICAgICAgICAgICAgICkuYmluZCBAXG4gICAgICAgICAgICAgICAgJChcIiNhZGRNb2RhbFwiKS5tb2RhbCAnaGlkZSdcbiAgICAgICAgc2VuZDogKGUpIC0+XG4gICAgICAgICAgICAgICAgcmVxdWVzdCA9IHN1cGVyYWdlbnRcbiAgICAgICAgICAgICAgICByZXF1ZXN0XG4gICAgICAgICAgICAgICAgICAgICAgICAucG9zdCAnL2FwaS92MS9wcm9qZWN0J1xuICAgICAgICAgICAgICAgICAgICAgICAgLnR5cGUgJ2pzb24nXG4gICAgICAgICAgICAgICAgICAgICAgICAuc2VuZCBAbmV3UHJvamVjdFxuICAgICAgICAgICAgICAgICAgICAgICAgLmVuZCAoKGVycixyZXMpIC0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nICdkYXRhIHNlbnQnIGlmIHJlcy5va1xuICAgICAgICAgICAgICAgICAgICAgICAgKS5iaW5kIEBcbiAgICAgICAgICAgICAgICAkKFwiI2FkZE1vZGFsXCIpLm1vZGFsICdoaWRlJ1xuICAgICAgICBoYW5kbGVOYW1lOiAodmFsdWUpIC0+XG4gICAgICAgICAgICAgICAgQHNob3dlZFByb2plY3QubmFtZSA9IHZhbHVlXG4gICAgICAgICAgICAgICAgQHRyaWdnZXIgQHNob3dlZFByb2plY3RcbiAgICAgICAgaGFuZGxlRGVzY3JpcHRpb246ICh2YWx1ZSkgLT5cbiAgICAgICAgICAgICAgICBAc2hvd2VkUHJvamVjdC5kZXNjcmlwdGlvbiA9IHZhbHVlXG4gICAgICAgICAgICAgICAgQHRyaWdnZXIgQHNob3dlZFByb2plY3RcbiAgICAgICAgaGFuZGxlUmVwbzogKHZhbHVlKSAtPlxuICAgICAgICAgICAgICAgIEBzaG93ZWRQcm9qZWN0LmdpdF9yZXBvID0gdmFsdWVcbiAgICAgICAgICAgICAgICBAdHJpZ2dlciBAc2hvd2VkUHJvamVjdFxuICAgICAgICBoYW5kbGVNZW1iZXI6IChpbmRleCwgdmFsdWUpIC0+XG4gICAgICAgICAgICAgICAgQHNob3dlZFByb2plY3QubWVtYmVyc1tpbmRleF0gPSB2YWx1ZVxuICAgICAgICAgICAgICAgIEB0cmlnZ2VyIEBzaG93ZWRQcm9qZWN0XG4gICAgICAgIGFkZE1lbWJlcjogLT5cbiAgICAgICAgICAgICAgICBAc2hvd2VkUHJvamVjdC5tZW1iZXJzLnB1c2ggJydcbiAgICAgICAgICAgICAgICBAdHJpZ2dlciBAc2hvd2VkUHJvamVjdFxuICAgICAgICBkZWxldGVNZW1iZXI6IChpbmRleCkgLT5cbiAgICAgICAgICAgICAgICBkZWxldGUgQHNob3dlZFByb2plY3QubWVtYmVyc1tpbmRleF1cbiAgICAgICAgICAgICAgICBAdHJpZ2dlciBAc2hvd2VkUHJvamVjdFxuXG5tb2R1bGUuZXhwb3J0cyA9IE1vZGFsU3RvcmUiLCJBY3Rpb25zID0gcmVxdWlyZSAnLi4vYWN0aW9ucy9wcm9qZWN0J1xuXG5Nb2RhbEFjdGlvbnMgPSByZXF1aXJlICcuLi9hY3Rpb25zL3Byb2plY3QtbW9kYWwnXG5TcHJpbnRMaXN0QWN0aW9ucyA9IHJlcXVpcmUgJy4uL2FjdGlvbnMvc3ByaW50LWxpc3QnXG5cblByb2plY3RTdG9yZSA9IFJlZmx1eC5jcmVhdGVTdG9yZVxuICAgIGxpc3RlbmFibGVzOiBbQWN0aW9uc11cbiAgICBkYXRhOiB7IHByb2plY3Q6IHt9LCBiYWNrbG9nOiB0cnVlIH1cbiAgICBnZXRJbml0aWFsU3RhdGU6IC0+XG4gICAgICAgIEBkYXRhXG4gICAgaW5pdDogLT5cbiAgICAgICAgQHRyaWdnZXIgQGRhdGFcbiAgICBzZWxlY3RCYWNrbG9nOiAtPlxuICAgICAgICBAZGF0YS5iYWNrbG9nID0gdHJ1ZVxuICAgICAgICBAdHJpZ2dlciBAZGF0YVxuICAgIHNlbGVjdFNwcmludHM6IC0+XG4gICAgICAgIEBkYXRhLmJhY2tsb2cgPSBmYWxzZVxuICAgICAgICBAdHJpZ2dlciBAZGF0YVxuICAgIHNldEN1cnJlbnRQcm9qZWN0OiAocCkgLT5cbiAgICAgICAgY29uc29sZS5sb2cgcFxuICAgICAgICBAZGF0YS5wcm9qZWN0ID0gcFxuICAgICAgICBAdHJpZ2dlciBAZGF0YVxuICAgICAgICAjU3ByaW50TGlzdEFjdGlvbnMuc2V0TGlzdCBAZGF0YS5wcm9qZWN0LnNwcmludHNcblxubW9kdWxlLmV4cG9ydHMgPSBQcm9qZWN0U3RvcmVcbiIsIkFjdGlvbnMgPSByZXF1aXJlICcuLi9hY3Rpb25zL3NwcmludC1saXN0J1xuXG5Nb2RhbEFjdGlvbnMgPSByZXF1aXJlICcuLi9hY3Rpb25zL3NwcmludC1tb2RhbCdcblxuU3ByaW50TGlzdFN0b3JlID0gUmVmbHV4LmNyZWF0ZVN0b3JlXG4gICAgbGlzdGVuYWJsZXM6IFtBY3Rpb25zXVxuICAgIGxpc3Q6IFtdXG4gICAgaW5pdDogLT5cbiAgICAgICAgQGZldGNoKClcbiAgICBnZXRJbml0aWFsU3RhdGU6IC0+XG4gICAgICAgIEBsaXN0XG4gICAgc2V0TGlzdDogKGwpIC0+XG4gICAgICAgIEBsaXN0ID0gbFxuICAgICAgICBAZmV0Y2goKVxuICAgIGFkZDogKGUpIC0+XG4gICAgICAgIE1vZGFsQWN0aW9ucy5zZXRUeXBlIGUsICdwb3N0J1xuICAgIGZldGNoOiAtPlxuICAgICAgICBAdHJpZ2dlciBAbGlzdFxuXG5tb2R1bGUuZXhwb3J0cyA9IFNwcmludExpc3RTdG9yZVxuIiwiQWN0aW9ucyA9IHJlcXVpcmUgJy4uL2FjdGlvbnMvc3ByaW50LW1vZGFsJ1xuXG5TcHJpbnRTdG9yZSA9IFJlZmx1eC5jcmVhdGVTdG9yZVxuICAgIGxpc3RlbmFibGVzOiBbQWN0aW9uc11cbiAgICBuZXdTcHJpbnQ6IHtcbiAgICAgICAgaWQ6MCxcbiAgICAgICAgc3RhcnQ6IFwiXCIsXG4gICAgICAgIHRhc2tzOiBbXSxcbiAgICAgICAga2FuYmFuOiB7aWQ6IDAsIHVybDogXCJcIn1cbiAgICB9XG4gICAgcmVxdWVzdDogJ3Bvc3QnXG4gICAgY3VycmVudFNwcmludDoge31cbiAgICBzaG93ZWRTcHJpbnQ6IHt9XG4gICAgZ2V0SW5pdGlhbFN0YXRlOiAtPlxuICAgICAgICBAbmV3U3ByaW50XG4gICAgYWRkOiAoZSkgLT5cbiAgICAgICAgQHJlcXVlc3QgPSAncG9zdCdcbiAgICAgICAgQHNob3dlZFNwcmludCA9IEBuZXdTcHJpbnRcbiAgICAgICAgQHRyaWdnZXIgQHNob3dlZFNwcmludFxuICAgIGVkaXQ6IChlKSAtPlxuICAgICAgICBAcmVxdWVzdCA9ICdwdXQnXG4gICAgICAgIEBzaG93ZWRTcHJpbnQgPSBAY3VycmVudFNwcmludFxuICAgICAgICBAdHJpZ2dlciBAc2hvd2VkU3ByaW50XG4gICAgc2V0Q3VycmVudFNwcmludDogKHMpIC0+XG4gICAgICAgIEBjdXJyZW50U3ByaW50ID0gc1xuICAgIHN1Ym1pdDogKGUpIC0+XG4gICAgICAgIHN3aXRjaCBAcmVxdWVzdFxuICAgICAgICAgICAgd2hlbiAncG9zdCcgdGhlbiBAc2VuZCBlXG4gICAgICAgICAgICB3aGVuICdwdXQnIHRoZW4gQHVwZGF0ZSBlXG4gICAgICAgICAgICBlbHNlIGNvbnNvbGUubG9nICd3cm9uZyByZXF1ZXN0IHR5cGUnXG4gICAgdXBkYXRlOiAoZSkgLT5cbiAgICAgICAgcmVxdWVzdCA9IHN1cGVyYWdlbnRcbiAgICAgICAgcmVxdWVzdFxuICAgICAgICAgICAgLnB1dCAnL3dzL2FwaS92MS9zcHJpbnQvJyArIEBjdXJyZW50U3ByaW50Ll9pZFxuICAgICAgICAgICAgLnR5cGUgJ2pzb24nXG4gICAgICAgICAgICAuc2VuZCBAY3VycmVudFNwcmludFxuICAgICAgICAgICAgLmVuZCAoKGVycixyZXMpIC0+XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cgJ2RhdGEgdXBkYXRlZCcgaWYgcmVzLm9rXG4gICAgICAgICAgICApLmJpbmQgQFxuICAgICAgICAkKFwiI2FkZE1vZGFsXCIpLm1vZGFsICdoaWRlJ1xuICAgIHNlbmQ6IChlKSAtPlxuICAgICAgICByZXF1ZXN0ID0gc3VwZXJhZ2VudFxuICAgICAgICByZXF1ZXN0XG4gICAgICAgICAgICAucG9zdCAnL2FwaS92MS9wcm9qZWN0L3NwLycgKyBsb2NhdGlvbi5oYXNoLnNwbGl0KCdpZD0nKVsxXS5zcGxpdCgnJicpWzBdXG4gICAgICAgICAgICAudHlwZSAnanNvbidcbiAgICAgICAgICAgIC5zZW5kIEBuZXdTcHJpbnRcbiAgICAgICAgICAgIC5lbmQgKChlcnIscmVzKSAtPlxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nICdkYXRhIHNlbnQnIGlmIHJlcy5va1xuICAgICAgICAgICAgKS5iaW5kIEBcbiAgICAgICAgJChcIiNhZGRNb2RhbFwiKS5tb2RhbCAnaGlkZSdcbiAgICBoYW5kbGVEYXRlOiAodmFsdWUpIC0+XG4gICAgICAgIEBzaG93ZWRTcHJpbnQuc3RhcnQgPSB2YWx1ZVxuICAgICAgICBAdHJpZ2dlciBAc2hvd2VkU3ByaW50XG4gICAgaGFuZGxlTmFtZTogKHZhbHVlKSAtPlxuICAgICAgICBAc2hvd2VkU3ByaW50LmlkID0gdmFsdWVcbiAgICAgICAgQHRyaWdnZXIgQHNob3dlZFNwcmludFxuICAgIGhhbmRsZUthbmJhbjogKHZhbHVlKSAtPlxuICAgICAgICBAc2hvd2VkU3ByaW50LmthbmJhbiA9IHZhbHVlXG4gICAgICAgIEB0cmlnZ2VyIEBzaG93ZWRTcHJpbnRcbiAgICB0cmVsbG9Mb2dJbjogKG9uU3VjY2VzcykgLT5cbiAgICAgICAgb25FcnJvciA9ICgpIC0+IGFsZXJ0ICdjb25uZWN0aW9uIHRvIFRyZWxsbyBmYWlsZWQnXG4gICAgICAgIFRyZWxsby5hdXRob3JpemVcbiAgICAgICAgICAgIHR5cGU6IFwicG9wdXBcIixcbiAgICAgICAgICAgIG5hbWU6IFwiU2NydW15IEFwcGxpY2F0aW9uXCIsXG4gICAgICAgICAgICBzY29wZToge1xuICAgICAgICAgICAgICByZWFkOiB0cnVlLFxuICAgICAgICAgICAgICB3cml0ZTogdHJ1ZSB9LFxuICAgICAgICAgICAgZXhwaXJhdGlvbjogXCJuZXZlclwiLFxuICAgICAgICAgICAgc3VjY2Vzczogb25TdWNjZXNzLFxuICAgICAgICAgICAgZXJyb3I6IG9uRXJyb3JcbiAgICBjcmVhdGVLYW5iYW46IC0+XG4gICAgICAgIGthbmJhbiA9IEBzaG93ZWRTcHJpbnQua2FuYmFuXG4gICAgICAgIG9uU3VjY2VzcyA9ICgoKSAtPlxuICAgICAgICAgICAgc2V0Qm9hcmRJZCA9ICgoZGF0YSkgLT4gQGJvYXJkID0gZGF0YS5pZCkuYmluZCBAXG4gICAgICAgICAgICBjb25zb2xlLmxvZyBAYm9hcmRcbiAgICAgICAgICAgIHNldExpc3RJZCA9ICgoZGF0YSkgLT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrYW5iYW4uaWQgPSBkYXRhLmlkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAga2FuYmFuLnVybCA9IGRhdGEudXJsXG4gICAgICAgICAgICApLmJpbmQgQFxuICAgICAgICAgICAgVHJlbGxvLnBvc3QgJy9ib2FyZHMnLCB7IG5hbWU6IEBzaG93ZWRTcHJpbnQuaWQgKyBcIiAtIFwiICsgQHNob3dlZFNwcmludC5zdGFydCB9LCBzZXRCb2FyZElkXG4gICAgICAgICAgICBUcmVsbG8ucG9zdCAnL2xpc3RzJywgeyBuYW1lOiBcIlRvZG9cIiwgaWRCb2FyZDogQGJvYXJkIH0sIHNldExpc3RJZFxuICAgICAgICAgICAgVHJlbGxvLnBvc3QgJy9saXN0cycsIHsgbmFtZTogXCJPbmdvaW5nXCIsIGlkQm9hcmQ6IEBib2FyZCB9XG4gICAgICAgICAgICBUcmVsbG8ucG9zdCAnL2xpc3RzJywgeyBuYW1lOiBcIkRvbmVcIiwgaWRCb2FyZDogQGJvYXJkIH1cbiAgICAgICAgKS5iaW5kIEBcbiAgICAgICAgQHRyZWxsb0xvZ0luIG9uU3VjY2Vzc1xuICAgIGNyZWF0ZUNhcmQ6IChuYW1lKSAtPlxuICAgICAgICBvblN1Y2Nlc3MgPSAoKCkgLT5cbiAgICAgICAgICAgIFRyZWxsby5wb3N0ICcvY2FyZHMnICwgeyBuYW1lOiBuYW1lLCBpZExpc3Q6IEBzaG93ZWRTcHJpbnQua2FuYmFuLmlkLCBkdWU6IG51bGwsIHBvczogXCJ0b3BcIiB9XG4gICAgICAgICkuYmluZCBAXG4gICAgICAgIEB0cmVsbG9Mb2dJbiBvblN1Y2Nlc3NcblxubW9kdWxlLmV4cG9ydHMgPSBTcHJpbnRTdG9yZSJdfQ==
