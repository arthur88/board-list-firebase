import React, { Component } from 'react';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';

export default class Edit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            key: '',
            title: '',
            description: '',
            author: ''
        };
    }

    componentDidMount() {
        const ref = firebase.firestore().collection('boards').doc(this.props.match.params.id);
        ref.get().then((doc) => {

            if(doc.exists) {
                const board = doc.data();
                this.setState({
                    key: doc.id,
                    title: board.title,
                    description: board.description,
                    author: board.author
                });
            } else {
                console.log('No such document!');
            }

        })
    }

    onChange = (e) => {
        const state = this.state
        state[e.target.name] = e.target.value;
        this.setState({ board:state });
    }

    onSubmit = (e) => {
        e.preventDefault();

        const { title, description, author} = this.state;
        const updateRef = firebase.firestore().collection('boards').doc(this.state.key);

        updateRef.set({
            title, 
            description,
            author
        }).then((docRef) => {
            this.setState({
                key: '',
                title: '',
                descrition: '',
                author: ''
            });
            this.props.history.push("/show/"+this.props.match.params.id)
        })
        .catch((error) => {
            console.log("Error adding content: ", error);
        });
    }

    render() {
        return (
            <div className="container">
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h4 className="panel-title">EDIT Board</h4>
                    </div>
                    <div className="panel-body">
                        <h4><Link to={`/show/${this.state.key}`} className="btn btn-primary">Board List</Link></h4>
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label for="title">Title:</label>
                                <input type="text" className="form-control" name="title" value={this.state.title} onChange={this.onChange} placeholder="Title" />
                            </div>
                            <div className="form-group">
                                <label for="description">Description:</label>
                                <input type="text" className="form-control" name="description" value={this.state.description} onChange={this.onChange} placeholder="Description" />
                            </div>
                            <div className="form-group">
                                <label for="author">Athor:</label>
                                <input type="text" className="form-control" name="author" value={this.state.author} onChange={this.onChange} placeholder="author" />
                            </div>
                            <button type="submit" className="btn btn-success">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }

}