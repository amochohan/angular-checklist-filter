# Changelog

All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/).

## [1.0.0] - 2015-06-19

### Added
- ```noselection``` parameter on directive to control the wording when no option has been selected.
- ```requiresdata``` (optional) parameter to specify a dependency before enabling the checklist.
- ```requiresmodel``` (optional, required if ```requiresdata``` is present) parameter to specify the dependency name.
- ```loadmodelonchange``` (optional) parameter to update a scope parameter based on the selected value on change.

### Changed
- Updated examples, demo and readme to show ```empty``` parameter usage.
- Fix height of checklist and add scrollbar for long lists

### Fixed
- Check if the ```data``` parameter is an array or string, to allow multiple selections