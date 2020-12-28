import React, { useState, useEffect, useLayoutEffect } from 'react';
import './styleSelect3.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Selection = () => {
	useEffect(() => {
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

			if (nodeNameStart === 'P' && nodeNameEnd === 'P') {
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
	});

	return (
		<div>
			<div className="highlight" id="cc">
				<p className="highlight-content">
					Lorem Ipsum is simply dummy text of the printing and typesetting
					industry. Lorem Ipsum has been the industry's standard dummy text ever
					since the 1500s, when an unknown printer took a galley of type and
					scrambled it to make a type specimen book. It has survived not only
					five centuries, but also the leap into electronic typesetting,
					remaining essentially unchanged. It was popularised in the 1960s with
					the release of Letraset sheets containing Lorem Ipsum passages, and
					more recently with desktop publishing software like Aldus PageMaker
					including versions of Lorem Ipsum.
				</p>
				<p className="highlight-content">
					It is a long established fact that a reader will be distracted by the
					readable content of a page when looking at its layout. The point of
					using Lorem Ipsum is that it has a more-or-less normal distribution of
					letters, as opposed to using 'Content here, content here', making it
					look like readable English. Many desktop publishing packages and web
					page editors now use Lorem Ipsum as their default model text, and a
					search for 'lorem ipsum' will uncover many web sites still in their
					infancy. Various versions have evolved over the years, sometimes by
					accident, sometimes on purpose (injected humour and the like).
				</p>
				<p className="highlight-content">
					"Sed ut perspiciatis unde omnis iste natus error sit voluptatem
					accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae
					ab illo inventore veritatis et quasi architecto beatae vitae dicta
					sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
					aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos
					qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui
					dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed
					quia non numquam eius modi tempora incidunt ut labore et dolore magnam
					aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum
					exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex
					ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in
					ea voluptate velit esse quam nihil molestiae consequatur, vel illum
					qui dolorem eum fugiat quo voluptas nulla pariatur?"
				</p>
				<p className="highlight-content">
					"Sed ut perspiciatis unde omnis iste natus error sit voluptatem
					accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae
					ab illo inventore veritatis et quasi architecto beatae vitae dicta
					sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
					aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos
					qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui
					dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed
					quia non numquam eius modi tempora incidunt ut labore et dolore magnam
					aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum
					exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex
					ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in
					ea voluptate velit esse quam nihil molestiae consequatur, vel illum
					qui dolorem eum fugiat quo voluptas nulla pariatur?"
				</p>
				<p className="highlight-content">
					"Sed ut perspiciatis unde omnis iste natus error sit voluptatem
					accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae
					ab illo inventore veritatis et quasi architecto beatae vitae dicta
					sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
					aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos
					qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui
					dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed
					quia non numquam eius modi tempora incidunt ut labore et dolore magnam
					aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum
					exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex
					ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in
					ea voluptate velit esse quam nihil molestiae consequatur, vel illum
					qui dolorem eum fugiat quo voluptas nulla pariatur?"
				</p>
				<p className="highlight-content">
					"Sed ut perspiciatis unde omnis iste natus error sit voluptatem
					accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae
					ab illo inventore veritatis et quasi architecto beatae vitae dicta
					sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
					aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos
					qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui
					dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed
					quia non numquam eius modi tempora incidunt ut labore et dolore magnam
					aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum
					exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex
					ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in
					ea voluptate velit esse quam nihil molestiae consequatur, vel illum
					qui dolorem eum fugiat quo voluptas nulla pariatur?"
				</p>
				<p className="highlight-content">
					"Sed ut perspiciatis unde omnis iste natus error sit voluptatem
					accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae
					ab illo inventore veritatis et quasi architecto beatae vitae dicta
					sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
					aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos
					qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui
					dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed
					quia non numquam eius modi tempora incidunt ut labore et dolore magnam
					aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum
					exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex
					ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in
					ea voluptate velit esse quam nihil molestiae consequatur, vel illum
					qui dolorem eum fugiat quo voluptas nulla pariatur?"
				</p>
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
	);
};

export default Selection;
