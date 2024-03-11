"use client"
import React, { useState, useEffect } from 'react';
import fetchFacebookData from '../../utils/fetchFacebookData';
import Image from 'next/image';

const PostPage = () => {
  const [post, setPost] = useState({});
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Use your actual user access token and page ID
       
        const pageId = '480323335835739';
        const user_access_token = process.env.NEXT_PUBLIC_FACEBOOK_ACCESS_TOKEN;
        const pageAccessTokenEndpoint = '/api/facebook-access-token-endpoint';
        const pageAccessTokenResponse = await fetch(pageAccessTokenEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ page_id: pageId ,user_access_token:user_access_token}),
        });

        const { page_access_token } = await pageAccessTokenResponse.json();

        const data = await fetchFacebookData(page_access_token, pageId, true);

        // Filter posts with both images and captions
        const postsWithImagesAndCaptions = data.filter((post) => (
          post.attachments &&
          post.attachments.data &&
          post.attachments.data.some(attachment => (
            attachment.media &&
            ((attachment.media.image && attachment.type === 'photo') || attachment.type === 'album')
          )) &&
          post.message
        ));

        // Sort posts by timestamp in descending order
        postsWithImagesAndCaptions.sort((a, b) => b.created_time - a.created_time);

        // Assuming index 0 corresponds to the latest post
        const selectedPost = postsWithImagesAndCaptions[0];
        setPost(selectedPost);

      } catch (error) {
        console.error('Error fetching or processing data:', error.message);
        setError('Error fetching or processing data. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []); // No dependencies, as this is a static page

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % post.attachments.data[0].subattachments.data.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + post.attachments.data[0].subattachments.data.length) % post.attachments.data[0].subattachments.data.length);
  };

  const handleBulletClick = (index) => {
    setCurrentImageIndex(index);
  };

  if (isLoading) {
    return (
      <div>
        <Image src='/images/loading.svg' alt='loading' width={70} height={70} />
      </div>
    );
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  // Additional check to handle cases where the post is not an album
  if (!post.attachments || !post.attachments.data || post.attachments.data.length === 0) {
    return (
      <div className='flex flex-row-reverse w-11/12 mx-auto mt-10 items-center gap-10'>
        <div className='w-6/12'>
          {post.message && <h1 className=''>{post.message}</h1>}
        </div>
      </div>
    );
  }

  // Check if the post type is "album"
  if (post.attachments.data[0].type === 'album') {
    return (
      <>
        <div className='flex flex-row-reverse w-11/12 mx-auto mt-10 items-center gap-10'>
          <div className='w-6/12'>
            {post.message && <h1 className=''>{post.message}</h1>}
          </div>

          {/* Render a gallery of images for "album" type */}
          {post.attachments && post.attachments.data[0].type === 'album' && (
            <div
              className='w-6/12 h-[443px] border flex p-6 justify-center border-[#E0DBE8] rounded-[6px]'
              style={{
                backgroundImage: `url(${post.attachments.data[0].subattachments.data[currentImageIndex]?.media?.image?.src || ''})`,
                backgroundSize: 'contain',
                backgroundRepeat: "no-repeat",
                backgroundPosition: 'center',
              }}
            >
              <div className="flex flex-row justify-between w-full items-center mb-4">
                <Image
                  src="/images/arrow-left-black.png"
                  alt="left arrow"
                  width={56}
                  height={56}
                  onClick={handlePrevImage}
                  className='cursor-pointer'
                />
                <Image
                  src="/images/arrow-right-black.png"
                  alt="right arrow"
                  width={56}
                  height={56}
                  onClick={handleNextImage}
                  className='cursor-pointer ml-4'
                />
              </div>
            </div>
          )}

          {/* Render additional content here */}
        </div>
        <div className="flex space-x-2 mt-5 w-6/12 justify-center">
          {post.attachments.data[0].subattachments.data.map((_, index) => (
            <div
              key={index}
              className={`w-4 h-4 rounded-full cursor-pointer transition-all duration-300 ${
                index === currentImageIndex ? 'bg-[#8C74B2]' : 'bg-[#E0DBE8]'
              }`}
              onClick={() => handleBulletClick(index)}
            />
          ))}
        </div>
      </>
    );
  }

  // If the post type is "photo", render a single image
  if (post.attachments.data[0].type === 'photo') {
    return (
      <div className='flex flex-row-reverse w-11/12 mx-auto mt-10 items-center gap-10'>
        <div className='w-6/12'>
          {post.message && <h1 className=''>{post.message}</h1>}
        </div>
        <div className='w-6/12'>
          <img
            src={post.attachments.data[0].media.image.src}
            alt="Post Image"
            className='rounded-[6px] w-full'
          />
        </div>
      </div>
    );
  }

  return null; // Default case, return null for unsupported post types
};

export default PostPage;