import React from 'react';
import { Button, Card, Icon, Label, Image , Grid} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import moment from 'moment';

function PostCard({
  post: { body, createdAt, id, username, likeCount, commentCount, likes } }) {

  function likePost() {
    console.log('Like Post')
  }

  function commentOnPost() {
    console.log('commentOnPost!!!')
  }

  function deletePost() {
    console.log('delete post!!!')
  }
  return (

    <Card fluid>
      <Card.Content>
        <Image
          floated='right'
          size='mini'
          src='https://react.semantic-ui.com/images/avatar/large/molly.png'
        />
        <Card.Header>{username}</Card.Header>
        <Card.Meta as={Link} to={`/posts/${id}`}>{moment(createdAt).fromNow(true)}</Card.Meta>
        <Card.Description>
          {body}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Grid columns='two' >
          <Grid.Row>
            <Grid.Column  width={10} divided>
              <Button as='div' labelPosition='right' onClick={likePost}>
                <Button color='blue' basic>
                  <Icon name='heart' />
                </Button>
                <Label basic color='blue' pointing='left'>
                  {likeCount}
                </Label>
              </Button>
              <Button as='div' labelPosition='right' onClick={commentOnPost}>
                <Button color='facebook' >
                  <Icon name='conversation' />
                </Button>
                <Label basic color='blue' pointing='left'>
                  {commentCount}
                </Label>
              </Button>
            </Grid.Column>
            <Grid.Column floated='right'  >
              <Button as='div' color ="red" animated='vertical' onClick={deletePost}>
                <Button.Content hidden>Delete</Button.Content>
                <Button.Content visible >
                  <Icon name='delete' />
                </Button.Content>
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Card.Content>
    </Card>
  );
}
export default PostCard;
