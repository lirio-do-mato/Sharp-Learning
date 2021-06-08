import React, { Component } from 'react'
class PostForm extends Component {
	constructor(props) {
		super(props)

		this.state = {
			nome: '',
			idade: '',
			local: '',
            ocupacao: '',
			educacao: '',
			toca: ''
		}
	}

	changeHandler = e => {
		this.setState({ [e.target.name]: e.target.value })
	}

	submitHandler = e => {
        fetch('http://143.106.201.84:3001/addUsersInfo', {
            method: 'post',
            headers: {
            'Accept':'application/json','Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nome: this.state.nome,
                idade: this.state.idade,
                local: this.state.local,
                ocupacao: this.state.ocupacao,
                educacao: this.state.educacao,
                toca: this.state.toca
            })
        }).then(res => res.json())
        .then(data => 
        {
            console.log(data);
        })
        .catch(erro => {
            console.log(erro)
        })
        alert("Informações adicionadas com sucesso");
	}

	render() {
		const { nome, idade, local, ocupacao, educacao, toca } = this.state
		return (
			<div>
				<form onSubmit={this.submitHandler}>
					<div>
						<input
							type="text"
							name="nome"
							value={nome}
							onChange={this.changeHandler}
						/>
					</div>
					<div>
						<input
							type="number"
							name="idade"
							value={idade}
							onChange={this.changeHandler}
						/>
					</div>
					<div>
						<input
							type="text"
							name="local"
							value={local}
							onChange={this.changeHandler}
						/>
					</div>
                    <div>
						<input
							type="text"
							name="ocupacao"
							value={ocupacao}
							onChange={this.changeHandler}
						/>
					</div>
                    <div>
						<input
							type="text"
							name="educacao"
							value={educacao}
							onChange={this.changeHandler}
						/>
					</div>
                    <div>
						<input
							type="text"
							name="toca"
							value={toca}
							onChange={this.changeHandler}
						/>
					</div>
					<button type="submit">Submit</button>
				</form>
			</div>
		)
	}
}

export default PostForm