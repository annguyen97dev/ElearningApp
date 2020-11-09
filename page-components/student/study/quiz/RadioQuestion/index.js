import React, { useState } from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';

import './styles.module.scss';

const useStyles = makeStyles((theme) => ({
	answer: {
		marginBottom: '0px',
	},
	groupAnswer: {
		flexDirection: 'column',
	},
	fixError: {
		padding: '0px 16px',
	},
	btnShow: {
		marginLeft: '5px',
	},
}));

const RadioQuestion = () => {
	const [value, setValue] = React.useState('female');

	const handleChange = (event) => {
		setValue(event.target.value);
	};

	const classes = useStyles();

	// const [color, setColor] = useState({
	// 	right: 'green',
	// 	false: 'red',
	// });

	const [show, setShow] = useState(false);

	const showResult = () => {
		setShow(true);
	};

	return (
		<div className="quiz-section">
			<p className="quiz-section-title">
				Câu 1: Checkbox can be provided with a label thanks to the
				FormControlLabel component.
			</p>
			<FormControl component="fieldset">
				<div className="notification">
					<Alert severity="error" className={classes.fixError}>
						Đáp án sai! Mời bạn chọn lại
					</Alert>
					<Button
						variant="outlined"
						className={classes.btnShow}
						color="secondary"
						onClick={showResult}
					>
						Hiện kết quả
					</Button>
				</div>
				<RadioGroup
					aria-label="gender"
					name="gender1"
					value={value}
					onChange={handleChange}
				>
					<FormControlLabel
						value="Answer 1"
						control={<Radio />}
						label="Answer 1"
						className={classes.answer}
						style={show ? { color: 'red' } : {}}
					/>
					<FormControlLabel
						value="Answer 2"
						control={<Radio />}
						label="Answer 2"
						className={classes.answer}
						style={show ? { color: 'green' } : {}}
					/>
					<FormControlLabel
						value="Answer 3"
						control={<Radio />}
						label="Answer 3"
						className={classes.answer}
					/>
					<FormControlLabel
						value="Answer 4"
						control={<Radio />}
						label="Answer 4"
						className={classes.answer}
						s
					/>
				</RadioGroup>
			</FormControl>
		</div>
	);
};

export default RadioQuestion;
