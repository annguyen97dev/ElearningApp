//
import React, { Component } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

// Create data for list
const getItems = (count) =>
	Array.from({ length: count }, (v, k) => k).map((k) => ({
		id: `task-${k}`,
		content: `Task ${k}`,
	}));

// Reorder the list items
const reorder = (list, startIndex, endIndex) => {
	const result = Array.from(list);
	const [removed] = result.splice(startIndex, 1);
	result.splice(endIndex, 0, removed);

	return result;
};

const grid = 10;

const getItemStyle = (isDragging, draggableStyle) => ({
	userSelect: 'none',
	padding: grid * 2,
	margin: `0 0 ${grid}px 0`,
	background: isDragging ? '#77e2e0' : '#33c9c7',
	...draggableStyle,
});

const getListStyle = (isDraggingOver) => ({
	background: isDraggingOver ? '#a1ffc5' : '#daffff',
	padding: grid,
	width: 250,
});

class VerticalDragList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			items: getItems(10),
		};
		this.onDragEnd = this.onDragEnd.bind(this);
	}

	onDragEnd(result) {
		// if item dropped outside the list
		if (!result.destination) {
			return;
		}

		console.log('result', result.source);

		const items = reorder(
			this.state.items,
			result.source.index,
			result.destination.index,
		);

		this.setState({
			items,
		});
	}

	render() {
		return (
			<DragDropContext onDragEnd={this.onDragEnd}>
				<Droppable droppableId="droppable">
					{(provided, snapshot) => (
						<div
							{...provided.droppableProps}
							ref={provided.innerRef}
							style={getListStyle(snapshot.isDraggingOver)}
						>
							{this.state.items.map((item, index) => (
								<Draggable key={item.id} draggableId={item.id} index={index}>
									{(provided, snapshot) => (
										<div
											ref={provided.innerRef}
											{...provided.draggableProps}
											{...provided.dragHandleProps}
											style={getItemStyle(
												snapshot.isDragging,
												provided.draggableProps.style,
											)}
										>
											{item.content}
										</div>
									)}
								</Draggable>
							))}
							{provided.placeholder}
						</div>
					)}
				</Droppable>
			</DragDropContext>
		);
	}
}

export default VerticalDragList;
