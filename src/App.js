import React from 'react';
import { message } from 'antd';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import api from './api';
import Header from './components/Header/Header';
import LeftSideMenu from './components/menu/LeftSideMenu/LeftSideMenu';
import LoginPage from './components/page/LoginPage/LoginPage';
import style from './style.css';

class App extends React.Component {
	state = {
		isLogin: false
	}
	changeLoginState = () => {
		this.setState({
			isLogin: true
		})
	}
	componentDidMount() {
		if(localStorage.getItem('token')) {
			api.user.comfirmToken({token: localStorage.getItem('token')}).then(() => {
				this.changeLoginState()
			}).catch(() => {
				localStorage.clear();
				message.info('token失效，请先登录');
			})
		}
	}
	render() {
		const { isLogin } = this.state;
		return (
			<Router>
				<Route render={({history}) => <div>
					<Header isLogin={isLogin}/>
					<LeftSideMenu disabled={!isLogin}/>
					<div className={style.contentWrapper}>
						<Switch>
							<Route exact path='/' render={() => <p>this is index page</p>}/>
							<Route exact path='/dashbord' render={() => <p>this is dashbord page <Link to='/'>Index</Link></p>}/>
							<Route exact path='/login' render={() => <LoginPage 
								changeLoginState={this.changeLoginState}
								history={history}
							/>} 
							/>
							<Route render={() => <p>this is default page</p>}/>
						</Switch>
					</div>	
				</div>}/>
			</Router>
		)
	}
}

export default App;