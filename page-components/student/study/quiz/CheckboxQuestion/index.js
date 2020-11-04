import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { makeStyles, useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	answer: {
		marginBottom: '0px',
	},
	groupAnswer: {
		flexDirection: 'column',
	},
}));

const CheckboxQuestion = () => {
	const [value, setValue] = React.useState('female');

	const handleChange = (event) => {
		setValue(event.target.value);
	};

	const classes = useStyles();

	return (
		<div className="quiz-section">
			<p className="quiz-section-title">
				Câu 1: Checkbox can be provided with a label thanks to the
				FormControlLabel component.
			</p>
			<FormControl component="fieldset">
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
					/>
					<FormControlLabel
						value="Answer 2"
						control={<Radio />}
						label="Answer 2"
						className={classes.answer}
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

export default CheckboxQuestion;
