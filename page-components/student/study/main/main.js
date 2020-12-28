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

const Main = (props) => {
	const status = props.status;

	useEffect(() => {
		// videojs.registerPlugin('annotationComments', AnnotationComments(videojs));
		// var player = videojs('study-video');
		// var plugin = player.annotationComments(pluginOptions);
		// const pluginOptions = {
		// 	// Collection of annotation data to initialize
		// 	annotationsObjects: [],
		// 	// Flexible meta data object (currently used for user data, but addl data can be provided to wrap each comment with metadata - provide the id of the current user and fullname of the current user at minimum, which are required for the UI)
		// 	meta: { user_id: null, user_name: null },
		// 	// Use arrow keys to move through annotations when Annotation mode is active
		// 	bindArrowKeys: true,
		// 	// Show or hide the control panel and annotation toggle button (NOTE - if controls are hidden you must provide custom UI and events to drive the annotations - more on that in "Programmatic Control" below)
		// 	showControls: true,
		// 	// Show or hide the comment list when an annotation is active. If false, the text 'Click and drag to select', will follow the cursor during annotation mode
		// 	showCommentList: true,
		// 	// If false, annotations mode will be disabled in fullscreen
		// 	showFullScreen: true,
		// 	// Show or hide the tooltips with comment preview, and annotation shape, on marker hover or timeline activate
		// 	showMarkerShapeAndTooltips: true,
		// 	// If false, step two of adding annotations (writing and saving the comment) will be disabled
		// 	internalCommenting: true,
		// 	// If true, toggle the player to annotation mode immediately after init. (NOTE - "annotationModeEnabled" event is not fired for this initial state)
		// 	startInAnnotationMode: false,
		// };
	});

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
					<h4 className="title">What is a CSS Sprite</h4>
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
					</ul>

					<VideoStudy />

					<h4 className="title">What is a CSS Sprite</h4>
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
					</ul>
				</div>
				<div label="Trắc nghiệm">
					<Quiz />
				</div>
			</Tabs>
		</div>
	);
};

export default Main;
