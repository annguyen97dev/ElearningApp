import React, { useRef, useEffect, useState } from 'react';
import { getStudentLayout } from '~/components/Layout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './forgot.module.css';
const Forgot = () => {
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
			<h1 className="main-title-page">Quên mật khẩu</h1>
			<div class="box-form">
				<div Class="box-login">
					<div class="box-input">
						<label class="txt-input">Nhập địa chỉ email của bạn</label>
						<input type="text" class="fcontrol f-input" />
					</div>
					<div class="text-center">
						<a href="#" class="btn btn-send">
							Gửi
						</a>
					</div>
				</div>
			</div>
		</>
	);
};

Forgot.getLayout = getStudentLayout;
export default Forgot;
