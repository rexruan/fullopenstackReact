import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'

// 函数式组件和类组件的比较

// 类组件只有一个对象，用于储存状态，也只有一个管理状态的函数，setState
// 函数组件可以分别定义多个对象，来存储状态，每个状态有各自的函数来管理状态的变更

// 类组件有生命周期，这里就用到了componentDidMount, 在组件加载完成之后的一次性操作，而且类组件含有this来指代组件对象本身
// 函数组件没有生命周期，通过调用hook (such as useEffect)来达到类组件生命周期相同的功能，且不含this字符来操作组件本身。

// ps 在react 16.8版本之前，不支持函数组件。在我们使用新版本中，我们没有必要使用类组件。我们也没有必要用新版本的函数组件去重写之前写好的类组件。


class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      anecdotes: [],
      current: 0
    }
  }

  componentDidMount = () => {
    axios
      .get('http://localhost:3001/anecdotes')
      .then( response => {
        this.setState({'anecdotes': response.data})
      })
  }

  handleClick = () => {
    const current = Math.floor(
      Math.random() * this.state.anecdotes.length
    )
    this.setState({current})
  }
  render() {
    if (!this.state.anecdotes.length) {
      return <div>No anecdotes...</div>
    }
    return (
      <div>
        <h1>anecdote of the day</h1>
        <div>{this.state.anecdotes[this.state.current].content}</div>
        <button onClick={this.handleClick}>next</button>
      </div>
    )
  }
}

export default App


// const App = () => {
//   const anecdotes = useSelector(state => state)
//   const dispatch = useDispatch()

//   const vote = (id) => {
//     console.log('vote', id)
//   }

//   return (
//     <div>
//       <h2>Anecdotes</h2>
//       {anecdotes.map(anecdote =>
//         <div key={anecdote.id}>
//           <div>
//             {anecdote.content}
//           </div>
//           <div>
//             has {anecdote.votes}
//             <button onClick={() => vote(anecdote.id)}>vote</button>
//           </div>
//         </div>
//       )}
//       <h2>create new</h2>
//       <form>
//         <div><input /></div>
//         <button>create</button>
//       </form>
//     </div>
//   )
// }

// export default App