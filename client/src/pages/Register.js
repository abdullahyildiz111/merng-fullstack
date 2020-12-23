//import { values } from 'lodash';
import React, { useState, useContext } from 'react';
import { Form, Button, Grid } from 'semantic-ui-react';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';

import { useForm } from '../util/hooks';
import { AuthContext } from '../context/auth';




function Register(props) {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});

  


  const { onChange, onSubmit, values } = useForm(registerUser, {
    username: '',
    gender: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const [addUser, { loading }] = useMutation(REGİSTER_USER, {
    update(_, { data: { register: userData } }) {
      context.login(userData)
      props.history.push('/');
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors)
    },

    variables: values

  });

  function registerUser() {
    addUser();
    console.log(values)
  }

  return (
    <Grid centered>
      <Grid.Column mobile={16} tablet={8} computer={6}>
        <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''} >
          <h1>Register</h1>
          <Form.Input
            label="Username"
            placeholder="Username.."
            name="username"
            type='text'
            error={errors.username ? true : false}
            onChange={onChange} />
          
            <Form.Field  >
                <label>Gender</label>
                <select name="gender" onChange={onChange} error={errors.gender ? true : false}>
                  <option value="">Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </Form.Field>
          
          <Form.Input
            label="Email"
            placeholder="Email..."
            name="email"
            type='email'
            error={errors.email ? true : false}
            onChange={onChange} />

          <Form.Input
            label="Password"
            placeholder="Password.."
            name="password"
            type='password'
            error={errors.password ? true : false}
            onChange={onChange} />

          <Form.Input
            label=" Confirm Password"
            placeholder=" Confiiirm Password.."
            name="confirmPassword"
            type='password'
            error={errors.confirmPassword ? true : false}
            onChange={onChange} />

          <Button type="submit" primary>
            Register
                </Button>
        </Form>
        {Object.keys(errors).length > 0 && (<div className='ui error message'>
          <ul className='list'>
            {Object.values(errors).map(value => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>)}

      </Grid.Column>
    </Grid>
  )
}

const REGİSTER_USER = gql`
mutation register(
    $username:String!
    $gender:String!
    $email:String!    
    $password:String!
    $confirmPassword:String!
){
    register(
        registerInput:{
            username:$username
            gender:$gender
            email:$email
            password:$password
            confirmPassword:$confirmPassword
        }
    ){
        id email username gender createdAt token
    }
}
`

export default Register;