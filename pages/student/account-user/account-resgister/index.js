import React, { useRef, useEffect, useState } from 'react';
import { getStudentLayout } from '~/components/Layout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './resgister.module.css';
const Resgister = () => {
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
	const [fromDate, setFromDate] = useState('');
	const [toDate, setToDate] = useState('');
	// useEffect(() => {
	// 	setUrl('https://etalk.vn/student/referral/code=325454');
	// 	return () => {
	// 		refInput.current && (refInput.current = false);
	// 	};
	// }, []);

	return (
		<>
			<h1 className="main-title-page">Đăng kí học thử miễn phí</h1>
			<div class="box-form">
				<div class="box-resgister">
					<h3 class="title-resgister">Đăng kí học tại E-Talk.vn</h3>
					<div class="resgister-bottom">
						<div class="resgister-landcaps">
							<div class="box-input">
								<input
									type="text"
									placeholder="Họ và tên *"
									class="fcontrol f-input"
								/>
							</div>
							<div class="box-input">
								<DatePicker
									dateFormat="dd/MM/yyyy"
									className="fcontrol"
									placeholderText={`Ngày Sinh *`}
									selected={fromDate}
									onChange={(date) => setFromDate(date)}
									selectsStart
									isClearable={!!fromDate ? true : false}
									startDate={fromDate}
									endDate={toDate}
								/>
							</div>
						</div>
						<div class="resgister-landcaps">
							<div class="box-input">
								<input
									type="text"
									placeholder="Email *"
									class="fcontrol f-input"
								/>
							</div>
							<div class="box-input">
								<input
									type="text"
									placeholder="Số điện thoại *"
									class="fcontrol f-input"
								/>
							</div>
						</div>
						<div class="resgister-landcaps">
							<div class="box-input">
								<select class="fcontrol f-input f-select">
									<option selected>-- Mời bạn chọn lớp học nhé --</option>
									<option>Phát âm chuyên sâu</option>
									<option>Giao tiếp thực hành</option>
									<option>Phát triển từ vựng</option>
								</select>
							</div>
							<div class="box-input">
								<input
									type="text"
									placeholder="Skype *"
									class="fcontrol f-input"
								/>
							</div>
						</div>
						<div class="resgister-landcaps">
							<div class="box-textarea">
								<textarea
									type="text"
									class="f-textarea"
									placeholder="Tin nhắn"
								></textarea>
							</div>
						</div>
						<div class="resgister-landcaps">
							<div class="box-radio">
								<h4 class="title-radio">
									Bạn biết E-talk qua kênh thông tin nào:
								</h4>
								<div class="radio-item">
									<label>
										<input
											type="radio"
											id="gg"
											name="res"
											value="gg"
											class="f-radio"
										/>
										Tìm kiếm trên Google
									</label>
								</div>
								<div class="radio-item">
									<label>
										<input
											type="radio"
											id="fb"
											name="res"
											value="fb"
											class="f-radio"
										/>
										Fanpage Facebook E-talk
									</label>
								</div>
								<div class="radio-item">
									<label>
										<input
											type="radio"
											id="fr"
											name="res"
											value="fr"
											class="f-radio"
										/>
										Bạn bè giới thiệu
									</label>
								</div>
								<div class="radio-item">
									<label>
										<input
											type="radio"
											id="other"
											name="res"
											value="other"
											class="f-radio"
										/>
										Khác (Tờ rơi, Forum, Banner…)
									</label>
								</div>
							</div>
						</div>
						<a href="#" class="btn btn-resgister">
							Đăng kí
						</a>
						<p class="desc-cs">
							Tôi đã đọc và đồng ý với các quy định và chính sách sử dụng dịch
							vụ tại E-Talk.vn )
						</p>
					</div>
				</div>
			</div>
		</>
	);
};

Resgister.getLayout = getStudentLayout;
export default Resgister;
