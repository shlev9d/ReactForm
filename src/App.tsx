import axios from 'axios'
import { ChangeEvent, FormEvent, useState } from 'react'
import './App.scss'

type FormState = {
	email: string
	name: string
	message: string
	date: string
	tel: string
}

type Message = {
	class: string,
	text: string,
}

function App() {
	const formUlr = `https://submit-form.com/pBmNsLQO`

	const initialState = {
		email: '',
		message: '',
		name: '',
		date:  '',
		tel:''
	} 

	const [formValue, setFormValue] = useState<FormState>(initialState)
	const [submit, setSubmit] = useState<boolean>(false)
	const [message, setMessage] = useState<Message>()

	const changeFormValue = (
		event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { id, value } = event.target
		const formKey = id as keyof FormState
		const newFormState = { ...formValue }
		newFormState[formKey] = value
		setFormValue(newFormState)
	}

	const submitForm = async (event: FormEvent) => {
		event.preventDefault()
		setSubmit(true)
		await queryPost()
		setSubmit(false)
	}


	const queryPost = async () => {
		const payload = {...formValue}
		try {
			const result = await axios.post(formUlr, payload)
			console.log(result)
			setMessage({
				class: 'ok',
				text: '✔ успешно оправлена',
			})
			setFormValue(initialState)
		} catch (error) {
			console.log(error)
			setMessage({
				class: 'er',
				text: '× произошла ошибка',
			})
		}
	}

	return (
		<div className='app'>
			<h1>Заполни форму для оправки</h1>
			{message && (
				<div className={message.class}>{message.text}</div>
			)}
			<form action=' ' onSubmit={submitForm}>
				<div className='formInput'>
					<label htmlFor='name'>Введите имя и фамилию</label>
					<input
						className='formArea'
						type='text'
						id='name'
						value={formValue.name.toUpperCase()}
						onChange={changeFormValue}
						required
						pattern='^[\S+]{3,30} [\S+]{3,30}$'
					/>
					<span className='condition'>
						Минимальная длина 3 символа, максимальная 30. <br />
						Между словами только 1 пробел.
					</span>
				</div>

				<div className='formInput'>
					<label htmlFor='email'>Введите Email</label>
					<input
						className='formArea'
						type={'email'}
						id='email'
						value={formValue.email}
						onChange={changeFormValue}
						required
					/>
					<span className='condition'>Необходимо заполнить это поле</span>
				</div>

				<div className='formInput'>
					<label htmlFor='date'>Выберите свою дату рождения</label>
					<input
						className='formArea'
						type={'date'}
						id='date'
						value={formValue.date}
						onChange={changeFormValue}
						required
					/>
					<span className='condition'>Необходимо заполнить это поле</span>
				</div>

				<div className='formInput'>
					<label htmlFor='tel'>Укажите свой контактный номер</label>
					<input
						className='formArea'
						type={'tel'}
						id='tel'
						value={formValue.tel}
						onChange={changeFormValue}
						required
						pattern='^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$'
					/>
					<span className='condition'>
						Введите Ваш номер телефона в формате +7(123)4567890
					</span>
				</div>

				<div className='formInput'>
					<label htmlFor='message'>Введите сообщение</label>
					<textarea
						className='formArea textArea'
						id='message'
						onChange={changeFormValue}
						value={formValue.message}
						required
						minLength={10}
						maxLength={300}
					></textarea>
					{formValue.message.length < 10 &&	<span className=''>
						минимальная длина 10 символов, максимальная 300
					</span>}
				
				</div>

				<button disabled={submit}>
					{submit ? 'Отправляется...' : 'Отправить'}
				</button>
			</form>
		</div>
	)
}

export default App