import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { BASE_URL } from "../App";

export default function Edit() {
	const [form, setForm] = useState({
		name: "",
		position: "",
		level: "",
		records: [],
	});
	const params = useParams();
	const navigate = useNavigate();

	// first request info for a single employee record
	useEffect(() => {
		fetch(`${BASE_URL}/record/${params.id}`)
		.then((response) => {
			if (response.ok) {
				return response.json();
			}
			throw new Error('Something gone wrong while fetching data');
		})
		.then(data => setForm(data))
		.catch((error) => {
			console.error(error);
			navigate("/");
		})
	}, [params.id, navigate])

	// These methods will update the state properties.
	function updateForm(value) {
		return setForm((prev) => {
			return { ...prev, ...value };
		});
	}

	function onSubmit(e) {
		e.preventDefault();

		const editedRecord = {
			name: form.name,
			position: form.position,
			level: form.level,
		};

		// This will send a post request to update the data in the database.
		fetch(`${BASE_URL}/update/${params.id}`, {
			method: "POST",
			body: JSON.stringify(editedRecord),
			headers: {
				'Content-Type': 'application/json'
			},
		})
		.then(_ => navigate("/"))
		.catch(error => console.error('Error:', error));
	}

	// This following section will display the form that takes input from the user to update the data.
	return (
		<div>
			<h3>Update Record</h3>
			<form onSubmit={onSubmit}>
				<div className="form-group">
					<label htmlFor="name">Name: </label>
					<input
						type="text"
						className="form-control"
						id="name"
						value={form.name}
						onChange={(e) => updateForm({ name: e.target.value })}
					/>
				</div>
				<div className="form-group">
					<label htmlFor="position">Position: </label>
					<input
						type="text"
						className="form-control"
						id="position"
						value={form.position}
						onChange={(e) => updateForm({ position: e.target.value })}
					/>
				</div>
				<div className="form-group">
					<div className="form-check form-check-inline">
						<input
							className="form-check-input"
							type="radio"
							name="positionOptions"
							id="positionIntern"
							value="Intern"
							checked={form.level === "Intern"}
							onChange={(e) => updateForm({ level: e.target.value })}
						/>
						<label htmlFor="positionIntern" className="form-check-label">Intern</label>
					</div>
					<div className="form-check form-check-inline">
						<input
							className="form-check-input"
							type="radio"
							name="positionOptions"
							id="positionJunior"
							value="Junior"
							checked={form.level === "Junior"}
							onChange={(e) => updateForm({ level: e.target.value })}
						/>
						<label htmlFor="positionJunior" className="form-check-label">Junior</label>
					</div>
					<div className="form-check form-check-inline">
						<input
							className="form-check-input"
							type="radio"
							name="positionOptions"
							id="positionSenior"
							value="Senior"
							checked={form.level === "Senior"}
							onChange={(e) => updateForm({ level: e.target.value })}
						/>
						<label htmlFor="positionSenior" className="form-check-label">Senior</label>
				</div>
				</div>
				<br />

				<div className="form-group">
					<input
						type="submit"
						value="Update Record"
						className="btn btn-primary"
					/>
				</div>
			</form>
		</div>
	);
}