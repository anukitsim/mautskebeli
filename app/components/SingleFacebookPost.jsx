"use client"

import React, { useEffect, useState } from 'react';
import fetchFacebookData from '../utils/fetchFacebookData';

const SingleFacebookPost = ({ postId }) => {
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data for the specific post using the postId
        const accessToken = 'EAAZA3GvirehkBOZB6YlSOkRmJenxU8mRqZB1SqreyzZBmLTFYZB3cuGChNbRaNyuhYxSwDXypyGSybG3OXRiKznUxTJUCYNGbTGS0XllYmybZAF14ZCtEPHEXFEZCdD2f1iyCPyL5rYvyJo87AI3LZBOA4GVsTsJqTTus7EQ75Xjp1zZCZCsIQJHRbA1qevdQ6Py4ZCNxIXyKfNOkheSp5B6dnqusmqCg5ZBBZCR1HBtiaS7X7'; // Replace with your access token
        const data = await fetchFacebookData(accessToken, postId);

        if (data.error) {
          throw new Error(`Facebook API Error: ${data.error.message}`);
        }

        console.log('Fetched post data:', data);
        setPost(data[0]); // Assuming the data structure is an array with one post
      } catch (error) {
        console.error('Error fetching post data:', error.message);
        setError('Error fetching post data. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [postId]);

  console.log('Component re-rendered. Post:', post);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      {post && (
        <>
          <img src={post.attachments?.data[0]?.media?.image?.src} alt="Post Image" />
          <p>{post.message || post.attachments?.data[0]?.caption || 'No Caption'}</p>
          {/* Additional content rendering goes here */}
        </>
      )}
    </div>
  );
};

export default SingleFacebookPost;
