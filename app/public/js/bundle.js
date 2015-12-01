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
    request.post('/ws/api/v1/project').type('json').send(this.newProject).end((function(err, res) {
      console.log(this.newProject);
      if (res.ok) {
        return console.log('data sent');
      }
    }).bind(this));
    return $("#addModal").modal('hide');
  },
  handleName: function(value) {
    this.newProject.name = value;
    return this.trigger(this.newProject);
  },
  handleDescription: function(value) {
    this.newProject.description = value;
    return this.trigger(this.newProject);
  },
  handleRepo: function(value) {
    this.newProject.git_repo = value;
    return this.trigger(this.newProject);
  },
  handleMember: function(index, value) {
    this.newProject.members[index] = value;
    return this.trigger(this.newProject);
  },
  addMember: function() {
    this.newProject.members.push('');
    return this.trigger(this.newProject);
  },
  deleteMember: function(index) {
    delete this.newProject.members[index];
    return this.trigger(this.newProject);
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
    request.post('/ws/api/v1/project/sp/' + location.hash.split('id=')[1].split('&')[0]).type('json').send(this.newSprint).end((function(err, res) {
      if (res.ok) {
        return console.log('data sent');
      }
    }).bind(this));
    return $("#addModal").modal('hide');
  },
  handleDate: function(value) {
    this.newSprint.start = value;
    return this.trigger(this.newSprint);
  },
  handleName: function(value) {
    this.newSprint.id = value;
    return this.trigger(this.newSprint);
  },
  handleKanban: function(value) {
    this.newSprint.kanban = value;
    return this.trigger(this.newSprint);
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
    kanban = this.newSprint.kanban;
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
        name: this.newSprint.id + " - " + this.newSprint.start
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
        idList: this.newSprint.kanban.id,
        due: null,
        pos: "top"
      });
    }).bind(this);
    return this.trelloLogIn(onSuccess);
  }
});

