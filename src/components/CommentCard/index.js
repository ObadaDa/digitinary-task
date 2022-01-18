import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';

const CommentCard = ({comment: { name, body, email }}) => (
  <Grid item xs={9}>
      <Card>
        <CardContent>
            <Typography gutterBottom align='left' component='p'>
                by { name } <small className='auther-label'> { email }</small>
            </Typography>
            <Typography align='left' variant='body2' color='textSecondary' component='p'>
              { body }
            </Typography>
        </CardContent>
      </Card>
  </Grid>
);

export default CommentCard;

