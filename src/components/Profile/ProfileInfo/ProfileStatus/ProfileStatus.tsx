import React, { ChangeEvent } from "react";
import styles from "./ProfileStatus.module.css";
// import { useState } from "react";


type PropsType = {
    status: string
    updateStatus: (newStatus: string) => void
}

type StateType = {
    status: string
    editMode: boolean
}

class ProfileStatus extends React.Component<PropsType>{

    state = {
        editMode: false,
        status: this.props.status
    }

    activateEditMode = () => {
        this.setState({
            editMode: true
        });
    }

    deactivateEditMode = () => {
        this.setState({
            editMode: false
        });
        this.props.updateStatus(this.state.status)
    }

    onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            status: e.currentTarget.value
        })
    }

    componentDidUpdate(prevProps: PropsType, prevState: StateType) {
        if (prevProps.status !== this.props.status) {
            this.setState({
                status: this.props.status
            })
        }
    }

    render() {
        return (
            <div>
                {!this.state.editMode &&
                    <div>
                        <span onDoubleClick={this.activateEditMode}>{this.props.status || "-----"}</span>
                    </div>
                }
                {this.state.editMode &&
                    <div>
                        <input onChange={this.onStatusChange} autoFocus={true} onBlur={this.deactivateEditMode} value={this.state.status} />
                    </div>
                }
            </div>
        )
    }
}

// const ProfileStatus = (props) => {
//     const [moodEdit, setMoodEdit] = useState(false);
  
//     const editStatus = () => {
//       setMoodEdit(!moodEdit);
//     };
  
//     return (
//       <div>
//         {moodEdit ? (
//           <div>
//             <input autoFocus onBlur={editStatus} value={props.status} />
//           </div>
//         ) : (
//           <div>
//             <span onDoubleClick={editStatus}>{props.status}</span>
//           </div> )}
//       </div>
//     ); };

export default ProfileStatus;