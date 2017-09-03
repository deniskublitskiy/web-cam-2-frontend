import React, { Component } from 'react';
import { FlatButton, Checkbox, TextField, IconButton } from 'material-ui';
import QuestionAnswerIcon from 'material-ui/svg-icons/action/question-answer';
import RadioButtonCheckedIcon from 'material-ui/svg-icons/toggle/radio-button-checked';
import RadioButtonUncheckedIcon from 'material-ui/svg-icons/toggle/radio-button-unchecked';
import DeleteForeverIcon from 'material-ui/svg-icons/action/delete-forever';
import RichEditor from '../RichEditor';
import './style.sass';

export default class SingleQuestion extends Component {
    static defaultProps = {
        variants: [{}, {}],
        answer: 0
    };

    render() {
        let items = this.props.variants.map((variant, index, variants) =>
            <div key={index} className="single-question-answer">
                <Checkbox
                    checkedIcon={<RadioButtonCheckedIcon/>}
                    uncheckedIcon={<RadioButtonUncheckedIcon/>}
                    //checked={this.props.answer === variant.id}
                    className="single-question-answer-checkbox"
                    onCheck={(e, checked) => {/*TODO*/
                    }}
                />
                <TextField
                    hintText={`Variant ${index + 1}`}
                    defaultValue={variant.value || ''}
                    fullWidth={true}
                    multiLine={true}
                    rows={1}
                    rowsMax={2}
                />
                <IconButton
                    disabled={variants.length <= 2}
                    onClick={e => this.props.deleteQuestionAnswerOption(variant.id)}
                    className={variants.length < 2 ? 'disabled' : ''}
                >
                    <DeleteForeverIcon/>
                </IconButton>
            </div>
        );

        return <div>
            <RichEditor/>
            <div>
                {items}
            </div>
            <div className="single-question-buttons">
                <FlatButton
                    label="Add variant"
                    icon={<QuestionAnswerIcon/>}
                    labelPosition="before"
                    primary={true}
                    onClick={this.props.addQuestionAnswerOption}
                />
            </div>
        </div>
    }
}