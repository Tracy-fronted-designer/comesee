import React, { Component } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import axios from 'axios'; // 導入axios
import LoginStyle from '../../css/Frank/loginPage.module.css';
import Gicon from '../../css/Frank/img/google.png';
import Ficon from '../../css/Frank/img/facebook.png';
import Licon from '../../css/Frank/img/line.png';


class Login extends Component {

    // 翊峰 vvv
    state = {
        email: '',
        password: '',
        showPassword: false,
        loginError: '', // 新增登入錯誤訊息狀態
    };
    

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value, loginError: '' }); // 清除之前的錯誤訊息
    };
    

    handleSubmit = async event => {
        event.preventDefault();
        const { email, password } = this.state;

        

        try {
            // 發送登錄請求到後端
            const response = await axios.post('/api/login', { email, password }); // 替換成實際的後端API路由

            // 根據後端返回的數據處理登錄結果
            if (response.data.success) {
                // 登錄成功，可以執行相應操作，例如導航到其他頁面
                // 可以使用react-router-dom中的history進行導航
                this.props.history.push('/dashboard'); // 將 '/dashboard' 替換成您希望導航的路由
            } else {
                // 登錄失敗，顯示錯誤消息或執行相應操作
                this.setState({ loginError: '登錄失敗，請檢查您的郵件地址和密碼。' });
            }
        } catch (error) {
            // 處理錯誤
            console.error('發生錯誤', error);
            // 可以在此處處理其他錯誤，如果需要的話
        }
    };


    render() {
        return (
            <div className={LoginStyle.Login}>
                <div className={`${LoginStyle.bg} container`}>

                    <h2 className={LoginStyle.title}>會員登入</h2>

                    <form className={LoginStyle.formBox} onSubmit={this.handleSubmit}> {/* 將onSubmit設置為this.handleSubmit */}
                        <div className={LoginStyle.text}>電子郵件</div>
                        <input
                            type="mail"
                            className={LoginStyle.in}
                            placeholder="User Name"
                            // 翊峰
                            name="email"
                            value={this.state.email}
                            onChange={this.handleInputChange}
                        // 翊峰
                        />
                        <div className={LoginStyle.text}>密　　碼</div>
                        <input
                            type={this.state.showPassword ? 'text' : 'password'}
                            className={LoginStyle.in}
                            placeholder="Password"
                            name="password"
                            value={this.state.password}
                            onChange={this.handleInputChange}
                        />
                        
                        
                          {/* 顯示錯誤訊息 */}
                          {this.state.loginError && (
                            <div className={LoginStyle.error}>{this.state.loginError}</div>
                        )}

                        <div>
                            <Link to="/forgot-password" className={LoginStyle.fp}>
                                忘記密碼？
                            </Link>
                        </div>
                        {/* <BtnLarge label="登入" className={LoginStyle.btn} /> */}
                        <button type="submit" className={LoginStyle.btn}>登入</button>
                    </form>


                    <div className={LoginStyle.box}>

                        <div className={LoginStyle.subtitle}>使用第三方登入</div>

                        <div className={LoginStyle.tw}>
                            <button className={LoginStyle.Lbtn}><img src={Gicon} className={LoginStyle.icon} alt="google" />GOOGLE</button>
                            <button className={LoginStyle.Lbtn}><img src={Ficon} className={LoginStyle.icon} alt="facebook" />FACEBOOK</button>
                            <button className={LoginStyle.Lbtn}><img src={Licon} className={LoginStyle.icon} alt="line" />LINE</button>
                        </div>

                        <div className={LoginStyle.tip}>
                            還沒加入會員嗎？
                            <Link to="/Register" className={LoginStyle.gr}>請點此註冊</Link>
                        </div>

                    </div>

                </div>

            </div>

        );
    }
}

export default Login;
