import React from 'react'
import logo from './logo.svg'
import './App.css'

function App() {
const formId = 'pBmNsLQO'
const formSparkUrl = `https://submit-form.com/${formId}`

const submitForm = () =>{

  }

	return (
		<div className='App'>
			<h1>
				<span>contact us</span>
			</h1>
      <form action="" onSubmit={submitForm}>
<button>submit</button>
      </form>
		</div>
	)
}

export default App
