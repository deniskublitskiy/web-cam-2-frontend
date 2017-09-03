import React, { Component } from 'react';
import { IconButton, MenuItem, SelectField, TextField } from 'material-ui';
import AnswerExplanationIcon from 'material-ui/svg-icons/action/lightbulb-outline';
import { connect } from 'react-redux';
import { addQuestionAnswerOption, deleteQuestionAnswerOption, fetchTestTypes } from '../../../actions/tests';
import './style.sass';
import SingleQuestion from '../SingleQuestion/index';
import { pink500 } from 'material-ui/styles/colors';

@connect(state => ({
    testTypes: state.tests.types,
    variants: state.tests.variants
}), {
    fetchTestTypes,
    addQuestionAnswerOption,
    deleteQuestionAnswerOption
})
export default class QuestionConstructor extends Component {
    state = {
        value: 1
    };

    componentDidMount() {
        this.props.fetchTestTypes();
    }

    handleChangeType = (event, index, value) => this.setState({value});

    get items() {
        return this.props.testTypes.map(testType => <MenuItem
            key={testType.id}
            value={testType.id}
            primaryText={testType.name}
        />)
    }

    get variants() {
        switch (this.state.value) {
            case 1:
                return <SingleQuestion
                    answer={1}
                    addQuestionAnswerOption={this.props.addQuestionAnswerOption}
                    deleteQuestionAnswerOption={this.props.deleteQuestionAnswerOption}
                    variants={this.props.variants}
                />;
            // default:
            //     return <SingleQuestion/>;
        }
    }

    render() {
        return <div className="question-constructor-container">
            <div className="question-constructor-params">
                <SelectField
                    value={this.state.value}
                    onChange={this.handleChangeType}
                    floatingLabelText="Question type"
                >
                    {this.items}
                </SelectField>
                <TextField
                    floatingLabelText="Mark"
                />
                <IconButton
                    iconStyle={{color: pink500}}
                    tooltip="Answer explanation"
                >
                    <AnswerExplanationIcon/>
                </IconButton>
            </div>
            <div>
                {this.variants}
            </div>
        </div>;
    }
}