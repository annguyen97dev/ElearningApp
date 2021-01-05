import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	answer: {
		marginBottom: '0px',
	},
	groupAnswer: {
		flexDirection: 'column',
	},
}));

let savaActiveQuestion = 0;
const GroupQuestion = ({ dataQuestion, activeQuestion }) => {
	const QuestionList = dataQuestion.QuestionList;
	const classes = useStyles();
	const [expanded, setExpanded] = React.useState(activeQuestion);

	if (activeQuestion !== savaActiveQuestion) {
		savaActiveQuestion = activeQuestion;
		setExpanded(activeQuestion);
	}

	const handleChange_Accordion = (panel) => (event, newExpanded) => {
		setExpanded(newExpanded ? panel : false);
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
							className="heading-accordion"
						>
							<Typography>
								<b className="number-question">{question.Stt}/</b>
								{question.QuestionText}
							</Typography>
						</AccordionSummary>
						<AccordionDetails>
							<FormControl component="fieldset">
								<FormGroup
									aria-label="position"
									className={classes.groupAnswer}
								>
									{question.QuestionAnswer.map((ans) => (
										<FormControlLabel
											key={ans.AnswerID}
											value={ans.AnswerID}
											control={<Checkbox />}
											label={ans.AnswerText}
											className={classes.answer}
										/>
									))}
								</FormGroup>
							</FormControl>
						</AccordionDetails>
					</Accordion>
				);
			})}
		</div>
	);
};

export default GroupQuestion;
