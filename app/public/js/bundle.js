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
  srcUrl: '/api/v1/projects',
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
    request.put('/api/v1/project/' + this.currentProject._id).type('json').send(this.currentProject).end((function(err, res) {
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
// Generated by CoffeeScript 1.9.3
(function() {
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
      request.put('/api/v1/sprint/' + this.currentSprint._id).type('json').send(this.currentSprint).end((function(err, res) {
        if (res.ok) {
          return console.log('data updated');
        }
      }).bind(this));
      return $("#addModal").modal('hide');
    },
    send: function(e) {
      var request;
      request = superagent;
      request.post('/api/v1/project').type('json').send(this.newSprint).end((function(err, res) {
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
      var s;
      s = function() {
        return console.log('success');
      };
      return Trello.authorize({
        type: "popup",
        name: "Scrumy Application",
        scope: {
          read: true,
          write: true
        },
        expiration: "never",
        s: s,
        onKanbanFail: this.onKanbanFail
      });
    }
  });

  module.exports = SprintStore;

}).call(this);

},{"../actions/sprint-modal":5}]},{},[13])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvaG9tZS94aGl0ZWRldi9jcmVtaS9jcC9zY3J1bXkvYXBwL2pzL2FjdGlvbnMvcHJvamVjdC1saXN0LmNqc3giLCIvaG9tZS94aGl0ZWRldi9jcmVtaS9jcC9zY3J1bXkvYXBwL2pzL2FjdGlvbnMvcHJvamVjdC1tb2RhbC5janN4IiwiL2hvbWUveGhpdGVkZXYvY3JlbWkvY3Avc2NydW15L2FwcC9qcy9hY3Rpb25zL3Byb2plY3QuY2pzeCIsIi9ob21lL3hoaXRlZGV2L2NyZW1pL2NwL3NjcnVteS9hcHAvanMvYWN0aW9ucy9zcHJpbnQtbGlzdC5janN4IiwiL2hvbWUveGhpdGVkZXYvY3JlbWkvY3Avc2NydW15L2FwcC9qcy9hY3Rpb25zL3NwcmludC1tb2RhbC5janN4IiwiL2hvbWUveGhpdGVkZXYvY3JlbWkvY3Avc2NydW15L2FwcC9qcy9jb21wb25lbnRzL21vZGFsLWxpc3QuY2pzeCIsIi9ob21lL3hoaXRlZGV2L2NyZW1pL2NwL3NjcnVteS9hcHAvanMvY29tcG9uZW50cy9tb2RhbC5janN4IiwiL2hvbWUveGhpdGVkZXYvY3JlbWkvY3Avc2NydW15L2FwcC9qcy9jb21wb25lbnRzL3Byb2plY3QtbGlzdC5janN4IiwiL2hvbWUveGhpdGVkZXYvY3JlbWkvY3Avc2NydW15L2FwcC9qcy9jb21wb25lbnRzL3Byb2plY3QtbW9kYWwuY2pzeCIsIi9ob21lL3hoaXRlZGV2L2NyZW1pL2NwL3NjcnVteS9hcHAvanMvY29tcG9uZW50cy9wcm9qZWN0LmNqc3giLCIvaG9tZS94aGl0ZWRldi9jcmVtaS9jcC9zY3J1bXkvYXBwL2pzL2NvbXBvbmVudHMvc3ByaW50LWxpc3QuY2pzeCIsIi9ob21lL3hoaXRlZGV2L2NyZW1pL2NwL3NjcnVteS9hcHAvanMvY29tcG9uZW50cy9zcHJpbnQtbW9kYWwuY2pzeCIsIi9ob21lL3hoaXRlZGV2L2NyZW1pL2NwL3NjcnVteS9hcHAvanMvbWFpbi5janN4IiwiL2hvbWUveGhpdGVkZXYvY3JlbWkvY3Avc2NydW15L2FwcC9qcy9zdG9yZXMvcHJvamVjdC1saXN0LmNqc3giLCIvaG9tZS94aGl0ZWRldi9jcmVtaS9jcC9zY3J1bXkvYXBwL2pzL3N0b3Jlcy9wcm9qZWN0LW1vZGFsLmNqc3giLCIvaG9tZS94aGl0ZWRldi9jcmVtaS9jcC9zY3J1bXkvYXBwL2pzL3N0b3Jlcy9wcm9qZWN0LmNqc3giLCIvaG9tZS94aGl0ZWRldi9jcmVtaS9jcC9zY3J1bXkvYXBwL2pzL3N0b3Jlcy9zcHJpbnQtbGlzdC5janN4IiwiYXBwL2pzL3N0b3Jlcy9zcHJpbnQtbW9kYWwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQSxJQUFBOztBQUFBLGtCQUFBLEdBQXFCLE1BQU0sQ0FBQyxhQUFQLENBQXFCLENBQ3RDLFdBRHNDLEVBRXRDLFFBRnNDLEVBR3RDLGVBSHNDLENBQXJCOztBQU1yQixNQUFNLENBQUMsT0FBUCxHQUFpQjs7OztBQ05qQixJQUFBOztBQUFBLFlBQUEsR0FBZSxNQUFNLENBQUMsYUFBUCxDQUFxQixDQUNoQyxRQURnQyxFQUVoQyxtQkFGZ0MsRUFHaEMsU0FIZ0MsRUFJaEMsWUFKZ0MsRUFLaEMsbUJBTGdDLEVBTWhDLFlBTmdDLEVBT2hDLGNBUGdDLEVBUWhDLFdBUmdDLEVBU2hDLGNBVGdDLENBQXJCOztBQVlmLE1BQU0sQ0FBQyxPQUFQLEdBQWlCOzs7O0FDWmpCLElBQUE7O0FBQUEsY0FBQSxHQUFpQixNQUFNLENBQUMsYUFBUCxDQUFxQixDQUNsQyxlQURrQyxFQUVsQyxtQkFGa0MsRUFHbEMsZUFIa0MsQ0FBckI7O0FBTWpCLE1BQU0sQ0FBQyxPQUFQLEdBQWlCOzs7O0FDTmpCLElBQUE7O0FBQUEsaUJBQUEsR0FBb0IsTUFBTSxDQUFDLGFBQVAsQ0FBcUIsQ0FDckMsWUFEcUMsRUFFckMsbUJBRnFDLEVBR3JDLEtBSHFDLEVBSXJDLFNBSnFDLENBQXJCOztBQU9wQixNQUFNLENBQUMsT0FBUCxHQUFpQjs7OztB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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJQcm9qZWN0TGlzdEFjdGlvbnMgPSBSZWZsdXguY3JlYXRlQWN0aW9ucyBbXG4gICAgJ2ZldGNoTGlzdCcsXG4gICAgJ2RlbGV0ZScsXG4gICAgJ2NoYW5nZUN1cnJlbnQnXG5dXG5cbm1vZHVsZS5leHBvcnRzID0gUHJvamVjdExpc3RBY3Rpb25zXG4iLCJNb2RhbEFjdGlvbnMgPSBSZWZsdXguY3JlYXRlQWN0aW9ucyBbXG4gICAgJ3N1Ym1pdCcsXG4gICAgJ3NldEN1cnJlbnRQcm9qZWN0JyxcbiAgICAnc2V0VHlwZScsXG4gICAgJ2hhbmRsZU5hbWUnLFxuICAgICdoYW5kbGVEZXNjcmlwdGlvbicsXG4gICAgJ2hhbmRsZVJlcG8nLFxuICAgICdoYW5kbGVNZW1iZXInLFxuICAgICdhZGRNZW1iZXInLFxuICAgICdkZWxldGVNZW1iZXInXG5dXG5cbm1vZHVsZS5leHBvcnRzID0gTW9kYWxBY3Rpb25zXG4iLCJQcm9qZWN0QWN0aW9ucyA9IFJlZmx1eC5jcmVhdGVBY3Rpb25zIFtcbiAgICAnc2VsZWN0QmFja2xvZycsXG4gICAgJ3NldEN1cnJlbnRQcm9qZWN0JyxcbiAgICAnc2VsZWN0U3ByaW50cydcbl1cblxubW9kdWxlLmV4cG9ydHMgPSBQcm9qZWN0QWN0aW9uc1xuIiwiU3ByaW50TGlzdEFjdGlvbnMgPSBSZWZsdXguY3JlYXRlQWN0aW9ucyBbXG4gICAgJ2hhbmRsZU5hbWUnLFxuICAgICdoYW5kbGVEZXNjcmlwdGlvbicsXG4gICAgJ2FkZCcsXG4gICAgJ3NldExpc3QnXG5dXG5cbm1vZHVsZS5leHBvcnRzID0gU3ByaW50TGlzdEFjdGlvbnNcbiIsIk1vZGFsQWN0aW9ucyA9IFJlZmx1eC5jcmVhdGVBY3Rpb25zIFtcbiAgICAnc3VibWl0JyxcbiAgICAnc2V0Q3VycmVudFNwcmludCcsXG4gICAgJ3NldFR5cGUnLFxuICAgICdoYW5kbGVOYW1lJyxcbiAgICAnaGFuZGxlRGF0ZScsXG4gICAgJ2NyZWF0ZUthbmJhbidcbl1cblxubW9kdWxlLmV4cG9ydHMgPSBNb2RhbEFjdGlvbnNcbiIsIlByb2plY3RNb2RhbCA9IHJlcXVpcmUgJy4uL2NvbXBvbmVudHMvcHJvamVjdC1tb2RhbCdcblNwcmludE1vZGFsID0gcmVxdWlyZSAnLi4vY29tcG9uZW50cy9zcHJpbnQtbW9kYWwnXG5cbk1vZGFsTGlzdCA9IFJlYWN0LmNyZWF0ZUNsYXNzXG4gICAgcmVuZGVyIDogLT5cbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCBudWxsLFxuICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoUHJvamVjdE1vZGFsLCBudWxsKSxcbiAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFNwcmludE1vZGFsLCBudWxsKVxuICAgICAgICApXG5cbm1vZHVsZS5leHBvcnRzID0gTW9kYWxMaXN0IiwiTW9kYWwgPSBSZWFjdC5jcmVhdGVDbGFzc1xuICAgIHJlbmRlciA6IC0+XG4gICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtcImNsYXNzTmFtZVwiOiBcIm1vZGFsIGZhZGVcIiwgXCJpZFwiOiAoQHByb3BzLmlkKSwgXCJyb2xlXCI6IFwiZGlhbG9nXCIsIFwiYXJpYS1sYWJlbGxlZGJ5XCI6IFwibW9kYWxMYWJlbFwifSxcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7XCJjbGFzc05hbWVcIjogXCJtb2RhbC1kaWFsb2dcIiwgXCJyb2xlXCI6IFwiZG9jdW1lbnRcIn0sXG4gICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7XCJjbGFzc05hbWVcIjogXCJtb2RhbC1jb250ZW50XCJ9LFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7XCJjbGFzc05hbWVcIjogXCJtb2RhbC1oZWFkZXJcIn0sXG4gICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIiwge1widHlwZVwiOiBcImJ1dHRvblwiLCBcImNsYXNzTmFtZVwiOiBcImNsb3NlXCIsIFwiZGF0YS1kaXNtaXNzXCI6IFwibW9kYWxcIiwgXCJhcmlhLWxhYmVsXCI6IFwiQ2xvc2VcIn0sXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInNwYW5cIiwge1wiYXJpYS1oaWRkZW5cIjogXCJ0cnVlXCJ9LCBcIsOXXCIpXG4gICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJoNFwiLCB7XCJjbGFzc05hbWVcIjogXCJtb2RhbC10aXRsZVwiLCBcImlkXCI6ICdtb2RhbExhYmVsJ30sIChAcHJvcHMudGl0bGUpKVxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge1wiY2xhc3NOYW1lXCI6IFwibW9kYWwtYm9keVwifSxcbiAgICAgICAgICAgICAgKEBwcm9wcy5jaGlsZHJlbilcbiAgICAgICAgICAgIClcbiAgICAgICAgICApXG4gICAgICAgIClcbiAgICAgIClcblxubW9kdWxlLmV4cG9ydHMgPSBNb2RhbCIsIkFjdGlvbnMgPSByZXF1aXJlICcuLi9hY3Rpb25zL3Byb2plY3QtbGlzdCdcblN0b3JlID0gcmVxdWlyZSAnLi4vc3RvcmVzL3Byb2plY3QtbGlzdCdcblxuTW9kYWxBY3Rpb25zID0gcmVxdWlyZSAnLi4vYWN0aW9ucy9wcm9qZWN0LW1vZGFsJ1xuXG5BZGRQcm9qZWN0ID0gUmVhY3QuY3JlYXRlQ2xhc3NcbiAgICAgICAgcmVuZGVyIDogLT5cbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiYVwiLCB7IFxcXG4gICAgICAgICAgICAgICAgIFwib25DbGlja1wiOiAoTW9kYWxBY3Rpb25zLnNldFR5cGUuYmluZCBudWxsLCBldmVudCwgJ3Bvc3QnKSwgIFxcXG4gICAgICAgICAgICAgICAgIFwiZGF0YS10b2dnbGVcIjogXCJtb2RhbFwiLCAgXFxcbiAgICAgICAgICAgICAgICAgXCJkYXRhLXRhcmdldFwiOiBcIiNhZGRQcm9qZWN0XCIsICBcXFxuICAgICAgICAgICAgICAgICBcImNsYXNzTmFtZVwiOiBcIm1hdGVyaWFsLWljb25zXCJ9LCBcIlwiXCJcbiAgICAgICAgICAgICAgICAgIGFkZFxuXCJcIlwiKVxuXG5EZWxldGVDb25maXJtID0gUmVhY3QuY3JlYXRlQ2xhc3NcbiAgICAgICAgcmVuZGVyIDogLT5cbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtcImNsYXNzTmFtZVwiOiBcIm1vZGFsIGZhZGVcIiwgXCJpZFwiOiBcImNvbmZpcm1Nb2RhbFwifSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge1wiY2xhc3NOYW1lXCI6IFwibW9kYWwtZGlhbG9nXCJ9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtcImNsYXNzTmFtZVwiOiBcIm1vZGFsLWNvbnRlbnRcIn0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7XCJjbGFzc05hbWVcIjogXCJtb2RhbC1oZWFkZXJcIn0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIsIHtcInR5cGVcIjogXCJidXR0b25cIiwgIFxcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjbGFzc05hbWVcIjogXCJjbG9zZVwiLCAgXFxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImRhdGEtZGlzbWlzc1wiOiBcIm1vZGFsXCIsICBcXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYXJpYS1sYWJlbFwiOiBcIkNsb3NlXCJ9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIHtcImFyaWEtaGlkZGVuXCI6IFwidHJ1ZVwifSwgXCJcIlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIMOXXG5cIlwiXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImg0XCIsIHtcImNsYXNzTmFtZVwiOiBcIm1vZGFsLXRpdGxlXCJ9LCBcIlwiXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBFdGVzLXZvdXMgc3VyIGRlIHZvdWxvaXIgc3VwcHJpbWVyIGxlIHByb2pldD9cblwiXCJcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge1wiY2xhc3NOYW1lXCI6IFwibW9kYWwtYm9keVwifSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIiwgeyBcXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImJ1dHRvblwiLCAgXFxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNsYXNzTmFtZVwiOiBcImJ0biBidG4tZGVmYXVsdFwiLCAgXFxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImRhdGEtZGlzbWlzc1wiOiBcIm1vZGFsXCJ9LCBcIlwiXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBOb25cblwiXCJcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIsIHsgXFxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJzdWJtaXRcIiwgIFxcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjbGFzc05hbWVcIjogXCJidG4gYnRuLXByaW1hcnlcIiwgIFxcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJvbkNsaWNrXCI6IChAcHJvcHMuaGFuZGxlKX0sIFwiXCJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE91aVxuXCJcIlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIClcblxuRGVsZXRlUHJvamVjdCA9IFJlYWN0LmNyZWF0ZUNsYXNzXG4gICAgICAgIHJlbmRlciA6IC0+XG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInNwYW5cIiwgbnVsbCxcbiAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIiwge1widHlwZVwiOiBcImJ1dHRvblwiLCBcImNsYXNzTmFtZVwiOiBcImJ0biBidG4tZGVmYXVsdFwifSxcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImFcIiwgeyBcXFxuICAgICAgICAgICAgICAgICAgICAgXCJkYXRhLXRvZ2dsZVwiOiBcIm1vZGFsXCIsICBcXFxuICAgICAgICAgICAgICAgICAgICAgXCJkYXRhLXRhcmdldFwiOiBcIiNjb25maXJtTW9kYWxcIiwgIFxcXG4gICAgICAgICAgICAgICAgICAgICBcImNsYXNzTmFtZVwiOiBcIm1hdGVyaWFsLWljb25zXCJ9LCBcIlwiXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZVxuXCJcIlwiKVxuICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoRGVsZXRlQ29uZmlybSwge1wiaGFuZGxlXCI6IChBY3Rpb25zLmRlbGV0ZSl9KVxuICAgICAgICAgICAgICAgIClcblxuRWRpdFByb2plY3QgPSBSZWFjdC5jcmVhdGVDbGFzc1xuICAgICAgICByZW5kZXIgOiAtPlxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJhXCIsIHsgXFxcbiAgICAgICAgICAgICAgICAgXCJvbkNsaWNrXCI6IChNb2RhbEFjdGlvbnMuc2V0VHlwZS5iaW5kIG51bGwsIGV2ZW50LCdwdXQnKSwgIFxcXG4gICAgICAgICAgICAgICAgIFwiZGF0YS10b2dnbGVcIjogXCJtb2RhbFwiLCAgXFxcbiAgICAgICAgICAgICAgICAgXCJkYXRhLXRhcmdldFwiOiBcIiNhZGRQcm9qZWN0XCIsICBcXFxuICAgICAgICAgICAgICAgICBcImNsYXNzTmFtZVwiOiBcIm1hdGVyaWFsLWljb25zXCJ9LCBcIlwiXCJcbiAgICAgICAgICAgICAgICAgICAgZWRpdFxuXCJcIlwiKVxuXG5Qcm9qZWN0ID0gUmVhY3QuY3JlYXRlQ2xhc3NcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlbmRlcjogLT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImxpXCIsIHsgXFxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwib25DbGlja1wiOiAoQHByb3BzLm9uQ2xpY2suYmluZCBudWxsLEBwcm9wcy5pZCksICBcXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjbGFzc05hbWVcIjogXCJcIiwgIFxcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImFyaWEtbGFiZWxsZWRieVwiOiBcImRyb3Bkb3duTWVudVwifSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJhXCIsIG51bGwsIChAcHJvcHMubmFtZSkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcblxuUHJvamVjdExpc3QgPSBSZWFjdC5jcmVhdGVDbGFzc1xuICAgICAgICAgICAgICAgICAgICAgICAgbWl4aW5zOiBbUmVmbHV4LmNvbm5lY3QoU3RvcmUsICdkYXRhJyldXG4gICAgICAgICAgICAgICAgICAgICAgICByZW5kZXI6IC0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnQgPSBAc3RhdGUuZGF0YS5jdXJyZW50XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2plY3RzID0gQHN0YXRlLmRhdGEucHJvamVjdHNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGlzdCA9IFtdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciBrLHByb2plY3Qgb2YgcHJvamVjdHNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaXN0LnB1c2ggUmVhY3QuY3JlYXRlRWxlbWVudChQcm9qZWN0LCB7IFxcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImlkXCI6IChrKSwgIFxcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImtleVwiOiAoayksICBcXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJuYW1lXCI6IChwcm9qZWN0Lm5hbWUpLCAgXFxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwib25DbGlja1wiOiAoQWN0aW9ucy5jaGFuZ2VDdXJyZW50KX0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge1wiY2xhc3NOYW1lXCI6IFwiYnRuLWdyb3VwXCIsIFwicm9sZVwiOiBcImdyb3VwXCIsIFwiYXJpYS1sYWJlbFwiOiBcIi4uLlwifSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge1wiY2xhc3NOYW1lXCI6IFwiZHJvcGRvd25cIn0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiLCB7IFxcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImJ1dHRvblwiLCAgXFxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjbGFzc05hbWVcIjogXCJidG4gYnRuLWRlZmF1bHQgZHJvcGRvd24tdG9nZ2xlXCIsICBcXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImlkXCI6IFwiZHJvcGRvd25NZW51XCIsICBcXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImRhdGEtdG9nZ2xlXCI6IFwiZHJvcGRvd25cIiwgIFxcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYXJpYS1oYXNwb3B1cFwiOiBcInRydWVcIiwgIFxcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYXJpYS1leHBhbmRlZFwiOiBcInRydWVcIn0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJwXCIsIG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAocHJvamVjdHNbY3VycmVudF0ubmFtZSBpZiBwcm9qZWN0cy5sZW5ndGggaXNudCAwKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIHtcImNsYXNzTmFtZVwiOiBcImNhcmV0XCJ9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIsIHtcInR5cGVcIjogXCJidXR0b25cIiwgXCJjbGFzc05hbWVcIjogXCJidG4gYnRuLWRlZmF1bHRcIn0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoRWRpdFByb2plY3QsIHtcInByb2plY3RcIjogKHByb2plY3RzW2N1cnJlbnRdKX0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KERlbGV0ZVByb2plY3QsIG51bGwpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIiwge1widHlwZVwiOiBcImJ1dHRvblwiLCBcImNsYXNzTmFtZVwiOiBcImJ0biBidG4tZGVmYXVsdFwifSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChBZGRQcm9qZWN0LCBudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInVsXCIsIHtcImNsYXNzTmFtZVwiOiBcImRyb3Bkb3duLW1lbnVcIn0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAobGlzdClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcblxuXG5tb2R1bGUuZXhwb3J0cyA9IFByb2plY3RMaXN0XG4iLCJBY3Rpb25zID0gcmVxdWlyZSAnLi4vYWN0aW9ucy9wcm9qZWN0LW1vZGFsJ1xuU3RvcmUgPSByZXF1aXJlICcuLi9zdG9yZXMvcHJvamVjdC1tb2RhbCdcblxuTW9kYWwgPSByZXF1aXJlICcuL21vZGFsJ1xuXG5UZXh0SW5wdXQgPSBSZWFjdC5jcmVhdGVDbGFzc1xuICAgIHJlbmRlciA6IC0+XG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge1wiY2xhc3NOYW1lXCI6IFwiZm9ybS1ncm91cFwifSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJsYWJlbFwiLCB7XCJodG1sRm9yXCI6IChAcHJvcHMuaWQpfSxcbiAgICAgICAgICAgICAgICAoQHByb3BzLnBsYWNlaG9sZGVyKVxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiLCB7IFxcXG4gICAgICAgICAgICAgXCJvbkNoYW5nZVwiOiAoKChlKSAtPlxuICAgICAgICAgICAgICAgQHByb3BzLm9uQ2hhbmdlIGUudGFyZ2V0LnZhbHVlKS5iaW5kIEApLCAgXFxcbiAgICAgICAgICAgICBcInZhbHVlXCI6IChAcHJvcHMudGV4dCksICBcXFxuICAgICAgICAgICAgIFwidHlwZVwiOiBcInRleHRcIiwgIFxcXG4gICAgICAgICAgICAgXCJjbGFzc05hbWVcIjogXCJmb3JtLWNvbnRyb2xcIiwgIFxcXG4gICAgICAgICAgICAgXCJpZFwiOiAoQHByb3BzLmlkKSwgIFxcXG4gICAgICAgICAgICAgXCJwbGFjZWhvbGRlclwiOiAoQHByb3BzLnBsYWNlaG9sZGVyKSwgIFxcXG4gICAgICAgICAgICAgXCJyZXF1aXJlZFwiOiAoQHByb3BzLnJlcXVpcmVkKX0pXG4gICAgICAgIClcblxuTWVtYmVyID0gUmVhY3QuY3JlYXRlQ2xhc3NcbiAgICAgICAgcmVuZGVyIDogLT5cbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtcImNsYXNzTmFtZVwiOiBcInJvd1wifSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge1wiY2xhc3NOYW1lXCI6IFwiY29sLW1kLTExXCJ9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIiwgeyBcXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJvbkNoYW5nZVwiOiAoKChlKS0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFjdGlvbnMuaGFuZGxlTWVtYmVyKEBwcm9wcy5pZCwgZS50YXJnZXQudmFsdWUpKS5iaW5kIEApLCAgXFxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogKEBwcm9wcy5uYW1lKSwgIFxcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJ0ZXh0XCIsICBcXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjbGFzc05hbWVcIjogXCJmb3JtLWNvbnRyb2xcIiwgIFxcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInBsYWNlaG9sZGVyXCI6IFwiTm9tXCJ9KVxuICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge1wiY2xhc3NOYW1lXCI6IFwiY29sLW1kLTFcIn0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJpXCIsIHsgXFxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY2xhc3NOYW1lXCI6IFwibWF0ZXJpYWwtaWNvbnNcIiwgIFxcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIm9uQ2xpY2tcIjogKE1vZGFsQWN0aW9ucy5kZWxldGVNZW1iZXIuYmluZCBudWxsLCBAcHJvcHMuaWQpfSwgXCJcIlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWxldGVcblwiXCJcIilcbiAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICApXG5cbk1lbWJlcnNJbnB1dCA9IFJlYWN0LmNyZWF0ZUNsYXNzXG4gICAgICAgIHJlbmRlcjogLT5cbiAgICAgICAgICAgICAgICBtZW1iZXJWaWV3cyA9IFtdXG4gICAgICAgICAgICAgICAgZm9yIGssdiBvZiBAcHJvcHMubWVtYmVyc1xuICAgICAgICAgICAgICAgICAgICAgICAgbWVtYmVyVmlld3MucHVzaCBSZWFjdC5jcmVhdGVFbGVtZW50KE1lbWJlciwgeyBcXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJuYW1lXCI6ICh2KSwgIFxcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImlkXCI6IChrKSwgIFxcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImtleVwiOiAoayl9KVxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge1wiY2xhc3NOYW1lXCI6IFwiZm9ybS1ncm91cFwifSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImxhYmVsXCIsIG51bGwsIFwiQ29sbGFib3JhdGV1cnNcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChtZW1iZXJWaWV3cyksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJpXCIsIHtcImNsYXNzTmFtZVwiOiBcIm1hdGVyaWFsLWljb25zXCIsIFwib25DbGlja1wiOiAoQWN0aW9ucy5hZGRNZW1iZXIpfSwgXCJcIlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWRkXG5cIlwiXCIpXG4gICAgICAgICAgICAgICAgKVxuXG5cbkZvcm0gPSBSZWFjdC5jcmVhdGVDbGFzc1xuICAgIG1peGluczogW1JlZmx1eC5jb25uZWN0KFN0b3JlLCAncHJvamVjdCcpXVxuICAgIHJlbmRlciA6IC0+XG4gICAgICAgIHByb2plY3QgPSBAc3RhdGUucHJvamVjdFxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZm9ybVwiLCB7XCJvblN1Ym1pdFwiOiAoKGUpIC0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgI2UucHJldmVudERlZmF1bHQoKSAjcG91ciDDqXZpdGVyIGRlIHJlY2hhcmdlciBsYSBwYWdlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgQWN0aW9ucy5zdWJtaXQgZSl9LFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUZXh0SW5wdXQsIHtcIm9uQ2hhbmdlXCI6IChBY3Rpb25zLmhhbmRsZU5hbWUpLCBcInRleHRcIjogKHByb2plY3QubmFtZSksIFwiaWRcIjogXCJpbnB1dE5hbWVcIiwgXCJwbGFjZWhvbGRlclwiOiBcIk5vbVwiLCBcInJlcXVpcmVkXCI6IFwicmVxdWlyZWRcIn0pLFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUZXh0SW5wdXQsIHtcIm9uQ2hhbmdlXCI6IChBY3Rpb25zLmhhbmRsZURlc2NyaXB0aW9uKSwgXCJ0ZXh0XCI6IChwcm9qZWN0LmRlc2NyaXB0aW9uKSwgXCJpZFwiOiBcImlucHV0RGVzY3JpcHRpb25cIiwgXCJwbGFjZWhvbGRlclwiOiBcIkRlc2NyaXB0aW9uXCJ9KSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGV4dElucHV0LCB7XCJvbkNoYW5nZVwiOiAoQWN0aW9ucy5oYW5kbGVSZXBvKSwgXCJ0ZXh0XCI6IChwcm9qZWN0LmdpdF9yZXBvKSwgXCJpZFwiOiBcImlucHV0UmVwb1wiLCBcInBsYWNlaG9sZGVyXCI6IFwiRMOpcG90IGdpdFwifSksXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KE1lbWJlcnNJbnB1dCwge1wibWVtYmVyc1wiOiAocHJvamVjdC5tZW1iZXJzKX0pLFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiLCB7XCJ0eXBlXCI6IFwiYnV0dG9uXCIsIFwiY2xhc3NOYW1lXCI6IFwiYnRuIGJ0bi1kZWZhdWx0XCIsIFwiZGF0YS1kaXNtaXNzXCI6IFwibW9kYWxcIn0sIFwiRmVybWVyXCIpLFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiLCB7XCJ0eXBlXCI6IFwic3VibWl0XCIsIFwiY2xhc3NOYW1lXCI6IFwiYnRuIGJ0bi1wcmltYXJ5XCJ9LCBcIkFwcGxpcXVlclwiKVxuICAgICAgICApXG5cblByb2plY3RNb2RhbCA9IFJlYWN0LmNyZWF0ZUNsYXNzXG4gICAgcmVuZGVyIDogLT5cbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChNb2RhbCwge1widGl0bGVcIjogJ0Fqb3V0ZXIgcHJvamV0JywgXCJpZFwiOiAnYWRkUHJvamVjdCd9LFxuICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoRm9ybSwgbnVsbClcbiAgICAgICAgKVxuXG5tb2R1bGUuZXhwb3J0cyA9IFByb2plY3RNb2RhbCIsIkFjdGlvbnMgPSByZXF1aXJlICcuLi9hY3Rpb25zL3Byb2plY3QnXG5TdG9yZSA9IHJlcXVpcmUgJy4uL3N0b3Jlcy9wcm9qZWN0J1xuXG5TcHJpbnRMaXN0ID0gcmVxdWlyZSAnLi9zcHJpbnQtbGlzdCdcblxuVGFiTmF2ID0gUmVhY3QuY3JlYXRlQ2xhc3NcbiAgICByZW5kZXI6IC0+XG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJuYXZcIiwge1wicm9sZVwiOiBcIm5hdmlnYXRpb25cIn0sXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwidWxcIiwge1wiY2xhc3NOYW1lXCI6IFwibmF2IG5hdi10YWJzXCJ9LFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJsaVwiLCB7IFxcXG4gICAgICAgICAgICAgICAgIFwib25DbGlja1wiOiAoQWN0aW9ucy5zZWxlY3RCYWNrbG9nKSwgIFxcXG4gICAgICAgICAgICAgICAgIFwicm9sZVwiOiBcInByZXNlbnRhdGlvblwiLCAgXFxcbiAgICAgICAgICAgICAgICAgXCJjbGFzc05hbWVcIjogKCdhY3RpdmUnIGlmIEBwcm9wcy5iYWNrbG9nKX0sXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiYVwiLCBudWxsLCBcIkJhY2tsb2dcIilcbiAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJsaVwiLCB7IFxcXG4gICAgICAgICAgICAgICAgIFwib25DbGlja1wiOiAoQWN0aW9ucy5zZWxlY3RTcHJpbnRzKSwgIFxcXG4gICAgICAgICAgICAgICAgIFwicm9sZVwiOiBcInByZXNlbnRhdGlvblwiLCAgXFxcbiAgICAgICAgICAgICAgICAgXCJjbGFzc05hbWVcIjogKCdhY3RpdmUnIGlmIG5vdCBAcHJvcHMuYmFja2xvZyl9LFxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImFcIiwgbnVsbCwgXCJTcHJpbnRzXCIpXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKVxuICAgICAgICApXG5cblRhYkNvbnRlbnQgPSBSZWFjdC5jcmVhdGVDbGFzc1xuICAgIHJlbmRlcjogLT5cbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCBudWxsLFxuICAgICAgICAgICAgKFJlYWN0LmNyZWF0ZUVsZW1lbnQoU3ByaW50TGlzdCwgbnVsbCkgaWYgbm90IEBwcm9wcy5iYWNrbG9nKVxuICAgICAgICApXG5cblByb2plY3QgPSBSZWFjdC5jcmVhdGVDbGFzc1xuICAgIG1peGluczogW1JlZmx1eC5jb25uZWN0KFN0b3JlLCAnZGF0YScpXVxuICAgIHJlbmRlcjogLT5cbiAgICAgICAgYmFja2xvZyA9IEBzdGF0ZS5kYXRhLmJhY2tsb2dcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCBudWxsLFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUYWJOYXYsIHtcImJhY2tsb2dcIjogKGJhY2tsb2cpfSksXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRhYkNvbnRlbnQsIHtcImJhY2tsb2dcIjogKGJhY2tsb2cpfSlcbiAgICAgICAgKVxuXG5tb2R1bGUuZXhwb3J0cyA9IFByb2plY3RcbiIsIlN0b3JlID0gcmVxdWlyZSAnLi4vc3RvcmVzL3NwcmludC1saXN0J1xuQWN0aW9ucyA9IHJlcXVpcmUgJy4uL2FjdGlvbnMvc3ByaW50LWxpc3QnXG5cblNwcmludCA9IFJlYWN0LmNyZWF0ZUNsYXNzXG4gICAgcmVuZGVyOiAtPlxuICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7XCJjbGFzc05hbWVcIjogXCJwYW5lbCBwYW5lbC1wcmltYXJ5XCJ9LFxuICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge1wiY2xhc3NOYW1lXCI6IFwicGFuZWwtaGVhZGluZ1wifSxcbiAgICAgICAgICAgICAgKEBwcm9wcy5pZClcbiAgICAgICAgICApLFxuICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge1wiY2xhc3NOYW1lXCI6IFwicGFuZWwtYm9keVwifSxcbiAgICAgICAgICAgICAgKEBwcm9wcy5zdGFydClcbiAgICAgICAgICApXG4gICAgICApXG5cblNwcmludExpc3QgPSBSZWFjdC5jcmVhdGVDbGFzc1xuICAgIG1peGluczogW1JlZmx1eC5jb25uZWN0KFN0b3JlLCAnbGlzdCcpXVxuICAgIHJlbmRlcjogLT5cbiAgICAgICAgY29uc29sZS5sb2cgQHN0YXRlLmxpc3RcbiAgICAgICAgaXRlbXMgPSBAc3RhdGUubGlzdC5tYXAgKGkpIC0+IFJlYWN0LmNyZWF0ZUVsZW1lbnQoU3ByaW50LCB7XCJrZXlcIjogKGkuaWQpLCBcImlkXCI6IChpLmlkKSwgXCJzdGFydFwiOiAoaS5zdGFydCl9KVxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtcImNsYXNzTmFtZVwiOiBcImxpc3QtZ3JvdXBcIn0sXG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIiwge1widHlwZVwiOiBcImJ1dHRvblwiLCBcImNsYXNzTmFtZVwiOiBcImJ0biBidG4tZGVmYXVsdFwifSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJhXCIsIHsgXFxcbiAgICAgICAgICAgICBcIm9uQ2xpY2tcIjogKEFjdGlvbnMuYWRkKSwgIFxcXG4gICAgICAgICAgICAgXCJkYXRhLXRvZ2dsZVwiOiBcIm1vZGFsXCIsICBcXFxuICAgICAgICAgICAgIFwiZGF0YS10YXJnZXRcIjogXCIjYWRkU3ByaW50XCIsICBcXFxuICAgICAgICAgICAgIFwiY2xhc3NOYW1lXCI6IFwibWF0ZXJpYWwtaWNvbnNcIn0sIFwiXCJcIlxuICAgICAgICAgICAgICAgIGFkZFxuXCJcIlwiKVxuICAgICAgICApLFxuXG4gICAgICAgICAgICAoaXRlbXMpXG4gICAgICAgIClcblxubW9kdWxlLmV4cG9ydHMgPSBTcHJpbnRMaXN0XG4iLCJTdG9yZSA9IHJlcXVpcmUgJy4uL3N0b3Jlcy9zcHJpbnQtbW9kYWwnXG5BY3Rpb25zID0gcmVxdWlyZSAnLi4vYWN0aW9ucy9zcHJpbnQtbW9kYWwnXG5cbk1vZGFsID0gcmVxdWlyZSAnLi9tb2RhbCdcblxuVGV4dElucHV0ID0gUmVhY3QuY3JlYXRlQ2xhc3NcbiAgICByZW5kZXIgOiAtPlxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtcImNsYXNzTmFtZVwiOiBcImZvcm0tZ3JvdXBcIn0sXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwibGFiZWxcIiwge1wiaHRtbEZvclwiOiAoQHByb3BzLmlkKX0sXG4gICAgICAgICAgICAgICAgKEBwcm9wcy5wbGFjZWhvbGRlcilcbiAgICAgICAgICAgICksXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIiwgeyBcXFxuICAgICAgICAgICAgIFwib25DaGFuZ2VcIjogKCgoZSkgLT5cbiAgICAgICAgICAgICAgIEBwcm9wcy5vbkNoYW5nZSBlLnRhcmdldC52YWx1ZSkuYmluZCBAKSwgIFxcXG4gICAgICAgICAgICAgXCJ2YWx1ZVwiOiAoQHByb3BzLnRleHQpLCAgXFxcbiAgICAgICAgICAgICBcInR5cGVcIjogXCJ0ZXh0XCIsICBcXFxuICAgICAgICAgICAgIFwiY2xhc3NOYW1lXCI6IFwiZm9ybS1jb250cm9sXCIsICBcXFxuICAgICAgICAgICAgIFwiaWRcIjogKEBwcm9wcy5pZCksICBcXFxuICAgICAgICAgICAgIFwicGxhY2Vob2xkZXJcIjogKEBwcm9wcy5wbGFjZWhvbGRlciksICBcXFxuICAgICAgICAgICAgIFwicmVxdWlyZWRcIjogKEBwcm9wcy5yZXF1aXJlZCl9KVxuICAgICAgICApXG5cblNwcmludEZvcm0gPSBSZWFjdC5jcmVhdGVDbGFzc1xuICAgIG1peGluczogW1JlZmx1eC5jb25uZWN0KFN0b3JlLCAnc3ByaW50JyldXG4gICAgcmVuZGVyIDogLT5cbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImZvcm1cIiwge1wib25TdWJtaXRcIjogKChlKSAtPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICNlLnByZXZlbnREZWZhdWx0KCkgI3BvdXIgw6l2aXRlciBkZSByZWNoYXJnZXIgbGEgcGFnZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFjdGlvbnMuc3VibWl0IGUpfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGV4dElucHV0LCB7XCJvbkNoYW5nZVwiOiAoQWN0aW9ucy5oYW5kbGVOYW1lKSwgXCJ0ZXh0XCI6IChAc3RhdGUuc3ByaW50LmlkKSwgXCJpZFwiOiBcImlucHV0TmFtZVwiLCBcInBsYWNlaG9sZGVyXCI6IFwiTm9tXCIsIFwicmVxdWlyZWRcIjogXCJyZXF1aXJlZFwifSksXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRleHRJbnB1dCwge1wib25DaGFuZ2VcIjogKEFjdGlvbnMuaGFuZGxlRGF0ZSksIFwidGV4dFwiOiAoQHN0YXRlLnNwcmludC5zdGFydCksIFwiaWRcIjogXCJpbnB1dERhdGVcIiwgXCJwbGFjZWhvbGRlclwiOiBcIkRhdGUgZGUgZMOpYnV0XCJ9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge1wiY2xhc3NOYW1lXCI6IFwiZm9ybS1ncm91cFwifSwgUmVhY3QuY3JlYXRlRWxlbWVudChcImFcIiwge1wib25DbGlja1wiOiAoQWN0aW9ucy5jcmVhdGVLYW5iYW4pfSwgXCJJbnTDqWdyZXIgS2FuYmFuIFRyZWxsb1wiKSksXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIsIHsgXFxcbiAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJidXR0b25cIiwgIFxcXG4gICAgICAgICAgICAgICAgICAgICAgICAgXCJjbGFzc05hbWVcIjogXCJidG4gYnRuLWRlZmF1bHRcIiwgIFxcXG4gICAgICAgICAgICAgICAgICAgICAgICAgXCJkYXRhLWRpc21pc3NcIjogXCJtb2RhbFwifSwgXCJcIlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgQW5udWxlclxuXCJcIlwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIiwgeyBcXFxuICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInN1Ym1pdFwiLCAgXFxcbiAgICAgICAgICAgICAgICAgICAgICAgICBcImNsYXNzTmFtZVwiOiBcImJ0biBidG4tcHJpbWFyeVwiLCAgXFxcbiAgICAgICAgICAgICAgICAgICAgICAgICBcIm9uQ2xpY2tcIjogKEBwcm9wcy5oYW5kbGUpfSwgXCJcIlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgQXBwbGlxdWVyXG5cIlwiXCIpXG4gICAgICAgICAgICAgICAgICAgIClcblxuXG5TcHJpbnRNb2RhbCA9IFJlYWN0LmNyZWF0ZUNsYXNzXG4gICAgcmVuZGVyIDogLT5cbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChNb2RhbCwge1widGl0bGVcIjogJ0Fqb3V0ZXIgU3ByaW50JywgXCJpZFwiOiAnYWRkU3ByaW50J30sXG4gICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChTcHJpbnRGb3JtLCBudWxsKVxuICAgICAgICApXG5cblxubW9kdWxlLmV4cG9ydHMgPSBTcHJpbnRNb2RhbCIsIlByb2plY3RMaXN0ID0gcmVxdWlyZSAnLi9jb21wb25lbnRzL3Byb2plY3QtbGlzdCdcblByb2plY3QgPSByZXF1aXJlICcuL2NvbXBvbmVudHMvcHJvamVjdCdcbk1vZGFsTGlzdCA9IHJlcXVpcmUgJy4vY29tcG9uZW50cy9tb2RhbC1saXN0J1xuXG5NYWluID0gUmVhY3QuY3JlYXRlQ2xhc3NcbiAgICAgICAgcmVuZGVyIDogLT5cbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgbnVsbCxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFByb2plY3RMaXN0LCBudWxsKSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFByb2plY3QsIG51bGwpLFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoTW9kYWxMaXN0LCBudWxsKVxuICAgICAgICAgICAgKVxuXG5SZWFjdC5yZW5kZXIgUmVhY3QuY3JlYXRlRWxlbWVudChNYWluLCBudWxsKSwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRlbnQnKSIsIkFjdGlvbnMgPSByZXF1aXJlICcuLi9hY3Rpb25zL3Byb2plY3QtbGlzdCdcblByb2plY3RBY3Rpb25zID0gcmVxdWlyZSAnLi4vYWN0aW9ucy9wcm9qZWN0J1xuXG5Qcm9qZWN0TGlzdCA9IFJlZmx1eC5jcmVhdGVTdG9yZVxuICAgICAgICBnZXRJbml0aWFsU3RhdGU6IC0+XG4gICAgICAgICAgICAgICAgQGRhdGFcbiAgICAgICAgY2hhbmdlQ3VycmVudDogKGlkKSAtPlxuICAgICAgICAgICAgICAgIEBkYXRhLmN1cnJlbnQgPSBpZFxuICAgICAgICAgICAgICAgIEB0cmlnZ2VyIEBkYXRhXG4gICAgICAgICAgICAgICAgUHJvamVjdEFjdGlvbnMuc2V0Q3VycmVudFByb2plY3QgQGRhdGEucHJvamVjdHNbQGRhdGEuY3VycmVudF1cbiAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgIHByb2plY3RzOiBbXSxcbiAgICAgICAgICAgICAgICBjdXJyZW50OiAwXG4gICAgICAgIH0sXG4gICAgICAgIGxpc3RlbmFibGVzOiBbQWN0aW9uc10sXG4gICAgICAgIHNyY1VybDogJy9hcGkvdjEvcHJvamVjdHMnLFxuICAgICAgICBpbml0OiAtPlxuICAgICAgICAgICAgICAgIEBmZXRjaExpc3QoKVxuICAgICAgICBkZWxldGU6IC0+XG4gICAgICAgICAgICBpZCA9IEBkYXRhLnByb2plY3RzW0BkYXRhLmN1cnJlbnRdLl9pZFxuICAgICAgICAgICAgcmVxdWVzdCA9IHN1cGVyYWdlbnRcbiAgICAgICAgICAgIHJlcXVlc3RcbiAgICAgICAgICAgICAgICAgICAgLmRlbGV0ZSBAc3JjVXJsICsgJy8nICsgaWRcbiAgICAgICAgICAgICAgICAgICAgLmVuZCAoKGVycixyZXMpIC0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgcmVzLm9rXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBAZGF0YS5wcm9qZWN0c1tAZGF0YS5jdXJyZW50XVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBAY2hhbmdlQ3VycmVudCAwXG4gICAgICAgICAgICAgICAgICAgICkuYmluZCBAXG5cbiAgICAgICAgZmV0Y2hMaXN0OiAtPlxuICAgICAgICAgICAgICAgIHJlcXVlc3QgPSBzdXBlcmFnZW50XG4gICAgICAgICAgICAgICAgcmVxdWVzdFxuICAgICAgICAgICAgICAgICAgICAgICAgLmdldCBAc3JjVXJsXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWNjZXB0ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgICAgICAgICAgICAgICAgICAgLmVuZCAoKGVycixyZXMpIC0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIHJlcy5va1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEBkYXRhLnByb2plY3RzID0gcmVzLmJvZHlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBAY2hhbmdlQ3VycmVudCAwXG4gICAgICAgICAgICAgICAgICAgICAgICApLmJpbmQgQFxuXG5tb2R1bGUuZXhwb3J0cyA9IFByb2plY3RMaXN0XG4iLCJBY3Rpb25zID0gcmVxdWlyZSAnLi4vYWN0aW9ucy9wcm9qZWN0LW1vZGFsJ1xuXG5Nb2RhbFN0b3JlID0gUmVmbHV4LmNyZWF0ZVN0b3JlXG4gICAgICAgIGxpc3RlbmFibGVzOiBbQWN0aW9uc11cbiAgICAgICAgdHlwZTogJydcbiAgICAgICAgbmV3UHJvamVjdDoge1xuICAgICAgICAgICAgICAgIG5hbWU6ICcnLFxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnJyxcbiAgICAgICAgICAgICAgICBnaXRfcmVwbzogJycsXG4gICAgICAgICAgICAgICAgbWVtYmVyczogW10sXG4gICAgICAgICAgICAgICAgYmFja2xvZzogW10sXG4gICAgICAgICAgICAgICAgc3ByaW50czogW11cbiAgICAgICAgfVxuICAgICAgICBjdXJyZW50UHJvamVjdDoge31cbiAgICAgICAgc2hvd2VkUHJvamVjdDoge31cbiAgICAgICAgZ2V0SW5pdGlhbFN0YXRlOiAtPlxuICAgICAgICAgICAgICAgIEBuZXdQcm9qZWN0XG4gICAgICAgIHNldFR5cGU6IChlLHR5cGUpIC0+XG4gICAgICAgICAgICAgICAgaWYgdHlwZSA9PSAncHV0J1xuICAgICAgICAgICAgICAgICAgQHNob3dlZFByb2plY3QgPSBAY3VycmVudFByb2plY3RcbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICBAc2hvd2VkUHJvamVjdCA9IEBuZXdQcm9qZWN0XG4gICAgICAgICAgICAgICAgQHR5cGUgPSB0eXBlXG4gICAgICAgICAgICAgICAgQHRyaWdnZXIgQHNob3dlZFByb2plY3RcbiAgICAgICAgc2V0Q3VycmVudFByb2plY3Q6IChwKSAtPlxuICAgICAgICAgICAgICAgIEBjdXJyZW50UHJvamVjdCA9IHAgaWYgcD9cbiAgICAgICAgc3VibWl0OiAoZSkgLT5cbiAgICAgICAgICAgICAgICBzd2l0Y2ggQHR5cGVcbiAgICAgICAgICAgICAgICAgIHdoZW4gJ3Bvc3QnIHRoZW4gQHNlbmQgZVxuICAgICAgICAgICAgICAgICAgd2hlbiAncHV0JyB0aGVuIEB1cGRhdGUgZVxuICAgICAgICAgICAgICAgICAgZWxzZSBjb25zb2xlLmxvZyAnd3JvbmcgcmVxdWVzdCB0eXBlJ1xuICAgICAgICB1cGRhdGU6IChlKSAtPlxuICAgICAgICAgICAgICAgIHJlcXVlc3QgPSBzdXBlcmFnZW50XG4gICAgICAgICAgICAgICAgcmVxdWVzdFxuICAgICAgICAgICAgICAgICAgICAgICAgLnB1dCAnL2FwaS92MS9wcm9qZWN0LycgKyBAY3VycmVudFByb2plY3QuX2lkXG4gICAgICAgICAgICAgICAgICAgICAgICAudHlwZSAnanNvbidcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zZW5kIEBjdXJyZW50UHJvamVjdFxuICAgICAgICAgICAgICAgICAgICAgICAgLmVuZCAoKGVycixyZXMpIC0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nICdkYXRhIHVwZGF0ZWQnIGlmIHJlcy5va1xuICAgICAgICAgICAgICAgICAgICAgICAgKS5iaW5kIEBcbiAgICAgICAgICAgICAgICAkKFwiI2FkZE1vZGFsXCIpLm1vZGFsICdoaWRlJ1xuICAgICAgICBzZW5kOiAoZSkgLT5cbiAgICAgICAgICAgICAgICByZXF1ZXN0ID0gc3VwZXJhZ2VudFxuICAgICAgICAgICAgICAgIHJlcXVlc3RcbiAgICAgICAgICAgICAgICAgICAgICAgIC5wb3N0ICcvYXBpL3YxL3Byb2plY3QnXG4gICAgICAgICAgICAgICAgICAgICAgICAudHlwZSAnanNvbidcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zZW5kIEBuZXdQcm9qZWN0XG4gICAgICAgICAgICAgICAgICAgICAgICAuZW5kICgoZXJyLHJlcykgLT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cgJ2RhdGEgc2VudCcgaWYgcmVzLm9rXG4gICAgICAgICAgICAgICAgICAgICAgICApLmJpbmQgQFxuICAgICAgICAgICAgICAgICQoXCIjYWRkTW9kYWxcIikubW9kYWwgJ2hpZGUnXG4gICAgICAgIGhhbmRsZU5hbWU6ICh2YWx1ZSkgLT5cbiAgICAgICAgICAgICAgICBAc2hvd2VkUHJvamVjdC5uYW1lID0gdmFsdWVcbiAgICAgICAgICAgICAgICBAdHJpZ2dlciBAc2hvd2VkUHJvamVjdFxuICAgICAgICBoYW5kbGVEZXNjcmlwdGlvbjogKHZhbHVlKSAtPlxuICAgICAgICAgICAgICAgIEBzaG93ZWRQcm9qZWN0LmRlc2NyaXB0aW9uID0gdmFsdWVcbiAgICAgICAgICAgICAgICBAdHJpZ2dlciBAc2hvd2VkUHJvamVjdFxuICAgICAgICBoYW5kbGVSZXBvOiAodmFsdWUpIC0+XG4gICAgICAgICAgICAgICAgQHNob3dlZFByb2plY3QuZ2l0X3JlcG8gPSB2YWx1ZVxuICAgICAgICAgICAgICAgIEB0cmlnZ2VyIEBzaG93ZWRQcm9qZWN0XG4gICAgICAgIGhhbmRsZU1lbWJlcjogKGluZGV4LCB2YWx1ZSkgLT5cbiAgICAgICAgICAgICAgICBAc2hvd2VkUHJvamVjdC5tZW1iZXJzW2luZGV4XSA9IHZhbHVlXG4gICAgICAgICAgICAgICAgQHRyaWdnZXIgQHNob3dlZFByb2plY3RcbiAgICAgICAgYWRkTWVtYmVyOiAtPlxuICAgICAgICAgICAgICAgIEBzaG93ZWRQcm9qZWN0Lm1lbWJlcnMucHVzaCAnJ1xuICAgICAgICAgICAgICAgIEB0cmlnZ2VyIEBzaG93ZWRQcm9qZWN0XG4gICAgICAgIGRlbGV0ZU1lbWJlcjogKGluZGV4KSAtPlxuICAgICAgICAgICAgICAgIGRlbGV0ZSBAc2hvd2VkUHJvamVjdC5tZW1iZXJzW2luZGV4XVxuICAgICAgICAgICAgICAgIEB0cmlnZ2VyIEBzaG93ZWRQcm9qZWN0XG5cbm1vZHVsZS5leHBvcnRzID0gTW9kYWxTdG9yZSIsIkFjdGlvbnMgPSByZXF1aXJlICcuLi9hY3Rpb25zL3Byb2plY3QnXG5cbk1vZGFsQWN0aW9ucyA9IHJlcXVpcmUgJy4uL2FjdGlvbnMvcHJvamVjdC1tb2RhbCdcblNwcmludExpc3RBY3Rpb25zID0gcmVxdWlyZSAnLi4vYWN0aW9ucy9zcHJpbnQtbGlzdCdcblxuUHJvamVjdFN0b3JlID0gUmVmbHV4LmNyZWF0ZVN0b3JlXG4gICAgbGlzdGVuYWJsZXM6IFtBY3Rpb25zXVxuICAgIGRhdGE6IHsgcHJvamVjdDoge30sIGJhY2tsb2c6IHRydWUgfVxuICAgIGdldEluaXRpYWxTdGF0ZTogLT5cbiAgICAgICAgQGRhdGFcbiAgICBpbml0OiAtPlxuICAgICAgICBAdHJpZ2dlciBAZGF0YVxuICAgIHNlbGVjdEJhY2tsb2c6IC0+XG4gICAgICAgIEBkYXRhLmJhY2tsb2cgPSB0cnVlXG4gICAgICAgIEB0cmlnZ2VyIEBkYXRhXG4gICAgc2VsZWN0U3ByaW50czogLT5cbiAgICAgICAgQGRhdGEuYmFja2xvZyA9IGZhbHNlXG4gICAgICAgIEB0cmlnZ2VyIEBkYXRhXG4gICAgc2V0Q3VycmVudFByb2plY3Q6IChwKSAtPlxuICAgICAgICBAZGF0YS5wcm9qZWN0ID0gcFxuICAgICAgICBAdHJpZ2dlciBAZGF0YVxuICAgICAgICBTcHJpbnRMaXN0QWN0aW9ucy5zZXRMaXN0IEBkYXRhLnByb2plY3Quc3ByaW50c1xuICAgICAgICBNb2RhbEFjdGlvbnMuc2V0Q3VycmVudFByb2plY3QgQGRhdGEucHJvamVjdFxuXG5tb2R1bGUuZXhwb3J0cyA9IFByb2plY3RTdG9yZVxuIiwiQWN0aW9ucyA9IHJlcXVpcmUgJy4uL2FjdGlvbnMvc3ByaW50LWxpc3QnXG5cblNwcmludExpc3RTdG9yZSA9IFJlZmx1eC5jcmVhdGVTdG9yZVxuICAgIGxpc3RlbmFibGVzOiBbQWN0aW9uc11cbiAgICBsaXN0OiBbXVxuICAgIGluaXQ6IC0+XG4gICAgICAgIEBmZXRjaCgpXG4gICAgZ2V0SW5pdGlhbFN0YXRlOiAtPlxuICAgICAgICBAbGlzdFxuICAgIHNldExpc3Q6IChsKSAtPlxuICAgICAgICBAbGlzdCA9IGxcbiAgICAgICAgQGZldGNoKClcbiAgICBmZXRjaDogLT5cbiAgICAgICAgQHRyaWdnZXIgQGxpc3RcblxubW9kdWxlLmV4cG9ydHMgPSBTcHJpbnRMaXN0U3RvcmVcbiIsIi8vIEdlbmVyYXRlZCBieSBDb2ZmZWVTY3JpcHQgMS45LjNcbihmdW5jdGlvbigpIHtcbiAgdmFyIEFjdGlvbnMsIFNwcmludFN0b3JlO1xuXG4gIEFjdGlvbnMgPSByZXF1aXJlKCcuLi9hY3Rpb25zL3NwcmludC1tb2RhbCcpO1xuXG4gIFNwcmludFN0b3JlID0gUmVmbHV4LmNyZWF0ZVN0b3JlKHtcbiAgICBsaXN0ZW5hYmxlczogW0FjdGlvbnNdLFxuICAgIG5ld1NwcmludDoge1xuICAgICAgaWQ6IDAsXG4gICAgICBzdGFydDogXCJcIixcbiAgICAgIHRhc2tzOiBbXVxuICAgIH0sXG4gICAgdHlwZTogJycsXG4gICAgY3VycmVudFNwcmludDoge30sXG4gICAgc2hvd2VkU3ByaW50OiB7fSxcbiAgICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMubmV3U3ByaW50O1xuICAgIH0sXG4gICAgc2V0VHlwZTogZnVuY3Rpb24oZSwgdHlwZSkge1xuICAgICAgaWYgKHR5cGUgPT09ICdwdXQnKSB7XG4gICAgICAgIHRoaXMuc2hvd2VkU3ByaW50ID0gdGhpcy5jdXJyZW50U3ByaW50O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5zaG93ZWRTcHJpbnQgPSB0aGlzLm5ld1NwcmludDtcbiAgICAgICAgdGhpcy50eXBlID0gdHlwZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzLnRyaWdnZXIodGhpcy5zaG93ZWRTcHJpbnQpO1xuICAgIH0sXG4gICAgc2V0Q3VycmVudFNwcmludDogZnVuY3Rpb24ocykge1xuICAgICAgcmV0dXJuIHRoaXMuY3VycmVudFNwcmludCA9IHM7XG4gICAgfSxcbiAgICBzdWJtaXQ6IGZ1bmN0aW9uKGUpIHtcbiAgICAgIHN3aXRjaCAodGhpcy50eXBlKSB7XG4gICAgICAgIGNhc2UgJ3Bvc3QnOlxuICAgICAgICAgIHJldHVybiB0aGlzLnNlbmQoZSk7XG4gICAgICAgIGNhc2UgJ3B1dCc6XG4gICAgICAgICAgcmV0dXJuIHRoaXMudXBkYXRlKGUpO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIHJldHVybiBjb25zb2xlLmxvZygnd3JvbmcgcmVxdWVzdCB0eXBlJyk7XG4gICAgICB9XG4gICAgfSxcbiAgICB1cGRhdGU6IGZ1bmN0aW9uKGUpIHtcbiAgICAgIHZhciByZXF1ZXN0O1xuICAgICAgcmVxdWVzdCA9IHN1cGVyYWdlbnQ7XG4gICAgICByZXF1ZXN0LnB1dCgnL2FwaS92MS9zcHJpbnQvJyArIHRoaXMuY3VycmVudFNwcmludC5faWQpLnR5cGUoJ2pzb24nKS5zZW5kKHRoaXMuY3VycmVudFNwcmludCkuZW5kKChmdW5jdGlvbihlcnIsIHJlcykge1xuICAgICAgICBpZiAocmVzLm9rKSB7XG4gICAgICAgICAgcmV0dXJuIGNvbnNvbGUubG9nKCdkYXRhIHVwZGF0ZWQnKTtcbiAgICAgICAgfVxuICAgICAgfSkuYmluZCh0aGlzKSk7XG4gICAgICByZXR1cm4gJChcIiNhZGRNb2RhbFwiKS5tb2RhbCgnaGlkZScpO1xuICAgIH0sXG4gICAgc2VuZDogZnVuY3Rpb24oZSkge1xuICAgICAgdmFyIHJlcXVlc3Q7XG4gICAgICByZXF1ZXN0ID0gc3VwZXJhZ2VudDtcbiAgICAgIHJlcXVlc3QucG9zdCgnL2FwaS92MS9wcm9qZWN0JykudHlwZSgnanNvbicpLnNlbmQodGhpcy5uZXdTcHJpbnQpLmVuZCgoZnVuY3Rpb24oZXJyLCByZXMpIHtcbiAgICAgICAgaWYgKHJlcy5vaykge1xuICAgICAgICAgIHJldHVybiBjb25zb2xlLmxvZygnZGF0YSBzZW50Jyk7XG4gICAgICAgIH1cbiAgICAgIH0pLmJpbmQodGhpcykpO1xuICAgICAgcmV0dXJuICQoXCIjYWRkTW9kYWxcIikubW9kYWwoJ2hpZGUnKTtcbiAgICB9LFxuICAgIGhhbmRsZURhdGU6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICB0aGlzLnNob3dlZFNwcmludC5kYXRlID0gdmFsdWU7XG4gICAgICByZXR1cm4gdGhpcy50cmlnZ2VyKHRoaXMuc2hvd2VkU3ByaW50KTtcbiAgICB9LFxuICAgIGhhbmRsZU5hbWU6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICB0aGlzLnNob3dlZFNwcmludC5pZCA9IHZhbHVlO1xuICAgICAgcmV0dXJuIHRoaXMudHJpZ2dlcih0aGlzLnNob3dlZFNwcmludCk7XG4gICAgfSxcbiAgICBvbkthbmJhbjogZnVuY3Rpb24oKSB7XG4gICAgICBjb25zb2xlLmxvZyh0aGlzLnNob3dlZFNwcmludC5pZCArIHRoaXMuc2hvd2VkU3ByaW50LnN0YXJ0KTtcbiAgICAgIHJldHVybiBUcmVsbG8ucG9zdChcIi9ib3Jkc1wiLCB7XG4gICAgICAgIG5hbWU6IHRoaXMuc2hvd2VkU3ByaW50LmlkICsgdGhpcy5zaG93ZWRTcHJpbnQuc3RhcnRcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgb25LYW5iYW5GYWlsOiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBhbGVydCgnY29ubmVjdGlvbiB0byBUcmVsbG8gZmFpbGVkJyk7XG4gICAgfSxcbiAgICBjcmVhdGVLYW5iYW46IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHM7XG4gICAgICBzID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBjb25zb2xlLmxvZygnc3VjY2VzcycpO1xuICAgICAgfTtcbiAgICAgIHJldHVybiBUcmVsbG8uYXV0aG9yaXplKHtcbiAgICAgICAgdHlwZTogXCJwb3B1cFwiLFxuICAgICAgICBuYW1lOiBcIlNjcnVteSBBcHBsaWNhdGlvblwiLFxuICAgICAgICBzY29wZToge1xuICAgICAgICAgIHJlYWQ6IHRydWUsXG4gICAgICAgICAgd3JpdGU6IHRydWVcbiAgICAgICAgfSxcbiAgICAgICAgZXhwaXJhdGlvbjogXCJuZXZlclwiLFxuICAgICAgICBzOiBzLFxuICAgICAgICBvbkthbmJhbkZhaWw6IHRoaXMub25LYW5iYW5GYWlsXG4gICAgICB9KTtcbiAgICB9XG4gIH0pO1xuXG4gIG1vZHVsZS5leHBvcnRzID0gU3ByaW50U3RvcmU7XG5cbn0pLmNhbGwodGhpcyk7XG4iXX0=
