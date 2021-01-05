import React, { useEffect, useLayoutEffect, useState } from 'react';
import './styles.module.scss';
let s = 17;

const TypeQuestion = () => {
	const [size, setSize] = useState(s);

	const handleChagne = (evt) => {
		console.log('this:', evt);
		if (evt.target.value.length >= s) {
			s += 2;
			// setSize(s);
			evt.target.size = s;
			console.log('s = ', s);
		}
		if (evt.target.value.length < 1) {
			// setSize(17);
			evt.target.size = 17;
			s = 17;
		}
	};

	useEffect(() => {
		let el = document.querySelectorAll('.quiz-input');

		el.forEach((item) => {
			item.addEventListener('keydown', (event) => {
				let lengthText = event.target.innerText.length;
				if (lengthText > 14) {
					item.classList.add('auto');
				} else {
					item.classList.remove('auto');
				}
			});
		});
	});

	return (
		<div className="quiz-section">
			<p className="quiz-section-title">Questions 1 – 5</p>
			<div className="quiz-section-content">
				<p>
					Complete the summary. Write NO MORE THAN TWO WORDS from the text in
					each gap. Consumers often complain that they experience a feeling of{' '}
					{/* <input className="quiz-input" onChange={handleChagne}></input> */}
					<div
						className="quiz-input"
						role="textbox"
						contenteditable="true"
						aria-labelledby="txtboxLabel"
						aria-multiline="true"
					></div>
				</p>
				<p>
					Lorem Ipsum is simply dummy text of the printing and typesetting
					industry. Lorem Ipsum has been the industry's standard dummy text ever
					since the 1500s,{' '}
					<div
						className="quiz-input"
						role="textbox"
						contenteditable="true"
						aria-labelledby="txtboxLabel"
						aria-multiline="true"
					></div>{' '}
					when an unknown printer took a galley of type and scrambled it to make
					a type specimen book. It has survived not only five centuries, but
					also the leap into electronic typesetting, remaining essentially
					unchanged.
				</p>
				<p>
					It is a long established fact that a reader will be
					<div
						className="quiz-input"
						role="textbox"
						contenteditable="true"
						aria-labelledby="txtboxLabel"
						aria-multiline="true"
					></div>
					distracted by the readable content of a page when looking at its
					layout.{' '}
				</p>
			</div>
		</div>
	);
};

export default TypeQuestion;
