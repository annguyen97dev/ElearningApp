import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Tab from './Tab';

import './tabs.module.scss';

class Tabs extends Component {
	static propTypes = {
		children: PropTypes.instanceOf(Array).isRequired,
	};

	constructor(props) {
		super(props);

		this.state = {
			activeTab: this.props.children[0].props.label,
			heightContentTab: window.innerHeight - 200,
		};
	}

	updateHeight = () => {
		this.setState({
			heightContentTab: window.innerHeight - 200,
		});
	};

	componentDidMount() {
		window.addEventListener('resize', this.updateHeight);
	}
	componentWillUnmount() {
		window.removeEventListener('resize', this.updateHeight);
	}

	onClickTabItem = (tab) => {
		this.setState({ activeTab: tab });
	};

	render() {
		const {
			onClickTabItem,
			props: { children },
			state: { activeTab, heightContentTab },
		} = this;

		return (
			<div className="tabs study__main--content">
				<div className="tabs-list">
					{children.map((child) => {
						const { label } = child.props;

						return (
							<Tab
								activeTab={activeTab}
								key={label}
								label={label}
								onClick={onClickTabItem}
							/>
						);
					})}
				</div>
				<div
					className="tab-content"
					style={{ height: heightContentTab + 'px' }}
				>
					{children.map((child) => {
						if (child.props.label !== activeTab) return undefined;
						return child.props.children;
					})}
				</div>
			</div>
		);
	}
}

export default Tabs;
