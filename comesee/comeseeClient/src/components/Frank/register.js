import Registerstyle from '../../css/Frank/register.module.css';
import RegisterInput from './registerinput';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap';
import BtnMovie from './btnMovie';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const Register = () => {
    const history = useHistory();
    // 狀態設定
    const [values, setValues] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        username: "",
        gender: "",
        birtday: "",
        phonenumber: "",
        addressCity: "",
        addressTown: "",
        addressDetail: "",
    });

    const [moviePreferences, setMoviePreferences] = useState([]);
    const [verificationCode, setVerificationCode] = useState("");

    // 輸入表單欄位的設定
    const inputs = [
        {
            id: 1,
            name: "password",
            type: "password",
            placeholder: "Password",
            message: "請輸入中英文夾雜、6~20字的密碼",
            pattern: "^[A-Za-z0-9]{6,20}$",
            label: "密碼",
            required: true,
        },
        {
            id: 2,
            name: "confirmPassword",
            type: "password",
            placeholder: "Password",
            message: "請再次輸入密碼",
            label: "再次確認密碼",
            pattern: values.password, // 將密碼與確認密碼比對
            required: true,
        },
        {
            id: 3,
            name: "username",
            type: "text",
            placeholder: "User Name",
            label: "姓名/暱稱",
            message: "必填",
            required: true,
        },
        {
            id: 4,
            name: "birtday",
            type: "date",
            placeholder: "1997/09/18",
            label: "西元出生年月日",
        },
        {
            id: 5,
            name: "phonenumber",
            type: "text",
            placeholder: "0987-654-321",
            label: "手機號碼",
            pattern: "^\\d{4}-\\d{3}-\\d{3}$", // 正則表達式，用於驗證手機號碼格式
            message: "請輸入有效的手機號碼，格式為：0987-654-321",
            required: true,
        },
    ];


    console.log("重新渲染");

     // 提交表單的處理函式
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (moviePreferences.length === 0) {
            alert('請選擇您的電影喜好');
            return; // 如果未選擇電影喜好，不要發送 POST 請求
        }

        try {
            const formData = {
                email: values.email,
                password: values.password,
                // 其他表單字段
                moviePreferences: moviePreferences, // 添加電影喜好數據
            };

            const response = await axios.post('/api/register', formData); // 發送註冊請求到後端

            if (response.data.success) {
                alert('註冊成功！');
                history.push('/login');
            } else {
                alert('註冊失敗，請檢查您的資訊。');
            }
        } catch (error) {
            console.error('發生錯誤', error);
        }
    };

    // 發送驗證碼的函式
    const sendVerificationCode = async (email) => {
        try {
            const response = await axios.post('/api/send-verification-code', { email }); // 請替換成實際的 API 端點
            if (response.data.success) {
                alert('驗證碼已發送到您的郵箱，請查收！');
            } else {
                alert('發送驗證碼失敗，請重試。');
            }
        } catch (error) {
            console.error('發生錯誤', error);
            alert('發生錯誤，請重試。');
        }
    };

    // 驗證驗證碼的函式
    const handleVerification = async () => {
        try {
            if (!verificationCode) {
                alert('請輸入驗證碼');
                return;
            }

            // 向後端發送驗證碼，並等待驗證結果
            const response = await axios.post('/api/verify-code', { code: verificationCode });

            if (response.data.success) {
                alert('驗證碼正確，註冊成功！');
                // 在這裡執行註冊操作或其他需要的處理
            } else {
                alert('驗證碼不正確，請檢查驗證碼。');
            }
        } catch (error) {
            console.error('發生錯誤', error);
            alert('發生錯誤，請重試。');
        }
    };

    // 表單輸入值變更的處理函式
    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    // 處理選擇的電影喜好
    const handleMoviePreference = (preference) => {
        // 將選擇的電影喜好添加到狀態中
        setMoviePreferences([...moviePreferences, preference]);
    };

    return (
        <div className={Registerstyle.all}>
            <div className={'container ' + Registerstyle.inside}>
                <h1 className={Registerstyle.registertitle}>註冊會員</h1>
                <form onSubmit={handleSubmit} className={Registerstyle.register}>
                    <div>
                        <div className={Registerstyle.email}>
                            <label className={Registerstyle.label}>電子郵件</label>
                            <input
                                className={Registerstyle.input}
                                type="email"
                                placeholder="comesee@comesee.com"
                                required
                                name="email"
                                onChange={onChange}
                            />
                            <button
                                className={Registerstyle.btnstyle + " mb-5"}
                                onClick={() => sendVerificationCode(values.email)} // 傳遞用戶的電子郵件地址
                            >
                                發送驗證碼
                            </button>
                        </div>

                        <div className={Registerstyle.email2}>
                            <label className={Registerstyle.label}></label>
                            <input
                                className={Registerstyle.input}
                                type="text"
                                placeholder="請輸入驗證碼"
                                required
                                value={verificationCode} // 將驗證碼與輸入框關聯
                                onChange={(e) => setVerificationCode(e.target.value)} // 更新驗證碼狀態
                            />
                            <button className={Registerstyle.btnstyle} onClick={handleVerification}>確定</button>
                        </div>
                    </div>

                    {/* 渲染表單輸入欄位 */}
                    {inputs.filter((input) => input.id >= 1 && input.id <= 3).map((input) => (
                        <RegisterInput
                            key={input.id}
                            {...input}
                            value={values[input.name]}
                            onChange={onChange}
                        />
                    ))}

                    <div className={Registerstyle.gender}>
                        <label className={Registerstyle.label}>性別</label>
                        <select id="gender" className={Registerstyle.input} name="gender" onChange={onChange}>
                            <option selected>請選擇</option>
                            <option value="男">男</option>
                            <option value="女">女</option>
                        </select>
                    </div>

                    {/* 渲染表單輸入欄位 */}
                    {inputs.filter((input) => input.id >= 4 && input.id <= 5).map((input) => (
                        <RegisterInput
                            key={input.id}
                            {...input}
                            value={values[input.name]}
                            onChange={onChange}
                        />
                    ))}

                    <div className={Registerstyle.address}>
                        <div>
                            <label className={Registerstyle.label}>通訊地址</label>
                            <select id="addressCity" className={Registerstyle.addressinput} name="addressCity" onChange={onChange}>
                                <option selected>請選擇縣市</option>
                                <option value="台中市">台中市</option>
                                <option value="台北市">台北市</option>
                            </select>
                            <select id="addressTown" className={Registerstyle.addressinput} name="addressTown" onChange={onChange}>
                                <option selected>請選擇縣市</option>
                                <option value="南屯區">南屯區</option>
                                <option value="北屯區">北屯區</option>
                            </select>
                        </div>
                        <div className={Registerstyle.addressinput2}>
                            <input
                                className={Registerstyle.input}
                                type="text"
                                placeholder="地址"
                                name="addressDetail"
                                onChange={onChange}
                            />
                        </div>
                    </div>

                    <div className={Registerstyle.btncheck}>
                        <button
                            className={Registerstyle.btnstyle + " mb-5"}
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal"
                        >
                            加入會員
                        </button>
                    </div>
                </form>
                <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className={"modal-content " + Registerstyle.modal}>
                            <div className="modal-header">
                                <h5 className={Registerstyle.btnmodaltitle} id="exampleModalLabel">請選擇您喜愛的電影類型</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className={"modal-body " + Registerstyle.btnmovie}>
                                {/* 渲染電影喜好選項 */}
                                <BtnMovie label="動作" onClick={() => handleMoviePreference("動作")} />
                                <BtnMovie label="喜劇" onClick={() => handleMoviePreference("喜劇")} />
                                <BtnMovie label="浪漫" onClick={() => handleMoviePreference("浪漫")} />
                                <BtnMovie label="音樂" onClick={() => handleMoviePreference("音樂")} />
                                <BtnMovie label="科幻" onClick={() => handleMoviePreference("科幻")} />
                                <BtnMovie label="恐怖" onClick={() => handleMoviePreference("恐怖")} />
                                <BtnMovie label="動畫" onClick={() => handleMoviePreference("動畫")} />
                                <BtnMovie label="戰爭" onClick={() => handleMoviePreference("戰爭")} />
                                <BtnMovie label="災難" onClick={() => handleMoviePreference("災難")} />
                                <BtnMovie label="劇情" onClick={() => handleMoviePreference("劇情")} />
                                <BtnMovie label="驚悚" onClick={() => handleMoviePreference("驚悚")} />
                                <BtnMovie label="推理" onClick={() => handleMoviePreference("推理")} />
                                <BtnMovie label="古裝" onClick={() => handleMoviePreference("古裝")} />
                                <BtnMovie label="歷史" onClick={() => handleMoviePreference("歷史")} />
                                <BtnMovie label="紀錄" onClick={() => handleMoviePreference("紀錄")} />
                                <BtnMovie label="政治" onClick={() => handleMoviePreference("政治")} />
                            </div>
                            <div className="modal-footer">
                                <button className={Registerstyle.btnstyle} type="button" data-bs-dismiss="modal">略過</button>
                                <button className={Registerstyle.btnstyle} type="submit">送出</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;