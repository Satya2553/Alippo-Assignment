import React, { useState, useEffect } from "react";
import "./Table.css";

const TableComponent = () => {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [editIndex, setEditIndex] = useState(null);
	const [deleteIndex, setDeleteIndex] = useState(null);
	const [editValue, setEditValue] = useState("");

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(
					"https://assets.alippo.com/catalog/static/data.json"
				);
				if (!response.ok) {
					throw new Error("Error fetching data");
				}
				const result = await response.json();
				setData(result);
			} catch (error) {
				setError(error.message);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	const handleEdit = (index) => {
		const columnName = Object.keys(data[0])[0];
		const currentValue = data[index][columnName];
		setEditValue(currentValue !== null ? currentValue : "");
		setEditIndex(index);
	};

	const handleDelete = (index) => {
		setDeleteIndex(index);
	};

	const handleEditSubmit = () => {
		const updatedData = [...data];
		const columnName = Object.keys(data[0])[0];
		const newValue = editValue.trim() !== "" ? editValue.trim() : null;
		updatedData[editIndex][columnName] = newValue;
		setData(updatedData);
		setEditIndex(null);
	};

	const handleDeleteSubmit = () => {
		const updatedData = [...data];
		updatedData.splice(deleteIndex, 1);
		setData(updatedData);
		setDeleteIndex(null);
	};

	const renderEditModal = () => {
		if (editIndex !== null) {
			const columnName = Object.keys(data[0])[0];

			return (
				<div className="modal">
					<div className="modal-content">
						<h2>Edit Entry</h2>
						<p>Editing entry in {columnName}:</p>
						<input
							type="text"
							value={editValue}
							onChange={(e) => setEditValue(e.target.value)}
						/>
						<button onClick={() => setEditIndex(null)}>Cancel</button>
						<button onClick={handleEditSubmit}>Submit</button>
					</div>
				</div>
			);
		}

		return null;
	};

	const renderDeleteModal = () => {
		if (deleteIndex !== null) {
			return (
				<div className="modal">
					<div className="modal-content">
						<h2>Delete Entry</h2>
						<p>Are you sure you want to delete the entry ?</p>
						<button onClick={() => setDeleteIndex(null)}>Cancel</button>
						<button onClick={handleDeleteSubmit}>Delete</button>
					</div>
				</div>
			);
		}

		return null;
	};

	const renderTable = () => {
		if (loading) {
			return <p>Loading...</p>;
		}

		if (error) {
			return <p>Error: {error}</p>;
		}

		if (data.length === 0) {
			return <p>No data available</p>;
		}

		return (
			<div className="container">
				<table>
					<thead>
						<tr>
							<th>SL. No</th>
							{Object.keys(data[0]).map((key) => (
								<th key={key}>{key}</th>
							))}
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{data.map((row, index) => (
							<tr key={index}>
								<td>{index + 1}</td>
								{Object.entries(row).map(([key, value], i) => (
									<td key={i}>{value !== null ? value : "-"}</td>
								))}
								<td>
									<button onClick={() => handleEdit(index)}>Edit</button>
									<button onClick={() => handleDelete(index)}>Delete</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
				{renderEditModal()}
				{renderDeleteModal()}
			</div>
		);
	};

	return <div>{renderTable()}</div>;
};

export default TableComponent;
