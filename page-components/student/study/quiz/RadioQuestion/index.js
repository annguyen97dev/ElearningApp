import React, { useState } from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';

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
	numberQuestion: {
		marginRight: '10px',
	},
	accordionBox: {
		marginBottom: ' 10px',
	},
	accordionHeader: {
		background: '#00000012',
	},
}));

let savaActiveQuestion = 0;
const RadioQuestion = ({ dataQuestion, activeQuestion }) => {
	console.log('Active Question: ', activeQuestion);
	const QuestionList = dataQuestion.QuestionList;
	const [value, setValue] = React.useState();
	const [expanded, setExpanded] = React.useState(activeQuestion);

	if (activeQuestion !== savaActiveQuestion) {
		savaActiveQuestion = activeQuestion;
		setExpanded(activeQuestion);
	}

	const handleChange = (event) => {
		setValue(event.target.value);
	};

	const handleChange_Accordion = (panel) => (event, newExpanded) => {
		setExpanded(newExpanded ? panel : false);
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
				Questions{' '}
				{QuestionList[0].Stt === QuestionList[QuestionList.length - 1].Stt
					? QuestionList[0].Stt
					: `${QuestionList[0].Stt} - ${
							QuestionList[QuestionList.length - 1].Stt
					  }`}
			</p>
			<p className="quiz-section-title-sub">
				{dataQuestion.QuestionTypeDetail}
			</p>
			{dataQuestion.QuestionList.map((question, index) => {
				return (
					<Accordion
						key={question.QuestionID}
						expanded={expanded === question.Stt}
						onChange={handleChange_Accordion(question.Stt)}
						className={classes.accordionBox}
					>
						<AccordionSummary
							expandIcon={<ExpandMoreIcon />}
							aria-controls="panel1a-content"
							id="panel1a-header"
							className={classes.accordionHeader}
						>
							<Typography className={classes.heading}>
								<b className={classes.numberQuestion}>{question.Stt}/</b>
								{question.QuestionText}
							</Typography>
						</AccordionSummary>
						<AccordionDetails>
							<FormControl component="fieldset">
								<RadioGroup
									aria-label="gender"
									name="gender1"
									value={value}
									onChange={handleChange}
								>
									{question.QuestionAnswer.map((ans) => (
										<FormControlLabel
											ket={ans.AnswerID}
											value={ans.AnswerID}
											control={<Radio />}
											label={ans.AnswerText}
											className={classes.answer}
										/>
									))}
								</RadioGroup>
							</FormControl>
						</AccordionDetails>
					</Accordion>
				);
			})}
		</div>
	);
};

export default RadioQuestion;
