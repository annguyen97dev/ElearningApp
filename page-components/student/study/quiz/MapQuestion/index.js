import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Radio from '@material-ui/core/Radio';
import { withStyles } from '@material-ui/core/styles';

import './styles.module.scss';

const useStyles = makeStyles({
	table: {
		minWidth: 650,
	},
	colHeader: {
		paddingRight: '32px',
	},
	wrapTable: {
		width: '45%',
		'@media (max-width: 1600px)': {
			width: '65%',
		},
	},
	styleCol: {
		padding: '7px 16px',
		fontSize: '16px',
	},
});

function createData(name, calories, fat, carbs, protein) {
	return { name, calories, fat, carbs, protein };
}

const MapQuestion = () => {
	const classes = useStyles();
	const [selectedValue, setSelectedValue] = React.useState('a');

	const handleChange = (event) => {
		setSelectedValue(event.target.value);
	};
	return (
		<div className="quiz-section">
			<p className="quiz-section-title">
				Câu 1 - 2: Checkbox can be provided with a label thanks to the
				FormControlLabel component.
			</p>
			<div className="quiz-section-content">
				<img
					className="map-question-img"
					src={`/static/assets/img/map.jpg`}
					alt="map-question-img"
				></img>
				<TableContainer component={Paper} className={classes.wrapTable}>
					<Table className={classes.table} aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell></TableCell>
								<TableCell
									align="right"
									className={classes.styleCol}
									className={classes.colHeader}
								>
									A
								</TableCell>
								<TableCell
									align="right"
									className={classes.styleCol}
									className={classes.colHeader}
								>
									B
								</TableCell>
								<TableCell
									align="right"
									className={classes.styleCol}
									className={classes.colHeader}
								>
									C
								</TableCell>
								<TableCell
									align="right"
									className={classes.styleCol}
									className={classes.colHeader}
								>
									D
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{/* {rows.map((row) => (
								<TableRow key={row.name}>
									<TableCell component="th" scope="row">
										{row.name}
									</TableCell>
									<TableCell align="right" className={classes.styleCol}>{row.calories}</TableCell>
									<TableCell align="right" className={classes.styleCol}>{row.fat}</TableCell>
									<TableCell align="right" className={classes.styleCol}>{row.carbs}</TableCell>
									<TableCell align="right" className={classes.styleCol}>{row.protein}</TableCell>
								</TableRow>
							))} */}
							<TableRow>
								<TableCell>
									<b>1/</b>Question
								</TableCell>
								<TableCell align="right" className={classes.styleCol}>
									<Radio
										checked={selectedValue === 'a'}
										onChange={handleChange}
										value="a"
										name="radio-button-demo"
										inputProps={{ 'aria-label': 'A' }}
									/>
								</TableCell>
								<TableCell align="right" className={classes.styleCol}>
									<Radio
										checked={selectedValue === 'b'}
										onChange={handleChange}
										value="b"
										name="radio-button-demo"
										inputProps={{ 'aria-label': 'B' }}
									/>
								</TableCell>
								<TableCell align="right" className={classes.styleCol}>
									<Radio
										checked={selectedValue === 'c'}
										onChange={handleChange}
										value="c"
										name="radio-button-demo"
										inputProps={{ 'aria-label': 'C' }}
									/>
								</TableCell>
								<TableCell align="right" className={classes.styleCol}>
									<Radio
										checked={selectedValue === 'd'}
										onChange={handleChange}
										value="d"
										name="radio-button-demo"
										inputProps={{ 'aria-label': 'D' }}
									/>
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>
									<b>2/</b>Question
								</TableCell>
								<TableCell align="right" className={classes.styleCol}>
									<Radio
										checked={selectedValue === 'a'}
										onChange={handleChange}
										value="a"
										name="radio-button-demo"
										inputProps={{ 'aria-label': 'A' }}
									/>
								</TableCell>
								<TableCell align="right" className={classes.styleCol}>
									<Radio
										checked={selectedValue === 'b'}
										onChange={handleChange}
										value="b"
										name="radio-button-demo"
										inputProps={{ 'aria-label': 'B' }}
									/>
								</TableCell>
								<TableCell align="right" className={classes.styleCol}>
									<Radio
										checked={selectedValue === 'c'}
										onChange={handleChange}
										value="c"
										name="radio-button-demo"
										inputProps={{ 'aria-label': 'C' }}
									/>
								</TableCell>
								<TableCell align="right" className={classes.styleCol}>
									<Radio
										checked={selectedValue === 'd'}
										onChange={handleChange}
										value="d"
										name="radio-button-demo"
										inputProps={{ 'aria-label': 'D' }}
									/>
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>
									<b>3/</b>Question
								</TableCell>
								<TableCell align="right" className={classes.styleCol}>
									<Radio
										checked={selectedValue === 'a'}
										onChange={handleChange}
										value="a"
										name="radio-button-demo"
										inputProps={{ 'aria-label': 'A' }}
									/>
								</TableCell>
								<TableCell align="right" className={classes.styleCol}>
									<Radio
										checked={selectedValue === 'b'}
										onChange={handleChange}
										value="b"
										name="radio-button-demo"
										inputProps={{ 'aria-label': 'B' }}
									/>
								</TableCell>
								<TableCell align="right" className={classes.styleCol}>
									<Radio
										checked={selectedValue === 'c'}
										onChange={handleChange}
										value="c"
										name="radio-button-demo"
										inputProps={{ 'aria-label': 'C' }}
									/>
								</TableCell>
								<TableCell align="right" className={classes.styleCol}>
									<Radio
										checked={selectedValue === 'd'}
										onChange={handleChange}
										value="d"
										name="radio-button-demo"
										inputProps={{ 'aria-label': 'D' }}
									/>
								</TableCell>
							</TableRow>
						</TableBody>
					</Table>
				</TableContainer>
			</div>
		</div>
	);
};

export default MapQuestion;
