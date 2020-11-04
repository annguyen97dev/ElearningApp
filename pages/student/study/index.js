import React, { useState, useEffect, useReducer } from 'react';

// import './styles.module.scss';

import { getLayout, getStudentLayout } from '~/components/Layout';

import Main from '~/page-components/student/study/main/main';
import SideBar from '~/page-components/student/study/sidebar';

const Study = () => {
	return (
		<div className="study">
			<Main></Main>
			<SideBar></SideBar>
		</div>
	);
};

Study.getLayout = getStudentLayout;

export default Study;
