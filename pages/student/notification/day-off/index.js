import React from 'react';
import { getStudentLayout } from '~/components/Layout';
import { i18n, withTranslation } from '~/i18n';
const DayOff = ({ t }) => {
	return (
		<>
			<h1 className="main-title-page">{t('holiday')}</h1>
			<div className="card">
				<div className="card-body">
					<div className="table-responsive">
						<table className="table">
							<thead>
								<tr>
									<th>{t('title-eva')}</th>
									<th>{t('start-day')}</th>
									<th>{t('end-day')}</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>Tet holidays</td>
									<td>13/02/2020</td>
									<td>20/02/2020</td>
								</tr>
								<tr>
									<td>Tet holidays</td>
									<td>13/02/2020</td>
									<td>20/02/2020</td>
								</tr>
								<tr>
									<td>Tet holidays</td>
									<td>13/02/2020</td>
									<td>20/02/2020</td>
								</tr>
								<tr>
									<td>Tet holidays</td>
									<td>13/02/2020</td>
									<td>20/02/2020</td>
								</tr>
								<tr>
									<td>Tet holidays</td>
									<td>13/02/2020</td>
									<td>20/02/2020</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</>
	);
};

// DayOff.getLayout = getStudentLayout;

// export default DayOff;

DayOff.getLayout = getStudentLayout;
DayOff.getInitialProps = async () => ({
	namespacesRequired: ['common'],
});

export default withTranslation('common')(DayOff);
