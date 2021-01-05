import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Tabs from '~/page-components/student/study/tabs/tabs';
// import Quiz from '~/page-components/student/study/quiz';
import ReactPlayer from 'react-player';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import AnnotationComments from '@contently/videojs-annotation-comments';
import VideoStudy from '../video';
import ReactHtmlParser from 'react-html-parser';

import './styles.module.scss';

const Quiz = dynamic(() => import('~/page-components/student/study/quiz'), {
	loading: () => <p>...</p>,
	ssr: false,
});

// const videoJsOptions = {
// 	autoplay: true,
// 	controls: true,
// 	sources: [
// 		{
// 			src: '/static/video/video.mp4',
// 			type: 'video/mp4',
// 		},
// 	],
// };
const fakeLesson = [
	{
		LessonID: 11,
		LessonType: 1,
		NameType: 'Bài học | Bài thi',
		DataStudy: {
			Content:
				'<h4 class="title">What is a CSS Sprite</h4><p> We need to know about an image sprite before we start talking about CSS sprites. An image sprite is a compilation of different image assets that we want to use on our web application.</p><p>These images could fit in any of the below given cases…</p><ul><li>Icon assets like social media, fancy bullets etc.</li><li>Different states for a button roll-over</li><li>A fixed background eg. a logo</li></ul> ',
			IsDone: false,
			Point: 10,
			LessonName: 'This is title of lesson',
		},
		DataQuiz: {
			QuizID: 1122,
			QuizType: 1,
			QuizTitle: '<p>Did you ... the film last night.</p>',
			QuizDetail: [
				{
					QuizContent:
						"<h4>This is the exercise that you have to pass in this course</h4><p> Here you can find activities to practise your reading skills. Reading will help you to improve your understanding of the language and build your vocabulary. The self-study lessons in this section are written and organised according to the levels of the Common European Framework of Reference for languages (CEFR). <br></br> There are different types of texts and interactive exercises that practise the reading skills you need to do well in your studies, to get ahead at work and to communicate in English in your free time. Take our free online English test to find out which level to choose. Select your level, from beginner (CEFR level A1) to advanced (CEFR level C1), and improve your reading skills at your own speed, whenever it's convenient for you.</p>",
					QuizQuestion: [
						{
							QuestionType: 1,
							QuestionTypeDetail:
								'Choose TRUE if the statement agrees with the information given in the text, choose FALSE if the statement contradicts the information, or choose NOT GIVEN if there is no information on this.',
							QuestionList: [
								{
									Stt: 1,
									QuestionID: 1,
									QuestionText:
										'Marie Curie’s husband was a joint winner of both Marie’s Nobel Prizes.',
									QuestionAnswer: [
										{
											AnswerID: '1',
											AnswerText: 'TRUE',
										},
										{
											AnswerID: '2',
											AnswerText: 'FALSE',
										},
										{
											AnswerID: '3',
											AnswerText: 'NOT GIVEN',
										},
									],
								},
								{
									Stt: 2,
									QuestionID: 2,
									QuestionText:
										'Marie became interested in science when she was a child.',
									QuestionAnswer: [
										{
											AnswerID: '4',
											AnswerText: 'TRUE',
										},
										{
											AnswerID: '5',
											AnswerText: 'FALSE',
										},
										{
											AnswerID: '6',
											AnswerText: 'NOT GIVEN',
										},
									],
								},
							],
						},
						{
							QuestionType: 2,
							QuestionTypeDetail: 'Choose TWO correct answers.',
							QuestionList: [
								{
									Stt: 3,
									QuestionID: 3,
									QuestionText:
										'The list below gives some of the advantages of employing older worker' +
										'Which TWO advantages are mentioned by the writer of the text?',
									QuestionAnswer: [
										{
											AnswerID: '7',
											AnswerText:
												'They are less likely to be involved in careless accidents.',
										},
										{
											AnswerID: '8',
											AnswerText: 'They are able to train younger workers.',
										},
										{
											AnswerID: '9',
											AnswerText: 'They can deal with unexpected problems.',
										},
										{
											AnswerID: '10',
											AnswerText: 'They are more conscientious.',
										},
									],
								},
								{
									Stt: 4,
									QuestionID: 4,
									QuestionText:
										'The list below gives some of the advantages of employing older worker',
									QuestionAnswer: [
										{
											AnswerID: '11',
											AnswerText: 'They demand higher salaries.',
										},
										{
											AnswerID: '12',
											AnswerText:
												'They are not as well educated as older workers.',
										},
										{
											AnswerID: '13',
											AnswerText:
												'They do not stay with the same company for very long.',
										},
										{
											AnswerID: '14',
											AnswerText: 'They may injure themselves.',
										},
									],
								},
							],
						},
						{
							QuestionType: 3,
							QuestionTypeDetail: 'Câu hỏi ghép',
							QuestionList: [
								{
									Stt: 5,
									QuestionID: 5,
									QuestionText:
										'The list below gives some of the advantages of employing older worker',
									QuestionAnswer: [
										{
											AnswerID: '15',
											AnswerText: 'TRUE',
										},
										{
											AnswerID: '16',
											AnswerText: 'FALSE',
										},
										{
											AnswerID: '17',
											AnswerText: 'NOT GIVEN',
										},
									],
								},
								{
									Stt: 6,
									QuestionID: 6,
									QuestionText:
										'Marie became interested in science when she was a child.',
									QuestionAnswer: [
										{
											AnswerID: '18',
											AnswerText: 'TRUE',
										},
										{
											AnswerID: '19',
											AnswerText: 'FALSE',
										},
										{
											AnswerID: '20',
											AnswerText: 'NOT GIVEN',
										},
									],
								},
							],
						},
					],
				},
				{
					QuizContent:
						'<h4>This is the secondly paragraph</h4><p> We organise what we write into sentences and paragraphs. A paragraph begins on a new line within the text and there is often a blank line between paragraphs. A paragraph usually contains more than one sentence and it is usually about one topic.<br><br/> The first sentence in a paragraph is sometimes called the key or topic sentence because it gives us the key to what the paragraph will be about. The other sentences usually relate to the key sentence. There is usually a conclusion in the final sentence of a paragraph and sometimes there is a link to the next paragraph.</p>',
					QuizQuestion: [
						{
							QuestionType: 3,
							QuestionTypeDetail: 'Câu hỏi ghép',
							QuestionList: [
								{
									Stt: 5,
									QuestionID: 5,
									QuestionText:
										'The list below gives some of the advantages of employing older worker',
									QuestionAnswer: [
										{
											AnswerID: '15',
											AnswerText: 'TRUE',
										},
										{
											AnswerID: '16',
											AnswerText: 'FALSE',
										},
										{
											AnswerID: '17',
											AnswerText: 'NOT GIVEN',
										},
									],
								},
								{
									Stt: 6,
									QuestionID: 6,
									QuestionText:
										'Marie became interested in science when she was a child.',
									QuestionAnswer: [
										{
											AnswerID: '18',
											AnswerText: 'TRUE',
										},
										{
											AnswerID: '19',
											AnswerText: 'FALSE',
										},
										{
											AnswerID: '20',
											AnswerText: 'NOT GIVEN',
										},
									],
								},
							],
						},

						{
							QuestionType: 1,
							QuestionTypeDetail:
								'Choose TRUE if the statement agrees with the information given in the text, choose FALSE if the statement contradicts the information, or choose NOT GIVEN if there is no information on this.',
							QuestionList: [
								{
									Stt: 1,
									QuestionID: 1,
									QuestionText:
										'Marie Curie’s husband was a joint winner of both Marie’s Nobel Prizes.',
									QuestionAnswer: [
										{
											AnswerID: '1',
											AnswerText: 'TRUE',
										},
										{
											AnswerID: '2',
											AnswerText: 'FALSE',
										},
										{
											AnswerID: '3',
											AnswerText: 'NOT GIVEN',
										},
									],
								},
								{
									Stt: 2,
									QuestionID: 2,
									QuestionText:
										'Marie became interested in science when she was a child.',
									QuestionAnswer: [
										{
											AnswerID: '4',
											AnswerText: 'TRUE',
										},
										{
											AnswerID: '5',
											AnswerText: 'FALSE',
										},
										{
											AnswerID: '6',
											AnswerText: 'NOT GIVEN',
										},
									],
								},
							],
						},
					],
				},
			],
		},
	},
	{
		LessonID: 12,
		LessonType: 1,
		NameType: 'Bài học | Bài thi',
		DataStudy: {
			Content:
				"<h4 class='title'>Welcome to LearnEnglish</h4><p> Learn English online using our high-quality resources to quickly improve your English. This website is created for adult learners of English by the British Council, the world's English teaching experts.</p><p>Start by taking our free English test to help you find your level. Then find lessons and resources to improve your English skills. Get more practice to improve your general English with our extended listening and reading materials. At any time, use the grammar and vocabulary sections to help and support your learning.</li><li>Different states for a button roll-over</li><li>A fixed background eg. a logo</li></ul> ",
			IsDone: false,
			Point: 10,
			LessonName: 'This is title of lesson',
		},
	},
	{
		LessonID: 13,
		LessonType: 1,
		NameType: 'Bài học | Bài thi',
		DataStudy: {
			Content:
				'<h4 class="title">About the online level test</h4><p> This test is designed to assess your understanding of English grammar, vocabulary and phrasing. Each question is in the format of multiple choice and you will have a choice of three possible answers.</p><p>These images could fit in any of the below given cases…</p><ul><li>Icon assets like social media, fancy bullets etc.</li><li>Different states for a button roll-over</li><li>A fixed background eg. a logo</li></ul> <VideoStudy />',
			IsDone: false,
			Point: 10,
			LessonName: 'This is title of lesson',
		},
	},
];

