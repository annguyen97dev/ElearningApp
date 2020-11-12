import React, { useRef, useEffect, useState } from 'react';
import { getStudentLayout } from '~/components/Layout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './login.module.css';
const Login = () => {
	const [url, setUrl] = useState('');
	const [isCopy, setIsCopy] = useState(false);
	const refInput = useRef(true);
	const copy = (element) => {
		return () => {
			document.execCommand('copy', false, element.select());
			setIsCopy(true);
			setTimeout(() => {
				setIsCopy(false);
			}, 3000);
		};
	};

	const copyShareUrl = copy(refInput.current);

	// useEffect(() => {
	// 	setUrl('https://etalk.vn/student/referral/code=325454');
	// 	return () => {
	// 		refInput.current && (refInput.current = false);
	// 	};
	// }, []);

	return (
		<>
			<h1 className="main-title-page">Đăng nhập</h1>
			<div class="box-form">
				<div Class="box-login">
					<div class="box-input">
						<label class="txt-input">Tên tài khoản</label>
						<input type="text" class="fcontrol f-input" />
					</div>
					<div class="box-input">
						<label class="txt-input">Mật khẩu</label>
						<input type="password" class="fcontrol f-input" />
					</div>
					<div class="box-input d-flex jutifly-streen">
						<div class="box-checked">
							<input type="checkbox" id="checked" />
							<label class="txt-checkbox" for="checked">
								Ghi nhớ
							</label>
						</div>
						<div class="box-forgot">
							<a href="/student/account-user/account-forgot">Quên mật khẩu</a>
						</div>
					</div>
				</div>
				<a href="#" class="btn btn-login">
					<FontAwesomeIcon icon="sign-in-alt" /> Đăng nhập
				</a>
			</div>
		</>
	);
};

Login.getLayout = getStudentLayout;
export default Login;
