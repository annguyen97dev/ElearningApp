import React, { useState, useEffect, useLayoutEffect } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import RadioQuestion from '~/page-components/student/study/quiz/RadioQuestion';
import CheckboxQuestion from '~/page-components/student/study/quiz/CheckboxQuestion';
import GroupQuestion from '~/page-components/student/study/quiz/GroupQuestion';
import MapQuestion from '~/page-components/student/study/quiz/MapQuestion';
import TypeQuestion from '~/page-components/student/study/quiz/TypeQuestion';
import DropQuestion from '~/page-components/student/study/quiz/DropQuestion';
import CountDown from '~/page-components/student/study/quiz/CountDown';
import MultipleQuestion from '~/page-components/student/study/quiz/MultipleQuestion';
import ContentQuiz from '~/page-components/student/study/quiz/ContentQuiz';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

import './styles.modules.scss';

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
	preview: {
		marginBottom: '0',
		fontSize: '14px',
	},
}));

// const data = [];

const Quiz = ({ dataLesson }) => {
	const QuizDetail = dataLesson.DataQuiz.QuizDetail;
	const QuizContent = dataLesson.DataQuiz.QuizDetail[0].QuizContent;
	const QuizQuestion = dataLesson.DataQuiz.QuizDetail[0].QuizQuestion;

	const classes = useStyles();
	const [handleClick, setHandleclick] = useState(false);

	const [IsShowQuiz, setIsShowQuiz] = useState(false);
	const [addMinutes, setAddMinutes] = useState();
	const [showPopup, setShowPopup] = useState(false);
	const [showNote, setShowNote] = useState(false);

	const [open, setOpen] = React.useState(false);
	const [activeQuestion, setActiveQuestion] = useState({
		location: 0,
		index: 0,
		questionType: 1,
		questionStt: 1,
	});

	const [preview, setPreview] = React.useState(false);

	const handleChange = (event) => {
		setPreview(event.target.checked);
	};

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

	useEffect(() => {
		open &&
			setTimeout(() => {
				// --- Action with list answer --- //
				let itemAns = document.querySelectorAll('.list-answer .item');
				let btnPrevious = document.querySelector('.pagi-btn.previous');
				let btnNext = document.querySelector('.pagi-btn.next');

				function removeAllItems() {
					itemAns.forEach((item) => {
						item.classList.remove('activeDoing');
					});
				}

				function findActiveQuestion(value) {
					for (const [location, obj] of QuizDetail.entries()) {
						for (const [index, item] of obj.QuizQuestion.entries()) {
							for (const question of item.QuestionList) {
								if (question.Stt === value) {
									setActiveQuestion({
										index: index,
										questionType: item.questionType,
										questionStt: question.Stt,
									});
									break;
								}
							}
						}
					}
				}

				btnNext.addEventListener('click', () => {
					for (const [index, item] of itemAns.entries()) {
						if (item.classList.contains('activeDoing')) {
							if (index == itemAns.length - 1) {
								removeAllItems();
								itemAns[0].classList.add('activeDoing');
								break;
							} else {
								removeAllItems();
								itemAns[index + 1].classList.add('activeDoing');
								let value = parseInt(itemAns[index + 1].firstChild.innerText);
								findActiveQuestion(value);
								break;
							}
						}
					}
				});

				btnPrevious.addEventListener('click', () => {
					for (const [index, item] of itemAns.entries()) {
						console.log('ITEM: ', item);
						if (item.classList.contains('activeDoing')) {
							if (index == 0) {
								console.log('RUNNNN');
								removeAllItems();
								itemAns[itemAns.length - 1].classList.add('activeDoing');
								break;
							} else {
								removeAllItems();
								itemAns[index - 1].classList.add('activeDoing');
								let value = parseInt(itemAns[index - 1].firstChild.innerText);
								findActiveQuestion(value);
								break;
							}
						}
					}
				});

				itemAns.forEach((item) => {
					item.addEventListener('click', (e) => {
						let value = parseInt(e.target.innerText);

						findActiveQuestion(value);

						// setActiveQuestion(value - 1);
						removeAllItems();
						item.classList.add('activeDoing');
					});
				});
			}, 500);
	}, [open]);

	// ------------------------------------------------- //

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
				<Fade in={open}>
					<div className="modal-quiz">
						<div className="modal-quiz-header">
							<p className="modal-quiz-title">
								<b>Topic:</b> What is a CSS Sprite?
							</p>
							<button onClick={handleClose} className="btn-close">
								{' '}
								<FontAwesomeIcon icon="times" />
							</button>
						</div>

						<div className="quiz ">
							<div className="quiz-header">
								<div className="left">
									<p className="quiz-title">Bài trắc nghiệm</p>
									{/* <div className="quiz-info">
										<p className="quiz-info-minutes">
											Say something about this quiz
										</p>
									</div> */}
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
							<div className="quiz-inner">
								<div className="quiz-inner__container">
									{QuizDetail.map((detail, ind) => {})}
									<div className="quiz-col quiz-inner__content ">
										<ContentQuiz open={open} contentQuiz={QuizContent} />
									</div>
									<div className="quiz-col quiz-inner__question ">
										{QuizQuestion.map((question, index) => {
											if (index === activeQuestion.index) {
												switch (question.QuestionType) {
													case 1:
														return (
															<RadioQuestion
																key={question.QuestionType}
																dataQuestion={question}
																activeQuestion={activeQuestion.questionStt}
															/>
														);
														break;
													case 2:
														return (
															<GroupQuestion
																key={question.QuestionType}
																dataQuestion={question}
																activeQuestion={activeQuestion.questionStt}
															/>
														);
														break;
													case 3:
														return (
															<MultipleQuestion
																key={question.QuestionType}
																dataQuestion={question}
																activeQuestion={activeQuestion.questionStt}
															/>
														);
														break;
													default:
														<RadioQuestion />;
												}
											}
										})}

										{/* <GroupQuestion />
										<MapQuestion />
										<TypeQuestion />
										<DropQuestion />
										<MultipleQuestion /> */}
									</div>
								</div>
							</div>
						</div>
						<div className="modal-quiz-footer">
							<div className="row-pagination">
								<FormControlLabel
									className={`${classes.preview} preview`}
									control={
										<Checkbox
											checked={preview}
											onChange={handleChange}
											name="checkedA"
										/>
									}
									label="Preview"
								/>
								<span className="pagi-btn previous">
									<ChevronLeftIcon />
								</span>
								<ul className="list-answer">
									<li className="item activeDoing" value="0">
										<span>1</span>
									</li>
									<li className="item" value="1">
										<span>2</span>
									</li>
									<li className="item" value="2">
										<span>3</span>
									</li>
									<li className="item" value="3">
										<span>4</span>
									</li>
								</ul>
								<span className="pagi-btn next">
									<ChevronRightIcon />
								</span>
							</div>
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
						<div className="popover-an popover-style">
							<div className="popover-style__button">
								<button className="btn-highlight">Highlight</button>
								<button className="btn-note">Note</button>
							</div>
						</div>

						<div className="popover-style popover-hover">
							<div className="popover-style__button">
								<button className="btn-note">Note</button>
								<button className="btn-remove">Remove</button>
								<button className="btn-remove-all">Remove All</button>
							</div>
						</div>

						<div className="wrap-popup-note">
							<div className="popup-note">
								<div className="popup-note-header">
									<span className="close-popup">
										<FontAwesomeIcon icon="times" />
									</span>
								</div>
								<div className="popup-note-content">
									<textarea id="getNote"></textarea>
								</div>
							</div>
						</div>
					</div>
				</Fade>
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
