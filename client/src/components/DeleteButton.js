import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import { Button, Confirm, Icon } from 'semantic-ui-react';
import { FETCH_POSTS_QUERY } from '../util/graphql';


function DeleteButton({ postId, callback }) {
    const [confirmOpen, setConfirmOpen] = useState(false);

    const [deletePost] = useMutation(DELETE_POST_MUTATION, {
      
        update(proxy, result) {
              
            
            const  data = proxy.readQuery({
                query: FETCH_POSTS_QUERY
            });
            const new_post = result.data.deletePost;
            proxy.writeQuery({ query: FETCH_POSTS_QUERY, data: { getPosts: [new_post, ...data.getPosts]}});
            if (callback) callback();
            setConfirmOpen(false);
        },
        variables: {
            postId
        },
        onError(err){
            return err;
        }
    })

    return (
        <>
            <Button color="red" floated="right" onClick={
                () => setConfirmOpen(true)}>
                <Icon name="trash" style={{ margin: 0 }} />
            </Button>
            <Confirm
                open={confirmOpen}
                onCancel={() => setConfirmOpen(false)}
                onConfirm={deletePost} />
        </>

    )
}

const DELETE_POST_MUTATION = gql`
mutation deletePost($postId: ID!){
    deletePost(postId: $postId)
}
`

export default DeleteButton;