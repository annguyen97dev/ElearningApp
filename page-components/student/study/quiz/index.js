import React, { useState, useEffect, useLayoutEffect } from 'react';
import './styles.modules.scss';
import Button from '@material-ui/core/Button';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import RadioQuestion from '~/page-components/student/study/quiz/RadioQuestion';
import CheckboxQuestion from '~/page-components/student/study/quiz/CheckboxQuestion';
import GroupQuestion from '~/page-components/student/study/quiz/GroupQuestion';
import MapQuestion from '~/page-components/student/study/quiz/MapQuestion';
import DropQuestion from '~/page-components/student/study/quiz/DropQuestion';
import CountDown from '~/page-components/student/study/quiz/CountDown';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const useStyles = makeStyles((theme) => ({
	styleButton: {
		marginRight: '10px',
	},
	modal: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	paper: {
		backgroundColor: theme.palette.background.paper,
		border: '2px solid #000',
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
	},
	popup: {
		border: '2px solid #fff',
		borderRadius: '7px',
		boxShadow: '1px 2px 10px #04040440',
		background: 'white',
		width: '25%',
		padding: '20px',
		textAlign: 'center',
	},
}));

const Quiz = () => {
	const classes = useStyles();
	const [handleClick, setHandleclick] = useState(false);

	const [IsShowQuiz, setIsShowQuiz] = useState(false);
	const [addMinutes, setAddMinutes] = useState();
	const [showPopup, setShowPopup] = useState(false);
	const [open, setOpen] = React.useState(false);

	const showQuiz = () => {
		setHandleclick(true);
		const add_minutes = (function (dt, minutes) {
			return new Date(dt.getTime() + minutes * 60000);
		})(new Date(), 10);
		setAddMinutes(add_minutes);
	};

	const timeUp = () => {
		setHandleclick(false);
		setShowPopup(true);
	};

	const makeAgain = () => {
		setShowPopup(false);
		showQuiz();
	};

	const handleOpen = () => {
		setOpen(true);
		showQuiz();
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div className="wrap-quiz">
			<div className="quiz-review">
				<ul className="quiz-review__list">
					<li>
						Số lượng câu hỏi: <b>30 câu</b>
					</li>
					<li>
						Thời gian: <b>30 phút</b>
					</li>
				</ul>
				<div className="quiz-btn">
					<Button variant="contained" color="secondary" onClick={handleOpen}>
						Bắt đầu
					</Button>
				</div>
			</div>

			<Modal
				aria-labelledby="transition-modal-title"
				aria-describedby="transition-modal-description"
				className={classes.modal}
				open={open}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}
			>
				<div className="modal-quiz">
					<div className="modal-quiz-header">
						<button onClick={handleClose} className="btn-close">
							{' '}
							<FontAwesomeIcon icon="times" />
						</button>
					</div>
					<div in={open} className="quiz">
						<div className="quiz-header">
							<div className="left">
								<p className="quiz-title">Bài trắc nghiệm</p>
								<div className="quiz-info">
									<p className="quiz-info-minutes">
										Say something about this quiz
									</p>
								</div>
							</div>
							<div className="right">
								{handleClick ? (
									<CountDown
										addMinutes={addMinutes}
										onFinish={() => !showPopup && timeUp()}
									/>
								) : (
									''
								)}
							</div>
						</div>
						<RadioQuestion />
						<CheckboxQuestion />
						<GroupQuestion />
						<MapQuestion />
						<DropQuestion />
						<div className="row-button">
							<Button
								variant="contained"
								color="secondary"
								className={classes.styleButton}
							>
								Nộp bài
							</Button>
							<Button variant="contained" onClick={handleClose}>
								Hủy bỏ
							</Button>
						</div>
					</div>
				</div>
			</Modal>

			<Modal
				aria-labelledby="transition-modal-title"
				aria-describedby="transition-modal-description"
				className={classes.modal}
				open={showPopup}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}
			>
				<Fade in={showPopup} className={classes.popup}>
					<div className={classes.paper}>
						<img
							src="/static/img/notification.png"
							className="popup-img"
							alt="notification"
						/>
						<h3 id="transition-modal-title" className="popup-title">
							Time's up !!!
						</h3>
						<p id="transition-modal-description" className="popup-des">
							Bạn đã hết giờ làm quiz
						</p>
						<div className="popup-box-btn">
							<Button variant="contained" color="secondary">
								Nộp bài
							</Button>
							<Button variant="contained" onClick={makeAgain}>
								Làm lại
							</Button>
						</div>
					</div>
				</Fade>
			</Modal>
		</div>
	);
};

export default Quiz;
