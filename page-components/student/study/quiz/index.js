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
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
}));

// const data = [];

const Quiz = () => {
	const classes = useStyles();
	const [handleClick, setHandleclick] = useState(false);

	const [IsShowQuiz, setIsShowQuiz] = useState(false);
	const [addMinutes, setAddMinutes] = useState();
	const [showPopup, setShowPopup] = useState(false);
	const [showNote, setShowNote] = useState(false);

	const [open, setOpen] = React.useState(false);

	useEffect(() => {
		if (open) {
			setTimeout(() => {
				var data = [];
				var dataNote = [];
				var saveID = null;

				function addToOldArray(id, range, note) {
					data.push({
						id: id,
						range: range,
						note: note,
					});
				}

				function addToArray(id, range, note, position) {
					dataNote.push({
						id: id,
						range: range,
						note: note,
						position: position,
					});
				}

				function removeInArray(id) {
					dataNote.forEach((item, index, arr) => {
						if (item.id === id) {
							arr.splice(index, 1);
						}
					});
				}

				function checkArray(id) {
					var check = false;
					dataNote.forEach((obj) => {
						if (obj.id === id) {
							check = true;
						}
					});
					return check;
				}

				function getRangeInArray(id) {
					let range = null;
					data.forEach((obj) => {
						if (obj.id === id) {
							range = obj.range;
						}
					});
					return range;
				}

				function getSelection() {
					let sel = window.getSelection();
					return sel;
				}

				function checkRange(range) {
					let nodeNameStart = range.startContainer.parentNode.nodeName;
					let nodeNameEnd = range.endContainer.parentNode.nodeName;

					if (nodeNameStart != 'SPAN' && nodeNameEnd != 'SPAN') {
						return true;
					} else {
						return false;
					}
				}

				function arrayPosition(p) {
					let position = [];
					position.push({
						top: p.top,
						bottom: p.bottom,
						left: p.left,
						right: p.right,
						width: p.width,
					});
					return position;
				}

				//CLICK OUTSIDE TO HIDE POPOVER
				// $(document).click(function (e) {
				// 	if (
				// 		!(
				// 			e.target.className === 'highlight' ||
				// 			e.target.className === 'highlight-content'
				// 		)
				// 	) {
				// 		$('.popover-an').hide();
				// 	}
				// });

				// ----------- MOUSEUP ----------- //
				$('.highlight').mouseup(function () {
					// CREATE ID
					let number = Math.floor(Math.random() * 1000 + 1);
					let id = 'id-' + number;

					// GET RANGE
					let sel = getSelection();
					let range = sel.getRangeAt(0);
					console.log('RANGE: ', range);

					if (range.toString().length > 0) {
						// GET POSITION
						let p = range.getBoundingClientRect();
						let position = arrayPosition(p);

						// PUSH TO DATA
						data.push({
							id: id,
							range: range,
							note: '',
							position: position,
						});

						// SHOW POPOVER

						let specialTop = p.top - 40;
						let specialLeft = p.left + p.width - 40;
						specialTop = specialTop.toString() + 'px';
						specialLeft = specialLeft.toString() + 'px';

						$('.popover-an')
							.css({
								top: specialTop,
								// right: position[0].right,
								left: position[0].left,
								// bottom: position[0].bottom,
								display: 'block',
							})
							.attr('data-id', id);

						$('.wrap-popup-note').attr('data-id', id);
						saveID = id;
					} else {
						$('.popover-an').hide();
					}
				});

				function checkAllCondition(dataId, range) {
					//Get id and element
					let beforeElementId = range.startContainer.parentElement.id;
					let beforeElement = range.startContainer.parentNode;

					let afterElementId = range.endContainer.parentElement.id;
					let afterElement = range.endContainer.parentNode;

					let getRangeFromParent = null;

					let nodeNameStart = range.startContainer.parentNode.nodeName;
					let nodeNameEnd = range.endContainer.parentNode.nodeName;

					// Check the element is overlay or not? (Check coi có đang bị chồng hay không?)

					if (nodeNameStart != 'SPAN' && nodeNameEnd != 'SPAN') {
						if (
							range.startContainer.nextSibling != null &&
							range.endContainer.previousSibling != null
						) {
							if (
								range.startContainer.nextSibling.nodeName === 'SPAN' &&
								range.endContainer.previousSibling.nodeName === 'SPAN'
							) {
								var between_span = range.startContainer.nextSibling;
								var between_span1 = range.startContainer.nextSibling.nodeName;
								var between_span2 = range.endContainer.previousSibling.nodeName;
							}
						}

						let span = document.createElement('span');
						span.setAttribute('id', dataId);
						span.classList.add('highlight-text');
						range.surroundContents(span);
						let p = range.getBoundingClientRect();
						let position = arrayPosition(p);

						// Check
						if (between_span1 === 'SPAN' && between_span2 === 'SPAN') {
							let id_span = between_span.id;
							between_span.outerHTML = between_span.innerHTML;
							removeInArray(id_span);
						}
						$('.popover-an').hide();

						addToArray(dataId, range, '', position);
						saveID = dataId;
					} else {
						// Create, id, span tag
						let number = Math.floor(Math.random() * 1000 + 1);
						let id = 'id-' + number;
						let span = document.createElement('span');
						saveID = id;
						//  ===> add id & class for span
						span.setAttribute('id', id);
						span.classList.add('highlight-text');

						if (nodeNameStart === 'SPAN' && nodeNameEnd === 'SPAN') {
							// Set positon for new range
							let newRange = document.createRange();
							newRange.setStartBefore(beforeElement);

							newRange.setEndAfter(afterElement);
							newRange.surroundContents(span);
							let p = newRange.getBoundingClientRect();
							let position = arrayPosition(p);

							// Add to new array and old array  //
							addToArray(id, newRange, '', position);
							addToOldArray(id, newRange, '', position);

							beforeElement.outerHTML = beforeElement.innerHTML;
							afterElement.outerHTML = afterElement.innerHTML;
							removeInArray(beforeElementId);
							removeInArray(afterElementId);
						}
						if (nodeNameStart === 'SPAN' && nodeNameEnd === 'P') {
							// Set positon for new range
							let newRange = document.createRange();
							newRange.setStartBefore(beforeElement);

							newRange.setEnd(range.endContainer, range.endOffset);
							newRange.surroundContents(span);
							let p = newRange.getBoundingClientRect();
							let position = arrayPosition(p);

							// Add to new array and old array  //
							addToArray(id, newRange, '', position);
							addToOldArray(id, newRange, '', position);

							beforeElement.outerHTML = beforeElement.innerHTML;
							removeInArray(beforeElementId);
						}
						if (nodeNameEnd === 'SPAN' && nodeNameStart === 'P') {
							// Set positon for new range
							let newRange = document.createRange();
							newRange.setStart(range.startContainer, range.startOffset);

							newRange.setEndAfter(afterElement);
							newRange.surroundContents(span);
							let p = newRange.getBoundingClientRect();
							let position = arrayPosition(p);

							// Add to new array and old array  //
							addToArray(id, newRange, '', position);
							addToOldArray(id, newRange, '', position);

							afterElement.outerHTML = afterElement.innerHTML;
							removeInArray(afterElementId);
						}
					}
				}

				// ------------ CLICK HIGHLIGHT -------------
				$('.popover-an .btn-highlight').on('click', function () {
					let dataId = $('.wrap-popup-note').attr('data-id');
					let range = null;
					data.forEach((obj) => {
						if (obj.id === dataId) {
							range = obj.range;
						}
					});

					checkAllCondition(dataId, range);

					$('.popover-an').hide();
					console.log('data sau khi bấm highlight: ', dataNote);
				});

				// --------------- CLICK to OPEN and CLOSE TO SAVE NOTE -----------------
				$('.btn-note').on('click', function () {
					let id = $('.wrap-popup-note').attr('data-id');
					let getId = saveID;
					console.log('save id lúc mở note: ', getId);
					// ----- //
					let range = getRangeInArray(id);
					let note = '';

					if (!checkArray(id)) {
						// let span = document.createElement('span');
						// span.setAttribute('id', id);
						// span.classList.add('highlight-text');
						// range.surroundContents(span);
						checkAllCondition(id, range);
						getId = saveID;
						$('#getNote').val('');
					} else {
						dataNote.forEach((obj) => {
							if (obj.id === getId) {
								note = obj.note;
							}
						});
						$('#getNote').val(note);
					}
					// ----- //
					$('.wrap-popup-note').attr('data-id', getId);
					$('.wrap-popup-note').show();
					$('.popover-an').hide();
				});

				//  --- Close ---
				$('.wrap-popup-note .close-popup').on('click', function () {
					let note = $('#getNote').val();
					// let id = $('.wrap-popup-note').attr('data-id');
					let id = $('.wrap-popup-note').attr('data-id');
					console.log('save id lúc đóng note: ', id);
					let range = getRangeInArray(id);

					// Check id exit in array before or not ?
					if (checkArray(id)) {
						dataNote.forEach((obj) => {
							if (obj.id === id) {
								obj.note = note;
							}
						});
					}

					$('.wrap-popup-note').hide();
					console.log('data sau khi save: ', dataNote);
				});

				//Typing and save
				$('#getNote').on('change paste keyup', function () {
					let getId = $('.wrap-popup-note').attr('data-id');

					let text = $(this).val();
					if (getId) {
						dataNote.forEach((obj) => {
							if (obj.id === getId) {
								obj.note = text;
							}
						});
					}
				});

				// CLICK TO WATCH NOTE
				// $('.highlight').on('click', function (e) {
				// 	let id = e.target.id;
				// 	let note = null;

				// 	if (checkArray(id)) {
				// 		$('.wrap-popup-note').show();
				// 		$('.wrap-popup-note').attr('data-id', id);
				// 		$('#getNote').html(note);
				// 		dataNote.forEach((obj) => {
				// 			if (obj.id === id) {
				// 				note = obj.note;
				// 			}
				// 		});
				// 		$('#getNote').val(note);
				// 	}
				// });

				//  --------- ACTION HOVER POPOVER ------------ //
				$('.highlight').on('mouseover', function (e) {
					let id = e.target.id;
					let position = [];
					let note = null;

					if (checkArray(id)) {
						saveID = id;
						console.log('save id lúc hover: ', id);
						// get position to show popover
						dataNote.forEach((obj) => {
							if (obj.id === id) {
								position = position.concat(obj.position);
								note = obj.note;
							}
						});
						let specialTop = position[0].top - 35;
						specialTop = specialTop.toString() + 'px';

						$('.popover-hover')
							.css({
								top: specialTop,
								// right: position[0].right,
								left: position[0].left,
								// bottom: position[0].bottom,
								display: 'block',
							})
							.attr('data-id', id);
					} else {
						$('.popover-hover').css('display', 'none');
					}
				});

				// --------- CLICK TO *REMOVE* NOTE AND HIGHLIGHT ---------- //
				$('.btn-remove').on('click', function () {
					let id = $('.popover-hover').attr('data-id');

					dataNote.forEach((obj, index, arr) => {
						if (obj.id === id) {
							arr.splice(index, 1);
						}
					});

					document.getElementById(id).outerHTML = document.getElementById(
						id,
					).innerHTML;
				});

				// --------- CLICK TO *REMOVE ALL* -------------//
				$('.btn-remove-all').on('click', function () {
					dataNote = [];

					let allSpan = document.querySelectorAll('.highlight-text');
					allSpan.forEach((item) => {
						item.outerHTML = item.innerHTML;
					});
				});

				// Calculator Top of Highligh text when scroll
				var savePageY = 0;

				$('.highlight').scroll(function () {
					let pageY = $(this).scrollTop();

					dataNote.forEach((obj) => {
						obj.position[0].top = obj.position[0].top + savePageY - pageY;
					});
					savePageY = pageY;
				});
			}, 1000);
		}
	}, [open]);

	// ------------------------------------------------- //

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

						<div className="quiz highlight">
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
							<TypeQuestion />
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
						<div className="modal-quiz-footer"></div>
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
