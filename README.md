#  **scrumy [cpteam2015]** 
## Environnement de Développement
### Installer ruby & Sinatra
Installation de **ruby**
```
$ sudo apt-get install ruby-full
```
Installation de **sinatra** (au cremi faudra mettre --user-install)
```
$ sudo gem install [--user-install] sinatra
```
### Chartes de dev et d'utilisation de git
Pour **Ruby** on essaiera de respecter les bonnes pratiques ennoncées dans ce wiki : https://github.com/bbatsov/ruby-style-guide. <br /> 
L'analyseur de code [RuboCop](https://github.com/bbatsov/rubocop) se base exclusivement sur ce document et nous obligera plus ou moins à respecter le 'style guide' de la communauté Ruby.
**Installer d'abord Rubocop**
```
gem install rubocop
```
puis pour **emacs** copier/coller ce code à la fin de son ***~/.emacs***
```(when (>= emacs-major-version 24)  
  (require 'package)  
  (add-to-list  
   'package-archives  
   '("melpa" . "http://melpa.org/packages/")  
   t)  
  (package-initialize))  
(add-hook 'ruby-mode-hook 'rubocop-mode)  
```
Pour **SublimeText**

 1. Faire un clone du package dans le repetoire qui contient les packages de sublime (*Preferences-> Browse Packages ...*)
```
git clone git@github.com:pderichs/sublime_rubocop.git "RuboCop"
```
2. Restart SublimeText


