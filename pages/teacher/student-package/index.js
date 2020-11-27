import React, { useState, useEffect, useRef } from 'react';
import Pagination from 'react-js-pagination';
import { getLayout } from '~/components/Layout';
import Skeleton from 'react-loading-skeleton';
import { getMissingFeedback } from '~/api/teacherAPI';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import dataHy from '../../../data/data.json';

console.log('o ngoai', dataHy.EndOfStudentPackage);

function getData() {
	const andt = dataHy.EndOfStudentPackage;
	return andt;
}
const MissingFeedbackRow = ({ data }) => {
	const {
		BookingID,
		ScheduleTimeVN,
		ScheduleTimeUTC,
		DocumentName,
		LessionName,
		EvaluationStatus,
	} = data;
	return (
		<tr>
			<td>{data.StudentCode}</td>
			<td>{data.StudentName}</td>
			<td>{data.TotalNumberOfClass}</td>
			<td>{data.ClassesWereBooked}</td>
			<td>{data.FurthestClass}</td>
			<td>{data.EndDateOfPackage}</td>
		</tr>
	);
};

const StudentPackage = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [pageNumber, setPageNumber] = useState(1);
	const [data, setData] = useState(null);
	const [pageSize, setPageSize] = useState(0);
	const [totalResult, setTotalResult] = useState(0);

	const loadMissingFeedback = async () => {
		try {
			const res = await getMissingFeedback({ Page: pageNumber });
			if (res?.Code && res.Code === 1) {
				setData(res.Data);
				setPageSize(res.PageSize);
				setTotalResult(res.TotalResult);
			} else {
				console.log('Code response khác 1');
			}
			setIsLoading(false);
		} catch (error) {
			console.log(error);
			setIsLoading(false);
		}
	};
	const layData = getData();
	console.log('tu hy', layData);

	useEffect(() => {
		loadMissingFeedback();
	}, [pageNumber]);

	return (
		<>
			<h1 className="main-title-page">End of student's package</h1>
			<div className="card">
				<div className="card-body">
					<>
						<div className="table-responsive ">
							<table className="table table-classrooms table-borderless responsive-table table-hover">
								<thead className="">
									<tr className="">
										<th className="">Student code</th>
										<th className="">Student name</th>
										<th className="">Total number of class </th>
										<th className="">Classes were booked</th>
										<th className="">Furthest class</th>
										<th className="">End date of package</th>
									</tr>
								</thead>
								{/*1 item*/}
								<tbody>
									{isLoading ? (
										<>
											<tr>
												<td>
													<Skeleton />
												</td>
												<td>
													<Skeleton />
												</td>
												<td>
													<Skeleton />
												</td>
												<td>
													<Skeleton />
												</td>
												<td>
													<Skeleton />
												</td>
												<td>
													<Skeleton />
												</td>
											</tr>
											<tr>
												<td>
													<Skeleton />
												</td>
												<td>
													<Skeleton />
												</td>
												<td>
													<Skeleton />
												</td>
												<td>
													<Skeleton />
												</td>
												<td>
													<Skeleton />
												</td>
												<td>
													<Skeleton />
												</td>
											</tr>
											<tr>
												<td>
													<Skeleton />
												</td>
												<td>
													<Skeleton />
												</td>
												<td>
													<Skeleton />
												</td>
												<td>
													<Skeleton />
												</td>
												<td>
													<Skeleton />
												</td>
												<td>
													<Skeleton />
												</td>
											</tr>
										</>
									) : !!layData && !!layData.length > 0 ? (
										layData.map((item) => (
											<MissingFeedbackRow
												key={`${item.BookingID}`}
												data={item}
											/>
										))
									) : (
										<tr className="bg-white-f">
											<td colSpan={6}>
												<div className="empty-error tx-center mg-t-30 bg-white mg-x-auto">
													<img
														src="/static/img/no-data.svg"
														alt="no-booking"
														className="wd-200 mg-b-15"
													/>
													<p className=" tx-danger tx-medium">
														Greate, all courses are evaluated.
													</p>
												</div>
											</td>
										</tr>
									)}
								</tbody>
							</table>
						</div>

						{totalResult > pageSize && (
							<Pagination
								innerClass="pagination mg-t-15"
								activePage={pageNumber}
								itemsCountPerPage={pageSize}
								totalItemsCount={totalResult}
								pageRangeDisplayed={5}
								onChange={(page) => setPageNumber(page)}
								itemClass="page-item"
								linkClass="page-link"
								activeClass="active"
							/>
						)}
					</>
				</div>
			</div>
		</>
	);
};

StudentPackage.getLayout = getLayout;

export default StudentPackage;
