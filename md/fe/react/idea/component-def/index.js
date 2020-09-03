const c = {
  data() {
    return {
      name: 'hello',
    }
  },

  effects: {},

  methods: {
    onChange(e) {
      this.name = e.target.value
    },
  },

  render() {
    return (
      <div>
        <input type="text" value={this.name} onChange={this.onChange} />
        <p>
          Hello
          {this.name}
        </p>
      </div>
    )
  },
}

const fc = Component(c)

function Component(c) {
  const {data, effects, methods, render} = c

  const reducer = action => {}

  return function(props) {
    const $this = useRef(data()) // data is object or props => object

    const [state, dispatch] = useReducer(reducer)

    render.apply($this)
  }
}
