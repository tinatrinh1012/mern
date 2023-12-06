import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Record = (props) => (
	<tr>
		<td>{props.record.name}</td>
		<td>{props.record.position}</td>
		<td>{props.record.level}</td>
		<td>
			<Link className="btn btn-link" to={`/edit/${props.record._id}`}>Edit</Link> |
			<button className="btn btn-link"
				onClick={() => {
					props.deleteRecord(props.record._id);
				}}
			>
				Delete
			</button>
		</td>
	</tr>
);

export default function RecordList() {
	const [records, setRecords] = useState([]);

	useEffect(() => {
		getEmployeeRecords();
	}, [])

	function getEmployeeRecords() {
		fetch('http://localhost:8080/record/')
		.then(response => response.json())
		.then(data => setRecords(data))
		.catch(error => console.error('Error:', error));
	}

	// This method will delete a record
	function deleteRecord(id) {
		fetch(`http://localhost:8080/${id}`, {method: "DELETE"})
		.then(_ => getEmployeeRecords())
		.catch(error => console.error('Error:', error));
	}

	// This method will map out the records on the table
	function recordList() {
		return records.map((record) => {
			return (
				<Record
					record={record}
					deleteRecord={() => deleteRecord(record._id)}
					key={record._id}
				/>
			);
		});
	}

	// This following section will display the table with the records of individuals.
	return (
		<div>
			<h3>Record List</h3>
			<table className="table table-striped" style={{ marginTop: 20 }}>
				<thead>
					<tr>
						<th>Name</th>
						<th>Position</th>
						<th>Level</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>{recordList()}</tbody>
			</table>
		</div>
	);
}