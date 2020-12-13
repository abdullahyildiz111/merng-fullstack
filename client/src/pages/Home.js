import React, { useContext } from 'react'
import { useQuery } from '@apollo/client';
import {  Grid, Transition } from 'semantic-ui-react';


import PostCard from '../components/PostCard';
import { AuthContext } from '../context/auth';
import PostForm from '../components/PostForm';
import { FETCH_POSTS_QUERY } from '../util/graphql';

function Home() {

    const { user } = useContext(AuthContext);
    const { loading, data: { getPosts: post } = {} } = useQuery(FETCH_POSTS_QUERY);

    return (
        <div className="genislik">
            <Grid  centered >
                <Grid.Row className="page-title">
                    <h1> Recent Posts</h1>
                </Grid.Row>
                <Grid.Row>
                    {user && (<Grid.Column mobile={16} tablet={8} computer={5}>
                        <PostForm />
                    </Grid.Column>)}

                    {loading ? (
                        <h1>Loading posts..</h1>
                    ) : (
                            <Transition.Group>
                                {post && post.map(post => (
                                    <Grid.Column mobile={16} tablet={8} computer={5} key={post.id} style={{ marginBottom: 20 }}>
                                        <PostCard post={post} />
                                    </Grid.Column>
                                ))}
                            </Transition.Group>
                        )}
                </Grid.Row>
            </Grid>
            </div>
    )
}


export default Home;