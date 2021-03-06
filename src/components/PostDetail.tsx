import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { getPostEndpointUrl } from '../common/constants';
import { usePostDetailStyles } from '../common/styles';
import useFetch from '../hooks/useFetch';
import { MatchParams } from '../models/MatchParams';
import { Page } from '../models/Page';
import { Post } from '../models/Post';
import CommentsList from './CommentsList';
import Loading from './Loading';
import SnackBar from './SnackBar';

const postDetail = (props: { activePage: (page: Page) => void }): JSX.Element => {
  const { contentContainer, contentWrapper, subtitle } = usePostDetailStyles();
  const { postId } = useParams<MatchParams>();
  const isMountedRef = useRef(true);
  const [post, loading, hasError] = useFetch<Post>({ isMountedRef, url: getPostEndpointUrl(postId) });
  useEffect(() => {
    props.activePage(Page.POST_DETAIL);
  }, []);
  return (
    <div className={contentContainer}>
      {loading && <Loading />}
      {!loading && (
        <div className={contentWrapper}>
          <h2>{post && post.title}</h2>
          <p>{post && post.body}</p>
          <div>
            <h3 className={subtitle}>Comments (5)</h3>
            {post && <CommentsList postId={post.id} />}
          </div>
        </div>
      )}
      {hasError && <SnackBar />}
    </div>
  );
};
export default postDetail;