const Main = (props) => {
	const { status, activeLesson } = props;
	const [dataLesson, setDataLesson] = useState('');

	useEffect(() => {
		fakeLesson.forEach((lesson) => {
			activeLesson?.LessonID === lesson.LessonID && setDataLesson(lesson);
		});
	}, [activeLesson]);

	return (
		<div className={`study__main ${props.status ? 'active' : ''}`}>
			<div className="study__main--header">
				<div className="course">
					<div className="course__box">
						<FontAwesomeIcon icon="graduation-cap" />
						Khóa học
					</div>
					<div className="course__title">
						<h3 className="course__title--text">
							This is a course that we will learn
						</h3>
					</div>
				</div>
			</div>
			<Tabs>
				<div label="Bài học">
					{/* <h4 className="title">What is a CSS Sprite</h4>
					<p>
						We need to know about an image sprite before we start talking about
						CSS sprites. An image sprite is a compilation of different image
						assets that we want to use on our web application.
					</p>
					<p>These images could fit in any of the below given cases…</p>
					<ul>
						<li>Icon assets like social media, fancy bullets etc.</li>
						<li>Different states for a button roll-over</li>
						<li>A fixed background eg. a logo</li>
					</ul> */}
					{ReactHtmlParser(dataLesson?.DataStudy?.Content)}
					<VideoStudy />

					{/* <h4 className="title">What is a CSS Sprite</h4>
					<p>
						We need to know about an image sprite before we start talking about
						CSS sprites. An image sprite is a compilation of different image
						assets that we want to use on our web application.
					</p>
					<p>These images could fit in any of the below given cases…</p>
					<ul>
						<li>Icon assets like social media, fancy bullets etc.</li>
						<li>Different states for a button roll-over</li>
						<li>A fixed background eg. a logo</li>
					</ul> */}
				</div>
				<div label="Trắc nghiệm">
					<Quiz dataLesson={dataLesson} />
				</div>
			</Tabs>
		</div>
	);
};

export default Main;
