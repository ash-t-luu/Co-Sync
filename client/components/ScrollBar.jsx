import React, { useState } from 'react';
import ScrollBarItem from './ScrollBarItem.jsx';
import { useDispatch } from 'react-redux';
import { useAddColumnMutation, useAddProjectMutation, useInviteUserMutation } from '../utils/userApi.js';
import { createColumn, createProject, setCurrentProjectName } from '../slices/userSlice.js';

const ScrollBar = ({ currentProject }) => {
  const [project, setProject] = useState('');
  const [column, setColumn] = useState('');
  const [invite, setInvite] = useState('');
  const [addColumnMutation] = useAddColumnMutation();
  const [addProjectMutation] = useAddProjectMutation();
  const [inviteUserMutation] = useInviteUserMutation();
  const dispatch = useDispatch();

  // console.log(`Current project is: ${currentProject}`);
  const handleAddColumnClick = async (e) => {
    e.preventDefault();
    const body = {
      columnName: column,
      projectId: currentProject._id
    }
    setColumn('');
    try {
      const res = await addColumnMutation(body);
      if (res.error) throw new Error(res.error.message);
      // console.log(`res is ${res}`);
      dispatch(createColumn(res.data));
    } catch (error) {
      console.log(error);
    }
  };

  const handleSetProjectName = (e) => {
    e.preventDefault();
    dispatch(setCurrentProjectName(e.target.value));
  }

  const handleSetProject = async (e) => {
    e.preventDefault();
    const body = {
      projectName: project, // Corrected the property name to projectName
    };
    setProject('');
    try {
      const res = await addProjectMutation(body);
      if (res.error) throw new Error(res.error.message);
      dispatch(createProject(res.data));
      setCurrentProjectName(res.data.projectName);
    } catch (error) {
      console.log(error);
    }
  };

  const handleInviteUser = async (e) => {
    e.preventDefault();
    if (!currentProject) return console.log('No current project');
    const body = {
      username: invite,
      projectID: currentProject?._id,
    };
    setInvite('');
    try {
      const res = await inviteUserMutation(body);
      if (res.error) throw new Error(res.error.message);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className='scrollBarOuter'>
      <ul className='scrollBarInner'>
        <ScrollBarItem
          setterFunction={setInvite}
          saveFunc={handleInviteUser}
          placeholder='Invite User'
          type='text'
          title='Invite a User'
        />
        <ScrollBarItem
          setterFunction={setColumn}
          saveFunc={handleAddColumnClick}
          placeholder='Add Column'
          type='text'
          title='Column Name'
        />
        <ScrollBarItem
          placeholder='Create Project'
          type='text'
          title='Project Name'
          setterFunction={setProject}
          saveFunc={handleSetProject}
        />
        <ScrollBarItem
          placeholder='My Projects'
          type='view'
          title='Projects'
          saveFunc={handleSetProjectName}
        />
      </ul>
    </div>
  )
}

export default ScrollBar;