module.exports = SprintStore;


},{"../actions/sprint-modal":5}]},{},[13])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvaG9tZS94aGl0ZWRldi9jcmVtaS9jcC9zY3J1bXkvYXBwL2pzL2FjdGlvbnMvcHJvamVjdC1saXN0LmNqc3giLCIvaG9tZS94aGl0ZWRldi9jcmVtaS9jcC9zY3J1bXkvYXBwL2pzL2FjdGlvbnMvcHJvamVjdC1tb2RhbC5janN4IiwiL2hvbWUveGhpdGVkZXYvY3JlbWkvY3Avc2NydW15L2FwcC9qcy9hY3Rpb25zL3Byb2plY3QuY2pzeCIsIi9ob21lL3hoaXRlZGV2L2NyZW1pL2NwL3NjcnVteS9hcHAvanMvYWN0aW9ucy9zcHJpbnQtbGlzdC5janN4IiwiL2hvbWUveGhpdGVkZXYvY3JlbWkvY3Avc2NydW15L2FwcC9qcy9hY3Rpb25zL3NwcmludC1tb2RhbC5janN4IiwiL2hvbWUveGhpdGVkZXYvY3JlbWkvY3Avc2NydW15L2FwcC9qcy9jb21wb25lbnRzL21vZGFsLWxpc3QuY2pzeCIsIi9ob21lL3hoaXRlZGV2L2NyZW1pL2NwL3NjcnVteS9hcHAvanMvY29tcG9uZW50cy9tb2RhbC5janN4IiwiL2hvbWUveGhpdGVkZXYvY3JlbWkvY3Avc2NydW15L2FwcC9qcy9jb21wb25lbnRzL3Byb2plY3QtbGlzdC5janN4IiwiL2hvbWUveGhpdGVkZXYvY3JlbWkvY3Avc2NydW15L2FwcC9qcy9jb21wb25lbnRzL3Byb2plY3QtbW9kYWwuY2pzeCIsIi9ob21lL3hoaXRlZGV2L2NyZW1pL2NwL3NjcnVteS9hcHAvanMvY29tcG9uZW50cy9wcm9qZWN0LmNqc3giLCIvaG9tZS94aGl0ZWRldi9jcmVtaS9jcC9zY3J1bXkvYXBwL2pzL2NvbXBvbmVudHMvc3ByaW50LWxpc3QuY2pzeCIsIi9ob21lL3hoaXRlZGV2L2NyZW1pL2NwL3NjcnVteS9hcHAvanMvY29tcG9uZW50cy9zcHJpbnQtbW9kYWwuY2pzeCIsIi9ob21lL3hoaXRlZGV2L2NyZW1pL2NwL3NjcnVteS9hcHAvanMvbWFpbi5janN4IiwiL2hvbWUveGhpdGVkZXYvY3JlbWkvY3Avc2NydW15L2FwcC9qcy9zdG9yZXMvcHJvamVjdC1saXN0LmNqc3giLCIvaG9tZS94aGl0ZWRldi9jcmVtaS9jcC9zY3J1bXkvYXBwL2pzL3N0b3Jlcy9wcm9qZWN0LW1vZGFsLmNqc3giLCIvaG9tZS94aGl0ZWRldi9jcmVtaS9jcC9zY3J1bXkvYXBwL2pzL3N0b3Jlcy9wcm9qZWN0LmNqc3giLCIvaG9tZS94aGl0ZWRldi9jcmVtaS9jcC9zY3J1bXkvYXBwL2pzL3N0b3Jlcy9zcHJpbnQtbGlzdC5janN4IiwiL2hvbWUveGhpdGVkZXYvY3JlbWkvY3Avc2NydW15L2FwcC9qcy9zdG9yZXMvc3ByaW50LW1vZGFsLmNqc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQSxJQUFBOztBQUFBLGtCQUFBLEdBQXFCLE1BQU0sQ0FBQyxhQUFQLENBQXFCLENBQ3RDLFdBRHNDLEVBRXRDLFFBRnNDLEVBR3RDLGVBSHNDLENBQXJCOztBQU1yQixNQUFNLENBQUMsT0FBUCxHQUFpQjs7OztBQ05qQixJQUFBOztBQUFBLFlBQUEsR0FBZSxNQUFNLENBQUMsYUFBUCxDQUFxQixDQUNoQyxRQURnQyxFQUVoQyxtQkFGZ0MsRUFHaEMsU0FIZ0MsRUFJaEMsWUFKZ0MsRUFLaEMsbUJBTGdDLEVBTWhDLFlBTmdDLEVBT2hDLGNBUGdDLEVBUWhDLFdBUmdDLEVBU2hDLGNBVGdDLENBQXJCOztBQVlmLE1BQU0sQ0FBQyxPQUFQLEdBQWlCOzs7O0FDWmpCLElBQUE7O0FBQUEsY0FBQSxHQUFpQixNQUFNLENBQUMsYUFBUCxDQUFxQixDQUNsQyxlQURrQyxFQUVsQyxtQkFGa0MsRUFHbEMsZUFIa0MsQ0FBckI7O0FBTWpCLE1BQU0sQ0FBQyxPQUFQLEdBQWlCOzs7O0FDTmpCLElBQUE7O0FBQUEsaUJBQUEsR0FBb0IsTUFBTSxDQUFDLGFBQVAsQ0FBcUIsQ0FDckMsWUFEcUMsRUFFckMsbUJBRnFDLEVBR3JDLEtBSHFDLEVBSXJDLFNBSnFDLENBQXJCOztBQU9wQixNQUFNLENBQUMsT0FBUCxHQUFpQjs7OztBQ1BqQixJQUFBOztBQUFBLFlBQUEsR0FBZSxNQUFNLENBQUMsYUFBUCxDQUFxQixDQUNoQyxRQURnQyxFQUVoQyxrQkFGZ0MsRUFHaEMsWUFIZ0MsRUFJaEMsWUFKZ0MsRUFLaEMsY0FMZ0MsRUFNaEMsY0FOZ0MsRUFPaEMsS0FQZ0MsRUFRaEMsTUFSZ0MsQ0FBckI7O0FBV2YsTUFBTSxDQUFDLE9BQVAsR0FBaUI7Ozs7QUNYakIsSUFBQTs7QUFBQSxZQUFBLEdBQWUsT0FBQSxDQUFRLDZCQUFSOztBQUNmLFdBQUEsR0FBYyxPQUFBLENBQVEsNEJBQVI7O0FBQ2QsS0FBQSxHQUFRLE9BQUEsQ0FBUSxxQkFBUjs7QUFFUixTQUFBLEdBQVksS0FBSyxDQUFDLFdBQU4sQ0FDUjtFQUFBLE1BQUEsRUFBUyxTQUFBO1dBQ0wsS0FBSyxDQUFDLGFBQU4sQ0FBb0IsS0FBcEIsRUFBMkIsSUFBM0IsRUFDRSxLQUFLLENBQUMsYUFBTixDQUFvQixLQUFwQixFQUEyQixJQUEzQixFQUNFLEtBQUssQ0FBQyxhQUFOLENBQW9CLFlBQXBCLEVBQWtDLElBQWxDLENBREYsQ0FERixFQUlFLEtBQUssQ0FBQyxhQUFOLENBQW9CLEtBQXBCLEVBQTJCLElBQTNCLEVBQ0UsS0FBSyxDQUFDLGFBQU4sQ0FBb0IsV0FBcEIsRUFBaUMsSUFBakMsQ0FERixDQUpGO0VBREssQ0FBVDtDQURROztBQVdaLE1BQU0sQ0FBQyxPQUFQLEdBQWlCOzs7O0FDZmpCLElBQUE7O0FBQUEsS0FBQSxHQUFRLEtBQUssQ0FBQyxXQUFOLENBQ0o7RUFBQSxNQUFBLEVBQVMsU0FBQTtXQUNQLEtBQUssQ0FBQyxhQUFOLENBQW9CLEtBQXBCLEVBQTJCO01BQUMsV0FBQSxFQUFhLFlBQWQ7TUFBNEIsSUFBQSxFQUFPLElBQUMsQ0FBQSxLQUFLLENBQUMsRUFBMUM7TUFBK0MsTUFBQSxFQUFRLFFBQXZEO01BQWlFLGlCQUFBLEVBQW1CLFlBQXBGO0tBQTNCLEVBQ0UsS0FBSyxDQUFDLGFBQU4sQ0FBb0IsS0FBcEIsRUFBMkI7TUFBQyxXQUFBLEVBQWEsY0FBZDtNQUE4QixNQUFBLEVBQVEsVUFBdEM7S0FBM0IsRUFDRSxLQUFLLENBQUMsYUFBTixDQUFvQixLQUFwQixFQUEyQjtNQUFDLFdBQUEsRUFBYSxlQUFkO0tBQTNCLEVBQ0UsS0FBSyxDQUFDLGFBQU4sQ0FBb0IsS0FBcEIsRUFBMkI7TUFBQyxXQUFBLEVBQWEsY0FBZDtLQUEzQixFQUNFLEtBQUssQ0FBQyxhQUFOLENBQW9CLFFBQXBCLEVBQThCO01BQUMsTUFBQSxFQUFRLFFBQVQ7TUFBbUIsV0FBQSxFQUFhLE9BQWhDO01BQXlDLGNBQUEsRUFBZ0IsT0FBekQ7TUFBa0UsWUFBQSxFQUFjLE9BQWhGO0tBQTlCLEVBQ0UsS0FBSyxDQUFDLGFBQU4sQ0FBb0IsTUFBcEIsRUFBNEI7TUFBQyxhQUFBLEVBQWUsTUFBaEI7S0FBNUIsRUFBcUQsR0FBckQsQ0FERixDQURGLEVBSUUsS0FBSyxDQUFDLGFBQU4sQ0FBb0IsSUFBcEIsRUFBMEI7TUFBQyxXQUFBLEVBQWEsYUFBZDtNQUE2QixJQUFBLEVBQU0sWUFBbkM7S0FBMUIsRUFBNkUsSUFBQyxDQUFBLEtBQUssQ0FBQyxLQUFwRixDQUpGLENBREYsRUFPRSxLQUFLLENBQUMsYUFBTixDQUFvQixLQUFwQixFQUEyQjtNQUFDLFdBQUEsRUFBYSxZQUFkO0tBQTNCLEVBQ0csSUFBQyxDQUFBLEtBQUssQ0FBQyxRQURWLENBUEYsQ0FERixDQURGO0VBRE8sQ0FBVDtDQURJOztBQWtCUixNQUFNLENBQUMsT0FBUCxHQUFpQjs7OztBQ2xCakIsSUFBQTs7QUFBQSxPQUFBLEdBQVUsT0FBQSxDQUFRLHlCQUFSOztBQUNWLEtBQUEsR0FBUSxPQUFBLENBQVEsd0JBQVI7O0FBRVIsWUFBQSxHQUFlLE9BQUEsQ0FBUSwwQkFBUjs7QUFFZixVQUFBLEdBQWEsS0FBSyxDQUFDLFdBQU4sQ0FDTDtFQUFBLE1BQUEsRUFBUyxTQUFBO1dBQ0QsS0FBSyxDQUFDLGFBQU4sQ0FBb0IsR0FBcEIsRUFBeUI7TUFDeEIsU0FBQSxFQUFZLFlBQVksQ0FBQyxPQUFPLENBQUMsSUFBckIsQ0FBMEIsSUFBMUIsRUFBZ0MsS0FBaEMsRUFBdUMsTUFBdkMsQ0FEWTtNQUV4QixhQUFBLEVBQWUsT0FGUztNQUd4QixhQUFBLEVBQWUsYUFIUztNQUl4QixXQUFBLEVBQWEsZ0JBSlc7S0FBekIsRUFJaUMsS0FKakM7RUFEQyxDQUFUO0NBREs7O0FBVWIsYUFBQSxHQUFnQixLQUFLLENBQUMsV0FBTixDQUNSO0VBQUEsTUFBQSxFQUFTLFNBQUE7V0FDRCxLQUFLLENBQUMsYUFBTixDQUFvQixLQUFwQixFQUEyQjtNQUFDLFdBQUEsRUFBYSxZQUFkO01BQTRCLElBQUEsRUFBTSxjQUFsQztLQUEzQixFQUNRLEtBQUssQ0FBQyxhQUFOLENBQW9CLEtBQXBCLEVBQTJCO01BQUMsV0FBQSxFQUFhLGNBQWQ7S0FBM0IsRUFDUSxLQUFLLENBQUMsYUFBTixDQUFvQixLQUFwQixFQUEyQjtNQUFDLFdBQUEsRUFBYSxlQUFkO0tBQTNCLEVBQ1EsS0FBSyxDQUFDLGFBQU4sQ0FBb0IsS0FBcEIsRUFBMkI7TUFBQyxXQUFBLEVBQWEsY0FBZDtLQUEzQixFQUNRLEtBQUssQ0FBQyxhQUFOLENBQW9CLFFBQXBCLEVBQThCO01BQUMsTUFBQSxFQUFRLFFBQVQ7TUFDN0IsV0FBQSxFQUFhLE9BRGdCO01BRTdCLGNBQUEsRUFBZ0IsT0FGYTtNQUc3QixZQUFBLEVBQWMsT0FIZTtLQUE5QixFQUlJLEtBQUssQ0FBQyxhQUFOLENBQW9CLE1BQXBCLEVBQTRCO01BQUMsYUFBQSxFQUFlLE1BQWhCO0tBQTVCLEVBQXFELEdBQXJELENBSkosQ0FEUixFQVNRLEtBQUssQ0FBQyxhQUFOLENBQW9CLElBQXBCLEVBQTBCO01BQUMsV0FBQSxFQUFhLGFBQWQ7S0FBMUIsRUFBd0QsK0NBQXhELENBVFIsQ0FEUixFQWNRLEtBQUssQ0FBQyxhQUFOLENBQW9CLEtBQXBCLEVBQTJCO01BQUMsV0FBQSxFQUFhLFlBQWQ7S0FBM0IsRUFDUSxLQUFLLENBQUMsYUFBTixDQUFvQixRQUFwQixFQUE4QjtNQUM3QixNQUFBLEVBQVEsUUFEcUI7TUFFN0IsV0FBQSxFQUFhLGlCQUZnQjtNQUc3QixjQUFBLEVBQWdCLE9BSGE7S0FBOUIsRUFHMkIsS0FIM0IsQ0FEUixFQU9RLEtBQUssQ0FBQyxhQUFOLENBQW9CLFFBQXBCLEVBQThCO01BQzdCLE1BQUEsRUFBUSxRQURxQjtNQUU3QixXQUFBLEVBQWEsaUJBRmdCO01BRzdCLFNBQUEsRUFBWSxJQUFDLENBQUEsS0FBSyxDQUFDLE1BSFU7S0FBOUIsRUFHOEIsS0FIOUIsQ0FQUixDQWRSLENBRFIsQ0FEUjtFQURDLENBQVQ7Q0FEUTs7QUFvQ2hCLGFBQUEsR0FBZ0IsS0FBSyxDQUFDLFdBQU4sQ0FDUjtFQUFBLE1BQUEsRUFBUyxTQUFBO1dBQ0QsS0FBSyxDQUFDLGFBQU4sQ0FBb0IsTUFBcEIsRUFBNEIsSUFBNUIsRUFDRSxLQUFLLENBQUMsYUFBTixDQUFvQixRQUFwQixFQUE4QjtNQUFDLE1BQUEsRUFBUSxRQUFUO01BQW1CLFdBQUEsRUFBYSxpQkFBaEM7S0FBOUIsRUFDRSxLQUFLLENBQUMsYUFBTixDQUFvQixHQUFwQixFQUF5QjtNQUN4QixhQUFBLEVBQWUsT0FEUztNQUV4QixhQUFBLEVBQWUsZUFGUztNQUd4QixXQUFBLEVBQWEsZ0JBSFc7S0FBekIsRUFHaUMsUUFIakMsQ0FERixDQURGLEVBU0UsS0FBSyxDQUFDLGFBQU4sQ0FBb0IsYUFBcEIsRUFBbUM7TUFBQyxRQUFBLEVBQVcsT0FBTyxDQUFDLFFBQUQsQ0FBbkI7S0FBbkMsQ0FURjtFQURDLENBQVQ7Q0FEUTs7QUFjaEIsV0FBQSxHQUFjLEtBQUssQ0FBQyxXQUFOLENBQ047RUFBQSxNQUFBLEVBQVMsU0FBQTtXQUNELEtBQUssQ0FBQyxhQUFOLENBQW9CLEdBQXBCLEVBQXlCO01BQ3hCLFNBQUEsRUFBWSxZQUFZLENBQUMsT0FBTyxDQUFDLElBQXJCLENBQTBCLElBQTFCLEVBQWdDLEtBQWhDLEVBQXNDLEtBQXRDLENBRFk7TUFFeEIsYUFBQSxFQUFlLE9BRlM7TUFHeEIsYUFBQSxFQUFlLGFBSFM7TUFJeEIsV0FBQSxFQUFhLGdCQUpXO0tBQXpCLEVBSWlDLE1BSmpDO0VBREMsQ0FBVDtDQURNOztBQVVkLE9BQUEsR0FBVSxLQUFLLENBQUMsV0FBTixDQUNjO0VBQUEsTUFBQSxFQUFRLFNBQUE7V0FDQSxLQUFLLENBQUMsYUFBTixDQUFvQixJQUFwQixFQUEwQjtNQUN6QixTQUFBLEVBQVksSUFBQyxDQUFBLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBZixDQUFvQixJQUFwQixFQUF5QixJQUFDLENBQUEsS0FBSyxDQUFDLEVBQWhDLENBRGE7TUFFekIsV0FBQSxFQUFhLEVBRlk7TUFHekIsaUJBQUEsRUFBbUIsY0FITTtLQUExQixFQUlJLEtBQUssQ0FBQyxhQUFOLENBQW9CLEdBQXBCLEVBQXlCLElBQXpCLEVBQWdDLElBQUMsQ0FBQSxLQUFLLENBQUMsSUFBdkMsQ0FKSjtFQURBLENBQVI7Q0FEZDs7QUFTVixXQUFBLEdBQWMsS0FBSyxDQUFDLFdBQU4sQ0FDVTtFQUFBLE1BQUEsRUFBUSxDQUFDLE1BQU0sQ0FBQyxPQUFQLENBQWUsS0FBZixFQUFzQixNQUF0QixDQUFELENBQVI7RUFDQSxNQUFBLEVBQVEsU0FBQTtBQUNBLFFBQUE7SUFBQSxPQUFBLEdBQVUsSUFBQyxDQUFBLEtBQUssQ0FBQyxJQUFJLENBQUM7SUFDdEIsUUFBQSxHQUFXLElBQUMsQ0FBQSxLQUFLLENBQUMsSUFBSSxDQUFDO0lBQ3ZCLElBQUEsR0FBTztBQUNQLFNBQUEsYUFBQTs7TUFDUSxJQUFJLENBQUMsSUFBTCxDQUFVLEtBQUssQ0FBQyxhQUFOLENBQW9CLE9BQXBCLEVBQTZCO1FBQzVCLElBQUEsRUFBTyxDQURxQjtRQUU1QixLQUFBLEVBQVEsQ0FGb0I7UUFHNUIsTUFBQSxFQUFTLE9BQU8sQ0FBQyxJQUhXO1FBSTVCLFNBQUEsRUFBWSxPQUFPLENBQUMsYUFKUTtPQUE3QixDQUFWO0FBRFI7V0FNQSxLQUFLLENBQUMsYUFBTixDQUFvQixLQUFwQixFQUEyQjtNQUFDLFdBQUEsRUFBYSxXQUFkO01BQTJCLE1BQUEsRUFBUSxPQUFuQztNQUE0QyxZQUFBLEVBQWMsS0FBMUQ7S0FBM0IsRUFDSSxLQUFLLENBQUMsYUFBTixDQUFvQixLQUFwQixFQUEyQjtNQUFDLFdBQUEsRUFBYSxVQUFkO0tBQTNCLEVBQ0ksS0FBSyxDQUFDLGFBQU4sQ0FBb0IsUUFBcEIsRUFBOEI7TUFDN0IsTUFBQSxFQUFRLFFBRHFCO01BRTdCLFdBQUEsRUFBYSxpQ0FGZ0I7TUFHN0IsSUFBQSxFQUFNLGNBSHVCO01BSTdCLGFBQUEsRUFBZSxVQUpjO01BSzdCLGVBQUEsRUFBaUIsTUFMWTtNQU03QixlQUFBLEVBQWlCLE1BTlk7S0FBOUIsRUFPSSxLQUFLLENBQUMsYUFBTixDQUFvQixHQUFwQixFQUF5QixJQUF6QixFQUNJLENBQTJCLFFBQVEsQ0FBQyxNQUFULEtBQXFCLENBQS9DLEdBQUEsUUFBUyxDQUFBLE9BQUEsQ0FBUSxDQUFDLElBQWxCLEdBQUEsTUFBRCxDQURKLEVBRUksS0FBSyxDQUFDLGFBQU4sQ0FBb0IsTUFBcEIsRUFBNEI7TUFBQyxXQUFBLEVBQWEsT0FBZDtLQUE1QixDQUZKLENBUEosQ0FESixFQWFJLEtBQUssQ0FBQyxhQUFOLENBQW9CLFFBQXBCLEVBQThCO01BQUMsTUFBQSxFQUFRLFFBQVQ7TUFBbUIsV0FBQSxFQUFhLGlCQUFoQztLQUE5QixFQUNJLEtBQUssQ0FBQyxhQUFOLENBQW9CLFdBQXBCLEVBQWlDO01BQUMsU0FBQSxFQUFZLFFBQVMsQ0FBQSxPQUFBLENBQXRCO0tBQWpDLENBREosQ0FiSixFQWdCSSxLQUFLLENBQUMsYUFBTixDQUFvQixhQUFwQixFQUFtQyxJQUFuQyxDQWhCSixFQWlCSSxLQUFLLENBQUMsYUFBTixDQUFvQixRQUFwQixFQUE4QjtNQUFDLE1BQUEsRUFBUSxRQUFUO01BQW1CLFdBQUEsRUFBYSxpQkFBaEM7S0FBOUIsRUFDSSxLQUFLLENBQUMsYUFBTixDQUFvQixVQUFwQixFQUFnQyxJQUFoQyxDQURKLENBakJKLEVBb0JJLEtBQUssQ0FBQyxhQUFOLENBQW9CLElBQXBCLEVBQTBCO01BQUMsV0FBQSxFQUFhLGVBQWQ7S0FBMUIsRUFDUyxJQURULENBcEJKLENBREo7RUFWQSxDQURSO0NBRFY7O0FBd0NkLE1BQU0sQ0FBQyxPQUFQLEdBQWlCOzs7O0FDNUhqQixJQUFBOztBQUFBLE9BQUEsR0FBVSxPQUFBLENBQVEsMEJBQVI7O0FBQ1YsS0FBQSxHQUFRLE9BQUEsQ0FBUSx5QkFBUjs7QUFFUixLQUFBLEdBQVEsT0FBQSxDQUFRLFNBQVI7O0FBRVIsU0FBQSxHQUFZLEtBQUssQ0FBQyxXQUFOLENBQ1I7RUFBQSxNQUFBLEVBQVMsU0FBQTtXQUNMLEtBQUssQ0FBQyxhQUFOLENBQW9CLEtBQXBCLEVBQTJCO01BQUMsV0FBQSxFQUFhLFlBQWQ7S0FBM0IsRUFDSSxLQUFLLENBQUMsYUFBTixDQUFvQixPQUFwQixFQUE2QjtNQUFDLFNBQUEsRUFBWSxJQUFDLENBQUEsS0FBSyxDQUFDLEVBQXBCO0tBQTdCLEVBQ0ssSUFBQyxDQUFBLEtBQUssQ0FBQyxXQURaLENBREosRUFJSSxLQUFLLENBQUMsYUFBTixDQUFvQixPQUFwQixFQUE2QjtNQUM1QixVQUFBLEVBQWEsQ0FBQyxTQUFDLENBQUQ7ZUFDWixJQUFDLENBQUEsS0FBSyxDQUFDLFFBQVAsQ0FBZ0IsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUF6QjtNQURZLENBQUQsQ0FDb0IsQ0FBQyxJQURyQixDQUMwQixJQUQxQixDQURlO01BRzVCLE9BQUEsRUFBVSxJQUFDLENBQUEsS0FBSyxDQUFDLElBSFc7TUFJNUIsTUFBQSxFQUFRLE1BSm9CO01BSzVCLFdBQUEsRUFBYSxjQUxlO01BTTVCLElBQUEsRUFBTyxJQUFDLENBQUEsS0FBSyxDQUFDLEVBTmM7TUFPNUIsYUFBQSxFQUFnQixJQUFDLENBQUEsS0FBSyxDQUFDLFdBUEs7TUFRNUIsVUFBQSxFQUFhLElBQUMsQ0FBQSxLQUFLLENBQUMsUUFSUTtLQUE3QixDQUpKO0VBREssQ0FBVDtDQURROztBQWlCWixNQUFBLEdBQVMsS0FBSyxDQUFDLFdBQU4sQ0FDRDtFQUFBLE1BQUEsRUFBUyxTQUFBO1dBQ0QsS0FBSyxDQUFDLGFBQU4sQ0FBb0IsS0FBcEIsRUFBMkI7TUFBQyxXQUFBLEVBQWEsS0FBZDtLQUEzQixFQUNRLEtBQUssQ0FBQyxhQUFOLENBQW9CLEtBQXBCLEVBQTJCO01BQUMsV0FBQSxFQUFhLFdBQWQ7S0FBM0IsRUFDUSxLQUFLLENBQUMsYUFBTixDQUFvQixPQUFwQixFQUE2QjtNQUM1QixVQUFBLEVBQWEsQ0FBQyxTQUFDLENBQUQ7ZUFDWixPQUFPLENBQUMsWUFBUixDQUFxQixJQUFDLENBQUEsS0FBSyxDQUFDLEVBQTVCLEVBQWdDLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBekM7TUFEWSxDQUFELENBQ3FDLENBQUMsSUFEdEMsQ0FDMkMsSUFEM0MsQ0FEZTtNQUc1QixPQUFBLEVBQVUsSUFBQyxDQUFBLEtBQUssQ0FBQyxJQUhXO01BSTVCLE1BQUEsRUFBUSxNQUpvQjtNQUs1QixXQUFBLEVBQWEsY0FMZTtNQU01QixhQUFBLEVBQWUsS0FOYTtLQUE3QixDQURSLENBRFIsRUFVUSxLQUFLLENBQUMsYUFBTixDQUFvQixLQUFwQixFQUEyQjtNQUFDLFdBQUEsRUFBYSxVQUFkO0tBQTNCLEVBQ1EsS0FBSyxDQUFDLGFBQU4sQ0FBb0IsR0FBcEIsRUFBeUI7TUFDeEIsV0FBQSxFQUFhLGdCQURXO01BRXhCLFNBQUEsRUFBWSxZQUFZLENBQUMsWUFBWSxDQUFDLElBQTFCLENBQStCLElBQS9CLEVBQXFDLElBQUMsQ0FBQSxLQUFLLENBQUMsRUFBNUMsQ0FGWTtLQUF6QixFQUUrRCxRQUYvRCxDQURSLENBVlI7RUFEQyxDQUFUO0NBREM7O0FBcUJULFlBQUEsR0FBZSxLQUFLLENBQUMsV0FBTixDQUNQO0VBQUEsTUFBQSxFQUFRLFNBQUE7QUFDQSxRQUFBO0lBQUEsV0FBQSxHQUFjO0FBQ2Q7QUFBQSxTQUFBLFFBQUE7O01BQ1EsV0FBVyxDQUFDLElBQVosQ0FBaUIsS0FBSyxDQUFDLGFBQU4sQ0FBb0IsTUFBcEIsRUFBNEI7UUFDM0IsTUFBQSxFQUFTLENBRGtCO1FBRTNCLElBQUEsRUFBTyxDQUZvQjtRQUczQixLQUFBLEVBQVEsQ0FIbUI7T0FBNUIsQ0FBakI7QUFEUjtXQUtBLEtBQUssQ0FBQyxhQUFOLENBQW9CLEtBQXBCLEVBQTJCO01BQUMsV0FBQSxFQUFhLFlBQWQ7S0FBM0IsRUFDZ0IsS0FBSyxDQUFDLGFBQU4sQ0FBb0IsT0FBcEIsRUFBNkIsSUFBN0IsRUFBbUMsZ0JBQW5DLENBRGhCLEVBRWlCLFdBRmpCLEVBR2dCLEtBQUssQ0FBQyxhQUFOLENBQW9CLEdBQXBCLEVBQXlCO01BQUMsV0FBQSxFQUFhLGdCQUFkO01BQWdDLFNBQUEsRUFBWSxPQUFPLENBQUMsU0FBcEQ7S0FBekIsRUFBMEYsS0FBMUYsQ0FIaEI7RUFQQSxDQUFSO0NBRE87O0FBaUJmLElBQUEsR0FBTyxLQUFLLENBQUMsV0FBTixDQUNIO0VBQUEsTUFBQSxFQUFRLENBQUMsTUFBTSxDQUFDLE9BQVAsQ0FBZSxLQUFmLEVBQXNCLFNBQXRCLENBQUQsQ0FBUjtFQUNBLE1BQUEsRUFBUyxTQUFBO0FBQ0wsUUFBQTtJQUFBLE9BQUEsR0FBVSxJQUFDLENBQUEsS0FBSyxDQUFDO1dBQ2pCLEtBQUssQ0FBQyxhQUFOLENBQW9CLE1BQXBCLEVBQTRCO01BQUMsVUFBQSxFQUFZLENBQUMsU0FBQyxDQUFEO1FBQ3RCLENBQUMsQ0FBQyxjQUFGLENBQUE7ZUFDQSxPQUFPLENBQUMsTUFBUixDQUFlLENBQWY7TUFGc0IsQ0FBRCxDQUFiO0tBQTVCLEVBR0ksS0FBSyxDQUFDLGFBQU4sQ0FBb0IsU0FBcEIsRUFBK0I7TUFBQyxVQUFBLEVBQWEsT0FBTyxDQUFDLFVBQXRCO01BQW1DLE1BQUEsRUFBUyxPQUFPLENBQUMsSUFBcEQ7TUFBMkQsSUFBQSxFQUFNLFdBQWpFO01BQThFLGFBQUEsRUFBZSxLQUE3RjtNQUFvRyxVQUFBLEVBQVksVUFBaEg7S0FBL0IsQ0FISixFQUlJLEtBQUssQ0FBQyxhQUFOLENBQW9CLFNBQXBCLEVBQStCO01BQUMsVUFBQSxFQUFhLE9BQU8sQ0FBQyxpQkFBdEI7TUFBMEMsTUFBQSxFQUFTLE9BQU8sQ0FBQyxXQUEzRDtNQUF5RSxJQUFBLEVBQU0sa0JBQS9FO01BQW1HLGFBQUEsRUFBZSxhQUFsSDtLQUEvQixDQUpKLEVBS0ksS0FBSyxDQUFDLGFBQU4sQ0FBb0IsU0FBcEIsRUFBK0I7TUFBQyxVQUFBLEVBQWEsT0FBTyxDQUFDLFVBQXRCO01BQW1DLE1BQUEsRUFBUyxPQUFPLENBQUMsUUFBcEQ7TUFBK0QsSUFBQSxFQUFNLFdBQXJFO01BQWtGLGFBQUEsRUFBZSxXQUFqRztLQUEvQixDQUxKLEVBTUksS0FBSyxDQUFDLGFBQU4sQ0FBb0IsWUFBcEIsRUFBa0M7TUFBQyxTQUFBLEVBQVksT0FBTyxDQUFDLE9BQXJCO0tBQWxDLENBTkosRUFPSSxLQUFLLENBQUMsYUFBTixDQUFvQixRQUFwQixFQUE4QjtNQUFDLE1BQUEsRUFBUSxRQUFUO01BQW1CLFdBQUEsRUFBYSxpQkFBaEM7TUFBbUQsY0FBQSxFQUFnQixPQUFuRTtLQUE5QixFQUEyRyxRQUEzRyxDQVBKLEVBUUksS0FBSyxDQUFDLGFBQU4sQ0FBb0IsUUFBcEIsRUFBOEI7TUFBQyxNQUFBLEVBQVEsUUFBVDtNQUFtQixXQUFBLEVBQWEsaUJBQWhDO0tBQTlCLEVBQWtGLFdBQWxGLENBUko7RUFGSyxDQURUO0NBREc7O0FBZVAsWUFBQSxHQUFlLEtBQUssQ0FBQyxXQUFOLENBQ1g7RUFBQSxNQUFBLEVBQVMsU0FBQTtXQUNILEtBQUssQ0FBQyxhQUFOLENBQW9CLElBQXBCLEVBQTBCLElBQTFCO0VBREcsQ0FBVDtDQURXOztBQUlmLE1BQU0sQ0FBQyxPQUFQLEdBQWlCOzs7O0FDL0VqQixJQUFBOztBQUFBLE9BQUEsR0FBVSxPQUFBLENBQVEsb0JBQVI7O0FBQ1YsS0FBQSxHQUFRLE9BQUEsQ0FBUSxtQkFBUjs7QUFFUixVQUFBLEdBQWEsT0FBQSxDQUFRLGVBQVI7O0FBRWIsTUFBQSxHQUFTLEtBQUssQ0FBQyxXQUFOLENBQ0w7RUFBQSxNQUFBLEVBQVEsU0FBQTtXQUNKLEtBQUssQ0FBQyxhQUFOLENBQW9CLEtBQXBCLEVBQTJCO01BQUMsTUFBQSxFQUFRLFlBQVQ7S0FBM0IsRUFDSSxLQUFLLENBQUMsYUFBTixDQUFvQixJQUFwQixFQUEwQjtNQUFDLFdBQUEsRUFBYSxjQUFkO0tBQTFCLEVBQ0ksS0FBSyxDQUFDLGFBQU4sQ0FBb0IsSUFBcEIsRUFBMEI7TUFDekIsU0FBQSxFQUFZLE9BQU8sQ0FBQyxhQURLO01BRXpCLE1BQUEsRUFBUSxjQUZpQjtNQUd6QixXQUFBLEVBQWEsQ0FBYSxJQUFDLENBQUEsS0FBSyxDQUFDLE9BQW5CLEdBQUEsUUFBQSxHQUFBLE1BQUQsQ0FIWTtLQUExQixFQUlRLEtBQUssQ0FBQyxhQUFOLENBQW9CLEdBQXBCLEVBQXlCLElBQXpCLEVBQStCLFNBQS9CLENBSlIsQ0FESixFQU9JLEtBQUssQ0FBQyxhQUFOLENBQW9CLElBQXBCLEVBQTBCO01BQ3pCLFNBQUEsRUFBWSxPQUFPLENBQUMsYUFESztNQUV6QixNQUFBLEVBQVEsY0FGaUI7TUFHekIsV0FBQSxFQUFhLENBQWEsQ0FBSSxJQUFDLENBQUEsS0FBSyxDQUFDLE9BQXZCLEdBQUEsUUFBQSxHQUFBLE1BQUQsQ0FIWTtLQUExQixFQUlRLEtBQUssQ0FBQyxhQUFOLENBQW9CLEdBQXBCLEVBQXlCLElBQXpCLEVBQStCLFNBQS9CLENBSlIsQ0FQSixDQURKO0VBREksQ0FBUjtDQURLOztBQW1CVCxVQUFBLEdBQWEsS0FBSyxDQUFDLFdBQU4sQ0FDVDtFQUFBLE1BQUEsRUFBUSxTQUFBO1dBQ0osS0FBSyxDQUFDLGFBQU4sQ0FBb0IsS0FBcEIsRUFBMkIsSUFBM0IsRUFDSSxDQUEwQyxDQUFJLElBQUMsQ0FBQSxLQUFLLENBQUMsT0FBcEQsR0FBQSxLQUFLLENBQUMsYUFBTixDQUFvQixVQUFwQixFQUFnQyxJQUFoQyxDQUFBLEdBQUEsTUFBRCxDQURKO0VBREksQ0FBUjtDQURTOztBQU1iLE9BQUEsR0FBVSxLQUFLLENBQUMsV0FBTixDQUNOO0VBQUEsTUFBQSxFQUFRLENBQUMsTUFBTSxDQUFDLE9BQVAsQ0FBZSxLQUFmLEVBQXNCLE1BQXRCLENBQUQsQ0FBUjtFQUNBLE1BQUEsRUFBUSxTQUFBO0FBQ0osUUFBQTtJQUFBLE9BQUEsR0FBVSxJQUFDLENBQUEsS0FBSyxDQUFDLElBQUksQ0FBQztXQUN0QixLQUFLLENBQUMsYUFBTixDQUFvQixLQUFwQixFQUEyQixJQUEzQixFQUNJLEtBQUssQ0FBQyxhQUFOLENBQW9CLE1BQXBCLEVBQTRCO01BQUMsU0FBQSxFQUFZLE9BQWI7S0FBNUIsQ0FESixFQUVJLEtBQUssQ0FBQyxhQUFOLENBQW9CLFVBQXBCLEVBQWdDO01BQUMsU0FBQSxFQUFZLE9BQWI7S0FBaEMsQ0FGSjtFQUZJLENBRFI7Q0FETTs7QUFTVixNQUFNLENBQUMsT0FBUCxHQUFpQjs7OztBQ3ZDakIsSUFBQTs7QUFBQSxLQUFBLEdBQVEsT0FBQSxDQUFRLHVCQUFSOztBQUNSLE9BQUEsR0FBVSxPQUFBLENBQVEsd0JBQVI7O0FBRVYsWUFBQSxHQUFlLE9BQUEsQ0FBUSx5QkFBUjs7QUFFZixNQUFBLEdBQVMsS0FBSyxDQUFDLFdBQU4sQ0FDTDtFQUFBLE1BQUEsRUFBUSxTQUFBO1dBQ04sS0FBSyxDQUFDLGFBQU4sQ0FBb0IsS0FBcEIsRUFBMkI7TUFBQyxXQUFBLEVBQWEscUJBQWQ7S0FBM0IsRUFDSSxLQUFLLENBQUMsYUFBTixDQUFvQixLQUFwQixFQUEyQjtNQUFDLFdBQUEsRUFBYSxlQUFkO0tBQTNCLEVBQ0ssSUFBQyxDQUFBLEtBQUssQ0FBQyxFQURaLENBREosRUFJSSxLQUFLLENBQUMsYUFBTixDQUFvQixLQUFwQixFQUEyQjtNQUFDLFdBQUEsRUFBYSxZQUFkO0tBQTNCLEVBQ0ssSUFBQyxDQUFBLEtBQUssQ0FBQyxLQURaLENBSko7RUFETSxDQUFSO0NBREs7O0FBV1QsVUFBQSxHQUFhLEtBQUssQ0FBQyxXQUFOLENBQ1Q7RUFBQSxNQUFBLEVBQVEsQ0FBQyxNQUFNLENBQUMsT0FBUCxDQUFlLEtBQWYsRUFBc0IsTUFBdEIsQ0FBRCxDQUFSO0VBQ0EsTUFBQSxFQUFRLFNBQUE7QUFDSixRQUFBO0lBQUEsT0FBTyxDQUFDLEdBQVIsQ0FBWSxJQUFDLENBQUEsS0FBSyxDQUFDLElBQW5CO0lBQ0EsS0FBQSxHQUFRLElBQUMsQ0FBQSxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQVosQ0FBZ0IsU0FBQyxDQUFEO2FBQU8sS0FBSyxDQUFDLGFBQU4sQ0FBb0IsTUFBcEIsRUFBNEI7UUFBQyxLQUFBLEVBQVEsQ0FBQyxDQUFDLEVBQVg7UUFBZ0IsSUFBQSxFQUFPLENBQUMsQ0FBQyxFQUF6QjtRQUE4QixPQUFBLEVBQVUsQ0FBQyxDQUFDLEtBQTFDO09BQTVCO0lBQVAsQ0FBaEI7V0FDUixLQUFLLENBQUMsYUFBTixDQUFvQixLQUFwQixFQUEyQjtNQUFDLFdBQUEsRUFBYSxZQUFkO0tBQTNCLEVBQ0EsS0FBSyxDQUFDLGFBQU4sQ0FBb0IsUUFBcEIsRUFBOEI7TUFBQyxNQUFBLEVBQVEsUUFBVDtNQUFtQixXQUFBLEVBQWEsaUJBQWhDO0tBQTlCLEVBQ0ksS0FBSyxDQUFDLGFBQU4sQ0FBb0IsR0FBcEIsRUFBeUI7TUFDeEIsU0FBQSxFQUFXLENBQUMsU0FBQyxDQUFEO1FBQ0EsQ0FBQyxDQUFDLGNBQUYsQ0FBQTtlQUNBLFlBQVksQ0FBQztNQUZiLENBQUQsQ0FEYTtNQUl4QixhQUFBLEVBQWUsT0FKUztNQUt4QixhQUFBLEVBQWUsWUFMUztNQU14QixXQUFBLEVBQWEsZ0JBTlc7S0FBekIsRUFNaUMsS0FOakMsQ0FESixDQURBLEVBYUssS0FiTDtFQUhJLENBRFI7Q0FEUzs7QUFxQmIsTUFBTSxDQUFDLE9BQVAsR0FBaUI7Ozs7QUNyQ2pCLElBQUE7O0FBQUEsS0FBQSxHQUFRLE9BQUEsQ0FBUSx3QkFBUjs7QUFDUixPQUFBLEdBQVUsT0FBQSxDQUFRLHlCQUFSOztBQUVWLEtBQUEsR0FBUSxPQUFBLENBQVEsU0FBUjs7QUFFUixTQUFBLEdBQVksS0FBSyxDQUFDLFdBQU4sQ0FDUjtFQUFBLE1BQUEsRUFBUyxTQUFBO1dBQ0wsS0FBSyxDQUFDLGFBQU4sQ0FBb0IsS0FBcEIsRUFBMkI7TUFBQyxXQUFBLEVBQWEsWUFBZDtLQUEzQixFQUNJLEtBQUssQ0FBQyxhQUFOLENBQW9CLE9BQXBCLEVBQTZCO01BQUMsU0FBQSxFQUFZLElBQUMsQ0FBQSxLQUFLLENBQUMsRUFBcEI7S0FBN0IsRUFDSyxJQUFDLENBQUEsS0FBSyxDQUFDLFdBRFosQ0FESixFQUlJLEtBQUssQ0FBQyxhQUFOLENBQW9CLE9BQXBCLEVBQTZCO01BQzVCLFVBQUEsRUFBYSxDQUFDLFNBQUMsQ0FBRDtlQUNaLElBQUMsQ0FBQSxLQUFLLENBQUMsUUFBUCxDQUFnQixDQUFDLENBQUMsTUFBTSxDQUFDLEtBQXpCO01BRFksQ0FBRCxDQUNvQixDQUFDLElBRHJCLENBQzBCLElBRDFCLENBRGU7TUFHNUIsT0FBQSxFQUFVLElBQUMsQ0FBQSxLQUFLLENBQUMsSUFIVztNQUk1QixNQUFBLEVBQVEsTUFKb0I7TUFLNUIsV0FBQSxFQUFhLGNBTGU7TUFNNUIsSUFBQSxFQUFPLElBQUMsQ0FBQSxLQUFLLENBQUMsRUFOYztNQU81QixhQUFBLEVBQWdCLElBQUMsQ0FBQSxLQUFLLENBQUMsV0FQSztNQVE1QixVQUFBLEVBQWEsSUFBQyxDQUFBLEtBQUssQ0FBQyxRQVJRO0tBQTdCLENBSko7RUFESyxDQUFUO0NBRFE7O0FBaUJaLFVBQUEsR0FBYSxLQUFLLENBQUMsV0FBTixDQUNUO0VBQUEsTUFBQSxFQUFRLENBQUMsTUFBTSxDQUFDLE9BQVAsQ0FBZSxLQUFmLEVBQXNCLFFBQXRCLENBQUQsQ0FBUjtFQUNBLE1BQUEsRUFBUyxTQUFBO1dBQ08sS0FBSyxDQUFDLGFBQU4sQ0FBb0IsTUFBcEIsRUFBNEI7TUFBQyxVQUFBLEVBQVksQ0FBQyxTQUFDLENBQUQ7UUFDdEIsQ0FBQyxDQUFDLGNBQUYsQ0FBQTtlQUNBLE9BQU8sQ0FBQyxNQUFSLENBQWUsQ0FBZjtNQUZzQixDQUFELENBQWI7S0FBNUIsRUFHSSxLQUFLLENBQUMsYUFBTixDQUFvQixTQUFwQixFQUErQjtNQUFDLFVBQUEsRUFBYSxPQUFPLENBQUMsVUFBdEI7TUFBbUMsTUFBQSxFQUFTLElBQUMsQ0FBQSxLQUFLLENBQUMsTUFBTSxDQUFDLEVBQTFEO01BQStELElBQUEsRUFBTSxXQUFyRTtNQUFrRixhQUFBLEVBQWUsS0FBakc7TUFBd0csVUFBQSxFQUFZLFVBQXBIO0tBQS9CLENBSEosRUFJSSxLQUFLLENBQUMsYUFBTixDQUFvQixLQUFwQixFQUEyQjtNQUFDLFdBQUEsRUFBYSxZQUFkO0tBQTNCLEVBQ0EsS0FBSyxDQUFDLGFBQU4sQ0FBb0IsT0FBcEIsRUFBNkI7TUFBQyxTQUFBLEVBQVcsV0FBWjtLQUE3QixFQUF1RCxlQUF2RCxDQURBLEVBSUEsS0FBSyxDQUFDLGFBQU4sQ0FBb0IsT0FBcEIsRUFBNkI7TUFDaEIsVUFBQSxFQUFhLENBQUMsU0FBQyxDQUFEO2VBQ1osT0FBTyxDQUFDLFVBQVIsQ0FBbUIsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUE1QjtNQURZLENBQUQsQ0FDdUIsQ0FBQyxJQUR4QixDQUM2QixJQUQ3QixDQURHO01BR2hCLE9BQUEsRUFBVSxJQUFDLENBQUEsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUhSO01BSWhCLE1BQUEsRUFBUSxNQUpRO01BS2hCLFdBQUEsRUFBYSxjQUxHO01BTWhCLElBQUEsRUFBTSxXQU5VO01BT2hCLFVBQUEsRUFBWSxVQVBJO0tBQTdCLENBSkEsQ0FKSixFQWlCSSxLQUFLLENBQUMsYUFBTixDQUFvQixRQUFwQixFQUE4QjtNQUM3QixNQUFBLEVBQVEsUUFEcUI7TUFFN0IsV0FBQSxFQUFhLGlCQUZnQjtNQUc3QixjQUFBLEVBQWdCLE9BSGE7S0FBOUIsRUFHMkIsU0FIM0IsQ0FqQkosRUF1QkksS0FBSyxDQUFDLGFBQU4sQ0FBb0IsUUFBcEIsRUFBOEI7TUFDN0IsTUFBQSxFQUFRLFFBRHFCO01BRTdCLFdBQUEsRUFBYSxpQkFGZ0I7TUFHN0IsU0FBQSxFQUFZLElBQUMsQ0FBQSxLQUFLLENBQUMsTUFIVTtLQUE5QixFQUc4QixXQUg5QixDQXZCSjtFQURQLENBRFQ7Q0FEUzs7QUFtQ2IsV0FBQSxHQUFjLEtBQUssQ0FBQyxXQUFOLENBQ1Y7RUFBQSxNQUFBLEVBQVMsU0FBQTtXQUNILEtBQUssQ0FBQyxhQUFOLENBQW9CLFVBQXBCLEVBQWdDLElBQWhDO0VBREcsQ0FBVDtDQURVOztBQUtkLE1BQU0sQ0FBQyxPQUFQLEdBQWlCOzs7O0FDOURqQixJQUFBOztBQUFBLFdBQUEsR0FBYyxPQUFBLENBQVEsMkJBQVI7O0FBQ2QsT0FBQSxHQUFVLE9BQUEsQ0FBUSxzQkFBUjs7QUFDVixTQUFBLEdBQVksT0FBQSxDQUFRLHlCQUFSOztBQUNaLFlBQUEsR0FBZSxPQUFBLENBQVEsNEJBQVI7O0FBQ2YsTUFBQSxHQUFTLE9BQUEsQ0FBUSwyQkFBUjs7QUFDVCxNQUFBLEdBQVMsV0FBVyxDQUFDOztBQUNyQixLQUFBLEdBQVEsV0FBVyxDQUFDOztBQUNwQixJQUFBLEdBQU8sV0FBVyxDQUFDOztBQUVuQixLQUFBLEdBQVEsS0FBSyxDQUFDLFdBQU4sQ0FDTjtFQUFBLE1BQUEsRUFBUSxTQUFBO1dBQ04sS0FBSyxDQUFDLGFBQU4sQ0FBb0IsS0FBcEIsRUFBMkIsSUFBM0IsRUFDRyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBRGQ7RUFETSxDQUFSO0NBRE07O0FBTVIsS0FBQSxHQUFRLEtBQUssQ0FBQyxXQUFOLENBQ047RUFBQSxNQUFBLEVBQVEsU0FBQTtXQUNJLEtBQUssQ0FBQyxhQUFOLENBQW9CLEtBQXBCLEVBQTJCLElBQTNCLEVBQ0ksS0FBSyxDQUFDLGFBQU4sQ0FBb0IsV0FBcEIsRUFBaUMsSUFBakMsQ0FESixFQUVJLEtBQUssQ0FBQyxhQUFOLENBQW9CLE9BQXBCLEVBQTZCLElBQTdCLENBRkosRUFHSSxLQUFLLENBQUMsYUFBTixDQUFvQixTQUFwQixFQUErQixJQUEvQixDQUhKO0VBREosQ0FBUjtDQURNOztBQVFSLElBQUEsR0FBTyxLQUFLLENBQUMsV0FBTixDQUNDO0VBQUEsTUFBQSxFQUFTLFNBQUE7V0FDTixLQUFLLENBQUMsYUFBTixDQUFvQixNQUFwQixFQUE0QixJQUE1QixFQUNFLEtBQUssQ0FBQyxhQUFOLENBQW9CLEtBQXBCLEVBQTJCO01BQUMsTUFBQSxFQUFRLEdBQVQ7TUFBYyxXQUFBLEVBQWMsS0FBNUI7S0FBM0IsRUFDRSxLQUFLLENBQUMsYUFBTixDQUFvQixLQUFwQixFQUEyQjtNQUFDLE1BQUEsRUFBUSxPQUFUO01BQWtCLFdBQUEsRUFBYyxLQUFoQztLQUEzQixDQURGLEVBRUUsS0FBSyxDQUFDLGFBQU4sQ0FBb0IsS0FBcEIsRUFBMkI7TUFBQyxNQUFBLEVBQVEsWUFBVDtNQUF1QixXQUFBLEVBQWMsWUFBckM7S0FBM0IsQ0FGRixFQUdFLEtBQUssQ0FBQyxhQUFOLENBQW9CLEtBQXBCLEVBQTJCO01BQUMsTUFBQSxFQUFRLFdBQVQ7TUFBc0IsV0FBQSxFQUFjLE1BQXBDO0tBQTNCLENBSEYsQ0FERjtFQURNLENBQVQ7Q0FERDs7QUFrQlAsS0FBSyxDQUFDLE1BQU4sQ0FBYSxLQUFLLENBQUMsYUFBTixDQUFvQixJQUFwQixFQUEwQixJQUExQixDQUFiLEVBQThDLFFBQVEsQ0FBQyxjQUFULENBQXdCLFNBQXhCLENBQTlDOzs7O0FDekNBLElBQUE7O0FBQUEsT0FBQSxHQUFVLE9BQUEsQ0FBUSx5QkFBUjs7QUFDVixjQUFBLEdBQWlCLE9BQUEsQ0FBUSxvQkFBUjs7QUFFakIsV0FBQSxHQUFjLE1BQU0sQ0FBQyxXQUFQLENBQ047RUFBQSxlQUFBLEVBQWlCLFNBQUE7V0FDVCxJQUFDLENBQUE7RUFEUSxDQUFqQjtFQUVBLGFBQUEsRUFBZSxTQUFDLEVBQUQ7SUFDUCxJQUFDLENBQUEsSUFBSSxDQUFDLE9BQU4sR0FBZ0I7SUFDaEIsSUFBQyxDQUFBLE9BQUQsQ0FBUyxJQUFDLENBQUEsSUFBVjtXQUNBLGNBQWMsQ0FBQyxpQkFBZixDQUFpQyxJQUFDLENBQUEsSUFBSSxDQUFDLFFBQVMsQ0FBQSxJQUFDLENBQUEsSUFBSSxDQUFDLE9BQU4sQ0FBaEQ7RUFITyxDQUZmO0VBTUEsSUFBQSxFQUFNO0lBQ0UsUUFBQSxFQUFVLEVBRFo7SUFFRSxPQUFBLEVBQVMsQ0FGWDtHQU5OO0VBVUEsV0FBQSxFQUFhLENBQUMsT0FBRCxDQVZiO0VBV0EsTUFBQSxFQUFRLHFCQVhSO0VBWUEsSUFBQSxFQUFNLFNBQUE7V0FDRSxJQUFDLENBQUEsU0FBRCxDQUFBO0VBREYsQ0FaTjtFQWNBLFFBQUEsRUFBUSxTQUFBO0FBQ0osUUFBQTtJQUFBLEVBQUEsR0FBSyxJQUFDLENBQUEsSUFBSSxDQUFDLFFBQVMsQ0FBQSxJQUFDLENBQUEsSUFBSSxDQUFDLE9BQU4sQ0FBYyxDQUFDO0lBQ25DLE9BQUEsR0FBVTtXQUNWLE9BQ1EsQ0FBQyxRQUFELENBRFIsQ0FDZ0IsSUFBQyxDQUFBLE1BQUQsR0FBVSxHQUFWLEdBQWdCLEVBRGhDLENBRVEsQ0FBQyxHQUZULENBRWEsQ0FBQyxTQUFDLEdBQUQsRUFBSyxHQUFMO01BQ0UsSUFBRyxHQUFHLENBQUMsRUFBUDtRQUNJLE9BQU8sSUFBQyxDQUFBLElBQUksQ0FBQyxRQUFTLENBQUEsSUFBQyxDQUFBLElBQUksQ0FBQyxPQUFOO2VBQ3RCLElBQUMsQ0FBQSxhQUFELENBQWUsQ0FBZixFQUZKOztJQURGLENBQUQsQ0FJSixDQUFDLElBSkcsQ0FJRSxJQUpGLENBRmI7RUFISSxDQWRSO0VBeUJBLFNBQUEsRUFBVyxTQUFBO0FBQ0gsUUFBQTtJQUFBLE9BQUEsR0FBVTtXQUNWLE9BQ1EsQ0FBQyxHQURULENBQ2EsSUFBQyxDQUFBLE1BRGQsQ0FFUSxDQUFDLE1BRlQsQ0FFZ0Isa0JBRmhCLENBR1EsQ0FBQyxHQUhULENBR2EsQ0FBQyxTQUFDLEdBQUQsRUFBSyxHQUFMO01BQ0UsSUFBRyxHQUFHLENBQUMsRUFBUDtRQUNRLElBQUMsQ0FBQSxJQUFJLENBQUMsUUFBTixHQUFpQixHQUFHLENBQUM7ZUFDckIsSUFBQyxDQUFBLGFBQUQsQ0FBZSxDQUFmLEVBRlI7O0lBREYsQ0FBRCxDQUlKLENBQUMsSUFKRyxDQUlFLElBSkYsQ0FIYjtFQUZHLENBekJYO0NBRE07O0FBcUNkLE1BQU0sQ0FBQyxPQUFQLEdBQWlCOzs7O0FDeENqQixJQUFBOztBQUFBLE9BQUEsR0FBVSxPQUFBLENBQVEsMEJBQVI7O0FBRVYsVUFBQSxHQUFhLE1BQU0sQ0FBQyxXQUFQLENBQ0w7RUFBQSxXQUFBLEVBQWEsQ0FBQyxPQUFELENBQWI7RUFDQSxJQUFBLEVBQU0sTUFETjtFQUVBLFVBQUEsRUFBWTtJQUNKLElBQUEsRUFBTSxFQURGO0lBRUosV0FBQSxFQUFhLEVBRlQ7SUFHSixRQUFBLEVBQVUsRUFITjtJQUlKLE9BQUEsRUFBUyxFQUpMO0lBS0osT0FBQSxFQUFTLEVBTEw7SUFNSixPQUFBLEVBQVMsRUFOTDtHQUZaO0VBVUEsY0FBQSxFQUFnQixFQVZoQjtFQVdBLGFBQUEsRUFBZSxFQVhmO0VBWUEsZUFBQSxFQUFpQixTQUFBO1dBQ1QsSUFBQyxDQUFBO0VBRFEsQ0FaakI7RUFjQSxPQUFBLEVBQVMsU0FBQyxDQUFELEVBQUcsSUFBSDtJQUNELElBQUcsSUFBQSxLQUFRLEtBQVg7TUFDRSxJQUFDLENBQUEsYUFBRCxHQUFpQixJQUFDLENBQUEsZUFEcEI7S0FBQSxNQUFBO01BR0UsSUFBQyxDQUFBLGFBQUQsR0FBaUIsSUFBQyxDQUFBLFdBSHBCOztJQUlBLElBQUMsQ0FBQSxJQUFELEdBQVE7V0FDUixJQUFDLENBQUEsT0FBRCxDQUFTLElBQUMsQ0FBQSxhQUFWO0VBTkMsQ0FkVDtFQXFCQSxpQkFBQSxFQUFtQixTQUFDLENBQUQ7SUFDWCxJQUF1QixTQUF2QjthQUFBLElBQUMsQ0FBQSxjQUFELEdBQWtCLEVBQWxCOztFQURXLENBckJuQjtFQXVCQSxNQUFBLEVBQVEsU0FBQyxDQUFEO0FBQ0EsWUFBTyxJQUFDLENBQUEsSUFBUjtBQUFBLFdBQ08sTUFEUDtlQUNtQixJQUFDLENBQUEsSUFBRCxDQUFNLENBQU47QUFEbkIsV0FFTyxLQUZQO2VBRWtCLElBQUMsQ0FBQSxNQUFELENBQVEsQ0FBUjtBQUZsQjtlQUdPLE9BQU8sQ0FBQyxHQUFSLENBQVksb0JBQVo7QUFIUDtFQURBLENBdkJSO0VBNEJBLE1BQUEsRUFBUSxTQUFDLENBQUQ7QUFDQSxRQUFBO0lBQUEsT0FBQSxHQUFVO0lBQ1YsT0FDUSxDQUFDLEdBRFQsQ0FDYSxxQkFBQSxHQUF3QixJQUFDLENBQUEsY0FBYyxDQUFDLEdBRHJELENBRVEsQ0FBQyxJQUZULENBRWMsTUFGZCxDQUdRLENBQUMsSUFIVCxDQUdjLElBQUMsQ0FBQSxjQUhmLENBSVEsQ0FBQyxHQUpULENBSWEsQ0FBQyxTQUFDLEdBQUQsRUFBSyxHQUFMO01BRUUsSUFBOEIsR0FBRyxDQUFDLEVBQWxDO2VBQUEsT0FBTyxDQUFDLEdBQVIsQ0FBWSxjQUFaLEVBQUE7O0lBRkYsQ0FBRCxDQUdKLENBQUMsSUFIRyxDQUdFLElBSEYsQ0FKYjtXQVFBLENBQUEsQ0FBRSxXQUFGLENBQWMsQ0FBQyxLQUFmLENBQXFCLE1BQXJCO0VBVkEsQ0E1QlI7RUF1Q0EsSUFBQSxFQUFNLFNBQUMsQ0FBRDtBQUNFLFFBQUE7SUFBQSxPQUFBLEdBQVU7SUFDVixPQUNRLENBQUMsSUFEVCxDQUNjLG9CQURkLENBRVEsQ0FBQyxJQUZULENBRWMsTUFGZCxDQUdRLENBQUMsSUFIVCxDQUdjLElBQUMsQ0FBQSxVQUhmLENBSVEsQ0FBQyxHQUpULENBSWEsQ0FBQyxTQUFDLEdBQUQsRUFBSyxHQUFMO01BQ0UsT0FBTyxDQUFDLEdBQVIsQ0FBWSxJQUFDLENBQUEsVUFBYjtNQUNBLElBQTJCLEdBQUcsQ0FBQyxFQUEvQjtlQUFBLE9BQU8sQ0FBQyxHQUFSLENBQVksV0FBWixFQUFBOztJQUZGLENBQUQsQ0FHSixDQUFDLElBSEcsQ0FHRSxJQUhGLENBSmI7V0FRQSxDQUFBLENBQUUsV0FBRixDQUFjLENBQUMsS0FBZixDQUFxQixNQUFyQjtFQVZGLENBdkNOO0VBa0RBLFVBQUEsRUFBWSxTQUFDLEtBQUQ7SUFDSixJQUFDLENBQUEsVUFBVSxDQUFDLElBQVosR0FBbUI7V0FDbkIsSUFBQyxDQUFBLE9BQUQsQ0FBUyxJQUFDLENBQUEsVUFBVjtFQUZJLENBbERaO0VBcURBLGlCQUFBLEVBQW1CLFNBQUMsS0FBRDtJQUNYLElBQUMsQ0FBQSxVQUFVLENBQUMsV0FBWixHQUEwQjtXQUMxQixJQUFDLENBQUEsT0FBRCxDQUFTLElBQUMsQ0FBQSxVQUFWO0VBRlcsQ0FyRG5CO0VBd0RBLFVBQUEsRUFBWSxTQUFDLEtBQUQ7SUFDSixJQUFDLENBQUEsVUFBVSxDQUFDLFFBQVosR0FBdUI7V0FDdkIsSUFBQyxDQUFBLE9BQUQsQ0FBUyxJQUFDLENBQUEsVUFBVjtFQUZJLENBeERaO0VBMkRBLFlBQUEsRUFBYyxTQUFDLEtBQUQsRUFBUSxLQUFSO0lBQ04sSUFBQyxDQUFBLFVBQVUsQ0FBQyxPQUFRLENBQUEsS0FBQSxDQUFwQixHQUE2QjtXQUM3QixJQUFDLENBQUEsT0FBRCxDQUFTLElBQUMsQ0FBQSxVQUFWO0VBRk0sQ0EzRGQ7RUE4REEsU0FBQSxFQUFXLFNBQUE7SUFDSCxJQUFDLENBQUEsVUFBVSxDQUFDLE9BQU8sQ0FBQyxJQUFwQixDQUF5QixFQUF6QjtXQUNBLElBQUMsQ0FBQSxPQUFELENBQVMsSUFBQyxDQUFBLFVBQVY7RUFGRyxDQTlEWDtFQWlFQSxZQUFBLEVBQWMsU0FBQyxLQUFEO0lBQ04sT0FBTyxJQUFDLENBQUEsVUFBVSxDQUFDLE9BQVEsQ0FBQSxLQUFBO1dBQzNCLElBQUMsQ0FBQSxPQUFELENBQVMsSUFBQyxDQUFBLFVBQVY7RUFGTSxDQWpFZDtDQURLOztBQXNFYixNQUFNLENBQUMsT0FBUCxHQUFpQjs7OztBQ3hFakIsSUFBQTs7QUFBQSxPQUFBLEdBQVUsT0FBQSxDQUFRLG9CQUFSOztBQUVWLFlBQUEsR0FBZSxPQUFBLENBQVEsMEJBQVI7O0FBQ2YsaUJBQUEsR0FBb0IsT0FBQSxDQUFRLHdCQUFSOztBQUVwQixZQUFBLEdBQWUsTUFBTSxDQUFDLFdBQVAsQ0FDWDtFQUFBLFdBQUEsRUFBYSxDQUFDLE9BQUQsQ0FBYjtFQUNBLElBQUEsRUFBTTtJQUFFLE9BQUEsRUFBUyxFQUFYO0lBQWUsT0FBQSxFQUFTLElBQXhCO0dBRE47RUFFQSxlQUFBLEVBQWlCLFNBQUE7V0FDYixJQUFDLENBQUE7RUFEWSxDQUZqQjtFQUlBLElBQUEsRUFBTSxTQUFBO1dBQ0YsSUFBQyxDQUFBLE9BQUQsQ0FBUyxJQUFDLENBQUEsSUFBVjtFQURFLENBSk47RUFNQSxhQUFBLEVBQWUsU0FBQTtJQUNYLElBQUMsQ0FBQSxJQUFJLENBQUMsT0FBTixHQUFnQjtXQUNoQixJQUFDLENBQUEsT0FBRCxDQUFTLElBQUMsQ0FBQSxJQUFWO0VBRlcsQ0FOZjtFQVNBLGFBQUEsRUFBZSxTQUFBO0lBQ1gsSUFBQyxDQUFBLElBQUksQ0FBQyxPQUFOLEdBQWdCO1dBQ2hCLElBQUMsQ0FBQSxPQUFELENBQVMsSUFBQyxDQUFBLElBQVY7RUFGVyxDQVRmO0VBWUEsaUJBQUEsRUFBbUIsU0FBQyxDQUFEO0lBQ2YsT0FBTyxDQUFDLEdBQVIsQ0FBWSxDQUFaO0lBQ0EsSUFBQyxDQUFBLElBQUksQ0FBQyxPQUFOLEdBQWdCO1dBQ2hCLElBQUMsQ0FBQSxPQUFELENBQVMsSUFBQyxDQUFBLElBQVY7RUFIZSxDQVpuQjtDQURXOztBQW1CZixNQUFNLENBQUMsT0FBUCxHQUFpQjs7OztBQ3hCakIsSUFBQTs7QUFBQSxPQUFBLEdBQVUsT0FBQSxDQUFRLHdCQUFSOztBQUVWLFlBQUEsR0FBZSxPQUFBLENBQVEseUJBQVI7O0FBRWYsZUFBQSxHQUFrQixNQUFNLENBQUMsV0FBUCxDQUNkO0VBQUEsV0FBQSxFQUFhLENBQUMsT0FBRCxDQUFiO0VBQ0EsSUFBQSxFQUFNLEVBRE47RUFFQSxJQUFBLEVBQU0sU0FBQTtXQUNGLElBQUMsQ0FBQSxLQUFELENBQUE7RUFERSxDQUZOO0VBSUEsZUFBQSxFQUFpQixTQUFBO1dBQ2IsSUFBQyxDQUFBO0VBRFksQ0FKakI7RUFNQSxPQUFBLEVBQVMsU0FBQyxDQUFEO0lBQ0wsSUFBQyxDQUFBLElBQUQsR0FBUTtXQUNSLElBQUMsQ0FBQSxLQUFELENBQUE7RUFGSyxDQU5UO0VBU0EsR0FBQSxFQUFLLFNBQUMsQ0FBRDtXQUNELFlBQVksQ0FBQyxPQUFiLENBQXFCLENBQXJCLEVBQXdCLE1BQXhCO0VBREMsQ0FUTDtFQVdBLEtBQUEsRUFBTyxTQUFBO1dBQ0gsSUFBQyxDQUFBLE9BQUQsQ0FBUyxJQUFDLENBQUEsSUFBVjtFQURHLENBWFA7Q0FEYzs7QUFlbEIsTUFBTSxDQUFDLE9BQVAsR0FBaUI7Ozs7QUNuQmpCLElBQUE7O0FBQUEsT0FBQSxHQUFVLE9BQUEsQ0FBUSx5QkFBUjs7QUFFVixXQUFBLEdBQWMsTUFBTSxDQUFDLFdBQVAsQ0FDVjtFQUFBLFdBQUEsRUFBYSxDQUFDLE9BQUQsQ0FBYjtFQUNBLFNBQUEsRUFBVztJQUNQLEVBQUEsRUFBRyxDQURJO0lBRVAsS0FBQSxFQUFPLEVBRkE7SUFHUCxLQUFBLEVBQU8sRUFIQTtJQUlQLE1BQUEsRUFBUTtNQUFDLEVBQUEsRUFBSSxDQUFMO01BQVEsR0FBQSxFQUFLLEVBQWI7S0FKRDtHQURYO0VBT0EsT0FBQSxFQUFTLE1BUFQ7RUFRQSxhQUFBLEVBQWUsRUFSZjtFQVNBLFlBQUEsRUFBYyxFQVRkO0VBVUEsZUFBQSxFQUFpQixTQUFBO1dBQ2IsSUFBQyxDQUFBO0VBRFksQ0FWakI7RUFZQSxHQUFBLEVBQUssU0FBQyxDQUFEO0lBQ0QsSUFBQyxDQUFBLE9BQUQsR0FBVztJQUNYLElBQUMsQ0FBQSxZQUFELEdBQWdCLElBQUMsQ0FBQTtXQUNqQixJQUFDLENBQUEsT0FBRCxDQUFTLElBQUMsQ0FBQSxZQUFWO0VBSEMsQ0FaTDtFQWdCQSxJQUFBLEVBQU0sU0FBQyxDQUFEO0lBQ0YsSUFBQyxDQUFBLE9BQUQsR0FBVztJQUNYLElBQUMsQ0FBQSxZQUFELEdBQWdCLElBQUMsQ0FBQTtXQUNqQixJQUFDLENBQUEsT0FBRCxDQUFTLElBQUMsQ0FBQSxZQUFWO0VBSEUsQ0FoQk47RUFvQkEsZ0JBQUEsRUFBa0IsU0FBQyxDQUFEO1dBQ2QsSUFBQyxDQUFBLGFBQUQsR0FBaUI7RUFESCxDQXBCbEI7RUFzQkEsTUFBQSxFQUFRLFNBQUMsQ0FBRDtBQUNKLFlBQU8sSUFBQyxDQUFBLE9BQVI7QUFBQSxXQUNTLE1BRFQ7ZUFDcUIsSUFBQyxDQUFBLElBQUQsQ0FBTSxDQUFOO0FBRHJCLFdBRVMsS0FGVDtlQUVvQixJQUFDLENBQUEsTUFBRCxDQUFRLENBQVI7QUFGcEI7ZUFHUyxPQUFPLENBQUMsR0FBUixDQUFZLG9CQUFaO0FBSFQ7RUFESSxDQXRCUjtFQTJCQSxNQUFBLEVBQVEsU0FBQyxDQUFEO0FBQ0osUUFBQTtJQUFBLE9BQUEsR0FBVTtJQUNWLE9BQ0ksQ0FBQyxHQURMLENBQ1Msb0JBQUEsR0FBdUIsSUFBQyxDQUFBLGFBQWEsQ0FBQyxHQUQvQyxDQUVJLENBQUMsSUFGTCxDQUVVLE1BRlYsQ0FHSSxDQUFDLElBSEwsQ0FHVSxJQUFDLENBQUEsYUFIWCxDQUlJLENBQUMsR0FKTCxDQUlTLENBQUMsU0FBQyxHQUFELEVBQUssR0FBTDtNQUNGLElBQThCLEdBQUcsQ0FBQyxFQUFsQztlQUFBLE9BQU8sQ0FBQyxHQUFSLENBQVksY0FBWixFQUFBOztJQURFLENBQUQsQ0FFSixDQUFDLElBRkcsQ0FFRSxJQUZGLENBSlQ7V0FPQSxDQUFBLENBQUUsV0FBRixDQUFjLENBQUMsS0FBZixDQUFxQixNQUFyQjtFQVRJLENBM0JSO0VBcUNBLElBQUEsRUFBTSxTQUFDLENBQUQ7QUFDRixRQUFBO0lBQUEsT0FBQSxHQUFVO0lBQ1YsT0FDSSxDQUFDLElBREwsQ0FDVSx3QkFBQSxHQUEyQixRQUFRLENBQUMsSUFBSSxDQUFDLEtBQWQsQ0FBb0IsS0FBcEIsQ0FBMkIsQ0FBQSxDQUFBLENBQUUsQ0FBQyxLQUE5QixDQUFvQyxHQUFwQyxDQUF5QyxDQUFBLENBQUEsQ0FEOUUsQ0FFSSxDQUFDLElBRkwsQ0FFVSxNQUZWLENBR0ksQ0FBQyxJQUhMLENBR1UsSUFBQyxDQUFBLFNBSFgsQ0FJSSxDQUFDLEdBSkwsQ0FJUyxDQUFDLFNBQUMsR0FBRCxFQUFLLEdBQUw7TUFFRixJQUEyQixHQUFHLENBQUMsRUFBL0I7ZUFBQSxPQUFPLENBQUMsR0FBUixDQUFZLFdBQVosRUFBQTs7SUFGRSxDQUFELENBR0osQ0FBQyxJQUhHLENBR0UsSUFIRixDQUpUO1dBUUEsQ0FBQSxDQUFFLFdBQUYsQ0FBYyxDQUFDLEtBQWYsQ0FBcUIsTUFBckI7RUFWRSxDQXJDTjtFQWdEQSxVQUFBLEVBQVksU0FBQyxLQUFEO0lBQ1IsSUFBQyxDQUFBLFNBQVMsQ0FBQyxLQUFYLEdBQW1CO1dBQ25CLElBQUMsQ0FBQSxPQUFELENBQVMsSUFBQyxDQUFBLFNBQVY7RUFGUSxDQWhEWjtFQW1EQSxVQUFBLEVBQVksU0FBQyxLQUFEO0lBQ1IsSUFBQyxDQUFBLFNBQVMsQ0FBQyxFQUFYLEdBQWdCO1dBQ2hCLElBQUMsQ0FBQSxPQUFELENBQVMsSUFBQyxDQUFBLFNBQVY7RUFGUSxDQW5EWjtFQXNEQSxZQUFBLEVBQWMsU0FBQyxLQUFEO0lBQ1YsSUFBQyxDQUFBLFNBQVMsQ0FBQyxNQUFYLEdBQW9CO1dBQ3BCLElBQUMsQ0FBQSxPQUFELENBQVMsSUFBQyxDQUFBLFNBQVY7RUFGVSxDQXREZDtFQXlEQSxXQUFBLEVBQWEsU0FBQyxTQUFEO0FBQ1QsUUFBQTtJQUFBLE9BQUEsR0FBVSxTQUFBO2FBQU0sS0FBQSxDQUFNLDZCQUFOO0lBQU47V0FDVixNQUFNLENBQUMsU0FBUCxDQUNJO01BQUEsSUFBQSxFQUFNLE9BQU47TUFDQSxJQUFBLEVBQU0sb0JBRE47TUFFQSxLQUFBLEVBQU87UUFDTCxJQUFBLEVBQU0sSUFERDtRQUVMLEtBQUEsRUFBTyxJQUZGO09BRlA7TUFLQSxVQUFBLEVBQVksT0FMWjtNQU1BLE9BQUEsRUFBUyxTQU5UO01BT0EsS0FBQSxFQUFPLE9BUFA7S0FESjtFQUZTLENBekRiO0VBb0VBLFlBQUEsRUFBYyxTQUFBO0FBQ1YsUUFBQTtJQUFBLE1BQUEsR0FBUyxJQUFDLENBQUEsU0FBUyxDQUFDO0lBQ3BCLFNBQUEsR0FBWSxDQUFDLFNBQUE7QUFDVCxVQUFBO01BQUEsVUFBQSxHQUFhLENBQUMsU0FBQyxJQUFEO2VBQVUsSUFBQyxDQUFBLEtBQUQsR0FBUyxJQUFJLENBQUM7TUFBeEIsQ0FBRCxDQUE0QixDQUFDLElBQTdCLENBQWtDLElBQWxDO01BQ2IsT0FBTyxDQUFDLEdBQVIsQ0FBWSxJQUFDLENBQUEsS0FBYjtNQUNBLFNBQUEsR0FBWSxDQUFDLFNBQUMsSUFBRDtRQUNHLE1BQU0sQ0FBQyxFQUFQLEdBQVksSUFBSSxDQUFDO2VBQ2pCLE1BQU0sQ0FBQyxHQUFQLEdBQWEsSUFBSSxDQUFDO01BRnJCLENBQUQsQ0FHWCxDQUFDLElBSFUsQ0FHTCxJQUhLO01BSVosTUFBTSxDQUFDLElBQVAsQ0FBWSxTQUFaLEVBQXVCO1FBQUUsSUFBQSxFQUFNLElBQUMsQ0FBQSxTQUFTLENBQUMsRUFBWCxHQUFnQixLQUFoQixHQUF3QixJQUFDLENBQUEsU0FBUyxDQUFDLEtBQTNDO09BQXZCLEVBQTJFLFVBQTNFO01BQ0EsTUFBTSxDQUFDLElBQVAsQ0FBWSxRQUFaLEVBQXNCO1FBQUUsSUFBQSxFQUFNLE1BQVI7UUFBZ0IsT0FBQSxFQUFTLElBQUMsQ0FBQSxLQUExQjtPQUF0QixFQUF5RCxTQUF6RDtNQUNBLE1BQU0sQ0FBQyxJQUFQLENBQVksUUFBWixFQUFzQjtRQUFFLElBQUEsRUFBTSxTQUFSO1FBQW1CLE9BQUEsRUFBUyxJQUFDLENBQUEsS0FBN0I7T0FBdEI7YUFDQSxNQUFNLENBQUMsSUFBUCxDQUFZLFFBQVosRUFBc0I7UUFBRSxJQUFBLEVBQU0sTUFBUjtRQUFnQixPQUFBLEVBQVMsSUFBQyxDQUFBLEtBQTFCO09BQXRCO0lBVlMsQ0FBRCxDQVdYLENBQUMsSUFYVSxDQVdMLElBWEs7V0FZWixJQUFDLENBQUEsV0FBRCxDQUFhLFNBQWI7RUFkVSxDQXBFZDtFQW1GQSxVQUFBLEVBQVksU0FBQyxJQUFEO0FBQ1IsUUFBQTtJQUFBLFNBQUEsR0FBWSxDQUFDLFNBQUE7YUFDVCxNQUFNLENBQUMsSUFBUCxDQUFZLFFBQVosRUFBdUI7UUFBRSxJQUFBLEVBQU0sSUFBUjtRQUFjLE1BQUEsRUFBUSxJQUFDLENBQUEsU0FBUyxDQUFDLE1BQU0sQ0FBQyxFQUF4QztRQUE0QyxHQUFBLEVBQUssSUFBakQ7UUFBdUQsR0FBQSxFQUFLLEtBQTVEO09BQXZCO0lBRFMsQ0FBRCxDQUVYLENBQUMsSUFGVSxDQUVMLElBRks7V0FHWixJQUFDLENBQUEsV0FBRCxDQUFhLFNBQWI7RUFKUSxDQW5GWjtDQURVOztBQTBGZCxNQUFNLENBQUMsT0FBUCxHQUFpQiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJQcm9qZWN0TGlzdEFjdGlvbnMgPSBSZWZsdXguY3JlYXRlQWN0aW9ucyBbXG4gICAgJ2ZldGNoTGlzdCcsXG4gICAgJ2RlbGV0ZScsXG4gICAgJ2NoYW5nZUN1cnJlbnQnXG5dXG5cbm1vZHVsZS5leHBvcnRzID0gUHJvamVjdExpc3RBY3Rpb25zXG4iLCJNb2RhbEFjdGlvbnMgPSBSZWZsdXguY3JlYXRlQWN0aW9ucyBbXG4gICAgJ3N1Ym1pdCcsXG4gICAgJ3NldEN1cnJlbnRQcm9qZWN0JyxcbiAgICAnc2V0VHlwZScsXG4gICAgJ2hhbmRsZU5hbWUnLFxuICAgICdoYW5kbGVEZXNjcmlwdGlvbicsXG4gICAgJ2hhbmRsZVJlcG8nLFxuICAgICdoYW5kbGVNZW1iZXInLFxuICAgICdhZGRNZW1iZXInLFxuICAgICdkZWxldGVNZW1iZXInXG5dXG5cbm1vZHVsZS5leHBvcnRzID0gTW9kYWxBY3Rpb25zXG4iLCJQcm9qZWN0QWN0aW9ucyA9IFJlZmx1eC5jcmVhdGVBY3Rpb25zIFtcbiAgICAnc2VsZWN0QmFja2xvZycsXG4gICAgJ3NldEN1cnJlbnRQcm9qZWN0JyxcbiAgICAnc2VsZWN0U3ByaW50cydcbl1cblxubW9kdWxlLmV4cG9ydHMgPSBQcm9qZWN0QWN0aW9uc1xuIiwiU3ByaW50TGlzdEFjdGlvbnMgPSBSZWZsdXguY3JlYXRlQWN0aW9ucyBbXG4gICAgJ2hhbmRsZU5hbWUnLFxuICAgICdoYW5kbGVEZXNjcmlwdGlvbicsXG4gICAgJ2FkZCcsXG4gICAgJ3NldExpc3QnXG5dXG5cbm1vZHVsZS5leHBvcnRzID0gU3ByaW50TGlzdEFjdGlvbnNcbiIsIk1vZGFsQWN0aW9ucyA9IFJlZmx1eC5jcmVhdGVBY3Rpb25zIFtcbiAgICAnc3VibWl0JyxcbiAgICAnc2V0Q3VycmVudFNwcmludCcsXG4gICAgJ2hhbmRsZU5hbWUnLFxuICAgICdoYW5kbGVEYXRlJyxcbiAgICAnaGFuZGxlS2FuYmFuJyxcbiAgICAnY3JlYXRlS2FuYmFuJyxcbiAgICAnYWRkJyxcbiAgICAnZWRpdCdcbl1cblxubW9kdWxlLmV4cG9ydHMgPSBNb2RhbEFjdGlvbnNcbiIsIlByb2plY3RNb2RhbCA9IHJlcXVpcmUgJy4uL2NvbXBvbmVudHMvcHJvamVjdC1tb2RhbCdcblNwcmludE1vZGFsID0gcmVxdWlyZSAnLi4vY29tcG9uZW50cy9zcHJpbnQtbW9kYWwnXG5Nb2RhbCA9IHJlcXVpcmUgJy4uL2NvbXBvbmVudHMvbW9kYWwnXG5cbk1vZGFsTGlzdCA9IFJlYWN0LmNyZWF0ZUNsYXNzXG4gICAgcmVuZGVyIDogLT5cbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCBudWxsLFxuICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoTW9kYWwsIG51bGwsXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFByb2plY3RNb2RhbCwgbnVsbClcbiAgICAgICAgICApLFxuICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoTW9kYWwsIG51bGwsXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFNwcmludE1vZGFsLCBudWxsKVxuICAgICAgICAgIClcbiAgICAgICAgKVxuXG5tb2R1bGUuZXhwb3J0cyA9IE1vZGFsTGlzdCIsIk1vZGFsID0gUmVhY3QuY3JlYXRlQ2xhc3NcbiAgICByZW5kZXIgOiAtPlxuICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7XCJjbGFzc05hbWVcIjogXCJtb2RhbCBmYWRlXCIsIFwiaWRcIjogKEBwcm9wcy5pZCksIFwicm9sZVwiOiBcImRpYWxvZ1wiLCBcImFyaWEtbGFiZWxsZWRieVwiOiBcIm1vZGFsTGFiZWxcIn0sXG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge1wiY2xhc3NOYW1lXCI6IFwibW9kYWwtZGlhbG9nXCIsIFwicm9sZVwiOiBcImRvY3VtZW50XCJ9LFxuICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge1wiY2xhc3NOYW1lXCI6IFwibW9kYWwtY29udGVudFwifSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge1wiY2xhc3NOYW1lXCI6IFwibW9kYWwtaGVhZGVyXCJ9LFxuICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIsIHtcInR5cGVcIjogXCJidXR0b25cIiwgXCJjbGFzc05hbWVcIjogXCJjbG9zZVwiLCBcImRhdGEtZGlzbWlzc1wiOiBcIm1vZGFsXCIsIFwiYXJpYS1sYWJlbFwiOiBcIkNsb3NlXCJ9LFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIHtcImFyaWEtaGlkZGVuXCI6IFwidHJ1ZVwifSwgXCLDl1wiKVxuICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiaDRcIiwge1wiY2xhc3NOYW1lXCI6IFwibW9kYWwtdGl0bGVcIiwgXCJpZFwiOiAnbW9kYWxMYWJlbCd9LCAoQHByb3BzLnRpdGxlKSlcbiAgICAgICAgICAgICksXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtcImNsYXNzTmFtZVwiOiBcIm1vZGFsLWJvZHlcIn0sXG4gICAgICAgICAgICAgIChAcHJvcHMuY2hpbGRyZW4pXG4gICAgICAgICAgICApXG4gICAgICAgICAgKVxuICAgICAgICApXG4gICAgICApXG5cbm1vZHVsZS5leHBvcnRzID0gTW9kYWwiLCJBY3Rpb25zID0gcmVxdWlyZSAnLi4vYWN0aW9ucy9wcm9qZWN0LWxpc3QnXG5TdG9yZSA9IHJlcXVpcmUgJy4uL3N0b3Jlcy9wcm9qZWN0LWxpc3QnXG5cbk1vZGFsQWN0aW9ucyA9IHJlcXVpcmUgJy4uL2FjdGlvbnMvcHJvamVjdC1tb2RhbCdcblxuQWRkUHJvamVjdCA9IFJlYWN0LmNyZWF0ZUNsYXNzXG4gICAgICAgIHJlbmRlciA6IC0+XG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImFcIiwgeyBcXFxuICAgICAgICAgICAgICAgICBcIm9uQ2xpY2tcIjogKE1vZGFsQWN0aW9ucy5zZXRUeXBlLmJpbmQgbnVsbCwgZXZlbnQsICdwb3N0JyksICBcXFxuICAgICAgICAgICAgICAgICBcImRhdGEtdG9nZ2xlXCI6IFwibW9kYWxcIiwgIFxcXG4gICAgICAgICAgICAgICAgIFwiZGF0YS10YXJnZXRcIjogXCIjYWRkUHJvamVjdFwiLCAgXFxcbiAgICAgICAgICAgICAgICAgXCJjbGFzc05hbWVcIjogXCJtYXRlcmlhbC1pY29uc1wifSwgXCJcIlwiXG4gICAgICAgICAgICAgICAgICBhZGRcblwiXCJcIilcblxuRGVsZXRlQ29uZmlybSA9IFJlYWN0LmNyZWF0ZUNsYXNzXG4gICAgICAgIHJlbmRlciA6IC0+XG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7XCJjbGFzc05hbWVcIjogXCJtb2RhbCBmYWRlXCIsIFwiaWRcIjogXCJjb25maXJtTW9kYWxcIn0sXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtcImNsYXNzTmFtZVwiOiBcIm1vZGFsLWRpYWxvZ1wifSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7XCJjbGFzc05hbWVcIjogXCJtb2RhbC1jb250ZW50XCJ9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge1wiY2xhc3NOYW1lXCI6IFwibW9kYWwtaGVhZGVyXCJ9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiLCB7XCJ0eXBlXCI6IFwiYnV0dG9uXCIsICBcXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY2xhc3NOYW1lXCI6IFwiY2xvc2VcIiwgIFxcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJkYXRhLWRpc21pc3NcIjogXCJtb2RhbFwiLCAgXFxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImFyaWEtbGFiZWxcIjogXCJDbG9zZVwifSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwic3BhblwiLCB7XCJhcmlhLWhpZGRlblwiOiBcInRydWVcIn0sIFwiXCJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICDDl1xuXCJcIlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJoNFwiLCB7XCJjbGFzc05hbWVcIjogXCJtb2RhbC10aXRsZVwifSwgXCJcIlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRXRlcy12b3VzIHN1ciBkZSB2b3Vsb2lyIHN1cHByaW1lciBsZSBwcm9qZXQ/XG5cIlwiXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtcImNsYXNzTmFtZVwiOiBcIm1vZGFsLWJvZHlcIn0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIsIHsgXFxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJidXR0b25cIiwgIFxcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjbGFzc05hbWVcIjogXCJidG4gYnRuLWRlZmF1bHRcIiwgIFxcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJkYXRhLWRpc21pc3NcIjogXCJtb2RhbFwifSwgXCJcIlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTm9uXG5cIlwiXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiLCB7IFxcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwic3VibWl0XCIsICBcXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY2xhc3NOYW1lXCI6IFwiYnRuIGJ0bi1wcmltYXJ5XCIsICBcXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwib25DbGlja1wiOiAoQHByb3BzLmhhbmRsZSl9LCBcIlwiXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBPdWlcblwiXCJcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICApXG5cbkRlbGV0ZVByb2plY3QgPSBSZWFjdC5jcmVhdGVDbGFzc1xuICAgICAgICByZW5kZXIgOiAtPlxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIG51bGwsXG4gICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIsIHtcInR5cGVcIjogXCJidXR0b25cIiwgXCJjbGFzc05hbWVcIjogXCJidG4gYnRuLWRlZmF1bHRcIn0sXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJhXCIsIHsgXFxcbiAgICAgICAgICAgICAgICAgICAgIFwiZGF0YS10b2dnbGVcIjogXCJtb2RhbFwiLCAgXFxcbiAgICAgICAgICAgICAgICAgICAgIFwiZGF0YS10YXJnZXRcIjogXCIjY29uZmlybU1vZGFsXCIsICBcXFxuICAgICAgICAgICAgICAgICAgICAgXCJjbGFzc05hbWVcIjogXCJtYXRlcmlhbC1pY29uc1wifSwgXCJcIlwiXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWxldGVcblwiXCJcIilcbiAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KERlbGV0ZUNvbmZpcm0sIHtcImhhbmRsZVwiOiAoQWN0aW9ucy5kZWxldGUpfSlcbiAgICAgICAgICAgICAgICApXG5cbkVkaXRQcm9qZWN0ID0gUmVhY3QuY3JlYXRlQ2xhc3NcbiAgICAgICAgcmVuZGVyIDogLT5cbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiYVwiLCB7IFxcXG4gICAgICAgICAgICAgICAgIFwib25DbGlja1wiOiAoTW9kYWxBY3Rpb25zLnNldFR5cGUuYmluZCBudWxsLCBldmVudCwncHV0JyksICBcXFxuICAgICAgICAgICAgICAgICBcImRhdGEtdG9nZ2xlXCI6IFwibW9kYWxcIiwgIFxcXG4gICAgICAgICAgICAgICAgIFwiZGF0YS10YXJnZXRcIjogXCIjYWRkUHJvamVjdFwiLCAgXFxcbiAgICAgICAgICAgICAgICAgXCJjbGFzc05hbWVcIjogXCJtYXRlcmlhbC1pY29uc1wifSwgXCJcIlwiXG4gICAgICAgICAgICAgICAgICAgIGVkaXRcblwiXCJcIilcblxuUHJvamVjdCA9IFJlYWN0LmNyZWF0ZUNsYXNzXG4gICAgICAgICAgICAgICAgICAgICAgICByZW5kZXI6IC0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJsaVwiLCB7IFxcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIm9uQ2xpY2tcIjogKEBwcm9wcy5vbkNsaWNrLmJpbmQgbnVsbCxAcHJvcHMuaWQpLCAgXFxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY2xhc3NOYW1lXCI6IFwiXCIsICBcXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhcmlhLWxhYmVsbGVkYnlcIjogXCJkcm9wZG93bk1lbnVcIn0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiYVwiLCBudWxsLCAoQHByb3BzLm5hbWUpKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG5cblByb2plY3RMaXN0ID0gUmVhY3QuY3JlYXRlQ2xhc3NcbiAgICAgICAgICAgICAgICAgICAgICAgIG1peGluczogW1JlZmx1eC5jb25uZWN0KFN0b3JlLCAnZGF0YScpXVxuICAgICAgICAgICAgICAgICAgICAgICAgcmVuZGVyOiAtPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50ID0gQHN0YXRlLmRhdGEuY3VycmVudFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9qZWN0cyA9IEBzdGF0ZS5kYXRhLnByb2plY3RzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpc3QgPSBbXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3Igayxwcm9qZWN0IG9mIHByb2plY3RzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGlzdC5wdXNoIFJlYWN0LmNyZWF0ZUVsZW1lbnQoUHJvamVjdCwgeyBcXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJpZFwiOiAoayksICBcXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJrZXlcIjogKGspLCAgXFxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibmFtZVwiOiAocHJvamVjdC5uYW1lKSwgIFxcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIm9uQ2xpY2tcIjogKEFjdGlvbnMuY2hhbmdlQ3VycmVudCl9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtcImNsYXNzTmFtZVwiOiBcImJ0bi1ncm91cFwiLCBcInJvbGVcIjogXCJncm91cFwiLCBcImFyaWEtbGFiZWxcIjogXCIuLi5cIn0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtcImNsYXNzTmFtZVwiOiBcImRyb3Bkb3duXCJ9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIiwgeyBcXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJidXR0b25cIiwgIFxcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY2xhc3NOYW1lXCI6IFwiYnRuIGJ0bi1kZWZhdWx0IGRyb3Bkb3duLXRvZ2dsZVwiLCAgXFxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJpZFwiOiBcImRyb3Bkb3duTWVudVwiLCAgXFxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJkYXRhLXRvZ2dsZVwiOiBcImRyb3Bkb3duXCIsICBcXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImFyaWEtaGFzcG9wdXBcIjogXCJ0cnVlXCIsICBcXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImFyaWEtZXhwYW5kZWRcIjogXCJ0cnVlXCJ9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwicFwiLCBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKHByb2plY3RzW2N1cnJlbnRdLm5hbWUgaWYgcHJvamVjdHMubGVuZ3RoIGlzbnQgMCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwic3BhblwiLCB7XCJjbGFzc05hbWVcIjogXCJjYXJldFwifSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiLCB7XCJ0eXBlXCI6IFwiYnV0dG9uXCIsIFwiY2xhc3NOYW1lXCI6IFwiYnRuIGJ0bi1kZWZhdWx0XCJ9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEVkaXRQcm9qZWN0LCB7XCJwcm9qZWN0XCI6IChwcm9qZWN0c1tjdXJyZW50XSl9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChEZWxldGVQcm9qZWN0LCBudWxsKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIsIHtcInR5cGVcIjogXCJidXR0b25cIiwgXCJjbGFzc05hbWVcIjogXCJidG4gYnRuLWRlZmF1bHRcIn0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQWRkUHJvamVjdCwgbnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJ1bFwiLCB7XCJjbGFzc05hbWVcIjogXCJkcm9wZG93bi1tZW51XCJ9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGxpc3QpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG5cblxubW9kdWxlLmV4cG9ydHMgPSBQcm9qZWN0TGlzdFxuIiwiQWN0aW9ucyA9IHJlcXVpcmUgJy4uL2FjdGlvbnMvcHJvamVjdC1tb2RhbCdcblN0b3JlID0gcmVxdWlyZSAnLi4vc3RvcmVzL3Byb2plY3QtbW9kYWwnXG5cbk1vZGFsID0gcmVxdWlyZSAnLi9tb2RhbCdcblxuVGV4dElucHV0ID0gUmVhY3QuY3JlYXRlQ2xhc3NcbiAgICByZW5kZXIgOiAtPlxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtcImNsYXNzTmFtZVwiOiBcImZvcm0tZ3JvdXBcIn0sXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwibGFiZWxcIiwge1wiaHRtbEZvclwiOiAoQHByb3BzLmlkKX0sXG4gICAgICAgICAgICAgICAgKEBwcm9wcy5wbGFjZWhvbGRlcilcbiAgICAgICAgICAgICksXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIiwgeyBcXFxuICAgICAgICAgICAgIFwib25DaGFuZ2VcIjogKCgoZSkgLT5cbiAgICAgICAgICAgICAgIEBwcm9wcy5vbkNoYW5nZSBlLnRhcmdldC52YWx1ZSkuYmluZCBAKSwgIFxcXG4gICAgICAgICAgICAgXCJ2YWx1ZVwiOiAoQHByb3BzLnRleHQpLCAgXFxcbiAgICAgICAgICAgICBcInR5cGVcIjogXCJ0ZXh0XCIsICBcXFxuICAgICAgICAgICAgIFwiY2xhc3NOYW1lXCI6IFwiZm9ybS1jb250cm9sXCIsICBcXFxuICAgICAgICAgICAgIFwiaWRcIjogKEBwcm9wcy5pZCksICBcXFxuICAgICAgICAgICAgIFwicGxhY2Vob2xkZXJcIjogKEBwcm9wcy5wbGFjZWhvbGRlciksICBcXFxuICAgICAgICAgICAgIFwicmVxdWlyZWRcIjogKEBwcm9wcy5yZXF1aXJlZCl9KVxuICAgICAgICApXG5cbk1lbWJlciA9IFJlYWN0LmNyZWF0ZUNsYXNzXG4gICAgICAgIHJlbmRlciA6IC0+XG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7XCJjbGFzc05hbWVcIjogXCJyb3dcIn0sXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtcImNsYXNzTmFtZVwiOiBcImNvbC1tZC0xMVwifSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImlucHV0XCIsIHsgXFxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwib25DaGFuZ2VcIjogKCgoZSktPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBBY3Rpb25zLmhhbmRsZU1lbWJlcihAcHJvcHMuaWQsIGUudGFyZ2V0LnZhbHVlKSkuYmluZCBAKSwgIFxcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IChAcHJvcHMubmFtZSksICBcXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLCAgXFxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY2xhc3NOYW1lXCI6IFwiZm9ybS1jb250cm9sXCIsICBcXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwbGFjZWhvbGRlclwiOiBcIk5vbVwifSlcbiAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtcImNsYXNzTmFtZVwiOiBcImNvbC1tZC0xXCJ9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiaVwiLCB7IFxcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNsYXNzTmFtZVwiOiBcIm1hdGVyaWFsLWljb25zXCIsICBcXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJvbkNsaWNrXCI6IChNb2RhbEFjdGlvbnMuZGVsZXRlTWVtYmVyLmJpbmQgbnVsbCwgQHByb3BzLmlkKX0sIFwiXCJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlXG5cIlwiXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgKVxuXG5NZW1iZXJzSW5wdXQgPSBSZWFjdC5jcmVhdGVDbGFzc1xuICAgICAgICByZW5kZXI6IC0+XG4gICAgICAgICAgICAgICAgbWVtYmVyVmlld3MgPSBbXVxuICAgICAgICAgICAgICAgIGZvciBrLHYgb2YgQHByb3BzLm1lbWJlcnNcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lbWJlclZpZXdzLnB1c2ggUmVhY3QuY3JlYXRlRWxlbWVudChNZW1iZXIsIHsgXFxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibmFtZVwiOiAodiksICBcXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJpZFwiOiAoayksICBcXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJrZXlcIjogKGspfSlcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtcImNsYXNzTmFtZVwiOiBcImZvcm0tZ3JvdXBcIn0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJsYWJlbFwiLCBudWxsLCBcIkNvbGxhYm9yYXRldXJzXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAobWVtYmVyVmlld3MpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiaVwiLCB7XCJjbGFzc05hbWVcIjogXCJtYXRlcmlhbC1pY29uc1wiLCBcIm9uQ2xpY2tcIjogKEFjdGlvbnMuYWRkTWVtYmVyKX0sIFwiXCJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFkZFxuXCJcIlwiKVxuICAgICAgICAgICAgICAgIClcblxuXG5Gb3JtID0gUmVhY3QuY3JlYXRlQ2xhc3NcbiAgICBtaXhpbnM6IFtSZWZsdXguY29ubmVjdChTdG9yZSwgJ3Byb2plY3QnKV1cbiAgICByZW5kZXIgOiAtPlxuICAgICAgICBwcm9qZWN0ID0gQHN0YXRlLnByb2plY3RcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImZvcm1cIiwge1wib25TdWJtaXRcIjogKChlKSAtPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKSAjcG91ciDDqXZpdGVyIGRlIHJlY2hhcmdlciBsYSBwYWdlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgQWN0aW9ucy5zdWJtaXQgZSl9LFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUZXh0SW5wdXQsIHtcIm9uQ2hhbmdlXCI6IChBY3Rpb25zLmhhbmRsZU5hbWUpLCBcInRleHRcIjogKHByb2plY3QubmFtZSksIFwiaWRcIjogXCJpbnB1dE5hbWVcIiwgXCJwbGFjZWhvbGRlclwiOiBcIk5vbVwiLCBcInJlcXVpcmVkXCI6IFwicmVxdWlyZWRcIn0pLFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUZXh0SW5wdXQsIHtcIm9uQ2hhbmdlXCI6IChBY3Rpb25zLmhhbmRsZURlc2NyaXB0aW9uKSwgXCJ0ZXh0XCI6IChwcm9qZWN0LmRlc2NyaXB0aW9uKSwgXCJpZFwiOiBcImlucHV0RGVzY3JpcHRpb25cIiwgXCJwbGFjZWhvbGRlclwiOiBcIkRlc2NyaXB0aW9uXCJ9KSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGV4dElucHV0LCB7XCJvbkNoYW5nZVwiOiAoQWN0aW9ucy5oYW5kbGVSZXBvKSwgXCJ0ZXh0XCI6IChwcm9qZWN0LmdpdF9yZXBvKSwgXCJpZFwiOiBcImlucHV0UmVwb1wiLCBcInBsYWNlaG9sZGVyXCI6IFwiRMOpcG90IGdpdFwifSksXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KE1lbWJlcnNJbnB1dCwge1wibWVtYmVyc1wiOiAocHJvamVjdC5tZW1iZXJzKX0pLFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiLCB7XCJ0eXBlXCI6IFwiYnV0dG9uXCIsIFwiY2xhc3NOYW1lXCI6IFwiYnRuIGJ0bi1kZWZhdWx0XCIsIFwiZGF0YS1kaXNtaXNzXCI6IFwibW9kYWxcIn0sIFwiRmVybWVyXCIpLFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiLCB7XCJ0eXBlXCI6IFwic3VibWl0XCIsIFwiY2xhc3NOYW1lXCI6IFwiYnRuIGJ0bi1wcmltYXJ5XCJ9LCBcIkFwcGxpcXVlclwiKVxuICAgICAgICApXG5cblByb2plY3RNb2RhbCA9IFJlYWN0LmNyZWF0ZUNsYXNzXG4gICAgcmVuZGVyIDogLT5cbiAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEZvcm0sIG51bGwpXG5cbm1vZHVsZS5leHBvcnRzID0gUHJvamVjdE1vZGFsIiwiQWN0aW9ucyA9IHJlcXVpcmUgJy4uL2FjdGlvbnMvcHJvamVjdCdcblN0b3JlID0gcmVxdWlyZSAnLi4vc3RvcmVzL3Byb2plY3QnXG5cblNwcmludExpc3QgPSByZXF1aXJlICcuL3NwcmludC1saXN0J1xuXG5UYWJOYXYgPSBSZWFjdC5jcmVhdGVDbGFzc1xuICAgIHJlbmRlcjogLT5cbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcIm5hdlwiLCB7XCJyb2xlXCI6IFwibmF2aWdhdGlvblwifSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJ1bFwiLCB7XCJjbGFzc05hbWVcIjogXCJuYXYgbmF2LXRhYnNcIn0sXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImxpXCIsIHsgXFxcbiAgICAgICAgICAgICAgICAgXCJvbkNsaWNrXCI6IChBY3Rpb25zLnNlbGVjdEJhY2tsb2cpLCAgXFxcbiAgICAgICAgICAgICAgICAgXCJyb2xlXCI6IFwicHJlc2VudGF0aW9uXCIsICBcXFxuICAgICAgICAgICAgICAgICBcImNsYXNzTmFtZVwiOiAoJ2FjdGl2ZScgaWYgQHByb3BzLmJhY2tsb2cpfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJhXCIsIG51bGwsIFwiQmFja2xvZ1wiKVxuICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImxpXCIsIHsgXFxcbiAgICAgICAgICAgICAgICAgXCJvbkNsaWNrXCI6IChBY3Rpb25zLnNlbGVjdFNwcmludHMpLCAgXFxcbiAgICAgICAgICAgICAgICAgXCJyb2xlXCI6IFwicHJlc2VudGF0aW9uXCIsICBcXFxuICAgICAgICAgICAgICAgICBcImNsYXNzTmFtZVwiOiAoJ2FjdGl2ZScgaWYgbm90IEBwcm9wcy5iYWNrbG9nKX0sXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiYVwiLCBudWxsLCBcIlNwcmludHNcIilcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICApXG4gICAgICAgIClcblxuVGFiQ29udGVudCA9IFJlYWN0LmNyZWF0ZUNsYXNzXG4gICAgcmVuZGVyOiAtPlxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIG51bGwsXG4gICAgICAgICAgICAoUmVhY3QuY3JlYXRlRWxlbWVudChTcHJpbnRMaXN0LCBudWxsKSBpZiBub3QgQHByb3BzLmJhY2tsb2cpXG4gICAgICAgIClcblxuUHJvamVjdCA9IFJlYWN0LmNyZWF0ZUNsYXNzXG4gICAgbWl4aW5zOiBbUmVmbHV4LmNvbm5lY3QoU3RvcmUsICdkYXRhJyldXG4gICAgcmVuZGVyOiAtPlxuICAgICAgICBiYWNrbG9nID0gQHN0YXRlLmRhdGEuYmFja2xvZ1xuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIG51bGwsXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRhYk5hdiwge1wiYmFja2xvZ1wiOiAoYmFja2xvZyl9KSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGFiQ29udGVudCwge1wiYmFja2xvZ1wiOiAoYmFja2xvZyl9KVxuICAgICAgICApXG5cbm1vZHVsZS5leHBvcnRzID0gUHJvamVjdFxuIiwiU3RvcmUgPSByZXF1aXJlICcuLi9zdG9yZXMvc3ByaW50LWxpc3QnXG5BY3Rpb25zID0gcmVxdWlyZSAnLi4vYWN0aW9ucy9zcHJpbnQtbGlzdCdcblxuTW9kYWxBY3Rpb25zID0gcmVxdWlyZSAnLi4vYWN0aW9ucy9zcHJpbnQtbW9kYWwnXG5cblNwcmludCA9IFJlYWN0LmNyZWF0ZUNsYXNzXG4gICAgcmVuZGVyOiAtPlxuICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7XCJjbGFzc05hbWVcIjogXCJwYW5lbCBwYW5lbC1wcmltYXJ5XCJ9LFxuICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge1wiY2xhc3NOYW1lXCI6IFwicGFuZWwtaGVhZGluZ1wifSxcbiAgICAgICAgICAgICAgKEBwcm9wcy5pZClcbiAgICAgICAgICApLFxuICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge1wiY2xhc3NOYW1lXCI6IFwicGFuZWwtYm9keVwifSxcbiAgICAgICAgICAgICAgKEBwcm9wcy5zdGFydClcbiAgICAgICAgICApXG4gICAgICApXG5cblNwcmludExpc3QgPSBSZWFjdC5jcmVhdGVDbGFzc1xuICAgIG1peGluczogW1JlZmx1eC5jb25uZWN0KFN0b3JlLCAnbGlzdCcpXVxuICAgIHJlbmRlcjogLT5cbiAgICAgICAgY29uc29sZS5sb2cgQHN0YXRlLmxpc3RcbiAgICAgICAgaXRlbXMgPSBAc3RhdGUubGlzdC5tYXAgKGkpIC0+IFJlYWN0LmNyZWF0ZUVsZW1lbnQoU3ByaW50LCB7XCJrZXlcIjogKGkuaWQpLCBcImlkXCI6IChpLmlkKSwgXCJzdGFydFwiOiAoaS5zdGFydCl9KVxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtcImNsYXNzTmFtZVwiOiBcImxpc3QtZ3JvdXBcIn0sXG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIiwge1widHlwZVwiOiBcImJ1dHRvblwiLCBcImNsYXNzTmFtZVwiOiBcImJ0biBidG4tZGVmYXVsdFwifSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJhXCIsIHsgXFxcbiAgICAgICAgICAgICBcIm9uQ2xpY2tcIjogKChlKS0+IChcbiAgICAgICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgICAgICAgICAgICAgICAgICBNb2RhbEFjdGlvbnMuYWRkKSksICBcXFxuICAgICAgICAgICAgIFwiZGF0YS10b2dnbGVcIjogXCJtb2RhbFwiLCAgXFxcbiAgICAgICAgICAgICBcImRhdGEtdGFyZ2V0XCI6IFwiI2FkZFNwcmludFwiLCAgXFxcbiAgICAgICAgICAgICBcImNsYXNzTmFtZVwiOiBcIm1hdGVyaWFsLWljb25zXCJ9LCBcIlwiXCJcbiAgICAgICAgICAgICAgICBhZGRcblwiXCJcIilcbiAgICAgICAgKSxcblxuICAgICAgICAgICAgKGl0ZW1zKVxuICAgICAgICApXG5cbm1vZHVsZS5leHBvcnRzID0gU3ByaW50TGlzdFxuIiwiU3RvcmUgPSByZXF1aXJlICcuLi9zdG9yZXMvc3ByaW50LW1vZGFsJ1xuQWN0aW9ucyA9IHJlcXVpcmUgJy4uL2FjdGlvbnMvc3ByaW50LW1vZGFsJ1xuXG5Nb2RhbCA9IHJlcXVpcmUgJy4vbW9kYWwnXG5cblRleHRJbnB1dCA9IFJlYWN0LmNyZWF0ZUNsYXNzXG4gICAgcmVuZGVyIDogLT5cbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7XCJjbGFzc05hbWVcIjogXCJmb3JtLWdyb3VwXCJ9LFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImxhYmVsXCIsIHtcImh0bWxGb3JcIjogKEBwcm9wcy5pZCl9LFxuICAgICAgICAgICAgICAgIChAcHJvcHMucGxhY2Vob2xkZXIpXG4gICAgICAgICAgICApLFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImlucHV0XCIsIHsgXFxcbiAgICAgICAgICAgICBcIm9uQ2hhbmdlXCI6ICgoKGUpIC0+XG4gICAgICAgICAgICAgICBAcHJvcHMub25DaGFuZ2UgZS50YXJnZXQudmFsdWUpLmJpbmQgQCksICBcXFxuICAgICAgICAgICAgIFwidmFsdWVcIjogKEBwcm9wcy50ZXh0KSwgIFxcXG4gICAgICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLCAgXFxcbiAgICAgICAgICAgICBcImNsYXNzTmFtZVwiOiBcImZvcm0tY29udHJvbFwiLCAgXFxcbiAgICAgICAgICAgICBcImlkXCI6IChAcHJvcHMuaWQpLCAgXFxcbiAgICAgICAgICAgICBcInBsYWNlaG9sZGVyXCI6IChAcHJvcHMucGxhY2Vob2xkZXIpLCAgXFxcbiAgICAgICAgICAgICBcInJlcXVpcmVkXCI6IChAcHJvcHMucmVxdWlyZWQpfSlcbiAgICAgICAgKVxuXG5TcHJpbnRGb3JtID0gUmVhY3QuY3JlYXRlQ2xhc3NcbiAgICBtaXhpbnM6IFtSZWZsdXguY29ubmVjdChTdG9yZSwgJ3NwcmludCcpXVxuICAgIHJlbmRlciA6IC0+XG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJmb3JtXCIsIHtcIm9uU3VibWl0XCI6ICgoZSkgLT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCkgI3BvdXIgw6l2aXRlciBkZSByZWNoYXJnZXIgbGEgcGFnZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFjdGlvbnMuc3VibWl0IGUpfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGV4dElucHV0LCB7XCJvbkNoYW5nZVwiOiAoQWN0aW9ucy5oYW5kbGVOYW1lKSwgXCJ0ZXh0XCI6IChAc3RhdGUuc3ByaW50LmlkKSwgXCJpZFwiOiBcImlucHV0TmFtZVwiLCBcInBsYWNlaG9sZGVyXCI6IFwiTm9tXCIsIFwicmVxdWlyZWRcIjogXCJyZXF1aXJlZFwifSksXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtcImNsYXNzTmFtZVwiOiBcImZvcm0tZ3JvdXBcIn0sXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwibGFiZWxcIiwge1wiaHRtbEZvclwiOiBcImlucHV0RGF0ZVwifSwgXCJcIlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgRGF0ZSBkZSBkw6lidXRcblwiXCJcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIiwgeyBcXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwib25DaGFuZ2VcIjogKCgoZSkgLT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFjdGlvbnMuaGFuZGxlRGF0ZSBlLnRhcmdldC52YWx1ZSkuYmluZCBAKSwgIFxcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiAoQHN0YXRlLnNwcmludC5zdGFydCksICBcXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImRhdGVcIiwgIFxcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjbGFzc05hbWVcIjogXCJmb3JtLWNvbnRyb2xcIiwgIFxcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJpZFwiOiBcImlucHV0RGF0ZVwiLCAgXFxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInJlcXVpcmVkXCI6IFwicmVxdWlyZWRcIn0pXG4gICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiLCB7IFxcXG4gICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiYnV0dG9uXCIsICBcXFxuICAgICAgICAgICAgICAgICAgICAgICAgIFwiY2xhc3NOYW1lXCI6IFwiYnRuIGJ0bi1kZWZhdWx0XCIsICBcXFxuICAgICAgICAgICAgICAgICAgICAgICAgIFwiZGF0YS1kaXNtaXNzXCI6IFwibW9kYWxcIn0sIFwiXCJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFubnVsZXJcblwiXCJcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIsIHsgXFxcbiAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJzdWJtaXRcIiwgIFxcXG4gICAgICAgICAgICAgICAgICAgICAgICAgXCJjbGFzc05hbWVcIjogXCJidG4gYnRuLXByaW1hcnlcIiwgIFxcXG4gICAgICAgICAgICAgICAgICAgICAgICAgXCJvbkNsaWNrXCI6IChAcHJvcHMuaGFuZGxlKX0sIFwiXCJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFwcGxpcXVlclxuXCJcIlwiKVxuICAgICAgICAgICAgICAgICAgICApXG5cblxuU3ByaW50TW9kYWwgPSBSZWFjdC5jcmVhdGVDbGFzc1xuICAgIHJlbmRlciA6IC0+XG4gICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChTcHJpbnRGb3JtLCBudWxsKVxuXG5cbm1vZHVsZS5leHBvcnRzID0gU3ByaW50TW9kYWwiLCJQcm9qZWN0TGlzdCA9IHJlcXVpcmUgJy4vY29tcG9uZW50cy9wcm9qZWN0LWxpc3QnXG5Qcm9qZWN0ID0gcmVxdWlyZSAnLi9jb21wb25lbnRzL3Byb2plY3QnXG5Nb2RhbExpc3QgPSByZXF1aXJlICcuL2NvbXBvbmVudHMvbW9kYWwtbGlzdCdcblByb2plY3RNb2RhbCA9IHJlcXVpcmUgJy4vY29tcG9uZW50cy9wcm9qZWN0LW1vZGFsJ1xuU3ByaW50ID0gcmVxdWlyZSAnLi9jb21wb25lbnRzL3NwcmludC1tb2RhbCdcblJvdXRlciA9IFJlYWN0Um91dGVyLlJvdXRlclxuUm91dGUgPSBSZWFjdFJvdXRlci5Sb3V0ZVxuTGluayA9IFJlYWN0Um91dGVyLkxpbmtcblxuUGFuZWwgPSBSZWFjdC5jcmVhdGVDbGFzc1xuICByZW5kZXI6IC0+XG4gICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCBudWxsLFxuICAgICAgKHRoaXMucHJvcHMuY2hpbGRyZW4pXG4gICAgKVxuXG5JbmRleCA9IFJlYWN0LmNyZWF0ZUNsYXNzXG4gIHJlbmRlcjogLT5cbiAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCBudWxsLFxuICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChQcm9qZWN0TGlzdCwgbnVsbCksXG4gICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFByb2plY3QsIG51bGwpLFxuICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChNb2RhbExpc3QsIG51bGwpXG4gICAgICAgICAgICAgIClcblxuTWFpbiA9IFJlYWN0LmNyZWF0ZUNsYXNzXG4gICAgICAgIHJlbmRlciA6IC0+XG4gICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoUm91dGVyLCBudWxsLFxuICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoUm91dGUsIHtcInBhdGhcIjogXCIvXCIsIFwiY29tcG9uZW50XCI6IChQYW5lbCl9LFxuICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChSb3V0ZSwge1wicGF0aFwiOiBcImluZGV4XCIsIFwiY29tcG9uZW50XCI6IChJbmRleCl9KSxcbiAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoUm91dGUsIHtcInBhdGhcIjogXCJhZGRQcm9qZWN0XCIsIFwiY29tcG9uZW50XCI6IChQcm9qZWN0TW9kYWwpfSksXG4gICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFJvdXRlLCB7XCJwYXRoXCI6IFwiYWRkU3ByaW50XCIsIFwiY29tcG9uZW50XCI6IChTcHJpbnQpfSlcbiAgICAgICAgICAgICApXG4gICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgIzxSb3V0ZXI+XG5cbiAgICAgICAgICAgICMgIDxSb3V0ZSBwYXRoPVwiL1wiIGNvbXBvbmVudD17UGFuZWx9PlxuICAgICAgICAgICAgIyAgICA8Um91dGUgcGF0aD1cInByb2plY3RzXCIgY29tcG9uZW50PXtQcm9qZWN0TGlzdH0vPlxuICAgICAgICAgICAgIyAgICA8Um91dGUgcGF0aD1cInByb2plY3RcIiBjb21wb25lbnQ9e1Byb2plY3R9Lz5cbiAgICAgICAgICAgICMgICAgPFJvdXRlIHBhdGg9XCJhZGRcIiBjb21wb25lbnQ9e1Byb2plY3RNb2RhbH0vPlxuICAgICAgICAgICAgIyAgPC9Sb3V0ZT5cbiAgICAgICAgICAgICM8L1JvdXRlcj5cblxuUmVhY3QucmVuZGVyIFJlYWN0LmNyZWF0ZUVsZW1lbnQoTWFpbiwgbnVsbCksIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250ZW50JykiLCJBY3Rpb25zID0gcmVxdWlyZSAnLi4vYWN0aW9ucy9wcm9qZWN0LWxpc3QnXG5Qcm9qZWN0QWN0aW9ucyA9IHJlcXVpcmUgJy4uL2FjdGlvbnMvcHJvamVjdCdcblxuUHJvamVjdExpc3QgPSBSZWZsdXguY3JlYXRlU3RvcmVcbiAgICAgICAgZ2V0SW5pdGlhbFN0YXRlOiAtPlxuICAgICAgICAgICAgICAgIEBkYXRhXG4gICAgICAgIGNoYW5nZUN1cnJlbnQ6IChpZCkgLT5cbiAgICAgICAgICAgICAgICBAZGF0YS5jdXJyZW50ID0gaWRcbiAgICAgICAgICAgICAgICBAdHJpZ2dlciBAZGF0YVxuICAgICAgICAgICAgICAgIFByb2plY3RBY3Rpb25zLnNldEN1cnJlbnRQcm9qZWN0IEBkYXRhLnByb2plY3RzW0BkYXRhLmN1cnJlbnRdXG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICBwcm9qZWN0czogW10sXG4gICAgICAgICAgICAgICAgY3VycmVudDogMFxuICAgICAgICB9LFxuICAgICAgICBsaXN0ZW5hYmxlczogW0FjdGlvbnNdLFxuICAgICAgICBzcmNVcmw6ICcvd3MvYXBpL3YxL3Byb2plY3RzJyxcbiAgICAgICAgaW5pdDogLT5cbiAgICAgICAgICAgICAgICBAZmV0Y2hMaXN0KClcbiAgICAgICAgZGVsZXRlOiAtPlxuICAgICAgICAgICAgaWQgPSBAZGF0YS5wcm9qZWN0c1tAZGF0YS5jdXJyZW50XS5faWRcbiAgICAgICAgICAgIHJlcXVlc3QgPSBzdXBlcmFnZW50XG4gICAgICAgICAgICByZXF1ZXN0XG4gICAgICAgICAgICAgICAgICAgIC5kZWxldGUgQHNyY1VybCArICcvJyArIGlkXG4gICAgICAgICAgICAgICAgICAgIC5lbmQgKChlcnIscmVzKSAtPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIHJlcy5va1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWxldGUgQGRhdGEucHJvamVjdHNbQGRhdGEuY3VycmVudF1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQGNoYW5nZUN1cnJlbnQgMFxuICAgICAgICAgICAgICAgICAgICApLmJpbmQgQFxuXG4gICAgICAgIGZldGNoTGlzdDogLT5cbiAgICAgICAgICAgICAgICByZXF1ZXN0ID0gc3VwZXJhZ2VudFxuICAgICAgICAgICAgICAgIHJlcXVlc3RcbiAgICAgICAgICAgICAgICAgICAgICAgIC5nZXQgQHNyY1VybFxuICAgICAgICAgICAgICAgICAgICAgICAgLmFjY2VwdCAnYXBwbGljYXRpb24vanNvbidcbiAgICAgICAgICAgICAgICAgICAgICAgIC5lbmQgKChlcnIscmVzKSAtPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiByZXMub2tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBAZGF0YS5wcm9qZWN0cyA9IHJlcy5ib2R5XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQGNoYW5nZUN1cnJlbnQgMFxuICAgICAgICAgICAgICAgICAgICAgICAgKS5iaW5kIEBcblxubW9kdWxlLmV4cG9ydHMgPSBQcm9qZWN0TGlzdFxuIiwiQWN0aW9ucyA9IHJlcXVpcmUgJy4uL2FjdGlvbnMvcHJvamVjdC1tb2RhbCdcblxuTW9kYWxTdG9yZSA9IFJlZmx1eC5jcmVhdGVTdG9yZVxuICAgICAgICBsaXN0ZW5hYmxlczogW0FjdGlvbnNdXG4gICAgICAgIHR5cGU6ICdwb3N0J1xuICAgICAgICBuZXdQcm9qZWN0OiB7XG4gICAgICAgICAgICAgICAgbmFtZTogJycsXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246ICcnLFxuICAgICAgICAgICAgICAgIGdpdF9yZXBvOiAnJyxcbiAgICAgICAgICAgICAgICBtZW1iZXJzOiBbXSxcbiAgICAgICAgICAgICAgICBiYWNrbG9nOiBbXSxcbiAgICAgICAgICAgICAgICBzcHJpbnRzOiBbXVxuICAgICAgICB9XG4gICAgICAgIGN1cnJlbnRQcm9qZWN0OiB7fVxuICAgICAgICBzaG93ZWRQcm9qZWN0OiB7fVxuICAgICAgICBnZXRJbml0aWFsU3RhdGU6IC0+XG4gICAgICAgICAgICAgICAgQG5ld1Byb2plY3RcbiAgICAgICAgc2V0VHlwZTogKGUsdHlwZSkgLT5cbiAgICAgICAgICAgICAgICBpZiB0eXBlID09ICdwdXQnXG4gICAgICAgICAgICAgICAgICBAc2hvd2VkUHJvamVjdCA9IEBjdXJyZW50UHJvamVjdFxuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgIEBzaG93ZWRQcm9qZWN0ID0gQG5ld1Byb2plY3RcbiAgICAgICAgICAgICAgICBAdHlwZSA9IHR5cGVcbiAgICAgICAgICAgICAgICBAdHJpZ2dlciBAc2hvd2VkUHJvamVjdFxuICAgICAgICBzZXRDdXJyZW50UHJvamVjdDogKHApIC0+XG4gICAgICAgICAgICAgICAgQGN1cnJlbnRQcm9qZWN0ID0gcCBpZiBwP1xuICAgICAgICBzdWJtaXQ6IChlKSAtPlxuICAgICAgICAgICAgICAgIHN3aXRjaCBAdHlwZVxuICAgICAgICAgICAgICAgICAgd2hlbiAncG9zdCcgdGhlbiBAc2VuZCBlXG4gICAgICAgICAgICAgICAgICB3aGVuICdwdXQnIHRoZW4gQHVwZGF0ZSBlXG4gICAgICAgICAgICAgICAgICBlbHNlIGNvbnNvbGUubG9nICd3cm9uZyByZXF1ZXN0IHR5cGUnXG4gICAgICAgIHVwZGF0ZTogKGUpIC0+XG4gICAgICAgICAgICAgICAgcmVxdWVzdCA9IHN1cGVyYWdlbnRcbiAgICAgICAgICAgICAgICByZXF1ZXN0XG4gICAgICAgICAgICAgICAgICAgICAgICAucHV0ICcvd3MvYXBpL3YxL3Byb2plY3QvJyArIEBjdXJyZW50UHJvamVjdC5faWRcbiAgICAgICAgICAgICAgICAgICAgICAgIC50eXBlICdqc29uJ1xuICAgICAgICAgICAgICAgICAgICAgICAgLnNlbmQgQGN1cnJlbnRQcm9qZWN0XG4gICAgICAgICAgICAgICAgICAgICAgICAuZW5kICgoZXJyLHJlcykgLT5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyAnZGF0YSB1cGRhdGVkJyBpZiByZXMub2tcbiAgICAgICAgICAgICAgICAgICAgICAgICkuYmluZCBAXG4gICAgICAgICAgICAgICAgJChcIiNhZGRNb2RhbFwiKS5tb2RhbCAnaGlkZSdcbiAgICAgICAgc2VuZDogKGUpIC0+XG4gICAgICAgICAgICAgICAgcmVxdWVzdCA9IHN1cGVyYWdlbnRcbiAgICAgICAgICAgICAgICByZXF1ZXN0XG4gICAgICAgICAgICAgICAgICAgICAgICAucG9zdCAnL3dzL2FwaS92MS9wcm9qZWN0J1xuICAgICAgICAgICAgICAgICAgICAgICAgLnR5cGUgJ2pzb24nXG4gICAgICAgICAgICAgICAgICAgICAgICAuc2VuZCBAbmV3UHJvamVjdFxuICAgICAgICAgICAgICAgICAgICAgICAgLmVuZCAoKGVycixyZXMpIC0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nIEBuZXdQcm9qZWN0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nICdkYXRhIHNlbnQnIGlmIHJlcy5va1xuICAgICAgICAgICAgICAgICAgICAgICAgKS5iaW5kIEBcbiAgICAgICAgICAgICAgICAkKFwiI2FkZE1vZGFsXCIpLm1vZGFsICdoaWRlJ1xuICAgICAgICBoYW5kbGVOYW1lOiAodmFsdWUpIC0+XG4gICAgICAgICAgICAgICAgQG5ld1Byb2plY3QubmFtZSA9IHZhbHVlXG4gICAgICAgICAgICAgICAgQHRyaWdnZXIgQG5ld1Byb2plY3RcbiAgICAgICAgaGFuZGxlRGVzY3JpcHRpb246ICh2YWx1ZSkgLT5cbiAgICAgICAgICAgICAgICBAbmV3UHJvamVjdC5kZXNjcmlwdGlvbiA9IHZhbHVlXG4gICAgICAgICAgICAgICAgQHRyaWdnZXIgQG5ld1Byb2plY3RcbiAgICAgICAgaGFuZGxlUmVwbzogKHZhbHVlKSAtPlxuICAgICAgICAgICAgICAgIEBuZXdQcm9qZWN0LmdpdF9yZXBvID0gdmFsdWVcbiAgICAgICAgICAgICAgICBAdHJpZ2dlciBAbmV3UHJvamVjdFxuICAgICAgICBoYW5kbGVNZW1iZXI6IChpbmRleCwgdmFsdWUpIC0+XG4gICAgICAgICAgICAgICAgQG5ld1Byb2plY3QubWVtYmVyc1tpbmRleF0gPSB2YWx1ZVxuICAgICAgICAgICAgICAgIEB0cmlnZ2VyIEBuZXdQcm9qZWN0XG4gICAgICAgIGFkZE1lbWJlcjogLT5cbiAgICAgICAgICAgICAgICBAbmV3UHJvamVjdC5tZW1iZXJzLnB1c2ggJydcbiAgICAgICAgICAgICAgICBAdHJpZ2dlciBAbmV3UHJvamVjdFxuICAgICAgICBkZWxldGVNZW1iZXI6IChpbmRleCkgLT5cbiAgICAgICAgICAgICAgICBkZWxldGUgQG5ld1Byb2plY3QubWVtYmVyc1tpbmRleF1cbiAgICAgICAgICAgICAgICBAdHJpZ2dlciBAbmV3UHJvamVjdFxuXG5tb2R1bGUuZXhwb3J0cyA9IE1vZGFsU3RvcmUiLCJBY3Rpb25zID0gcmVxdWlyZSAnLi4vYWN0aW9ucy9wcm9qZWN0J1xuXG5Nb2RhbEFjdGlvbnMgPSByZXF1aXJlICcuLi9hY3Rpb25zL3Byb2plY3QtbW9kYWwnXG5TcHJpbnRMaXN0QWN0aW9ucyA9IHJlcXVpcmUgJy4uL2FjdGlvbnMvc3ByaW50LWxpc3QnXG5cblByb2plY3RTdG9yZSA9IFJlZmx1eC5jcmVhdGVTdG9yZVxuICAgIGxpc3RlbmFibGVzOiBbQWN0aW9uc11cbiAgICBkYXRhOiB7IHByb2plY3Q6IHt9LCBiYWNrbG9nOiB0cnVlIH1cbiAgICBnZXRJbml0aWFsU3RhdGU6IC0+XG4gICAgICAgIEBkYXRhXG4gICAgaW5pdDogLT5cbiAgICAgICAgQHRyaWdnZXIgQGRhdGFcbiAgICBzZWxlY3RCYWNrbG9nOiAtPlxuICAgICAgICBAZGF0YS5iYWNrbG9nID0gdHJ1ZVxuICAgICAgICBAdHJpZ2dlciBAZGF0YVxuICAgIHNlbGVjdFNwcmludHM6IC0+XG4gICAgICAgIEBkYXRhLmJhY2tsb2cgPSBmYWxzZVxuICAgICAgICBAdHJpZ2dlciBAZGF0YVxuICAgIHNldEN1cnJlbnRQcm9qZWN0OiAocCkgLT5cbiAgICAgICAgY29uc29sZS5sb2cgcFxuICAgICAgICBAZGF0YS5wcm9qZWN0ID0gcFxuICAgICAgICBAdHJpZ2dlciBAZGF0YVxuICAgICAgICAjU3ByaW50TGlzdEFjdGlvbnMuc2V0TGlzdCBAZGF0YS5wcm9qZWN0LnNwcmludHNcblxubW9kdWxlLmV4cG9ydHMgPSBQcm9qZWN0U3RvcmVcbiIsIkFjdGlvbnMgPSByZXF1aXJlICcuLi9hY3Rpb25zL3NwcmludC1saXN0J1xuXG5Nb2RhbEFjdGlvbnMgPSByZXF1aXJlICcuLi9hY3Rpb25zL3NwcmludC1tb2RhbCdcblxuU3ByaW50TGlzdFN0b3JlID0gUmVmbHV4LmNyZWF0ZVN0b3JlXG4gICAgbGlzdGVuYWJsZXM6IFtBY3Rpb25zXVxuICAgIGxpc3Q6IFtdXG4gICAgaW5pdDogLT5cbiAgICAgICAgQGZldGNoKClcbiAgICBnZXRJbml0aWFsU3RhdGU6IC0+XG4gICAgICAgIEBsaXN0XG4gICAgc2V0TGlzdDogKGwpIC0+XG4gICAgICAgIEBsaXN0ID0gbFxuICAgICAgICBAZmV0Y2goKVxuICAgIGFkZDogKGUpIC0+XG4gICAgICAgIE1vZGFsQWN0aW9ucy5zZXRUeXBlIGUsICdwb3N0J1xuICAgIGZldGNoOiAtPlxuICAgICAgICBAdHJpZ2dlciBAbGlzdFxuXG5tb2R1bGUuZXhwb3J0cyA9IFNwcmludExpc3RTdG9yZVxuIiwiQWN0aW9ucyA9IHJlcXVpcmUgJy4uL2FjdGlvbnMvc3ByaW50LW1vZGFsJ1xuXG5TcHJpbnRTdG9yZSA9IFJlZmx1eC5jcmVhdGVTdG9yZVxuICAgIGxpc3RlbmFibGVzOiBbQWN0aW9uc11cbiAgICBuZXdTcHJpbnQ6IHtcbiAgICAgICAgaWQ6MCxcbiAgICAgICAgc3RhcnQ6IFwiXCIsXG4gICAgICAgIHRhc2tzOiBbXSxcbiAgICAgICAga2FuYmFuOiB7aWQ6IDAsIHVybDogXCJcIn1cbiAgICB9XG4gICAgcmVxdWVzdDogJ3Bvc3QnXG4gICAgY3VycmVudFNwcmludDoge31cbiAgICBzaG93ZWRTcHJpbnQ6IHt9XG4gICAgZ2V0SW5pdGlhbFN0YXRlOiAtPlxuICAgICAgICBAbmV3U3ByaW50XG4gICAgYWRkOiAoZSkgLT5cbiAgICAgICAgQHJlcXVlc3QgPSAncG9zdCdcbiAgICAgICAgQHNob3dlZFNwcmludCA9IEBuZXdTcHJpbnRcbiAgICAgICAgQHRyaWdnZXIgQHNob3dlZFNwcmludFxuICAgIGVkaXQ6IChlKSAtPlxuICAgICAgICBAcmVxdWVzdCA9ICdwdXQnXG4gICAgICAgIEBzaG93ZWRTcHJpbnQgPSBAY3VycmVudFNwcmludFxuICAgICAgICBAdHJpZ2dlciBAc2hvd2VkU3ByaW50XG4gICAgc2V0Q3VycmVudFNwcmludDogKHMpIC0+XG4gICAgICAgIEBjdXJyZW50U3ByaW50ID0gc1xuICAgIHN1Ym1pdDogKGUpIC0+XG4gICAgICAgIHN3aXRjaCBAcmVxdWVzdFxuICAgICAgICAgICAgd2hlbiAncG9zdCcgdGhlbiBAc2VuZCBlXG4gICAgICAgICAgICB3aGVuICdwdXQnIHRoZW4gQHVwZGF0ZSBlXG4gICAgICAgICAgICBlbHNlIGNvbnNvbGUubG9nICd3cm9uZyByZXF1ZXN0IHR5cGUnXG4gICAgdXBkYXRlOiAoZSkgLT5cbiAgICAgICAgcmVxdWVzdCA9IHN1cGVyYWdlbnRcbiAgICAgICAgcmVxdWVzdFxuICAgICAgICAgICAgLnB1dCAnL3dzL2FwaS92MS9zcHJpbnQvJyArIEBjdXJyZW50U3ByaW50Ll9pZFxuICAgICAgICAgICAgLnR5cGUgJ2pzb24nXG4gICAgICAgICAgICAuc2VuZCBAY3VycmVudFNwcmludFxuICAgICAgICAgICAgLmVuZCAoKGVycixyZXMpIC0+XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cgJ2RhdGEgdXBkYXRlZCcgaWYgcmVzLm9rXG4gICAgICAgICAgICApLmJpbmQgQFxuICAgICAgICAkKFwiI2FkZE1vZGFsXCIpLm1vZGFsICdoaWRlJ1xuICAgIHNlbmQ6IChlKSAtPlxuICAgICAgICByZXF1ZXN0ID0gc3VwZXJhZ2VudFxuICAgICAgICByZXF1ZXN0XG4gICAgICAgICAgICAucG9zdCAnL3dzL2FwaS92MS9wcm9qZWN0L3NwLycgKyBsb2NhdGlvbi5oYXNoLnNwbGl0KCdpZD0nKVsxXS5zcGxpdCgnJicpWzBdXG4gICAgICAgICAgICAudHlwZSAnanNvbidcbiAgICAgICAgICAgIC5zZW5kIEBuZXdTcHJpbnRcbiAgICAgICAgICAgIC5lbmQgKChlcnIscmVzKSAtPlxuXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cgJ2RhdGEgc2VudCcgaWYgcmVzLm9rXG4gICAgICAgICAgICApLmJpbmQgQFxuICAgICAgICAkKFwiI2FkZE1vZGFsXCIpLm1vZGFsICdoaWRlJ1xuICAgIGhhbmRsZURhdGU6ICh2YWx1ZSkgLT5cbiAgICAgICAgQG5ld1NwcmludC5zdGFydCA9IHZhbHVlXG4gICAgICAgIEB0cmlnZ2VyIEBuZXdTcHJpbnRcbiAgICBoYW5kbGVOYW1lOiAodmFsdWUpIC0+XG4gICAgICAgIEBuZXdTcHJpbnQuaWQgPSB2YWx1ZVxuICAgICAgICBAdHJpZ2dlciBAbmV3U3ByaW50XG4gICAgaGFuZGxlS2FuYmFuOiAodmFsdWUpIC0+XG4gICAgICAgIEBuZXdTcHJpbnQua2FuYmFuID0gdmFsdWVcbiAgICAgICAgQHRyaWdnZXIgQG5ld1NwcmludFxuICAgIHRyZWxsb0xvZ0luOiAob25TdWNjZXNzKSAtPlxuICAgICAgICBvbkVycm9yID0gKCkgLT4gYWxlcnQgJ2Nvbm5lY3Rpb24gdG8gVHJlbGxvIGZhaWxlZCdcbiAgICAgICAgVHJlbGxvLmF1dGhvcml6ZVxuICAgICAgICAgICAgdHlwZTogXCJwb3B1cFwiLFxuICAgICAgICAgICAgbmFtZTogXCJTY3J1bXkgQXBwbGljYXRpb25cIixcbiAgICAgICAgICAgIHNjb3BlOiB7XG4gICAgICAgICAgICAgIHJlYWQ6IHRydWUsXG4gICAgICAgICAgICAgIHdyaXRlOiB0cnVlIH0sXG4gICAgICAgICAgICBleHBpcmF0aW9uOiBcIm5ldmVyXCIsXG4gICAgICAgICAgICBzdWNjZXNzOiBvblN1Y2Nlc3MsXG4gICAgICAgICAgICBlcnJvcjogb25FcnJvclxuICAgIGNyZWF0ZUthbmJhbjogLT5cbiAgICAgICAga2FuYmFuID0gQG5ld1NwcmludC5rYW5iYW5cbiAgICAgICAgb25TdWNjZXNzID0gKCgpIC0+XG4gICAgICAgICAgICBzZXRCb2FyZElkID0gKChkYXRhKSAtPiBAYm9hcmQgPSBkYXRhLmlkKS5iaW5kIEBcbiAgICAgICAgICAgIGNvbnNvbGUubG9nIEBib2FyZFxuICAgICAgICAgICAgc2V0TGlzdElkID0gKChkYXRhKSAtPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGthbmJhbi5pZCA9IGRhdGEuaWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrYW5iYW4udXJsID0gZGF0YS51cmxcbiAgICAgICAgICAgICkuYmluZCBAXG4gICAgICAgICAgICBUcmVsbG8ucG9zdCAnL2JvYXJkcycsIHsgbmFtZTogQG5ld1NwcmludC5pZCArIFwiIC0gXCIgKyBAbmV3U3ByaW50LnN0YXJ0IH0sIHNldEJvYXJkSWRcbiAgICAgICAgICAgIFRyZWxsby5wb3N0ICcvbGlzdHMnLCB7IG5hbWU6IFwiVG9kb1wiLCBpZEJvYXJkOiBAYm9hcmQgfSwgc2V0TGlzdElkXG4gICAgICAgICAgICBUcmVsbG8ucG9zdCAnL2xpc3RzJywgeyBuYW1lOiBcIk9uZ29pbmdcIiwgaWRCb2FyZDogQGJvYXJkIH1cbiAgICAgICAgICAgIFRyZWxsby5wb3N0ICcvbGlzdHMnLCB7IG5hbWU6IFwiRG9uZVwiLCBpZEJvYXJkOiBAYm9hcmQgfVxuICAgICAgICApLmJpbmQgQFxuICAgICAgICBAdHJlbGxvTG9nSW4gb25TdWNjZXNzXG4gICAgY3JlYXRlQ2FyZDogKG5hbWUpIC0+XG4gICAgICAgIG9uU3VjY2VzcyA9ICgoKSAtPlxuICAgICAgICAgICAgVHJlbGxvLnBvc3QgJy9jYXJkcycgLCB7IG5hbWU6IG5hbWUsIGlkTGlzdDogQG5ld1NwcmludC5rYW5iYW4uaWQsIGR1ZTogbnVsbCwgcG9zOiBcInRvcFwiIH1cbiAgICAgICAgKS5iaW5kIEBcbiAgICAgICAgQHRyZWxsb0xvZ0luIG9uU3VjY2Vzc1xuXG5tb2R1bGUuZXhwb3J0cyA9IFNwcmludFN0b3JlIl19
