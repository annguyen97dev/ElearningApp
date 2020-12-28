import React, { useState, useEffect, useReducer } from 'react';

// import './styles.module.scss';

import { getLayout, getStudentLayout } from '~/components/Layout';

import Main from '~/page-components/student/study/main/main';
import SideBar from '~/page-components/student/study/sidebar';

const Study = () => {
	const [status, setStatus] = useState(false);

	console.log('STATUS: ', status);

	return (
		<div className="study" style={status ? { display: 'block' } : {}}>
			<Main status={status}></Main>
			<SideBar getStatus={() => setStatus(true)}></SideBar>
		</div>
	);
};

Study.getLayout = getStudentLayout;

export default Study;
