import React from 'react';
import axios from 'axios';


class SubmitMTurk extends React.Component {

    constructor(props) {
      super(props);
      this.state = {};
    }

    componentDidMount() {      
        this.setState({complete: false});
        // const url = window.location.href;            
        const url = window.location.href.split('?')[0];
        axios.get(url+ "/init").then(res => {
            this.setState(res.data, function() {
                // this.submitTask();
                this.setState({complete: true});
                this.notifyBackendToCompleteTask();
            });            
        })      
    }

    render() {
        if (this.state.pipeline == undefined) return <p>Loading...</p>;        
        return (
            <div>
                <form action="https://mturk.com/mturk/externalSubmit" method="POST" onSubmit={this.handlePostSubmit}>
                    <input type='text' onChange={this.myChangeHandler}/>
                    <input type="hidden" name="assignmentId" id="assignmentId" value={this.state.mturk.assignment_id} />
                    <input type="hidden" name="foo" id="foo" value="bar" />
                    <input type="submit" name="submit" />
                </form>
            </div>
        ); 
    }    

    handlePostSubmit = (e) => {
        e.preventDefault();        
        console.log("Form should have been submitted!");
    }

    // submitTask = () => {
    //     if (this.state.pipeline == undefined) {console.log("Error submitting task!"); return;}

    //     axios.post(this.state.mturk.sandbox_end_point, {assignmentId: this.state.mturk.assignment_id, foo: 'bar'}).then(res => {
    //         this.setState({complete: true});
    //         console.log(res);
    //         this.notifyBackendToCompleteTask();
    //     }).catch( (error) => {
    //         // handle error
    //         console.log(error);
    //     });

    //     axios.post(this.state.mturk.production_end_point, {assignmentId: this.state.mturk.assignment_id, foo: 'bar'}).then(res => {            
    //         console.log(res);
    //         this.setState({complete: true});
    //         this.notifyBackendToCompleteTask();
    //     }).catch( (error) => {
    //         // handle error
    //         console.log(error);
    //     });
    // }

    notifyBackendToCompleteTask = () => {
        console.log("trying to notify backend");
        // const url = window.location.href;           
        const url = window.location.href.split('?')[0]; 
        axios.post(url+ "/update", 
        Object.assign({}, this.state, {instruction: 'mark_complete'})).then(res => {            
            this.setState(res.data);            
        })
    }
}


export default SubmitMTurk;