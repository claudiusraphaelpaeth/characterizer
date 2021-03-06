const EventEmitter = require('events').EventEmitter

module.exports = class MainViewSelector extends EventEmitter {
  constructor(properties) {
    super()
    this.viewTypes = properties.mainViews
    this.root = document.createElement("div")
    this.root.setAttribute("id", "main-view-selector")

    if(properties && properties.type) {
      this.selectedViewType = properties.type
    }

    this.updateView()
  }

  setSelectedViewType(type) {
    this.selectedViewType = type
    this.updateView()
  }

  onOptionClick(event) {
    let type = event.target.dataset.type
    this.emit('select-view', type)
    this.setSelectedViewType(type)
  }

  getView() {
    return this.root
  }

  updateView() {
    this.root.innerHTML = ``
    for(let viewType of this.viewTypes) {
      let option = document.createElement("div")
      option.setAttribute("data-type", viewType.type)
      option.classList.add("main-view-selector-option")
      if(viewType.type === this.selectedViewType) {
        option.classList.add("main-view-selector-selected")
      }
      option.innerHTML = viewType.label
      this.root.appendChild(option)
      option.addEventListener('click', this.onOptionClick.bind(this))
    }
  }
}
