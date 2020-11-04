import React from 'react';
import './styles.modules.scss';
import RadioQuestion from '~/page-components/student/study/quiz/RadioQuestion';
import CheckboxQuestion from '~/page-components/student/study/quiz/CheckboxQuestion';
import Button from '@material-ui/core/Button';
import { makeStyles, useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	styleButton: {
		marginRight: '10px',
	},
}));

const Quiz = () => {
	const classes = useStyles();

	return (
		<div className="quiz">
			<div className="quiz-header">
				<p className="quiz-title">Bài trắc nghiệm</p>
				<div className="quiz-info">
					<p className="quiz-info-minutes">Say something about this quiz</p>
				</div>
			</div>
			<RadioQuestion />
			<CheckboxQuestion />
			<RadioQuestion />
			<CheckboxQuestion />
			<RadioQuestion />
			<CheckboxQuestion />
			<RadioQuestion />
			<CheckboxQuestion />
			<div className="row-button">
				<Button
					variant="contained"
					color="secondary"
					className={classes.styleButton}
				>
					Nộp bài
				</Button>
				<Button variant="contained">Hủy bỏ</Button>
			</div>
		</div>
	);
};

export default Quiz;
